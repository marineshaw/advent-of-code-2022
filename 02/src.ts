import { getLinesOfFile } from "../utils/getLinesOfFile";

type RockPaperScissorsOppenent = "A" | "B" | "C";
type RockPaperScissorsMe = "X" | "Y" | "Z";

type Fight = {
  opponent: RockPaperScissorsOppenent;
  me: RockPaperScissorsMe;
};

const createFightList = (lines: string[]): Fight[] => {
  const fightList: Fight[] = [];
  lines.forEach((line) => {
    fightList.push({
      opponent: line.charAt(0) as RockPaperScissorsOppenent,
      me: line.charAt(2) as RockPaperScissorsMe,
    });
  });
  return fightList;
};

// First strategy

const rockPaperScissorsValue: Record<string, number> = { X: 1, Y: 2, Z: 3 };
const rockPaperScissorsOpponentValue: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
};

const firstStrategyFightResultMatrix = [
  [3, 0, 6],
  [6, 3, 0],
  [0, 6, 3],
];

const computeFightScoreFirstStrat = (fight: Fight): number => {
  const myValue = rockPaperScissorsValue[fight.me];
  const opponentValue = rockPaperScissorsOpponentValue[fight.opponent];
  const resultValue =
    firstStrategyFightResultMatrix[myValue - 1][opponentValue - 1];

  return myValue + resultValue;
};

// Second strategy

const fightResultValue: Record<string, number> = { X: 0, Y: 3, Z: 6 };

const secondStratRockPaperScissorsMatrix = [
  [3, 1, 2],
  [1, 2, 3],
  [2, 3, 1],
];

const computeFightScoreSecondStrat = (fight: Fight): number => {
  const myValue = rockPaperScissorsValue[fight.me];
  const opponentValue = rockPaperScissorsOpponentValue[fight.opponent];
  const choiceValue =
    secondStratRockPaperScissorsMatrix[myValue - 1][opponentValue - 1];

  return fightResultValue[fight.me] + choiceValue;
};

// Global

const computeTotalScore = (
  fightStrategy: Fight[],
  computeFunction: (fight: Fight) => number
): number => {
  let totalScore = 0;
  fightStrategy.forEach((fight) => {
    totalScore += computeFunction(fight);
  });
  return totalScore;
};

async function main() {
  const lines = await getLinesOfFile("02/input.txt");
  const fightList = createFightList(lines);
  const scoreFirstStrat = computeTotalScore(
    fightList,
    computeFightScoreFirstStrat
  );
  const scoreSecondStrat = computeTotalScore(
    fightList,
    computeFightScoreSecondStrat
  );
  console.log("Score with the first strategy", scoreFirstStrat);
  console.log("Score with the second strategy", scoreSecondStrat);
}

main();
