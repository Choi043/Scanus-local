import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentChannel = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const findCheck = Object.entries(request?.body)[0]

        if (findCheck){
            return findCheck;
        }
        else{
            return undefined
        }
        
    }
)