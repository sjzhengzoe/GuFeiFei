const debug = process.env.NODE_ENV == "development";
const path = require("path");
const fs = require("fs");
const { log } = require("./shellLog");
let entry = {};
// 路径处理
exports.getFileEntrance = ({ build_path }) => {
  // 一级目录文件名数组
  let one_file_arr = build_path == "all" ? [""] : build_path.replace(/(,|，|\s|\|){1,}/g, ",").split(",");

  let allEntrance=[];

  // 打局部包
  if (one_file_arr && one_file_arr[0].length) {
    for (let one_file of one_file_arr) {
      let two_file_arr = null;
      try {
        // 二级目录文件名数组

        two_file_arr = fs.readdirSync(path.join(__dirname, "../src/pages/", one_file));
      } catch (e) {
        log("输入的路径存在错误!!!", "red");
        log("输入的路径存在错误!!!", "red");
        log("输入的路径存在错误!!!", "red");
        two_file_arr = null;
        return entrance;
      }

      if (two_file_arr.indexOf("js") === -1 && one_file.indexOf("/") === -1) {
        for (let two_file of two_file_arr) {
          // 二级目录文件之一
          let entrance = `${one_file}/${two_file}`;
          let isFileFolder = fs.statSync(path.join(__dirname, "../src/pages/", entrance)).isDirectory();
          isFileFolder && allEntrance.push(`${entrance}`);
        }
      }
    }
  }

  for (let entrance of allEntrance) {
    let src_path = path.join(__dirname, "../src/pages/", entrance);
    // 生产环境 删除dist打包文件
    !debug && _unlink({ entrance });
    _readdir(src_path);
  }

  return entry;
};

function _readdir(build_path) {
  let m;
  try {
    m = fs.readdirSync(build_path);
  } catch (e) {
    log("目录读取文件报错了!!!", "red");
  }
  // mac
  m = m.filter((v) => {
    if (v !== ".DS_Store") return v;
  });

  //判断到了页面级别
  if (!m.includes("js")) {
    // pages/main/new-list/js
    for (let v of m) {
      // js文件路径
      let fileDir = path.join(build_path, v);
      let stats = fs.statSync(fileDir);
      let isFile = stats.isFile();
      let isDir = stats.isDirectory();

      if (isFile) {
        // /Users/zoe/Sites/GuFeiFei/project/dev/src/pages/main/package
        let entrance_path = fileDir.replace(/\/js\/.*\.js/, ""); //入口路径
        // pages,main,package
        let entrance_path_arr = entrance_path.split("/").slice(-3);
        // pages/main/package
        let entrance_path_str = entrance_path_arr.join("/");
        // package
        let entrance_name = path.basename(entrance_path_str);
        // index
        let entrance_js_file = path.basename(fileDir.replace(/\.js/, ""));

        if ("index" === entrance_js_file) {
          //指定过滤那些文件夹
          entry[entrance_path_str] = fileDir;
        }
      }

      if (isDir) {
        _readdir(fileDir);
      }
    }
  } else {
    // pages/main/new-list
    name = path.basename(build_path);
    _readdir(path.join(build_path, "js"));
  }
}

function _unlink({ _p }) {
  let build_path = _p;
  build_path = build_path ? build_path : "";
  build_path = build_path.replace(/^\//, "").replace(/\/$/, "").split("/");

  log("当前指定的打包路径为", "success", build_path.length >= 1 && build_path[build_path.length - 1] ? build_path.join("/") : "全局");

  let rm_path = path.resolve(__dirname, "../dist");

  if (build_path.length > 1) {
    rm_path = path.resolve(__dirname, `../dist/pages/${build_path.join("/")}`);
    rm_path = rm_path + ".tpl.htm";
  } else if (build_path.length === 1 && build_path[0]) {
    let more_path = path.resolve(__dirname, `../src/pages/${build_path[0]}`);

    try {
      let more_stats = fs.readdirSync(more_path);
      rm_path = path.resolve(__dirname, `../dist/pages/${more_stats.join(",")}`);
      rm_path = rm_path + ".tpl.htm";
    } catch (e) {
      log("删除目录读取文件报错了", "red");
    }
  }

  log("删除目录为", "success", rm_path);

  _delete(rm_path); //删除文件
}

function _delete(dir) {
  if (Array.isArray(dir)) {
    for (let _path of dir) {
      _removeDir(_path);
    }
  } else {
    _removeDir(dir);
  }

  function _removeDir(rm_path) {
    if (fs.existsSync(rm_path)) {
      if (fs.statSync(rm_path).isDirectory()) {
        let files = fs.readdirSync(rm_path);
        files.forEach((file, index) => {
          let curPath = path.join(rm_path, file);
          if (fs.statSync(curPath).isDirectory()) {
            _removeDir(curPath); //递归删除文件夹
          } else {
            fs.unlinkSync(curPath); //删除文件
          }
        });
        fs.rmdirSync(rm_path);
      } else {
        fs.unlinkSync(rm_path); //删除文件
      }
    } else {
      log("删除目录路径存在异常", "warn");
    }
  }
}
