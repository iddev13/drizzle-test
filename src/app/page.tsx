import { Separator } from '@/components/ui/separator';
import { NoteForm } from '@/components/note-form';
import { UserForm } from '@/components/user-form';
import getNotes from '@/actions/get-notes';

export default async function Home() {
	const notes = await getNotes();

	return (
		<div className="p-4">
			<h1 className="text-center mb-4">Home</h1>
			<UserForm />
			<Separator className="my-4" />
			<h2 className="text-center mb-4">Notes</h2>
			<ul>
				{notes.map((note) => (
					<li key={note.id}>{note.text}</li>
				))}
			</ul>
			<NoteForm defaultValues={{ text: '' }} />
		</div>
	);
}
