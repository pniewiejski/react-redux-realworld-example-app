import React from 'react';
import { connect } from 'react-redux';

import { Link } from '../routing';
import api from '../api';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../constants/actionTypes';

import ArticleMeta from './ArticleMeta';
import ArticlePreviewActions from './ArticlePreviewActions';

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: ARTICLE_FAVORITED,
    payload: api.Articles.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: ARTICLE_UNFAVORITED,
    payload: api.Articles.unfavorite(slug)
  })
});

const ArticlePreview = props => {
  const article = props.article;

  const favoriteArticle = ev => {
    ev.preventDefault();
    if (article.favorited) {
      props.unfavorite(article.slug);
    } else {
      props.favorite(article.slug);
    }
  };

  return (
    <div className="article-preview">
      <ArticleMeta
        article={article}
        articleActions={(
          <ArticlePreviewActions
            favorited={article.favorited}
            favoritesCount={article.favoritesCount}
            favoriteArticle={favoriteArticle}
          />
        )}
      />

      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {
            article.tagList.map(tag => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              )
            })
          }
        </ul>
      </Link>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);
