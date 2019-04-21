const filterData = data => {
  const filter = [];
  const objectKeys = Object.keys(data[0]);
  objectKeys.forEach(key => {
    const filterArray = [];
    const filterKey = [];
    data.forEach(element => {
      if (filterKey.indexOf(element[key]) === -1) {
        filterKey.push(element[key]);
        filterArray.push({
          text: element[key],
          value: element[key]
        });
      }
    });
    filter.push(filterArray);
  });
  return filter;
};
export default filterData;
