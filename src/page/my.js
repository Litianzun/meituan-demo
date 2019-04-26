import React,{Component} from 'react';
import {Text,View,ScrollView,RefreshControl,Image,StyleSheet} from 'react-native';
import color from '../media/color'
import screen from '../media/screen'
import GrayBlank from '../components/grayBlank'

var navigation = null;

const myArr = [
      { title: '我的钱包', subtitle: '办信用卡', image: require('../../src/img/mine/icon_mine_wallet.png') },
      { title: '余额', subtitle: '￥95872385', image: require('../../src/img/mine/icon_mine_balance.png') },
      { title: '抵用券', subtitle: '63', image: require('../../src/img/mine/icon_mine_voucher.png') },
      { title: '会员卡', subtitle: '2', image: require('../../src/img/mine/icon_mine_membercard.png') },
      { title: '好友去哪', image: require('../../src/img/mine/icon_mine_friends.png') },
      { title: '我的评价', image: require('../../src/img/mine/icon_mine_comment.png') },
      { title: '我的收藏', image: require('../../src/img/mine/icon_mine_collection.png') },
      { title: '会员中心', subtitle: 'v15', image: require('../../src/img/mine/icon_mine_membercenter.png') },
      { title: '积分商城', subtitle: '好礼已上线', image: require('../../src/img/mine/icon_mine_member.png') },
      { title: '客服中心', image: require('../../src/img/mine/icon_mine_customerService.png') },
      { title: '关于美团', subtitle: '我要合作', image: require('../../src/img/mine/icon_mine_aboutmeituan.png') }
  ]
export default class My extends Component {
    constructor(props){
        super(props);
        this.state={
            isRefreshing: false
        }
    }
    topIcon = () => {
        return (
            <View style={styles.topicon}>
              <Image source={require('../../src/img/mine/icon_navigation_item_set_white.png')} style={styles.topicon_icon} />
              <Image source={require('../../src/img/mine/icon_navigation_item_message_white.png')} style={styles.topicon_icon} />
            </View>
        )
    }
    renderHeader = () => {
        return (
            <View style={styles.header}>
              <Image style={styles.avatar} source={require('../../src/img/mine/avatar.png')} />
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Text style={{ color: 'white',fontSize: 18,fontWeight:'600' }}>素敌</Text>
                  <Image style={{ marginLeft: 4 }} source={require('../../src/img/mine/beauty_technician_v15.png')} />
                </View>
                <Text style={{ color: 'white', marginTop: 4 ,fontSize: 16}}>个人信息 ></Text>
              </View>
            </View>
          )
    }
    renderCells = () => {
        return (
        myArr.map((item,index)=>{
            return (
                <View style={styles.myItem} key={index}>
                  <View style={styles.myItem_left}>
                    <Image source={item.image} style={styles.icon} />
                    <Text style={{color:'#333',fontSize:16,marginLeft: 15}}>{item.title}</Text>
                  </View>
                  <View style={styles.myItem_right}>
                    <Text style={{color:'#888',fontSize:13,marginRight: 8}}>{item.subtitle}</Text>
                    <Text>></Text>
                  </View>
                </View>
            )
        })
        )
    }
    render(){
        return (
            <View style={{ flex: 1, backgroundColor: color.paper }}>
        {/* <View style={{ position: 'absolute', width: screen.width, height: screen.height / 5, backgroundColor: color.primary,zIndex:1 }} /> */}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this.onHeaderRefresh()}
              tintColor='gray'
            />
          }>
          {this.topIcon()}
          {this.renderHeader()}
          <GrayBlank />
          {this.renderCells()}
        </ScrollView>
      </View>
        )
    }
}

const styles = StyleSheet.create({
    topicon: {
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: color.primary
    },
    topicon_icon: {
        width: 30,
        height: 30,
        marginRight: 20,
    },
    icon: {
      width: 27,
      height: 27,
    },
    header: {
      backgroundColor: color.primary,
      paddingBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 10
    },
    avatar: {
      width: 50,
      height: 50,
      marginRight: 10,
      borderRadius: 25,
      borderWidth: 2,
      borderColor: '#51D3C6'
    },
    myItem: {
        width: '100%',
        height: 60,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
    },
    myItem_left: {
        width: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    myItem_right: {
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center'
    }
  })
