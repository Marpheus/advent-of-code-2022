const parseInput = (input: string[]) => {
  let grid: Array<string[]> = input.map((line) => {
    return line.split("");
  });

  let sPosition = { x: 0, y: 0 };
  let ePosition = { x: 0, y: 0 };
  let width = 0;
  grid.forEach((y, yIndex) => {
    width = y.length;
    y.forEach((x, xIndex) => {
      if (x === "S") {
        sPosition = {
          x: xIndex,
          y: yIndex,
        };
      }
      if (x === "E") {
        ePosition = {
          x: xIndex,
          y: yIndex,
        };
      }
    });
  });
  grid = grid.map((y) => {
    width = y.length;
    return y.map((x) => {
      if (x === "E") {
        return "z";
      }
      return x;
    });
  });
  const height = grid.length;
  return { grid, sPosition, ePosition, width, height };
};

const parseInput2 = (input: string[]) => {
  let grid: Array<string[]> = input.map((line) => {
    return line.split("");
  });

  const sPositions: Point[] = [];
  let ePosition = { x: 0, y: 0 };
  let width = 0;
  grid.forEach((y, yIndex) => {
    width = y.length;
    y.forEach((x, xIndex) => {
      if (x === "S" || x === "a") {
        sPositions.push({
          x: xIndex,
          y: yIndex,
        });
      }
      if (x === "E") {
        ePosition = {
          x: xIndex,
          y: yIndex,
        };
      }
    });
  });
  grid = grid.map((y) => {
    width = y.length;
    return y.map((x) => {
      if (x === "E") {
        return "z";
      }
      return x;
    });
  });
  const height = grid.length;
  return { grid, sPositions, ePosition, width, height };
};

type Point = {
  x: number;
  y: number;
};
type Path = {
  position: Point;
  length: number;
};

const findNeighbors = (
  position: Point,
  width: number,
  height: number
): Point[] => {
  const neighbors: Point[] = [];

  if (position.x > 0) {
    neighbors.push({
      x: position.x - 1,
      y: position.y,
    });
  }

  if (position.y > 0) {
    neighbors.push({
      x: position.x,
      y: position.y - 1,
    });
  }

  if (position.y < height - 1) {
    neighbors.push({
      x: position.x,
      y: position.y + 1,
    });
  }

  if (position.x < width - 1) {
    neighbors.push({
      x: position.x + 1,
      y: position.y,
    });
  }

  return neighbors;
};

const isIn = (point: Point, array: Point[]) => {
  return array.find((element) => {
    return element.y === point.y && element.x === point.x;
  });
};

export const getShortestPath = (input: string[]) => {
  const { grid, sPosition, width, height, ePosition } = parseInput(input);
  let possiblePaths: Path[] = [];
  let foundEnd = false;
  let length = 0;
  const checkedPositions: Point[] = [];

  possiblePaths.push({ position: sPosition, length: 0 });

  while (!foundEnd && possiblePaths.length > 0) {
    const currentPath = possiblePaths[0];

    if (currentPath) {
      const xCoordinateCurrent = grid[currentPath?.position.y];
      if (xCoordinateCurrent) {
        const value = xCoordinateCurrent[currentPath?.position.x];
        if (
          currentPath.position.x === ePosition.x &&
          currentPath.position.y === ePosition.y
        ) {
          foundEnd = true;
          length = currentPath.length;
          break;
        }

        const neighbors = findNeighbors(currentPath?.position, width, height);
        checkedPositions.push(currentPath?.position);
        neighbors.forEach((neighbor) => {
          if (!isIn(neighbor, checkedPositions)) {
            const xCoordinateNeighbor = grid[neighbor.y];
            if (xCoordinateNeighbor) {
              const neighborValue = xCoordinateNeighbor[neighbor.x];
              if (neighborValue && value) {
                if (
                  neighborValue.charCodeAt(0) <= value.charCodeAt(0) + 1 ||
                  value === "S"
                ) {
                  possiblePaths.push({
                    position: neighbor,
                    length: currentPath.length + 1,
                  });
                }
              }
            }
          }
        });
      }
    }

    possiblePaths.shift();
    possiblePaths = possiblePaths.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.position.x === value.position.x &&
            t.position.y === value.position.y &&
            t.length === value.length
        )
    );
    possiblePaths.sort((a, b) => a.length - b.length);
  }

  return length;
};

export const getShortestPath2 = (input: string[]) => {
  const { grid, sPositions, width, height, ePosition } = parseInput2(input);
  let possiblePaths: Path[] = [];
  let foundEnd = false;
  let length = 0;
  const checkedPositions: Point[] = [];

  sPositions.forEach((sPosition) => {
    possiblePaths.push({ position: sPosition, length: 0 });
  });

  while (!foundEnd && possiblePaths.length > 0) {
    const currentPath = possiblePaths[0];

    if (currentPath) {
      const xCoordinateCurrent = grid[currentPath?.position.y];
      if (xCoordinateCurrent) {
        const value = xCoordinateCurrent[currentPath?.position.x];
        if (
          currentPath.position.x === ePosition.x &&
          currentPath.position.y === ePosition.y
        ) {
          foundEnd = true;
          length = currentPath.length;
          break;
        }

        const neighbors = findNeighbors(currentPath?.position, width, height);
        checkedPositions.push(currentPath?.position);
        neighbors.forEach((neighbor) => {
          if (!isIn(neighbor, checkedPositions)) {
            const xCoordinateNeighbor = grid[neighbor.y];
            if (xCoordinateNeighbor) {
              const neighborValue = xCoordinateNeighbor[neighbor.x];
              if (neighborValue && value) {
                if (
                  neighborValue.charCodeAt(0) <= value.charCodeAt(0) + 1 ||
                  value === "S"
                ) {
                  possiblePaths.push({
                    position: neighbor,
                    length: currentPath.length + 1,
                  });
                }
              }
            }
          }
        });
      }
    }
    possiblePaths.shift();
    possiblePaths = possiblePaths.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.position.x === value.position.x &&
            t.position.y === value.position.y &&
            t.length === value.length
        )
    );
    possiblePaths.sort((a, b) => a.length - b.length);
  }

  return length;
};
