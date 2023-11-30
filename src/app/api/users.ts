import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../api/firebase';

export interface User {
    name: string;
    lastName: string;
    position: string;
    id?: string;
}

// export const signInWithEmail = async (
//     email: string,
//     password: string,
//   ): Promise<string | undefined> => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//     } catch (error: any) {
//       switch (error.code) {
//         case 'auth/user-not-found':
//           return 'Nie ma takiego użytkownika';
//         case 'auth/wrong-password':
//           return 'Błędne hasło';
//         default:
//       }
//     }
//   };

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
                throw new Error('Coś poszło nie tak');
        }
    }
};
