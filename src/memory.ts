import { JSONFilePreset } from 'lowdb/node';
import type { AIMessage } from './ai';
import { v4 as uuid } from 'uuid';
import { summarizeMessages } from './llm';

type Data = {
    messages: MessageWithMetadata[];
    summary: string;
};

const defaultData: Data = {
    messages: [],
    summary: '',
};

async function getDb() {
    return JSONFilePreset<Data>('db.json', defaultData);
}

const lastMessagesCount = 6;

export async function addMessages(messages: AIMessage[]) {
    const db = await getDb();
    db.data.messages.push(...messages.map(addMetadata));

    if (db.data.messages.length > lastMessagesCount) {
        const oldestMessages = db.data.messages
            .slice(0, lastMessagesCount)
            .map(removeMetadata);
        const summary = await summarizeMessages(oldestMessages);
        db.data.summary = summary;
    }

    await db.write();
}

export async function addMessage(message: AIMessage) {
    await addMessages([message]);
}

export async function getMessages(): Promise<AIMessage[]> {
    const db = await getDb();
    const messages = await db.data.messages.map(removeMetadata);
    const lastMessages = messages.slice(-lastMessagesCount);

    if (lastMessages[0]?.role === 'tool') {
        const prevMessage = messages[messages.length - lastMessagesCount - 1];
        if (prevMessage) {
            return [prevMessage, ...lastMessages];
        }
    }

    return lastMessages;
}

export const getSummary = async () => {
    const db = await getDb();
    return db.data.summary;
};

type MessageWithMetadata = AIMessage & {
    id: string;
    createdAt: string;
};

function addMetadata(message: AIMessage): MessageWithMetadata {
    return {
        ...message,
        id: uuid(),
        createdAt: new Date().toISOString(),
    };
}

function removeMetadata(message: MessageWithMetadata): AIMessage {
    const { id: _id, createdAt: _createdAt, ...rest } = message;
    return rest;
}
