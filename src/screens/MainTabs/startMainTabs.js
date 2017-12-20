import { Navigation } from "react-native-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';

const startTabs = () =>{
  Promise.all([
    Icon.getImageSource("map", 30),
    Icon.getImageSource("share", 30),
    Icon.getImageSource("bars", 30)
  ]).then(sources =>{
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "awesome-places.FindPlace",
          label: "Find Place",
          title: "Find Place",
          icon: sources[0],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                title: "Menu",
                id: "sideDrawerToggle"
              }
            ]
          }
        },
        {
          screen: "awesome-places.SharePlace",
          label: "Share Place",
          title: "Share Place",
          icon: sources[1],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                title: "Menu",
                id: "sideDrawerToggle"
              }
            ]
          }
        },
      ],
      tabsStyle:{
        tabBarSelectedButtonColor: "orange"
      },
      appStyle:{
        tabBarSelectedButtonColor: "orange"
      },
      drawer:{
        left:{
          screen:"awesome-places.SideDrawer",
        }
      }
    })
  })
};

export default startTabs;