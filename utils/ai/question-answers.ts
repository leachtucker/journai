import { JournalEntry } from '@prisma/client';
import { Document } from 'langchain/document';
import { OpenAI } from 'langchain/llms/openai';
import { loadQARefineChain } from 'langchain/chains';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PromptTemplate } from 'langchain/prompts';

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

const refinePromptTemplateString = `The original question is as follows: {question}
We have provided an existing answer: {existing_answer}
We have the opportunity to refine the existing answer
(only if needed) with some more context below.
------------
{context}
------------
Given the new context, refine the original answer to better answer the question.
You must provide a response which is either the original answer or refined answer.`;

const refinePrompt = new PromptTemplate({
	inputVariables: ['question', 'existing_answer', 'context'],
	template: refinePromptTemplateString,
});

export const askQuestionAgainstEntries = async (
	question: string,
	entries: Pick<JournalEntry, 'content' | 'createdAt' | 'id'>[]
) => {
	const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
	const embeddings = new OpenAIEmbeddings();
	const chain = loadQARefineChain(model, { questionPrompt, refinePrompt });

	// setup llm docs and embeddings
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

	// find related documents, then refine the output based on those docs
	const relatedDocuments = await vectorStore.similaritySearch(question, 2);
	const response = await chain.call({
		input_documents: relatedDocuments,
		question,
		currentDate: new Date().toLocaleDateString(),
	});

	return response.output_text;
};
