import React from "react";
import { Avatar, Wrap, WrapItem } from "@chakra-ui/react";

export const UserButton = () => {
  return (
    <div>
      <Wrap>
        <WrapItem>
          <Avatar
            size="md"
            name="Segun Adebayo"
            src="https://bit.ly/sage-adebayo"
          />{" "}
        </WrapItem>
      </Wrap>
    </div>
  );
};
