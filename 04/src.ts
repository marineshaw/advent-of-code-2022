import { getLinesOfFile } from "../utils/getLinesOfFile";

interface Assignment {
  beginningSection: number;
  endingSection: number;
}

type ElfPair = [Assignment, Assignment];

const createElfPairsList = (lines: string[]): ElfPair[] => {
  const elfPair: ElfPair[] = [];
  lines.forEach((line) => {
    const elvesStringList = line.split(",");
    const firstElfStringList = elvesStringList[0].split("-");
    const firstElf: Assignment = {
      beginningSection: parseInt(firstElfStringList[0]),
      endingSection: parseInt(firstElfStringList[1]),
    };
    const secondElfStringList = elvesStringList[1].split("-");
    const secondElf: Assignment = {
      beginningSection: parseInt(secondElfStringList[0]),
      endingSection: parseInt(secondElfStringList[1]),
    };

    elfPair.push([firstElf, secondElf]);
  });
  return elfPair;
};

const countUselessPairs = (elfPairsList: ElfPair[]): number => {
  let total = 0;
  elfPairsList.forEach((elfPair) => {
    const firstElf = elfPair[0];
    const secondElf = elfPair[1];
    if (
      firstElf.beginningSection <= secondElf.beginningSection &&
      firstElf.endingSection >= secondElf.endingSection
    ) {
      total += 1;
    } else if (
      secondElf.beginningSection <= firstElf.beginningSection &&
      secondElf.endingSection >= firstElf.endingSection
    ) {
      total += 1;
    }
  });
  return total;
};

const countLessUselessPairs = (elfPairsList: ElfPair[]): number => {
  let total = 0;
  elfPairsList.forEach((elfPair) => {
    const firstElf = elfPair[0];
    const secondElf = elfPair[1];
    if (
      firstElf.beginningSection <= secondElf.endingSection &&
      firstElf.endingSection >= secondElf.beginningSection
    ) {
      total += 1;
    }
  });
  return total;
};

async function main() {
  const lines = await getLinesOfFile("04/input.txt");
  const elfPairs = createElfPairsList(lines);
  const uselessPairsCount = countUselessPairs(elfPairs);
  console.log("useless", uselessPairsCount);
  const lessUselessPairsCount = countLessUselessPairs(elfPairs);
  console.log("less useless", lessUselessPairsCount);
}

main();
