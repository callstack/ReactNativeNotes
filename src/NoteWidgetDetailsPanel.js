/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View,
  NativeModules,
} from 'react-native';


class NoteWidgetDetailsPanel extends React.Component {

  goBack = () => {
    NativeModules.NoteWidgetClickHandler.goToNotesScreen();
  };

  render() {
    return(
      <View style={styles.panel}>
        <View style={styles.panelContent}>
          <Text>Note details panel</Text>
          <Button onPress={this.goBack} title={"Go back..."}></Button>
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


AppRegistry.registerComponent("NoteWidgetDetailsPanel", () => NoteWidgetDetailsPanel);

export default NoteWidgetDetailsPanel;
