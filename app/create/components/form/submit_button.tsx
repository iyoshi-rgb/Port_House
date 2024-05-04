import { Button } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa6";
import { publicArticle, saveArticle } from "@/server_actions/postForm";
import { FaRegSave } from "react-icons/fa";

export const SubmitButtons = () => (
  <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-end gap-2 items-center">
    <Button
      type="submit"
      formAction={saveArticle}
      leftIcon={<FaRegSave />}
      colorScheme="teal"
      variant="solid"
    >
      下書き保存
    </Button>
    <Button
      type="submit"
      formAction={publicArticle}
      rightIcon={<FaArrowRight />}
      colorScheme="teal"
      variant="outline"
    >
      公開する
    </Button>
  </div>
);
