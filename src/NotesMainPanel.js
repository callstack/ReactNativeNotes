/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';


class NotesMainPanel extends React.Component {

  render() {
    return(
      <View>
        <Text>NotesMainPanel</Text>
      </View>
    );
  }
};


const styles = StyleSheet.create({
});


AppRegistry.registerComponent("NotesMainPanel", () => NotesMainPanel);

export default NotesMainPanel;
