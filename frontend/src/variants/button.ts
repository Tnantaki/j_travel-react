import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "font-inter border-2 border-primary flex justify-center items-center enabled:hover:cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white enabled:hover:brightness-125",
        outline:
          "text-primary enabled:hover:bg-primary enabled:hover:text-white",
        success:
          "bg-info-success border-info-success text-white enabled:hover:brightness-125",
      },
      size: {
        sm: "rounded-md py-1 px-5 font-medium text-lg",
        md: "rounded-lg py-1.5 px-5 font-semibold text-base gap-1 sm:text-xl sm:py-2.5 sm:gap-3 md:text-xl md:py-3 md:rounded-xl",
        lg: "rounded-xl py-3.5 px-6 font-semibold text-2xl gap-3",
      },
      rounded: {
        round: "",
        full: "rounded-full md:rounded-full",
      },
      disabled: {
        false: null,
        true: "border-grey",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        disabled: true,
        class: "bg-grey",
      },
      {
        variant: "outline",
        disabled: true,
        class: "text-grey",
      },
      {
        variant: "success",
        disabled: true,
        class: "bg-grey",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "round",
      disabled: false,
    },
  }
);
