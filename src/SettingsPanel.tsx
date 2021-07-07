/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import {AppRegistry, StyleSheet, View, NativeModules} from 'react-native';
import {Picker} from 'react-native-windows';
import Colors from './Resources/Colors';
import * as dictionary from './Resources/Dictionary';
import * as theming from './Resources/Theming/ThemeHOC';

interface Properties {}

interface State {
  selectedLanguage: number;
  selectedTheme: number;
}

class SettingsPanel extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      selectedLanguage: 0,
      selectedTheme: 0,
    };
  }

  languageValueChanged = (value: number) => {
    NativeModules.Database.setLanguageValue(value);
    this.setState({selectedLanguage: value});
  };

  themeValueChanged = (value: number) => {
    NativeModules.Database.setThemeValue(value);
    this.setState({selectedTheme: value});
  };

  render() {
    return (
      <theming.ThemedView style={styles.mainPanel}>
        <View style={styles.languageField}>
          <dictionary.Dictionary
            style={styles.languageText}
            textLabel={'settings.languageLabel'}></dictionary.Dictionary>
          <Picker
            selectedValue={this.state.selectedLanguage}
            style={styles.languageSelectionBox}
            onValueChange={this.languageValueChanged}>
            <Picker.Item label="English" value={0} />
            <Picker.Item label="Polski" value={1} />
          </Picker>
        </View>
        <View style={styles.themeField}>
          <dictionary.Dictionary
            style={styles.languageText}
            textLabel={'theme.theme'}></dictionary.Dictionary>
          <Picker
            selectedValue={this.state.selectedTheme}
            style={styles.themeSelectionBox}
            onValueChange={this.themeValueChanged}>
            <Picker.Item
              label={dictionary.getTextByKey('theme.default')}
              value={0}
            />
            <Picker.Item
              label={dictionary.getTextByKey('theme.dark')}
              value={1}
            />
          </Picker>
        </View>
      </theming.ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  mainPanel: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
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
  themeField: {
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
  themeSelectionBox: {
    height: 30,
    width: 150,
  },
});

AppRegistry.registerComponent('SettingsPanel', () => SettingsPanel);

export default SettingsPanel;
