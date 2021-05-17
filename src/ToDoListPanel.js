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
import TaskWidget from './Widgets/TaskWidget';
import DateTimePicker from '@react-native-community/datetimepicker';


class ToDoListPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      number: 0,
      message: "",
      selectedDate: new Date(0)
    }
  };

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    this.setState({selectedDate: currentDate});
  };

  messageOnChange = (text) => {
    this.setState({message: text});
  };

  addButtonPressed = () => {
    this.setState(previous => ({number: previous.number + 1}));
    this.createTask();
  };

  createTask = () => {
    const newTaskMessage = this.state.message;
    const newTaskDate = this.state.selectedDate;
    const newTaskID = this.state.number;
    this.setState({tasks: [...this.state.tasks, {'key':newTaskID, 'message':newTaskMessage, 'dueDate':newTaskDate}]});
  };

  renderTask = tasks => {
    return(
      <TaskWidget ID={tasks.item.key} message={tasks.item.message} dueDate={tasks.item.dueDate}/>
    );
  };

  render() {
    return(
      <View style={styles.mainPanel}>

        <View style={styles.flatListPanel}>
          <FlatList numColumns={1} data={this.state.tasks} renderItem={this.renderTask}/>
        </View>

        <View style={styles.newTaskPanel}>
          <TextInput style={styles.noteMessageBox} onChangeText={this.messageOnChange} value={this.state.message} placeholder={String(this.state.number)} />
          <View style={styles.createButtons}>
            <Button title={"Add"} onPress={this.addButtonPressed}/>
            <DateTimePicker value={this.state.selectedDate} is24Hour={true} display="default" onChange={this.onChange} />
          </View>
        </View>

      </View>
    );
  }
};


const styles = StyleSheet.create({
  mainPanel: {
    flex: 1,
    flexDirection: "column"
  },
  flatListPanel: {
    height: "80%",
    margin: 30,
  },
  newTaskPanel: {
    flex: 1,
    flexDirection: "column",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "white",
    maxHeight: 100,
  },
  noteMessageBox: {
    borderWidth: 0.2,
    margin: 10,
    borderColor: "#D0D0D0",
    alignContent: "center",
    textAlignVertical: "center",
  },
  createButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});


AppRegistry.registerComponent("ToDoListPanel", () => ToDoListPanel);

export default ToDoListPanel;
