import Button from "../../components/Button"
import InputInfo from "../../components/InputInfo"

const Profile = () => {
  return (
    <section className="bg-dark-primary justify-center hero sec-padding">
      <div className="page-container flex flex-col items-center mt-5 sm:mt-10">
        <h3 className="text-white self-start mb-4">My Account</h3>
        <div className="flex flex-row bg-dark-grey w-full p-8 rounded-2xl gap-6">
          <div className="flex flex-col rounded-lg border-1 border-lg border-grey w-[200px]">

          </div>
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-row rounded-lg border-1 border-lg border-grey p-6">
              <div className="rounded-full size-24 bg-amber-50">
                <img src="" alt="" />
              </div>
            </div>
            <form className="flex flex-col rounded-lg border-1 border-lg border-grey p-6 gap-4">
              <div>
                <h4>Personal Information</h4>
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex flex-col gap-4">
                    <InputInfo type="date" label="Birthday" name="birthday" />
                    <InputInfo type="number" label="Phone" name="phone" />
                    <div className="flex flex-col gap-1">
                      <p className="body2 text-light-grey ps-3">Gender</p>
                      <div className="flex flex-row gap-2">
                        <input type="radio" name="gender" id="female" value="female" />
                        <label htmlFor="female" className="text-neutral-white text-lg font-normal me-2">Female</label>
                        <input type="radio" name="gender" id="male" value="male" />
                        <label htmlFor="male" className="text-neutral-white text-lg font-normal">Male</label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <InputInfo type="number" label="Age" name="age" />
                    <InputInfo type="email" label="Email" name="email" />
                  </div>
                </div>
              </div>
              <div>
                <h4>Address</h4>
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex flex-col gap-4">
                    <InputInfo type="text" label="Street, Building, House No." name="street" />
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
              <Button size="md" primary={true} className="self-center rounded-full">Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Profile