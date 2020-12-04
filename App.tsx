import React from 'react';
import { Provider } from 'react-redux';
import Navigation from './src/navigation';
import store from './src/config/store';

const App = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);

export default App;
