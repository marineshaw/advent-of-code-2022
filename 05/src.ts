import { getLinesOfFile } from "../utils/getLinesOfFile";

type Stack = string[];

type Ship = Stack[];

type Movement = {
  startingStackIndex: number;
  endingStackIndex: number;
  numberOfCrates: number;
};

const createShipAndMovementList = (
  lines: string[]
): { ship: Ship; movementsList: Movement[] } => {
  const separator = lines.indexOf("");
  const shipLength = (lines[separator - 1].length + 1) / 4;
  const shipLines = lines.slice(0, separator - 1);
  const movementsLines = lines.slice(separator + 1);

  const ship: Ship = [];
  const movementsList: Movement[] = [];

  for (let i = 0; i < shipLength; i++) {
    const stack: Stack = [];
    shipLines.forEach((line) => {
      const crate = line.charAt(i * 4 + 1);
      if (crate != " ") stack.push(crate);
    });
    ship.push(stack);
  }

  movementsLines.forEach((line) => {
    const lineList = line.split(" ");
    const movement: Movement = {
      numberOfCrates: parseInt(lineList[1]),
      startingStackIndex: parseInt(lineList[3]),
      endingStackIndex: parseInt(lineList[5]),
    };
    movementsList.push(movement);
  });

  return { ship, movementsList };
};

const getTopStack = (ship: Ship): string => {
  let result = "";
  ship.forEach((stack) => {
    result += stack[0];
  });
  return result;
};

const performMovements = ({
  ship,
  movementsList,
}: {
  ship: Ship;
  movementsList: Movement[];
}): Ship => {
  const finalShip = ship;
  movementsList.forEach((movement) => {
    for (let i = 0; i < movement.numberOfCrates; i++) {
      const crateToMove = finalShip[movement.startingStackIndex - 1].shift();
      finalShip[movement.endingStackIndex - 1].unshift(crateToMove);
    }
  });
  return finalShip;
};

const performMovementsWithCrateMover9001 = ({
  ship,
  movementsList,
}: {
  ship: Ship;
  movementsList: Movement[];
}): Ship => {
  const finalShip = ship;
  movementsList.forEach((movement) => {
    const startingStack = finalShip[movement.startingStackIndex - 1];
    const stacksToMove = startingStack.slice(0, movement.numberOfCrates);
    finalShip[movement.startingStackIndex - 1] = startingStack.slice(
      movement.numberOfCrates
    );
    finalShip[movement.endingStackIndex - 1] = stacksToMove.concat(
      finalShip[movement.endingStackIndex - 1]
    );
  });
  return finalShip;
};

async function main() {
  const lines = await getLinesOfFile("05/input.txt");
  const { ship, movementsList } = createShipAndMovementList(lines);
  const initialTop = getTopStack(ship);
  console.log("initial top", initialTop);
  const shipAfterMovements = performMovements({
    ship,
    movementsList,
  });
  const topAfterMovements = getTopStack(shipAfterMovements);
  console.log({ topAfterMovements });
  const { ship: newShip, movementsList: newMovementsList } =
    createShipAndMovementList(lines);
  const shipAfterMovementsWith9001 = performMovementsWithCrateMover9001({
    ship: newShip,
    movementsList: newMovementsList,
  });
  const topAfterMovementsWith9001 = getTopStack(shipAfterMovementsWith9001);
  console.log({ topAfterMovementsWith9001 });
}

main();
