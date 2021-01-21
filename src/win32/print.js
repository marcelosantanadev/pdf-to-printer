"use strict";

const path = require("path");
const fs = require("fs");
const execAsync = require("../execAsync");
const { fixPathForAsarUnpack } = require("../electron-util");

const print = (pdf, options = {}) => {
  if (!pdf) throw "No PDF specified";
  if (typeof pdf !== "string") throw "Invalid PDF name";
  if (!fs.existsSync(pdf)) throw "No such file";

  let file = path.join(process.cwd(), "SumatraPDF.exe");
  file = fixPathForAsarUnpack(file);

  const args = [];

  const { printer, win32 } = options;

  if (win32) {
    if (!Array.isArray(win32)) throw "options.win32 should be an array";
    win32.map((win32Arg) => args.push(...win32Arg.split(" ")));
  } else {
    if (printer) {
      args.push("-print-to", printer);
    } else {
      args.push("-print-to-default");
    }
    args.push("-silent");
  }

  args.push(pdf);

  return execAsync(file, args);
};

module.exports = print;
