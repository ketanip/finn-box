type UserPayload = {
    id: string;
    name: string;
    email: string;
    email_verified: boolean;
};

declare global {
    namespace Express {
        interface Locals {
            user: UserPayload;
        }
    }
}

export default {};