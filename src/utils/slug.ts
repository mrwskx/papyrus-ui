export function slug(...fragments: (number | string | undefined)[]): string {
  return fragments
    .filter(item => item != null)
    .join('-')
    .toLowerCase();
}
