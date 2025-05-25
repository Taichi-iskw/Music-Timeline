export function measureCardAndGap(cardEl: HTMLElement, groupEl: HTMLElement) {
  const cardWidth = cardEl.offsetWidth;
  const n = groupEl.childElementCount;
  let gap = 0;
  if (n > 1) {
    gap = (groupEl.offsetWidth - cardWidth * n) / (n - 1);
  }
  return { cardWidth, gap };
}
