import { IQuestionQuery } from "./IQuestion";

interface IRoomQuery {
  title: string;
  authorID: string;

  questions: IQuestionQuery[];
}

export type { IRoomQuery };
