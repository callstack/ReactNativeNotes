/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';


class ApplicationSettingsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldExpand: true
    };
  }

  OnResizeButtonPressed = () => {
    this.setState( (state) => ({ shouldExpand: state.shouldExpand ? false : true}));
  };

  render() {
    return(
      <View style={this.state.shouldExpand ? styles.panel : styles.panelShrinked}>
        <TouchableHighlight onPress={this.OnResizeButtonPressed}>
          <View style={styles.panelModeButton}>
            <Text>Resize</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.panelContent}>
          <Text>LeftOptionsPanel</Text>
        </View>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  panelModeButton: {
    margin: 10,
    backgroundColor: "grey",
  },
  panelContent: {
    flex: 1,
    flexDirection: "column",
  },
  panel: {
    width: "20%",
    borderWidth: 1,
    borderColor: "black",
  },
  panelShrinked: {
    width: 50,
    borderWidth: 1,
    borderColor: "black",
  }
});


AppRegistry.registerComponent("ApplicationSettingsPanel", () => ApplicationSettingsPanel);

export default ApplicationSettingsPanel;
