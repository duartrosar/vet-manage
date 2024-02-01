/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/confirm-email"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to the
 * private part of the app
 * @type {string[]}
 */
export const authRoutes = ["/login", "/register", "/auth-error"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are use for API authentication process
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path loggin in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/app/dashboard";
