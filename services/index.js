const { simpleGit } = require("simple-git");
const { newInstanceContent } = require("./consts.js");
const fs = require("fs");

const defaultOptions = {
  baseDir: process.cwd(),
  binary: "git",
  maxConcurrentProcesses: 6,
  trimmed: false,
};

const git = simpleGit(defaultOptions);

const newBranch = async (name, origin = "origin/master") => {
  const branches = await git.branch();
  const branch = branches.all.find((b) => b === name);

  if (!branch) {
    return await git.checkoutBranch(name, origin);
  }

  return;
};

const newInstance = async (name) => {
  const folderName = `test/${name}`;

  const branch = await newBranch(name);

  if (!branch) {
    return {
      error: "Instance already exists",
    };
  }

  fs.mkdirSync(folderName);
  fs.writeFileSync(`${folderName}/instance.json`, newInstanceContent);

  await git.add(".");
  await git.commit("First Commit");
  await git.push();

  return {
    success: `Instance ${name} created`,
  };
};

const forkInstance = async (name, origin) => {
  console.log(name, origin);
  const folderName = `test/${origin}`;

  const branch = await newBranch(name, origin);

  if (!branch) {
    return {
      error: "Instance already exists",
    };
  }

  fs.writeFileSync(`${folderName}/instance2.json`, newInstanceContent);

  await git.add(".");
  await git.commit("First Commit");
  await git.push();

  return {
    success: `Instance ${name} forked from ${origin}`,
  };
};

const getDiff = async (branch) => {
  await git.checkout(branch);
  const diff = await git.diff();

  if (!diff) {
    return {
      error: "There is no diff",
    };
  }

  return {
    success: diff,
  };
};

module.exports = { newInstance, forkInstance, getDiff };
