const assignValueToCorrectDir: any = (
  map: any,
  dirs: string[],
  key: string,
  value: any
) => {
  if (dirs.length === 0) {
    return {
      ...map,
      [key]: value,
    };
  } else {
    return {
      ...map,
      [String(dirs[0])]: {
        ...map[String(dirs[0])],
        ...assignValueToCorrectDir(
          map[String(dirs[0])],
          dirs.slice(1),
          key,
          value
        ),
      },
    };
  }
};

export const getFileSizes = (input: string[]) => {
  let fileSystemMap: object = {};
  let depthLevel = 0;
  let dirs: string[] = [];

  for (let i = 0; i < input.length; i++) {
    const command = input[i];
    if (command === "$ cd /") {
      depthLevel = 0;
      dirs = [];
      continue;
    } else if (command === "$ ls") {
      // do nothing, we are listing
      continue;
    }
    if (command === "$ cd ..") {
      if (depthLevel !== 0) {
        depthLevel--;
        dirs.pop();
      }
      continue;
    } else if (command?.includes("$ cd ")) {
      const cdParts = command?.split(" ") ?? [];
      if (cdParts[2]) {
        depthLevel++;
        dirs.push(cdParts[2]);
      }
      continue;
    }

    //   ############################

    const commandParts = command?.split(" ") ?? [];
    if (commandParts[1]) {
      if (commandParts[0] === "dir") {
        fileSystemMap = assignValueToCorrectDir(
          fileSystemMap,
          dirs,
          commandParts[1],
          {}
        );
      } else {
        fileSystemMap = assignValueToCorrectDir(
          fileSystemMap,
          dirs,
          commandParts[1],
          commandParts[0]
        );
      }
    }
  }

  let total = 0;

  const countTotal = (map: any) => {
    let tempTotal = 0;
    Object.entries(map).forEach(([k, v]: [string, any], i: number) => {
      if (typeof v === "string") {
        tempTotal += parseInt(v);
      } else {
        tempTotal += countTotal(v);
      }
    });
    if (tempTotal <= 100000 && tempTotal !== 0) {
      total += tempTotal;
    }
    return tempTotal;
  };
  countTotal(fileSystemMap);

  return total;
};

export const getFileSizes2 = (input: string[]) => {
  let fileSystemMap: object = {};
  let depthLevel = 0;
  let dirs: string[] = [];

  for (let i = 0; i < input.length; i++) {
    const command = input[i];
    if (command === "$ cd /") {
      depthLevel = 0;
      dirs = [];
      continue;
    } else if (command === "$ ls") {
      // do nothing, we are listing
      continue;
    }
    if (command === "$ cd ..") {
      if (depthLevel !== 0) {
        depthLevel--;
        dirs.pop();
      }
      continue;
    } else if (command?.includes("$ cd ")) {
      const cdParts = command?.split(" ") ?? [];
      if (cdParts[2]) {
        depthLevel++;
        dirs.push(cdParts[2]);
      }
      continue;
    }

    //   ############################

    const commandParts = command?.split(" ") ?? [];
    if (commandParts[1]) {
      if (commandParts[0] === "dir") {
        fileSystemMap = assignValueToCorrectDir(
          fileSystemMap,
          dirs,
          commandParts[1],
          {}
        );
      } else {
        fileSystemMap = assignValueToCorrectDir(
          fileSystemMap,
          dirs,
          commandParts[1],
          commandParts[0]
        );
      }
    }
  }

  const sizesArray: number[] = [];
  const sizesMap: any = {};

  const countTotal = (map: any) => {
    let tempTotal = 0;
    Object.entries(map).forEach(([k, v]: [string, any], i: number) => {
      if (typeof v === "string") {
        tempTotal += parseInt(v);
      } else {
        tempTotal += countTotal(v);
        sizesArray.push(tempTotal);
        sizesMap[k] = tempTotal;
      }
    });
    return tempTotal;
  };
  countTotal(fileSystemMap);

  sizesArray.sort(function (a, b) {
    return a - b;
  });

  const goal = 5174025;
  const larger = sizesArray.filter((s) => s >= goal);

  return larger[0];
};
