/*
* return {String}
* */
export default function Today() {
  let newDate = new Date();
  let year = newDate.getFullYear();
  let month = newDate.getMonth() + 1;
  let date = newDate.getDate();
  (month >= 1 && month <= 9) ? month = "0" + month : month;
  (date >= 0 && date <= 9) ? date = "0" + date : date;
  return `${year}-${month}-${date}`;
}