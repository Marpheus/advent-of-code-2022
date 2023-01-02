type Monkey = {
  id: number;
  items: number[];
  operation: (old: number) => number;
  divisibleBy: number;
  ifTrue: number;
  ifFalse: number;
  throws: number;
};

type BigMonkey = {
  id: number;
  items: string[];
  operation: (old: bigint) => bigint;
  divisibleBy: number;
  ifTrue: number;
  ifFalse: number;
  throws: number;
};

export const getMonkeyInspectionCount = () => {
  // count how many times each monkey inspected an item
  // multiply 2 largest numbers

  const monkeyState = [
    {
      id: 0,
      items: [84, 66, 62, 69, 88, 91, 91],
      operation: (old: number) => old * 11,
      divisibleBy: 2,
      ifTrue: 4,
      ifFalse: 7,
      throws: 0,
    },
    {
      id: 1,
      items: [98, 50, 76, 99],
      operation: (old: number) => old * old,
      divisibleBy: 7,
      ifTrue: 3,
      ifFalse: 6,
      throws: 0,
    },
    {
      id: 2,
      items: [72, 56, 94],
      operation: (old: number) => old + 1,
      divisibleBy: 13,
      ifTrue: 4,
      ifFalse: 0,
      throws: 0,
    },
    {
      id: 3,
      items: [55, 88, 90, 77, 60, 67],
      operation: (old: number) => old + 2,
      divisibleBy: 3,
      ifTrue: 6,
      ifFalse: 5,
      throws: 0,
    },
    {
      id: 4,
      items: [69, 72, 63, 60, 72, 52, 63, 78],
      operation: (old: number) => old * 13,
      divisibleBy: 19,
      ifTrue: 1,
      ifFalse: 7,
      throws: 0,
    },
    {
      id: 5,
      items: [89, 73],
      operation: (old: number) => old + 5,
      divisibleBy: 17,
      ifTrue: 2,
      ifFalse: 0,
      throws: 0,
    },
    {
      id: 6,
      items: [78, 68, 98, 88, 66],
      operation: (old: number) => old + 6,
      divisibleBy: 11,
      ifTrue: 2,
      ifFalse: 5,
      throws: 0,
    },
    {
      id: 7,
      items: [70],
      operation: (old: number) => old + 7,
      divisibleBy: 5,
      ifTrue: 1,
      ifFalse: 3,
      throws: 0,
    },
  ];

  const handleMonkey = (id: number) => {
    const currentMonkey = monkeyState[id];
    if (currentMonkey) {
      // inspect item
      // iterate over all items in monkey's hands
      currentMonkey?.items.forEach((currentItem) => {
        let item = currentItem;
        // do operation
        item = currentMonkey.operation(item);
        // divide by 3
        item = Math.floor(item / 3);
        // test
        // throw based on test result
        if (item % currentMonkey.divisibleBy === 0) {
          monkeyState[currentMonkey.ifTrue]?.items.push(item);
        } else {
          monkeyState[currentMonkey.ifFalse]?.items.push(item);
        }
        // @ts-expect-error
        monkeyState[id] = {
          ...monkeyState[id],
          // @ts-expect-error
          throws: monkeyState[id].throws + 1,
        };
      });

      // @ts-expect-error
      monkeyState[id] = {
        ...monkeyState[id],
        items: [],
      };
    }
  };

  // do 20 rounds
  for (let round = 0; round < 20; round++) {
    // iterate over monkeys
    handleMonkey(0);
    handleMonkey(1);
    handleMonkey(2);
    handleMonkey(3);
    handleMonkey(4);
    handleMonkey(5);
    handleMonkey(6);
    handleMonkey(7);
  }

  const counts = monkeyState.map((monkey) => monkey.throws);
  const getTwoLargest = () => {
    let largestA = -1;
    let largestB = -1;

    counts.forEach((count) => {
      if (count > largestA) {
        largestB = largestA;
        largestA = count;
      } else if (count > largestB) {
        largestB = count;
      }
    });
    return largestA * largestB;
  };

  return getTwoLargest();
};

