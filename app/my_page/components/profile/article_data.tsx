import { getWorks } from "@/server_actions/get_article";
import Link from "next/link";
import React from "react";
import { TfiPencil } from "react-icons/tfi";
import DeleteButton from "./delete_button";
import PublishButton, { DraftButton } from "./publised_button";
import NoarticleButton from "./noarticle_button";
import { FaRegFaceRollingEyes } from "react-icons/fa6";
interface Props {
  id: string;
}

interface Article {
  id: string;
  title: string | null;
  createdat: Date;
  public: boolean;
}

export const ArticleData: React.FC<Props> = async ({ id }) => {
  const article: Article[] | null = await getWorks(id);

  const draft_article = article?.filter((article) => article.public === false);
  const publish_article = article?.filter((article) => article.public === true);

  return (
    <>
      <DraftArticleData draft_article={draft_article} id={id} />
      <PublishArticleData publish_article={publish_article} id={id} />
    </>
  );
};

interface DraftArticleProps {
  id: string;
  draft_article: Article[] | undefined;
}

function calculateDaysAgo(date: Date) {
  const today = new Date();

  const diff = today.getTime() - date.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

const DraftArticleData: React.FC<DraftArticleProps> = ({
  draft_article,
  id,
}) => {
  if (!draft_article || draft_article.length === 0) {
    return (
      <div>
        <h3 className="text-lg font-semibold">下書き</h3>
        <NoarticleButton />
      </div>
    );
  } else {
    return (
      <div>
        <h3 className="text-lg font-semibold">下書き</h3>
        <div className="mt-2 space-y-2">
          {draft_article.map((draft) => {
            const daysAgo = calculateDaysAgo(draft.createdat);
            return (
              <div
                className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-950"
                key={draft.id}
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{draft.title}</p>

                  {daysAgo === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      今日
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {daysAgo}日前
                    </p>
                  )}
                </div>
                <div className="flex gap-3 items-center">
                  <Link href={`/my_page/${id}/${draft.id}`}>
                    <TfiPencil className="h-6 w-6 " />
                  </Link>
                  <PublishButton id={draft.id} />
                  <DeleteButton id={draft.id} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

interface PublishArticleProps {
  publish_article: Article[] | undefined;
  id: string;
}

const PublishArticleData: React.FC<PublishArticleProps> = ({
  publish_article,
  id,
}) => {
  if (!publish_article || publish_article.length === 0) {
    return (
      <div>
        <h3 className="text-lg font-semibold">公開中</h3>
        <NoarticleButton />
      </div>
    );
  } else {
    return (
      <div>
        <h3 className="text-lg font-semibold">公開中</h3>
        <div className="mt-2 space-y-2">
          {publish_article.map((publish) => {
            const daysAgo = calculateDaysAgo(publish.createdat);
            return (
              <div
                className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-950"
                key={publish.id}
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{publish.title}</p>
                  {daysAgo === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      今日
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {daysAgo}日前
                    </p>
                  )}
                </div>
                <div className="flex gap-3 items-center">
                  <Link href={`/my_page/${id}/${publish.id}`}>
                    <TfiPencil className="h-6 w-6" />
                  </Link>

                  <DraftButton id={publish.id} />

                  <DeleteButton id={publish.id} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};
