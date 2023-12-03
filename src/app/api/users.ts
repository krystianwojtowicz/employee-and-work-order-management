import {
    // AuthErrorCodes,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../api/firebase';

interface User {
    name: string;
    lastName: string;
    position: string;
    email: string;
    emailOfYourBoss: string;
    id?: string;
}

//validation to fix
export const signInWithEmail = async (
    email: string,
    password: string
): Promise<string> => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        return user.uid;
    } catch (error: any) {
        switch (error.code) {
            case 'auth/user-not-found':
                throw new Error('User not found');
            // case 'auth/invalid-password':
            case 'auth/wrong-password':
                // case AuthErrorCodes.INVALID_PASSWORD:
                throw new Error('Wrong password');
            default:
                // throw new Error('Something went wrong');
                throw new Error(
                    'User not found or wrong password or something went wrong'
                );
        }
    }
};

export const createUser = async (dataWithoutPassword: User, id: string) => {
    dataWithoutPassword.id = id;
    const userRef = doc(collection(firestore, 'users'), id);
    await setDoc(userRef, dataWithoutPassword);
};

export const signUpWithEmail = async (
    email: string,
    password: string
): Promise<string> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        return user.uid;
    } catch (error: any) {
        switch (error.code) {
            case 'auth/email-already-in-use':
                throw new Error('The email address is already in use');
            case 'auth/invalid-email':
                throw new Error('Invalid email address format');
            case 'auth/weak-password':
                throw new Error('Your password is too weak');
            default:
                throw new Error('Something went wrong');
        }
    }
};
