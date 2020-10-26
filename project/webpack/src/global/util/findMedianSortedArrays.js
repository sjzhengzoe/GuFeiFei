/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  // 是否是奇数
  let isOdd = (nums1.length + nums2.length) % 2 !== 0;
  // 有一个为空数组时
  if (nums1.length == 0 || nums2.length == 0) {
    let num = [...nums1, ...nums2];
    if (isOdd) {
      return num[Math.floor(num.length / 2)];
    } else {
      return (num[Math.floor(num.length / 2)] + num[Math.floor(num.length / 2) - 1]) / 2;
    }
  }

  let length = nums1.length + nums2.length;
  let k = Math.ceil(length / 2);
  let left = 0,
    right = 0;

  while (k != 1 && left < nums1.length && right < nums2.length) {
    let n = Math.floor(k / 2);
    let leftNum = left + n <= nums1.length ? nums1[left + n - 1] : Number.MAX_SAFE_INTEGER;
    let rightNum = right + n <= nums2.length ? nums2[right + n - 1] : Number.MAX_SAFE_INTEGER;
    if (leftNum <= rightNum) {
      left = left + n;
    } else {
      right = right + n;
    }
    k = k - n;
  }

  if (nums1[left] && nums2[right]) {
  }

  if (isOdd) {
    if (nums1[left] && nums2[right]) {
      return nums1[left] - nums2[right] <= 0 ? nums1[left] : nums2[right];
    } else {
      return k == 1 ? nums1[left] || nums2[right] : nums1[left + k - 1] || nums2[right + k - 1];
    }
  } else {
    if (nums1[left] && nums2[right]) {
      if (nums1[left + 1] && nums1[left + 1] <= nums2[right]) {
        return (nums1[left] + nums1[left + 1]) / 2;
      }

      if (nums2[right + 1] && nums2[right + 1] <= nums1[left]) {
        return (nums2[right] + nums2[right + 1]) / 2;
      }

      return (nums1[left] + nums2[right]) / 2;
    } else {
      if (nums1[left]) {
        return (nums1[left + k - 1] + nums1[left + k]) / 2;
      } else {
        return (nums2[right + k - 1] + nums2[right + k]) / 2;
      }
    }
  }
};

console.log(findMedianSortedArrays([2, 3, 4, 5, 6, 7], [1]));
