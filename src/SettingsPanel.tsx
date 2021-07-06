/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import {AppRegistry, StyleSheet, View} from 'react-native';

interface Props {}

interface State {}

class SettingsPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return <View style={styles.mainPanel}></View>;
  }
}

const styles = StyleSheet.create({
  mainPanel: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 30,
  },
});

AppRegistry.registerComponent('SettingsPanel', () => SettingsPanel);

export default SettingsPanel;
