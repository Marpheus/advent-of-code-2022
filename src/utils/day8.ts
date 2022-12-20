export const getVisibleTrees = (input: string[]) => {
  const treeMap: string[][] = [];
  input.forEach((line) => {
    const split = line.split("");
    treeMap.push(split);
  });

  const isVisibleFromNorth = (
    treeMap: string[][],
    xIndex: number,
    yIndex: number,
    value: number
  ): boolean => {
    if (yIndex > 0) {
      // @ts-expect-error
      const elementNorth = treeMap[yIndex - 1][xIndex] ?? 100;
      if (elementNorth >= value) {
        return false;
      } else {
        if (yIndex === 1) {
          return true;
        }
        return isVisibleFromNorth(treeMap, xIndex, yIndex - 1, value);
      }
    }
    return false;
  };

  const isVisibleFromWest = (
    treeMap: string[][],
    xIndex: number,
    yIndex: number,
    value: number
  ): boolean => {
    if (xIndex > 0) {
      // @ts-expect-error
      const elementWest = treeMap[yIndex][xIndex - 1] ?? 100;
      if (elementWest >= value) {
        return false;
      } else {
        if (xIndex === 1) {
          return true;
        }
        return isVisibleFromWest(treeMap, xIndex - 1, yIndex, value);
      }
    }
    return false;
  };

  const isVisibleFromSouth = (
    treeMap: string[][],
    xIndex: number,
    yIndex: number,
    size: number,
    value: number
  ): boolean => {
    if (yIndex < size - 1) {
      // @ts-expect-error
      const elementSouth = treeMap[yIndex + 1][xIndex] ?? 0;
      if (elementSouth >= value) {
        return false;
      } else {
        if (yIndex === size - 2) {
          return true;
        }
        return isVisibleFromSouth(treeMap, xIndex, yIndex + 1, size, value);
      }
    }
    return false;
  };

  const isVisibleFromEast = (
    treeMap: string[][],
    xIndex: number,
    yIndex: number,
    size: number,
    value: number
  ): boolean => {
    if (xIndex < size - 1) {
      // @ts-expect-error
      const elementEast = treeMap[yIndex][xIndex + 1] ?? 0;
      if (elementEast >= value) {
        return false;
      } else {
        if (xIndex === size - 2) {
          return true;
        }
        return isVisibleFromEast(treeMap, xIndex + 1, yIndex, size, value);
      }
    }
    return false;
  };

  let count = 0;

  treeMap.forEach((line, yIndex) => {
    line.forEach((char, xIndex) => {
      // edges
      if (
        xIndex === 0 ||
        yIndex === 0 ||
        yIndex === treeMap.length - 1 ||
        xIndex === line.length - 1
      ) {
        count++;
      } else {
        // center
        const north = isVisibleFromNorth(
          treeMap,
          xIndex,
          yIndex,
          parseInt(char)
        );
        if (north) {
          count++;
        } else {
          const south = isVisibleFromSouth(
            treeMap,
            xIndex,
            yIndex,
            treeMap.length,
            parseInt(char)
          );
          if (south) {
            count++;
          } else {
            const east = isVisibleFromEast(
              treeMap,
              xIndex,
              yIndex,
              line.length,
              parseInt(char)
            );
            if (east) {
              count++;
            } else {
              const west = isVisibleFromWest(
                treeMap,
                xIndex,
                yIndex,
                parseInt(char)
              );
              if (west) {
                count++;
              }
            }
          }
        }
      }
    });
  });

  return count;
};

export const getVisibilityScore = (input: string[]) => {
  const treeMap: string[][] = [];
  input.forEach((line) => {
    const split = line.split("");
    treeMap.push(split);
  });

  const getNorthScore = (
    treeMap: string[][],
    xIndex: number,
    yIndex: number,
    value: number,
    total: number
  ): number => {
    if (yIndex > 0) {
      // @ts-expect-error
      const elementNorth = treeMap[yIndex - 1][xIndex] ?? 100;
      if (elementNorth >= value) {
        return total + 1;
      } else {
        if (yIndex === 1) {
          return total + 1;
        }
        return getNorthScore(treeMap, xIndex, yIndex - 1, value, total + 1);
      }
    }
    return 0;
  };

  const getWestScore = (
    treeMap: string[][],
    xIndex: number,
    yIndex: number,
    value: number,
    total: number
  ): number => {
    if (xIndex > 0) {
      // @ts-expect-error
      const elementWest = treeMap[yIndex][xIndex - 1] ?? 100;
      if (elementWest >= value) {
        return total + 1;
      } else {
        if (xIndex === 1) {
          return total + 1;
        }
        return getWestScore(treeMap, xIndex - 1, yIndex, value, total + 1);
      }
    }
    return 0;
  };

  const getSouthScore = (
    treeMap: string[][],
    xIndex: number,
    yIndex: number,
    size: number,
    value: number,
    total: number
  ): number => {
    if (yIndex < size - 1) {
      // @ts-expect-error
      const elementSouth = treeMap[yIndex + 1][xIndex] ?? 0;
      if (elementSouth >= value) {
        return total + 1;
      } else {
        if (yIndex === size - 2) {
          return total + 1;
        }
        return getSouthScore(
          treeMap,
          xIndex,
          yIndex + 1,
          size,
          value,
          total + 1
        );
      }
    }
    return 0;
  };

  const getEastScore = (
    treeMap: string[][],
    xIndex: number,
    yIndex: number,
    size: number,
    value: number,
    total: number
  ): number => {
    if (xIndex < size - 1) {
      // @ts-expect-error
      const elementEast = treeMap[yIndex][xIndex + 1] ?? 0;
      if (elementEast >= value) {
        return total + 1;
      } else {
        if (xIndex === size - 2) {
          return total + 1;
        }
        return getEastScore(
          treeMap,
          xIndex + 1,
          yIndex,
          size,
          value,
          total + 1
        );
      }
    }
    return 0;
  };

  let maxScore = 0;

  treeMap.forEach((line, yIndex) => {
    line.forEach((char, xIndex) => {
      let currentScore = 1;

      // north
      if (yIndex === 0) {
        currentScore *= 0;
      } else {
        const score = getNorthScore(treeMap, xIndex, yIndex, parseInt(char), 0);
        currentScore *= score;
      }

      // west
      if (xIndex === 0) {
        currentScore *= 0;
      } else {
        const score = getWestScore(treeMap, xIndex, yIndex, parseInt(char), 0);
        currentScore *= score;
      }

      // south
      if (yIndex === treeMap.length - 1) {
        currentScore *= 0;
      } else {
        const score = getSouthScore(
          treeMap,
          xIndex,
          yIndex,
          treeMap.length,
          parseInt(char),
          0
        );
        currentScore *= score;
      }

      // east
      if (xIndex === line.length - 1) {
        currentScore *= 0;
      } else {
        currentScore *= getEastScore(
          treeMap,
          xIndex,
          yIndex,
          line.length,
          parseInt(char),
          0
        );
      }

      if (currentScore > maxScore) {
        maxScore = currentScore;
      }
    });
  });

  return maxScore;
};
