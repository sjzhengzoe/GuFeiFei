function ajax(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "json";
    xhr.onload = function () {
      if (this.status == "200") {
        resolve(this.response);
      } else {
        reject(new Error("promise error"));
      }
    };
    xhr.send();
  });
}

ajax("/api")
  .then(function (res) {
    console.log(res);
  })
  .catch(function (error) {
    console.log(error);
  });
