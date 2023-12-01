import { OpenAI } from 'langchain/llms/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { PromptTemplate } from 'langchain/prompts';
import { RunnableSequence } from 'langchain/schema/runnable';

import zod from 'zod';

export const analyzeEntry = async (entry: string) => {
	const analysis = await chain.invoke({
		entry:
			'Today, was my birthday. I spent time with my friends and family, which is great. Later in the day, I got errands done. I felt productive. It was all great until my cat ran away... still waiting to find him',
		format_instructions: parser.getFormatInstructions(),
	});

	return analysis;
};

const model = new OpenAI({
	temperature: 0,
	modelName: 'gpt-3.5-turbo',
});

const parser = StructuredOutputParser.fromZodSchema(
	zod.object({
		summary: zod.string().describe('summary to the provided entry'),
		sentiment: zod.string().describe('sentiment to the provided entry'),
		negative: zod.boolean().describe('negative to the provided entry'),
		color: zod.string().describe('color to the provided entry'),
	})
);

const chain = RunnableSequence.from([
	PromptTemplate.fromTemplate(
		'Analyze the provided journal entry by determining a brief summary, a sentiment, a color representing its sentiment, and whether or not it has a negative sentiment.\n{format_instructions}\n{entry}'
	),
	model,
	parser,
]);
