### Scaling Redux Apps

#### Who we are
* Developers in Azure DevOps
* A large scale React + Redux App

#### Some Numbers for Azure DevOps
* 1000s of React Components
* 100s of Developers
* 100s of Independent Views
* Each view is composed of several widgets

#### Product Demo
[https://dev.azure.com](https://dev.azure.com)

#### Challenges
* Large number of State Keys,Reducers and Middlewares(redux-saga)
* Redux organization and Reuse
* Dynamic Loading components

#### Introducting……
* redux-dynamic-modules(A modular approach to Redux)
* [Building Modular Redux Applications](https://blog.usejournal.com/making-redux-modular-d21fd069bb33)

#### 1. Create a Module
* Organize and group your Redux Artiacts
* Easy to import and reuse

#### 2. Create a store
* Add modules to the store
	* Everything in the module is added!
* Use the same API you are used to

#### 3. Inject additinal modules at runtime
* When the HOC mounts your modules are added!

#### Code Walkthrough

#### Wrap Up
* With Redux-Dynamic-Modules, you can
	* Easily organize and re-use your Redux code
	* Define and register all your artifacts in ONE place
	* Load reducers, middleware, and other artifacts at runtime
	* Leverage code splitting to keep your initial bundle sizes small
