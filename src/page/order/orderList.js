import React,{Component} from 'react';
import {View,Text,Image,TouchableOpacity,StyleSheet} from 'react-native'
import color from '../../media/color'
import screen from '../../media/screen'
import api from '../../api'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'

export default class OrderListScene extends Component {
    constructor(props){
        super(props);
        this.state={
            data: [],
            refreshState: RefreshState.Idle,
        }
    }

    componentDidMount() {
        this.requestData()
      }
    
      requestData = async () => {
        try {
          this.setState({ refreshState: RefreshState.HeaderRefreshing })
    
          let response = await fetch(api.recommend)
          let json = await response.json()
    
          console.log(JSON.stringify(json))
    
          let dataList = json.data.map((info) => {
            return {
              id: info.id,
              imageUrl: info.squareimgurl,
              title: info.mname,
              subtitle: `[${info.range}]${info.title}`,
              price: info.price
            }
          })
    
          // 偷懒，用同一个测试接口获取数据，然后打乱数组，造成数据来自不同接口的假象 >.<
          dataList.sort(() => { return 0.5 - Math.random() })
    
          this.setState({
            data: dataList,
            refreshState: RefreshState.NoMoreData,
          })
        } catch (error) {
          this.setState({
            refreshState: RefreshState.Failure,
          })
        }
      }
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
    render(){
        return (
            <RefreshListView
            data={this.state.data}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshState={this.state.refreshState}
            onHeaderRefresh={this.requestData}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: screen.onePixel,
        borderColor: color.border,
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