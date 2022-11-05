export type columnProps = {
    column: {
        id: string;
        title: string;
        taskIds: number[];
    },
    tasks: {
        id: number;
        heading: string;
        content: string;
        amount: string;
    }[]
}

export type taskData = {
    tasks: {
        [key: number]: {
            id: number,
            heading: string,
            content: string,
            amount: string
        }
    },
    columns: {
        [key: string]: {
            id: string,
            title: string,
            taskIds: number[]
        }
    },
    columnOrder: string[]
}

export type columnType = {
    id: string,
    title: string,
    taskIds: number[]
}