/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import {AppRegistry, StyleSheet, View, Text} from 'react-native';
import {Picker} from 'react-native-windows';
import Colors from './Resources/Colors';

interface Props {}

interface State {
  selectedLanguage: number;
}

class SettingsPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedLanguage: 0,
    };
  }

  render() {
    return (
      <View style={styles.mainPanel}>
        <View style={styles.languageField}>
          <Text style={styles.languageText}>Language: </Text>
          <Picker
            selectedValue={this.state.selectedLanguage}
            style={{height: 30, width: 150}}
            onValueChange={(itemIndex) =>
              this.setState({selectedLanguage: itemIndex})
            }>
            <Picker.Item label="English" value={0} />
            <Picker.Item label="Polski" value={1} />
          </Picker>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainPanel: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 30,
  },
  languageText: {
    fontWeight: 'bold',
    color: Colors.settingsLabels,
  },
  languageField: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
    width: '50%',
    alignItems: 'center',
  },
});

AppRegistry.registerComponent('SettingsPanel', () => SettingsPanel);

export default SettingsPanel;
