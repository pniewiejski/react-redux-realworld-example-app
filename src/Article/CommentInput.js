import React, { useState } from 'react';
import { connect } from 'react-redux';
import api from '../api';
import { ADD_COMMENT } from './store/actionTypes';

const mapDispatchToProps = dispatch => ({
  onSubmit: payload =>
    dispatch({ type: ADD_COMMENT, payload })
});

function CommentInput(props) {

  const {
    slug,
    currentUser,
    onSubmit
  } = props;

  const [body, setBody] = useState('');
  
  const createComment = ev => {
    ev.preventDefault();
    const payload = api.Comments.create(slug, { body: body });
    setBody('');
    onSubmit(payload);
  }

  return (
    <form className="card comment-form" onSubmit={createComment}>
      <div className="card-block">
        <textarea className="form-control"
          placeholder="Write a comment..."
          value={body}
          onChange={ev => setBody(ev.target.value)}
          rows="3">
        </textarea>
      </div>
      <div className="card-footer">
        <img
          src={currentUser.image}
          className="comment-author-img"
          alt={currentUser.username} />
        <button
          className="btn btn-sm btn-primary"
          type="submit">
          Post Comment
        </button>
      </div>
    </form>
  );
}

export default connect(() => ({}), mapDispatchToProps)(CommentInput);
