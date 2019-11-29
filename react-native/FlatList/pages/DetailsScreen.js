import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

const cities = [
"北京",
"上海",
"广州",
"深圳",
"重庆",
"合肥",
"南京",
"苏州",
"厦门",
"成都",
"武汉",
"长沙",
"东莞",
"佛山",
"宁波",
"青岛",
"郑州",
"温州",
"昆明",
"无锡",
"济南",
"沈阳",
"大连",
"南宁",
"天津",
"福州",
"西安",
"杭州",
"贵阳",
"惠州",
"金华",
"南昌",
"泉州",
"石家庄",
"太原",
"中山",
"珠海",
]

export default class DetailsScreen extends React.PureComponent {

  renderItem(data) {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{data.item}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={cities}
          renderItem = {(data) => this.renderItem(data)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: "#169",
    height: 200,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontSize: 20
  }
});