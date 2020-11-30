class Left {
  static of(value) {
    return new Left(value);
  }
  constructor(value) {
    this._value = value;
  }
  map() {
    return this;
  }
}

class Right {
  static of(value) {
    return new Right(value);
  }
  constructor(value) {
    this._value = value;
  }
  map(fn) {
    return Right.of(fn(this._value));
  }
}

function parseJSON(value) {
  try {
    return Right.of(JSON.parse(value));
  } catch (error) {
    return Left.of({ error: error.message });
  }
}

// 错误的例子
// console.log(parseJSON('{name:"zs"}').map((x) => x.toUpperCase()));

// 正确的例子
console.log(parseJSON('{"name":"zs"}').map((x) => x.name.toUpperCase()));
