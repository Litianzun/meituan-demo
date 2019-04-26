

import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Image } from 'react-native'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import screen from '../../media/screen'
import color from '../../media/color'
import api from '../../api'
import axios from 'axios'
import httpRequest,{getNew} from '../../../utils/http'

import NearbyHeaderView from './nearbyHeader'

class NearbyListScene extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      typeIndex: 0,
      data: [],
      refreshState: RefreshState.Idle,
    }
  }

  componentDidMount() {
    this.requestFirstPage()
    getNew(api.recommend,{}).then(res=>{
      console.log(res.data)
    }).catch(msg=>{
      console.error(msg)
    })
  }

  requestData = async () => {
    // getNew(api.recommend).then(res=>{
    //   console.log(res.data)
    // }).catch(msg=>{
    //   console.error(msg)
    // })
    let response = await fetch(api.recommend)
    let json = await response.json()
    let dataList = json.data.map((info) => {
      return {
        id: info.id,
        imageUrl: info.squareimgurl,
        title: info.mname,
        subtitle: `[${info.range}]${info.title}`,
        price: info.price
      }
    })
    dataList.sort(() => { return 0.5 - Math.random() })
    return dataList
    // 偷懒，用同一个测试接口获取数据，然后打乱数组，造成数据来自不同接口的假象 >.<
  }

  requestFirstPage = async () => {
    try {
      this.setState({ refreshState: RefreshState.HeaderRefreshing })
      let dataList = await this.requestData()

      this.setState({
        data: dataList,
        refreshState: RefreshState.Idle,
      })
    } catch (error) {
      this.setState({
        refreshState: RefreshState.Failure,
      })
    }
  }

  requestNextPage = async () => {
    try {
      this.setState({ refreshState: RefreshState.FooterRefreshing })
      let dataList = await this.requestData()

      this.setState({
        data: [...this.state.data, ...dataList],
        refreshState: this.state.data.length > 30 ? RefreshState.NoMoreData : RefreshState.Idle,
      })
    } catch (error) {
      this.setState({
        refreshState: RefreshState.Failure,
      })
    }
  }

  renderHeader = () => {
    return (
      <NearbyHeaderView
        titles={this.props.types}
        selectedIndex={this.state.typeIndex}
        onSelected={(index) => {
          if (index != this.state.typeIndex) {
            this.setState({ typeIndex: index })
            this.requestData()
          }
        }}
      />
    )
  }

//   renderCell = (rowData) => {
//     return (
//       <GroupPurchaseCell
//         info={rowData.item}
//         onPress={() => {
//           this.props.navigation.navigate('GroupPurchase', { info: rowData.item })
//         }}
//       />
//     )
//   }
_renderItem = ({item}) => {
    let imageUrl = item.imageUrl.replace('w.h', '160.0')
    return (
      <TouchableOpacity style={styles.container}>
        <Image source={{ uri: imageUrl }} style={styles.icon} />

        <View style={styles.rightContainer}>
          <Text style={{color:'#333',fontSize: 16}}>{item.title}</Text>
          <Text numberOfLines={0} style={{ marginTop: 8,color: color.gray,fontSize: 14 }}>{item.subtitle}</Text>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text style={styles.price}>{item.price}元</Text>
          </View>

        </View>
      </TouchableOpacity>
    )
};

  render() {
    return (
      <RefreshListView
        data={this.state.data}
        ListHeaderComponent={this.renderHeader}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
        refreshState={this.state.refreshState}
        onHeaderRefresh={this.requestFirstPage}
        onFooterRefresh={this.requestNextPage}
      />
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: 'white',
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
title: {
    color: '#333',
    fontSize: 17,
    paddingLeft: 20,
    width: '100%',
    height: 40,
    lineHeight: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#eee'
},
rightContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 10,
  },
  price: {
    color: color.primary
  }
})


export default NearbyListScene
