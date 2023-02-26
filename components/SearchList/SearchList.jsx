// List.js
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import RecentCard from '../../components/RecentCard/RecentCard';

const windowWidth = Dimensions.get('window').width;

// definition of the Item, which will be rendered in the FlatList
const Item = ({ title, authorName }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.details}>{authorName}</Text>
  </View>
);

// the filter
const List = ({ searchPhrase, setClicked, data }) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (searchPhrase === '') {
      return <RecentCard data={item} />;
    }
    // filter of the name
    if (
      item.title
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return <RecentCard data={item} />;
    }
    // filter of the description
    if (
      item.authorName
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return <RecentCard data={item} />;
    }
  };

  return (
    <SafeAreaView>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '90%',
          marginTop: 20,
        }}
      >
        <FlatList
          data={data}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    height: '85%',
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: 'lightgrey',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    fontStyle: 'italic',
  },
});
