import React, { useEffect, useRef, useState } from "react";

import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "../redux/authSlice";

export default function ContentSlider({ category, contentType }) {
  const { data } = useGetByCategoryQuery({ category, contentType });

  const [
    removeFromFavorite,
    { data: delFavData, isLoading: removeLoading, error: removeError },
  ] = useRemoveFromFavoriteMutation();

  const [
    addToFavorite,
    { isLoading: addLoading, error: addError, data: favData },
  ] = useAddtoFavoriteMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authenication.user);

  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (data) {
      setContent(data.content ?? []);
    }
  }, [data]);

  useEffect(() => {
    if (user && Array.isArray(user.favorites)) {
      setFavorites(user.favorites);
    }
  }, [user]);

  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const formattedContentType =
    contentType === "movie" ? " Movies" : " TV Shows";

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const handleFavoriteClick = async (item, e) => {
    e.preventDefault();
    const favoriteItem = {
      id: item.id,
      title: item.title || item.name,
      image: item.backdrop_path || item.poster_path,
      type: contentType,
      user: user._id,
    };

    if (favorites.some((fav) => fav.id === item.id)) {
      try {
        const res = await removeFromFavorite(favoriteItem); 
        if (res.error) {
          toast.error("Failed to remove from favorites.");
        } else {
          toast.success("Removed from favorites.");
          setFavorites((prevFavorites) =>
            prevFavorites.filter((fav) => fav.id !== item.id)
          );

          const updatedUser = {
            ...user,
            favorites: user.favorites.filter((favId) => favId !== item.id),
          };
          dispatch(loginUser(updatedUser));
        }
      } catch (error) {
        console.error("Failed to remove from favorites:", error);
      }
    } else {
      try {
        const res = await addToFavorite(favoriteItem);
        if (res.error) {
          toast.error("Failed to add to favorites.");
        } else {
          toast.success("Added to favorites.");
          setFavorites((prevFavorites) => [
            ...prevFavorites,
            { id: item.id },
          ]);

          const updatedUser = {
            ...user,
            favorites: [...user.favorites, item.id],
          };
          dispatch(loginUser(updatedUser));
        }
      } catch (error) {
        console.error("Failed to add to favorites:", error);
      }
    }
  };

  return (
    <div
      className="bg-black text-white relative px-5 md:px-20"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="mb-4 text-2xl font-bold">
        {formattedCategoryName} {formattedContentType}
      </h2>

      <div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
        ref={sliderRef}
      >
        {content.map((item) => (
          <div
            className="min-w-[250px] relative group"
            key={item.id}
            onMouseEnter={() => setHoveredItemId(item.id)}
            onMouseLeave={() => setHoveredItemId(null)}
          >
            <div className="rounded-lg overflow-hidden relative">
              <img
                onClick={() => navigate(`/watch/${contentType}/${item.id}`)}
                src={SMALL_IMG_BASE_URL + item.backdrop_path}
                alt="Movie image"
                className="transition-transform duration-300 ease-in-out group-hover:scale-125 cursor-pointer"
              />
              {hoveredItemId === item.id && (
                <button
                  type="button"
                  className="absolute z-50 top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white"
                  onClick={(e) => handleFavoriteClick(item, e)}
                >
                  <Heart
                    size={24}
                    className={
                      favorites.some((fav) => fav.id === item.id)
                        ? "text-red-500"
                        : "text-white"
                    }
                  />
                </button>
              )}
            </div>
            <p className="mt-2 text-center">{item.title || item.name}</p>
          </div>
        ))}
      </div>

      {showArrows && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
}