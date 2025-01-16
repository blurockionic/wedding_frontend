import {  
  GoSearch,
} from "react-icons/go";
import { toast } from "react-toastify";
import CustomButton from "../global/button/CustomButton";

const SubHeader = () => {
  //copy link
  const handleOnCopyLink = (link) => {
    // Check if Clipboard API is supported
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          console.log(`Link copied to clipboard: ${link}`);
          toast.success("Link copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy the link: ", err);
        });
    } else {
      // Fallback for browsers that do not support the Clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = link;
      textArea.style.position = "fixed"; // Prevent scrolling to bottom
      textArea.style.left = "-9999px"; // Keep it off-screen
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        console.log(`Link copied to clipboard: ${link}`);
        toast.success("Link copied to clipboard");
      } catch (err) {
        console.error("Failed to copy the link: ", err);
      }
      document.body.removeChild(textArea);
    }
  };

  const onSearch = async () => {
    // console.log(userPrefernces);
    // const l = await fetchDataset(userPrefernces);
    // console.log(l);
    // setDataSet(l);
  };

  return (
    <div className="w-full flex lg:items-center justify-between p-4 bg-gray-100 dark:bg-gray-400">
      <div className="w-full flex flex-col lg:flex-row items-center lg:items-center gap-y-3 lg:gap-x-2">
        <div className="w-full lg:w-auto flex gap-x-2">
          {/* Search Button */}
          <CustomButton
            text="Search"
            onClick={() => onSearch()}
            iconLeft={<GoSearch />}
            className="flex px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none dark:bg-card dark:text-card-foreground"
          />
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
