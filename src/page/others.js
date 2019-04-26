import React,{Component} from 'react';
import {Text,View,SafeAreaView} from 'react-native';

var navigation = null;
export default class Others extends Component {
    constructor(props){
        super(props);
        navigation = this.props.navigation
    }
    render(){
        return (
            <SafeAreaView>
                <Text>Others</Text>
            </SafeAreaView>
        )
    }
}