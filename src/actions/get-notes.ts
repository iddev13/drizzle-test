import { Note } from '@/db/schema';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/notes`;

const getNotes = async (): Promise<Note[]> => {
	const res = await fetch(URL, { method: 'GET' });


	return res.json();
};

export default getNotes;
