import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import * as jwt from "jsonwebtoken";
@Injectable()
export class TokenValidationMiddleware implements NestMiddleware {
  constructor() {}

  use(req: Request, res: Response, next: () => void) {
    const path = req["params"]["0"];

    if (path == "auth/login") next();

    const token = req.headers["authorization"];
    if (!token)
      throw new UnauthorizedException({ no_token: "No token provider" });

    const tokenWithoutBearer = token.split(" ")[1];
    const decoded = jwt.decode(tokenWithoutBearer);

    if (!decoded)
      throw new UnauthorizedException({ invalid_token: "Invalid token" });

    const expirationDate = decoded["exp"];
    const now = new Date().getTime() / 1000;

    if (expirationDate < now)
      throw new UnauthorizedException({ expired_token: "Expired token" });

    next();    
  }
}
