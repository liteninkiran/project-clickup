export interface SpaceResponse {
    spaces: Space[];
}

export interface Space {
    id: number;
    name: string;
    color: string;
    private: boolean;
    avatar: string | null;
    admin_can_manage: string | null;
    statuses: Status[];
    multiple_assignees: boolean;
    features: any;
    archived: boolean;
}

export interface Status {
    id: number;
    status: string;
    type: string;
    orderindex: number;
    color: string;
}
