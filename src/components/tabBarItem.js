import React,{Component} from 'react';
import {Image,View} from 'react-native';
import propTypes from 'prop-types';

class TabBarItem extends Component {
    render(){
        let selectedImage = this.props.selectedImage ? this.props.selectedImage : this.props.normalImage
        return (
            <Image
                source={this.props.focused
                ? selectedImage
                : this.props.normalImage}
                style={{ tintColor: this.props.tintColor, width: 25, height: 25 }}
            />
        )
    }
}

TabBarItem.propTypes = {
  tintColor: propTypes.string,
  normalImage: propTypes.any,
  selectedImage: propTypes.any,
  focused: propTypes.bool,
}

export default TabBarItem;