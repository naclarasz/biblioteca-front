export const formatarData = (data: Date) => {
  return new Date(data)
    .toISOString()
    .split("T")[0]
    .split("-")
    .reverse()
    .join()
    .replace(/,/g, "/");
};
