import Button from "../../components/Button";
import InputInfo from "../../components/InputInfo";
import { FaRegSave } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  return (
    <form className="flex flex-col gap-6 w-full">
      <div className="flex flex-row rounded-lg border-1 border-lg border-grey p-6 justify-between">
        <div className="flex gap-4">
          <div className="rounded-full size-24 bg-amber-50">
            <img src="" alt="" />
          </div>
          <div className="grid grid-cols-2 gap-2 w-[700px]">
            <InputInfo
              type="text"
              label=""
              showLabel={false}
              name="name"
              sizeInput="lg"
              placeholder="First name"
            />
            <InputInfo
              type="text"
              label=""
              showLabel={false}
              name="name"
              sizeInput="lg"
              placeholder="Last name"
            />
            <InputInfo
              type="text"
              label=""
              showLabel={false}
              name="name"
              placeholder="region"
            />
          </div>
        </div>
        <div>
          <Button size="md" primary={false}>
            <FaEdit />
            Edit
          </Button>
        </div>
      </div>
      <div className="flex flex-col rounded-lg border-1 border-lg border-grey px-6 py-8 gap-6 h-full">
        <div className="flex flex-col gap-2">
          <h4>Personal Information</h4>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <InputInfo type="date" label="Birthday" name="birthday" />
              <InputInfo type="tel" label="Phone" name="phone" />
              <div className="flex flex-col gap-1">
                <p className="body2 text-light-grey ps-3">Gender</p>
                <div className="flex flex-row gap-2">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                  />
                  <label
                    htmlFor="female"
                    className="text-neutral-white text-lg font-normal me-2"
                  >
                    Female
                  </label>
                  <input type="radio" name="gender" id="male" value="male" />
                  <label
                    htmlFor="male"
                    className="text-neutral-white text-lg font-normal"
                  >
                    Male
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <InputInfo type="number" label="Age" name="age" />
              <InputInfo type="email" label="Email" name="email" />
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
              />
              <InputInfo type="text" label="District" name="district" />
              <InputInfo type="number" label="Postal Code" name="postalCode" />
            </div>
            <div className="flex flex-col gap-4">
              <InputInfo type="text" label="Province" name="province" />
              <InputInfo type="text" label="Sub District" name="subDistrict" />
              <InputInfo type="text" label="Country" name="country" />
            </div>
          </div>
        </div>
        <Button size="md" primary={true} className="self-center rounded-full">
          <FaRegSave />
          Save
        </Button>
      </div>
    </form>
  );
};

export default Profile;
