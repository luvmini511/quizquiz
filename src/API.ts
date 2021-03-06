import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export const fetchQuizQuestions = async (
  amount: number,
  diffculty: "easy" | "medium" | "hard"
) => {
  // ENDPOINT란 API가 서버에서 리소스에 접근할 수 있도록 가능하게 하는 URL
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&diffculty=${diffculty}&type=multiple`;
  // 먼저 fetch하는 걸 기다리고 다음 json 하는 걸 또 기다림
  const data = await (await fetch(endpoint)).json();
  console.log(data);
  return data.results.map((result: Question) => ({
    ...result,
    answers: shuffleArray([...result.incorrect_answers, result.correct_answer]),
  }));
};
