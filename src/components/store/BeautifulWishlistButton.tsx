"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface BeautifulWishlistButtonProps {
  productId: string;
  productTitle: string;
  className?: string;
}

export default function BeautifulWishlistButton({ 
  productId, 
  productTitle, 
  className = "" 
}: BeautifulWishlistButtonProps) {
  const { data: session } = useSession();
  const [isAdding, setIsAdding] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleAddToWishlist = async () => {
    if (!session?.user) {
      toast.error("Please sign in to add items to wishlist");
      return;
    }

    setIsAdding(true);
    try {
      // Get user's default wishlist or create one
      const wishlistResponse = await fetch("/api/wishlists");
      const wishlistData = await wishlistResponse.json();
      
      let wishlistId;
      if (wishlistData.success && wishlistData.data.length > 0) {
        wishlistId = wishlistData.data[0]._id;
      } else {
        // Create a new wishlist
        const createResponse = await fetch("/api/wishlists", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "My Wishlist",
            description: "My favorite items"
          })
        });
        const createData = await createResponse.json();
        if (createData.success) {
          wishlistId = createData.data._id;
        }
      }

      if (wishlistId) {
        // Add product to wishlist
        const addResponse = await fetch(`/api/wishlists/${wishlistId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ addProductId: productId })
        });

        const addData = await addResponse.json();
        
        if (addData.success) {
          setIsInWishlist(true);
          toast.success("Added to wishlist! ❤️");
        } else {
          toast.error(addData.error || "Failed to add to wishlist");
        }
      }
    } catch (error) {
      toast.error("Error adding to wishlist");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div 
      className={`flex items-center justify-center gap-2 px-4 py-2 border-2 border-pink-200 hover:border-pink-300 hover:bg-pink-50 rounded-lg transition-all cursor-pointer group ${className}`}
      onClick={handleAddToWishlist}
    >
      {isAdding ? (
        <Loader2 className="h-5 w-5 text-pink-500 animate-spin" />
      ) : (
        <Heart 
          className={`h-5 w-5 transition-all group-hover:scale-110 ${
            isInWishlist 
              ? "fill-pink-500 text-pink-500" 
              : "text-pink-500 hover:text-pink-600"
          }`} 
        />
      )}
      <span className="text-sm font-medium text-pink-600 group-hover:text-pink-700">
        {isInWishlist ? "Saved" : "Save to Wishlist"}
      </span>
    </div>
  );
}
