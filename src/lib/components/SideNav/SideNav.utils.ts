export function isCurrentPage(href: string, currentUrl: string): boolean {
  if (!href || !currentUrl) return false;

  return href === currentUrl || currentUrl.startsWith(href + "/");
}
