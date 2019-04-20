const filterIdMember = teamMember => {
  const filter = [];
  teamMember.forEach(obj => {
    filter.push(obj.id.toString());
  });
  return filter;
};

export default filterIdMember;
