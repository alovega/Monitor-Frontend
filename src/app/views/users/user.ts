export class User {
    username: string;
    first_name: string;
    last_name: string;
    is_active: string;
    email: string;
    is_superuser: string;
    is_staff: string;
    last_login: string;
    password: string;
    id: number;
    date_joined: string;
}

export class UserResponse {
    code: string;
    data?: User;
    message?: string;
}

export class UsersResponse {
    code: string;
    data?: User[];
    message?: string;
}
