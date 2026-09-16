export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  price: number;
  currency: "PHP";
  image: string;
  images?: string[];
  stockStatus: "in-stock" | "low-stock" | "out-of-stock";
  specifications: ProductSpecification[];
}

export interface CatalogQuery {
  query?: string;
  categoryId?: string;
  page?: number;
  pageSize?: number;
}

export interface CatalogPage {
  products: Product[];
  totalProducts: number;
  totalResults: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
