async function moveImage(path) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve(path);
    }, 100);
  });
}

module.exports = { moveImage };
