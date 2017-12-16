import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './src/store/configureStore';


//get store
const store = configureStore();

const rnRedux = () =>(
  // wrap store in provider
  <Provider store={store}>
    <App />
  </Provider>
);

//app wrapped with provider
AppRegistry.registerComponent('rncourse', () => rnRedux);
