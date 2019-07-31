/*
* @param {String} 需要保留小数位数的值
* @param { Number } 保留的位数
* */
export default function Decimal(val, digit) {
  let newDigit = digit >= 1 ? digit : 1;
  return parseFloat(val).toFixed(digit)
};
