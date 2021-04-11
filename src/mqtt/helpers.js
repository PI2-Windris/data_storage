const helper = {
  parseMessage: (message) => {
    try {
      if (typeof message === 'string' && message.length > 0){
        return JSON.parse(message);
      }
    } catch (e) {
      return null;
    }
  }
}

module.exports = helper;