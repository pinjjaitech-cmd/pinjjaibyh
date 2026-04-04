"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Search, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Product {
  _id: string;
  title: string;
  slug: string;
  variants?: { price?: number; images?: string[] }[];
}

interface StoreSettings {
  featuredProducts?: string[];
}

interface FeaturedProductsManagerProps {
  settings: StoreSettings | null;
  onUpdate: (updatedSettings: Partial<StoreSettings>) => void;
}

const FeaturedProductsManager = ({ settings, onUpdate }: FeaturedProductsManagerProps) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>(settings?.featuredProducts || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedProducts(settings?.featuredProducts || []);
  }, [settings?.featuredProducts]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!search.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/products?search=${encodeURIComponent(search)}&limit=20`);
        const data = await response.json();
        setSearchResults(data?.data || []);
      } catch {
        toast.error("Failed to search products");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const addProduct = (slug: string) => {
    if (selectedProducts.includes(slug)) {
      toast.error("Product already selected");
      return;
    }
    const updated = [...selectedProducts, slug];
    setSelectedProducts(updated);
    onUpdate({ featuredProducts: updated });
  };

  const removeProduct = (slug: string) => {
    const updated = selectedProducts.filter((item) => item !== slug);
    setSelectedProducts(updated);
    onUpdate({ featuredProducts: updated });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="featured-product-search">Search products</Label>
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="featured-product-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, description, SKU..."
            className="pl-9"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Selected featured products ({selectedProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedProducts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No featured products selected.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedProducts.map((slug) => (
                <Badge key={slug} variant="secondary" className="flex items-center gap-2">
                  {slug}
                  <button onClick={() => removeProduct(slug)} aria-label={`Remove ${slug}`}>
                    <Trash2 className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Search results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {loading && <p className="text-sm text-muted-foreground">Searching...</p>}
          {!loading && search && searchResults.length === 0 && (
            <p className="text-sm text-muted-foreground">No products found.</p>
          )}
          {searchResults.map((product) => (
            <div key={product._id} className="flex items-center justify-between rounded-md border p-3">
              <div>
                <p className="font-medium">{product.title}</p>
                <p className="text-xs text-muted-foreground">{product.slug}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => addProduct(product.slug)}
                disabled={selectedProducts.includes(product.slug)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturedProductsManager;
