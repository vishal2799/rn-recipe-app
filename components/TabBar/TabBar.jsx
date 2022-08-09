import { View, Text, TouchableOpacity, Animated } from 'react-native';
import React from 'react';
import theme from '../../styles/theme.style';

const TabBar = ({ state, descriptors, navigation, position }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'transparent',
        height: 58,
        paddingHorizontal: 20,
        paddingVertical: 12,
        justifyContent: 'space-between',
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              backgroundColor: isFocused
                ? theme.PRIMARY50_COLOR
                : 'transparent',
              paddingVertical: 8,
              paddingHorizontal: 12,
              minWidth: 120,
              textAlign: 'center',
              borderRadius: 10,
            }}
          >
            <Animated.Text
              style={[
                {
                  //opacity,
                  fontFamily: theme.FONT_BOLD,
                  fontSize: theme.FONT_SIZE_SMALL,
                  color: isFocused
                    ? theme.NEUTRAL0_COLOR
                    : theme.PRIMARY50_COLOR,
                  textAlign: 'center',
                },
              ]}
            >
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
