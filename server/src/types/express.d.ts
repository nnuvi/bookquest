import { reqUser } from "./user.ts";

declare global {
  namespace Express {
    interface Request {
      user?: ReqUser;
    }
  }
}

export {};
