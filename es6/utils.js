const fixDecimalPoints = (value) => {
  return parseFloat(value).toFixed(4);
};

const splitStringInTwo = (s) => {
  const str = s.toUpperCase(),
    halfLength = str.length / 2;

  return `${str.substring(0, halfLength)} - ${str.substring(halfLength)}`
};

const copyObject = (obj1, obj2) => {
  for (let key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      obj1[key] = obj2[key];
    }
  }
};

export {fixDecimalPoints, splitStringInTwo, copyObject};