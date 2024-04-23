import { Status } from './spaces';

export interface FoldersResponse {
    folders: Folder[];
}

export interface Folder {
    id: number;
    name: string;
    orderindex: number;
    override_statuses: boolean;
    hidden: boolean;
    space: Space;
    task_count: number;
    archived: boolean;
    statuses: Status[];
    lists: Array<any>;
    permission_level: boolean;
}

interface Space {
    id: number;
    name: string;
}
