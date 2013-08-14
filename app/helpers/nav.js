exports.setActive = function setActive(currentState, activeState) {
  currentState = currentState || "";
  activeState = activeState || null;

  return (currentState === activeState) ? "active" : "";
};
exports.postDate = function postDate(maybeDate) {
  if (maybeDate instanceof Date) {
      return maybeDate.toDateString();
  } else {
      return "";
  }
}
