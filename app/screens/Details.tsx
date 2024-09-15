import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { DetailsProps } from "../navigation/RootStack";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { sharedElementTransition } from "../../utils/sharedElementTransition";

const Details = ({ route }: DetailsProps) => {
  const { item } = route.params;
  return (
    <ScrollView>
      <Animated.Image
        source={{ uri: item.image }}
        style={{ width: "100%", height: 300 }}
        sharedTransitionTag={`image-${item.id}`}
        sharedTransitionStyle={sharedElementTransition}
      />

      <Animated.Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          padding: 16,
        }}
        entering={FadeInLeft.duration(500).delay(400)}
      >
        {item.title}
      </Animated.Text>
      <Animated.Text
        style={{
          padding: 16,
          fontSize: 16,
        }}
        entering={FadeInLeft.duration(500).delay(600)}
      >
        {item.description}
      </Animated.Text>
    </ScrollView>
  );
};

export default Details;
