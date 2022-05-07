const ObjectToSnakeCase = (payload: Object) => {
  if (payload && typeof payload === 'object' && Object.keys(payload).length > 0) {
    const result = {};
    /*
      eslint no-restricted-syntax:
        ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"]
    */
    for (const item in payload) {
      if (payload.hasOwnProperty.call(payload, item)) {
        const convert = item.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
        result[convert] = payload[item];
      }
    }
    return result;
  }

  if (typeof payload === 'string') {
    return payload.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  return undefined;
};

const ArrayToSnakeCase = () => {

};

export {
  ObjectToSnakeCase,
  ArrayToSnakeCase,
};
