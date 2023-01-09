const getMapWithRocks = (input: string[]): string[][] => {
  const map: string[][] = Array(200).fill(Array(200).fill("."));

  input.forEach((line) => {
    const split = line.split(" -> ");

    let lastSplit: string[] | undefined = undefined;
    split.forEach((el) => {
      const coordinates = el.split(",");

      if (
        coordinates[0] &&
        coordinates[1] &&
        lastSplit !== undefined &&
        lastSplit[0] &&
        lastSplit[1]
      ) {
        const intCoordinates0 = parseInt(coordinates[0]);
        const intCoordinates1 = parseInt(coordinates[1]);
        const intLastSplit0 = parseInt(lastSplit[0]);
        const intLastSplit1 = parseInt(lastSplit[1]);

        if (intCoordinates0 === intLastSplit0) {
          if (intCoordinates1 > intLastSplit1) {
            for (let i = intLastSplit1; i <= intCoordinates1; i++) {
              const yIndex = map[i]?.slice();
              if (yIndex) {
                yIndex[intCoordinates0 - 450] = "#";
                map[i] = yIndex;
              }
            }
          }
          if (intCoordinates1 < intLastSplit1) {
            for (let i = intCoordinates1; i <= intLastSplit1; i++) {
              const yIndex = map[i]?.slice();
              if (yIndex) {
                yIndex[intCoordinates0 - 450] = "#";
                map[i] = yIndex;
              }
            }
          }
        } else if (intCoordinates1 === intLastSplit1) {
          if (intCoordinates0 > intLastSplit0) {
            for (let i = intLastSplit0; i <= intCoordinates0; i++) {
              const yIndex = map[intCoordinates1]?.slice();
              if (yIndex) {
                yIndex[i - 450] = "#";
                map[intCoordinates1] = yIndex;
              }
            }
          }
          if (intCoordinates0 < intLastSplit0) {
            for (let i = intCoordinates0; i <= intLastSplit0; i++) {
              const yIndex = map[intCoordinates1]?.slice();
              if (yIndex) {
                yIndex[i - 450] = "#";
                map[intCoordinates1] = yIndex;
              }
            }
          }
        }
      } else {
        if (coordinates[0] && coordinates[1]) {
          const yIndex = map[parseInt(coordinates[1])]?.slice();
          if (yIndex) {
            yIndex[parseInt(coordinates[0]) - 450] = "#";
            map[parseInt(coordinates[1])] = yIndex;
          }
        }
      }

      lastSplit = el.split(",");
    });
  });

  return map;
};

const getMapWithRocks2 = (input: string[]): string[][] => {
  const map: string[][] = Array(200).fill(Array(1000).fill("."));
  let highestY = 0;

  input.forEach((line) => {
    const split = line.split(" -> ");

    let lastSplit: string[] | undefined = undefined;
    split.forEach((el) => {
      const coordinates = el.split(",");

      if (
        coordinates[0] &&
        coordinates[1] &&
        lastSplit !== undefined &&
        lastSplit[0] &&
        lastSplit[1]
      ) {
        const intCoordinates0 = parseInt(coordinates[0]);
        const intCoordinates1 = parseInt(coordinates[1]);
        const intLastSplit0 = parseInt(lastSplit[0]);
        const intLastSplit1 = parseInt(lastSplit[1]);
        highestY = intCoordinates1 > highestY ? intCoordinates1 : highestY;
        if (intCoordinates0 === intLastSplit0) {
          if (intCoordinates1 > intLastSplit1) {
            for (let i = intLastSplit1; i <= intCoordinates1; i++) {
              const yIndex = map[i]?.slice();
              if (yIndex) {
                yIndex[intCoordinates0 - 10] = "#";
                map[i] = yIndex;
              }
            }
          }
          if (intCoordinates1 < intLastSplit1) {
            for (let i = intCoordinates1; i <= intLastSplit1; i++) {
              const yIndex = map[i]?.slice();
              if (yIndex) {
                yIndex[intCoordinates0 - 10] = "#";
                map[i] = yIndex;
              }
            }
          }
        } else if (intCoordinates1 === intLastSplit1) {
          if (intCoordinates0 > intLastSplit0) {
            for (let i = intLastSplit0; i <= intCoordinates0; i++) {
              const yIndex = map[intCoordinates1]?.slice();
              if (yIndex) {
                yIndex[i - 10] = "#";
                map[intCoordinates1] = yIndex;
              }
            }
          }
          if (intCoordinates0 < intLastSplit0) {
            for (let i = intCoordinates0; i <= intLastSplit0; i++) {
              const yIndex = map[intCoordinates1]?.slice();
              if (yIndex) {
                yIndex[i - 10] = "#";
                map[intCoordinates1] = yIndex;
              }
            }
          }
        }
      } else {
        if (coordinates[0] && coordinates[1]) {
          const yIndex = map[parseInt(coordinates[1])]?.slice();
          if (yIndex) {
            yIndex[parseInt(coordinates[0]) - 10] = "#";
            map[parseInt(coordinates[1])] = yIndex;
          }
        }
      }

      lastSplit = el.split(",");
    });
  });

  map[highestY + 2] = Array(1000).fill("#");

  return map;
};

