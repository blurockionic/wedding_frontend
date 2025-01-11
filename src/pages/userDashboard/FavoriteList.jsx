import { useEffect, useState } from "react";
import ServiceCard from "../../components/ServiceCard";
import { useGetCartMutation } from "../../redux/serviceSlice";
import { hydrateFavorites } from "../../redux/favoriteSlice";
import { useDispatch, useSelector } from "react-redux";

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
    <div className="p-5">
      {/* Favorite List Grid */}
      {favoriteCart.length ? (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteCart.map((favorite) => {
            const service = favorite?.service;
            if (service) {
              return <ServiceCard key={favorite.id} service={service} />;
            }
            return null;
          })}
        </div>
      ) : (
        // Empty State Message
        <div className="flex items-center justify-center h-64">
          <p className="text-foreground font-bold text-8xl">
            {"No favorites found."}
          </p>
        </div>
      )}
    </div>
  );
}
