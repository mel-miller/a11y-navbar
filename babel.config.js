const presets = [
  ["@babel/env", {
    targets: {
      "browsers": ["last 2 versions", "ie >= 9"]
    },
    useBuiltIns: "usage"
  }]
];

module.exports = {
    presets,
    "comments" : false
};