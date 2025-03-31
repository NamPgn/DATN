export const isValidStreetAddress = (address: string) => {
  const addressRegex = /^(số\s\d+|ngõ\s\d+|hẻm\s\d+)(,\s?[\p{L}\d\s]+)*$/iu;
  return addressRegex.test(address.trim());
};
