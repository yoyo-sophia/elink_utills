// split 方法
// let str = 'test';
// let strArr1 = str.split('');
// let strArr2 = [...str];
//
// console.log(strArr1);
// console.log(strArr2);

function matchDiff(originVal, editedVal, type) {
  let maxLength = originVal.length >= editedVal.length ? originVal.length : editedVal.length;
  let diffCount = 0;
  for (let i = 0; i < maxLength; i++) {
    if (originVal[i] !== editedVal[i]) {
      diffCount++;
    }
  }
  if (type === 'name' && (diffCount / maxLength) > 0.5) return true;
  if (type === 'id' && (diffCount / maxLength) > 0.2) return true;
  return false
};


let originVal = '钟辰乐';
let editedVal = '钟雷';


let diff = matchDiff(originVal, editedVal, 'name');
console.log(diff)
// console.log();
