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
import * as dictionary from './Resources/Dictionary';
import * as theming from './Resources/Theming/ThemeHOC';

const SettingsNotificationModuleEventEmitter = new NativeEventEmitter(
  NativeModules.Database,
);

interface Props {}

interface State {
  id: number;
  title: string;
  message: string;
  isEditing: boolean;
  language: number;
  theme: number;
}

class NoteWidgetDetailsPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      id: 0,
      title: '',
      message: '',
      isEditing: false,
      language: 0,
      theme: 0,
    };
  }

  async componentDidMount() {
    await NativeModules.NoteWidgetClickHandler.openedNoteID()
      .then((result: number) => {
        this.setState({id: result});
        this.getNoteTitle();
        this.getNoteMessage();
        return 0;
      })
      .catch((error: Error) => {
        Alert.alert(
          'ERROR!',
          `Could not find the opened note\n${error.message}`,
        );
      });
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

  titleOnChange = (text: string) => {
    this.setState({title: text});
  };

  messageOnChange = (text: string) => {
    this.setState({message: text});
  };

  getNoteTitle = async () => {
    await NativeModules.Database.getNoteTitle(this.state.id)
      .then((result: string) => {
        this.setState({title: result});
        return 0;
      })
      .catch((error: Error) => Alert.alert('ERROR!', `${error.message}`));
  };

  getNoteMessage = async () => {
    await NativeModules.Database.getNotePost(this.state.id)
      .then((result: string) => {
        this.setState({message: result});
        return 0;
      })
      .catch((error: Error) => Alert.alert('ERROR!', `${error.message}`));
  };

  cancelButtonPressed = () => {
    if (this.state.isEditing) {
      Alert.alert(
        dictionary.getTextByKey('alert.confirmationRequired'),
        dictionary.getTextByKey('alert.confirmationExplanation'),
        [
          {
            text: dictionary.getTextByKey('alert.cancel'),
            style: 'cancel',
          },
          {
            text: dictionary.getTextByKey('alert.discard'),
            onPress: () =>
              NativeModules.NoteWidgetClickHandler.goToNotesScreen(),
          },
        ],
      );
    } else {
      NativeModules.NoteWidgetClickHandler.goToNotesScreen();
    }
  };

  saveButtonPressed = () => {
    NativeModules.Database.updateNote(
      this.state.title,
      this.state.message,
      this.state.id,
    );
    this.setState({isEditing: false});
  };

  editButtonPressed = () => {
    this.setState({isEditing: true});
  };

  deleteButtonPressed = () => {
    Alert.alert(
      dictionary.getTextByKey('alert.noteDeleteConfirmation'),
      dictionary.getTextByKey('alert.noteDeletionConfirmExplanation'),
      [
        {
          text: dictionary.getTextByKey('alert.cancel'),
          style: 'cancel',
        },
        {
          text: dictionary.getTextByKey('alert.delete'),
          onPress: () => {
            NativeModules.Database.deleteNote(this.state.id);
            NativeModules.NoteWidgetClickHandler.goToNotesScreen();
          },
        },
      ],
    );
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
          placeholder={dictionary.getTextByKey(
            'editNoteScreen.titlePlaceholder',
          )}
          editable={this.state.isEditing}
        />

        <TextInput
          style={theming.applyTheming(styles.noteMessageBox)}
          multiline={true}
          onChangeText={this.messageOnChange}
          value={this.state.message}
          placeholder={dictionary.getTextByKey(
            'editNoteScreen.messagePlaceholder',
          )}
          editable={this.state.isEditing}
        />

        <View style={styles.actionsPanel}>
          <Button
            title={dictionary.getTextByKey('editNoteScreen.discardButton')}
            onPress={this.cancelButtonPressed}
          />
          <Button
            title={dictionary.getTextByKey('editNoteScreen.editButton')}
            disabled={this.state.isEditing}
            onPress={this.editButtonPressed}
          />
          <Button
            title={dictionary.getTextByKey('editNoteScreen.saveButton')}
            disabled={!this.state.isEditing}
            onPress={this.saveButtonPressed}
          />
          <Button
            title={dictionary.getTextByKey('editNoteScreen.deleteButton')}
            onPress={this.deleteButtonPressed}
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
    margin: 10,
  },
});

AppRegistry.registerComponent(
  'NoteWidgetDetailsPanel',
  () => NoteWidgetDetailsPanel,
);

export default NoteWidgetDetailsPanel;
