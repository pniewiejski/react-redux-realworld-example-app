import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import ArticleList from '../components/ArticleList';
import api from '../api';
import { CHANGE_TAB } from '../constants/actionTypes';

const FeedTab = ({
  active,
  text,
  clickHandler = null,
}) => {
  const classNames = classnames('nav-link', { active })

  return (
    <li className="nav-item">
      <a
        href=""
        className={classNames}
        onClick={clickHandler}
      >
        {text}
      </a>
    </li>
  );
}

const YourFeedTab = ({
  tab,
  onTabClick,
  token,
}) => token ? (
  <FeedTab
    active={tab === 'feed'}
    text="Your Feed"
    clickHandler={ev => {
      ev.preventDefault();
      onTabClick('feed', api.Articles.feed());
    }}
  />
) : null;

const GlobalFeedTab = ({
  tab,
  onTabClick,
}) => (
  <FeedTab
    active={tab === 'all'}
    text="Global Feed"
    clickHandler={ev => {
      ev.preventDefault();
      onTabClick('all', api.Articles.all());
    }}
  />
);

const TagFilterTab = ({
  tag,
}) => tag ? (
  <FeedTab
    active
    text={<><i className="ion-pound" />{tag}</>}
  />
) : null;

const mapStateToProps = state => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, payload) => dispatch({ type: CHANGE_TAB, tab, payload })
});

const MainView = props => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

          <YourFeedTab
            tab={props.tab}
            onTabClick={props.onTabClick}
            token={props.token}
          />

          <GlobalFeedTab
            tab={props.tab}
            onTabClick={props.onTabClick}
          />

          <TagFilterTab
            tag={props.tag}
          />

        </ul>
      </div>

      <ArticleList
        pager={props.pager}
        articles={props.articles}
        loading={props.loading}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
