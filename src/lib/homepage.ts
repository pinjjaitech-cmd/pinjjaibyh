import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { StoreSettings } from "@/models/StoreSettings";

export async function getHomepageData() {
  await connectDB();

  const settings = await StoreSettings.findOne().lean();
  const featuredProductSlugs = settings?.featuredProducts || [];

  const featuredProducts = featuredProductSlugs.length
    ? await Product.find({
        status: "published",
        slug: { $in: featuredProductSlugs },
      })
        .populate("category", "name slug")
        .lean()
    : [];

  const orderedFeaturedProducts = featuredProductSlugs
    .map((slug: string) => featuredProducts.find((product: any) => product.slug === slug))
    .filter(Boolean)
    .slice(0, 6);

  const heroBanners =
    settings?.heroBanners?.length
      ? settings.heroBanners.map((banner: any, index: number) => ({
          id: `banner-${index + 1}`,
          desktopImage: banner.desktopImg || `/banner${index + 1}.png`,
          mobileImage: banner.mobileImg || `/banner${index + 1}-mobile.png`,
          title: banner.title || `Collection ${index + 1}`,
          subtitle: banner.subtitle || "",
          cta: banner.cta || "Shop Now",
          link: banner.link || "/search",
        }))
      : [];

  const configuredBrowseCategories = settings?.browseByCategory
    ? Object.values(settings.browseByCategory)
        .filter(Boolean)
        .map((category: any) => ({
          title: category.categoryName,
          image: category.categoryImage || "/placeholder-category.jpg",
          bgColor: category.bgColor || "#f5f5f5",
          slug:
            category.categorySlug ||
            category.categoryName.toLowerCase().replace(/\s+/g, "-"),
          ctaLabel: category.ctaLabel || "Shop Now",
        }))
    : [];

  return {
    heroBanners,
    browseCategories: configuredBrowseCategories,
    featuredProducts: orderedFeaturedProducts,
    featuredProductSlugs,
    testimonials: settings?.testimonials || null,
  };
}
