import { StyleSheet, Text, View } from "react-native";

// To use a real photo:
//   1. Add your photo to assets/images/profile.jpg (or .png)
//   2. Replace the `avatar` block below with:
//      <Image source={require("../../../assets/images/profile.jpg")} style={styles.photo} />
//   3. Remove the `avatarPlaceholder` and `initials` styles

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.initials}>RP</Text>
      </View>
      <Text style={styles.name}>Ray Parkar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  avatarPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#0a7ea4",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  initials: {
    fontSize: 64,
    fontWeight: "600",
    color: "#fff",
  },
  name: {
    fontSize: 28,
    fontWeight: "600",
    color: "#11181c",
  },
});
