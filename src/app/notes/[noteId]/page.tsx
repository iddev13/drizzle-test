'use client';

import { NoteForm } from '@/components/note-form';
import { useGetNoteById } from '@/hooks/use-get-note-by-id';

type Props = {
	params: {
		noteId: string;
	};
};

const NotePage = ({ params }: Props) => {
	const { data, isLoading } = useGetNoteById(params.noteId);

	if (!data || isLoading) {
		return <div className="text-center py-4">Loading...</div>;
	}

	const defaultValues = data ? { text: data.text } : { text: '' };

	return (
		<div className="max-w-5xl mx-auto w-full">
			<div>
				<h1 className="text-5xl font-bold text-center mb-4">Note Page</h1>
				<h4>
					<b>USER ID:</b> {data.userId}
				</h4>
				<h3 className="bg-slate-400">
					<b>NOTE ID:</b> {data.id}
				</h3>
				<p>TEXT {data.text}</p>
			</div>
			<div>
				<NoteForm isEdit defaultValues={defaultValues} id={params.noteId} />
			</div>
		</div>
	);
};

export default NotePage;
