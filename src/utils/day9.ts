export const getRopePositions = (input: string[]) => {
  type Position = { x: number; y: number };
  type Direction = "L" | "R" | "U" | "D";

  // Up and Down flipped for easier implementation in arrays

  const uniquePositions: Position[] = [];
  let headPosition: Position = { x: 1000, y: 1000 };
  let tailPosition: Position = { x: 1000, y: 1000 };

  const moveLeft = () => {
    if (headPosition.x !== 0) {
      return {
        x: headPosition.x - 1,
        y: headPosition.y,
      };
    }
    return headPosition;
  };

  const moveRight = () => {
    return {
      x: headPosition.x + 1,
      y: headPosition.y,
    };
  };

  const moveUp = () => {
    return {
      x: headPosition.x,
      y: headPosition.y + 1,
    };
  };

  const moveDown = () => {
    if (headPosition.y !== 0) {
      return {
        x: headPosition.x,
        y: headPosition.y - 1,
      };
    }
    return headPosition;
  };

  const handleTail = () => {
    // two L
    if (
      headPosition.x === tailPosition.x - 2 &&
      headPosition.y === tailPosition.y
    ) {
      return {
        x: tailPosition.x - 1,
        y: tailPosition.y,
      };
    }

    // two R
    if (
      headPosition.x === tailPosition.x + 2 &&
      headPosition.y === tailPosition.y
    ) {
      return {
        x: tailPosition.x + 1,
        y: tailPosition.y,
      };
    }

    // two U
    if (
      headPosition.x === tailPosition.x &&
      headPosition.y === tailPosition.y + 2
    ) {
      return {
        x: tailPosition.x,
        y: tailPosition.y + 1,
      };
    }

    // two D
    if (
      headPosition.x === tailPosition.x &&
      headPosition.y === tailPosition.y - 2
    ) {
      return {
        x: tailPosition.x,
        y: tailPosition.y - 1,
      };
    }

    // DDL
    if (
      headPosition.x === tailPosition.x - 1 &&
      headPosition.y === tailPosition.y - 2
    ) {
      return {
        x: tailPosition.x - 1,
        y: tailPosition.y - 1,
      };
    }

    // DDR
    if (
      headPosition.x === tailPosition.x + 1 &&
      headPosition.y === tailPosition.y - 2
    ) {
      return {
        x: tailPosition.x + 1,
        y: tailPosition.y - 1,
      };
    }
    // LLD
    if (
      headPosition.x === tailPosition.x - 2 &&
      headPosition.y === tailPosition.y - 1
    ) {
      return {
        x: tailPosition.x - 1,
        y: tailPosition.y - 1,
      };
    }
    // LLU
    if (
      headPosition.x === tailPosition.x - 2 &&
      headPosition.y === tailPosition.y + 1
    ) {
      return {
        x: tailPosition.x - 1,
        y: tailPosition.y + 1,
      };
    }
    // UUL
    if (
      headPosition.x === tailPosition.x - 1 &&
      headPosition.y === tailPosition.y + 2
    ) {
      return {
        x: tailPosition.x - 1,
        y: tailPosition.y + 1,
      };
    }
    // UUR
    if (
      headPosition.x === tailPosition.x + 1 &&
      headPosition.y === tailPosition.y + 2
    ) {
      return {
        x: tailPosition.x + 1,
        y: tailPosition.y + 1,
      };
    }
    // RRD
    if (
      headPosition.x === tailPosition.x + 2 &&
      headPosition.y === tailPosition.y - 1
    ) {
      return {
        x: tailPosition.x + 1,
        y: tailPosition.y - 1,
      };
    }
    // RRU
    if (
      headPosition.x === tailPosition.x + 2 &&
      headPosition.y === tailPosition.y + 1
    ) {
      return {
        x: tailPosition.x + 1,
        y: tailPosition.y + 1,
      };
    }

    return tailPosition;
  };

  const addUnique = () => {
    const position = uniquePositions.find((pos) => {
      return pos.x === tailPosition.x && pos.y === tailPosition.y;
    });

    if (!position) {
      uniquePositions.push(tailPosition);
    }
  };

  input.forEach((line, i) => {
    const split = line.split(" ");
    const direction: Direction = split[0] as Direction;
    const steps = parseInt(split[1] ?? "0");

    if (direction === "L") {
      for (let i = 0; i < steps; i++) {
        headPosition = moveLeft();
        tailPosition = handleTail();
        addUnique();
      }
    } else if (direction === "R") {
      for (let i = 0; i < steps; i++) {
        headPosition = moveRight();
        tailPosition = handleTail();
        addUnique();
      }
    } else if (direction === "U") {
      for (let i = 0; i < steps; i++) {
        headPosition = moveUp();
        tailPosition = handleTail();
        addUnique();
      }
    } else if (direction === "D") {
      for (let i = 0; i < steps; i++) {
        headPosition = moveDown();
        tailPosition = handleTail();
        addUnique();
      }
    }
  });

  return uniquePositions.length;
};

