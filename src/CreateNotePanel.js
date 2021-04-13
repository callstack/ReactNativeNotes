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
  Dimensions,
  ScrollView,
  Button,
} from 'react-native';


const window = Dimensions.get("window");


class CreateNotePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      title: "",
      message: "",
      windowHeight: window.height
    }
  };

  componentDidMount() {
    Dimensions.addEventListener("change", this.windowDimensionOnChange);
  };

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.windowDimensionOnChange);
  };

  windowDimensionOnChange = ({window, screen}) => {
    this.setState({windowWidth: window.width, windowHeight: window.height});
  };

  calculateTitleFormWidth = () => {
    return Dimensions.get("window").width - 100;
  };

  calculateMessageFormWidth = () => {
    return Dimensions.get("window").width - 100;
  };

  titleOnChange = (text) => {
    this.setState({title: text});
  };

  messageOnChange = (text) => {
    this.setState({message: text});
  }

  calculateMessagePanelHeight = () => {
    return this.state.windowHeight - styles.titlePanel.height - 100;
  };

  cancelButtonPressed = () => {
    NativeModules.NoteWidgetClickHandler.goToNotesScreen();
  };

  createButtonPressed = () => {
    NativeModules.Database.writeNote(this.state.title, false, this.state.message);
    NativeModules.NoteWidgetClickHandler.goToNotesScreen();
  }


  render() {
    return (
      <View style={styles.mainPanel}>

          <TextInput style={[styles.titleBox, {width: this.calculateTitleFormWidth()}]}
            onChangeText={this.titleOnChange}
            value={this.state.title}
            autoFocus={true}
            clearButtonMode={"while-editing"}
            clearTextOnFocus={true}
            placeholder={"Title"}/>

          <TextInput style={[styles.noteMessageBox, { height: this.calculateMessagePanelHeight(), width: this.calculateMessageFormWidth()}]}
            multiline={true}
            onChangeText={this.messageOnChange}
            value={this.state.message}
            placeholder={"Note content"}
          />

        <View style={styles.actionsPanel}>
          <Button title={"Cancel!"} onPress={this.cancelButtonPressed}></Button>
          <Button title={"Create!"} onPress={this.createButtonPressed}></Button>
        </View>

      </View>
    );
  }
};


const styles = StyleSheet.create({
  mainPanel: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    margin: 30
  },
  titlePanel: {
    height: 60,
  },
  titleBox: {
    height: 35,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderColor: "#D0D0D0",
    color: "blue"
  },
  noteMessageBox: {
    borderWidth: 0.2,
    margin: 10,
    borderColor: "#D0D0D0",
    alignContent: "center",
    textAlignVertical: "center",
  },
  actionsPanel: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    width: 500,
    height: 40,
  }
});


AppRegistry.registerComponent("CreateNotePanel", () => CreateNotePanel);

export default CreateNotePanel;
