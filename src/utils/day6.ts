function hasDuplicates(array: string[]) {
  return new Set(array).size !== array.length;
}

export const getPacketMarker = (input: string[]) => {
  const length = input[0]?.length ?? 0;
  const code = input[0] ?? "";

  let result = 0;
  for (let i = 3; i < length; i++) {
    const smallArray = code.slice(i - 3, i + 1).split("");
    if (!hasDuplicates(smallArray)) {
      result = i + 1;
      break;
    }
  }

  return result;
};

export const getMessageMarker = (input: string[]) => {
  const length = input[0]?.length ?? 0;
  const code = input[0] ?? "";

  let result = 0;
  for (let i = 13; i < length; i++) {
    const smallArray = code.slice(i - 13, i + 1).split("");
    if (!hasDuplicates(smallArray)) {
      result = i + 1;
      break;
    }
  }

  return result;
};
