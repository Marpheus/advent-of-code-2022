export const getTopOfStacks = (input: string[]) => {
  const stacks = [
    [],
    ["J", "H", "G", "M", "Z", "N", "T", "F"],
    ["V", "W", "J"],
    ["G", "V", "L", "J", "B", "T", "H"],
    ["B", "P", "J", "N", "C", "D", "V", "L"],
    ["F", "W", "S", "M", "P", "R", "G"],
    ["G", "H", "C", "F", "B", "N", "V", "M"],
    ["D", "H", "G", "M", "R"],
    ["H", "N", "M", "V", "Z", "D"],
    ["G", "N", "F", "H"],
  ];

  input.forEach((e) => {
    const split = e.split(" ");
    const count = parseInt(split[1] ?? "0");
    const from = parseInt(split[3] ?? "0");
    const to = parseInt(split[5] ?? "0");

    if (count && from && to) {
      const moving = stacks[from]?.slice(-count).reverse() ?? [];
      stacks[to]?.push(...moving);
      const startToDelete = (stacks[from]?.length ?? 0) - count;
      stacks[from]?.splice(startToDelete, count);
    }
  });

  let result = "";
  stacks.forEach((e) => {
    const last = e[e.length - 1];
    if (last) {
      result += last;
    }
  });

  return result;
};

export const getTopOfStacks2 = (input: string[]) => {
  const stacks = [
    [],
    ["J", "H", "G", "M", "Z", "N", "T", "F"],
    ["V", "W", "J"],
    ["G", "V", "L", "J", "B", "T", "H"],
    ["B", "P", "J", "N", "C", "D", "V", "L"],
    ["F", "W", "S", "M", "P", "R", "G"],
    ["G", "H", "C", "F", "B", "N", "V", "M"],
    ["D", "H", "G", "M", "R"],
    ["H", "N", "M", "V", "Z", "D"],
    ["G", "N", "F", "H"],
  ];

  input.forEach((e) => {
    const split = e.split(" ");
    const count = parseInt(split[1] ?? "0");
    const from = parseInt(split[3] ?? "0");
    const to = parseInt(split[5] ?? "0");

    if (count && from && to) {
      const moving = stacks[from]?.slice(-count) ?? [];
      stacks[to]?.push(...moving);
      const startToDelete = (stacks[from]?.length ?? 0) - count;
      stacks[from]?.splice(startToDelete, count);
    }
  });

  let result = "";
  stacks.forEach((e) => {
    const last = e[e.length - 1];
    if (last) {
      result += last;
    }
  });

  return result;
};
