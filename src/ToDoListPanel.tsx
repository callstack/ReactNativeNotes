/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TaskWidget from './Widgets/TaskWidget';
import Colors from './Resources/Colors';
import * as dictionary from './Resources/Dictionary';
import * as theming from './Resources/Theming/ThemeHOC';

interface Props {}

interface Task {
  key: number;
  message: string;
  dueDate: Date | undefined;
}

interface State {
  tasks: Array<Task>;
  number: number;
  message: string;
  selectedDate: Date | undefined;
}

class ToDoListPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tasks: [],
      number: 0,
      message: '',
      selectedDate: new Date(),
    };
  }

  onChange = (event: Event, selectedDate?: Date) => {
    const currentDate = selectedDate;
    this.setState({selectedDate: currentDate});
  };

  messageOnChange = (text: string) => {
    this.setState({message: text});
  };

  addButtonPressed = () => {
    this.setState((previous) => ({number: previous.number + 1}));
    this.createTask();
  };

  createTask = () => {
    const newTaskMessage = this.state.message;
    const newTaskDate = this.state.selectedDate;
    const newTaskID = this.state.number;
    this.setState({
      tasks: [
        ...this.state.tasks,
        {key: newTaskID, message: newTaskMessage, dueDate: newTaskDate},
      ],
    });
  };

  render() {
    return (
      <theming.ThemedView style={styles.mainPanel}>
        <View style={styles.flatListPanel}>
          <FlatList
            numColumns={1}
            data={this.state.tasks}
            renderItem={({item}) => (
              <TaskWidget
                id={item.key}
                message={item.message}
                dueDate={item.dueDate}
              />
            )}
          />
        </View>

        <View style={styles.newTaskPanel}>
          <TextInput
            style={styles.noteMessageBox}
            onChangeText={this.messageOnChange}
            value={this.state.message}
            placeholder={dictionary.getTextByKey('tasksScreen.taskPlaceholder')}
          />
          <View style={styles.createButtons}>
            <Button
              title={dictionary.getTextByKey('tasksScreen.addButton')}
              onPress={this.addButtonPressed}
            />
            <DateTimePicker
              value={this.state.selectedDate || new Date()}
              is24Hour={true}
              display="default"
              onChange={this.onChange}
            />
          </View>
        </View>
      </theming.ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  mainPanel: {
    flex: 1,
    flexDirection: 'column',
  },
  flatListPanel: {
    height: '75%',
    margin: 30,
  },
  newTaskPanel: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.noteTextPanelBorder,
    maxHeight: 90,
  },
  noteMessageBox: {
    borderWidth: 0.2,
    margin: 10,
    borderColor: Colors.noteTextPanelBorder,
    alignContent: 'center',
    textAlignVertical: 'center',
  },
  createButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 10,
  },
});

AppRegistry.registerComponent('ToDoListPanel', () => ToDoListPanel);

export default ToDoListPanel;
