/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import NotesMainPanel from './src/NotesMainPanel';
import LeftOptionsPanel from './src/LeftOptionsPanel';
import UserAccountPanel from './src/UserAccountPanel';


class App extends React.Component {

  render() {
    return (
      <>
        <UserAccountPanel />
        <View style={styles.mainLayout}>
          <LeftOptionsPanel/>
          <NotesMainPanel/>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    flexDirection: "row",
  },
});

export default App;
