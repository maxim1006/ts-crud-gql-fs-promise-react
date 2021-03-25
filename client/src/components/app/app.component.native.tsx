/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';

import {
  Header,
} from 'react-native/Libraries/NewAppScreen';
import FamilyContainer from '../family/family.container';
import { AppProps } from './types';

const App: React.FC<AppProps> = ({isLoggedIn}) => (
  <SafeAreaView>
    {!isLoggedIn
      ? <Text>Login Page</Text>
      : (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        >
          <FamilyContainer/>
        </ScrollView>
      )
    }
  </SafeAreaView>
);


export default App;
