export interface TeamResponse {
    teams: Team[];
}

export interface Team {
    avatar: string;
    color: string;
    members: Member[];
    name: string;
}

export interface Member {
    invited_by: UserBasic;
    user: UserBasic & UserExtended;
}

export interface UserBasic {
    color: string;
    email: string;
    id: number;
    initials: string;
    profilePicture: string | null;
    username: string;
}

export interface UserExtended {
    custom_role: string | null;
    date_invited: string;
    date_joined: string;
    last_active: string;
    role: number
}
