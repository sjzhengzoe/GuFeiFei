// ==========================================================================

// 归并排序 递归调用合并两个有序数组的方法
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

// ==========================================================================

// 冒泡排序 换位置 一轮换最多k次 一轮换出一个最大的 换k轮
// 假设有k个数 比较k轮 每轮两两比较 交换位置 较大者在右边 一轮下来得出一个最大值
function bobbleSort(arr) {
  let k = 0;
  while (k < arr.length) {
    k++;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > arr[i + 1]) {
        let val = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = val;
      }
    }
  }
  return arr;
}

// ==========================================================================

// 选择排序 挑k次 一次挑一个最小的
// 假设有k个数 比较k轮 每轮两两比较 记录当轮最小数 更换位置 一轮下来 得出一个最小值
function selectSort(arr) {
  for (let k = 0; k < arr.length; k++) {
    let min = k;
    for (let i = k; i < arr.length; i++) {
      if (arr[i] < arr[min]) {
        min = i;
      }
    }
    let val = arr[min];
    arr[min] = arr[k];
    arr[k] = val;
  }
  return arr;
}

// ==========================================================================

// 快速排序 选出中位数 递归进行
// 假设有k个数 每次选择一位数作为基准 小于基数在左边 大于基数在右边 递归进行
function quickSort(arr) {
  if (arr.length == 0) return [];
  let middle = arr[0];
  let left = [];
  let right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= middle) left.push(arr[i]);
    if (arr[i] > middle) right.push(arr[i]);
  }
  return [...quickSort(left), middle, ...quickSort(right)];
}

// ==========================================================================

// 测试用例
let arr = [3, 2, 1, 11, 5, 4, 9];
let result = mergeSort(arr);
console.log(result);
