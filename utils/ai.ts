import { OpenAI } from 'langchain/llms/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { PromptTemplate } from 'langchain/prompts';
import { RunnableSequence } from 'langchain/schema/runnable';

import zod from 'zod';

export const analyzeEntry = async (entry: string) => {
	const analysis = await chain.invoke({
		entry,
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
		summary: zod.string().describe('a brief summary of the whole entry.'),
		subject: zod.string().describe('the subject of the entry.'),
		sentiment: zod.string().describe('the mood of the entry.'),
		sentimentScore: zod
			.number()
			.describe(
				'mood of the entry rated on a scale from -10 to 10, where -10 is very negative and 10 is very positive.'
			),
		negative: zod
			.boolean()
			.describe(
				'is the entry negative? (e.g. does it have mostly negative emotions?).'
			),
		color: zod
			.string()
			.describe(
				'a hexidecimal color code that represents the mood of the entry.'
			),
	})
);

const prompt = PromptTemplate.fromTemplate(
	'Analyze the provided journal entry by determining a brief summary, a mood, a color representing its mood, and whether or not it has a negative sentiment. Always format your response to match the format instructions!\n{format_instructions}\n{entry}'
);

const chain = RunnableSequence.from([prompt, model, parser]);
