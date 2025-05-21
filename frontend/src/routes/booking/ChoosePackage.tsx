import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { FaRegClock } from "react-icons/fa";
import { FaBahtSign } from "react-icons/fa6";
import ModalPackage from "../../components/modals/ModalPackage";
import LinkButton from "../../components/common/LinkButton";
// import ButtonRadio from "../../components/common/ButtonRadio";
import MotionButton from "../../components/common/MotionButton";
import { usePlan } from "../../Layout";
import { useAuth } from "../../contexts/AuthProvider";
import { MemberType, useBooking } from "../../contexts/BookingProvider";
import profileService from "../../services/profile-service";
import { useNavigate } from "react-router";

interface Props {
  nextStep: () => void;
}

const ChoosePackage = ({ nextStep }: Props) => {
  const [isOpenPackage, setIsOpenPackage] = useState<boolean>(false);
  const { plan } = usePlan();
  const { bookDispatch } = useBooking();
  const { user } = useAuth();
  let navigate = useNavigate();

  const handleChoosePlan = () => {
    if (user && plan) {
      bookDispatch({ type: "add_plan", planId: plan.id });
      nextStep();
    }
  };

  const validatePlan = () => (user && plan ? true : false);

  useEffect(() => {
    const { request, cancel } = profileService.getProfile();

    const reqProfile = async () => {
      try {
        const res = await request;
        const data = res.data;

        if (!data) {
          throw new Error("No Profile info");
        }

        const leader: MemberType = {
          id: data.user,
          name: data.username,
          birthday: new Date(data.birthday),
          gender: data.gender,
          phone: data.phone,
        };

        bookDispatch({ type: "add_leader", leader });
      } catch (error: any) {
        if (error.code = 'ERR_CANCELED') { // cancel from dev mode
          return ;
        }
        console.log(error);
        navigate("/account/profile");
      }
    };
    reqProfile();
    return () => {
      cancel(); // cancel request in case user navigate away before get response
    };
  }, []);

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <h4 className="mb-2">Choose Package</h4>
        <div className="booking-sub-frame">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-2"
          >
            <LinkButton to="/packages" className="self-start" size="sm">
              Change Package
            </LinkButton>
            {plan && (
              <div>
                <ModalPackage
                  isOpen={isOpenPackage}
                  onClose={() => setIsOpenPackage(false)}
                  tour={plan}
                  hasBookingBtn={false}
                />
                <div className="bg-slate-300 border-slate-400 border-2 flex flex-col md:flex-row px-6 py-4 rounded-md">
                  <div className="overflow-hidden max-w-[300px] md:max-w-[260px] lg:max-w-[320px] shrink-0 self-center lg:self-auto">
                    <img
                      src={plan.imgCover}
                      alt="Image cover"
                      className="object-center object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col px-6 w-full gap-1 justify-between">
                    <div className="flex flex-col gap-2">
                      <p className="body1 font-medium border-b-1 border-primary/20 w-full">
                        {plan.name}
                      </p>
                      <p className="indent-4">{plan.description}</p>
                    </div>
                    <div className="flex flex-row justify-between items-end mt-4">
                      <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                          <p className="flex items-center">
                            <FaRegClock />
                            &nbsp;:&nbsp;
                          </p>
                          <p className="body2">{plan.duration}</p>
                        </div>
                        <div className="flex flex-row items-center">
                          <p className="flex items-center">
                            <FaBahtSign />
                            &nbsp;:&nbsp;
                          </p>
                          <p className="body2 font-semibold">
                            {plan.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        rounded="full"
                        variant="outline"
                        className="self-end text-base text-nowrap"
                        onClick={() => setIsOpenPackage(true)}
                      >
                        More Detail
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* <div className="flex flex-col">
              <h5>Select Tour Option</h5>
              <div className="flex p-2 gap-2 body1 font-medium">
                <ButtonRadio
                  name="tourType"
                  id="tourGroup"
                  label="Tour Group"
                />
                <ButtonRadio
                  name="tourType"
                  id="privateGroup"
                  label="Private Group"
                />
              </div>
            </div> */}
          </form>
        </div>
      </div>
      <div className="flex justify-between">
        <div></div>
        <MotionButton
          rounded="full"
          onClick={handleChoosePlan}
          disabled={!validatePlan()}
        >
          Next
        </MotionButton>
      </div>
    </>
  );
};

export default ChoosePackage;
