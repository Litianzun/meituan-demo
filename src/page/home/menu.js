import React,{Component} from 'react';
import {View,Image,Text,StyleSheet,ScrollView} from 'react-native';
import PageControl from 'react-native-page-control'
import color from '../../media/color'
import screen from '../../media/screen'

export default class Menu extends Component {
    constructor(props){
        super(props);
        this.state={
            menuInfos: props.menuInfos,
            currentPage: 0,
            currentView: []
        }
    }
    renderMenuItems = (info) => {
        //返回所有item项
        return (
        this.state.menuInfos.map((item,index)=>{
            return (
                <View style={styles.menuItems} key={index}>
                  <Image source={item.icon} style={styles.menuItems_img} />
                  <Text style={styles.menuItems_text}>{item.title}</Text>
                </View>
            )
        })
        )
    }
    handleScroll = (e) => {
        let x = e.nativeEvent.contentOffset.x;
        let currentIndex = Math.round(x/screen.width);
        console.log(currentIndex)
        if(currentIndex!==this.state.currentPage){
            this.setState({
                currentPage: currentIndex
            })
        }
    }
    render(){
        let menuViews=[]
        let pageCount = Math.ceil(this.state.menuInfos.length / 10)
        for (let i = 0; i < pageCount; i++) {
            let items = this.renderMenuItems().slice(i * 10, i * 10 + 10)
            let menuView = <View style={styles.itemsView} key={i}>{items}</View>
              menuViews.push(menuView)
          }
        return (
            <View style={{flex:1,minHeight:180}}>
                <ScrollView
                 style={{flex:1,minHeight:155}}
                 horizontal
                 showsHorizontalScrollIndicator={false}
                 pagingEnabled
                 onScroll={(e)=>this.handleScroll(e)}
                >
                  {/* <View style={styles.menuContainer}> */}
                    {menuViews}
                  {/* </View> */}
                </ScrollView>
                <PageControl
                style={{margin:10}}
                numberOfPages={pageCount}
                currentPage={this.state.currentPage}
                hidesForSinglePage
                pageIndicatorTintColor='gray'
                currentPageIndicatorTintColor={color.primary}
                indicatorSize={{ width: 8, height: 8 }} />
            </View>
            )
    }
}

const styles = StyleSheet.create({
    menuItemsWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    menuItems: {
        width: screen.width/5,
        height: 62,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10
    },
    menuItems_img: {
        width: 40,
        height: 40
    },
    menuItems_text: {
        fontSize: 13,
        color: '#666'
    },
    itemsView: {
        flexDirection: 'row',
        width: screen.width,
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        flexWrap: 'wrap',
      },
    menuContainer: {
        flexDirection: 'row',
      },
})