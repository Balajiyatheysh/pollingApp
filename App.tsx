import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import RawJsonScreen from './screens/RawJsonScreen';

export type ScreenParamTypes = {
  HomeScreen: undefined;
  RawJsonScreen: {data:any};
}

export default function App() {
  const Stack = createNativeStackNavigator<ScreenParamTypes>();
  return (
    <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName='HomeScreen'>
          <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ title: 'HomeScreen' }} />
          <Stack.Screen name='RawJsonScreen' component={RawJsonScreen} options={{ title: 'Polling JSON data' }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}


