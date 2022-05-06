import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentChannel = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const findCheck = Object.entries(request?.body)[0]

        if (findCheck){
          const condition = findCheck[0]
          const find = findCheck[1]
            return { condition, find };
        }
        else{
          const condition = '';
          const find = '';
            return { condition, find }
        }
        
    }
)