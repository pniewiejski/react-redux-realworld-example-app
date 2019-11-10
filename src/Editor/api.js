import request from "../request";

const omitSlug = article => Object.assign({}, article, { slug: undefined })
export default {
  Articles: {
    update: article => request.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
    create: article => request.post('/articles', { article })
  }
}

