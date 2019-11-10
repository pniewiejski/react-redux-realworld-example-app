import React, { useEffect } from 'react';

import ArticleMeta from '../components/ArticleMeta';
import ArticleBody from './ArticleBody';
import CommentContainer from './CommentContainer';
import ArticleActions from './ArticleActions';

function Article(props) {
  const {
    fetchArticle,
    match: { params: { id: articleId }},
    onUnload,
  } = props;

  useEffect(() => fetchArticle(articleId), [articleId, fetchArticle]);
  useEffect(() => () => onUnload(), [onUnload]);

  const {
    article,
    currentUser,
    comments,
    commentErrors,
    match,
  } = props;

  if (!article) {
    return null;
  }

  const canModify = currentUser &&
    currentUser.username === article.author.username;
  return (
    <div className="article-page">

      <div className="banner">
        <div className="container">

          <h1>{article.title}</h1>
          <ArticleMeta
            article={article}
            articleActions={(
              <ArticleActions canModify={canModify} article={article} />
            )}
          />

        </div>
      </div>

      <div className="container page">

        <div className="row article-content">
          <div className="col-xs-12">

            <ArticleBody body={article.body} />

            <ul className="tag-list">
              {
                article.tagList.map(tag => {
                  return (
                    <li
                      className="tag-default tag-pill tag-outline"
                      key={tag}>
                      {tag}
                    </li>
                  );
                })
              }
            </ul>

          </div>
        </div>

        <hr />

        <div className="article-actions">
        </div>

        <div className="row">
          <CommentContainer
            comments={comments || []}
            errors={commentErrors}
            slug={match.params.id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  );
}

export default Article;
