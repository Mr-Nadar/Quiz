import React, { useState } from "react";

const topics = [
	{ id: "gk", name: "General Knowledge" },
	{ id: "science", name: "Science" },
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
	],
};

function Quiz() {
	const [selectedTopic, setSelectedTopic] = useState("");
	const [current, setCurrent] = useState(0);
	const [score, setScore] = useState(0);
	const [showScore, setShowScore] = useState(false);

	const questions = selectedTopic ? questionsByTopic[selectedTopic] : [];

	const handleAnswer = (option) => {
		if (option === questions[current].answer) {
			setScore(score + 1);
		}
		const next = current +  1;
		if (next < questions.length) {
			setCurrent(next);
		} else {
			setShowScore(true);
		}
	};

	// Reset quiz when topic changes
	const handleTopicSelect = (topicId) => {
		setSelectedTopic(topicId);
		setCurrent(0);
		setScore(0);
		setShowScore(false);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-purple-800 to-pink-700">
			<div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8">
				{!selectedTopic ? (
					<div className="text-center">
						<h2 className="text-2xl font-bold mb-6">Select a Topic</h2>
						<div className="space-y-4">
							{topics.map((topic) => (
								<button
									key={topic.id}
									onClick={() => handleTopicSelect(topic.id)}
									className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
								>
									{topic.name}
								</button>
							))}
						</div>
					</div>
				) : !showScore ? (
					<div>
						<h3 className="text-xl font-semibold mb-6">
							Q{current + 1}: {questions[current].question}
						</h3>
						<div className="space-y-3">
							{questions[current].options.map((option, idx) => (
								<button
									key={idx}
									onClick={() => handleAnswer(option)}
									className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
								>
									{option}
								</button>
							))}
						</div>
					</div>
				) : (
					<div className="text-center">
						<h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
						<p className="text-lg">
							Your score: {score} / {questions.length}
						</p>
						<button
							className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
							onClick={() => setSelectedTopic("")}
						>
							Choose Another Topic
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Quiz;