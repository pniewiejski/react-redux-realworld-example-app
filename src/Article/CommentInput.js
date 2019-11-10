import React, {useState, useCallback} from 'react';
import { connect } from 'react-redux';

import api from '../api';

import { ADD_COMMENT } from './store/actionsTypes';

const mapDispatchToProps = dispatch => ({
  onSubmit: payload =>
    dispatch({ type: ADD_COMMENT, payload })
});

function CommentInput(props) {
  const [body, setBody] = useState('');

  const updateBody = ev => {
    setBody(ev.target.value);
  };

  const createComment = ev => {
    ev.preventDefault();
    const payload = api.Comments.create(props.slug, { body });
    setBody('');
    props.onSubmit(payload);
  };

  return (
    <form className="card comment-form" onSubmit={createComment}>
      <div className="card-block">
        <textarea className="form-control"
          placeholder="Write a comment..."
          value={body}
          onChange={updateBody}
          rows="3">
        </textarea>
      </div>
      <div className="card-footer">
        <img
          src={props.currentUser.image}
          className="comment-author-img"
          alt={props.currentUser.username} />
        <button
          className="btn btn-sm btn-primary"
          type="submit">
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default connect(() => ({}), mapDispatchToProps)(CommentInput);
