import { Button, FormLabel, Switch } from "@chakra-ui/react";
import { TbWorld } from "react-icons/tb";
import { publicArticle, saveArticle } from "@/server_actions/postForm";
import { FaRegSave } from "react-icons/fa";
import { useState } from "react";

type Props = {
  formReset: () => void;
};

export const SubmitButtons: React.FC<Props> = ({ formReset }) => {
  const [isPublicMode, setIsPublicMode] = useState<boolean>(false);

  const changeMode = () => {
    setIsPublicMode(!isPublicMode);
  };

  return (
    <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-end gap-2 items-center">
      <FormLabel htmlFor="isDisabled">公開しますか?</FormLabel>
      <Switch colorScheme="teal" size="lg" onChange={changeMode} />

      {isPublicMode ? (
        <Button
          type="submit"
          formAction={publicArticle}
          onClick={formReset}
          leftIcon={<TbWorld />}
          colorScheme="teal"
          variant="outline"
        >
          公開する
        </Button>
      ) : (
        <Button
          type="submit"
          formAction={saveArticle}
          onClick={formReset}
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
