import React from 'react';
// import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './navigation';
import { persistor, store } from './redux/store';
import { admobInit } from './service/adMob';
import { initLogger } from './service/Logger';
import { initAuth0 } from './modules/Auth/services/Auth0';
import { authConfig, PusherConfig } from './config';
import { initPusher } from './service/pusher';

admobInit();
initLogger();
initAuth0(authConfig.domain, authConfig.clientId, authConfig.audience);
initPusher(PusherConfig.apiKey);

// enableScreens();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </PersistGate>
  </Provider>
);

export default App;
