const omitTypename = (key: any, value: any) => (key === '__typename' ? undefined : value);

export const commonUtilsOmitTypeName = (obj: {}) => JSON.parse(JSON.stringify(obj), omitTypename);
