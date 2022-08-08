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
import theme from '../../styles/theme.style';

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
  {
    name: 'Luke1',
    status: 'Purple',
  },
  {
    name: 'Luke2',
    status: 'Purple',
  },
  {
    name: 'Luke3',
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
      <ScrollView>
        <View>
          <ScrollView
            style={styles.listTab}
            horizontal={true}
            nestedScrollEnabled={true}
          >
            {listTab.map((e) => (
              <TouchableOpacity
                style={[
                  styles.btnTab,
                  status === e.status && styles.btnTabActive,
                ]}
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
        </View>

        <FlatList
          style={{ marginBottom: 90 }}
          data={dataList}
          horizontal={true}
          keyExtractor={(e, i) => i.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={separator}
        />
      </ScrollView>
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
    padding: 10,
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 8,
  },
  textTab: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontFamily: theme.FONT_BOLD,
    color: theme.PRIMARY50_COLOR,
  },
  btnTabActive: {
    backgroundColor: theme.PRIMARY50_COLOR,
  },
  textTabActive: {
    color: theme.NEUTRAL0_COLOR,
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
