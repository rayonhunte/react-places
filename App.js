import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import configureStore from './src/store/configureStore'; 
import AuthScreen from "./src/screens/Auth/AuthScreen";
import FindPlace from "./src/screens/FindPlace/FindPlace";
import SharePlace from "./src/screens/SharePlace/SharePlace";
import PlaceDetails from "./src/screens/PlaceDetail/PlaceDetail";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";

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
Navigation.registerComponent("awesome-places.PlaceDetails", 
() => PlaceDetails,
      store, 
      Provider);
Navigation.registerComponent("awesome-places.SideDrawer", 
() => SideDrawer,
      store,
      Provider);
// Start a App
export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: "awesome-places.AuthScreen",
    title: "Login"
  }
});