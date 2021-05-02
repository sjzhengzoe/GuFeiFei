let timer;
function test() {
  if (timer) return null;
  console.log("doing");
  timer = setTimeout(() => {
    timer = null;
  }, 10000);
}
