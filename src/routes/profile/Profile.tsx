import { useState } from "react";
import Button from "../../components/Button";
import GenderInput from "../../components/GenderInput";
import InputInfo from "../../components/InputInfo";
import { FaRegSave } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";

export interface ProfileInputs {
  firstName: string
  lastName: string
}

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const { register, handleSubmit } = useForm<ProfileInputs>();

  const onSubmit: SubmitHandler<ProfileInputs> = (data) => {
    // event.preventDefault();
    console.log(data)
    setEdit(false);
  };

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row rounded-lg border-1 border-lg border-grey px-8 py-4 justify-between">
        <div className="flex gap-4">
          <div className="rounded-full size-24 bg-amber-50">
            {/* <img src="" alt="" /> */}
          </div>
          <div className="grid grid-cols-2 gap-2 w-[700px]">
            {!edit ? (
              <div className="col-span-2">
                {/* <InputInfo
                  type="text"
                  label=""
                  // name="name"
                  sizeInput="lg"
                  disabled={!edit}
                /> */}
              </div>
            ) : (
              <>
              <input type="text" {...register("firstName")} />
                {/* <InputInfo
                  type="text"
                  {...register('firstName')}
                  // name="firstName"
                  sizeInput="lg"
                  placeholder="First name"
                  // disabled={!edit}
                /> */}
                {/* <InputInfo
                  type="text"
                  // name="lastName"
                  {...register('lastName')}
                  sizeInput="lg"
                  placeholder="Last name"
                  disabled={!edit}
                /> */}
              </>
            )}
            {/* <InputInfo
              type="text"
              label=""
              name="name"
              placeholder="region"
              disabled={!edit}
            /> */}
          </div>
        </div>
        <div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            rounded="full"
            onClick={() => setEdit(true)}
            disabled={edit}
          >
            <FaEdit />
            Edit
          </Button>
        </div>
      </div>
      <div className="flex flex-col rounded-lg border-1 border-lg border-grey px-8 py-4 gap-6 h-full">
        {/* <div className="flex flex-col gap-2">
          <h4>Personal Information</h4>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <InputInfo
                type="date"
                label="Birthday"
                name="birthday"
                disabled={!edit}
              />
              <InputInfo
                type="tel"
                label="Phone"
                name="phone"
                disabled={!edit}
              />
              <GenderInput />
            </div>
            <div className="flex flex-col gap-4">
              <InputInfo
                type="number"
                label="Age"
                name="age"
                disabled={!edit}
              />
              <InputInfo
                type="email"
                label="Email"
                name="email"
                disabled={!edit}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h4>Address</h4>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <InputInfo
                type="text"
                label="Street, Building, House No."
                name="street"
                disabled={!edit}
              />
              <InputInfo
                type="text"
                label="District"
                name="district"
                disabled={!edit}
              />
              <InputInfo
                type="number"
                label="Postal Code"
                name="postalCode"
                disabled={!edit}
              />
            </div>
            <div className="flex flex-col gap-4">
              <InputInfo
                type="text"
                label="Sub District"
                name="subDistrict"
                disabled={!edit}
              />
              <InputInfo
                type="text"
                label="Province"
                name="province"
                disabled={!edit}
              />
              <InputInfo
                type="text"
                label="Country"
                name="country"
                disabled={!edit}
              />
            </div>
          </div>
        </div> */}
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
