import { View, Text, Image } from "react-native";
import styles from "@/assets/styles/stylesChatMessage";

export interface ChatMessageProps {
  type: string;
  text: string;
  createdAt?: Date;
  imageUri?: string;
  kcal?: number;
  protein?: number;
}

export default function ChatMessage(props: ChatMessageProps) {
  const { type, text, createdAt, imageUri } = props;

  return (
    <>
      {createdAt && (
        <View
          style={
            type == "fromMe"
              ? styles.messageSended
              : type == "fromAI"
              ? styles.messageReceived
              : type == "fromSystem"
              ? styles.messageSystem
              : null
          }>
          {type == "fromMe" && imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}
          <Text style={styles.textMessage}>{text}</Text>
          {type != "fromSystem" && (
            <View style={styles.containerDate}>
              <Text style={styles.textCreatedAt}>
                {createdAt && formattingTime(new Date(createdAt).getTime(), "dayMonth")}
              </Text>
              <Text style={styles.textCreatedAt}>
                {createdAt && formattingTime(new Date(createdAt).getTime(), "hourMinute")}
              </Text>
            </View>
          )}
        </View>
      )}
    </>
  );
}

// Function to format the time of the message human readable
function formattingTime(secs: number, type: string) {
  const time = new Date(secs);
  let firstDigits, separatorChar, secondDigits;
  switch (type) {
    case "dayMonth":
      firstDigits = time.getDate();
      separatorChar = "/";
      secondDigits = time.getMonth() + 1;
      break;
    case "hourMinute":
      firstDigits = time.getHours();
      separatorChar = ":";
      secondDigits = time.getMinutes();
      break;
    default:
      break;
  }

  return (
    <Text>
      {firstDigits && firstDigits > 9 ? <>{firstDigits} </> : <>0{firstDigits}</>}
      {separatorChar}
      {secondDigits && secondDigits > 9 ? <>{secondDigits} </> : <>0{secondDigits}</>}
    </Text>
  );
}
