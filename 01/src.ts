import { getLinesOfFile } from "../utils/getLinesOfFile";

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

const findMaxCalories = (elvesList: Elf[]): number => {
  let maxCalories: number = 0;
  elvesList.forEach((elf) => {
    let totalCalories = 0;
    elf.food.forEach((foodpack) => {
      totalCalories += foodpack;
    });
    maxCalories = totalCalories > maxCalories ? totalCalories : maxCalories;
  });
  return maxCalories;
};

async function main() {
  const lines = await getLinesOfFile("01/input.txt");
  const elvesList = createElvesList(lines);
  const maxCalories = findMaxCalories(elvesList);
  console.log(maxCalories);
}

main();
