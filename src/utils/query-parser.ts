type QueryParams<T> = {
  [K in keyof T]: any;
};

export default function parseQueryParams<T>(query: any): QueryParams<T> {
  const parsedParams: Partial<QueryParams<T>> = {};
  for (const key in query) {
    parsedParams[key as keyof T] = query[key];
  }
  return parsedParams as QueryParams<T>;
}
