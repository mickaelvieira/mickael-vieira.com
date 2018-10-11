import babel from "rollup-plugin-babel";
import json from "rollup-plugin-json";
import { uglify } from "rollup-plugin-uglify";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

const isProd = process.env.NODE_ENV === "production";

const format = "iife";
const pubDir = "public/js";
const distDir = "public/dist/js";
const sourcemap = !isProd;
const plugins = [
  json({
    preferConst: true
  }),
  commonjs(),
  nodeResolve({
    jsnext: true,
    module: true,
    main: true,
    browser: true
  }),
  babel({
    exclude: "node_modules/**"
  })
];

if (isProd) {
  plugins.push(uglify());
}

const external = [];
const globals = {};

export default {
  input: pubDir + "/main.js",
  output: {
    name: "main",
    file: distDir + "/main.js",
    format,
    plugins,
    globals,
    external,
    sourcemap
  }
};
