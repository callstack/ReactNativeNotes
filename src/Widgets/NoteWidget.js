/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  NativeModules,
} from 'react-native';


export default function NoteWidget(props){
  const {width, ID, title, shortMessage} = props;

  const enterNote = () => {
    NativeModules.NoteWidgetClickHandler.openWidget(ID);
  };

  return(
    <TouchableHighlight onPress={enterNote} style={[styles.noteWidget, {width: width}]} underlayColor={'transparent'}>
      <View style={styles.noteContent}>

        <View style={styles.noteTitle}>
          <Text style={styles.noteTitleText}>
            {title}
          </Text>
        </View>

        <View style={styles.message}>
          <Text style={styles.messageText}>
            {shortMessage}
          </Text>
        </View>

      </View>
    </TouchableHighlight>
  );
};



const styles = StyleSheet.create({
  noteWidget: {
    borderColor: "rgba(170,170,170,0.1)",
    borderWidth: 5,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    opacity: 1,
    height: 160,
  },
  noteContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    margin: 10
  },
  noteTitle: {
    margin: 10
  },
  noteTitleText: {
    color: "#6c47ff",
    fontFamily: "Georgia",
    fontSize: 12,
    fontWeight: "100",
  },
  message: {
    margin: 10,
  },
  messageText: {
    fontSize: 12
  }
});


AppRegistry.registerComponent("NoteWidget", () => NoteWidget);

