const parseInput = (input: string) => {
  const split = input.split(",");
  const first = split[0];
  const second = split[1];

  const firstSplit: string[] = first?.split("-") ?? [];
  const secondSplit: string[] = second?.split("-") ?? [];

  const firstLow = parseInt(firstSplit[0] ?? "0");
  const firstHigh = parseInt(firstSplit[1] ?? "0");
  const secondLow = parseInt(secondSplit[0] ?? "0");
  const secondHigh = parseInt(secondSplit[1] ?? "0");

  return { firstLow, firstHigh, secondLow, secondHigh };
};
export const countOverlaps = (input: string[]) => {
  let count = 0;
  input.forEach((e: string) => {
    const { firstLow, firstHigh, secondLow, secondHigh } = parseInput(e);

    if (firstLow <= secondLow && firstHigh >= secondHigh) {
      count += 1;
    } else if (firstLow >= secondLow && firstHigh <= secondHigh) {
      count += 1;
    }
  });
  return count;
};

export const countOverlaps2 = (input: string[]) => {
  let count = 0;
  input.forEach((e: string) => {
    const { firstLow, firstHigh, secondLow, secondHigh } = parseInput(e);

    if (
      (firstLow <= secondLow && firstHigh >= secondLow) ||
      (secondLow <= firstLow && secondHigh >= firstLow)
    ) {
      count += 1;
    }
  });
  return count;
};
