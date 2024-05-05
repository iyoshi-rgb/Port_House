import React from "react";
import { UserData } from "./profile/user_data";
import { ArticleData } from "./profile/article_data";

type Props = {
  id: string;
};

export const UserProfile: React.FC<Props> = ({ id }) => {
  return (
    <div className="flex flex-1 justify-center flex-col items-center gap-6 py-8 px-4 sm:px-6 md:flex-row md:items-start md:gap-8 lg:px-8">
      <UserData id={id} />
      <div className="w-full max-w-md space-y-6">
        <ArticleData id={id} />
      </div>
    </div>
  );
};
