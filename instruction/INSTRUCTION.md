# Open-world refactoring kata

## Todo

* [ ] Open an editor or prepare piece of paper for taking notes

## Keep an eye on:

- inject stuff not only dependencies
- DRY but AHA
- SLAP
- SRP
- separate code that supports different actors
- look for cohesion, avoid coupling
- standard cleaning methods - segregate imports, destructure props, add missing prop types

## Exercise 1 - Extract Home feature

> Example

Goal: the goal of this and the few following exercises is to clean up the code by extracting feature folders.

It'll help us group features based on how we see them in the UI.

Keep the reducers intact for now.

Bonus points for applying standard cleaning methods: segregate imports, descturcutre props, add missing prop types.

## Exercise 2 - Extract Article feature

Keep the reducers intact for now.

## Exercise 3 - Extract Editor feature

Keep the reducers intact for now.

## Exercise 4 - Move the Article reducer to the Article feature

> Example

Goal: move the article reducer to where it belongs - to the Article feature.

Look for hints 💡 in `ArticleActions.js`, `Article/index.js`, `common.js` reducer.

1. Add `store` folder inside the Article feature
2. Add `actionTypes` to the `store` folder, extract actions that are used only in this feature from the common actions
3. Rename `DELETE_ARTICLE` action to `ROOT_REDIRECT`
4. Introduce generic `PAGE_UNLOADED` action in the `common.js` reducer

## Exercise 5 - Move the Editor reducer to the Editor feature

Goal: the same as above.

Look for hints 💡 in `Editor.js` and `editor.js` reducer.

1. Add `store` folder inside the Editor feature
2. Add `actionTypes` to the `store` folder, extract actions that are used only in this feature from the common actions
3. Use common actions extracted earlier like `PAGE_UNLOADED`.

## Exercise 6 - Add `index.js` to the Article and Editor features

> Example

Goal: create a gateway - a public interface for each feature. This should be the only file that is imported in other parts of the application like router setup and so on.

1. Extract `Article.js` file and move the contents of  `index.js` there.
2. Export Article component and reducer from the index file.
3. Add `index.js` file for Editor feature.
4. Export Editor component and reducer from the index file.

## Exercise 7 - Add `Article.container`

> Example

Goal: clean up the Article component and remove all stuff related to Redux.

You will SLAP the code, inject stuff and see how to segregate responsibilities.

1. Create `Article.container.js` file and move all redux-related stuff there.
2. Pass necessary props.

## Exercise 8 - Add `Editor.container`

Goal: the same as in the previous exercise.

1. Create `Article.container.js` file and move all redux-related stuff there.
2. Pass necessary props.

## Exercise 9 - Remove `agent` from the `Article.js`

> Example

Goal: get rid of agent import in the Article component. It shouldn't be concerned about api calls.

1. Move `agent` up to the `Article.container` component.
2. (optional but recommended) Do the same for `Editor` component.

This is how `componentWillMount` should look like in the `Article` component:

```js
componentWillMount() {
  const articleId = this.props.match.params.id;
  this.props.fetchArticle(articleId);
}
```

## Exercise 10 - SLAP it - extract ArticleBody component

Goal: get rid of the `marked` dependency in the Article component and SLAP it a little bit more. This is just to show that those components can be really easy to read thanks to those small refactors.

1. Replace `<div dangerouslySetInnerHTML={markup}></div>` with `<ArticleBody body={article.body} />`

## Exercise 11 - Destructure props in Article component (you will need that later)

Goal: become a little bit more prepared for the hooks refactor that is coming.

Also it cleans up the component interface. There is one place where you see what props are used where (mainly in the `render` method).

## Exercise 12 - Move ArticleMeta to shared components and inject ArticleActions with props

Goal: make a hole - a configuration prop that we will use to exercise OCP and use it in the next task.

1. Move `ArticleMeta` to shared components
1. Look for hints 💡 in `ArticleMeta`

## Exercise 13 - Use ArticleMeta in ArticlePreview

Goal: make use of the configuration prop prepared in the previous exercise.

1. Use `ArticleMeta` in `ArticlePreview` component.
2. Look for hints 💡 there.

## Exercise 14 (optional) - Extract FieldTab component in `Home/MainView.js`

Goal: see how suprising it can be to extract generic components.

1. Look inside `MainView` component, there are 3 components there: `YourFeedTab`, `GlobalFeedTab`, `TagFilterTab`
2. Try to extract a generic `FeedTab` component for them
3. Do those components conform to LSP?
4. Does it matter? If yes - when?

## Exercise 15 - Extract separate api for Home, Article and Editor features

Goal: segregate API interfaces for different features.

0. (optional) Rename `agent` to `api` because `agent` is a stupid name for an API module
1. Search globally and see where the API methods are use (for example: search for "Articles.create")
2. If the API is used only in one feature then move it there
3. Do it only for Home, Article and Editor features
4. Do it in small parts, feature by feature

Attention: in some cases you will need to import two API files - one shared and one feature-specific.

## Exercise 16 - Extract routing module

Goal: create abstraction on `react-router-dom`.

1. Refactor the components so that they are not aware we use `react-router-dom` (wrap the library)
2. Only imports should change

When you finish ask me for a special halloween exercise. 👻

## Exercise 17 - Refactor Article component to Hooks

> Example

Goal: practice rewriting components to Hooks.

It's good to have destructured props now. Isn't it?

1. Refactor Article component
2. Replace lifecycle methods with `useEffect`

## Exercise 18 - Refactor CommentInput to Hooks

Goal: practice rewriting components to Hooks

1. Refactor CommentInput component
2. Replace state with `useState`
3. Make sure to use `useCallback`

## Exercise 19 - Add `@testing-library/react` and test Article lifecycle

`should fetch articles on mount and cleanup on unmount`

## Exercise 20 - Refactor Register componentn to Hooks

## Exercise 21 - Create `useForm` hook and use in Register component

Get rid of redux calls to keep the form state in the store. 🤦‍♂️

Hint: you need to add `name` property to each form input.

## Exercise 22 - Create `withProSubscriptionOnly` HoC

Use the HoC to show "favorite" button on article preview only if the use has pro subscription.

## Exercise 23 - Discuss - why `withProSubscriptionOnly` is a HoC, wouldn't it be better if it was a Hook?
