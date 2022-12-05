import { getLinesOfFile } from "../utils/getLinesOfFile";
import { deleteIndex } from "../utils/lists/deleteIndex";

interface Elf {
  food: number[];
}

const createElvesList = (lines: string[]): Elf[] => {
  const elvesList: Elf[] = [{ food: [] }];
  let lastIndex = elvesList.length;
  lines.forEach((line) => {
    if (line === "") {
      elvesList.push({ food: [] });
    } else {
      lastIndex = elvesList.length;
      elvesList[lastIndex - 1].food.push(parseInt(line));
    }
  });
  return elvesList;
};

const findMaxCalories = (
  elvesList: Elf[]
): { calories: number; elfIndex: number } => {
  let maxCalories: number = 0;
  let elfWithMaxCalories: number = 0;
  elvesList.forEach((elf, index) => {
    let totalCalories = 0;
    elf.food.forEach((foodpack) => {
      totalCalories += foodpack;
    });
    const isNewMax = totalCalories > maxCalories;
    maxCalories = isNewMax ? totalCalories : maxCalories;
    elfWithMaxCalories = isNewMax ? index : elfWithMaxCalories;
  });
  return { calories: maxCalories, elfIndex: elfWithMaxCalories };
};

const findMaxCaloriesOfThreeElves = (elvesList: Elf[]): number => {
  const { calories: firstMaxCalories, elfIndex: firstElf } =
    findMaxCalories(elvesList);
  const elvesListWithoutFirstElf = deleteIndex({
    list: elvesList,
    index: firstElf,
  });
  const { calories: secondMaxCalories, elfIndex: secondElf } = findMaxCalories(
    elvesListWithoutFirstElf
  );
  const elvesListWithoutTwoFirstElves = deleteIndex({
    list: elvesListWithoutFirstElf,
    index: secondElf,
  });
  const { calories: thirdMaxCalories } = findMaxCalories(
    elvesListWithoutTwoFirstElves
  );

  return firstMaxCalories + secondMaxCalories + thirdMaxCalories;
};

async function main() {
  const lines = await getLinesOfFile("01/input.txt");
  const elvesList = createElvesList(lines);
  const maxCalories = findMaxCalories(elvesList);
  console.log("Max calories for an elv:", maxCalories.calories);

  const maxCaloriesWithThreeElves = findMaxCaloriesOfThreeElves(elvesList);
  console.log("Max calories for three elves:", maxCaloriesWithThreeElves);
}

main();
