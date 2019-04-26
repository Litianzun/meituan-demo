import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import screen from '../../media/screen'
import color from '../../media/color'

class NearbyHeaderView extends PureComponent {
  static defaultProps = {
    onSelected: () => { }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.props.titles.map((title, i) => (
          <TouchableOpacity
            key={i}
            style={[{ backgroundColor: this.props.selectedIndex == i ? '#FE566D' : 'white' }, styles.item]}
            onPress={() => this.props.onSelected(i)}>
            <Text style={{ color: this.props.selectedIndex == i ? 'white' : '#555555' }}>
              {title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: screen.width / 4 - 10,
    marginLeft: 8,
    marginTop: 5,
    marginBottom: 5,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: screen.onePixel,
    borderColor: color.border,
  },
})


export default NearbyHeaderView
