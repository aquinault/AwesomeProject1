/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;


var Component1 = React.createClass({
  getInitialState() {
    return {
      trueSwitchIsOn: true,
      falseSwitchIsOn: false,
    };
  },  
  render: function() {
    return (
      <Text>Component1</Text>
    );
  }
});

module.exports = Component1;
//AppRegistry.registerComponent('Component1', () => Component1);
