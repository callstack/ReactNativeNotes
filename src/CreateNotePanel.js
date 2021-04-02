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
  Text,
  TextInput,
  View,
  Dimensions,
  Button,
  ScrollView,
} from 'react-native';


const window = Dimensions.get("window");


class CreateNotePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      title: "",
      message: "",
      windowWidth: window.width - 100,
      windowHeight: window.height - 150
    }
  };

  getID = () => {
    this.setState({id: NativeModules.Database.getNoteTitle(
      function(result)
      {
        Alert.alert('test', `${result}`);
      }
    )});
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

  titleOnChange = (text) => {
    this.setState({title: text});
  };

  messageOnChange = (text) => {
    this.setState({message: text});
  }

  calculateMessagePanelHeight = () => {
    return this.state.windowHeight - (styles.titlePanel.height + styles.actionsPanel.height);
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
      <ScrollView>
        <View style={styles.mainPanel}>

          <View style={styles.titlePanel}>
            <Text>Title:</Text>
            <TextInput style={[styles.titleBox, {width: this.state.windowWidth - 100}]} onChangeText={this.titleOnChange} value={this.state.title}/>
          </View>

          <View style={styles.divider}>
          </View>

          <View style={styles.noteMessagePanel}>
            <Text>Post your note message here:</Text>
            <TextInput style={[styles.noteMessageBox, { height: this.calculateMessagePanelHeight(), width: this.state.windowWidth - 200}]}
              multiline={true}
              onChangeText={this.messageOnChange}
              value={this.state.message}
            />
          </View>

          <View style={styles.actionsPanel}>
            <Button title={"Cancel!"} onPress={this.cancelButtonPressed}></Button>
            <Button title={"Create!"} onPress={this.createButtonPressed}></Button>
          </View>

        </View>
      </ScrollView>
    );
  }
};


const styles = StyleSheet.create({
  mainPanel: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  titlePanel: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    height: 60,
  },
  titleBox: {
    height: 35,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    alignContent: "center",
    textAlignVertical: "center",
    borderColor: "#D0D0D0"
  },
  divider: {
    borderColor: "black",
    borderWidth: 0.5,
    height: 1,
    alignSelf: "stretch",
  },
  noteMessagePanel: {
    margin: 50,
  },
  noteMessageBox: {
    borderWidth: 0.2,
    borderColor: "#D0D0D0",
    alignContent: "center",
    textAlignVertical: "center",
  },
  actionsPanel: {
    flex: 1,
    flexDirection: "row",
    height: 60,
  }
});


AppRegistry.registerComponent("CreateNotePanel", () => CreateNotePanel);

export default CreateNotePanel;
