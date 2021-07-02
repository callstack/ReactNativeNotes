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
  Text,
  View,
} from 'react-native';
import NoteWidget from './Widgets/NoteWidget';
import Colors from './Resources/Colors';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const noteWidgetWidth = 300;

class NotesMainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      dimensions: {window, screen},
      columns: this.calculateColumnWidth(window),
      isMounted: false,
    };
  }

  calculateColumnWidth = () => {
    return Math.floor(Dimensions.get('window').width / noteWidgetWidth);
  };

  onChange = ({window, screen}) => {
    this.setState({
      dimensions: {window, screen},
      columns: this.calculateColumnWidth(),
    });
  };

  componentDidMount() {
    this.getDataFromDatabase();
    Dimensions.addEventListener('change', this.onChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onChange);
  }

  createNotesKeys = async (notesIDs) => {
    this.setState({notes: notesIDs});
  };

  getDataFromDatabase = async () => {
    await NativeModules.Database.getAllNotesIDs()
      .then((result) => this.createNotesKeys(result))
      .catch((error) => Alert.alert('ERROR!', `Result: ${error}`));
  };

  renderNote = (notes) => {
    return (
      <NoteWidget
        width={noteWidgetWidth}
        ID={notes.item.key}
        title={notes.item.title}
        shortMessage={notes.item.shortMessage}
      />
    );
  };

  renderWelcomePage = () => {
    return (
      <View style={styles.welcomePage}>
        <Text style={styles.logoText}>ReactNativeNotes</Text>
        <Text style={styles.introductionText}>
          Create your first note by clicking
        </Text>
        <Text style={styles.plusIcon}>+</Text>
        <Text style={styles.introductionText}>on the navigation panel</Text>
      </View>
    );
  };

  renderNotesPage = () => {
    return (
      <View style={styles.mainContainer}>
        <FlatList
          key={this.state.columns}
          numColumns={this.state.columns}
          data={this.state.notes}
          renderItem={this.renderNote}
        />
      </View>
    );
  };

  render() {
    if (this.state.notes.length > 0) {
      return this.renderNotesPage();
    } else {
      return this.renderWelcomePage();
    }
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 25,
    flexDirection: 'column',
    backgroundColor: Colors.transparent,
    justifyContent: 'space-around',
  },
  welcomePage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 35,
    margin: 25,
    color: Colors.logoText,
  },
  plusIcon: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.plusIcon,
  },
  introductionText: {
    fontSize: 18,
    margin: 0,
    fontFamily: 'Calibri',
    color: Colors.introductionText,
  },
});

AppRegistry.registerComponent('NotesMainPanel', () => NotesMainPanel);

export default NotesMainPanel;
