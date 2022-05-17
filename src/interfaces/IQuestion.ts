interface likes {
  userID: string;
}

interface IQuestionInsert {
  author: { name: string; avatar: string };
  content: string;
  isHighlighted?: boolean;
  isAnswered?: boolean;
}

interface IQuestionQuery {
  id: string;
  author: { name: string; avatar: string };
  content: string;
  likes: likes[];
  isHighlighted: boolean;
  isAnswered: boolean;
}

export type { IQuestionInsert, IQuestionQuery };

// Criar variação de insert e receive
