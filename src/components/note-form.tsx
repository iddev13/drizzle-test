'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertNotesSchema, Note } from '@/db/schema';
import { useEffect } from 'react';

const FormSchema = z.object({
	text: z.string().min(2, {
		message: 'Name must be at least 2 characters.',
	}),
});

const formSchema = insertNotesSchema.pick({ text: true });

type FormValues = z.input<typeof formSchema>;

type NoteFormProps = {
	id?: string;
	isEdit?: boolean;
	defaultValues?: FormValues;
};

export const NoteForm = ({ isEdit, defaultValues, id }: NoteFormProps) => {
	const router = useRouter();
	const queryClient = useQueryClient(); // refetch
	const { mutate, isPending } = useMutation({
		mutationKey: ['add post'],
		mutationFn: (
			data: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'userId'>
		) => {
			if (isEdit) {
				return axios.patch(`/api/notes/${id}`, data);
			} else {
				return axios.post(`/api/notes`, data);
			}
		},
		onError: () => {
			console.log('Error');
			form.reset();
		},
		onSuccess: () => {
			console.log('Success');
			queryClient.invalidateQueries({ queryKey: ['notes'] });
			router.refresh();
			form.reset();
		},
	});

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: defaultValues,
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		mutate(data);

		form.reset();
	}

	useEffect(() => {}, [defaultValues]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-[400px] space-y-2 bg-slate-200 rounded-md shadow-sm mx-auto p-2"
			>
				<FormField
					control={form.control}
					name="text"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{isEdit ? 'Edit ' : 'New '}Note</FormLabel>
							<FormControl>
								<Input
									placeholder="Some text..."
									{...field}
									disabled={isPending}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={isPending}>
					{isEdit ? 'Edit' : 'Add'}
				</Button>
			</form>
		</Form>
	);
};
