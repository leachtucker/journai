'use client';

import React from 'react';

import { getAnswer } from '@/api/ai.api';
import useAsyncEffectWithLoading from './hooks/useAsyncEffectWithLoading';

const Prompt = () => {
	const [questionValue, setQuestionValue] = React.useState('');
	const [answer, setAnswer] = React.useState('');

	const getAndSetAnswer = () => {
		return getAnswer({ question: questionValue }).then((data) => {
			setAnswer(data);
			setQuestionValue('');
		});
	};

	const getAnswerEffect = useAsyncEffectWithLoading({
		effect: getAndSetAnswer,
	});

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		getAnswerEffect.run();
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="w-full relative">
					<label htmlFor="question-input" className="text-lg hidden">
						Ask your journal a question:
					</label>
					<input
						type="text"
						id="question-input"
						value={questionValue}
						onChange={(e) => setQuestionValue(e.target.value)}
						disabled={getAnswerEffect.isLoading}
						placeholder="Ask your journal a question!"
						className="border border-black/10 px-4 py-2 flex-1 outline-indigo-600 rounded disabled:opacity-50 w-full"
					/>
					<button
						type="submit"
						className="bg-indigo-600 shadow-sm text-white px-4 py-2 rounded-r w-[100px] disabled:opacity-50 absolute top-0 right-0"
						disabled={!questionValue || getAnswerEffect.isLoading}
					>
						Enter
					</button>
				</div>

				<div className="border-b border-black/10 my-4" />

				<div className="w-full bg-black/10 rounded-lg px-4 py-2">
					<span className="text font-semibold mr-1">Answer:</span>
					{answer && !getAnswerEffect.isLoading ? <span>{answer}</span> : null}
					{getAnswerEffect.isLoading ? (
						<span className="animate-pulse">Thinking...</span>
					) : null}
				</div>
			</form>
		</>
	);
};

export default Prompt;
