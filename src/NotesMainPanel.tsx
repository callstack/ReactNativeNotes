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
import Dictionary from './Resources/Dictionary';

const noteWidgetWidth = 300;

function calculateColumnWidth() {
  return Math.floor(Dimensions.get('window').width / noteWidgetWidth);
}

interface Props {}

interface INote {
  key: number;
  title: string;
  shortMessage: string;
}

interface State {
  notes: Array<INote>;
  columns: number;
}

class NotesMainPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      notes: [],
      columns: calculateColumnWidth(),
    };
  }

  onChange = () => {
    this.setState({
      columns: calculateColumnWidth(),
    });
  };

  componentDidMount() {
    this.getDataFromDatabase();
    Dimensions.addEventListener('change', this.onChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onChange);
  }

  createNotesKeys = async (notesIDs: Array<INote>) => {
    this.setState({notes: notesIDs});
  };

  getDataFromDatabase = async () => {
    await NativeModules.Database.getAllNotesIDs()
      .then((result: Array<INote>) => this.createNotesKeys(result))
      .catch((error: Error) =>
        Alert.alert('ERROR!', `Result: ${error.message}`),
      );
  };

  renderWelcomePage = () => {
    return (
      <View style={styles.welcomePage}>
        <Text style={styles.logoText}>ReactNativeNotes</Text>
        <Dictionary
          textLabel={'mainAppScreen.introductionTextUpper'}
          style={styles.introductionText}
        />
        <Text style={styles.plusIcon}>+</Text>
        <Dictionary
          textLabel={'mainAppScreen.introductionTextLower'}
          style={styles.introductionText}
        />
      </View>
    );
  };

  renderNotesPage = () => {
    return (
      <View style={styles.mainContainer}>
        <FlatList<INote>
          key={this.state.columns}
          numColumns={this.state.columns}
          data={this.state.notes}
          renderItem={({item}) => (
            <NoteWidget
              width={noteWidgetWidth}
              id={item.key}
              title={item.title}
              shortMessage={item.shortMessage}
            />
          )}
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
