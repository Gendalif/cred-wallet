import 'react-native-gesture-handler';
import React, { FunctionComponent } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import RootNavigator from './app/navigation/root-navigator';
import { store } from './app/redux';

enableScreens();

const App: FunctionComponent = () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  </SafeAreaProvider>
);

export default App;
