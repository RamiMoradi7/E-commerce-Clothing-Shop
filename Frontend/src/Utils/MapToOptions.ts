export const mapToOptions = <T>(
  items: T[],
  nameField: keyof T
): (T & { firstLetter: string })[] => {
  return items?.map((item) => ({
    firstLetter: /[0-9]/.test(String(item[nameField])[0].toUpperCase())
      ? "0-9"
      : String(item[nameField])[0].toUpperCase(),
    ...item,
  }));
};
