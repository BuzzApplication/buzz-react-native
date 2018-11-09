export function errorExist(response) {
  return response.error !== null;
}

export function getErrorDescription(response) {
  return response.error.description;
}
