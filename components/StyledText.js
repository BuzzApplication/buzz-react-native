import React from 'react';
import { Text } from 'react-native';

export class OpenSansText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'open-sans' }]} />;
  }
}

export class OpenSansLightText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'open-sans-light' }]} />;
  }
}

export class OpenSansItalicText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'open-sans-italic' }]} />;
  }
}

export class OpenSansLightItalicText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'open-sans-light-italic' }]} />;
  }
}

export class OpenSansBoldText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'open-sans-bold' }]} />;
  }
}

export class OpenSansExtraBoldText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'open-sans-extra-bold' }]} />;
  }
}
