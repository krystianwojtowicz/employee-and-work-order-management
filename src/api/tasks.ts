import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { firestore, storage } from '../api/firebase';

export interface TaskItem {
    sourceResource?: string;
    start: string;
    end: string;
    id: string;
    title: string;
    isDraggable: boolean;
    description: string;
    photoUrl?: string;
    email: string;
    done?: boolean;
}

const tasksCollectionRef = collection(firestore, 'tasks');

export const addTask = async (data: TaskItem): Promise<string> => {
    try {
        data.done = false;

        const docRef = await addDoc(tasksCollectionRef, data);

        const docId = docRef.id;

        const updatedData = { ...data, id: docId };
        await updateDoc(docRef, updatedData);
        return docId;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getTasks = async () => {
    try {
        const data = await getDocs(tasksCollectionRef);
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            isDraggable: true,
        }));
        return filteredData as TaskItem[];
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getTaskById = async (taskId: string) => {
    try {
        const taskDoc = await getDoc(doc(firestore, 'tasks', taskId));

        if (taskDoc.exists()) {
            const taskData = {
                ...taskDoc.data(),
                id: taskDoc.id,
                isDraggable: true,
            };
            return taskData as TaskItem;
        } else {
            throw new Error('Task not found');
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const editTask = async (taskId: string, task: Partial<TaskItem>) => {
    const taskRef = doc(firestore, 'tasks', taskId);
    try {
        await updateDoc(taskRef, task);
    } catch (error: any) {
        throw new Error(`Failed to edit task: ${error.message}`);
    }
};

export const handleSavePhoto = (id: string, imgUpload: any) => {
    const imageRef = ref(storage, `images/${imgUpload?.name}`);
    const taskRef = doc(collection(firestore, 'tasks'), id);
    if (imgUpload) {
        uploadBytes(imageRef, imgUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
                await setDoc(taskRef, { photoUrl: url }, { merge: true });
            });
        });
    }
};
