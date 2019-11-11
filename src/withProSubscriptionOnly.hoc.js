import React from 'react';
import { connect } from 'react-redux';
import compose from 'lodash.flowright';

const withProSubscription = WrappedComponent => ({ isProUser, ...rest }) => {
  if (!isProUser) {
    return null;
  }

  return <WrappedComponent {...rest} />;
};

const isProUserSelector = state => ({
  isProUser: state.common.currentUser ? state.common.currentUser.isProUser : false,
});

export default compose([
  connect(isProUserSelector),
  withProSubscription,
]);
