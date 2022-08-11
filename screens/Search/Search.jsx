import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import List from '../../components/SearchList/SearchList';
import SearchBar from '../../components/SearchBar/SearchBar';

const Search = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();

  // get data from the fake api endpoint
  useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        'https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages'
      );
      const data = await apiResponse.json();
      setFakeData(data);
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      {!clicked && <Text style={styles.title}>Programming Languages</Text>}
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {!fakeData ? (
        <ActivityIndicator size='large' />
      ) : (
        <List
          searchPhrase={searchPhrase}
          data={fakeData}
          setClicked={setClicked}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    width: '100%',
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: '10%',
  },
});
