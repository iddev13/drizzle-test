'use client';

import { Note } from '@/db/schema';
import Link from 'next/link';
import { Button } from './ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit, Trash2 } from 'lucide-react';

type NotesListProps = {
	notes: Note[];
};

export const NotesList = ({ notes }: NotesListProps) => {
	const queryClient = useQueryClient(); // refetch
	const router = useRouter();
	console.log(notes);

	const { mutate, isPending } = useMutation({
		mutationKey: ['delete note'],
		mutationFn: (id: string) => {
			return axios.delete(`api/notes/${id}`);
		},
		onSuccess: (id) => {
			console.log('Success');
			queryClient.invalidateQueries({ queryKey: ['notes', { id }] });
			router.refresh();
		},
		onError: (error) => {
			console.log('Delete Error', error);
		},
	});

	const handleDelete = async (id: string) => {
		mutate(id);
	};

	return (
		<ul>
			{notes.map((note) => (
				<li
					key={note.id}
					className="mb-1 bg-slate-400/40 rounded-sm p-1 flex items-center justify-between"
				>
					<Button asChild variant="outline" className="mr-4">
						<Link href={`notes/${note.id}`}>{note.text}</Link>
					</Button>
					<div className="flex items-center">
						<Button variant="secondary" className="mr-2" onClick={() => {}}>
							<Link href={`notes/${note.id}`}>
								{' '}
								<Edit className="size-4" />
							</Link>
						</Button>
						<Button variant="destructive" onClick={() => handleDelete(note.id)}>
							<Trash2 className="size-4" />
						</Button>
					</div>
				</li>
			))}
		</ul>
	);
};
