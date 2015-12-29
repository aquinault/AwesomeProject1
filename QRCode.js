/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var {
  Text,
  StyleSheet
} = React;

var QRCode = React.createClass({
  getInitialState() {
    return {};
  },  
  render: function() {
    return (
      <Text style={styles.style1}>QRCode</Text>
    );
  }
});

var styles = StyleSheet.create({
  style1: {
    //paddingTop: 40,
    marginTop: 40,
    //paddingBottom: 20,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = QRCode;
