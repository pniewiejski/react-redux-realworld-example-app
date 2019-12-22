import React, { useEffect } from 'react';

import ArticleMeta from '../components/ArticleMeta';
import ArticleBody from './ArticleBody';
import CommentContainer from './CommentContainer';
import ArticleActions from './ArticleActions';

function Article(props) {
  const { 
    article,
    currentUser,
    comments,
    commentErrors,
    match: { params: { id: articleId } },
    fetchArticle,
    onUnload
  } = props;

  useEffect(() => fetchArticle(articleId), [articleId, fetchArticle]);
  useEffect(() => () => onUnload(), [onUnload]);

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
            <ArticleBody body={article.body}/>
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
            slug={articleId}
            currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
}

export default Article;
