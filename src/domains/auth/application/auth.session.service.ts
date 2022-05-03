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
        // jwtSessions에 넣어줄 인덱스와 토큰
        const tokenInfo = { admin_idx, accessToken, refreshToken };

        // jwtSessions에서 admin_idx를 만족하는 값이 있으면 배열 인덱스 반환, 없으면 -1
        const index = this.jwtSessions.findIndex(
            (jwtSession) => jwtSession.admin_idx === admin_idx,
        );
        if (index === -1) {     // jwtSessions에 해당 값이 없으면 addSession()으로 받은 값( tokenInfo ) push
            this.jwtSessions.push(tokenInfo);
        } else {
            this.jwtSessions[index] = {     // 해당 값이 있으면 덮어쓰기
                admin_idx,
                accessToken,
                refreshToken,
            };
        }
    }

    public removeSession(admin_idx: number) {
        // admin_idx와 일치하지 않는 값들 jwtSessions에 저장, 즉 일치하는 값 제거
        this.jwtSessions = this.jwtSessions.filter(
            (jwtSession) => jwtSession.admin_idx !== admin_idx,
        );
    }

    validateAccessToken(admin_idx: number, accessToken: string) {
        // jwtSessions에서 admin_idx를 만족하는 값이 있으면 배열 인덱스 반환, 없으면 -1
        const index = this.jwtSessions.findIndex(
            (jwtSession) => jwtSession.admin_idx === admin_idx,
        );
        // 반환된 index가 -1이 아니거나 jwtSessions에 있는 accessToken 값이 일치하다면 return
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
