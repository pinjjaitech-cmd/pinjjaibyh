"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Upload,
  Image as ImageIcon,
  Plus,
  Trash2,
  Save,
  RefreshCw,
  Monitor,
  Smartphone,
  MessageSquare,
  X,
  Search
} from "lucide-react";

interface HeroBanner {
  _id?: string;
  desktopImg?: string;
  mobileImg?: string;
  title?: string;
  subtitle?: string;
  cta?: string;
  link?: string;
}

interface StoreSettingsData {
  marqueeTexts: string[];
  heroBanners: HeroBanner[];
  featuredProducts: any[];
  browseByCategory: any[];
  testimonials: any;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<StoreSettingsData>({
    marqueeTexts: [],
    heroBanners: [],
    featuredProducts: [],
    browseByCategory: [],
    testimonials: null
  });

  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero-banners");

  useEffect(() => {
    fetchSettings();
    fetchMarqueeTexts();
    fetchBrowseByCategory();
    fetchAllCategories();
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch("/api/settings/featured-products");
      const result = await response.json();
      if (result.success) {
        setSettings(prev => ({ ...prev, featuredProducts: result.data || [] }));
      }
    } catch {
      toast.error("Failed to fetch featured products");
    }
  };

  const fetchBrowseByCategory = async () => {
    try {
      const response = await fetch("/api/settings/browse-by-category");
      const result = await response.json();
      if (response.ok) {
        setSettings(prev => ({ ...prev, browseByCategory: result || [] }));
      }
    } catch {
      toast.error("Failed to fetch browse by category");
    }
  };

  const fetchAllCategories = async () => {
    try {
      const response = await fetch("/api/collections?isActive=true&limit=100");
      const result = await response.json();
      if (result.success) {
        setAllCategories(result.data || []);
      }
    } catch {
      toast.error("Failed to fetch categories");
    }
  };

