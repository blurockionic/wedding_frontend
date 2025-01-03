import React from "react";
import ServiceCard from "../../components/ServiceCard";
import { useDispatch, useSelector } from "react-redux";
import { useClearCartMutation } from "../../redux/serviceSlice";
import { resetFavorites } from "../../redux/favoriteSlice";

export default function FavoriteList() {
  // Get favorite list from Redux store
  const favoriteList = useSelector((state) => state.favorites.favorites || []);

  console.log(favoriteList);
  


  const dispatch = useDispatch();

  // Clear cart mutation
  const [clearCart] = useClearCartMutation();

  // Handle reset cart
  const handleResetCart = async () => {
    try {
      await clearCart().unwrap(); // Backend call to clear cart
      dispatch(resetFavorites()); // Update Redux state after success
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  return (
    <div className="p-5">
      {/* Favorite List Grid */}
      {favoriteList.length ? (
        <div className="bg-muted grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteList.map((favorite) => (
            <ServiceCard key={favorite.id} service={favorite} />
          ))}
        </div>
      ) : (
        // Empty State Message
        <div className="flex items-center justify-center h-64">
          <p className="text-foreground font-bold  text-8xl">No favorites found.</p>
        </div>
      )}

      {/* Clear Cart Button */}
      {favoriteList.length > 0 && (
        <button
          className="bg-primary text-white py-2 px-4 rounded-lg mt-5"
          onClick={handleResetCart}
        >
          Clear Favorites
        </button>
      )}
    </div>
  );
}
