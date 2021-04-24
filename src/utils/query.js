const paginate = (query) => {
  let { page, limit } = query;

  page = parseInt(page, 10) || null;
  limit = parseInt(limit, 10) || null;
  let skip = null;
  if (limit && page) skip = page * limit;

  return { skip, limit };
};

const prepareDate = (query) => {
  try {
    let { start, end } = query;

    let dateQuery = null;

    if (start && end) {
      start = new Date(start).toISOString();
      end = new Date(end).toISOString();
      dateQuery = {
        createdAt: {
          $gte: start,
          $lte: end,
        },
      };
    }
    return dateQuery;
  } catch (e) {
    return null;
  }
};

const prepareQuery = (query) => {
  const { format } = query;
  const { skip, limit } = paginate(query);
  const dateQuery = prepareDate(query);

  return { format, skip, limit, dateQuery };
};

module.exports = prepareQuery;
