export class User {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    is_active: string;
    email: string;
    is_superuser: string;
    is_staff: string;
    last_login: string;
    password: string;
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
