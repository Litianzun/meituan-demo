import React,{Component} from 'react';
import {View,Image,Text,StyleSheet,ScrollView} from 'react-native';
import color from '../../media/color'
import screen from '../../media/screen'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class MiddleGrid extends Component {
    constructor(props){
        super(props);
        this.state={
            gridData: this.props.gridData
        }
    }

    renderGridItems = () => {
        console.log(this.state.gridData)
        return (
            this.state.gridData.map((item,index)=>{
                let imgUrl = item.imageurl.replace('w.h', '120.0')
                console.log(imgUrl)
                return (
            <View style={styles.gridItems} key={index}>
              <View style={styles.gridItems_leftContent}>
                <Text style={{color:item.typeface_color,fontSize: 17,fontWeight:'600'}}>{item.maintitle}</Text>
                <Text style={styles.gridItems_leftContent_t2}>{item.deputytitle}</Text>
              </View>
              <TouchableOpacity style={{flexDirection:'row'}}>
              <Image source={{url: imgUrl}} style={{width:80, height: 80}} resizeMode="cover" />
              </TouchableOpacity>
            </View>
                )
    })
        )
    }
    render() {
        return (
            <View style={styles.middleGrid}>
              {this.renderGridItems()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    middleGrid: {
        width: '100%',
        display: "flex",
        flexDirection:'row',
        flexWrap: 'wrap',
        borderWidth: 1,
        borderColor: '#eee'
    },
    gridItems: {
        width: '50%',
        height: 100,
        display:'flex',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'center',
        borderWidth: 1,
        borderColor: '#eee'
    },
    gridItems_leftContent: {
        display: 'flex',
        flexDirection: 'column',
        height: '70%',
        width: '45%',
        justifyContent: 'space-between'
    }
})