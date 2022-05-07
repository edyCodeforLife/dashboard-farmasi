const ObjectToCamelCase = (payload: Object) => {
  const result = {};
  if (payload && typeof payload === 'object' && Object.keys(payload).length > 0) {
    /*
      eslint no-restricted-syntax:
        ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"]
    */
    for (const item in payload) {
      if (payload.hasOwnProperty.call(payload, item)) {
        const convert = item.toLowerCase().replace(/([-_][a-z])/g, (group) => group
          .toUpperCase()
          .replace('-', '')
          .replace('_', ''));

        result[convert] = payload[item];
      }
    }
  }

  return result;
};

const ArrayToCamelCase = () => {};

export {
  ObjectToCamelCase,
  ArrayToCamelCase,
};
