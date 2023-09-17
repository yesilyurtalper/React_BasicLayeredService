export default function getCurrentDate() {
  let now = new Date();
  let month = (now.getMonth() + 1).toString();
  if (month.length < 2) month = "0" + month;
  let currentDate =
    now.getFullYear() +
    "-" +
    month +
    "-" +
    now.getDate() +
    "T" +
    now.getHours() +
    ":" +
    now.getMinutes();
  return currentDate;
}
