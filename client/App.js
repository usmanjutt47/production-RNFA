import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootNavigation from "./Navigation";

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigation/>
    </NavigationContainer>
  );
}
