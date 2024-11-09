export function formatPhone(value) {
  const formattedPhone = value.replaceAll(/\+|\(|\s|\)|-/g, "").slice(1);
  return formattedPhone;
}
