/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import {
  Alert,
  AppRegistry,
  NativeModules,
  StyleSheet,
  TextInput,
  View,
  Button,
  NativeEventEmitter,
} from 'react-native';
import Colors from './Resources/Colors';
import * as dict from './Resources/Dictionary';
import * as theming from './Resources/Theming/ThemeHOC';

interface Props {}

interface State {
  title: string;
  message: string;
  language: number;
  theme: number;
}

const SettingsNotificationModuleEventEmitter = new NativeEventEmitter(
  NativeModules.Database,
);

class CreateNotePanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: '',
      message: '',
      language: 0,
      theme: 0,
    };
  }

  titleOnChange = (text: string) => {
    this.setState({title: text});
  };

  messageOnChange = (text: string) => {
    this.setState({message: text});
  };

  cancelButtonPressed = () => {
    if (this.state.title !== '' || this.state.message !== '') {
      Alert.alert(
        dict.getTextByKey('alert.confirmationRequired'),
        dict.getTextByKey('alert.confirmationExplanation'),
        [
          {
            text: dict.getTextByKey('alert.cancel'),
            style: 'cancel',
          },
          {
            text: dict.getTextByKey('alert.discard'),
            onPress: () =>
              NativeModules.NoteWidgetClickHandler.goToNotesScreen(),
          },
        ],
      );
    } else {
      NativeModules.NoteWidgetClickHandler.goToNotesScreen();
    }
  };

  componentDidMount() {
    SettingsNotificationModuleEventEmitter.addListener(
      'LanguageChanged',
      (result) => {
        this.setState({language: result});
      },
    );
    SettingsNotificationModuleEventEmitter.addListener(
      'ThemeChanged',
      (result) => {
        this.setState({theme: result});
      },
    );
  }

  createButtonPressed = () => {
    NativeModules.Database.writeNote(
      this.state.title,
      false,
      this.state.message,
    );
    NativeModules.NoteWidgetClickHandler.goToNotesScreen();
  };

  render() {
    return (
      <theming.ThemedView style={styles.mainPanel}>
        <TextInput
          style={styles.titleBox}
          onChangeText={this.titleOnChange}
          value={this.state.title}
          autoFocus={true}
          clearButtonMode={'while-editing'}
          placeholder={dict.getTextByKey('createNotesScreen.titlePlaceholder')}
        />

        <TextInput
          style={styles.noteMessageBox}
          multiline={true}
          onChangeText={this.messageOnChange}
          value={this.state.message}
          placeholder={dict.getTextByKey(
            'createNotesScreen.messagePlaceholder',
          )}
        />

        <View style={styles.actionsPanel}>
          <Button
            title={dict.getTextByKey('createNotesScreen.discardButton')}
            onPress={this.cancelButtonPressed}
          />
          <Button
            title={dict.getTextByKey('createNotesScreen.createButton')}
            onPress={this.createButtonPressed}
          />
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
  titleBox: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    width: '90%',
    height: 'auto',
    borderColor: Colors.noteTextPanelBorder,
    fontWeight: 'bold',
    marginTop: 30,
  },
  noteMessageBox: {
    borderWidth: 0.2,
    margin: 10,
    width: '90%',
    flexGrow: 1,
    borderColor: Colors.noteTextPanelBorder,
    alignContent: 'center',
    textAlignVertical: 'center',
  },
  actionsPanel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    maxHeight: 35,
    margin: 10
  },
});

AppRegistry.registerComponent('CreateNotePanel', () => CreateNotePanel);

export default CreateNotePanel;
