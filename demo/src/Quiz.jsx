import React, { useState } from "react";

const topics = [
	{ id: "gk", name: "General Knowledge" },
	{ id: "science", name: "Science" },
	{ id: "sports", name: "Sports" },
	{ id: "history", name: "History" },
];

const questionsByTopic = {
	gk: [
		{
			question: "What is the capital of France?",
			options: ["London", "Berlin", "Paris", "Madrid"],
			answer: "Paris",
		},
		{
			question: "Who wrote 'Hamlet'?",
			options: [
				"Charles Dickens",
				"William Shakespeare",
				"Mark Twain",
				"Jane Austen",
			],
			answer: "William Shakespeare",
		},
		{
			question: "Which is the largest ocean?",
			options: ["Atlantic", "Indian", "Pacific", "Arctic"],
			answer: "Pacific",
		},
		{
			question: "What is the currency of Japan?",
			options: ["Yuan", "Yen", "Won", "Dollar"],
			answer: "Yen",
		},
	],
	science: [
		{
			question: "Which planet is known as the Red Planet?",
			options: ["Earth", "Mars", "Jupiter", "Saturn"],
			answer: "Mars",
		},
		{
			question: "What is H2O commonly known as?",
			options: ["Oxygen", "Hydrogen", "Water", "Salt"],
			answer: "Water",
		},
		{
			question: "What gas do plants absorb from the atmosphere?",
			options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
			answer: "Carbon Dioxide",
		},
		{
			question: "What is the boiling point of water?",
			options: ["90°C", "100°C", "110°C", "120°C"],
			answer: "100°C",
		},
	],
	sports: [
		{
			question: "How many players are there in a football (soccer) team?",
			options: ["9", "10", "11", "12"],
			answer: "11",
		},
		{
			question: "Which country won the FIFA World Cup in 2018?",
			options: ["Brazil", "Germany", "France", "Argentina"],
			answer: "France",
		},
		{
			question: "In tennis, what is the term for a score of zero?",
			options: ["Love", "Ace", "Deuce", "Let"],
			answer: "Love",
		},
		{
			question: "Which sport uses a puck?",
			options: ["Cricket", "Hockey", "Baseball", "Basketball"],
			answer: "Hockey",
		},
	],
	history: [
		{
			question: "Who was the first President of the United States?",
			options: [
				"Abraham Lincoln",
				"George Washington",
				"John Adams",
				"Thomas Jefferson",
			],
			answer: "George Washington",
		},
		{
			question: "In which year did World War II end?",
			options: ["1942", "1945", "1948", "1950"],
			answer: "1945",
		},
		{
			question: "Which ancient civilization built the pyramids?",
			options: ["Greek", "Roman", "Egyptian", "Mayan"],
			answer: "Egyptian",
		},
		{
			question: "Who discovered America?",
			options: [
				"Christopher Columbus",
				"Vasco da Gama",
				"James Cook",
				"Marco Polo",
			],
			answer: "Christopher Columbus",
		},
	],
};

function Quiz() {
	const [selectedTopic, setSelectedTopic] = useState("");
	const [current, setCurrent] = useState(0);
	const [answers, setAnswers] = useState([]);
	const [showScore, setShowScore] = useState(false);

	if (!selectedTopic) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-purple-800 to-pink-700">
				<div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
					<h2 className="text-2xl font-bold mb-6 text-center">
						Choose a Topic
					</h2>
					<div className="flex flex-col gap-4">
						{topics.map((topic) => (
							<button
								key={topic.id}
								onClick={() => setSelectedTopic(topic.id)}
								className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
							>
								{topic.name}
							</button>
						))}
					</div>
				</div>
			</div>
		);
	}

	const questions = questionsByTopic[selectedTopic];

	const handleAnswer = (option) => {
		const newAnswers = [...answers];
		newAnswers[current] = option;
		setAnswers(newAnswers);
	};

	const handleNext = () => {
		if (current < questions.length - 1) {
			setCurrent(current + 1);
		} else {
			setShowScore(true);
			// Save result to leaderboard
			const user = JSON.parse(localStorage.getItem("user"));
			if (user) {
				const score = answers.filter(
					(ans, idx) => ans === questions[idx].answer
				).length;
				const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
				leaderboard.push({
					name: user.name || user.email,
					email: user.email,
					score,
					total: questions.length,
					topic: selectedTopic,
					date: new Date().toISOString(),
				});
				localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
			}
		}
	};

	const handleBack = () => {
		if (current > 0) setCurrent(current - 1);
	};

	const handleRestart = () => {
		setAnswers([]);
		setCurrent(0);
		setShowScore(false);
		setSelectedTopic("");
	};

	if (showScore) {
		const score = answers.filter(
			(ans, idx) => ans === questions[idx].answer
		).length;
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-purple-800 to-pink-700">
				<div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
					<h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
					<p className="text-lg mb-4">
						Your score:{" "}
						<span className="font-bold">
							{score} / {questions.length}
						</span>
					</p>
					<button
						onClick={handleRestart}
						className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
					>
						Try Another Topic
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-purple-800 to-pink-700">
			<div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
				<h3 className="text-xl font-semibold mb-6">
					Q{current + 1}: {questions[current].question}
				</h3>
				<div className="space-y-3 mb-6">
					{questions[current].options.map((option, idx) => (
						<button
							key={idx}
							onClick={() => handleAnswer(option)}
							className={`w-full px-4 py-2 rounded-lg transition
                ${
					answers[current] === option
						? "bg-blue-600 text-white font-bold"
						: "bg-blue-100 text-blue-700 hover:bg-blue-200"
				}
              `}
						>
							{option}
						</button>
					))}
				</div>
				<div className="flex justify-between">
					<button
						onClick={handleBack}
						disabled={current === 0}
						className={`px-4 py-2 rounded-lg font-semibold transition
              ${
					current === 0
						? "bg-gray-300 text-gray-500 cursor-not-allowed"
						: "bg-blue-500 text-white hover:bg-blue-600"
				}
            `}
					>
						Back
					</button>
					<button
						onClick={handleNext}
						disabled={answers[current] == null}
						className={`px-4 py-2 rounded-lg font-semibold transition
              ${
					answers[current] == null
						? "bg-gray-300 text-gray-500 cursor-not-allowed"
						: "bg-blue-500 text-white hover:bg-blue-600"
				}
            `}
					>
						{current === questions.length - 1 ? "Finish" : "Next"}
					</button>
				</div>
				<div className="mt-4 text-sm text-gray-500 text-center">
					Question {current + 1} of {questions.length}
				</div>
			</div>
		</div>
	);
}

export default Quiz;