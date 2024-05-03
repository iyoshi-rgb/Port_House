import { Textarea } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";
import { FormData } from "../form";

type TextAreaInputProps = {
  register: UseFormRegister<FormData>;
  errors: any;
  name: keyof FormData;
  placeholder: string;
  rows: number;
};

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  register,
  errors,
  name,
  placeholder,
  rows,
}) => (
  <div>
    <Textarea
      {...register(name)}
      placeholder={placeholder}
      rows={rows}
      className="w-full"
    />
    {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
  </div>
);
