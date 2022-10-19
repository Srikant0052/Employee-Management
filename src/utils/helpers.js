let length = 6;
let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const generateId = () => {
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

module.exports = {
  generateId,
};
