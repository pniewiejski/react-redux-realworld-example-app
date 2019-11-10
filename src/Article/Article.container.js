import { connect } from 'react-redux';

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
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
  onUnload: () => {
    dispatch({ type: ARTICLE_PAGE_UNLOADED })
    dispatch({ type: PAGE_UNLOADED })
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);
