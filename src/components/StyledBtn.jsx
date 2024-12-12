
import { BsArrowRight } from "react-icons/bs";

export default function StyledBtn({ title }) {
  return (
    <button
      type="submit"
      className="flex gap-5 items-center justify-between border-4 border-[#0f3c12]  bg-black text-white px-6 py-2 rounded-tl-xl rounded-br-xl hover:bg-black transition-all duration-300 ease-in-out w-full"
    >
      <span className="mr-2 uppercase font-bold text-xl">{title}</span>
      <span className="bg-white text-black transition-all rounded-tl-lg text-end rounded-br-lg duration-300 ease-in-out">
        <BsArrowRight className="text-2xl" />
      </span>
    </button>
  );
}
