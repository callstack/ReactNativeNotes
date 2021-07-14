import React from 'react';
import {NativeModules, NativeEventEmitter, View} from 'react-native';

interface Props {
  style: any;
}

interface State {
  themeValue: number;
  style: any;
}

const ThemeNotificationModuleEventEmitter = new NativeEventEmitter(
  NativeModules.Database,
);

export function applyTheming(style: any) {
  let theme = 0;
  const getTheme = async () => {
    await NativeModules.Database.getThemeValue()
      .then((result: number) => {
        theme = result;
        return result;
      })
      .catch((error: Error) => {
        console.log(`ERROR: ${error.message}`);
      });
  };

  getTheme();
  switch (theme) {
    case 0:
      return {...style, backgroundColor: 'transparent'};
    case 1:
      return {...style, backgroundColor: '454859', color: 'white'};
  }
}

export class ThemedView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      themeValue: 0,
      style: props.style,
    };
  }

  componentDidMount() {
    ThemeNotificationModuleEventEmitter.addListener(
      'ThemeChanged',
      (result) => {
        this.setState({themeValue: result});
      },
    );
  }

  requireTheming = (style: any) => {
    switch (this.state.themeValue) {
      case 0:
        return {...style, backgroundColor: 'transparent'};
      case 1:
        return {...style, backgroundColor: '#454859'};
    }
  };

  render() {
    return (
      <View style={this.requireTheming(this.state.style)}>
        {this.props.children}
      </View>
    );
  }
}

export default ThemedView;
