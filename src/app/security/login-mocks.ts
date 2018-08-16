import { AppUserAuth } from "./app-user-auth";
import { AppUserClaim } from "./app-user-claim";

export const LOGIN_MOCKS: AppUserAuth[] = [
  {
    userId: 1,
    userName: "PSheriff",
    bearerToken: "abi393kdkd9393ikd",
    isAuthenticated: true,
    claims: [
      {
        userId: 1,
        claimId: 1,
        claimType: "isAuthenticated",
        claimValue: "true"
      },
      {
        userId: 1,
        claimId: 2,
        claimType: "canAccessProducts",
        claimValue: "true"
      },
      {
        userId: 1,
        claimId: 3,
        claimType: "canAddProduct",
        claimValue: "true"
      },
      {
        userId: 1,
        claimId: 4,
        claimType: "canSaveProduct",
        claimValue: "true"
      },
      {
        userId: 1,
        claimId: 5,
        claimType: "canAccessCategories",
        claimValue: "true"
      },
      {
        userId: 1,
        claimId: 6,
        claimType: "canAddCategory",
        claimValue: "false"
      }
    ]
  },
  {
    userId: 2,
    userName: "BJones",
    bearerToken: "sd9f923k3kdmcjkhd",
    isAuthenticated: true,
    claims: [
      {
        userId: 2,
        claimId: 1,
        claimType: "isAuthenticated",
        claimValue: "true"
      },
      {
        userId: 2,
        claimId: 2,
        claimType: "canAccessProducts",
        claimValue: "false"
      },
      {
        userId: 2,
        claimId: 3,
        claimType: "canAddProduct",
        claimValue: "false"
      },
      {
        userId: 2,
        claimId: 4,
        claimType: "canSaveProduct",
        claimValue: "false"
      },
      {
        userId: 2,
        claimId: 5,
        claimType: "canAccessCategories",
        claimValue: "true"
      },
      {
        userId: 2,
        claimId: 6,
        claimType: "canAddCategory",
        claimValue: "true"
      }
    ]
  }
];