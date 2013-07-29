exports.setActive = function setActive(currentState, activeState) {
  currentState = currentState || "";
  activeState = activeState || null;

  return (currentState === activeState) ? "active" : "";
};
