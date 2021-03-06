/********************************/
/*         DEPENDENCIES         */
/********************************/
import * as appConfig from '../core/constants/app.constants';
// -----------------------------------


/********************************/
/*      INTERFACES & TYPES      */
/********************************/
export interface IServerConfig {
    dataBaseUrl: string;
    authGoogleUrl: string;
    authLogoutUrl: string;
}


/****************************************/
/*            SERVER CONFIG             */
/****************************************/
export function serverConfig(env: string): IServerConfig {

    switch (env) {
        case appConfig.LOCAL:
            return {
                dataBaseUrl: appConfig.LOCAL_DATA_URL,
                authGoogleUrl: appConfig.LOCAL_AUTH_GOOGLE_URL,
                authLogoutUrl: appConfig.LOCAL_AUTH_LOGOUT_URL
            };
        
        case appConfig.DEV:
            return {
                dataBaseUrl: appConfig.DEV_DATA_URL,
                authGoogleUrl: appConfig.DEV_AUTH_GOOGLE_URL,
                authLogoutUrl: appConfig.DEV_AUTH_LOGOUT_URL
            };
        
        case appConfig.STAGING:
            return {
                dataBaseUrl: appConfig.STAGING_DATA_URL,
                authGoogleUrl: appConfig.STAGING_AUTH_GOOGLE_URL,
                authLogoutUrl: appConfig.STAGING_AUTH_LOGOUT_URL
            };

        case appConfig.PRD:
            return {
                dataBaseUrl: appConfig.PRD_DATA_URL,
                authGoogleUrl: appConfig.PRD_AUTH_GOOGLE_URL,
                authLogoutUrl: appConfig.PRD_AUTH_LOGOUT_URL
            };

        default:
            return {
                dataBaseUrl: appConfig.LOCAL_DATA_URL,
                authGoogleUrl: appConfig.LOCAL_AUTH_GOOGLE_URL,
                authLogoutUrl: appConfig.LOCAL_AUTH_LOGOUT_URL
            };
    }

}