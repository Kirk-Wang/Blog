import React from 'react';
import {
  StyleSheet,
  View,
  Button,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

class App extends React.PureComponent {
  render() {
    return (
      <View style={styles.body}>
        <Button title={"DetailsPage"} onPress={() => this.props.navigation.navigate('Details')}/>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
});

export default App;
