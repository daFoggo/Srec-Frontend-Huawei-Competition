const emotion_overview = (() => {
  const emotions = {
    happy: Math.random(),
    sad: Math.random(),
    angry: Math.random(),
    fearful: Math.random(),
    disgusted: Math.random(),
    surprised: Math.random(),
    neutral: Math.random(),
  };
  const total = Object.values(emotions).reduce((sum, value) => sum + value, 0);
  Object.keys(emotions).forEach(
    (key) => (emotions[key] = (emotions[key] / total) * 100)
  );
  return emotions;
})();

export const candidateData = {
  id: 1,
  name: "John Smith",
  age: "25",
  experience:
    "2 years as Software Engineer at Google, focused on full-stack web development.",
  academic: "Bachelor's in Computer Science",
  major: "Software Engineering",
  matching_score: 0.9,
  email: "john.smith@gmail.com",
  skills: "Java, Python, React, Node.js",
  certification: "AWS Certified Solutions Architect",
  personality: "Analytical, Detail-oriented",
  language: "English (Native), Spanish (Intermediate)",
};

export const personalityTestData = {
  serious: 11.3,
  dependable: 34.7,
  extraverted: 30.7,
  lively: 20.4,
  responsible: 2.9,
};

export const codeAssessmentData = {
  overall_score: 2,
  problems: [
    {
      id: 1,
      problem_score: 1,
      clean_code_score: 75,
      feedback:
        "Code structure is clear and follows good practices, but could benefit from better modularization to improve maintainability. Good use of naming conventions, but indentation and spacing could be more consistent to enhance readability. Consider optimizing the loop logic to reduce time complexity, which can improve performance in large-scale data sets",
    },
    {
      id: 2,
      name: "Test case 2",
      problem_score: 1,
      clean_code_score: 84,
      feedback:
        "Excellent code structure with clear separation of concerns, making the code easy to follow and modify. Great use of comments and meaningful variable names. However, there are some redundant checks that can be removed to make the code more concise. You could refactor the function to avoid nested loops, which would improve execution speed and code simplicity.",
    },
    {
      id: 3,
      name: "Test case 3",
      problem_score: 0,
      clean_code_score: 78,
      feedback:
        "The overall structure is somewhat disorganized, making it harder to maintain and debug. Code readability is impacted by inconsistent naming and lack of comments explaining complex logic. Consider refactoring your conditional statements to avoid deep nesting, which makes the code harder to understand and maintain. Also, ensure the logic is sound to pass the test case.",
    },
  ],
};

export const virtualInterviewData = {
  interview_answers: [
    {
      id: 1,
      question: "Tell me about yourself",
      audio_transcript:
        "My name is Nguyen Truong Giang. I'm a second-year college student at PTIT, currently working as a fresher front-end developer at a research institute. I love learning new things, and I'm always eager to take on new challenges.",
      videoPath: "/src/assets/videos/VirtualInterview/question1.mp4",
    },
    {
      id: 2,
      question: "What are your strengths and weaknesses?",
      audio_transcript:
        "I'm a quick learner and always willing to take on new challenges. I'm very detail-oriented and ensure high-quality work. However, I tend to be a bit of a perfectionist, which can sometimes slow me down. Also, my learning process is often slower than others.",
      videoPath: "/src/assets/videos/VirtualInterview/question2.mp4",
    },
    {
      id: 3,
      question: "Where do you see yourself in 5 years?",
      audio_transcript:
        "In 5 years, I see myself as a senior software developer in Korea, leading a team of developers to create innovative and user-friendly applications. I also plan to continue learning and growing in my career, taking on new challenges and expanding my skill set.",
      videoPath: "/src/assets/videos/VirtualInterview/question3.mp4",
    },
  ],
  emotion_overview: emotion_overview,
  fluency_prediction: {
    high: 33.6,
    low: 44.2,
    intermediate: 22.2,
  },
};
