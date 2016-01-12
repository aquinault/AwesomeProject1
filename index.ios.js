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
  TabBarIOS,
  TouchableOpacity,
  NavigatorIOS
} = React;

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

/**
 * For quota reasons we replaced the Rotten Tomatoes' API with a sample data of
 * their very own API that lives in React Native's Github repo.
 */
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

var Movies = require('./movies');
var Annonces = require('./annonces');

var CustomSwiftComponent = require('./CustomSwiftComponent');
var Component1 = require('./component1');
var ListViewHistory = require('./listViewHistory');

var QRCodeScreen = require('./QRCodeScreen');

var NoteStore = require('./stores/NoteStore');
var NoteActions = require('./actions/NoteActions');

var styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

var AwesomeProject1 = React.createClass({
  getInitialState: function() {
    return {
      loaded: false,
      selectedTab: 'redTab',
      notifCount: 0,
      presses: 0,
      notes: NoteStore.getNotes()
    };
  },
  onChange: function(notes) {
    this.setState({
      notes: notes
    });
  },
  componentDidMount: function() {
    this.unsubscribe = NoteStore.listen(this.onChange);
  },
  componentWillUnmount: function() {
    this.unsubscribe();
  },

  _onSucess: function(result) {
    console.log(result);

    NoteActions.createNote({ _id: Date.now(), text: result });
    //onChange({title: 'title1'});


    this.setState({
      selectedTab: 'redTab',
      notifCount: this.state.notifCount + 1,
      historyData: []
    });

  },
  render: function() {
    return (
        <TabBarIOS
            tintColor="white"
            barTintColor="darkslateblue">

            <TabBarIOS.Item
              title="Annonces"
              icon={{uri: base64Icon, scale: 3}}
              selected={this.state.selectedTab === 'AnnoncesTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'AnnoncesTab',
                });
              }}>
              <Annonces></Annonces>              
            </TabBarIOS.Item>

            <TabBarIOS.Item
              style={styles.tabBar}
              title="Blue Tab"
              icon={{uri: base64Icon, scale: 3}}
              selected={this.state.selectedTab === 'blueTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'blueTab',
                });
              }}>
              <Movies></Movies>              
            </TabBarIOS.Item>

            <TabBarIOS.Item
              systemIcon="history"
              badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
              selected={this.state.selectedTab === 'historyTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'historyTab',
                  notifCount: this.state.notifCount + 1
                });
              }}>
              <ListViewHistory></ListViewHistory>
            </TabBarIOS.Item>

            <TabBarIOS.Item
              systemIcon="favorites"
              badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
              selected={this.state.selectedTab === 'redTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'redTab',
                  notifCount: this.state.notifCount + 1,
                });
              }}>
              <CustomSwiftComponent></CustomSwiftComponent>
            </TabBarIOS.Item>

            <TabBarIOS.Item
              systemIcon="search"
              title="More"
              selected={this.state.selectedTab === 'greenTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'greenTab',
                  presses: this.state.presses + 1,                  
                });
              }}>
              
              <QRCodeScreen onSucess={this._onSucess}>
              </QRCodeScreen>


            </TabBarIOS.Item>
          </TabBarIOS>   
   
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
  tabBar: {
    top: 20
  }
});

AppRegistry.registerComponent('AwesomeProject1', () => AwesomeProject1);

