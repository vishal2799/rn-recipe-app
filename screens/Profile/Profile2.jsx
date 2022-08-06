import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
const HEADER_HEIGHT = 250;
const DATA = [0, 1, 2, 3, 4];
const identity = (v) => v + '';
const Header = () => {
  return React.createElement(View, { style: styles.header });
};
const Example = () => {
  const renderItem = React.useCallback(({ index }) => {
    return React.createElement(View, {
      style: [styles.box, index % 2 === 0 ? styles.boxB : styles.boxA],
    });
  }, []);
  return React.createElement(
    Tabs.Container,
    { renderHeader: Header, headerHeight: HEADER_HEIGHT },
    React.createElement(
      Tabs.Tab,
      { name: 'A' },
      React.createElement(Tabs.FlatList, {
        data: DATA,
        renderItem: renderItem,
        keyExtractor: identity,
      })
    ),
    React.createElement(
      Tabs.Tab,
      { name: 'B' },
      React.createElement(
        Tabs.ScrollView,
        null,
        React.createElement(View, { style: [styles.box, styles.boxA] }),
        React.createElement(View, { style: [styles.box, styles.boxB] })
      )
    )
  );
};
const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#2196f3',
  },
});
export default Example;
