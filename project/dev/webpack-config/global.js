exports.domain = process.env.domain;

exports.port = process.env.port || "8081";

exports.p = process.env.p || "";

exports.debug = process.env.NODE_ENV == "development";

exports.isHttps = true;

exports.api_host = process.env.api_host == ".com" ? "https://www.qeeq.com" : "https://www.qeeq.cn";
