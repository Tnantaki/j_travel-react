import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import GenderInput from "../../components/GenderInput";
import InputInfo from "../../components/InputInfo";
import { FaRegSave } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import profileService, {
  Gender,
  ProfileType,
} from "../../services/profile-service";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState<Gender>();
  const { register, handleSubmit, reset } = useForm<ProfileType>();

  useEffect(() => {
    const requset = profileService.getProfile();
    requset.then((res) => {
      if (res.data) {
        console.log(res.data);

        reset({
          email: res.data.email,
        });
      } else {
        setEdit(true);
      }
    });
  }, []);

  const onSubmit: SubmitHandler<ProfileType> = (data) => {
    setFullName(`${data.firstName} ${data.lastName}`);
    setGender(data.gender);

    console.log(data);
    setEdit(false);
  };

  return (
    <form
      className="flex flex-col gap-4 w-full grow-1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-row profile-layout justify-between gap-2">
        <div className="flex flex-col sm:flex-row gap-2 xl:gap-4">
          <div className="flex justify-between">
            <div className="rounded-full size-18 lg:size-24 bg-slate-700 shrink-0">
              {/* <img src="" alt="" /> */}
            </div>
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
            {!edit ? (
              <div className="col-span-2">
                <InputInfo
                  type="text"
                  sizeInput="lg"
                  value={fullName}
                  disabled
                />
              </div>
            ) : (
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
            )}
            <InputInfo
              type="text"
              {...register("region")}
              placeholder="region"
              disabled={!edit}
            />
          </div>
          <div className="hidden sm:block">
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
              {...register("age")}
              disabled={!edit}
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
              {...register("age")}
              disabled={!edit}
            />
            <InputInfo
              type="number"
              label="Passport Number"
              {...register("email")}
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
              label="Street, Building, House No."
              {...register("street")}
              disabled={!edit}
            />
            <InputInfo
              type="text"
              label="Sub District"
              {...register("subDistrict")}
              disabled={!edit}
            />
            <InputInfo
              type="text"
              label="District"
              {...register("district")}
              disabled={!edit}
            />
            <InputInfo
              type="text"
              label="Province"
              {...register("province")}
              disabled={!edit}
            />
            <InputInfo
              type="number"
              label="Postal Code"
              {...register("postalCode")}
              name="postalCode"
              disabled={!edit}
            />
            <InputInfo
              type="text"
              label="Country"
              {...register("country")}
              disabled={!edit}
            />
          </div>
        </div>
        {edit && (
          <Button type="submit" rounded="full" className="self-center">
            <FaRegSave />
            Save
          </Button>
        )}
      </div>
    </form>
  );
};

export default Profile;
