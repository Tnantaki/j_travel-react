import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import GenderInput from "../../components/GenderInput";
import InputInfo from "../../components/InputInfo";
import { FaExclamationCircle, FaRegSave } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import profileService, {
  Gender,
  ProfileType,
} from "../../services/profile-service";
import { getAge } from "../../utils/age";
import userService from "../../services/user-service";
import { AxiosError, isAxiosError } from "axios";
import ModalWarning from "../../components/modals/ModalWarning";
import FileUpload from "./FileUpload";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<Gender | "">("");
  const [hasProfile, setHasProfile] = useState(false);
  const [popupCreateProfile, setPopupCreateProfile] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<ProfileType>();

  useEffect(() => {
    const { request, cancel } = profileService.getProfile();

    const reqProfile = async () => {
      try {
        const res = await request;
        const data = res.data;

        if (!data) {
          return console.log(res);
        }

        const name = data.username.split(" ");
        reset({
          firstName: name[0] || "",
          lastName: name[1] || "",
          birthday: new Date(data.birthday).toISOString().split("T")[0],
          gender: data.gender, // set to form
          phone: data.phone,
          email: data.email,
          idNo: data.idNumber,
          passportNo: data.passportNumber,
          address: data.address,
        });
        setAge(getAge(new Date(data.birthday)));
        setGender(data.gender);
        setHasProfile(true);
        setPreview(data.profileImage);
      } catch (error: any | AxiosError) {
        if (isAxiosError(error)) {
          if (error.response) {
            if (error.response.status === 404) {
              setPopupCreateProfile(true);
            } else {
              console.log(error.response.data);
            }
          }
        } else {
          console.log(error.response.data);
        }
      }
    };
    reqProfile();
    return () => {
      cancel(); // cancel request in case user navigate away before get response
      setPopupCreateProfile(false);
    };
  }, [edit]);

  const onSubmit: SubmitHandler<ProfileType> = async (data) => {
    try {
      if (hasProfile) {
        await profileService.updateProfile(data);
        if (file) {
          await profileService.uploadImage(file);
        }
      } else {
        const user = userService.getCurrentUser();
        if (!user) {
          throw new Error("No user id.");
        }

        await profileService.createProfile(user._id, data);
      }
      setEdit(false);
    } catch (error: any | AxiosError) {
      if (isAxiosError(error)) {
        if (error.response) {
          setError("firstName", {
            message: error.response.data,
          });
        }
      } else {
        setError("firstName", {
          message: error.message,
        });
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-full grow-1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-row profile-layout justify-between gap-2">
        <div className="flex flex-col sm:flex-row gap-2 xl:gap-4 w-full">
          <div className="flex justify-between">
            <FileUpload
              edit={edit}
              setFile={setFile}
              preview={preview}
              setPreview={setPreview}
            />
            <div className="sm:hidden">
              <Button
                type="button"
                size="sm"
                variant="outline"
                rounded="full"
                onClick={() => setEdit(true)}
                disabled={edit}
                className=""
              >
                <FaEdit />
                Edit
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 max-w-[700px]">
            <>
              <InputInfo
                type="text"
                sizeInput="lg"
                {...register("firstName")}
                placeholder="First name"
                disabled={!edit}
              />
              <InputInfo
                type="text"
                {...register("lastName")}
                sizeInput="lg"
                placeholder="Last name"
                disabled={!edit}
              />
            </>
          </div>
          <div className="hidden sm:flex grow-1 self-start justify-end">
            <Button
              type="button"
              size="sm"
              variant="outline"
              rounded="full"
              onClick={() => setEdit(true)}
              disabled={edit}
              className=""
            >
              <FaEdit />
              Edit
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col profile-layout gap-6 h-full">
        <div className="flex flex-col gap-2">
          {errors.firstName && (
            <p className="text-info-error flex items-center gap-1 text-sm mt-0.5 drop-shadow-lg sm:text-base sm:mt-1 self-start">
              <FaExclamationCircle />
              {errors.firstName.message}
            </p>
          )}
          <h4>Personal Information</h4>
          <div className="profile-info-grid">
            <InputInfo
              type="date"
              label="Birthday"
              {...register("birthday")}
              disabled={!edit}
            />
            <InputInfo
              type="number"
              label="Age"
              value={age}
              disabled
              // {...register("age")}
              // disabled={!edit}
            />
            <InputInfo
              type="tel"
              label="Phone"
              {...register("phone")}
              disabled={!edit}
            />
            <InputInfo
              type="email"
              label="Email"
              {...register("email")}
              disabled={!edit}
            />
            <InputInfo
              type="number"
              label="Identification Number"
              {...register("idNo")}
              disabled={!edit}
            />
            <InputInfo
              type="number"
              label="Passport Number"
              {...register("passportNo")}
              disabled={!edit}
            />
            {!edit ? (
              <InputInfo type="text" label="Gender" value={gender} disabled />
            ) : (
              <GenderInput {...register("gender")} />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h4>Address</h4>
          <div className="profile-info-grid">
            <InputInfo
              type="text"
              label="Street"
              {...register("address.street")}
              disabled={!edit}
            />
            <InputInfo
              type="text"
              label="Building"
              {...register("address.building")}
              disabled={!edit}
            />
            <InputInfo
              type="text"
              label="House No."
              {...register("address.houseNo")}
              disabled={!edit}
            />
            <InputInfo
              type="text"
              label="Sub District"
              {...register("address.subDistrict")}
              disabled={!edit}
            />
            <InputInfo
              type="text"
              label="District"
              {...register("address.district")}
              disabled={!edit}
            />
            <InputInfo
              type="text"
              label="Province"
              {...register("address.province")}
              disabled={!edit}
            />
            <InputInfo
              type="number"
              label="Postal Code"
              {...register("address.postalCode")}
              min={0}
              disabled={!edit}
            />
            <InputInfo
              type="text"
              label="Country"
              {...register("address.country")}
              disabled={!edit}
            />
          </div>
        </div>
        {edit && (
          <Button
            type="submit"
            size="sm"
            rounded="full"
            className="self-center"
          >
            <FaRegSave />
            Save
          </Button>
        )}
        <ModalWarning
          isOpen={popupCreateProfile}
          onClose={() => {
            setPopupCreateProfile(false);
            setEdit(true);
          }}
        />
      </div>
    </form>
  );
};

export default Profile;
