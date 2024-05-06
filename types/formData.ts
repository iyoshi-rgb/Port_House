export type FormData = {
  title: string | null;
  description: string | null;
  contents: string | null;
  gitUrl: string | null;
  appUrl: string | null;
  image: FileList | null;
  video: FileList | null;
  published: boolean;
};