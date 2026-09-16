import content from "@/mock/data/content.json";
import type { ContentPreview } from "@/types";

export interface ContentRepository {
  getFeaturedPromotions(): Promise<ContentPreview[]>;
  getLatestNews(): Promise<ContentPreview[]>;
  getPromotions(): Promise<ContentPreview[]>;
  getNews(): Promise<ContentPreview[]>;
}

const contentItems = content as ContentPreview[];

/** Replace this contract with an API-backed implementation in a future phase. */
export const mockContentRepository: ContentRepository = {
  async getFeaturedPromotions() {
    return contentItems.filter((item) => item.type === "promotion");
  },
  async getLatestNews() {
    return contentItems.filter((item) => item.type === "news");
  },
  async getPromotions() {
    return contentItems.filter((item) => item.type === "promotion");
  },
  async getNews() {
    return contentItems.filter((item) => item.type === "news");
  },
};
