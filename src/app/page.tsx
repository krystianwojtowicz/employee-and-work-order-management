// import { useEffect } from 'react';
// import { useRouter } from 'next/router';

// export default function Home() {
//     const router = useRouter();
//     useEffect(() => {
//         // Przekieruj użytkownika na '/addtask'
//         router.push('/addtask');
//     }, []);
//     return <></>;
// }
import { redirect } from 'next/navigation';

export default function Home() {
    redirect('/addtask');
    return <></>;
}
