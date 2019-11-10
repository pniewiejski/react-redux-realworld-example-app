import { connect } from 'react-redux';

import agent from '../agent';
import {
  PAGE_UNLOADED,
} from '../constants/actionTypes';

import {
  ARTICLE_PAGE_LOADED,
  ARTICLE_PAGE_UNLOADED,
} from './store/actionsTypes';
import Article from './Article';

const mapStateToProps = state => ({
  ...state.article,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchArticle: articleId => dispatch({
    type: ARTICLE_PAGE_LOADED,
    payload: Promise.all([
      agent.Articles.get(articleId),
      agent.Comments.forArticle(articleId)
    ]),
  }),
  onUnload: () => {
    dispatch({ type: ARTICLE_PAGE_UNLOADED })
    dispatch({ type: PAGE_UNLOADED })
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);
