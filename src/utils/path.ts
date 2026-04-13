export function getBasePath(pathname: string) {
  const firstSlashIndex = pathname.indexOf('/', 1);
  return firstSlashIndex === -1
    ? pathname
    : pathname.slice(0, firstSlashIndex + 1);
}
