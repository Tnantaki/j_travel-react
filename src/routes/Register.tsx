import { Link, NavLink } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";

const Register = () => {
  return (
    <section className="relative min-h-screen flex overflow-hidden">
      <div className="flex flex-col text-white mt-40 mx-40">
        <div className="flex flex-col w-[1024px] bg-black/20 rounded-3xl backdrop-blur-xl p-16 gap-12 drop-shadow-xl">
          <h1 className="font-bold text-4xl text-center">Create Account</h1>
          <form className="flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-6">
              <Input name="username" label="Username" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Input name="password" label="Password" />
              <Input name="confirmPassword" label="Confirm Password" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Input name="email" label="Email" />
              <Input name="phone" label="Phone" />
            </div>
            <Input name="address" label="Address" />
            <Link className="flex justify-center" to={"#"}>
              <Button size="lg" primary={true}>
                SIGN UP
              </Button>
            </Link>
          </form>
          <NavLink
            to="/login"
            className="text-xl text-center font-semi-bold hover:underline"
          >
            Back to Login
          </NavLink>
        </div>
      </div>
      <img
        className="absolute top-0 h-[120vh] object-cover -z-30"
        src="./background/fujiyoshida.png"
      />
    </section>
  );
};

export default Register;
