# TodoList App
![](https://github.com/Youngdi/ToDoListApp/blob/master/demo.gif)
## Tech Stack

- React Native 0.62.7
- React Navigation V6
- MobX State Tree [(Why not Redux?)](https://github.com/Youngdi/ToDoListApp/blob/master/docs/MobX-State-Tree.md)
- TypeScript
- Supports Expo (and Expo web) out of the box
- Biometric Authentication
- Localization
- AsyncStorage (integrated with MST for restoring state)
- apisauce (to talk to REST servers)
- Flipper-ready
- Reactotron-ready (and pre-integrated with MST)
- Storybook UI kit
- Detox E2E test
- Theme System
- Jest unit test

## Quick Start

* Install: `yarn install`
* Android: `npm run android`
* iOS: `npm run ios`
* Env: 
	- Node 16.15.1
	- Yarn 1.22.19
	- Java JDK 11
	- ruby 2.6.3p62
	- cocoapods 1.11.3
	- Mac OS 11.5.1
	- Android SDK 29.0.5-5949299

The project's structure:

```
ToDoListApp
├── app
│   ├── components
│   ├── i18n
│   ├── utils
│   ├── models
│   ├── navigators
│   ├── screens
│   ├── services
│   ├── theme
│   ├── app.tsx
├── storybook
│   ├── views
│   ├── index.ts
│   ├── storybook-registry.ts
│   ├── storybook.ts
│   ├── toggle-storybook.tsx
├── e2e
│   ├── config.json
│   ├── init.js
│   ├── READMD.md
│   ├── reload.js
│   ├── todo-flow.spec.js
├── test
│   ├── __snapshots__
│   ├── storyshots.test.ts.snap
│   ├── mock-i18n.ts
│   ├── mock-reactotron.ts
│   ├── setup.ts
│   ├── storyshots.test.ts
├── README.md
├── android
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── keystores
│   └── settings.gradle
├── index.js
├── ios
│   ├── ToDoListApp
│   ├── ToDoListApp-tvOS
│   ├── ToDoListApp-tvOSTests
│   ├── ToDoListApp.xcodeproj
│   └── ToDoListAppTests
├── .env
└── package.json

```

## Running unit tests

`npm run test`

It includes the business logic of Apis and todo-list CRUD logic


### ./app directory

This is a directory you would normally have to create when using vanilla React Native.

The inside of the src directory:

```
app
│── components
│── i18n
├── models
├── navigators
├── screens
├── services
├── theme
├── utils
└── app.tsx
```

**components**
This is where your React components will live. Each component will have a directory containing the `.tsx` file, along with a story file, and optionally `.presets`, and `.props` files for larger components. The app will come with some commonly used components like Button.

**i18n**
This is where your translations will live if you are using `react-native-i18n`.

**models**
This is where your app's models will live. Each model has a directory which will contain the `mobx-state-tree` model file, test file, and any other supporting files like actions, types, etc.

**navigators**
This is where your `react-navigation` navigators will live.

**screens**
This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**services**
Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**theme**
Here lives the theme for your application, including spacing, colors, and typography.

**utils**
This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truely shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

**app.tsx** This is the entry point to your app. This is where you will find the main App component which renders the rest of the application.
 you get started with React Native.

### ./storybook directory

This is where your stories will be registered and where the Storybook configs will live.

### ./test directory

This directory will hold your Jest configs and mocks, as well as your [storyshots](https://github.com/storybooks/storybook/tree/master/addons/storyshots) test file. This is a file that contains the snapshots of all your component storybooks.

## Running Storybook

From the command line in your generated app's root directory, enter `yarn run storybook`
This starts up the storybook server and opens a story navigator in your browser. With your app
running, choose Toggle Storybook from the developer menu to switch to Storybook; you can then
use the story navigator in your browser to change stories.

For Visual Studio Code users, there is a handy extension that makes it easy to load Storybook use cases into a running emulator via tapping on items in the editor sidebar. Install the `React Native Storybook` extension by `Orta`, hit `cmd + shift + P` and select "Reconnect Storybook to VSCode". Expand the STORYBOOK section in the sidebar to see all use cases for components that have `.story.tsx` files in their directories.

## Running e2e tests

Read [e2e setup instructions](./e2e/README.md).

For ios:
1. `npm run build:e2e`
2. `npm run test:e2e`

You can see how it works on demo.gif
