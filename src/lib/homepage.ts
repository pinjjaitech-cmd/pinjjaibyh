import connectDB from "@/lib/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { StoreSettings } from "@/models/StoreSettings";

const fallbackHeroBanners = [
  {
    id: "banner-1",
    desktopImage: "/banner1.png",
    mobileImage: "/banner1-mobile.png",
    title: "Premium Collection",
    subtitle: "Discover our curated selection of luxury fashion",
    cta: "Shop Now",
    link: "/search",
  },
  {
    id: "banner-2",
    desktopImage: "/banner2.png",
    mobileImage: "/banner2-mobile.png",
    title: "Timeless Elegance",
    subtitle: "Where sophistication meets contemporary design",
    cta: "Explore",
    link: "/search",
  },
  {
    id: "banner-3",
    desktopImage: "/banner3.png",
    mobileImage: "/banner3-mobile.png",
    title: "Exclusive Designs",
    subtitle: "Limited edition pieces for the discerning customer",
    cta: "Learn More",
    link: "/story",
  },
];

const fallbackBrowseCategories = [
  {
    title: "Best collection",
    image: "https://sanova-demo.myshopify.com/cdn/shop/files/banner-1.png?v=1734242399&width=550",
    bgColor: "#eef1d7",
    slug: "best-collection",
    ctaLabel: "Shop Now",
  },
  {
    title: "What's new?",
    image: "https://sanova-demo.myshopify.com/cdn/shop/files/banner-2.png?v=1734242399&width=550",
    bgColor: "#e3e7e3",
    slug: "whats-new",
    ctaLabel: "Shop Now",
  },
  {
    title: "Tips & trends",
    image: "https://sanova-demo.myshopify.com/cdn/shop/files/banner-3.png?v=1734242399&width=550",
    bgColor: "#f2e2da",
    slug: "tips-trends",
    ctaLabel: "Shop Now",
  },
];

export async function getHomepageData() {
  await connectDB();

  const [settings, fallbackProducts, categories] = await Promise.all([
    StoreSettings.findOne().lean(),
    Product.find({ status: "published" })
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .limit(6)
      .lean(),
    Category.find({ isActive: true })
      .select("name slug image")
      .sort({ name: 1 })
      .limit(5)
      .lean(),
  ]);

  const productGroupSlugs = [
    ...(settings?.productGroup1?.products || []),
    ...(settings?.productGroup2?.products || []),
  ];

  const groupProducts = productGroupSlugs.length
    ? await Product.find({
        status: "published",
        slug: { $in: productGroupSlugs },
      })
        .populate("category", "name slug")
        .lean()
    : [];

  const orderedGroupProducts = productGroupSlugs
    .map((slug) => groupProducts.find((product: any) => product.slug === slug))
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
      : fallbackHeroBanners;

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

  const dbBrowseCategories = categories.map((category: any, index: number) => ({
    title: category.name,
    image: category.image || "/placeholder-category.jpg",
    bgColor: fallbackBrowseCategories[index % fallbackBrowseCategories.length].bgColor,
    slug: category.slug,
    ctaLabel: "Shop Now",
  }));

  return {
    heroBanners,
    browseCategories:
      configuredBrowseCategories.length > 0
        ? configuredBrowseCategories
        : dbBrowseCategories.length > 0
          ? dbBrowseCategories
          : fallbackBrowseCategories,
    featuredProducts:
      orderedGroupProducts.length > 0 ? orderedGroupProducts : fallbackProducts,
    productGroups: {
      productGroup1: settings?.productGroup1 || null,
      productGroup2: settings?.productGroup2 || null,
    },
    testimonials: settings?.testimonials || null,
  };
}
