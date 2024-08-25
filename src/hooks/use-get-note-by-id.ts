import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Note } from '@/db/schema';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/notes`;

const getData = async (id: string) => {
	const response = await axios.get<Note>(`${URL}/${id}`);

	return response;
};

export function useGetNoteById(id: string) {
	const { data, isLoading, isSuccess, isError, refetch } = useQuery({
		queryKey: ['notes', id],
		queryFn: () => getData(id),
		select: (data) => data.data,
		enabled: !!id,
	});

	refetch();

	useEffect(() => {
		if (isSuccess) console.log('Data fetched successfully');
	}, []);
	useEffect(() => {
		if (isError) console.log('Error fething data');
	}, []);
	return { data, isLoading, isSuccess, isError };
}
