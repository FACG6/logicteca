const refactorData = (data) => {
  const userId = [];
  const userNames = [];
  data.forEach((element) => {
    userId.push(element.user_id);
    userNames.push(element.full_name);
  });
  const newData = data[0];
  newData.user_id = userId;
  newData.userNames = userNames;
  return newData;
};

module.exports = refactorData;
