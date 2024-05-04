import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa6";
import { publicArticle, saveArticle } from "@/server_actions/postForm";
import { FaRegSave } from "react-icons/fa";
import React, { Ref, useRef } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormData } from "@/types/formData";
import { MdOutlineCancel } from "react-icons/md";
import { TbWorld } from "react-icons/tb";

export const SubmitButtons = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLElement | null>(null);

  return (
    <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-end gap-5 items-center">
      <Button
        type="submit"
        formAction={saveArticle}
        rightIcon={<FaRegSave />}
        colorScheme="teal"
        variant="solid"
      >
        保存する
      </Button>

      <Button
        onClick={onOpen}
        rightIcon={<FaArrowRight />}
        colorScheme="teal"
        variant="outline"
      >
        公開する
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>公開しますか?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            公開した場合でも、あとから編集することはできます。
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef as Ref<HTMLButtonElement>}
              colorScheme="teal"
              onClick={onClose}
              rightIcon={<MdOutlineCancel />}
              variant="solid"
            >
              No
            </Button>
            <Button
              type="submit"
              formAction={publicArticle}
              onClick={onClose}
              colorScheme="teal"
              ml={3}
              variant="outline"
              rightIcon={<TbWorld />}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
