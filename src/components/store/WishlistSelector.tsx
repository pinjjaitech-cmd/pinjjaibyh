"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Plus, Heart, Loader2, Check } from "lucide-react";
import { toast } from "sonner";

interface Wishlist {
  _id: string;
  name: string;
  notes?: string;
  productIds: string[];
  createdAt: string;
  updatedAt: string;
}

interface WishlistSelectorProps {
  productId: string;
  productTitle: string;
  children?: React.ReactNode;
  className?: string;
}

export default function WishlistSelector({ 
  productId, 
  productTitle, 
  children,
  className = "" 
}: WishlistSelectorProps) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [selectedWishlistId, setSelectedWishlistId] = useState<string>("");
  const [newWishlistName, setNewWishlistName] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);

  useEffect(() => {
    if (open && session) {
      loadWishlists();
    }
  }, [open, session]);

  const loadWishlists = async () => {
    if (!session?.user) return;
    
    setLoading(true);
    try {
      const response = await fetch("/api/wishlists");
      const data = await response.json();
      
      if (data.success) {
        setWishlists(data.data);
        // Auto-select first wishlist if available
        if (data.data.length > 0 && !selectedWishlistId) {
          setSelectedWishlistId(data.data[0]._id);
        }
      }
    } catch (error) {
      toast.error("Error loading wishlists");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWishlist = async () => {
    if (!newWishlistName.trim()) {
      toast.error("Please enter a wishlist name");
      return;
    }

    setCreating(true);
    try {
      const response = await fetch("/api/wishlists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newWishlistName.trim(),
          description: "My favorite items"
        })
      });

      const data = await response.json();
      
      if (data.success) {
        const newWishlist = data.data;
        setWishlists(prev => [newWishlist, ...prev]);
        setSelectedWishlistId(newWishlist._id);
        setNewWishlistName("");
        toast.success("Wishlist created successfully!");
      } else {
        toast.error(data.error || "Failed to create wishlist");
      }
    } catch (error) {
      toast.error("Error creating wishlist");
    } finally {
      setCreating(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!selectedWishlistId) {
      toast.error("Please select a wishlist");
      return;
    }

    setAddingToWishlist(true);
    try {
      // Check if product is already in the selected wishlist
      const selectedWishlist = wishlists.find(w => w._id === selectedWishlistId);
      if (selectedWishlist?.productIds.includes(productId)) {
        toast.error("Product is already in this wishlist");
        return;
      }

      const response = await fetch(`/api/wishlists/${selectedWishlistId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addProductId: productId })
      });

      const data = await response.json();
      
      if (data.success) {
        // Update the wishlist in local state
        setWishlists(prev => prev.map(w => 
          w._id === selectedWishlistId 
            ? { ...w, productIds: [...w.productIds, productId] }
            : w
        ));
        
        toast.success("Added to wishlist! <3");
        setOpen(false);
      } else {
        toast.error(data.error || "Failed to add to wishlist");
      }
    } catch (error) {
      toast.error("Error adding to wishlist");
    } finally {
      setAddingToWishlist(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset state when closing
      setSelectedWishlistId("");
      setNewWishlistName("");
    }
  };

  if (!session?.user) {
    return (
      <div className={`flex items-center justify-center gap-2 px-4 py-2 border-2 border-pink-200 hover:border-pink-300 hover:bg-pink-50 rounded-lg transition-all cursor-pointer group ${className}`}>
        <Heart className="h-5 w-5 text-pink-500" />
        <span className="text-sm font-medium text-pink-600 group-hover:text-pink-700">
          Sign in to save
        </span>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <div className={`flex items-center justify-center gap-2 px-4 py-2 border-2 border-pink-200 hover:border-pink-300 hover:bg-pink-50 rounded-lg transition-all cursor-pointer group ${className}`}>
            <Heart className="h-5 w-5 text-pink-500 group-hover:scale-110 transition-all" />
            <span className="text-sm font-medium text-pink-600 group-hover:text-pink-700">
              Save to Wishlist
            </span>
          </div>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500" />
            Save to Wishlist
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Product Info */}
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium truncate">{productTitle}</p>
            <p className="text-xs text-muted-foreground">Select a wishlist to save this item</p>
          </div>

          {/* Create New Wishlist */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Create New Wishlist</Label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., Wedding Picks, Birthday Ideas"
                value={newWishlistName}
                onChange={(e) => setNewWishlistName(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && handleCreateWishlist()}
              />
              <Button 
                onClick={handleCreateWishlist}
                disabled={creating || !newWishlistName.trim()}
                size="sm"
              >
                {creating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Or separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or select existing</span>
            </div>
          </div>

          {/* Existing Wishlists */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Your Wishlists</Label>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : wishlists.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Heart className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No wishlists yet</p>
                <p className="text-xs">Create your first wishlist above</p>
              </div>
            ) : (
              <ScrollArea className="h-48 w-full rounded-md border">
                <RadioGroup value={selectedWishlistId} onValueChange={setSelectedWishlistId}>
                  <div className="p-2 space-y-1">
                    {wishlists.map((wishlist) => {
                      const hasProduct = wishlist.productIds.includes(productId);
                      return (
                        <div key={wishlist._id} className="flex items-center space-x-2">
                          <RadioGroupItem value={wishlist._id} id={wishlist._id} disabled={hasProduct} />
                          <Label 
                            htmlFor={wishlist._id} 
                            className={`flex-1 cursor-pointer rounded-md p-2 transition-colors ${
                              selectedWishlistId === wishlist._id 
                                ? 'bg-pink-50 border border-pink-200' 
                                : 'hover:bg-muted'
                            } ${hasProduct ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-sm">{wishlist.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {wishlist.productIds.length} item{wishlist.productIds.length !== 1 ? 's' : ''}
                                </p>
                              </div>
                              {hasProduct && (
                                <Check className="h-4 w-4 text-green-600" />
                              )}
                            </div>
                            {hasProduct && (
                              <p className="text-xs text-green-600 mt-1">Already saved</p>
                            )}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>
              </ScrollArea>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddToWishlist}
              disabled={!selectedWishlistId || addingToWishlist}
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
            >
              {addingToWishlist ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Heart className="h-4 w-4 mr-2" />
                  Save to Wishlist
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
