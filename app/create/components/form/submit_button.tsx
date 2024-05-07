import { Button, FormLabel, Switch } from "@chakra-ui/react";
import { TbWorld } from "react-icons/tb";
import { FaRegSave } from "react-icons/fa";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormData } from "@/types/formData";

type Props = {
  register: UseFormRegister<FormData>;
  isPublic: boolean;
};

export const SubmitButtons: React.FC<Props> = ({ register, isPublic }) => {
  const [isPublicMode, setIsPublicMode] = useState<boolean>(isPublic);

  const changeMode = () => {
    setIsPublicMode(!isPublicMode);
  };

  return (
    <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-end gap-2 items-center">
      <FormLabel htmlFor="isDisabled">公開しますか?</FormLabel>
      <Switch
        colorScheme="teal"
        size="lg"
        {...register("published")}
        onChange={changeMode}
      />

      {isPublicMode ? (
        <Button
          type="submit"
          leftIcon={<TbWorld />}
          colorScheme="teal"
          variant="outline"
        >
          公開する
        </Button>
      ) : (
        <Button
          type="submit"
          rightIcon={<FaRegSave />}
          colorScheme="teal"
          variant="solid"
        >
          下書き保存
        </Button>
      )}
    </div>
  );
};
