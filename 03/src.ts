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

const createElvGroups = (rucksacksList: Rucksack[]): ElfGroup[] => {
  const elfGroups: ElfGroup[] = [];
  const elfGroupLenght = rucksacksList.length / 3;

  for (let i = 0; i < elfGroupLenght; i++) {
    const elfGroup: ElfGroup = [
      rucksacksList[i * 3],
      rucksacksList[i * 3 + 1],
      rucksacksList[i * 3 + 2],
    ];
    elfGroups.push(elfGroup);
  }

  return elfGroups;
};

const findCommonItemInElvGroup = (elfGroup: ElfGroup): string => {
  const firstElfRucksack = elfGroup[0].compartments[0].concat(
    elfGroup[0].compartments[1]
  );
  const secondElfRucksack = elfGroup[1].compartments[0].concat(
    elfGroup[1].compartments[1]
  );
  const thirdElfRucksack = elfGroup[2].compartments[0].concat(
    elfGroup[2].compartments[1]
  );

  const firstAndSecondElvesCommonItems: string[] = [];

  for (let i = 0; i < firstElfRucksack.length; i++) {
    const item = firstElfRucksack.charAt(i);
    if (secondElfRucksack.search(item) > -1) {
      firstAndSecondElvesCommonItems.push(item);
    }
  }

  for (let i = 0; i < firstAndSecondElvesCommonItems.length; i++) {
    const item = firstAndSecondElvesCommonItems[i];
    if (thirdElfRucksack.search(item) > -1) {
      return item;
    }
  }
};

const computeElfGroupPriority = (elfGroupsList: ElfGroup[]): number => {
  let totalPriority = 0;
  elfGroupsList.forEach((elfGroup) => {
    const item = findCommonItemInElvGroup(elfGroup);
    totalPriority += getItemPriority(item);
  });
  return totalPriority;
};

async function main() {
  const lines = await getLinesOfFile("03/input.txt");
  const rucksacksList = createRucksacksList(lines);
  const totalPriority = computeTotalLostItemPriorities(rucksacksList);
  console.log("Lost item priority", totalPriority);
  const ElvesGroups = createElvGroups(rucksacksList);
  const elvesGroupPriority = computeElfGroupPriority(ElvesGroups);
  console.log("Elves group priority", elvesGroupPriority);
}

main();
