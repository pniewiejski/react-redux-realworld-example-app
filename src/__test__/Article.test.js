import React from 'react';
import {render} from '@testing-library/react'
import Article from '../Article/Article';

describe(`Article`, () => {
  it(`should fetch articles on mount and cleanup on unmount`, () => {
    // given
    const fetchArticle = jest.fn()
    const onUnload = jest.fn()

    // when
    const {unmount} = render(
      <Article
        fetchArticle={fetchArticle}
        match={{ params: { id: 1 }}}
        onUnload={onUnload}
      />
    )
    unmount()

    // then
    expect(fetchArticle.mock.calls.length === 1).toEqual(true)
    expect(onUnload.mock.calls.length === 1).toEqual(true)
  });
});
