// NEVER SAY DIE -> never-say-die

const _ = require("lodash");

const trace = _.curry((trave, v) => {
  console.log(trave, v);
  return v;
});

const split = _.curry((sep, string) => _.split(string, sep));
const map = _.curry((fn, arr) => _.map(arr, fn));
const join = _.curry((seq, arr) => _.join(arr, seq));

const f = _.flowRight(
  join("-"),
  trace("lower:"),
  map((item) => _.toLower(item)),
  trace("split:"),
  split(" ")
);

console.log(f("NEVER SAY DIE"));
