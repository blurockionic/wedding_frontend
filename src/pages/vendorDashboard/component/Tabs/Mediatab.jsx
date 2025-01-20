import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { BiUpload } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { useUplMultiMutation } from "../../../../redux/uploadSlice";

const reMediatab = ({ serviceId, handleCloseMedia }) => {
  const [files, setFiles] = useState([]);
  const { control, handleSubmit } = useForm();
  const [uploadFiles, { isLoading, isError, error }] = useUplMultiMutation(); // Hook to trigger the file upload

  const handleFileChange = (file, index) => {
    if (file) {
      const newFiles = [...files];
      newFiles[index] = {
        file,
        preview: URL.createObjectURL(file),
        uploaded: false,
      };
      setFiles(newFiles);
    }
  };

  const addNewRow = () => {
    setFiles([...files, { file: null, preview: "", uploaded: false }]);
  };

  const removeRow = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      files.forEach((fileObj) => {
        if (fileObj.file) {
          formData.append("files", fileObj.file);
        }
      });
      formData.append("serviceId", serviceId);

      // Call the mutation to upload files
      await uploadFiles({ serviceId, data: formData }).unwrap();

      const updatedFiles = files.map((file) => ({
        ...file,
        uploaded: true,
      }));
      setFiles(updatedFiles);
      handleCloseMedia();
       // Trigger the refresh
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div className="h-fit w-full py-8">
      <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black h-full p-6 bg-opacity-20 rounded-xl shadow-lg border border-gray-700 max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white mb-8">
          Media Upload
        </h2>

        <button
          onClick={handleCloseMedia}
          className="absolute top-3 right-3 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600 transition"
        >
          <MdClose className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6">
            {files.map((fileObj, index) => (
              <div
                key={index}
                className="relative bg-gray-900 bg-opacity-50 p-5 rounded-lg shadow-md flex items-center gap-4 border border-gray-700 hover:border-gray-600 transition"
              >
                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  className="absolute top-50 right-3 bg-gradient-to-tr from-slate-500 to-slate-700 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md hover:shadow-lg transition transform hover:scale-105"
                >
                  <MdClose className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4 w-full">
                  <Controller
                    name={`file-${index}`}
                    control={control}
                    defaultValue={fileObj.file}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="file"
                        accept="image/*, video/*"
                        onChange={(e) =>
                          handleFileChange(e.target.files[0], index)
                        }
                        className="p-2 bg-gray-800 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                      />
                    )}
                  />
                  {fileObj.preview && (
                    <div className="w-24 h-24 overflow-hidden rounded-md border border-gray-700">
                      {fileObj.file?.type.startsWith("image/") ? (
                        <img
                          src={fileObj.preview}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      ) : fileObj.file?.type.startsWith("video/") ? (
                        <video
                          src={fileObj.preview}
                          controls
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 justify-center mt-6">
            <button
              type="button"
              onClick={addNewRow}
              className="px-6 py-3 bg-blue-700 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition transform hover:scale-105"
            >
              Add Another Media
            </button>
            <button
              disabled={files.length === 0 || isLoading}
              type="submit"
              className={`px-8 py-3 flex items-center gap-3 font-medium rounded-lg shadow-md transition transform hover:scale-105 ${
                files.length === 0 || isLoading
                  ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-500 hover:shadow-lg"
              }`}
            >
              {isLoading ? "Uploading..." : "Upload Files"}{" "}
              <BiUpload className="w-5 h-5" />
            </button>
          </div>
        </form>

        {isError && (
          <div className="mt-4 text-red-500">
            Error: {error?.message || "File upload failed!"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mediatab;
