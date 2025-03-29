import  { memo, useState, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { SelectField } from "../../../components/global/select/SelectField";
import RangeSlider from "../../../components/global/RangeSlider";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader } from "lucide-react";
import ServiceLocationSearch from "./ServiceLocationSearch";
import ServiceSearch from "./ServiceSearch";

const Filterbar = memo(
  ({ filters, onFilterChange, isLoading, city, service_type }) => {
    const {
      register,
      handleSubmit,
      reset,
      setValue,
      watch,
      formState: { errors },
    } = useForm({
      defaultValues: useMemo(
        () => ({
          city: filters?.city || "",
          state: filters?.state || "",
          minPrice: filters?.minPrice || "0",
          maxPrice: filters?.maxPrice || "1000000",
          rating: filters?.rating || "",
          sort_by: filters?.sort_by || "",
          sort_order: filters?.sort_order || "",
          service_type: filters?.service_type || "",
        }),
        [filters]
      ),
    });

    const selectedValue = watch("sort_by");
    const navigate = useNavigate();
    const location = useLocation();
    const [category, setCategory] = useState(null);

    useEffect(() => {
      if (!category) return;

      const [selectedCategory, selectedSubCategory] = category.split("/");
      setValue("service_type", selectedSubCategory, { shouldDirty: true });
      const pathSegments = location.pathname.split("/");
      if (pathSegments.length >= 3) {
        pathSegments[2] = selectedCategory.toLowerCase();
        pathSegments[3] = selectedSubCategory.toLowerCase();
      }

      pathSegments.splice(6);
    //   navigate(pathSegments.join("/"), { replace: true });
    }, [category, location.pathname, navigate, setValue]);

    const handleFilterChange = useCallback(
      (data) => {
        if (JSON.stringify(data) !== JSON.stringify(filters)) {
          onFilterChange(data);
        }
      },
      [onFilterChange, filters]
    );

    const setSearchLocation = useCallback(
      (selectedCity) => {
        if (!selectedCity) return;

        const [selectedState, selectedCityName] = selectedCity.split("/");

        if (
          watch("city") === selectedCityName &&
          watch("state") === selectedState
        ) {
          return;
        }

        setValue("city", selectedCityName, { shouldDirty: true });
        setValue("state", selectedState, { shouldDirty: true });

        const pathSegments = location.pathname.split("/");
        if (pathSegments.length >= 3) {
          pathSegments[4] = selectedState.toLowerCase();
          pathSegments[5] = selectedCityName.toLowerCase();
        }

        pathSegments.splice(6);
        // navigate(pathSegments.join("/"), { replace: true });
      },
      [setValue, navigate, location, watch]
    );

    const sortByOptions = useMemo(
      () => [
        { value: "created_at", label: "Newest" },
        { value: "min_price", label: "Lowest Price" },
        { value: "rating", label: "Rating" },
      ],
      []
    );

    const sortOrderOptions = useMemo(
      () => [
        { value: "asc", label: "Low to High" },
        { value: "desc", label: "High to Low" },
      ],
      []
    );

    return (
      <div className="w-full p-4">
        <form onSubmit={handleSubmit(handleFilterChange)} className="space-y-4">
          <ServiceLocationSearch setSearchLocation={setSearchLocation} city={city} />

          <div className="border rounded-md">
            <ServiceSearch
              setCategory={setCategory}
              service_type={service_type}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 mb-2 font-medium">
              Price Range: {watch("minPrice")} - {watch("maxPrice")}
            </label>
            <RangeSlider
              start={[watch("minPrice"), watch("maxPrice")]}
              min={0}
              max={100000}
              onChange={(values) => {
                setValue("minPrice", values[0]);
                setValue("maxPrice", values[1]);
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[4, 3, 2, 1].map((value) => (
              <label
                key={value}
                className="flex items-center space-x-2 p-2 border rounded-lg shadow-sm hover:bg-gray-100"
              >
                <input
                  type="radio"
                  value={value}
                  {...register("rating")}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 font-medium">&gt;= {value}</span>
              </label>
            ))}
          </div>

          <SelectField
            id="sort_by"
            placeholder="Sort By"
            options={sortByOptions}
            register={register}
          />
         
          <SelectField
            id="sort_order"
            placeholder="Sort Order"
            options={sortOrderOptions}
            register={register}
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                reset();
                onFilterChange({});
              }}
              className="w-full bg-gray-300 text-gray-700 py-2 rounded"
            >
              Reset
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="w-full capitalize bg-green-500 text-white py-2 rounded"
            >
              {isLoading ? (
                <Loader size={24} className="animate-spin" />
              ) : (
                "Apply"
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }
);

export default Filterbar;
