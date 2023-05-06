/** Receive a body of URL parameters and convert them to a string. */
export function convertParamsToString(params: IParams = {} as IParams) {
  const keys = Object.keys(params)
  let string = "?"
  for (let key of keys) {
    string += `${key}=${params[key]}&`
  }
  //req.body has a params object.  Convert to string.
  if (string === "?") return ""
  return string.slice(0, -1)
}

export interface IParams {
  [key: string]: string
}