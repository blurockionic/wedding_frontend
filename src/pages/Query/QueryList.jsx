import QueryCard from '../../components/Query/QueryCard.jsx';
import { CiFilter } from "react-icons/ci";

const QueryList = () => {
  return (
    <div className="max-w-[80%] h-[100vh] mx-auto p-4">
      <div className="p-6">
        <h2 className="text-3xl font-semibold text-[#f9006c]">Query Management</h2>
        <p className="text-sm py-2">Manage and respond to customer inquiries</p>
      </div>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder=" Search queries by name and content..."
          className="w-3/4 p-3 border-2 border-gray-200 rounded mt-[20px]"
        />
        <button className="w-[220px] h-[50px] mt-[20px] border-2 border-gray-200 rounded flex justify-center items-center gap-2"><CiFilter className='text-[26px] text-[#f9006c]'/> All Queries</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-[60px]">
        <QueryCard
          name="John Doe"
          phoneNumber="123-456-7890"
          query="query"
          actions={['Resolve']}
        />
        <QueryCard
          name="Jane Smith"
          phoneNumber="987-654-3210"
          query="query"
          actions={['Resolve']}
        />
        <QueryCard
          name="Alice Johnson"
          phoneNumber="555-123-4567"
          query="query"
          actions={['Resolve']}
        />
        <QueryCard
          name="Bob Brown"
          phoneNumber="444-789-1234"
          query="query"
          actions={['Resolve']}
        />
        <QueryCard
          name="John Doe"
          phoneNumber="123-456-7890"
          query="query"
          actions={['Resolve']}
        />
        <QueryCard
          name="Jane Smith"
          phoneNumber="987-654-3210"
          query="query"
          actions={['Resolve']}
        />
        <QueryCard
          name="Alice Johnson"
          phoneNumber="555-123-4567"
          query="query"
          actions={['Resolve']}
        />
        <QueryCard
          name="Bob Brown"
          phoneNumber="444-789-1234"
          query="query"
          actions={['Resolve']}
        />
      </div>
    </div>
  );
};

export default QueryList;
