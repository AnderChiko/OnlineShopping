export class LoginUser{
    username!: string | null;
    password!: string | null;
}

export class LoginUserResult{
    status!: string;
    versionApi: string;
    token: string;
    externalTokens: Array<any>;
}

