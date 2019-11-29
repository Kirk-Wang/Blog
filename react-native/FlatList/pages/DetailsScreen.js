import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,  
  ActivityIndicator,
} from 'react-native';

const cities = [
  "北京",
  "上海",
  // "广州",
  // "深圳",
  // "重庆",
  // "合肥",
  // "南京",
  // "苏州",
  // "厦门",
  // "成都",
  // "武汉",
  // "长沙",
  // "东莞",
  // "佛山",
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
  // "福州",
  // "西安",
  // "杭州",
  // "贵阳",
  // "惠州",
  // "金华",
  // "南昌",
  // "泉州",
  "石家庄",
  "太原",
  "中山",
  "珠海",
]

export default class DetailsScreen extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      dataArray: cities.map((item, index) => ({text:item, key:`item${index}`}))
    }
  }

  loadData = () => {
    this.setState({
      isLoading: true,
    })
    const { dataArray } = this.state;
    const newItem = dataArray[Math.ceil(Math.random() * 20)]
    setTimeout(() => {
      this.setState({
        isLoading: false,
        dataArray: [
          {
            text: newItem.text,
            key: `item${dataArray.length}`
          },
          ...dataArray
        ]
      })
    }, 2000)
  }

  _renderIndiactor() {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
          size={'large'}
          color={'red'}
          animating={true}
        />
        <Text>正在加载更多</Text>
      </View>
    )
  }

  _renderItem({item}) {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataArray}
          renderItem={this._renderItem}
          // refreshing={this.state.isLoading}
          // onRefresh={() => {
          //   this.loadData()
          // }}
          refreshControl = {
            <RefreshControl
              title={'Loading'}
              colors={['red']}
              tintColor={'orange'}
              titleColor={'red'}
              refreshing={this.state.isLoading}
              onRefresh ={() => {
                this.loadData()
              }}
            />
          }
          // ListFooterComponent={this._renderIndiactor}
          // onEndReached={() => {
          //   this.loadData()
          // }}
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
  },
  indicatorContainer: {
    alignItems: 'center'
  },
  indicator: {
    margin: 10
  }
});