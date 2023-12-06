// ToDo do it differently
import { redirect } from 'next/navigation';

export default function Home() {
    redirect('/addtask');
    return <></>;
}
