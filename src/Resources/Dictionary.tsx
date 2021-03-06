import React from 'react';
import {NativeModules, Text, NativeEventEmitter} from 'react-native';
import en from './Localization/en.json';
import pl from './Localization/pl.json';

export interface Props {
  textLabel: string;
  style: {};
}

export const languages = [en, pl];
export var languageNum: number;

const LanguageNotificationModuleEventEmitter = new NativeEventEmitter(
  NativeModules.Database,
);

export function getTextByKey(textLabel: string): string {
  let index = 0;
  if (languageNum < languages.length) index = languageNum;
  let dictionary = new Map(Object.entries(languages[index]));
  return dictionary.get(textLabel) || '';
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

  componentDidMount() {
    LanguageNotificationModuleEventEmitter.addListener(
      'LanguageChanged',
      (result) => {
        this.setState({languageValue: result});
        languageNum = result;
      },
    );
  }

  getText = () => {
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
