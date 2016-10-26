/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class osallistun extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      sessionId: '',
      data: { status: 0 }
    }
  }

  componentDidMount() {
    checkSessionStatus(this.state.sessionId).then(data => {
      if (data) {
        this.setState({
          loading: false,
          data: data
        })
      } else {
        this.setState({
          loading: false,
          data: {status: 0}
        })
      }

    })
  }

  render() {
    const loadingElement = <Text style={styles.instructions}>Loading</Text>
    let loading = this.state.loading ? loadingElement : null
    return (
      <View style={styles.container}>
        {loading}
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          {this.state.data.status}
        </Text>
      </View>
    );
  }
}

async function checkSessionStatus(sessionId) {
  try {
    let userUrlWithId = userUrl.replace('SESSIONID', sessionId)
    let data = await fetchDataFromApi(userUrlWithId)
    return data
  } catch(error) {
    console.error(error)
  }
}

async function fetchDataFromApi(url) {
  try {
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch(error) {
    console.error(error);
  }
}

const baseUrl = 'https://osallistujat.com/api-1.0/',
      userBaseUrl = 'getUser.php',
      eventsBaseUrl = 'getEvents.php',
      loginUrl = '?loginData[username]=USERNAME&loginData[password]=PASSWORDSH1',
      sessionUrl = '?loginData[sessionId]=SESSIONID',
      userLoginUrl = baseUrl + userBaseUrl + loginUrl,
      userUrl = baseUrl + userBaseUrl + sessionUrl,
      eventsUrl = baseUrl + eventsBaseUrl + sessionUrl;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('osallistun', () => osallistun);
