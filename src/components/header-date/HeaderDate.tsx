import { useEffect, useState } from "react";
import { View } from "react-native";
import { CustomText } from "../custom-text/CustomText";

type HeaderDateProps = { children: string; tintColor?: string | undefined };

export const HeaderDate = ({ children, tintColor }: HeaderDateProps) => {
  const [currentDate, setCurrentDate] = useState<string>("");
  useEffect(() => {
    const date = new Date().toLocaleDateString("en-us", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
    setCurrentDate(date);
  }, []);
  return (
    <View>
      <CustomText
        humanText={"Today"}
        fontFamily="Lato"
        textAlign="center"
        type="h4"
        opacity={true}
        gap={true}
      />
      <CustomText
        humanText={currentDate}
        fontFamily="Lato_Bold"
        textAlign="center"
        type="p"
        opacity={false}
        gap={false}
      />
    </View>
  );
};
