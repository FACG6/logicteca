const refactorData = (data) => {
  const userNames = [];
  data.forEach(({ full_name: fullName, user_id: userId }) => {
    userNames.push({ fullName, userId });
  });
  const newData = data[0];
  newData.userNames = userNames;
  return newData;
};

module.exports = refactorData;
