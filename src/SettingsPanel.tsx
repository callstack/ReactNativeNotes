/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import {AppRegistry, StyleSheet, View, NativeModules} from 'react-native';
import {Picker} from 'react-native-windows';
import Colors from './Resources/Colors';
import Dictionary from './Resources/Dictionary';

interface Properties {}

interface State {
  selectedLanguage: number;
}

class SettingsPanel extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      selectedLanguage: 0,
    };
  }

  languageValueChanged = (value: number) => {
    NativeModules.Database.setLanguageValue(value);
    this.setState({selectedLanguage: value});
  };

  render() {
    return (
      <View style={styles.mainPanel}>
        <View style={styles.languageField}>
          <Dictionary
            style={styles.languageText}
            textLabel={'settings.languageLabel'}></Dictionary>
          <Picker
            selectedValue={this.state.selectedLanguage}
            style={styles.languageSelectionBox}
            onValueChange={this.languageValueChanged}>
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
  languageSelectionBox: {
    height: 30,
    width: 150,
  },
});

AppRegistry.registerComponent('SettingsPanel', () => SettingsPanel);

export default SettingsPanel;
