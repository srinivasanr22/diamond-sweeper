
### This application is developed in React js.

Please follow the below steps to clone the app

  1) `git clone https://github.com/srinivasanr22/diamond-sweeper.git' 
  2)  run npm i (to install all npm dependencies)
      Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
  3)  npm start (to launch application)

Components:
    
    App.js is the main component which renders all other components inside the dom.

    All the components are moved into components folder inside each folder will contain individual components. 

        - Board Component
        - Cell Component
        - ScoreBoard Component

     Board Component is the parent component for all other two, which circulates inputs to the other component.

     Implemented Hot Reloading, when ever you did changes this app auto detects and re-renders into the dom without manual refresh.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
