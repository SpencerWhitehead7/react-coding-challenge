# README

The description of the challenge is below. It was bootstrapped with Create React App, using the typescript template. The CRA boilerplate readme is below the challenge description. See CRA readme for install, run, build instructions. None of them have been changed.

## Features

- Straightforwards, mobile first design that displays status dynamically (errors, submission status)
- Name and password validations
- 100% Material UI styling

## Features left behind

- I think it would have been fun to make a password input component that let you show/hide the password. Material UI has an example of that in their docs. Something like the existing `<Form />` comp that managed visibility state independently of its parent, the way `<Form />` handles submit status.
- Restrict the "birthday" field to only dates before today. Ultimately this would have to be enforced server-side anyway as well though.

## Project structure

The entrypoint is `src/App.tsx`. Independent components that might be used across many feaures are in `src/comps`. Features are in `src/feats`. Any necessary tests for a given directory are in `<directory>/__tests__/*.test.tsx` files.

## Testing approach

Especially since this project uses React Testing Library, the tests focus on the behavior a user sees. They test flows/interactions and business logic, not display or component structure. For instance, there is a test for filling out and submitting a form and submitting it. But there is no test to make sure every desired checkbox in the form is present, or that there are no "extra" fields. As a general rule, if something is conditional or requires JS logic, it should be tested and if it's straight markup, it shouldn't. This is to keep the tests maintainable and focused. If every aspect of the components is tested, any change breaks the tests. This obscures actual important breaks due to accidentally changed behavior, and forces you to rewrite them constantly to fix unimportant changes in things like layout or classname.

# Challenge Description

### Task - Spin up a React app that presents a user with a small survey form. This form should have a series of specific questions and allow the user to submit their response

### Requirements

1. This should be a React App, that uses Material UI components.

- <https://material-ui.com/>
- <https://reactjs.org/>
- <https://jestjs.io/> (preferred testing library)

2. The following questions and options should be included in the survey:

- Name - Input Field
- Password - Masked Input Field
- Birthday - Date/Time Picker
- Timezone - Select (should use a library or api to get a set of timezones)
- Tech Preference - Radio (options should be “front end” | “back end” | “both”)
- Pizza Toppings - Checkboxes

3. The user should be able to submit their response with the expected body:

```typescript
type RequestBody = {
  name: string;
  password: string;
  birthday: string; // ISO Format
  preferences: {
    techPref: "front end" | "back end" | "both";
    pizzaToppings: string[];
    timezone: string;
  };
};
```

4. We will be looking for production ready code:

- Tests
- Data modeling and app structure
- Good coding patterns
- State management
- Documentation including a well written readme

5. Bonus points for using Typescript, hooks, and functional components

When you’re finished, submit your solution to us via _Github, Gitlab, Bitbucket, etc_ link and our team will review it.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
