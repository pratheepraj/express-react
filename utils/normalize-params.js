module.exports = {
  page(num) {
    if (!num) return 1;
    const temp = Math.floor(Number(num));
    return (temp <= 0) ? 1 : temp;
  },
  limit(num) {
    if (!num) return 0;
    const temp = Math.floor(Number(num));
    return temp < 0 ? 0 : temp;
  },
};
