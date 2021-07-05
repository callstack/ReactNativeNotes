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

const noteWidgetWidth = 300;

interface IProps {}

interface INote {
  key: number;
  title: string;
  shortMessage: string;
}

interface IState {
  notes: Array<INote>;
  columns: number;
}

class NotesMainPanel extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      notes: [],
      columns: this.calculateColumnWidth(),
    };
  }

  calculateColumnWidth = () => {
    return Math.floor(Dimensions.get('window').width / noteWidgetWidth);
  };

  onChange = () => {
    this.setState({
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

  createNotesKeys = async <T extends Array<INote>>(notesIDs: T) => {
    this.setState({notes: notesIDs});
  };

  getDataFromDatabase = async () => {
    await NativeModules.Database.getAllNotesIDs()
      .then(<T extends Array<INote>>(result: T) => this.createNotesKeys(result))
      .catch(<T extends unknown>(error: T) =>
        Alert.alert('ERROR!', `Result: ${error}`),
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
        <FlatList<INote>
          key={this.state.columns}
          numColumns={this.state.columns}
          data={this.state.notes}
          renderItem={({item}) => (
            <NoteWidget
              width={noteWidgetWidth}
              ID={item.key}
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
