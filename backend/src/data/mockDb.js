import { v4 as uuid } from "uuid";

export const questions = [
  {
    id: uuid(),
    subject: "Java",
    topic: "OOP",
    type: "quiz",
    difficulty: "easy",
    questionText: "Which keyword is used for inheritance in Java?",
    options: ["extends", "implements", "inherits", "super"],
    correctAnswer: "extends",
    marks: 1,
    negativeMarks: 0.25
  },
  {
    id: uuid(),
    subject: "Java",
    topic: "Collections",
    type: "theory",
    difficulty: "medium",
    questionText: "Explain the difference between ArrayList and LinkedList.",
    options: [],
    correctAnswer: "",
    marks: 2,
    negativeMarks: 0
  },
  {
    id: uuid(),
    subject: "Python",
    topic: "Basics",
    type: "quiz",
    difficulty: "easy",
    questionText: "Which of these creates a list in Python?",
    options: ["{}", "()", "[]", "<>"],
    correctAnswer: "[]",
    marks: 1,
    negativeMarks: 0.25
  },
  {
    id: uuid(),
    subject: "Python",
    topic: "Functions",
    type: "coding",
    difficulty: "medium",
    questionText: "Write a function to return the factorial of a number.",
    options: [],
    correctAnswer: "",
    marks: 5,
    negativeMarks: 0
  },
  {
    id: uuid(),
    subject: "DSA",
    topic: "Arrays",
    type: "coding",
    difficulty: "medium",
    questionText: "Write a function to return the second largest element of an array.",
    options: [],
    correctAnswer: "",
    marks: 5,
    negativeMarks: 0
  },
  {
    id: uuid(),
    subject: "DSA",
    topic: "Sorting",
    type: "quiz",
    difficulty: "easy",
    questionText: "Which sorting algorithm has average O(n log n) complexity?",
    options: ["Bubble Sort", "Merge Sort", "Selection Sort", "Insertion Sort"],
    correctAnswer: "Merge Sort",
    marks: 1,
    negativeMarks: 0.25
  },
  {
    id: uuid(),
    subject: "Aptitude",
    topic: "Percentages",
    type: "quiz",
    difficulty: "easy",
    questionText: "A number increased by 20% becomes 120. What is the original number?",
    options: ["80", "90", "100", "110"],
    correctAnswer: "100",
    marks: 1,
    negativeMarks: 0.25
  },
  {
    id: uuid(),
    subject: "React",
    topic: "Hooks",
    type: "quiz",
    difficulty: "easy",
    questionText: "Which hook is used for local state in React?",
    options: ["useFetch", "useState", "useRoute", "useMemoize"],
    correctAnswer: "useState",
    marks: 1,
    negativeMarks: 0.25
  },
  {
    id: uuid(),
    subject: "Frontend",
    topic: "HTML",
    type: "quiz",
    difficulty: "easy",
    questionText: "Which tag is used to create a hyperlink?",
    options: ["<img>", "<a>", "<link>", "<script>"],
    correctAnswer: "<a>",
    marks: 1,
    negativeMarks: 0.25
  },
  {
    id: uuid(),
    subject: "Backend",
    topic: "HTTP",
    type: "theory",
    difficulty: "medium",
    questionText: "Explain the difference between PUT and PATCH methods.",
    options: [],
    correctAnswer: "",
    marks: 2,
    negativeMarks: 0
  },
  {
    id: uuid(),
    subject: "Backend",
    topic: "Node.js",
    type: "quiz",
    difficulty: "easy",
    questionText: "Which object provides environment variables in Node.js?",
    options: ["process.env", "global.env", "system.env", "node.env"],
    correctAnswer: "process.env",
    marks: 1,
    negativeMarks: 0.25
  },
  {
    id: uuid(),
    subject: "React",
    topic: "Component Design",
    type: "theory",
    difficulty: "medium",
    questionText: "What is prop drilling and how can context API help?",
    options: [],
    correctAnswer: "",
    marks: 3,
    negativeMarks: 0
  }
];

export const quizzes = [
  {
    id: uuid(),
    title: "Mixed Assessment - Level 1",
    durationMinutes: 30,
    negativeMarking: true,
    instructions: [
      "Read every question carefully before answering.",
      "Each correct answer gives +1 mark.",
      "Wrong answer gives -0.25 (negative marking).",
      "Use Prev and Next buttons to navigate.",
      "Click Submit on the final question to finish."
    ],
    questionIds: [
      questions[0].id,
      questions[2].id,
      questions[4].id,
      questions[6].id,
      questions[7].id,
      questions[8].id,
      questions[10].id
    ]
  },
  {
    id: uuid(),
    title: "Mixed Assessment - Level 2",
    durationMinutes: 40,
    negativeMarking: true,
    instructions: [
      "This quiz includes coding, theory and objective questions.",
      "Do not refresh the page during the attempt.",
      "Maximum 10 questions are allowed in one quiz.",
      "Submit on the last question to complete the quiz."
    ],
    questionIds: [
      questions[1].id,
      questions[3].id,
      questions[5].id,
      questions[9].id,
      questions[11].id
    ]
  }
];
