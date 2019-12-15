import { articleReducer } from './Article';
import articleList from './reducers/articleList';
import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common';
import { editorReducer } from './Editor';
import home from './reducers/home';
import profile from './reducers/profile';
import settings from './reducers/settings';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  article: articleReducer,
  articleList,
  auth,
  common,
  editor: editorReducer,
  home,
  profile,
  settings,
  router: routerReducer
});
