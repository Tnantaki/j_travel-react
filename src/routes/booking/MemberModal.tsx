import InputInfo from "../../components/InputInfo";
import { SubmitHandler, useForm } from "react-hook-form";

export interface MemberType {
  name: string;
  region: string;
  age: number;
  gender: "male" | "female";
  phone: string;
}

const MemberModal = () => {
  const { register, handleSubmit, reset } = useForm<MemberType>();

  const onSubmit: SubmitHandler<MemberType> = (data) => {
    console.log(data);
  };

  return (
    <form className="w-[800px] bg-dark-grey p-4 flex flex-col gap-2">
      <InputInfo
        type="text"
        label="name"
        {...register("name")}
      />
      <InputInfo
        type="text"
        label="region"
        {...register("region")}
      />
      <InputInfo
        type="number"
        label="age"
        {...register("age")}
      />
      <InputInfo
        type="text"
        label="gender"
        {...register("gender")}
      />
      <InputInfo
        type="text"
        label="phone"
        {...register("phone")}
      />
    </form>
  );
};

export default MemberModal;
