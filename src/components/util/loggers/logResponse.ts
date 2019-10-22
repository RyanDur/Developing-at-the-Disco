export const logResponse = <T>(response: T) => {
  console.warn('response:', response);
  return response;
};
