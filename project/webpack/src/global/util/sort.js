// ===== 归并排序 =====

function mergeSort(arr) {
  if (arr.length == 1) return arr;
  let middle = Math.floor(arr.length / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

// 合并两个有序的数组
function merge(arr1, arr2) {
  let arr = [];
  while (arr1.length && arr2.length) {
    if (arr1[0] <= arr2[0]) {
      arr.push(arr1.shift());
    } else {
      arr.push(arr2.shift());
    }
  }
  while (arr1.length) arr.push(arr1.shift());
  while (arr2.length) arr.push(arr2.shift());
  return arr;
}

// ===== 测试用例 =====
let arr = [3, 2, 1, 11, 5, 4, 9];
let result = mergeSort(arr);
console.log(result);
