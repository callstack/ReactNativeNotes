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
} from 'react-native';


export default function NoteWidget(props){
  const {width, ID} = props;

  const [title, setTitle] = useState("");
  const [shortMessage, setShortMessage] = useState("");
  const isMounted = useRef(null);

  useEffect(() => {
    isMounted.current = true;
    getNoteTitle();
    getNoteShortMessage();
    return () => {
      isMounted.current = false;
    }
  }, []);

  const enterNote = () => {
    NativeModules.NoteWidgetClickHandler.openWidget(ID);
  };

  const getNoteTitle = () => {
    NativeModules.Database.getNoteTitle(ID)
      .then(result => {isMounted && setTitle(result)})
      .catch(error => Alert.alert("ERROR!", `${error}`));
  };

  const getNoteShortMessage = () => {
    NativeModules.Database.getNoteShortPost(ID)
      .then(result => {isMounted && setShortMessage(result)})
      .catch(error => Alert.alert("ERROR!", `${error}`));
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

