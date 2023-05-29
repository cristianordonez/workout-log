export const formatTitle = (title: string): string => {
  let allWords = title.split(" ");
  let result = allWords.map((word) => {
    if (word.length > 1) {
      return word[0].toUpperCase() + word.slice(1);
    }
  });
  return result.join(" ");
};
