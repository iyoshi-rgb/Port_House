import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { TbArticleOff } from "react-icons/tb";

const NoarticleButton = () => {
  return (
    <div className="flex flex-col items-center justify-center py-3">
      <TbArticleOff className="text-center h-20 w-20" />
      <span className="text-gray-500 font-medium">No Article</span>
      <Link href={"/create"}>
        <Button colorScheme="teal" variant="link">
          Let`s create!
        </Button>
      </Link>
    </div>
  );
};

export default NoarticleButton;
