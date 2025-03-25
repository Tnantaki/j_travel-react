import { Link } from "react-router";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../services/user";
import { useState } from "react";
import ModalSuccess from "../components/ModalSuccess";

const formSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(4, { message: "Must be 4 or more characters long" }),
    confirmPassword: z.string().min(4),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't matchs",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);
  const toggleModalSuccess = () => setOpenModalSuccess(!openModalSuccess);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    try {
      await registerUser({
        email: data.email,
        password: data.password
      })
      toggleModalSuccess()
    } catch (error) {
      console.log(error)
    }
    // for mock test
    // await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <section className="hero sec-padding bg-[url('/src/assets/img/background/fujiyoshida.png')] bg-cover bg-center">
      <div className="page-container flex items-center justify-center w-full text-char-sec lg:justify-end">
        <div className="flex flex-col bg-black/30 max-w-[420px] backdrop-blur-xl rounded-xl py-4 px-8 gap-3 drop-shadow-xl sm:py-5 sm:px-12 sm:max-w-none sm:w-[560px] sm:rounded-2xl sm:gap-6 lg:w-[650px] lg:py-8 lg:px-20 lg:gap-12 lg:rounded-3xl">
          <h3 className="text-center">Create Account</h3>
          <form
            className="flex flex-col gap-2 sm:gap-3 lg:gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Use Type 'text' cuz, HTML not let user submit on type 'email' if user type the wrong input */}
            <Input
              type="text"
              {...register("email")}
              label="Email"
              error={errors.email}
            />
            <Input
              type="password"
              {...register("password")}
              label="Password"
              error={errors.password}
            />
            <Input
              type="password"
              {...register("confirmPassword")}
              label="Confirm Password"
              error={errors.confirmPassword}
            />
            <div className="flex justify-center">
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Loading..." : "SIGN UP"}
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
      <ModalSuccess isOpen={openModalSuccess} />
    </section>
  );
};

export default SignUp;
