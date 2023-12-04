import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { firestore } from '../api/firebase';

export interface EventItem {
    sourceResource?: string;
    start: Date | string;
    end: Date | string;
    id: string;
    title: string;
    isDraggable: boolean;
}

const eventsCollectionRef = collection(firestore, 'events');

export const getEvents = async () => {
    try {
        const data = await getDocs(eventsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            isDraggable: true,
        }));
        return filteredData as EventItem[];
    } catch (err) {
        console.error(err);
    }
};

export const editEvent = async (eventId: string, event: Partial<EventItem>) => {
    const eventRef = doc(firestore, 'events', eventId);
    try {
        await updateDoc(eventRef, event);
    } catch (error: any) {
        throw new Error(`Failed to edit event: ${error.message}`);
    }
};
