export interface ListsResponse {
    lists: List[];
}

export interface List {
    id: number;
    name: string;
    orderindex: number;
    status: null;
    priority: string | null;
    assignee: null;
    task_count: number;
    due_date: Date | null;
    start_date: Date | null;
    folder: Folder;
    space: Space;
    archived: boolean;
    override_statuses: boolean;
    permission_level: boolean;
}

interface Folder {
    id: number;
    name: string;
    hidden: boolean;
    access: boolean;
}

interface Space {
    id: number;
    name: string;
    access: boolean;
}
