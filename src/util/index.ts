export const formatDate = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}/${year}`;
};
