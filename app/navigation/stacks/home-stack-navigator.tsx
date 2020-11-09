import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { HomeScreen, QRScannerScreen } from '../../screens';
import {
  TRANSPARENT_MODAL_WITH_FADE_ANIM_OPTIONS,
  WITHOUT_HEADER_OPTIONS,
} from '../options';

export type HomeStackParams = {
  Home: undefined;
  QRScanner: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParams>();

export const HomeStackNavigator = () => (
  <Stack.Navigator screenOptions={WITHOUT_HEADER_OPTIONS}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen
      name="QRScanner"
      component={QRScannerScreen}
      options={TRANSPARENT_MODAL_WITH_FADE_ANIM_OPTIONS}
    />
  </Stack.Navigator>
);
