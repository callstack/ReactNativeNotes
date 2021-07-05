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

interface IProps {}

interface IState {
  title: string;
  message: string;
}

class CreateNotePanel extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      title: '',
      message: '',
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
      <View style={styles.mainPanel}>
        <TextInput
          style={styles.titleBox}
          onChangeText={this.titleOnChange}
          value={this.state.title}
          autoFocus={true}
          clearButtonMode={'while-editing'}
          placeholder={'Title'}
        />

        <TextInput
          style={styles.noteMessageBox}
          multiline={true}
          onChangeText={this.messageOnChange}
          value={this.state.message}
          placeholder={'Note content'}
        />

        <View style={styles.actionsPanel}>
          <Button title={'Discard'} onPress={this.cancelButtonPressed} />
          <Button title={'Create!'} onPress={this.createButtonPressed} />
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

AppRegistry.registerComponent('CreateNotePanel', () => CreateNotePanel);

export default CreateNotePanel;
