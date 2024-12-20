import React, { useState } from "react";

const Mediatab = ({ serviceId }) => {
  const [files, setFiles] = useState([]);

  const handleMediaUpload = async (file, index) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("serviceId", serviceId);

      const response = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Media uploaded:", data);

      const updatedFiles = [...files];
      updatedFiles[index] = { ...updatedFiles[index], uploaded: true };
      setFiles(updatedFiles);
    } catch (error) {
      console.error("Error uploading media:", error);
    }
  };

  const handleFileChange = (e, index) => {
    const newFile = e.target.files[0];

    if (newFile) {
      const newFiles = [...files];
      newFiles[index] = {
        file: newFile,
        preview: URL.createObjectURL(newFile),
        uploaded: false,
      };
      setFiles(newFiles);

      handleMediaUpload(newFile, index);
    }
  };

  const addNewRow = () => {
    setFiles([...files, { file: null, preview: "", uploaded: false }]);
  };

  const removeRow = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  return (
    <div className="h-fit w-full  py-8">
        
      <div
        className="bg-transparent h-full p-4 py-6 bg-pink-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 px-8 w-full max-w-4xl mx-auto"
      >
         <h2 className="text-3xl font-bold mb-6 text-white">Media Upload</h2>
       

        <div className="grid grid-cols-1 gap-6">
          {files.map((fileObj, index) => (
            <div
              key={index}
              className="file-upload-card relative bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-lg shadow-lg flex items-center gap-4"
            >
              {/* Close Button */}
              <button
                onClick={() => removeRow(index)}
                className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center"
              >
                <span className="text-sm">X</span>
              </button>

              {/* File Input and Preview */}
              <div className="flex items-center gap-4 w-full">
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, index)}
                  accept="image/*, video/*"
                  className="file-input p-2 border border-gray-300 rounded-md"
                />
                <div className="preview-container">
                  {fileObj.preview && (
                    <div className="preview-box w-24 h-24 overflow-hidden rounded-md border-2 border-gray-300">
                      {fileObj.file.type.startsWith("image/") ? (
                        <img
                          src={fileObj.preview}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      ) : fileObj.file.type.startsWith("video/") ? (
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

              {/* Show upload status */}
              {fileObj.uploaded && (
                <span className="text-green-500 mt-2 block">Uploaded</span>
              )}
            </div>
          ))}
        </div>

        {/* Button to add more rows */}
        <div className="mt-4 text-center">
          <button
            onClick={addNewRow}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Add Another Media
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mediatab;
