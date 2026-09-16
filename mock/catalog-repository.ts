import products from "@/mock/data/categories.json";
import categories from "@/mock/data/products.json";
import type { CatalogPage, CatalogQuery, Category, Product } from "@/types";

/** Replace this contract with an API-backed implementation in a future phase. */
export interface CatalogRepository {
  getCategories(): Promise<Category[]>;
  getProducts(query?: CatalogQuery): Promise<CatalogPage>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getRelatedProducts(product: Product, limit?: number): Promise<Product[]>;
}

export const mockCatalogRepository: CatalogRepository = {
  async getCategories() { return categories as Category[]; },
  async getProducts(query = {}) {
    const catalogProducts = products as Product[];
    const catalogCategories = categories as Category[];
    const searchTerm = query.query?.trim().toLocaleLowerCase() ?? "";
    const filteredProducts = catalogProducts.filter((product) => {
      const category = catalogCategories.find((item) => item.id === product.categoryId);
      const searchableText = [product.name, product.description, product.categoryId, category?.name]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase();

      return (!query.categoryId || product.categoryId === query.categoryId)
        && (!searchTerm || searchableText.includes(searchTerm));
    });
    const pageSize = Math.max(1, Math.min(query.pageSize ?? 12, 24));
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
    const requestedPage = Number.isInteger(query.page) && query.page && query.page > 0 ? query.page : 1;
    const page = Math.min(requestedPage, totalPages);
    const start = (page - 1) * pageSize;

    return { products: filteredProducts.slice(start, start + pageSize), totalProducts: catalogProducts.length, totalResults: filteredProducts.length, page, pageSize, totalPages };
  },
  async getFeaturedProducts() { return products as Product[]; },
  async getProductBySlug(slug) { return (products as Product[]).find((product) => product.slug === slug); },
  async getRelatedProducts(product, limit = 3) {
    const resultLimit = Math.max(0, Math.min(limit, 12));
    const sortedProducts = [...(products as Product[])].sort((first, second) => first.slug.localeCompare(second.slug));
    const relatedProducts = sortedProducts.filter((candidate) => candidate.id !== product.id);
    const sameCategory = relatedProducts.filter((candidate) => candidate.categoryId === product.categoryId);
    const otherCategories = relatedProducts.filter((candidate) => candidate.categoryId !== product.categoryId);

    return [...sameCategory, ...otherCategories].slice(0, resultLimit);
  },
};
