export function formatPhone(value) {
  const formattedPhone = value.replaceAll(/\+|\(|\s|\)|-|_/g, "").slice(1);
  return formattedPhone;
}
