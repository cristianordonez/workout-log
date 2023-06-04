export const getUniqueId = (): number => {
  return Math.floor(Date.now() + Math.random());
};
