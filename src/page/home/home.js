import React,{Component} from 'react';
import {Text,View,TouchableOpacity,Image,StyleSheet,ScrollView} from 'react-native';
import screen from '../../media/screen'
import color from '../../media/color'
import Menu from './menu'
import GrayBlank from '../../components/grayBlank'
import api from '../../api'
import MiddleGrid from './middleGrid'
import Recommend from './recommend'
import axios from 'axios'
import {Net} from '../../../utils/newHttp'

var navigation = null;
export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            gridData: [],
            reData: [], //猜你喜欢
            refreshing: true,
        }
    }
    static navigationOptions = ({navigation}) => ({
        headerTitle: (
            <TouchableOpacity style={styles.searchBar}>
                <Image source={require('../../img/search_icon.png')} />
                <Text>搜索</Text>
            </TouchableOpacity>
        )
    })

    componentDidMount(){
        this.getGridData()
    }

    getGridData = async() => {
        try{
            let json = api.discount;
            this.setState({
                gridData: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    homelistHeader = () => {
        return (
            <View>
            <Menu menuInfos={api.menuInfo} />
                <GrayBlank />
                {this.state.gridData.length>0&&
                <MiddleGrid gridData={this.state.gridData} />
                }
                <GrayBlank />
            </View>
        )
    }
    render(){
        return (
            <View>
                <View style={styles.headerWrapper}>
                    <Text style={styles.headerLeft}>福州</Text>
                    <TouchableOpacity style={styles.searchBar}>
                        <Image source={require('../../img/search_icon.png')} style={styles.searchIcon} />
                        <Text>搜索</Text>
                    </TouchableOpacity>
                    <Image style={styles.headerRight} source={require('../../img/icon_navigation_item_message_white.png')}></Image>
                </View>
                <Recommend reData={this.state.reData} refreshing={this.state.refreshing} renderHeader={this.homelistHeader} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapper: {
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: color.primary,
        paddingHorizontal: 10
    },
    searchBar: {
        width: screen.width * 0.7,
        height: 30,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#fff'
    },
    searchIcon: {
        width: 20,
        height: 20,
        margin: 5
    },
    headerRight: {
        width: 30,
        height: 30
    },
    headerLeft: {
        fontSize: 16,
        color: '#fff'
    }
})