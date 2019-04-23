export default (estimate, spent) => {
  if (estimate && spent) {
    if (estimate > 0 && spent >= 0 && estimate > spent)
      return estimate - spent;
  }
  return false;
}