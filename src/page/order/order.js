import React,{Component} from 'react';
import {Text,View,SafeAreaView,StyleSheet} from 'react-native';
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import api from '../../api';
import screen from '../../media/screen'
import color from '../../media/color'
import OrderMenuItem from './orderMenuItem'
import GrayBlank from '../../components/grayBlank'
import OrderListScene from './orderList'

var navigation = null;
export default class Order extends Component {
    constructor(props){
        super(props);
        navigation = this.props.navigation
    }

    renderHeader = () => {
        return (
            <View>
              <View style={styles.orderTitle}>
                <Text style={{color:'#333',fontSize: 16}}>我的订单</Text>
                <Text style={{color:'#888',fontSize: 15}}>全部订单 ></Text>
              </View>
              <View style={styles.itemContainer}>
                <OrderMenuItem title='待付款' icon={require('../../img/order/order_tab_need_pay.png')} />
                <OrderMenuItem title='待使用' icon={require('../../img/order/order_tab_need_use.png')} />
                <OrderMenuItem title='待评价' icon={require('../../img/order/order_tab_need_review.png')} />
                <OrderMenuItem title='退款/售后' icon={require('../../img/order/order_tab_needoffer_aftersale.png')} />
              </View>
            </View>
        )
    }
    render(){
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                <GrayBlank />
                <OrderListScene />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    orderTitle: {
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row'
    }
})