import { UseFormRegister } from "react-hook-form";
import { FormData } from "@/types/formData";
import { LuUpload } from "react-icons/lu";

type FileInputProps = {
  label: string;
  id: keyof FormData;
  accept: string;
  register: UseFormRegister<FormData>;
  fileName: string;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FileInput: React.FC<FileInputProps> = ({
  label,
  id,
  accept,
  register,
  fileName,
  onFileChange,
}) => {
  return (
    <>
      <label
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        htmlFor="avatar"
      >
        {label}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <LuUpload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600 dark:text-gray-400">
            <label
              className=" relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              htmlFor={id}
            >
              <span className="pl-6">Upload a file</span>
              <input
                {...register(id)}
                accept={accept}
                id={id}
                onChange={onFileChange}
                className="sr-only"
                type="file"
                name={id}
              />
            </label>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
      {fileName && (
        <span className="label-text-alt text-slate-600 font-bold">
          {fileName}
        </span>
      )}
    </>
  );
};
