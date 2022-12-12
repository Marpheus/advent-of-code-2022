export const countPriorities = (input: string[]) => {
  let count = 0;
  input.forEach((e: string) => {
    const first = e.slice(0, e.length / 2);
    const second = e.slice(e.length / 2, e.length);

    const firstArray = first.split("");
    const secondArray = second.split("");
    const same = [
      ...new Set(firstArray.filter((v) => secondArray.includes(v))),
    ];

    same.forEach((e) => {
      if (e === e.toLowerCase()) {
        const code = e.charCodeAt(0) - 96;
        count += code;
      } else {
        const code = e.charCodeAt(0) - 64 + 26;
        count += code;
      }
    });
  });
  return count;
};

export const countPrioritiesInGroups = (input: string[]) => {
  let count = 0;
  let tempLine1: string[] = [];
  let tempLine2: string[] = [];
  input.forEach((e: string, i: number) => {
    if (i % 3 === 0) {
      tempLine1 = e.split("");
    }
    if (i % 3 === 1) {
      tempLine2 = e.split("");
    }
    if (i % 3 === 2) {
      const same = [
        ...new Set(
          e
            .split("")
            .filter((v) => tempLine1.includes(v) && tempLine2.includes(v))
        ),
      ];
      same.forEach((e) => {
        if (e === e.toLowerCase()) {
          const code = e.charCodeAt(0) - 96;
          count += code;
        } else {
          const code = e.charCodeAt(0) - 64 + 26;
          count += code;
        }
      });
    }
  });
  return count;
};
