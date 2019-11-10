import request from "../request";

export default {
  Articles: {
    del: slug => request.del(`/articles/${slug}`),
  }
}
