import React,{Component} from 'react';
import {Text,View,SafeAreaView,StyleSheet,TouchableOpacity,Image} from 'react-native';
import color from '../../media/color'
import screen from '../../media/screen'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import NearbyListScene from './nearbyList'

var navigation = null;

const titles = ['享美食', '住酒店', '爱玩乐', '全部']
const types = [
  ['热门', '面包甜点', '小吃快餐', '川菜', '日本料理', '韩国料理', '台湾菜', '东北菜'],
  ['热门', '商务出行', '公寓民宿', '情侣专享', '高星特惠'],
  ['热门', 'KTV', '足疗按摩', '洗浴汗蒸', '电影院', '美发', '美甲'],
  []
]
export default class NearBy extends Component {
    constructor(props){
        super(props);
        navigation = this.props.navigation
    }
    renderHeader = () => {
        return (
      <View style={styles.headerWrapper}>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
            <Image style={{ width: 13, height: 16 }} source={require('../../img/public/icon_food_merchant_address.png')} />
            <Text style={{ fontSize: 15, color: '#333333' }}> 福州 鼓楼</Text>
        </TouchableOpacity>
            <TouchableOpacity style={styles.searchBar}>
            <Image source={require('../../img/home/search_icon.png')} style={styles.searchIcon} />
            <Text>找附近的吃喝玩乐</Text>
        </TouchableOpacity>
      </View>
        )
    }
    onChange = (i,ref) => {
      console.log(i,ref)
    }
    render(){
        return (
            <View style={{flex:1}}>
              {this.renderHeader()}
              <ScrollableTabView
              style={styles.container}
              tabBarBackgroundColor='white'
              tabBarActiveTextColor='#FE566D'
              tabBarInactiveTextColor='#555555'
              tabBarTextStyle={styles.tabBarText}
              tabBarUnderlineStyle={styles.tabBarUnderline}
              >
              {titles.map((title, i) => (
                <NearbyListScene
                  tabLabel={titles[i]}
                  key={i}
                  types={types[i]}
                  navigation={this.props.navigation}
                />
              ))}
              </ScrollableTabView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapper: {
        width: '100%',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    container: {
      flex: 1,
      backgroundColor: color.paper
    },
    searchBar: {
      width: screen.width * 0.65,
      height: 30,
      borderRadius: 19,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eeeeee',
      alignSelf: 'center',
      marginRight: 20,
    },
    searchIcon: {
      width: 20,
      height: 20,
      margin: 5,
    },
    tabBarText: {
      fontSize: 14,
      marginTop: 13,
    },
    tabBarUnderline: {
      backgroundColor: '#FE566D'
    },
  })