'use client';

import { Task } from '../../../components/Task';

type TaskParam = {
    params: {
        id: string;
    };
};

export default function TaskPage({ params }: TaskParam) {
    return <Task taskId={params.id} />;
}
