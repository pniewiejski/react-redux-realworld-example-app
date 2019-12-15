import { connect } from 'react-redux';

import agent from '../agent';
import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from './store/actionTypes';
import { PAGE_UNLOADED } from '../constants/actionTypes';

import Article from './Article'

const mapStateToProps = state => ({
    ...state.article,
    currentUser: state.common.currentUser
  });
  
  const mapDispatchToProps = dispatch => ({
    fetchArticle: articleId => dispatch({
      type: ARTICLE_PAGE_LOADED,
      payload: Promise.all([
        agent.Articles.get(articleId),
        agent.Comments.forArticle(articleId)
      ])
    }),
    onUnload: () =>
    {
      // 💡 hint: call PAGE_UNLOADED here as well
        dispatch({ type: ARTICLE_PAGE_UNLOADED });
        dispatch({ type: PAGE_UNLOADED });
      }
  });
  

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Article);
