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
import { User } from '@/db/schema';

const FormSchema = z.object({
	name: z.string().min(2, {
		message: 'Name must be at least 2 characters.',
	}),
	email: z.string().email(),
});

type UserFormProps = {
	isEdit?: boolean;
};

export const UserForm = ({ isEdit }: UserFormProps) => {
	const router = useRouter();
	const queryClient = useQueryClient(); // refetch
	const { mutate, isPending } = useMutation({
		mutationKey: ['add post'],
		mutationFn: (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
			return axios.post(`/api/users`, data);
		},
		onError: () => {
			console.log('Error');
		},
		onSuccess: () => {
			console.log('Success');
			queryClient.invalidateQueries({ queryKey: ['users'] });
		},
	});

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			email: '',
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		mutate(data);
		form.reset();
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-[400px] space-y-2 bg-slate-200 rounded-md shadow-sm mx-auto p-2"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="John Doe" {...field} disabled={isPending} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="john.doe@example.com"
									{...field}
									type="email"
									disabled={isPending}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={isPending}>
					Submit
				</Button>
			</form>
		</Form>
	);
};
