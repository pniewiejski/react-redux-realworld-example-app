import React from 'react';

import ArticleMeta from './ArticleMeta';
import ArticleBody from './ArticleBody';
import CommentContainer from './CommentContainer';

class Article extends React.Component {
  componentWillMount() {
    const articleId = this.props.match.params.id;
    this.props.fetchArticle(articleId);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { article } = this.props;

    if (!article) {
      return null;
    }

    const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.article.author.username;
    return (
      <div className="article-page">

        <div className="banner">
          <div className="container">

            <h1>{this.props.article.title}</h1>
            <ArticleMeta
              article={this.props.article}
              canModify={canModify} />

          </div>
        </div>

        <div className="container page">

          <div className="row article-content">
            <div className="col-xs-12">

              <ArticleBody body={article.body} />

              <ul className="tag-list">
                {
                  this.props.article.tagList.map(tag => {
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
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              slug={this.props.match.params.id}
              currentUser={this.props.currentUser} />
          </div>
        </div>
      </div>
    );
  }
}

export default Article;
