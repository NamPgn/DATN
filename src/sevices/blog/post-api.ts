import intances from "../instances";

const prefix = "/blogs";

export const blogApi = {
  getBlogs: async () => {
    return await intances.get(prefix);
  },
  getBlogBySlug: async (slug: string) => {
    return await intances.get(`${prefix}/${slug}`);
  },
  getCategoryBlogs: async (slug: string) => {
    return await intances.get(`${prefix}/category/${slug}`);
  },
  getTagsBlogs: async (slug: string) => {
    return await intances.get(`${prefix}/tag/${slug}`);
  },
};
