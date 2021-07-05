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
} from 'react-native';
import Colors from './Resources/Colors';

interface Props {}

interface State {
  id: number;
  title: string;
  message: string;
  isEditing: boolean;
}

class NoteWidgetDetailsPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      id: 0,
      title: '',
      message: '',
      isEditing: false,
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
        'Are you sure?',
        'It looks like you still have unsaved changes, which are going to be lost.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Discard',
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
    Alert.alert('Are you sure?', 'Deleting the note cannot be reversed...', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          NativeModules.Database.deleteNote(this.state.id);
          NativeModules.NoteWidgetClickHandler.goToNotesScreen();
        },
      },
    ]);
  };

  render() {
    return (
      <View style={styles.mainPanel}>
        <TextInput
          style={styles.titleBox}
          onChangeText={this.titleOnChange}
          value={this.state.title}
          autoFocus={true}
          clearButtonMode={'while-editing'}
          placeholder={'Title'}
          editable={this.state.isEditing}
        />

        <TextInput
          style={styles.noteMessageBox}
          multiline={true}
          onChangeText={this.messageOnChange}
          value={this.state.message}
          placeholder={'Note content'}
          editable={this.state.isEditing}
        />

        <View style={styles.actionsPanel}>
          <Button title={'Discard'} onPress={this.cancelButtonPressed} />
          <Button
            title={'Edit'}
            disabled={this.state.isEditing}
            onPress={this.editButtonPressed}
          />
          <Button
            title={'Save'}
            disabled={!this.state.isEditing}
            onPress={this.saveButtonPressed}
          />
          <Button title={'Delete'} onPress={this.deleteButtonPressed} />
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
    backgroundColor: Colors.transparent,
  },
  titleBox: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    width: '90%',
    borderColor: Colors.noteTextPanelBorder,
    fontWeight: 'bold',
  },
  noteMessageBox: {
    borderWidth: 0.2,
    margin: 10,
    width: '90%',
    height: '85%',
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
  },
});

AppRegistry.registerComponent(
  'NoteWidgetDetailsPanel',
  () => NoteWidgetDetailsPanel,
);

export default NoteWidgetDetailsPanel;
