makeAbsoluteValueLessThan = function(val, maximum) {
  if (val > maximum) {
    return maximum;
  } else if (val < -maximum) {
    return -maximum;
  }
  return val;
};
