import getNotes from '@/actions/get-notes';
import { NoteForm } from '@/components/note-form';
import { NotesList } from '@/components/notes-list';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';

const NotesPage = async () => {
	const notes = await getNotes();

	return (
		<div className=" w-full h-full">
			<h1 className="text-center my-4 text-3xl">NotesPage</h1>
			<Separator className="my-4" />
			<Suspense fallback={<p>Loading notes...</p>}>
				<NotesList notes={notes} />
			</Suspense>
			<Separator className="my-4" />
			<div>
				<NoteForm defaultValues={{ text: '' }} />
			</div>
			<Separator className="my-4" />
		</div>
	);
};

export default NotesPage;
