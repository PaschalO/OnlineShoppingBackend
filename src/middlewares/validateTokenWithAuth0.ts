import { auth, claimIncludes } from "express-oauth2-jwt-bearer";
import { Auth0_AUDIENCE, Auth0_ISSUER } from "../config";

/*
 *  With the integration of Auth0, validate jwt token
 *
 * */
const auth0ValidateToken = auth({
	issuerBaseURL: `https://${Auth0_ISSUER}`,
	audience: `https://${Auth0_AUDIENCE}`
});

/**
 * Verify the permissions of a user.
 * @param {string|string[]} permission - The permission(s) to verify.
 * @returns {boolean} - True if the user has the permission(s), otherwise false.
 */
const auth0VerifyPermissions = (permission: string | string[]) => {
	if (typeof permission === "string") {
		permission = [permission];
	}

	return claimIncludes("permissions", ...permission);
};

export { auth0ValidateToken, auth0VerifyPermissions };
