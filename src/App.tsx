import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { enableScreens } from 'react-native-screens';
import Navigation from './navigation';
import { persistor, store } from './redux/store';
import { admobInit } from './service/adMob';
import { initLogger } from './service/Logger';
import { initAuth0 } from './modules/Auth/services/Auth0';
import { authConfig, PusherConfig } from './config';
import { initPusher } from './service/pusher';
import { PermissionsProvider } from './context/PermissionsProvider';

enableScreens();
admobInit();
initLogger();
initAuth0(authConfig.domain, authConfig.clientId, authConfig.audience);
initPusher(PusherConfig.apiKey);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
        <PermissionsProvider>
          <Navigation />
        </PermissionsProvider>
      </SafeAreaProvider>
    </PersistGate>
  </Provider>
);

export default App;
