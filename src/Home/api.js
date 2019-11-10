import request, { encode, limit } from "../request";

export default {
  Articles: {
    byTag: (tag, page) => request.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
    feed: () => request.get('/articles/feed?limit=10&offset=0'),
  }
}
