import { Injectable } from "@nestjs/common";

interface UserTokenInfo {
    admin_idx: number;
    accessToken: string;
    refreshToken: string;
}

@Injectable()
export class AuthSessionService {
    private jwtSessions: UserTokenInfo[] = [];

    public addSession(
        admin_idx: number,
        accessToken: string,
        refreshToken: string,
    ) {
        const tokenInfo = { admin_idx, accessToken, refreshToken };
        const index = this.jwtSessions.findIndex(
            (jwtSession) => jwtSession.admin_idx === admin_idx,
        );
        if( index === -1) {
            this.jwtSessions.push(tokenInfo);
        } else {
            this.jwtSessions[index] = {
                admin_idx,
                accessToken,
                refreshToken,
            };
        }
    }

    validateAccessToken(admin_idx: number, accessToken: string) {
        const index = this.jwtSessions.findIndex(
            (jwtSession) => jwtSession.admin_idx === admin_idx,
        );

        return index !== -1 && this.jwtSessions[index].accessToken === accessToken;
    }
    
    validateRefreshToken(admin_idx: number, refreshToken: string) {
        const index = this.jwtSessions.findIndex(
            (jwtSession) => jwtSession.admin_idx === admin_idx,
        );

        return index !== -1 && this.jwtSessions[index].refreshToken === refreshToken;
    }

    public printSession() {
        console.log(this.jwtSessions);
    }
}
