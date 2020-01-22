import { Profile } from 'src/app/profile/profile';

export class ProfileResponse {
    code: string;
    data?: Profile;
    message?: string;
}