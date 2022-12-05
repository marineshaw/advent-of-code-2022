import { getLinesOfFile } from "../utils/getLinesOfFile";

type Rucksack = {
  compartments: [string, string];
};

type ElfGroup = [Rucksack, Rucksack, Rucksack];

const createRucksacksList = (lines: string[]): Rucksack[] => {
  const rucksacksList: Rucksack[] = [];

  lines.forEach((line) => {
    const compartmentLength = line.length / 2;
    const compartments: [string, string] = [
      line.slice(0, compartmentLength),
      line.slice(compartmentLength),
    ];
    rucksacksList.push({ compartments });
  });

  return rucksacksList;
};

const findLostItem = (rucksack: Rucksack): string => {
  const firstCompartment = rucksack.compartments[0];
  const secondCompartment = rucksack.compartments[1];
  for (let i = 0; i < firstCompartment.length; i++) {
    const item = firstCompartment.charAt(i);
    if (secondCompartment.search(item) > -1) {
      return item;
    }
  }
  return "";
};

const getItemPriority = (item: string): number => {
  if (item === "") return 0;
  const orderedItemList =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return orderedItemList.indexOf(item) + 1;
};

const computeTotalLostItemPriorities = (rucksacksList: Rucksack[]): number => {
  let total = 0;

  rucksacksList.forEach((rucksack) => {
    const lostItem = findLostItem(rucksack);
    total += getItemPriority(lostItem);
  });

  return total;
};

async function main() {
  const lines = await getLinesOfFile("03/input.txt");
  const rucksacksList = createRucksacksList(lines);
  const totalPriority = computeTotalLostItemPriorities(rucksacksList);
  console.log(totalPriority);
}

main();
