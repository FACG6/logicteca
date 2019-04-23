export default (estimate, spent) => {
  if (estimate && spent) {
    if (estimate > 0 && spent >= 0)
      return estimate - spent;
  }
  return 'notvalid'
}