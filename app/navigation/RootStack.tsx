import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import Details from "../screens/Details";
import Home from "../screens/Home";

type RootStackParamList = {
  Home: undefined;
  Details: { item: any };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type DetailsProps = NativeStackScreenProps<RootStackParamList, "Details">;

const RootStackNavigation = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1c357f",
        },
        headerTintColor: "#fff",
      }}
    >
      <RootStack.Group>
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="Details" component={Details} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootStackNavigation;
