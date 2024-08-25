import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { notes } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export async function GET(
	req: Request,
	{ params }: { params: { noteId: string } }
) {
	try {
		const data = await db
			.select()
			.from(notes)
			.where(eq(notes.id, params.noteId));

		return NextResponse.json(data[0]);
	} catch (error) {
		console.log('[notes_GET]', error);
		return new NextResponse('Interal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { noteId: string } }
) {
	try {
		const body = await req.json();

		if (!params.noteId) {
			return new NextResponse('Store id is required!', { status: 400 });
		}

		const data = await db
			.update(notes)
			.set({
				...body,
			})
			.where(eq(notes.id, params.noteId))
			.returning();

		revalidatePath('/');
		revalidatePath('/notes');
		revalidatePath(`/notes${params.noteId}`);
		return NextResponse.json(data[0]);
	} catch (error) {
		console.log('notes_PATCH', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { noteId: string } }
) {
	try {
		if (!params.noteId) {
			return new NextResponse('Note id is required!', { status: 400 });
		}

		const data = await db
			.delete(notes)
			.where(eq(notes.id, params.noteId))
			.returning();

		revalidatePath('/');
		revalidatePath('/notes');

		return NextResponse.json(data[0]);
	} catch (error) {
		console.log('Note_DELETE', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
