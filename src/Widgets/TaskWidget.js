/**
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import Colors from '../Resources/Colors';

export default function TaskWidget(props) {
  const {message, dueDate} = props;

  const [isDone, setIsDone] = useState(false);

  return (
    <View style={styles.taskWidget}>
      <Text style={styles.messageText}>{message}</Text>

      <View style={styles.details}>
        <Text style={styles.dateText}>
          Due date: {String(dueDate).substr(0, 15)}
        </Text>
        <CheckBox
          disabled={false}
          value={isDone}
          onValueChange={(newValue) => setIsDone(newValue)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskWidget: {
    borderColor: Colors.noteWidgetBorder,
    borderWidth: 5,
    margin: 10,
    marginHorizontal: 100,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.noteWidgetBackground,
    borderRadius: 5,
    opacity: 1,
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  messageText: {
    margin: 10,
    alignSelf: 'center',
    fontSize: 18,
  },
  dateText: {
    fontSize: 10,
  },
});

AppRegistry.registerComponent('TaskWidget', () => TaskWidget);
