import { useEffect, useState } from "react";
import { View } from "react-native";
import { CustomText } from "../custom-text/CustomText";
import { headerDateStyles } from "./HeaderDateStyles";

type HeaderDateProps = { children: string; tintColor?: string | undefined };

export const HeaderDate = ({ children, tintColor }: HeaderDateProps) => {
  const [currentDate, setCurrentDate] = useState<string>("");
  const styles = headerDateStyles;
  useEffect(() => {
    const date = new Date().toLocaleDateString("en-us", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
    setCurrentDate(date);
  }, []);
  return (
    <View style={styles.container}>
      <CustomText
        humanText="Today"
        textAlign="center"
        type="p"
        opacity={true}
        gap={false}
      />
      <CustomText
        humanText={currentDate}
        textAlign="center"
        type="p"
        opacity={false}
        gap={false}
      />
    </View>
  );
};
