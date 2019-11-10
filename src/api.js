import request, { encode, limit } from './request';

const Auth = {
  current: () =>
    request.get('/user'),
  login: (email, password) =>
    request.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    request.post('/users', { user: { username, email, password } }),
  save: user =>
    request.put('/user', { user })
};

const Tags = {
  getAll: () => request.get('/tags')
};

const Articles = {
  all: page =>
    request.get(`/articles?${limit(10, page)}`),
  byAuthor: (author, page) =>
    request.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  favorite: slug =>
    request.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page) =>
    request.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  get: slug =>
    request.get(`/articles/${slug}`),
  unfavorite: slug =>
    request.del(`/articles/${slug}/favorite`),
};

const Comments = {
  create: (slug, comment) =>
    request.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    request.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: slug =>
    request.get(`/articles/${slug}/comments`)
};

const Profile = {
  follow: username =>
    request.post(`/profiles/${username}/follow`),
  get: username =>
    request.get(`/profiles/${username}`),
  unfollow: username =>
    request.del(`/profiles/${username}/follow`)
};

export default {
  Articles,
  Auth,
  Comments,
  Profile,
  Tags,
};
