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


class CreateNotePanel extends React.Component {

  render() {
    return(
      <View style={styles.panel}>
        <View style={styles.panelContent}>
          <Text>Create Note panel</Text>
        </View>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  panel: {
    height: 75,
    borderColor: "black",
    borderWidth: 1,
  },
  panelContent: {
    flex: 1,
    flexDirection: "column",
  }
});


AppRegistry.registerComponent("CreateNotePanel", () => CreateNotePanel);

export default CreateNotePanel;
