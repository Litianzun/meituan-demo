import React,{Component} from 'react';
import {View,Image,Text,StyleSheet,FlatList,TouchableOpacity,ScrollView} from 'react-native';
import color from '../../media/color'
import screen from '../../media/screen'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import {Net} from '../../../utils/newHttp'
import api from '../../api'

export default class Recommend extends Component {
    constructor(props){
        super(props);
        this.state={
            data: [],
            refreshing: true,
            refreshState: RefreshState.Idle,
        }
    }

    componentDidMount() {
        // this.getRecommendData()
        this.requestFirstPage()
    }

    requestData = async () => {
        // Net(api.recommend,{}).then(res=>{
        //     console.log(res)
        // }).catch(msg=>{
        //     console.error(msg)
        // })
              let response = await fetch(api.recommend)
              let json = await response.json()
              let dataList = json.data.map(
                (info) => {
                  return {
                    id: info.id,
                    imageUrl: info.squareimgurl,
                    title: info.mname,
                    subtitle: `[${info.range}]${info.title}`,
                    price: info.price
                  }
                }
              )
              console.log(dataList)
              return dataList;
            //   console.log('dataList',dataList)
            //   this.setState({
            //     data: dataList,
            //     refreshing: false,
            //   })
    }
    requestFirstPage = async () => {
        try {
          this.setState({ refreshState: RefreshState.HeaderRefreshing,refreshing:true })
          let dataList = await this.requestData()
    
          this.setState({
            data: dataList,
            refreshing: false,
            refreshState: RefreshState.Idle,
          })
        } catch (error) {
          this.setState({
              refreshing: false,
            refreshState: RefreshState.Failure,
          })
        }
      }
      requestNextPage = async () => {
        try {
          this.setState({ refreshState: RefreshState.FooterRefreshing ,refreshing: true,})
          let dataList = await this.requestData()
    
          this.setState({
            data: [...this.state.data, ...dataList],
            refreshing: false,
            refreshState: this.state.data.length > 30 ? RefreshState.NoMoreData : RefreshState.Idle,
          })
        } catch (error) {
          this.setState({
            refreshState: RefreshState.Failure,
            refreshing: false,
          })
        }
      }
    _keyExtractor = (item, index) => item.id;

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
      
    // onReached = () => {
    //     console.log('到底了')
    //     this.getRecommendData()
    // }
    // onRefresh = () => {
    //     console.log('刷新')
    //     this.getRecommendData()
    // }
    render(){
        return (
            <View style={{width:'100%'}}>
            <Text style={styles.title}>猜你喜欢</Text>
            <FlatList
             data={this.state.data}
             ListEmptyComponent={()=><Text style={{width:'100%',textAlign:'center'}}>没有数据!</Text>}
             keyExtractor={this._keyExtractor}
             renderItem={this._renderItem}
             ListHeaderComponent={this.props.renderHeader}
             onEndReached={this.requestNextPage}
             onRefresh={this.requestFirstPage}
             refreshing={this.state.refreshing}
             onEndReachedThreshold={0.2}
            />
             {/* <RefreshListView
                data={this.state.data}
                ListHeaderComponent={this.renderHeader}
                renderItem={this._renderItem}
                renderHeader={this.props.renderHeader}
                keyExtractor={(item, index) => index.toString()}
                refreshState={this.state.refreshState}
                onHeaderRefresh={this.requestFirstPage}
                // onFooterRefresh={this.requestNextPage}
            /> */}
            <View style={{width:'100%',height: 30}} />
             </View>
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