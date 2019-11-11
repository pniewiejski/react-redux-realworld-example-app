import React from 'react';

import withProSubscriptionOnly from '../withProSubscriptionOnly.hoc';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

function ArticlePreviewActions({
  favorited,
  favoritesCount,
  favoriteArticle
}) {
  const favoriteButtonClass = favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;
  return (
    <div className="pull-xs-right">
      <button className={favoriteButtonClass} onClick={favoriteArticle}>
        <i className="ion-heart"></i> {favoritesCount}
      </button>
    </div>
  );
};

export default withProSubscriptionOnly(ArticlePreviewActions);
