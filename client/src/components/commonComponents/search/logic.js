export default function searchLogic(searchFor, dataArray) {
  return dataArray.filter(obj =>
    Object.values(obj).some(val =>
      String(val)
        .toLocaleLowerCase()
        .includes(searchFor.toLocaleLowerCase())
    )
  );
}
