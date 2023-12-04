import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { firestore, storage } from '../api/firebase';

export interface Task {
    description: string;
}

export const addTask = async (data: Task): Promise<string> => {
    try {
        const tasksCollectionRef = collection(firestore, 'tasks');
        const docRef = await addDoc(tasksCollectionRef, data);

        const docId = docRef.id;

        const updatedData = { ...data, id: docId };
        await updateDoc(docRef, updatedData);
        return docId;
    } catch (error: any) {
        throw new Error(error.message);
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
