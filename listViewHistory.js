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

var NoteStore = require('./stores/NoteStore');
var NoteActions = require('./actions/NoteActions');

var ListViewHistory = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      selectedTab: 'redTab',
      notifCount: 0,
      presses: 0,
      notes: NoteStore.getNotes()
    };
  },
    onChange: function(notes) {
    this.setState({
      notes: notes,
      dataSource: this.state.dataSource.cloneWithRows(this.state.notes)
    });
  },
  componentDidMount: function() {
    this.unsubscribe = NoteStore.listen(this.onChange);
    this.fetchData();
  },
  componentWillUnmount: function() {
    this.unsubscribe();
  },
  fetchData: function() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.notes),
      loaded: true
    });
  },/*
  addData: function(data) {
    var responseData2 = this.state.responseData;
    responseData2.push(data);

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(responseData2),
      loaded: true,
      responseData: responseData2
    });
  },*/
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderAnnonces}
        style={styles.listView}
      />            
    );
  },
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading history...
        </Text>
      </View>
    );
  },

  renderAnnonces: function(annonce) {
    return (
      <View style={styles.container}>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{annonce.text}</Text>
        </View>
      </View>
    );
  },
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  listView: {
    backgroundColor: '#F5FCFF',
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

module.exports = ListViewHistory;

