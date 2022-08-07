import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import React, { Component, useState } from 'react';
import avatarImage from '../../assets/images/Avatar.png';

const listTab = [
  {
    status: 'All',
  },
  {
    status: 'Purple',
  },
  {
    status: 'Green',
  },
  {
    status: 'Green2',
  },
  {
    status: 'Green3',
  },
];

const data = [
  {
    name: 'Ronaldo',
    status: 'Green',
  },
  {
    name: 'Kaka',
    status: 'Green',
  },
  {
    name: 'Messi',
    status: 'Purple',
  },
  {
    name: 'Mbappe',
    status: 'Green',
  },
  {
    name: 'Luke',
    status: 'Purple',
  },
];

export const Home3 = () => {
  const [status, setStatus] = useState('All');
  const [dataList, setDataList] = useState(data);
  const setStatusFilter = (status) => {
    if (status !== 'All') {
      setDataList([...data.filter((e) => e.status === status)]);
    } else {
      setDataList(data);
    }
    setStatus(status);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.itemContainer}>
        <View style={styles.itemLogo}>
          <Image style={styles.itemImage} source={avatarImage} />
        </View>

        <View style={styles.itemBody}>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>

        <View style={styles.itemStatus}>
          <Text style={styles.itemName}>{item.status}</Text>
        </View>
      </View>
    );
  };

  const separator = () => {
    return <View style={{ height: 1, backgroundColor: '#f1f1f1' }} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.listTab} horizontal={true}>
        {listTab.map((e) => (
          <TouchableOpacity
            style={[styles.btnTab, status === e.status && styles.btnTabActive]}
            onPress={() => setStatusFilter(e.status)}
          >
            <Text
              style={[
                styles.textTab,
                status === e.status && styles.textTabActive,
              ]}
            >
              {e.status}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={dataList}
        keyExtractor={(e, i) => i.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={separator}
      />
    </SafeAreaView>
  );
};

export default Home3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginTop: 30,
  },
  listTab: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
  },
  btnTab: {
    width: Dimensions.get('window').width / 3.5,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'blue',
    padding: 10,
    justifyContent: 'center',
  },
  textTab: {
    fontSize: 14,
  },
  btnTabActive: {
    backgroundColor: 'yellow',
  },
  textTabActive: {
    color: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  itemLogo: {
    padding: 15,
  },
  itemImage: {
    width: 50,
    height: 50,
  },
  itemBody: {
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemStatus: {
    backgroundColor: 'pink',
    paddingHorizontal: 6,
    justifyContent: 'center',
    right: 12,
  },
});
