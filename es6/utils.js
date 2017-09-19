const fixDecimalPoints = (value) => {
  return parseFloat(value).toFixed(4);
};

const splitStringInTwo = (s) => {
  const str = s.toUpperCase(),
    halfLength = str.length / 2;

  return `${str.substring(0, halfLength)} - ${str.substring(halfLength)}`
};

export {fixDecimalPoints, splitStringInTwo};