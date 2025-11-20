export const protectedServer = () => {
  return typeof window === "undefined";
};
