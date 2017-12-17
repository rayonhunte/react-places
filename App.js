import { Navigation } from "react-native-navigation";
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore'; 
import AuthScreen from "./src/screens/Auth/AuthScreen";
import FindPlace from "./src/screens/FindPlace/FindPlace";
import SharePlace from "./src/screens/SharePlace/SharePlace";


const store = configureStore();


// Register Screens
Navigation.registerComponent("awesome-places.AuthScreen", 
() => AuthScreen, 
      store, 
      Provider);
Navigation.registerComponent("awesome-places.FindPlace", 
() => FindPlace, 
      store, 
      Provider);
Navigation.registerComponent("awesome-places.SharePlace", 
() => SharePlace, 
      store, 
      Provider);
// Start a App
Navigation.startSingleScreenApp({
  screen: {
    screen: "awesome-places.AuthScreen",
    title: "Login"
  }
});