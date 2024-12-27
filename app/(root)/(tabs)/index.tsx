import { Link } from "expo-router";
import { Text, View } from "react-native";


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-bold my-10 font-rubik text-3xl">Welcome to Real Estate</Text>
      <Link href="/explore">Explore</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/sign-in">SignIn</Link>
      <Link href="/properties/1">property</Link>
    </View>
  );
}
