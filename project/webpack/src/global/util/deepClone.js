// ===== 深拷贝 ======

// 使用weakMap是因为对象要作为key
export default function deepClone(obj, hash = new WeakMap()) {
  // null || undefined
  if (obj == null || obj == undefined) return obj;
  // RegExp
  if (obj instanceof RegExp) return new RegExp(obj);
  // Date
  if (obj instanceof Date) return new Date(obj);
  // string number boolean
  if (typeof obj != "object") return obj;
  // Object
  // 指向本身的情况
  if (hash.get(obj)) return hash.get(obj);
  let newObj = Array.isArray(obj) ? [] : {};
  hash.set(obj, newObj);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepClone(obj[key], hash);
    }
  }
  return newObj;
}

// ===== 测试用例 =====

let a = { a: 1 };
let obj = {
  a,
};

// 普通对象
let obj11 = deepClone(obj);
let obj22 = deepClone(obj);
obj11.a.a = 2;
console.log(obj11);
console.log(obj22);

// 数组
let obj3 = [a, 1];
let obj33 = deepClone(obj3);
console.log(obj33);

// 调用自身
obj.o = obj;
let obj44 = deepClone(obj);
obj44.a.a = 2;
console.log("obj44", obj44);
