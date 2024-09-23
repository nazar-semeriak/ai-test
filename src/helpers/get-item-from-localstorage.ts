export function getObjectFromLocalStorage<T>(key: string) {
  if (typeof window !== "undefined") {
    const result = window.localStorage.getItem(key);
    if (result) return JSON.parse(result) as T;
  }
}
