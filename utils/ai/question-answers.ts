import { JournalEntry } from '@prisma/client';
import { Document } from 'langchain/document';
import { OpenAI } from 'langchain/llms/openai';
import { loadQARefineChain } from 'langchain/chains';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PromptTemplate } from 'langchain/prompts';

const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
const embeddings = new OpenAIEmbeddings();

const questionPromptTemplateString = `Context information is below. 
-------------------------
{context}
-------------------------
The context information is my personal journal entries that I have written about my life. The information can come from various days.
I am going to ask you a question. Answer the provided question by considering all of my journal entries.
Do not answer questions that are not related to myself or my journal entries.
Never mention "context" in your answer! 

Answer the question: {question}`;

const questionPrompt = new PromptTemplate({
	inputVariables: ['context', 'question', 'currentDate'],
	template: questionPromptTemplateString,
});

const chain = loadQARefineChain(model, { questionPrompt });

export const askQuestionAgainstEntries = async (
	question: string,
	entries: Pick<JournalEntry, 'content' | 'createdAt' | 'id'>[]
) => {
	const documents = entries.map(
		(entry) =>
			new Document({
				pageContent: entry.content,
				metadata: {
					source: entry.id,
					date: entry.createdAt,
				},
			})
	);

	const vectorStore = await MemoryVectorStore.fromDocuments(
		documents,
		embeddings
	);

	const relatedDocuments = await vectorStore.similaritySearch(question, 5);

	const response = await chain.call({
		input_documents: relatedDocuments,
		question,
		currentDate: new Date().toLocaleDateString(),
	});

	return response.output_text;
};
