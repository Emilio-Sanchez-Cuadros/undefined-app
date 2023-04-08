export class User {
    id?: number;
    email?: string;
    name?: string;
    password?: string;
    userProfile?: UserProfile;
}

export class UserProfile {
    id?: number;
    profileImage?: string;
    role?: string;
    owner?: string;
}
