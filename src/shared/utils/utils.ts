export const concatQueryStringFromObject = (object: Record<string, any>) => {
  const query = Object.entries(object)
    .reduce((result, [key, value]) => {
      return value ? result + `${key}=${value}&` : result;
    }, "/?")
    .slice(0, -1);
  return query;
};
