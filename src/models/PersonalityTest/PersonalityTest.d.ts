export interface IPersonalityQuestionProps {
    question: IPersonalityQuestion;
    onAnswer: (value: number) => void;
    currentValue: Number;
}

export interface IPersonalityQuestion {
    id: Number;
    code: String;
    question: String;
}
