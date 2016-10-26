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
      movies: []
    }
  }

  componentDidMount() {
    getMoviesFromApi().then(movies => {
      this.setState({
        loading: false,
        movies: movies
      })
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
        {this.state.movies.map(movie =>
          <Text key={movie.title} style={styles.instructions}>
            {movie.title}
          </Text>
        )}
      </View>
    );
  }
}

async function getMoviesFromApi() {
  try {
    // https://osallistujat.com/api-1.0/getUser.php?loginData[username]=pneuvo&loginData[password]=sha1hashed
    let response = await fetch('https://facebook.github.io/react-native/movies.json');
    let responseJson = await response.json();
    return responseJson.movies;
  } catch(error) {
    console.error(error);
  }
}

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