  const fetchMarqueeTexts = async () => {
    try {
      const response = await fetch("/api/settings/marquee");
      const result = await response.json();
      if (result.success) {
        setSettings(prev => ({ ...prev, marqueeTexts: result.data || [] }));
      }
    } catch {
      toast.error("Failed to fetch marquee texts");
    }
  };

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/settings/hero-banners");
      const result = await response.json();
      if (result.success) {
        setSettings(prev => ({ ...prev, heroBanners: result.data || [] }));
      }
    } catch {
      toast.error("Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  };

  const handleAddHeroBanner = async (bannerData: Partial<HeroBanner>, desktopFile?: File, mobileFile?: File) => {
    try {
      setSaving(true);
      const formData = new FormData();
      console.log("bannerData", bannerData)
      formData.append('banner', JSON.stringify(bannerData));
      if (desktopFile) formData.append('desktopImg', desktopFile);
      if (mobileFile) formData.append('mobileImg', mobileFile);

      const response = await fetch("/api/settings/hero-banners", {
        method: "POST",
        body: formData
      });
      const result = await response.json();

      if (result.success) {
        toast.success("Hero banner added successfully");
        fetchSettings();
        return true;
      } else {
        toast.error(result.error || "Failed to add hero banner");
        return false;
      }
    } catch {
      toast.error("Failed to add hero banner");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateHeroBanners = async (banners: HeroBanner[]) => {
    try {
      setSaving(true);
      const response = await fetch("/api/settings/hero-banners", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(banners)
      });
      const result = await response.json();

      if (result.success) {
        toast.success("Hero banners updated successfully");
        setSettings(prev => ({ ...prev, heroBanners: banners }));
        return true;
      } else {
        toast.error(result.error || "Failed to update hero banners");
        return false;
      }
    } catch {
      toast.error("Failed to update hero banners");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateFeaturedProducts = async (productIds: string[]) => {
    try {
      setSaving(true);
      const response = await fetch("/api/settings/featured-products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productIds })
      });
      const result = await response.json();

      if (result.success) {
        toast.success("Featured products updated successfully");
        fetchFeaturedProducts();
        return true;
      } else {
        toast.error(result.error || "Failed to update featured products");
        return false;
      }
    } catch {
      toast.error("Failed to update featured products");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateBrowseByCategory = async (categoryIds: string[]) => {
    try {
      setSaving(true);
      const response = await fetch("/api/settings/browse-by-category", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryIds })
      });
      const result = await response.json();

      if (response.ok) {
        toast.success("Browse by category updated successfully");
        fetchBrowseByCategory();
        return true;
      } else {
        toast.error(result.error || "Failed to update browse by category");
        return false;
      }
    } catch {
      toast.error("Failed to update browse by category");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateMarqueeTexts = async (marqueeTexts: string[]) => {
    try {
      setSaving(true);
      const response = await fetch("/api/settings/marquee", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marqueeTexts })
      });
      const result = await response.json();

      if (result.success) {
        toast.success("Marquee texts updated successfully");
        setSettings(prev => ({ ...prev, marqueeTexts }));
        return true;
      } else {
        toast.error(result.message || "Failed to update marquee texts");
        return false;
      }
    } catch {
      toast.error("Failed to update marquee texts");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleAddMarqueeText = async (text: string) => {
    try {
      setSaving(true);
      const response = await fetch("/api/settings/marquee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marqueeTexts: [text] })
      });
      const result = await response.json();

      if (result.success) {
        toast.success("Marquee text added successfully");
        fetchMarqueeTexts();
        return true;
      } else {
        toast.error(result.message || "Failed to add marquee text");
        return false;
      }
    } catch {
      toast.error("Failed to add marquee text");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteHeroBanner = async (index: number) => {
    try {
      setSaving(true);
      const newBanners = settings.heroBanners.filter((_, i) => i !== index);
      const success = await handleUpdateHeroBanners(newBanners);
      if (success) toast.success("Hero banner deleted successfully");
    } catch {
      toast.error("Failed to delete hero banner");
    } finally {
      setSaving(false);
    }
  };

  const handleClearAllHeroBanners = async () => {
    try {
      setSaving(true);
      const response = await fetch("/api/settings/hero-banners", { method: "DELETE" });
      const result = await response.json();

      if (result.success) {
        toast.success("All hero banners cleared successfully");
        setSettings(prev => ({ ...prev, heroBanners: [] }));
      } else {
        toast.error(result.error || "Failed to clear hero banners");
      }
    } catch {
      toast.error("Failed to clear hero banners");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Store Settings</h1>
          <p className="text-muted-foreground">Manage your store configuration and content</p>
        </div>
        <Button onClick={fetchSettings} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hero-banners">Hero Banners</TabsTrigger>
          <TabsTrigger value="marquee">Marquee Text</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="featured-products">Featured Products</TabsTrigger>
        </TabsList>

        <TabsContent value="hero-banners" className="flex flex-col space-y-6">
          <HeroBannersSection
            heroBanners={settings.heroBanners}
            onAddBanner={handleAddHeroBanner}
            onUpdateBanners={handleUpdateHeroBanners}
            onDeleteBanner={handleDeleteHeroBanner}
            onClearAll={handleClearAllHeroBanners}
            saving={saving}
          />
        </TabsContent>

        <TabsContent value="marquee" className="space-y-6">
          <MarqueeTextSection
            marqueeTexts={settings.marqueeTexts}
            onUpdateTexts={handleUpdateMarqueeTexts}
            onAddText={handleAddMarqueeText}
            saving={saving}
          />
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <CategorySection
            allCategories={allCategories}
            selectedCategories={settings.browseByCategory}
            onUpdateCategories={handleUpdateBrowseByCategory}
            saving={saving}
          />
        </TabsContent>

        <TabsContent value="featured-products" className="space-y-6">
          <FeaturedProductsSection
            featuredProducts={settings.featuredProducts}
            onUpdateFeaturedProducts={handleUpdateFeaturedProducts}
            saving={saving}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ─── Marquee Text Section ────────────────────────────────────────────────────

interface MarqueeTextSectionProps {
  marqueeTexts: string[];
  onUpdateTexts: (texts: string[]) => Promise<boolean>;
  onAddText: (text: string) => Promise<boolean>;
  saving: boolean;
}

function MarqueeTextSection({ marqueeTexts, onUpdateTexts, onAddText, saving }: MarqueeTextSectionProps) {
  const [newText, setNewText] = useState("");
  const [editingTexts, setEditingTexts] = useState<string[]>(marqueeTexts);

  useEffect(() => {
    setEditingTexts(marqueeTexts);
  }, [marqueeTexts]);

  const handleAddText = async () => {
    if (!newText.trim()) {
      toast.error("Please enter a marquee text");
      return;
    }
    const success = await onAddText(newText.trim());
    if (success) setNewText("");
  };

  const handleUpdateTexts = async () => {
    await onUpdateTexts(editingTexts);
  };

  const handleRemoveText = (index: number) => {
    setEditingTexts(editingTexts.filter((_, i) => i !== index));
  };

  const handleMoveText = (index: number, direction: "up" | "down") => {
    const newTexts = [...editingTexts];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < newTexts.length) {
      [newTexts[index], newTexts[newIndex]] = [newTexts[newIndex], newTexts[index]];
      setEditingTexts(newTexts);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Marquee Text
          </CardTitle>
          <CardDescription>Add new announcement text for the scrolling marquee</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Enter announcement text..."
              onKeyDown={(e) => e.key === "Enter" && handleAddText()}
              className="flex-1"
            />
            <Button onClick={handleAddText} disabled={saving || !newText.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Marquee Texts</CardTitle>
              <CardDescription>Manage and reorder announcement texts</CardDescription>
            </div>
            <Button
              onClick={handleUpdateTexts}
              disabled={saving || JSON.stringify(editingTexts) === JSON.stringify(marqueeTexts)}
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {editingTexts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No marquee texts yet. Add your first announcement text above.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {editingTexts.map((text, index) => (
                <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                  <div className="flex-1">
                    <Input
                      value={text}
                      onChange={(e) => {
                        const updated = [...editingTexts];
                        updated[index] = e.target.value;
                        setEditingTexts(updated);
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm" onClick={() => handleMoveText(index, "up")} disabled={index === 0}>↑</Button>
                    <Button variant="outline" size="sm" onClick={() => handleMoveText(index, "down")} disabled={index === editingTexts.length - 1}>↓</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleRemoveText(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Category Section ────────────────────────────────────────────────────────

interface CategorySectionProps {
  allCategories: any[];
  selectedCategories: any[];
  onUpdateCategories: (categoryIds: string[]) => Promise<boolean>;
  saving: boolean;
}

function CategorySection({ allCategories, selectedCategories, onUpdateCategories, saving }: CategorySectionProps) {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  useEffect(() => {
    const selectedIds = selectedCategories
      .map((cat) => {
        const match = allCategories.find(
          (a) => a.name === cat.categoryName && a.slug === cat.categorySlug
        );
        return match?._id;
      })
      .filter(Boolean);
    setSelectedCategoryIds(selectedIds);
  }, [selectedCategories, allCategories]);

  const handleCategoryToggle = (id: string) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    await onUpdateCategories(selectedCategoryIds);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Browse by Category
              </CardTitle>
              <CardDescription>Select categories to feature on the homepage</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedCategoryIds(allCategories.map((c) => c._id))} disabled={saving}>Select All</Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedCategoryIds([])} disabled={saving}>Clear All</Button>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {allCategories.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No categories found. Please create categories first.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allCategories.map((category) => {
                  const isSelected = selectedCategoryIds.includes(category._id);
                  return (
                    <div
                      key={category._id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        }`}
                      onClick={() => handleCategoryToggle(category._id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                          }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium truncate">{category.name}</h3>
                            {category.parentCategory && (
                              <Badge variant="secondary" className="text-xs">{category.parentCategory.name}</Badge>
                            )}
                          </div>
                          {category.image && (
                            <img src={category.image} alt={category.name} className="w-full h-auto object-contain rounded mb-2" />
                          )}
                          <div className="text-sm text-muted-foreground">
                            <p>Slug: {category.slug}</p>
                            <p>Status: {category.isActive ? "Active" : "Inactive"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-4 border-t flex items-center justify-between text-sm text-muted-foreground">
                <span>{selectedCategoryIds.length} of {allCategories.length} categories selected</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setSelectedCategoryIds(
                      selectedCategories
                        .map((cat) => allCategories.find((a) => a.name === cat.categoryName && a.slug === cat.categorySlug)?._id)
                        .filter(Boolean)
                    )
                  }
                >
                  Reset to Current
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Featured Products Section ───────────────────────────────────────────────

interface FeaturedProductsSectionProps {
  featuredProducts: any[];
  onUpdateFeaturedProducts: (productIds: string[]) => Promise<boolean>;
  saving: boolean;
}

function FeaturedProductsSection({ featuredProducts, onUpdateFeaturedProducts, saving }: FeaturedProductsSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSelectedProductIds(featuredProducts.map((p) => p.productId || p._id).filter(Boolean));
  }, [featuredProducts]);

  const handleSearch = async (query: string, page = 1) => {
    if (!query.trim()) { setSearchResults([]); return; }
    try {
      setSearchLoading(true);
      const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}&page=${page}&limit=10&status=published`);
      const result = await response.json();
      if (result.success) {
        setSearchResults(result.data || []);
        setCurrentPage(page);
      } else {
        toast.error("Failed to search products");
      }
    } catch {
      toast.error("Failed to search products");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleProductSelect = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    const success = await onUpdateFeaturedProducts(selectedProductIds);
    if (success) handleModalClose();
  };

  const handleRemoveProduct = (id: string) => {
    setSelectedProductIds((prev) => prev.filter((x) => x !== id));
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setSearchQuery("");
    setSearchResults([]);
    setCurrentPage(1);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Featured Products
              </CardTitle>
              <CardDescription>Select products to feature on the homepage</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleModalOpen} disabled={saving}>
                <Plus className="h-4 w-4 mr-2" />
                Add Products
              </Button>
              <Button onClick={handleSave} disabled={saving || selectedProductIds.length === 0}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {featuredProducts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No featured products yet. Click "Add Products" to select products.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {featuredProducts.map((product, index) => (
                <div key={product.productId || product._id} className="flex items-center gap-4 p-4 border rounded-lg">
                  {product.variants?.[0]?.images?.[0] && (
                    <img src={product.variants[0].images[0]} alt={product.title} className="w-[80px] h-auto object-contain rounded shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{product.title}</h3>
                    <p className="text-sm text-muted-foreground">Slug: {product.slug}</p>
                    {product.category?.name && <Badge variant="secondary" className="mt-1">{product.category.name}</Badge>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{index + 1}</Badge>
                    <Button variant="destructive" size="icon" onClick={() => handleRemoveProduct(product.productId || product._id)} disabled={saving}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm text-muted-foreground">
                <span>{selectedProductIds.length} products selected</span>
                <Button variant="outline" size="sm" onClick={() => setSelectedProductIds(featuredProducts.map((p) => p.productId || p._id))}>
                  Reset to Current
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Product Search Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Search and Select Products</h2>
              <Button variant="ghost" size="sm" onClick={handleModalClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6 border-b">
              <div className="flex gap-4">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products by title, SKU, or description..."
                  className="flex-1"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
                />
                <Button onClick={() => handleSearch(searchQuery)} disabled={searchLoading || !searchQuery.trim()}>
                  {searchLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
              {searchResults.length === 0 && !searchLoading && searchQuery ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No products found matching "{searchQuery}"</p>
                </div>
              ) : searchResults.length === 0 && !searchLoading ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter a search query to find products</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {searchResults.map((product) => {
                    const isSelected = selectedProductIds.includes(product._id);
                    const hasImages = product.variants?.[0]?.images?.length > 0;
                    return (
                      <div
                        key={product._id}
                        className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                          }`}
                        onClick={() => handleProductSelect(product._id)}
                      >
                        <div className="shrink-0">
                          {hasImages ? (
                            <img src={product.variants[0].images[0]} alt={product.title} className="w-[80px] h-auto object-contain rounded" />
                          ) : (
                            <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium truncate">{product.title}</h3>
                            <Badge variant="secondary" className="text-xs">{product.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground truncate mb-2">{product.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>SKU: {product.variants?.[0]?.skuCode || "N/A"}</span>
                            <span>Slug: {product.slug}</span>
                            {product.variants?.[0]?.price && <span>Price: ₹{product.variants[0].price}</span>}
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                          }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-6 border-t flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{selectedProductIds.length} products selected</span>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleModalClose}>Cancel</Button>
                <Button onClick={handleSave} disabled={saving || selectedProductIds.length === 0}>
                  {saving ? (
                    <><RefreshCw className="h-4 w-4 mr-2 animate-spin" />Saving...</>
                  ) : (
                    <><Save className="h-4 w-4 mr-2" />Save Selected ({selectedProductIds.length})</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Hero Banners Section ────────────────────────────────────────────────────

interface HeroBannersSectionProps {
  heroBanners: HeroBanner[];
  onAddBanner: (banner: Partial<HeroBanner>, desktopFile?: File, mobileFile?: File) => Promise<boolean>;
  onUpdateBanners: (banners: HeroBanner[]) => Promise<boolean>;
  onDeleteBanner: (index: number) => void;
  onClearAll: () => void;
  saving: boolean;
}

function HeroBannersSection({ heroBanners, onAddBanner, onDeleteBanner, onClearAll, saving }: HeroBannersSectionProps) {
  const [newBanner, setNewBanner] = useState<Partial<HeroBanner>>({ title: "", subtitle: "", cta: "", link: "" });
  const [desktopFile, setDesktopFile] = useState<File | null>(null);
  const [mobileFile, setMobileFile] = useState<File | null>(null);
  const [desktopPreview, setDesktopPreview] = useState<string>("");
  const [mobilePreview, setMobilePreview] = useState<string>("");

  // Revoke object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (desktopPreview) URL.revokeObjectURL(desktopPreview);
      if (mobilePreview) URL.revokeObjectURL(mobilePreview);
    };
  }, []);

  const handleDesktopFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (desktopPreview) URL.revokeObjectURL(desktopPreview);

    const previewUrl = URL.createObjectURL(file);
    setDesktopFile(file);
    setDesktopPreview(previewUrl);
  };

  const handleMobileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (mobilePreview) URL.revokeObjectURL(mobilePreview);

    const previewUrl = URL.createObjectURL(file);
    setMobileFile(file);
    setMobilePreview(previewUrl);
  };
  const handleRemoveDesktop = () => {
    if (desktopPreview) URL.revokeObjectURL(desktopPreview);
    setDesktopFile(null);
    setDesktopPreview("");
  };

  const handleRemoveMobile = () => {
    if (mobilePreview) URL.revokeObjectURL(mobilePreview);
    setMobileFile(null);
    setMobilePreview("");
  };

  const handleAddBanner = async () => {
    if (!desktopFile && !newBanner.title) {
      toast.error("Please add at least a desktop image or title");
      return;
    }
    const success = await onAddBanner(newBanner, desktopFile || undefined, mobileFile || undefined);
    if (success) {
      setNewBanner({ title: "", subtitle: "", cta: "", link: "" });
      handleRemoveDesktop();
      handleRemoveMobile();
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Banner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Hero Banner
          </CardTitle>
          <CardDescription>Create a new hero banner with images and content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Desktop Image Upload */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Desktop Image (1920x600)
              </Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                {desktopPreview ? (
                  <div className="space-y-3">
                    <img
                      src={desktopPreview}
                      alt="Desktop preview"
                      className="w-full h-auto rounded object-contain"
                    />
                    <p className="text-xs text-muted-foreground text-center">
                      {desktopFile?.name} ({(desktopFile!.size / 1024).toFixed(1)} KB)
                    </p>
                    <Button variant="outline" size="sm" onClick={handleRemoveDesktop} className="w-full">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Upload desktop banner image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleDesktopFileChange}
                      className="hidden"
                      id="desktop-image"
                    />
                    <Button variant="outline" size="sm" onClick={() => document.getElementById("desktop-image")?.click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Image Upload */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Mobile Image (768x400)
              </Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                {mobilePreview ? (
                  <div className="space-y-3">
                    <img
                      src={mobilePreview}
                      alt="Mobile preview"
                      className="w-full h-auto rounded object-contain"
                    />
                    <p className="text-xs text-muted-foreground text-center">
                      {mobileFile?.name} ({(mobileFile!.size / 1024).toFixed(1)} KB)
                    </p>
                    <Button variant="outline" size="sm" onClick={handleRemoveMobile} className="w-full">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Upload mobile banner image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMobileFileChange}
                      className="hidden"
                      id="mobile-image"
                    />
                    <Button variant="outline" size="sm" onClick={() => document.getElementById("mobile-image")?.click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleAddBanner} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Adding..." : "Add Banner"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Existing Banners */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Existing Hero Banners</CardTitle>
              <CardDescription>Manage your current hero banners</CardDescription>
            </div>
            {heroBanners.length > 0 && (
              <Button variant="destructive" size="sm" onClick={onClearAll} disabled={saving}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {heroBanners.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No hero banners yet. Add your first banner above.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {heroBanners.map((banner, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary">Banner {index + 1}</Badge>
                        {banner.title && <span className="font-medium">{banner.title}</span>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        {banner.desktopImg && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Desktop:</p>
                            <img src={banner.desktopImg} alt="Desktop" className="w-full h-auto rounded" />
                          </div>
                        )}
                        {banner.mobileImg && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Mobile:</p>
                            <img src={banner.mobileImg} alt="Mobile" className="w-full h-auto rounded" />
                          </div>
                        )}
                      </div>

                      {banner.subtitle && (
                        <p className="text-sm text-muted-foreground mb-2">{banner.subtitle}</p>
                      )}
                      {banner.cta && banner.link && (
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline">{banner.cta}</Badge>
                          <span className="text-muted-foreground">→ {banner.link}</span>
                        </div>
                      )}
                    </div>

                    <Button variant="destructive" size="sm" onClick={() => onDeleteBanner(index)} disabled={saving} className="ml-4 shrink-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}