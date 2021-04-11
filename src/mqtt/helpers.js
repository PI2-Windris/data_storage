const helper = {
  parseMessage: (message) => {
    try {
      return JSON.parse(message.toString());
    } catch (e) {
      return null;
    }
  },
};

module.exports = helper;
