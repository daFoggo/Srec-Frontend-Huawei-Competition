import { UserSession } from "@/models/CodeAssessment/CodeAssessment";

export const codingProblems = [
  {
    id: 1,
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
    ],
  },
  {
    id: 2,
    title: "Palindrome Number",
    description:
      "Given an integer x, return true if x is a palindrome, and false otherwise.",
    examples: [
      {
        input: "x = 121",
        output: "true",
        explanation:
          "121 reads as 121 from left to right and from right to left.",
      },
    ],
  },
  {
    id: 3,
    title: "Fibonacci Number",
    description:
      "The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. Given n, calculate F(n).",
    examples: [
      {
        input: "n = 4",
        output: "3",
        explanation: "F(4) = F(3) + F(2) = 2 + 1 = 3.",
      },
    ],
  },
];

export const initialUserSessions: UserSession[] = codingProblems.map(problem => ({
    problemId: problem.id,
    code: '',
    language: 'python',
    status: 'not-started',
  }));
