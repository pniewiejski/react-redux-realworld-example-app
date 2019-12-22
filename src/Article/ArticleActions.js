import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';

import api from '../api';

// 💡 hint: this should be replaced with a generic ROOT_REDIRECT action, see `common.js` reducer
// 👨🏼‍💻 Using ROOT_REDIRECT 
import { ROOT_REDIRECT } from '../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  // 💡 hint: this payload is not used
  // 👨🏼‍💻 Removed `payload` - onClickDelete takes no arguments 
  onClickDelete: () =>
    dispatch({ type: ROOT_REDIRECT })
});

const ArticleActions = props => {
  const article = props.article;
  const del = () => {
    props.onClickDelete(api.Articles.del(article.slug))
  };
  if (props.canModify) {
    return (
      <span>

        <Link
          to={`/editor/${article.slug}`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i> Edit Article
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i> Delete Article
        </button>

      </span>
    );
  }

  return (
    <span>
    </span>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ArticleActions);
