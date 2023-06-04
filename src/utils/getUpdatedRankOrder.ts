import { AddExerciseType, Day, SetType } from "../types/types";
type Items = SetType | Day | AddExerciseType;

export const getUpdatedRankOrder = (items: Items[]): number => {
  let currentRankOrder = 0;
  items.forEach((item) => {
    if (item["rankOrder"] > currentRankOrder) {
      currentRankOrder = item["rankOrder"];
    }
  });
  return currentRankOrder + 1;
};
