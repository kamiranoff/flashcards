import React, { useEffect } from 'react';
import * as Analytics from 'appcenter-analytics';
// import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Navigation from './navigation';
import { persistor, store } from './redux/store';

// enableScreens();

const App = () => {
  useEffect(() => {
    const handleAppCenter = async () => {
      await Analytics.setEnabled(true);
    };
    handleAppCenter().catch(null);
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
