import { UseFormRegister } from "react-hook-form";
import { FormData } from "@/types/formData";

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
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-bold">{label}</span>
        </div>
        <input
          type="file"
          {...register(id)}
          accept={accept}
          id={id}
          onChange={onFileChange}
          className="file-input file-input-bordered w-full max-w-xs"
        />
      </label>
      {fileName && (
        <span className="label-text-alt text-slate-600 font-bold">
          {fileName}
        </span>
      )}
    </>
  );
};
