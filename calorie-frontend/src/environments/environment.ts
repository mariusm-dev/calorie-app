// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUrl: 'https://localhost:44307',
    nutritionxSettings: {
        headers: {
            'x-app-id': 'a30cb2f2',
            'x-app-key': '895254d413295ddcc86d732d92552985'
        },
        apiUrl: 'https://trackapi.nutritionix.com/v2/search/instant?query='
    }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
