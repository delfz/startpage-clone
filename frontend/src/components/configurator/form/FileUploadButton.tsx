import React, { FC, useRef } from 'react';
import { ImCamera } from 'react-icons/im';

type Props = {
  handleFileUpload: (file: File) => void;
};

const FileUploadButton: FC<Props> = (props) => {
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={(event) => {
          if (event.target.files && event.target.files.length == 1) {
            const fileUploaded = event.target.files[0];

            props.handleFileUpload(fileUploaded);
          }
        }}
        className="hidden"
      />

      <button
        onClick={() => {
          if (hiddenFileInput && hiddenFileInput.current)
            hiddenFileInput.current.click();
        }}
        className="w-full bg-white rounded border border-gray-400 hover:border-black px-4 py-2.5 text-gray-600 font-semibold text-xs flex justify-center items-center gap-2"
      >
        <ImCamera /> Upload Image (PNG, JPG or GIF)
      </button>
    </>
  );
};

export default FileUploadButton;
