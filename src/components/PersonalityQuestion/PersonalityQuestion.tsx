import { IPersonalityQuestionProps } from "@/models/PersonalityTest/PersonalityTest";

export default function PersonalityQuestion({
  question,
  onAnswer,
  currentValue,
}: IPersonalityQuestionProps) {
  const options = [-3, -2, -1, 0, 1, 2, 3];

  const getButtonSize = (value: number) => {
    const baseSize = 32; 
    const increment = 4; 
    const size = baseSize + Math.abs(value) * increment;
    return `${size}px`;
  };

  return (
    <div className="my-6 sm:my-8 font-inter">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center px-2">
        {question.question}
      </h3>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <span className="text-violet-500 font-medium text-sm sm:text-base order-2 sm:order-1">
          Disagree
        </span>
        <div className="flex gap-2 sm:gap-4 order-1 sm:order-2 items-center">
          {options.map((value) => (
            <button
              key={value}
              onClick={() => onAnswer(value)}
              style={{
                width: getButtonSize(value),
                height: getButtonSize(value),
              }}
              className={`rounded-full border-2 transition-all ${
                currentValue === value
                  ? value > 0
                    ? "border-rocken-blue-500 bg-rocken-blue-500"
                    : value < 0
                    ? "border-violet-500 bg-violet-500"
                    : "border-gray-400 bg-gray-400"
                  : value > 0
                  ? "border-rocken-blue-500"
                  : value < 0
                  ? "border-violet-500"
                  : "border-gray-400"
              }`}
            />
          ))}
        </div>
        <span className="text-rocken-blue-500 font-medium text-sm sm:text-base order-3">
          Agree
        </span>
      </div>
    </div>
  );
}