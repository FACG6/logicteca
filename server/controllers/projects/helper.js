const refactorData = (data) => {
  const userId = [];
  data.forEach(element => userId.push(element.user_id));
  const newData = data[0];
  newData.user_id = userId;
  return newData;
};

module.exports = refactorData;