export const getMonkeyInspectionCount2 = () => {
  // count how many times each monkey inspected an item
  // multiply 2 largest numbers

  const monkeyState: BigMonkey[] = [
    {
      id: 0,
      items: [
        String(84),
        String(66),
        String(62),
        String(69),
        String(88),
        String(91),
        String(91),
      ],
      operation: (old: bigint) => old * BigInt(11),
      divisibleBy: 2,
      ifTrue: 4,
      ifFalse: 7,
      throws: 0,
    },
    {
      id: 1,
      items: [String(98), String(50), String(76), String(99)],
      operation: (old: bigint) => old * old,
      divisibleBy: 7,
      ifTrue: 3,
      ifFalse: 6,
      throws: 0,
    },
    {
      id: 2,
      items: [String(72), String(56), String(94)],
      operation: (old: bigint) => old + BigInt(1),
      divisibleBy: 13,
      ifTrue: 4,
      ifFalse: 0,
      throws: 0,
    },
    {
      id: 3,
      items: [
        String(55),
        String(88),
        String(90),
        String(77),
        String(60),
        String(67),
      ],
      operation: (old: bigint) => old + BigInt(2),
      divisibleBy: 3,
      ifTrue: 6,
      ifFalse: 5,
      throws: 0,
    },
    {
      id: 4,
      items: [
        String(69),
        String(72),
        String(63),
        String(60),
        String(72),
        String(52),
        String(63),
        String(78),
      ],
      operation: (old: bigint) => old * BigInt(13),
      divisibleBy: 19,
      ifTrue: 1,
      ifFalse: 7,
      throws: 0,
    },
    {
      id: 5,
      items: [String(89), String(73)],
      operation: (old: bigint) => old + BigInt(5),
      divisibleBy: 17,
      ifTrue: 2,
      ifFalse: 0,
      throws: 0,
    },
    {
      id: 6,
      items: [String(78), String(68), String(98), String(88), String(66)],
      operation: (old: bigint) => old + BigInt(6),
      divisibleBy: 11,
      ifTrue: 2,
      ifFalse: 5,
      throws: 0,
    },
    {
      id: 7,
      items: [String(70)],
      operation: (old: bigint) => old + BigInt(7),
      divisibleBy: 5,
      ifTrue: 1,
      ifFalse: 3,
      throws: 0,
    },
  ];

  const handleMonkey = (id: number) => {
    const currentMonkey = monkeyState[id];
    if (currentMonkey) {
      // inspect item
      // iterate over all items in monkey's hands
      currentMonkey?.items.forEach((currentItem) => {
        let item = BigInt(currentItem);
        // do operation
        item = currentMonkey.operation(item);
        if (item > BigInt(9699690)) {
          const c = item / BigInt(9699690);
          item = item - c * BigInt(9699690);
        }
        // test
        // throw based on test result
        if (item % BigInt(currentMonkey.divisibleBy) === BigInt(0)) {
          monkeyState[currentMonkey.ifTrue]?.items.push(String(item));
        } else {
          monkeyState[currentMonkey.ifFalse]?.items.push(String(item));
        }
        // @ts-expect-error
        monkeyState[id] = {
          ...monkeyState[id],
          // @ts-expect-error
          throws: monkeyState[id].throws + 1,
        };
      });

      // @ts-expect-error
      monkeyState[id] = {
        ...monkeyState[id],
        items: [],
      };
    }
  };

  // do 20 rounds
  for (let round = 0; round < 10000; round++) {
    // iterate over monkeys
    handleMonkey(0);
    handleMonkey(1);
    handleMonkey(2);
    handleMonkey(3);
    handleMonkey(4);
    handleMonkey(5);
    handleMonkey(6);
    handleMonkey(7);
  }

  const counts = monkeyState.map((monkey) => monkey.throws);
  const getTwoLargest = () => {
    let largestA = -1;
    let largestB = -1;

    counts.forEach((count) => {
      if (count > largestA) {
        largestB = largestA;
        largestA = count;
      } else if (count > largestB) {
        largestB = count;
      }
    });
    return largestA * largestB;
  };

  return getTwoLargest();
};
