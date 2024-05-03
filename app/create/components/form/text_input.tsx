import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";
import { FormData } from "@/types/formData";

type TextInputProps = {
  register: UseFormRegister<FormData>;
  errors: any;
  name: keyof FormData;
  label: string;
  placeholder: string;
  icon?: JSX.Element;
};

export const TextInput: React.FC<TextInputProps> = ({
  register,
  errors,
  name,
  placeholder,
  icon,
}) => {
  return (
    <>
      <InputGroup size="sm">
        {icon && <InputLeftAddon>{icon}</InputLeftAddon>}
        <Input
          {...register(name)}
          placeholder={placeholder}
          variant={"outline"}
        />
      </InputGroup>
      {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
    </>
  );
};
