import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import ProductPrice from "@/components/shared/product/product-price";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { ShoppingCart } from "lucide-react";
import { notFound } from "next/navigation";
import ProductImages from "@/components/shared/product/product-images";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const ProductDetailsPage = async ({ params }: Props) => {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-5">
        {/* Images Column */}
        <div className="col-span-2">
          <ProductImages images={product.images} />
        </div>

        {/* Details Column */}
        <div className="col-span-2 p-5">
          <div className="flex flex-col gap-6">
            <p>
              {product.brand} {product.category}
            </p>
            <h1 className="h3-bold">{product.name}</h1>
            <p>
              {product.rating} of {product.numReviews} reviews
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <ProductPrice
                value={Number(product.price)}
                className="w-24 rounded-full bg-green-100 px-5 py-2 text-green-700"
              />
            </div>

            <div className="mt-10">
              <p className="font-semibold">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Action Column */}
        <div>
          <Card>
            <CardContent className="p-4">
              <div className="mb-2 flex justify-between">
                <p>Price</p>
                <ProductPrice value={Number(product.price)} />
              </div>
              <div className="mb-2 flex justify-between">
                <p>Status</p>
                {product.stock > 0 ? (
                  <Badge variant="outline">In Stock</Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>

              {product.stock > 0 && (
                <div className="flex-center mt-4">
                  <Button className="w-full">
                    <ShoppingCart />
                    Add To Cart
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsPage;
