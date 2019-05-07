export default function sort(a, b, columnName) {
  if (a[columnName] < b[columnName]) {
    return -1;
  }
  if (a[columnName] > b[columnName]) {
    return 1;
  }
  return 0;
}
  

