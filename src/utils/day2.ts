export const countRPSScore = (input: string[]) => {
  let score = 0;
  input.forEach((e: string) => {
    const opponent = e.slice(0, 1);
    const me = e.slice(2, 3);

    let tmpScore = 0;
    if (me === "Y") {
      tmpScore += 2;
      if (opponent === "B") {
        tmpScore += 3;
      }
      if (opponent === "A") {
        tmpScore += 6;
      }
    }
    if (me === "X") {
      tmpScore += 1;
      if (opponent === "A") {
        tmpScore += 3;
      }
      if (opponent === "C") {
        tmpScore += 6;
      }
    }
    if (me === "Z") {
      tmpScore += 3;
      if (opponent === "C") {
        tmpScore += 3;
      }
      if (opponent === "B") {
        tmpScore += 6;
      }
    }
    score += tmpScore;
  });
  return score;
};

export const countRPSScoreCorrectly = (input: string[]) => {
  let score = 0;
  input.forEach((e: string) => {
    const opponent = e.slice(0, 1);
    const me = e.slice(2, 3);

    let tmpScore = 0;
    if (opponent === "A") {
      if (me === "X") {
        tmpScore += 3;
      }
      if (me === "Y") {
        tmpScore += 1;
        tmpScore += 3;
      }
      if (me === "Z") {
        tmpScore += 2;
        tmpScore += 6;
      }
    }
    if (opponent === "B") {
      if (me === "X") {
        tmpScore += 1;
      }
      if (me === "Y") {
        tmpScore += 2;
        tmpScore += 3;
      }
      if (me === "Z") {
        tmpScore += 3;
        tmpScore += 6;
      }
    }
    if (opponent === "C") {
      if (me === "X") {
        tmpScore += 2;
      }
      if (me === "Y") {
        tmpScore += 3;
        tmpScore += 3;
      }
      if (me === "Z") {
        tmpScore += 1;
        tmpScore += 6;
      }
    }
    score += tmpScore;
  });
  return score;
};
