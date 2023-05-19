import * as Font from "expo-font";

export const useFonts = async () => {
  await Font.loadAsync({
    Lato_Thin: require("../../assets/fonts/Lato_Thin.ttf"),
    Lato_ThinItalic: require("../../assets/fonts/Lato_ThinItalic.ttf"),
    Lato_Light: require("../../assets/fonts/Lato_Light.ttf"),
    Lato_LightItalic: require("../../assets/fonts/Lato_LightItalic.ttf"),
    Lato: require("../../assets/fonts/Lato.ttf"),
    Lato_Italic: require("../../assets/fonts/Lato_Italic.ttf"),
    Lato_Bold: require("../../assets/fonts/Lato_Bold.ttf"),
    Lato_BoldItalic: require("../../assets/fonts/Lato_BoldItalic.ttf"),
    Lato_Black: require("../../assets/fonts/Lato_Black.ttf"),
    Lato_BlackItalic: require("../../assets/fonts/Lato_BlackItalic.ttf"),
  });
};
