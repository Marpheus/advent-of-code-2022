import Head from "next/head";
import fs from "fs";
import readline from "readline";
import React from "react";

type Props = {
  day1Input: string[];
  day2Input: string[];
};
const Home = (props: Props) => {
  const getArrayOfCalories = () => {
    const caloriesGroups: number[] = [];
    let counter = 0;
    props.day1Input.forEach((e: string) => {
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
  const countMostCalories = () => {
    return Math.max(...getArrayOfCalories());
  };

  const count3MostCalories = () => {
    return getArrayOfCalories()
      .sort(function (a, b) {
        return b - a;
      })
      .slice(0, 3)
      .reduce((acc, value) => {
        return acc + value;
      }, 0);
  };

  const countRPSScore = () => {
    let score = 0;
    props.day2Input.forEach((e: string) => {
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

  const countRPSScoreCorrectly = () => {
    let score = 0;
    props.day2Input.forEach((e: string) => {
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

  const day1Answer1 = countMostCalories();
  const day1Answer2 = count3MostCalories();
  const day2Answer1 = countRPSScore();
  const day2Answer2 = countRPSScoreCorrectly();
  return (
    <>
      <Head>
        <title>Advent of Code</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Advent of <span className="text-[hsl(280,100%,70%)]">Code</span>
          </h1>
        </div>
        <div className="container flex flex-col">
          <p className="pb-2 pt-2 text-2xl tracking-tight text-white">
            <span>Day 1, part 1: </span>
            <span>{day1Answer1}</span>
          </p>
          <p className="pb-2 pt-2  text-2xl tracking-tight text-white">
            <span>Day 1, part 2: </span>
            <span>{day1Answer2}</span>
          </p>
          <hr />
          <p className="pb-2 pt-2 text-2xl tracking-tight text-white">
            <span>Day 2, part 1: </span>
            <span>{day2Answer1}</span>
          </p>
          <p className="pb-2 pt-2 text-2xl tracking-tight text-white">
            <span>Day 2, part 2: </span>
            <span>{day2Answer2}</span>
          </p>
          <hr />
        </div>
      </main>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const loadInputFile = async (filePath: string) => {
    const input: string[] = [];
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity,
    });
    rl.on("line", (line) => {
      input.push(line);
    });

    await new Promise((res) => rl.once("close", res));
    return input;
  };
  const day1Input: string[] = await loadInputFile("./src/inputs/day1.input");
  const day2Input: string[] = await loadInputFile("./src/inputs/day2.input");

  return {
    props: {
      day1Input: day1Input,
      day2Input: day2Input,
    },
  };
}
