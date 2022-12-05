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

const rockPaperScissorsValue: Record<string, number> = { X: 1, Y: 2, Z: 3 };
const rockPaperScissorsOpponentValue: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
};

const fightResultMatrix = [
  [3, 0, 6],
  [6, 3, 0],
  [0, 6, 3],
];

const computeFightScoreFirstStrat = (fight: Fight): number => {
  const resultValue =
    fightResultMatrix[rockPaperScissorsValue[fight.me] - 1][
      rockPaperScissorsOpponentValue[fight.opponent] - 1
    ];

  return rockPaperScissorsValue[fight.me] + resultValue;
};

const computeTotalScore = (fightStrategy: Fight[]): number => {
  let totalScore = 0;
  fightStrategy.forEach((fight) => {
    totalScore += computeFightScoreFirstStrat(fight);
  });
  return totalScore;
};

async function main() {
  const lines = await getLinesOfFile("02/input.txt");
  const fightList = createFightList(lines);
  const firstScore = computeFightScoreFirstStrat(fightList[0]);
  console.log(firstScore);
  const score = computeTotalScore(fightList);
  console.log("Score", score);
}

main();
