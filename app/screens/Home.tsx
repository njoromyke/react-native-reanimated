import React, { useEffect, useState } from "react";
import { Button, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { HomeProps } from "../navigation/RootStack";
import { sharedElementTransition } from "../../utils/sharedElementTransition";
import { Ionicons } from "@expo/vector-icons";

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const Home = ({ navigation }: HomeProps) => {
  const width = useSharedValue(150);
  const height = useSharedValue(150);
  const backgroundColor = useSharedValue("teal");
  const [data, setData] = useState([]);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const fetchData = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    setData(data);
  };

  const startAnimation = () => {
    const randomWidth = Math.random() * 3000 + 100;
    const randomHeight = Math.random() * 300 + 100;
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    width.value = withSpring(randomWidth);
    height.value = withSpring(randomHeight);
    backgroundColor.value = withTiming(randomColor, { duration: 2000 });
  };

  const animatedInputStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
    };
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      backgroundColor: backgroundColor.value,
    };
  });

  const scrollHandler = useScrollViewOffset(scrollRef);

  const buttonStyles = useAnimatedStyle(() => {
    return {
      opacity: scrollHandler.value < 100 ? withSpring(0) : withSpring(1),
    };
  });

  const scrollTop = () => {
    scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Animated.ScrollView ref={scrollRef}>
        <Button title="Animation" onPress={startAnimation} />
        <AnimatedInput
          style={[
            animatedInputStyles,
            {
              height: 40,
              margin: 12,
            },
          ]}
        />
        <Animated.View style={animatedStyles}></Animated.View>

        {data?.map((item: any, index) => (
          <View
            key={index}
            style={{
              padding: 10,
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Details", { item })}>
              <Animated.Image
                source={{ uri: item.image }}
                style={{ width: 100, height: 100 }}
                sharedTransitionTag={`image-${item.id}`}
                sharedTransitionStyle={sharedElementTransition}
              />
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.ScrollView>
      <Animated.View style={[buttonStyles, { position: "absolute", bottom: 20, right: 20 }]}>
        <TouchableOpacity
          onPress={scrollTop}
          style={{
            padding: 6,
            backgroundColor: "blue",
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="add-circle" size={30} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default Home;