export const getRopePositions2 = (input: string[]) => {
  type Position = { x: number; y: number };
  type Direction = "L" | "R" | "U" | "D";

  // Up and Down flipped for easier implementation in arrays

  const uniquePositions: Position[] = [];
  let headPosition: Position = { x: 500, y: 500 };
  let tail1Position: Position = { x: 500, y: 500 };
  let tail2Position: Position = { x: 500, y: 500 };
  let tail3Position: Position = { x: 500, y: 500 };
  let tail4Position: Position = { x: 500, y: 500 };
  let tail5Position: Position = { x: 500, y: 500 };
  let tail6Position: Position = { x: 500, y: 500 };
  let tail7Position: Position = { x: 500, y: 500 };
  let tail8Position: Position = { x: 500, y: 500 };
  let tail9Position: Position = { x: 500, y: 500 };

  const moveLeft = () => {
    if (headPosition.x !== 0) {
      return {
        x: headPosition.x - 1,
        y: headPosition.y,
      };
    }
    return headPosition;
  };

  const moveRight = () => {
    return {
      x: headPosition.x + 1,
      y: headPosition.y,
    };
  };

  const moveUp = () => {
    return {
      x: headPosition.x,
      y: headPosition.y + 1,
    };
  };

  const moveDown = () => {
    if (headPosition.y !== 0) {
      return {
        x: headPosition.x,
        y: headPosition.y - 1,
      };
    }
    return headPosition;
  };

  const handleTail = (h: Position, t: Position): Position => {
    // two L
    if (h.x === t.x - 2 && h.y === t.y) {
      return {
        x: t.x - 1,
        y: t.y,
      };
    }

    // two R
    if (h.x === t.x + 2 && h.y === t.y) {
      return {
        x: t.x + 1,
        y: t.y,
      };
    }

    // two U
    if (h.x === t.x && h.y === t.y + 2) {
      return {
        x: t.x,
        y: t.y + 1,
      };
    }

    // two D
    if (h.x === t.x && h.y === t.y - 2) {
      return {
        x: t.x,
        y: t.y - 1,
      };
    }

    // DDL
    if (h.x <= t.x - 1 && h.y === t.y - 2) {
      return {
        x: t.x - 1,
        y: t.y - 1,
      };
    }

    // DDR
    if (h.x >= t.x + 1 && h.y === t.y - 2) {
      return {
        x: t.x + 1,
        y: t.y - 1,
      };
    }
    // LLD
    if (h.x === t.x - 2 && h.y <= t.y - 1) {
      return {
        x: t.x - 1,
        y: t.y - 1,
      };
    }
    // LLU
    if (h.x === t.x - 2 && h.y >= t.y + 1) {
      return {
        x: t.x - 1,
        y: t.y + 1,
      };
    }
    // UUL
    if (h.x <= t.x - 1 && h.y === t.y + 2) {
      return {
        x: t.x - 1,
        y: t.y + 1,
      };
    }
    // UUR
    if (h.x >= t.x + 1 && h.y === t.y + 2) {
      return {
        x: t.x + 1,
        y: t.y + 1,
      };
    }
    // RRD
    if (h.x === t.x + 2 && h.y <= t.y - 1) {
      return {
        x: t.x + 1,
        y: t.y - 1,
      };
    }
    // RRU
    if (h.x === t.x + 2 && h.y >= t.y + 1) {
      return {
        x: t.x + 1,
        y: t.y + 1,
      };
    }

    return t;
  };

  const addUnique = () => {
    const position = uniquePositions.find((pos) => {
      return pos.x === tail9Position.x && pos.y === tail9Position.y;
    });

    if (!position) {
      uniquePositions.push(tail9Position);
    }
  };

  const handleMultipleTails = () => {
    tail1Position = handleTail(headPosition, tail1Position);
    tail2Position = handleTail(tail1Position, tail2Position);
    tail3Position = handleTail(tail2Position, tail3Position);
    tail4Position = handleTail(tail3Position, tail4Position);
    tail5Position = handleTail(tail4Position, tail5Position);
    tail6Position = handleTail(tail5Position, tail6Position);
    tail7Position = handleTail(tail6Position, tail7Position);
    tail8Position = handleTail(tail7Position, tail8Position);
    tail9Position = handleTail(tail8Position, tail9Position);
  };

  input.forEach((line, i) => {
    const split = line.split(" ");
    const direction: Direction = split[0] as Direction;
    const steps = parseInt(split[1] ?? "0");

    if (direction === "L") {
      for (let i = 0; i < steps; i++) {
        headPosition = moveLeft();
        handleMultipleTails();
        addUnique();
      }
    } else if (direction === "R") {
      for (let i = 0; i < steps; i++) {
        headPosition = moveRight();
        handleMultipleTails();
        addUnique();
      }
    } else if (direction === "U") {
      for (let i = 0; i < steps; i++) {
        headPosition = moveUp();
        handleMultipleTails();
        addUnique();
      }
    } else if (direction === "D") {
      for (let i = 0; i < steps; i++) {
        headPosition = moveDown();
        handleMultipleTails();
        addUnique();
      }
    }
  });

  return uniquePositions.length;
};
