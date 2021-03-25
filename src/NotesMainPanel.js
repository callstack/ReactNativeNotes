/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  AppRegistry,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import NoteWidget from './Widgets/NoteWidget';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const noteWidgetWidth = 400;


class NotesMainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [{key: "1"}, {key: "2"}, {key: "3"}, {key: "4"}, {key: "5"}, {key: "6"}, {key: "7"}, {key: "8"}, {key: "9"}],
      dimensions: {window, screen},
      columns: 1,
    }
  };

  onChange = ({ window, screen }) => {
    this.setState({ dimensions: { window, screen }, columns: Math.floor(window.width / noteWidgetWidth) });
  };

  componentDidMount() {
    Dimensions.addEventListener("change", this.onChange);
  };

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.onChange);
  };

  renderNote = notes => {
    return <NoteWidget width={noteWidgetWidth} ID={notes.item.key}/>
  };

  render() {
    return(
      <View style={styles.mainContainer}>
        <FlatList numColumns={this.state.columns} key={this.state.columns} data={this.state.notes} renderItem={this.renderNote}/>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 20,
    backgroundColor: "transparent",
  },
});


AppRegistry.registerComponent("NotesMainPanel", () => NotesMainPanel);

export default NotesMainPanel;