export const countSand = (input: string[]) => {
  let sum = 0;

  const map = getMapWithRocks(input);
  let isSandDepleted = false;
  const lowestPoint = 190;

  const startPosition: { x: number; y: number } = { x: 500 - 450, y: 0 };

  const decideSandPosition = (position: { x: number; y: number }): void => {
    if (position.y >= lowestPoint) {
      isSandDepleted = true;
      return;
    }
    const nextRow = map[position.y + 1]?.slice();
    const row = map[position.y]?.slice();
    if (nextRow && row) {
      if (nextRow[position.x] === ".") {
        nextRow[position.x] = "+";
        map[position.y + 1] = nextRow;
        row[position.x] = ".";
        map[position.y] = row;

        // move down
        return decideSandPosition({ x: position.x, y: position.y + 1 });
      } else if (
        (nextRow[position.x] === "o" || nextRow[position.x] === "#") &&
        nextRow[position.x - 1] === "."
      ) {
        row[position.x] = ".";
        map[position.y] = row;

        nextRow[position.x - 1] = "+";
        map[position.y + 1] = nextRow;
        // move down and to the left
        return decideSandPosition({ x: position.x - 1, y: position.y + 1 });
      } else if (
        (nextRow[position.x] === "o" || nextRow[position.x] === "#") &&
        (nextRow[position.x - 1] === "o" || nextRow[position.x - 1] === "#") &&
        nextRow[position.x + 1] === "."
      ) {
        row[position.x] = ".";
        map[position.y] = row;

        nextRow[position.x + 1] = "+";
        map[position.y + 1] = nextRow;
        // move down and to the right
        return decideSandPosition({ x: position.x + 1, y: position.y + 1 });
      } else {
        sum++;
        // set current to 'o'
        row[position.x] = "o";
        map[position.y] = row;

        console.log(sum);
        return;
      }
    }
  };
  while (!isSandDepleted) {
    decideSandPosition(startPosition);
  }
  map.forEach((y, i) => {
    const line = y.join("");
    console.log(i + ": " + line);
  });

  // from 450 to 520
  // from 0 to 150

  return sum;
};

export const countSand2 = (input: string[]) => {
  let sum = 0;

  const map = getMapWithRocks2(input);
  let isSandDepleted = false;

  const startPosition: { x: number; y: number } = { x: 500 - 10, y: 0 };

  const decideSandPosition = (position: { x: number; y: number }): void => {
    const firstRow = map[0];
    if (firstRow && firstRow[500 - 10] === "o") {
      isSandDepleted = true;
      return;
    }
    const nextRow = map[position.y + 1]?.slice();
    const row = map[position.y]?.slice();
    if (nextRow && row) {
      if (nextRow[position.x] === ".") {
        nextRow[position.x] = "+";
        map[position.y + 1] = nextRow;
        row[position.x] = ".";
        map[position.y] = row;

        // move down
        return decideSandPosition({ x: position.x, y: position.y + 1 });
      } else if (
        (nextRow[position.x] === "o" || nextRow[position.x] === "#") &&
        nextRow[position.x - 1] === "."
      ) {
        row[position.x] = ".";
        map[position.y] = row;

        nextRow[position.x - 1] = "+";
        map[position.y + 1] = nextRow;
        // move down and to the left
        return decideSandPosition({ x: position.x - 1, y: position.y + 1 });
      } else if (
        (nextRow[position.x] === "o" || nextRow[position.x] === "#") &&
        (nextRow[position.x - 1] === "o" || nextRow[position.x - 1] === "#") &&
        nextRow[position.x + 1] === "."
      ) {
        row[position.x] = ".";
        map[position.y] = row;

        nextRow[position.x + 1] = "+";
        map[position.y + 1] = nextRow;
        // move down and to the right
        return decideSandPosition({ x: position.x + 1, y: position.y + 1 });
      } else {
        sum++;
        console.log("2: " + sum);
        // set current to 'o'
        row[position.x] = "o";
        map[position.y] = row;

        return;
      }
    }
  };
  while (!isSandDepleted) {
    decideSandPosition(startPosition);
  }
  map.forEach((y, i) => {
    const line = y.join("");
    console.log(i + ": " + line);
  });

  return sum;
};
