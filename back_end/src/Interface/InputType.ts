export interface userType {
    name: string;
    email: string;
    mobile: string | number;
    password: string;
    image: string;
    is_block?: boolean;
    is_verified?: boolean;
}
