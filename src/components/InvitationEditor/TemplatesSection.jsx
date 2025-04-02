import  { useState } from "react";
import { useGetAllTemplatesQuery } from "../../redux/invitationTemplateForAdminSlice";

const TemplatesSection = ({ templates, onTemplateClick, selectedTemplate }) => {
  const [filters, setFilters] = useState({
      name: "",
      minPrice: "",
      maxPrice: "",
      categoryByMood: "",
      categoryByAmount: "",
      categoryByRequirement: "",
      page: 1,
      limit: 10,
    });
  
  const { data, error, isLoading } = useGetAllTemplatesQuery(filters); 
  

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching templates</p>;

  return (
    <div className="h-screen bg-white text-black overflow-y-auto">
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder=" Search Templates...."
          className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:border-purple-500"
        />
      </div>
      <div className="flex space-x-4 mb-4">
        <button className="pb-2 text-sm font-semibold text-purple-600 border-b-2 border-purple-600">
          Templates
        </button>
      </div>
      <div className="flex space-x-2 overflow-x-auto pb-2 mb-4">
        {["Simple", "Party", "Wedding", "Birthday"].map((tag) => (
          <button
            key={tag}
            className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-600"
          >
            {tag}
          </button>
        ))}
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">Templates</h2>
          <a href="#" className="text-purple-600 text-xs">See all</a>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {data?.data?.map((template) => (
            <div
              key={template.id}
              className={`group relative rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] ${
                selectedTemplate?.id === template.id ? "ring-2 ring-purple-400" : ""
              }`}
              onClick={() => onTemplateClick(template)}
            >
              <img src={template.thumbnailUrl} alt={template.name} className="w-full h-52 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-2 flex flex-col justify-end">
                <span className="text-xs font-medium text-white">{template.name}</span>
              </div>
            </div>
          )) || <p>No templates available</p>}
        </div>
      </div>
    </div>
  </div>
);
};

export default TemplatesSection;
