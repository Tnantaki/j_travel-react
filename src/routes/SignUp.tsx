import { Link } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";

const SignUp = () => {
  return (
    <section className="hero sec-padding bg-[url('/background/fujiyoshida.png')] bg-cover bg-center">
      <div className="flex items-center justify-center w-full lg:justify-end lg:mx-40">
        <div className="flex flex-col bg-black/30 backdrop-blur-xl rounded-xl py-4 px-8 gap-3 drop-shadow-xl sm:py-5 sm:px-12 sm:rounded-2xl sm:gap-6 lg:w-[1024px] lg:py-8 lg:px-20 lg:gap-12 lg:rounded-3xl">
          <h3 className="text-center">Create Account</h3>
          <form className="flex flex-col gap-2 sm:gap-3 lg:gap-6">
            <div className="grid gap-3 sm:grid-cols-2 lg:gap-6">
              <Input name="username" label="Username" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:gap-6">
              <Input name="password" label="Password" />
              <Input name="confirmPassword" label="Confirm Password" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:gap-6">
              <Input name="email" label="Email" />
              <Input name="phone" label="Phone" />
            </div>
            <Input name="address" label="Address" />
            <div className="flex justify-center">
              <Button size="md" primary={true}>
                SIGN UP
              </Button>
            </div>
          </form>
          <Link
            to="/login"
            className="text-base text-center font-semi-bold hover:underline sm:text-lg md:text-xl"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
