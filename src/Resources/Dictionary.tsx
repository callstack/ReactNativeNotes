import React from 'react';
import {Alert, NativeModules, Text} from 'react-native';
import en from './Localization/en.json';
import pl from './Localization/pl.json';

export interface Props {
  textLabel: string;
  style: {};
}

interface State {
  label: string;
  languageValue: number;
}

export class Dictionary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      label: props.textLabel,
      languageValue: 0,
    };
  }

  getText = () => {
    NativeModules.Database.getLanguageValue()
      .then((result: number) => {
        this.setState({languageValue: result});
        return result;
      })
      .catch((error: Error) => {
        Alert.alert(`ERROR: ${error.message}`);
      });

    switch (this.state.languageValue) {
      case 0: {
        let enDictionary = new Map(Object.entries(en));
        return enDictionary.get(this.state.label);
      }
      case 1: {
        let plDictionary = new Map(Object.entries(pl));
        return plDictionary.get(this.state.label);
      }
      default:
        return;
    }
  };

  render() {
    return <Text style={this.props.style}>{this.getText()}</Text>;
  }
}

export default Dictionary;
