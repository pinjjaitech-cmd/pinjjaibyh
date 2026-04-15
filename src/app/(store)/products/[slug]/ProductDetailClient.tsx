"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Star, Heart, Share2, Truck, Shield, RotateCcw, Minus, Plus, Check, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import WishlistSelector from "@/components/store/WishlistSelector";

interface Product {
  _id: string;
  title: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  services: string[];
  slug: string;
  defaultVariantId?: string;
  variants: {
    _id: string;
    skuCode: string;
    attributes: { name: string; value: string }[];
    images: string[];
    price: number;
    cuttedPrice?: number;
    trackQuantity: boolean;
    stockQuantity: number;
    isActive: boolean;
  }[];
  category?: {
    _id: string;
    name: string;
    slug: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Review {
  _id: string;
  productId: string;
  userId: {
    _id: string;
    fullName: string;
    email: string;
    avatar?: string;
  };
  rating: number;
  title?: string;
  review: string;
  images?: string[];
  isVerified?: boolean;
  helpful?: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductDetailClientProps {
  productSlug: string;
}

export default function ProductDetailClient({ productSlug }: ProductDetailClientProps) {
  const { data: session } = useSession();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<Product['variants'][0] | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    title: "",
    review: ""
  });
  const [submittingReview, setSubmittingReview] = useState(false);

  const serviceIcons = {
    "free-delivery": Truck,
    "cash-on-delivery": Shield,
    "replacement": RotateCcw,
  };

  const serviceLabels = {
    "free-delivery": "Free Delivery",
    "cash-on-delivery": "Cash on Delivery", 
    "replacement": "Replacement Available",
  };

  useEffect(() => {
    fetchProduct();
  }, [productSlug]);

  useEffect(() => {
    if (product) {
      fetchReviews();
    }
  }, [product]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products?slug=${encodeURIComponent(productSlug)}`);
      const data = await response.json();

      if (data.success && data.data) {
        setProduct(data.data);
        
        // Set default variant
        const defaultVariant = data.data.variants.find(
          (v: any) => v._id === data.data.defaultVariantId
        ) || data.data.variants[0];
        setSelectedVariant(defaultVariant);
      } else {
        toast.error("Product not found");
      }
    } catch (error) {
      toast.error("Error loading product");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);
      // Only fetch reviews after product is loaded and we have the product ID
      if (!product?._id) {
        setReviews([]);
        return;
      }
      const response = await fetch(`/api/customer-reviews?productId=${product._id}&limit=10`);
      const data = await response.json();

      if (data.success) {
        setReviews(data.data);
      } else {
        console.error("API Error:", data.error);
        setReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleVariantChange = (variantId: string) => {
    const variant = product?.variants.find(v => v._id === variantId);
    if (variant) {
      setSelectedVariant(variant);
      setSelectedImage(0); // Reset to first image when variant changes
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && (!selectedVariant?.trackQuantity || newQuantity <= (selectedVariant?.stockQuantity || 0))) {
      setQuantity(newQuantity);
    }
  };

  const handleWhatsAppBooking = () => {
    if (!product || !selectedVariant) return;
    
    const message = `Hi Pinjjai team! I'm interested in booking this product:\n\n★ Product: ${product.title}\n★ Variant: ${selectedVariant.skuCode}\n★ Price: ${formatPrice(selectedVariant.price)}\n\n${selectedVariant.attributes.map(attr => `${attr.name}: ${attr.value}`).join('\n')}`;
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919899187882'}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmitReview = async () => {
    if (!session?.user) {
      toast.error("Please sign in to submit a review");
      return;
    }

    if (!reviewData.title.trim() || !reviewData.review.trim()) {
      toast.error("Please fill in all review fields");
      return;
    }

    if (!product?._id) {
      toast.error("Product information not available");
      return;
    }

    setSubmittingReview(true);
    try {
      const response = await fetch("/api/customer-reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          userId: session.user.id,
          rating: reviewData.rating,
          review: reviewData.review,
          // Note: API doesn't expect title field, but we'll keep it for potential future use
          title: reviewData.title,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Review submitted successfully!");
        setReviewData({ rating: 5, title: "", review: "" });
        fetchReviews(); // Refresh reviews
      } else {
        toast.error(data.error || "Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Error submitting review");
    } finally {
      setSubmittingReview(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const renderStars = (rating: number, size = "sm") => {
    const sizeClass = size === "lg" ? "h-5 w-5" : "h-4 w-4";
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const getStockStatus = () => {
    if (!selectedVariant?.isActive) return { status: "Inactive", color: "text-gray-500" };
    if (!selectedVariant.trackQuantity) return { status: "In Stock", color: "text-green-600" };
    if (selectedVariant.stockQuantity === 0) return { status: "Out of Stock", color: "text-red-600" };
    if (selectedVariant.stockQuantity <= 10) return { status: `Only ${selectedVariant.stockQuantity} left`, color: "text-yellow-600" };
    return { status: "In Stock", color: "text-green-600" };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product || !selectedVariant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const stockStatus = getStockStatus();
  const currentImages = selectedVariant.images.length > 0 ? selectedVariant.images : ['/products/placeholder.png'];
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="min-h-screen bg-">
      <div className="max-w-7xl mx-auto px-4 py-8">
        

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
              <Image
                src={currentImages[selectedImage]}
                alt={`${product.title} - Image ${selectedImage + 1}`}
                fill
                className="object-cover"
                priority
              />
              {selectedVariant.cuttedPrice && selectedVariant.cuttedPrice > selectedVariant.price && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                  Sale
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {currentImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} - Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category */}
            <div>
              <Badge variant="outline" className="text-xs">
                {product.category?.name || "Uncategorized"}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {renderStars(Math.round(averageRating))}
                <span className="font-medium">{averageRating.toFixed(1)}</span>
              </div>
              <span className="text-muted-foreground">({reviews.length} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold">
                {formatPrice(selectedVariant.price)}
              </div>
              {selectedVariant.cuttedPrice && selectedVariant.cuttedPrice > selectedVariant.price && (
                <div className="text-lg text-muted-foreground line-through">
                  {formatPrice(selectedVariant.cuttedPrice)}
                </div>
              )}
            </div>

            {/* Variant Selection */}
            {product.variants.length > 1 && (
              <div className="space-y-3">
                <label className="text-sm font-medium">Select Variant</label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant._id}
                      onClick={() => handleVariantChange(variant._id)}
                      className={`relative border-2 rounded-lg p-3 transition-all hover:shadow-md ${
                        selectedVariant._id === variant._id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {/* Variant Image Preview */}
                      <div className="relative aspect-square mb-2 rounded-md overflow-hidden bg-muted">
                        <Image
                          src={variant.images[0] || '/products/placeholder.png'}
                          alt={`${variant.skuCode} variant`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                       
                      </div>
                      
                      {/* Variant Info */}
                      <div className="text-left">
                        <div className="font-medium text-sm truncate">
                          {product.title}
                        </div>
                        
                        {/* Attributes */}
                        <div className="text-xs text-muted-foreground space-y-0.5">
                          {variant.attributes.slice(0, 2).map((attr, index) => (
                            <div key={index}>
                              {attr.name}: {attr.value}
                            </div>
                          ))}
                          {variant.attributes.length > 2 && (
                            <div>+{variant.attributes.length - 2} more</div>
                          )}
                        </div>
                        
                        {/* Price */}
                        <div className="mt-1 flex items-center gap-2">
                          <span className="font-semibold text-sm">
                            {formatPrice(variant.price)}
                          </span>
                          {variant.cuttedPrice && variant.cuttedPrice > variant.price && (
                            <span className="text-xs text-muted-foreground line-through">
                              {formatPrice(variant.cuttedPrice)}
                            </span>
                          )}
                        </div>
                        
                        {/* Stock Status */}
                        <div className="mt-1">
                          {variant.stockQuantity === 0 ? (
                            <span className="text-xs text-red-600 font-medium">Out of Stock</span>
                          ) : variant.stockQuantity <= 5 ? (
                            <span className="text-xs text-yellow-600 font-medium">
                              Only {variant.stockQuantity} left
                            </span>
                          ) : (
                            <span className="text-xs text-green-600 font-medium">In Stock</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Selected Indicator */}
                      {selectedVariant._id === variant._id && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`text-sm font-medium ${stockStatus.color}`}>
                {stockStatus.status}
              </div>
              {selectedVariant.trackQuantity && selectedVariant.stockQuantity <= 10 && selectedVariant.stockQuantity > 0 && (
                <Badge variant="outline" className="text-xs">
                  Low Stock
                </Badge>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Services */}
            {product.services.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {product.services.map((service) => {
                    const Icon = serviceIcons[service as keyof typeof serviceIcons];
                    return (
                      <div key={service} className="flex items-center gap-2 text-sm">
                        <Icon className="h-4 w-4 text-primary" />
                        <span>{serviceLabels[service as keyof typeof serviceLabels]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-4">
              {/* WhatsApp Booking Button */}
              <Button 
                onClick={handleWhatsAppBooking}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-3 text-lg transition-all hover:shadow-lg"
                disabled={stockStatus.status === "Out of Stock" || !selectedVariant.isActive}
              >
                <div className="relative">
                  <MessageCircle className="h-6 w-6" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                Book via WhatsApp
              </Button>

              {/* Secondary Actions */}
              <div className="flex items-center gap-3">
                <WishlistSelector 
                  productId={product._id} 
                  productTitle={product.title}
                  className="flex-1"
                />
                
                <Button variant="outline" size="sm" className="hover:bg-muted transition-all">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Stock Info */}
              {selectedVariant.trackQuantity && selectedVariant.stockQuantity > 0 && selectedVariant.stockQuantity <= 5 && (
                <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-amber-800 font-medium">
                    Only {selectedVariant.stockQuantity} items left - Order soon!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="details" className="flex flex-col mt-16">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Category</h4>
                    <p className="text-muted-foreground">
                      {product.category?.name || "Uncategorized"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">SKU</h4>
                    <p className="text-muted-foreground font-mono">
                      {selectedVariant.skuCode}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Availability</h4>
                    <p className={`font-medium ${stockStatus.color}`}>
                      {stockStatus.status}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Variants Available</h4>
                    <p className="text-muted-foreground">
                      {product.variants.length} option{product.variants.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Variant Attributes</h4>
                  <div className="space-y-2">
                    {selectedVariant.attributes.map((attr, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-muted-foreground">{attr.name}:</span>
                        <span className="font-medium">{attr.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            {/* Review Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">
                      {averageRating.toFixed(1)}
                    </div>
                    <div className="flex justify-center my-2">
                      {renderStars(Math.round(averageRating), "lg")}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = reviews.filter(r => Math.floor(r.rating) === rating).length;
                        const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                        return (
                          <div key={rating} className="flex items-center gap-2">
                            <span className="text-sm w-12">{rating} ★</span>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-12">
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Write Review */}
            <Card>
              <CardHeader>
                <CardTitle>Write a Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!session?.user ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Please sign in to write a review</p>
                    <Button asChild>
                      <Link href="/auth">Sign In</Link>
                    </Button>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="text-sm font-medium">Rating</label>
                      <div className="flex gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setReviewData(prev => ({ ...prev, rating: star }))}
                            className="p-1"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= reviewData.rating 
                                  ? "fill-yellow-400 text-yellow-400" 
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="reviewTitle" className="text-sm font-medium">
                        Review Title
                      </label>
                      <input
                        id="reviewTitle"
                        type="text"
                        value={reviewData.title}
                        onChange={(e) => setReviewData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full mt-1 px-3 py-2 border rounded-md"
                        placeholder="Summarize your experience"
                      />
                    </div>

                    <div>
                      <label htmlFor="reviewComment" className="text-sm font-medium">
                        Review
                      </label>
                      <Textarea
                        id="reviewComment"
                        value={reviewData.review}
                        onChange={(e) => setReviewData(prev => ({ ...prev, review: e.target.value }))}
                        placeholder="Tell us about your experience with this product..."
                        rows={4}
                        className="mt-1"
                      />
                    </div>

                    <Button 
                      onClick={handleSubmitReview}
                      disabled={submittingReview}
                      className="w-full"
                    >
                      {submittingReview ? "Submitting..." : "Submit Review"}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviewsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </div>
              ) : reviews.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
                  </CardContent>
                </Card>
              ) : (
                reviews.map((review) => (
                  <Card key={review._id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={review.userId.avatar} />
                          <AvatarFallback>
                            {review.userId.fullName.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{review.userId.fullName}</span>
                            {renderStars(review.rating)}
                            {review.isVerified && (
                              <Badge variant="outline" className="text-xs">
                                <Check className="h-3 w-3 mr-1" />
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          {review.title && (
                            <h4 className="font-medium mb-2">{review.title}</h4>
                          )}
                          <p className="text-muted-foreground mb-3">{review.review}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                            {review.helpful !== undefined && (
                              <button className="hover:text-foreground">
                                Helpful ({review.helpful})
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping & Returns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Shipping Information</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Free shipping on orders above 2500</li>
                    <li>• Standard delivery: 7-10 business days</li>
                    <li>• Express delivery: 2-3 business days with Shipping Charges</li>
                    <li>• All orders are shipped with tracking</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">Return Policy</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 15-day return policy from date of delivery</li>
                    <li>• Items must be unused and in original packaging</li>
                    <li>• Refunds processed within 5-7 business days</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
