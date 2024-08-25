'use client';

import { useMountedState } from 'react-use';
// import { EditNoteSheet } from '../../features/notes/components/edit-note-sheet';


export const SheetProvider = () => {
	const isMounted = useMountedState();

	if (!isMounted) return null;

	return (
		<>
			{/* <EditNoteSheet /> */}
		</>
	);
};
