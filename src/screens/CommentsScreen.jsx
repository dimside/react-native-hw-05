import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Comment } from "../components/Comments";

export const CommentsScreen = () => {
  const [comment, setComment] = useState(null);
  const {
    params: { image, comments },
  } = useRoute();

  const hadleAddComment = () => {
    console.log(comment);
    setComment(null);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <View style={styles.imageContainer}>
          <Image style={styles.img} source={{ uri: image }} />
        </View>
        
        <FlatList
          style={styles.commentsContainer}
          data={comments}
          renderItem={({ item }) => <Comment comments={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
        
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={setComment}
              style={styles.input}
              placeholder="Коментувати..."
              placeholderTextColor="#BDBDBD"
              value={comment}
              multiline
            />
            <Pressable onPress={hadleAddComment} style={styles.addBtn}>
              <AntDesign name="arrowup" size={18} color="#FFFFFF" />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  imageContainer: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
    overflow: "hidden",
  },
  img: {
    height: "100%",
    width: "100%",
  },
  commentsContainer: {
    maxHeight: 323,
  },
  inputContainer: {
    width: "100%",
    minHeight: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 25,
    paddingLeft: 16,
    paddingRight: 8,
    marginTop: 15,
    marginBottom: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "88%",
  },
  addBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FF6C00",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
