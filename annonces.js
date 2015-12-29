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

var REQUEST_URL = 'http://192.168.99.100:8080/annonces/';



var ss = require('NativeModules').SomeString;

ss.get(someString => {
    console.log(someString);
});






var myMessage = 'empty';



var Annonces = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      selectedTab: 'redTab',
      notifCount: 0,
      presses: 0,

    };
  },
  componentDidMount: function() {
    this.fetchData();

  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  },
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
          Loading annonces...
        </Text>
      </View>
    );
  },

  renderAnnonces: function(annonce) {
    var imageURL = 'http://192.168.99.100:8080/pictures/' + annonce._source.picture;
    return (
      <View style={styles.container}>
        <Image
          source={{uri: imageURL}}
          //source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{annonce._source.name}</Text>
          <Text style={styles.year}>{annonce._source.created_at}</Text>
          <Text style={styles.year}>{myMessage}</Text>

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
    //paddingTop: 40,
    //paddingBottom: 20,
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

module.exports = Annonces;
//AppRegistry.registerComponent('AwesomeProject1', () => AwesomeProject1);

