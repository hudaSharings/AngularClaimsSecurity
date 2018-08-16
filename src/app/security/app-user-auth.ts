import { AppUserClaim } from "./app-user-claim";

export class AppUserAuth {
  userId: number = 0;
  userName: string = "";
  bearerToken: string = "";
  isAuthenticated: boolean = false;
  claims: AppUserClaim[] = [];
}
