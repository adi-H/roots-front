export function calcAvailableHeight(heights: string[]) {
  return `calc(100vh - ${heights.join(" - ")})`;
}
