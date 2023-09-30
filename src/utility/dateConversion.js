export default function getCurrentDate(justDate = false, incrementHour = 0) {
  let now = new Date();

  let month = (now.getMonth() + 1).toString();
  if (month.length < 2) month = "0" + month;

  let day = now.getDate().toString();
  if (day.length < 2) day = "0" + day;

  if (justDate) return `${now.getFullYear()}-${month}-${day}T00:00`;

  let hour = (now.getHours() + incrementHour).toString();
  if (hour.length < 2) hour = "0" + hour;

  let minute = now.getMinutes().toString();
  if (minute.length < 2) minute = "0" + minute;

  return `${now.getFullYear()}-${month}-${day}T${hour}:${minute}`;
}

export function getCurrentYear() {
  let now = new Date();

  return `${now.getFullYear()}-01-01T00:00`;
}

export function getCurrentDay() {
  let now = new Date();

  let month = (now.getMonth() + 1).toString();
  if (month.length < 2) month = "0" + month;

  let day = now.getDate().toString();
  if (day.length < 2) day = "0" + day;

  return `${now.getFullYear()}-${month}-${day}T00:00`;
}

export function getDateUpToMinute(date) {
  if(!date) 
   return getCurrentDate();

  let seconds = date.split(".")[0];
  return seconds.substr(0,seconds.length-3);
}