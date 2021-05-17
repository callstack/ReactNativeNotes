/**
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useRef} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  NativeModules,
  Alert,
  TextInput,
  Button,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

export default function TaskWidget(props){
  const {width, ID, message, dueDate} = props;

  const [isDone, setIsDone] = useState(false);

  return(
    <View style={styles.taskWidget}>
      <Text style={styles.messageText}>{message}</Text>
      <View style={styles.details}>
        <Text style={[styles.dateText, {backgroundColor: isDone ? "green" : "transparent"}]}>Due date: {String(dueDate).substr(0,15)}</Text>
        <CheckBox disabled={false} value={isDone} onValueChange={(newValue) => setIsDone(newValue)}/>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  taskWidget: {
    borderColor: "rgba(170,170,170,0.1)",
    borderWidth: 5,
    margin: 10,
    marginHorizontal: 100,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    borderRadius: 5,
    opacity: 1,
  },
  details: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  messageText: {
    margin: 10,
    alignSelf: "center",
    fontSize: 18
  },
  dateText: {
    fontSize: 10,
  }
});


AppRegistry.registerComponent("TaskWidget", () => TaskWidget);
