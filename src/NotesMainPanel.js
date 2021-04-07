/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Alert,
  AppRegistry,
  Dimensions,
  FlatList,
  NativeModules,
  StyleSheet,
  View,
} from 'react-native';
import NoteWidget from './Widgets/NoteWidget';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const noteWidgetWidth = 300;


class NotesMainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      dimensions: {window, screen},
      columns: this.calculateColumnWidth(window),
      isMounted: false,
    }
  };

  calculateColumnWidth = (window) => {
    return Math.floor(Dimensions.get("window").width / noteWidgetWidth);
  };

  onChange = ({ window, screen }) => {
    this.setState({ dimensions: { window, screen }, columns: this.calculateColumnWidth(window) });
  };

  componentDidMount() {
    this.setState({isMounted: true});
    this.getDataFromDatabase();
    Dimensions.addEventListener("change", this.onChange);
  };

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.onChange);
    this.setState({isMounted: false});
  };

  createNotesKeys = (numberOfNotes) => {
    let allNotesKeys = [];
    for(id = 0; id < numberOfNotes; id++) {
      const nextObject = {key: id};
      allNotesKeys.push(nextObject);
    }
    this.state.isMounted && this.setState({notes: allNotesKeys});
  };

  getDataFromDatabase = () => {
    NativeModules.Database.getNumberOfNotes()
      .then(result => this.createNotesKeys(result))
      .catch(error => Alert.alert("ERROR!", `Result: ${error}`));
  };

  renderNote = notes => {
    return <NoteWidget width={noteWidgetWidth} ID={notes.item.key}/>
  };

  render() {
    return(
      <View style={styles.mainContainer}>
        <FlatList key={this.state.columns} numColumns={this.state.columns} data={this.state.notes} renderItem={this.renderNote}/>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 10,
    backgroundColor: "transparent",
  },
});


AppRegistry.registerComponent("NotesMainPanel", () => NotesMainPanel);

export default NotesMainPanel;
