import { JSONFilePreset } from 'lowdb/node';
import type { AIMessage } from './ai';
import { v4 as uuid } from 'uuid';

type Data = {
    messages: MessageWithMetadata[];
};

const defaultData: Data = {
    messages: [],
};

async function getDb() {
    return JSONFilePreset<Data>('db.json', defaultData);
}

export async function addMessages(messages: AIMessage[]) {
    const db = await getDb();
    db.data.messages.push(...messages.map(addMetadata));
    await db.write();
}

export async function addMessage(message: AIMessage) {
    const db = await getDb();
    db.data.messages.push(addMetadata(message));
    await db.write();
}

export async function getMessages(): Promise<AIMessage[]> {
    const db = await getDb();
    return db.data.messages.map(removeMetada);
}

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

function removeMetada(message: MessageWithMetadata): AIMessage {
    const { id: _id, createdAt: _createdAt, ...rest } = message;
    return rest;
}
