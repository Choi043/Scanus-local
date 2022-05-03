import { Injectable } from "@nestjs/common";
import { AuthSessionService } from "src/domains/auth/application/auth.session.service";
import { AuthTokenService } from "src/domains/auth/application/auth.token.service";
import { AdminFindService } from "./admin.find.service";

@Injectable()
export class AdminSignOutService {
    constructor(
        private readonly adminFindService: AdminFindService,
        private readonly authService: AuthTokenService,
        private readonly authSessionService: AuthSessionService,
    ) { }

    public async signOut(refreshToken: string): Promise<void> {
        let payload: any;
        if (refreshToken) {
            try {
                payload = await this.authService.verifyRefreshToken(refreshToken)
            } catch (exception) {
                return exception;
            }

            const admin_idx = payload.index;
            const user = await this.adminFindService.findByIndex(admin_idx);

            if (
                this.authSessionService.validateRefreshToken(admin_idx, refreshToken)
            ) {
                this.authSessionService.removeSession(admin_idx);
                await this.authService.deleteRefreshToken(user);
                this.authSessionService.printSession();
                console.log(`index: ${admin_idx} 로그아웃 성공`);
            } else {
                console.log(`index: ${admin_idx} 세션과 일치하지 않아 로그아웃 실패`);
            }
        }
    }
}