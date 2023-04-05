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

const newInstance = async (name) => {
  const folderName = `test/${name}`;

  if (!fs.existsSync(folderName)) {
    try {
      const branch = await git.checkoutBranch(name, "origin/master");
      console.log("branch", branch);

      fs.writeFileSync(`${folderName}/instance.json`, newInstanceContent);

      const diff = await git.diff(["--name-only", "--staged"]);
      console.log("DIF: ", diff);

      const add = await git.add(".");
      console.log("add", add);

      const commit = await git.commit("test");
      console.log("commit", commit);

      const push = await git.push(name);
      console.log("push", push);
    } catch (error) {
      console.log("ERRRR", error);
    }
  }
};

const removeAllOrigins = async () => {
  const remotes = await git.listRemote();
  console.log(remotes);
  remotes.forEach((remote) => {
    git.removeRemote(remote);
  });
};

//git.diff(["--name-only", "--staged"]);

function callHandler(err, result) {
  console.log("callHandler err: ", err);
  console.log("callHandler: ", result);
}

module.exports = { newInstance, removeAllOrigins };
