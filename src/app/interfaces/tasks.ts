export interface TasksResponse {
    tasks: Task[];
    last_page: boolean;
}

export interface Task {
    id: string;
    custom_id: string | null;
    custom_item_id: number;
    name: string;
    text_content: string;
    description: string;
    orderindex: number;
    date_created: number;
    date_updated: number;
    date_close: number | null;
    date_done: number | null;
    archived: boolean;
    parent: any;
    due_date: number | null;
    start_date: number | null;
    points: number | null;
    time_estimate: number | null;
    team_id: number;
    url: string;
    permission_level: string;

    // Objects
    status: Status;
    creator: Creator;
    priority: Priority;
    sharing: Sharing;
    list: List;
    project: Project;
    folder: Folder;
    space: Space;

    // Arrays
    assignees: any[];
    group_assignees: any[];
    watchers: any[];
    checklists: any[];
    tags: any[];
    custom_fields: any[];
    dependencies: any[];
    linked_tasks: any[];
    locations: any[];
}

interface Status {
    status: string;
    color: string;
    type: string;
    orderindex: number;
}

interface Creator {
    id: number;
    username: string;
    color: string;
    email: string;
    profilePicture: string | null;
}

interface Priority {
    color: string;
    id: number;
    orderindex: number;
    priority: string;
}

interface Sharing {
    public: boolean;
    public_fields: any[];
    public_share_expires_on: number | null;
    seo_optimized: boolean | null;
    token: string | null;
}

interface List {
    id: number;
    name: string;
    access: boolean;
}

interface Project {
    id: number;
    name: string;
    hidden: boolean;
    access: boolean;
}

interface Folder {
    id: number;
    name: string;
    hidden: boolean;
    access: boolean;
}

interface Space {
    id: number;
}
