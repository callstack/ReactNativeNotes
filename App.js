/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';


class App extends React.Component {

  render() {
    return (
      <View style={styles.mainLayout}>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    flexDirection: "row",
  },
});

export default App;
