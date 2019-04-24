const presets = [
  ["@babel/preset-env", {
    targets: {
      "browsers": ["last 2 versions", "ie >= 9"]
    },
    useBuiltIns: "usage"
  }],
  ["minify", {
    mangle: {}
  }]
];

const plugins = ["@babel/plugin-transform-object-assign"];

const comments = false;

module.exports = {
    presets,
    plugins,
    comments
};