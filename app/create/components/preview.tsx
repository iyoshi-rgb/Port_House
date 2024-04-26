import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

export const Preview = ({ formData }: any) => {
  console.log("preview", formData);
  return (
    <div>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        maxW={"sm"}
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "150px" }}
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            <Heading size="md">{formData.title}</Heading>

            <Text py="2">{formData.content}</Text>
          </CardBody>

          <CardFooter></CardFooter>
        </Stack>
      </Card>
    </div>
  );
};
