import { NextResponse } from 'next/server';
import { createId } from '@paralleldrive/cuid2';

import { notes } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { db } from '@/db';

export async function GET(req: Request) {
	try {
		const data = await db
			.select({
				id: notes.id,
				text: notes.text,
			})
			.from(notes);

		return NextResponse.json(data);
	} catch (error) {
		console.log('[notes_GET]', error);
		return new NextResponse('Interal error', { status: 500 });
	}
}

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const data = await db
			.insert(notes)
			.values({
				...body,
				userId: 'fiwzvc8e2txlmkcl1tqdjh09',
				id: createId(),
			})
			.returning();

		revalidatePath('/');
		revalidatePath('/notes');

		return NextResponse.json(data[0]);
	} catch (error) {
		console.log('[notes_POST]', error);
		return new NextResponse('Interal error', { status: 500 });
	}
}
