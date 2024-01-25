export function setLocalStorage(key: string, values: unknown) {
  localStorage.setItem(key, JSON.stringify(values));
}

export function parseFormField(
  field: string,
  currentTarget: EventTarget & HTMLFormElement
) {
  const formData = new FormData(currentTarget);
  return formData.get(field);
}
