import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FcSurvey } from "react-icons/fc";

const Noarticle = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <FcSurvey className="h-48 w-48" />
      <span className="text-gray-500 font-semibold text-2xl">No article</span>
      <Link href={"/create"}>
        <Button colorScheme="teal" variant="link" size={"lg"}>
          Please Your Article !
        </Button>
      </Link>
    </div>
  );
};

export default Noarticle;
