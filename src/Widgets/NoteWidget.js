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
} from 'react-native';


class NoteWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.width,
      ID: Number(props.ID),
    }
  };

  enterNote = () => {
  };

  render() {
    return(
      <TouchableHighlight onPress={this.enterNote} style={styles.noteWidget} underlayColor={'transparent'}>
        <View style={{width: this.state.width}}>

          <View style={styles.noteHeader}>
            <Text>{this.state.ID}</Text>
            <View style={styles.noteTitle}>
              <Text style={{textAlign: "center"}}>Header</Text>
            </View>
          </View>

          <View style={styles.noteSeparator}></View>

          <View style={styles.noteMainContent}>
            <Text>
              This is the single widget
              {'\n'}With the text written here only for the presentation purpose.
            </Text>
            <Text>This note has the ID: {this.state.ID}</Text>
          </View>

        </View>
      </TouchableHighlight>
    );
  }
};


const styles = StyleSheet.create({
  noteWidget: {
    borderColor: "grey",
    borderWidth: 1,
    margin: 20,
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    shadowOffset: {x: 5, y: 50},
    shadowColor: "black",
    elevation: 10,
    opacity: 0.8
  },
  noteHeader: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
  },
  noteTitle: {
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginHorizontal: 10,
  },
  noteSeparator: {
    borderColor: "black",
    borderWidth: 0.5,
    marginTop: 5,
    marginBottom: 10,
    alignSelf: "stretch"
  },
  noteMainContent: {
    margin: 10
  }
});


AppRegistry.registerComponent("NoteWidget", () => NoteWidget);

export default NoteWidget;
