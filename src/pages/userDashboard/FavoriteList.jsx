import { useEffect, useState } from "react";
import ServiceCard from "../../components/ServiceCard";
import { useGetCartMutation } from "../../redux/serviceSlice";
import { hydrateFavorites } from "../../redux/favoriteSlice";
import { useDispatch, useSelector } from "react-redux";
import imagebg1 from "../../../public/userprofile/imagebg1.png";
export default function FavoriteList() {
  const [favoriteCart, setFavoriteCart] = useState([]);
  const dispatch = useDispatch();
  const [getCart, { isLoading }] = useGetCartMutation({});

  const favoriteList = useSelector((state) => {
    return state.favorites.favorites || [];
  });

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await getCart().unwrap();
        if (response?.cartItems) {
          setFavoriteCart(response.cartItems);
          if (response.cartItems.length === 0) {
            dispatch(hydrateFavorites([]));
          }
        }
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    if (favoriteList.length > 0) {
      fetchCartData();
    } else {
      setFavoriteCart([]);
    }
  }, [getCart, favoriteList, dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-foreground font-bold text-8xl">{"Loading..."}</p>
      </div>
    );
  }
  return (
    <div>
      <div className="relative font-montserrat ">
        <div className=" inset-0  ">
          <img
            className="w-full h-[15vh]  md:h-[30vh] object-cover"
            src={imagebg1}
            alt="bg image"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white  text-center">
          <h2 className="md:text-[4vw] text-[5vw]  font-bold ">From Wishes to Reality!</h2>
          <h5 className="md:text-[2vw] text-[2.5vw] font-light">
            Curate your favorites and plan with ease.
          </h5>
        </div>
      </div>
      <div className="py-10 px-2 lg:px-20 mx-auto">
        {/* Favorite List Grid */}
        {favoriteCart.length>0 ? (
          <div className="flex flex-wrap  justify-center md:justify-start mx-auto items-center w-fit  gap-5">
            {favoriteCart.map((favorite) => {
              const service = favorite?.service;
              if (service) {
                return <ServiceCard key={favorite.id} service={service} />;
              }
              return null;
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full bg-gray-50 rounded-md">
            <p className="text-foreground font-bold text-[5vw] ">
              {"No favorites found."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
