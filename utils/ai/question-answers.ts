import { JournalEntry } from '@prisma/client';
import { Document } from 'langchain/document';
import { OpenAI } from 'langchain/llms/openai';
import { loadQARefineChain } from 'langchain/chains';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';

const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
const chain = loadQARefineChain(model);
const embeddings = new OpenAIEmbeddings();

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

	const relatedDocuments = await vectorStore.similaritySearch(question);

	const response = await chain.call({
		input_documents: relatedDocuments,
		question,
	});

	return response.output_text;
};
