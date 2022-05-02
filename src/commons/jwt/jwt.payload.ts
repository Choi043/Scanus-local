// payload에 저장할 값, index, 유저 아이디, 등급
export class JwtPayload {
    index: number;
    userId?: string;
    role: string;
}