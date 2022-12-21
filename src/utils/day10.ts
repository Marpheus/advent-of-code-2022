export const getSignalStrength = (input: string[]) => {
  let count = 0;
  let step = 0;
  let registerX = 1;

  const isCycle = () => {
    if (
      step === 20 ||
      step === 60 ||
      step === 100 ||
      step === 140 ||
      step === 180 ||
      step === 220
    ) {
      count += step * registerX;
    }
  };
  input.forEach((line) => {
    const split = line.split(" ");
    if (split[0] === "noop") {
      step += 1;
      isCycle();
    }

    if (split[0] === "addx") {
      const value = parseInt(split[1] ?? "0");

      step += 1;
      isCycle();
      step += 1;
      isCycle();
      registerX += value;
    }
  });

  return count;
};

export const getSignal = (input: string[]) => {
  let step = 0;
  let registerX = 1;
  const output: string[] = [];

  const draw = () => {
    if (
      step % 40 === registerX ||
      step % 40 === registerX - 1 ||
      step % 40 === registerX + 1
    ) {
      output.push("#");
    } else {
      output.push(".");
    }
  };
  input.forEach((line) => {
    const split = line.split(" ");
    if (split[0] === "noop") {
      draw();
      step += 1;
    }

    if (split[0] === "addx") {
      const value = parseInt(split[1] ?? "0");

      draw();
      step += 1;
      draw();
      step += 1;
      registerX += value;
    }
  });

  function* chunks<T>(arr: T[], n: number): Generator<T[], void> {
    for (let i = 0; i < arr.length; i += n) {
      yield arr.slice(i, i + n);
    }
  }

  return [...chunks(output, 40)];
};
