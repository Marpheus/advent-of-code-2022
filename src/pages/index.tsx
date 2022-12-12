import Head from "next/head";
import fs from "fs";
import readline from "readline";
import React from "react";

type Props = {
  day1Input: string[];
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

  const day1Answer1 = countMostCalories();
  const day1Answer2 = count3MostCalories();
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
          <p className="text-2xl tracking-tight text-white">
            <span>Day 1, part 1: </span>
            <span>{day1Answer1}</span>
          </p>
          <p className="text-2xl tracking-tight text-white">
            <span>Day 1, part 2: </span>
            <span>{day1Answer2}</span>
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const day1Input: string[] = [];
  const rl = readline.createInterface({
    input: fs.createReadStream("./src/inputs/day1.input"),
    crlfDelay: Infinity,
  });
  rl.on("line", (line) => {
    day1Input.push(line);
  });

  await new Promise((res) => rl.once("close", res));
  return {
    props: {
      day1Input: day1Input,
    },
  };
}
