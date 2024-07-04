export function removeUndefinedValues(obj: any) {
  return Object.entries(obj)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc: any, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
}