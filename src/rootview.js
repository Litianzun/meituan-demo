import React,{Component} from 'react';
import { StatusBar } from 'react-native';
import {createStackNavigator,createAppContainer,createBottomTabNavigator,StackNavigator} from 'react-navigation'
import Home from './page/home/home'
import My from './page/my'
import Others from './page/others'
import NearBy from './page/nearby/nearby'
import TabBarItem from './components/tabBarItem'
import Order from './page/order/order'
import Color from './media/color'

const bottomTab = createBottomTabNavigator(
  {
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '团购',
            tabBarIcon: ({ focused, tintColor }) => (
              <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('./img/home.png')}
                selectedImage={require('./img/home-active.png')}
              />
            )
        })
    },
    NearBy: {
        screen: NearBy,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '附近',
            tabBarIcon: ({ focused, tintColor }) => (
              <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('./img/nearby.png')}
                selectedImage={require('./img/nearby-active.png')}
              />
            )
        })
    },
    Order: {
        screen: Order,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '订单',
            tabBarIcon: ({ focused, tintColor }) => (
              <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('./img/order.png')}
                selectedImage={require('./img/order-active.png')}
              />
            )
        })
    },
    My: {
        screen: My,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '我的',
            tabBarIcon: ({ focused, tintColor }) => (
              <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('./img/my.png')}
                selectedImage={require('./img/my-active.png')}
              />
            )
        })
    }
  },
  {
      tabBarOptions: {
          activeTintColor: Color.primary,
          inactiveTintColor: Color.gray
      }
  }
)

bottomTab.navigationOptions = {
    header: null,
};
const AppNavigator = createStackNavigator({
        Main: {
            screen: bottomTab
        },
        Others: {
            screen: Others
        }
      },{
        defaultNavigationOptions: {
          headerBackTitle: null,
          headerTintColor: '#333333',
          showIcon: true,
        },
      })
const ContainerView = createAppContainer(AppNavigator);
export default class RootView extends Component {
    render(){
        return <ContainerView />;
    }
}

