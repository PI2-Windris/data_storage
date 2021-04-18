const { parseAsync } = require('json2csv');

const toCsv = {
  transform: async (data, fields) => {
    /* It's important to run this using the async parser api
    * as it does not block the js event loop
    * the sync version also isn't resource efficient
    */
    try {
      const opts = { fields }
      const csv = parseAsync(data, opts)
        .then( csv => {return csv})
        .catch( err => {
          throw new Error('Não foi possível gerar o csv')
        })
      return csv
    } catch (e) {
      return e
    }
  }
}

module.exports = toCsv