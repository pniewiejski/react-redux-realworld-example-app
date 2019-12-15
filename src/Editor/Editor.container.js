import { connect } from 'react-redux';

import {
  // 💡 hint: this action needs to be here
  // also you need PAGE_UNLOADED here
  ARTICLE_SUBMITTED,
  PAGE_UNLOADED
} from '../constants/actionTypes'
  
import {
  // 💡 hint: those actions should be moved to `./store/actionTypes`
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  REMOVE_TAG,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR
} from './store/actionTypes';

import Editor from './Editor';

const mapStateToProps = state => ({
  ...state.editor
});

const mapDispatchToProps = dispatch => ({
  onAddTag: () =>
    dispatch({ type: ADD_TAG }),
  onLoad: payload =>
    dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onRemoveTag: tag =>
    dispatch({ type: REMOVE_TAG, tag }),
  onSubmit: payload =>
    dispatch({ type: ARTICLE_SUBMITTED, payload }),
  onUnload: payload => {
    // 💡 hint: call PAGE_UNLOADED here as well
    dispatch({ type: EDITOR_PAGE_UNLOADED });
    dispatch({ type: PAGE_UNLOADED });
  },
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);