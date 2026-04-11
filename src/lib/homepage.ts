import connectDB from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { StoreSettings } from "@/models/StoreSettings";

export async function getHomepageData() {
  await connectDB();

  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/homepage`);
  const result = await response.json();
  
  if (!result.success) {
    throw new Error('Failed to fetch homepage data');
  }

  const storeSettings = result.data;

  // Transform heroBanners to match expected format
  const heroBanners = storeSettings?.heroBanners?.length
    ? storeSettings.heroBanners.map((banner: any, index: number) => ({
        id: `banner-${index + 1}`,
        desktopImage: banner.desktopImg || `/banner${index + 1}.png`,
        mobileImage: banner.mobileImg || `/banner${index + 1}-mobile.png`,
        title: banner.title || `Collection ${index + 1}`,
        subtitle: banner.subtitle || "",
        cta: banner.cta || "Shop Now",
        link: banner.link || "/search",
      }))
    : [];

  // Transform browseByCategory to match expected format
  const browseCategories = storeSettings?.browseByCategory?.length
    ? storeSettings.browseByCategory.map((category: any) => ({
        title: category.categoryName,
        image: category.categoryImage || "/placeholder-category.jpg",
        bgColor: "#f5f5f5",
        slug: category.categorySlug,
        ctaLabel: "Shop Now",
      }))
    : [];

  // featuredProducts are already in the correct format
  const featuredProducts = storeSettings?.featuredProducts || [];

  return {
    heroBanners,
    browseCategories,
    featuredProducts,
    storeSettings, // Pass the raw settings for any other components that need it
  };
}
