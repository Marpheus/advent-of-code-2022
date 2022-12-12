const getArrayOfCalories = (input: string[]) => {
  const caloriesGroups: number[] = [];
  let counter = 0;
  input.forEach((e: string) => {
    if (e === "") {
      caloriesGroups.push(counter);
      counter = 0;
    } else {
      const value = parseInt(e);
      counter += value;
    }
  });
  return caloriesGroups;
};
export const countMostCalories = (input: string[]) => {
  return Math.max(...getArrayOfCalories(input));
};

export const count3MostCalories = (input: string[]) => {
  return getArrayOfCalories(input)
    .sort(function (a, b) {
      return b - a;
    })
    .slice(0, 3)
    .reduce((acc, value) => {
      return acc + value;
    }, 0);
};
