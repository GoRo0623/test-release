export const getNumberDate = (date: Date) => {
  return (
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2) +
    ("00" + date.getMilliseconds()).slice(-3)
  );
};

export const getDisplayDateTime = (date: Date) => {
  return (
    date.getFullYear() +
    "/" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    ("0" + date.getDate()).slice(-2) +
    " " +
    ("0" + date.getHours()).slice(-2) +
    "：" +
    ("0" + date.getMinutes()).slice(-2) +
    "：" +
    ("0" + date.getSeconds()).slice(-2)
  );
};
