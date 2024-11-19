import { UserSession } from "@/models/CodeAssessment/type";

export const codingProblems = [
  {
    id: 1,
    source: "LeetCode",
    name: "Reverse Integer",
    description:
      "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.",
    input: "x = 123",
    output: "321",
    constraints: "-2^31 <= x <= 2^31 - 1",
    example: "Input: x = 123 | Output: 321",
    explanation:
      "Reversing the digits of 123 gives 321. Note that 321 fits within the 32-bit integer range.",
    public_input: "x = 123",
    public_output: "321",
    gen_input: "x = -456",
    gen_output: "-654",
    difficulty: 1,
    second: 1,
    nano: 1000000,
    memory_limit_bytes: 65536,
  },
  {
    id: 2,
    source: "LeetCode",
    name: "Longest Substring Without Repeating Characters",
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
    input: 's = "abcabcbb"',
    output: "3",
    constraints:
      "0 <= s.length <= 5 * 10^4, s consists of English letters, digits, symbols and spaces.",
    example: 'Input: s = "abcabcbb" | Output: 3',
    explanation: 'The answer is "abc", with the length of 3.',
    public_input: 's = "abcabcbb"',
    public_output: "3",
    gen_input: 's = "pwwkew"',
    gen_output: "3",
    difficulty: 2,
    second: 1,
    nano: 1000000,
    memory_limit_bytes: 65536,
  },
  {
    id: 3,
    source: "LeetCode",
    name: "3Sum",
    description:
      "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
    input: "nums = [-1,0,1,2,-1,-4]",
    output: "[[-1,-1,2],[-1,0,1]]",
    constraints: "-10^4 <= nums[i] <= 10^4, 0 <= nums.length <= 3000",
    example: "Input: nums = [-1,0,1,2,-1,-4] | Output: [[-1,-1,2],[-1,0,1]]",
    explanation: "The triplets are [-1, 0, 1] and [-1, -1, 2].",
    public_input: "nums = [-1,0,1,2,-1,-4]",
    public_output: "[[-1,-1,2],[-1,0,1]]",
    gen_input: "nums = [0,0,0]",
    gen_output: "[[0,0,0]]",
    difficulty: 2,
    second: 1,
    nano: 1000000,
    memory_limit_bytes: 65536,
  },
];

export const initialUserSessions: UserSession[] = codingProblems.map(
  (problem) => ({
    problemId: problem.id,
    code: "",
    language: "python",
    status: "not-started",
  })
);
