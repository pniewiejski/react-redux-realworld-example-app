import React from 'react';
import { render } from '@testing-library/react';

import Article from './Article';

describe('Article', () => {
  it('should fetch article on render and clean up on unmount', () => {
      // given 
      const fetchArticle = jest.fn();
      const onUnload = jest.fn();
      // when 
      const { unmount } = render(<Article 
            onUnload={onUnload}
            fetchArticle={fetchArticle}
            match={{ params: { id: 1 } }}
        />);
      
      unmount();
      // then 
      expect(fetchArticle.mock.calls.length).toEqual(1);
      expect(onUnload.mock.calls.length).toEqual(1);
  });
});
