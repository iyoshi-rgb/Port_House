import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdImages } from "react-icons/io";
import { Articles } from "./Card";
import { createClient } from "@/utils/supabase/server";
import { CardGetUser } from "@/server_actions/get_user";
import { Avatar } from "@chakra-ui/react";

interface Props {
  data: Articles;
}

interface User {
  id: string;
  image: string | null;
  name: string | null;
}

function getImageUrl(path: string | null) {
  if (!path) {
    return null;
  } else {
    const supabase = createClient();
    const { data } = supabase.storage.from("porthouse").getPublicUrl(`${path}`);
    const url = data.publicUrl;
    return url;
  }
}

const CardList: React.FC<Props> = async ({ data }) => {
  console.log("data", data);
  const url = getImageUrl(data.imagePath);
  const user: User | null = await CardGetUser(data.userId);
  console.log(user);

  return (
    <div
      className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2 "
      key={data.id}
    >
      <Link className="absolute inset-0 z-10" href={`/article/${data.id}`}>
        <span className="sr-only">View Artwork</span>
      </Link>
      {url ? (
        <Image
          alt="Artwork 1"
          className="object-cover h-60"
          height={400}
          src={url}
          style={{
            aspectRatio: "600/400",
            objectFit: "cover",
          }}
          width={600}
        />
      ) : (
        <div className="w-full h-60 flex flex-col justify-center items-center">
          <IoMdImages className="text-8xl" />
          <span className="text-lg pt-2  text-gray-500">No Image</span>
        </div>
      )}
      <div className="bg-white p-4 dark:bg-gray-950">
        <h3 className="font-bold text-xl">{data.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {data.description}
        </p>
        <div className="flex flex-row space-x-2 items-center justify-end px-2">
          {user?.image ? (
            <Avatar size="lg" name="User`s Image" src={user.image} />
          ) : (
            <Avatar
              size="lg"
              name="No user`s Image"
              src="https://bit.ly/broken-link"
            />
          )}
          <p className="text-lg text-gray-500 dark:text-gray-400">
            {user?.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardList;
