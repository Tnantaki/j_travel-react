import { ChangeEvent } from "react";

interface Props {
  edit?: boolean;
  setFile: (file: File | null) => void;
  preview: string | null
  setPreview: (preview: string | null) => void
}

const FileUpload = ({ edit, setFile, preview, setPreview }: Props) => {

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  return (
    <div
      className={`rounded-full size-18 lg:size-24 shrink-0 overflow-hidden bg-slate-700 group relative ${
        edit && "hover:brightness-75"
      }`}
    >
      {preview && (
        <img
          src={preview}
          alt="photo"
          className="z-0 object-center object-cover w-full h-full absolute"
        />
      )}
      {edit && (
        <>
          <input
            type="file"
            className="w-full h-full opacity-0 absolute group-hover:cursor-pointer z-20"
            onChange={handleFileChange}
          />
          <p className="absolute hidden group-hover:block text-center text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            Upload Photo
          </p>
        </>
      )}
    </div>
  );
};

export default FileUpload;
