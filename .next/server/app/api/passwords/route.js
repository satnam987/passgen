"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/passwords/route";
exports.ids = ["app/api/passwords/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fpasswords%2Froute&page=%2Fapi%2Fpasswords%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpasswords%2Froute.ts&appDir=C%3A%5CUsers%5CUser%5COneDrive%20-%20AP%20Hogeschool%20Antwerpen%5CBureaublad%5Cpassgencursor%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CUser%5COneDrive%20-%20AP%20Hogeschool%20Antwerpen%5CBureaublad%5Cpassgencursor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fpasswords%2Froute&page=%2Fapi%2Fpasswords%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpasswords%2Froute.ts&appDir=C%3A%5CUsers%5CUser%5COneDrive%20-%20AP%20Hogeschool%20Antwerpen%5CBureaublad%5Cpassgencursor%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CUser%5COneDrive%20-%20AP%20Hogeschool%20Antwerpen%5CBureaublad%5Cpassgencursor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_User_OneDrive_AP_Hogeschool_Antwerpen_Bureaublad_passgencursor_app_api_passwords_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/passwords/route.ts */ \"(rsc)/./app/api/passwords/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/passwords/route\",\n        pathname: \"/api/passwords\",\n        filename: \"route\",\n        bundlePath: \"app/api/passwords/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\User\\\\OneDrive - AP Hogeschool Antwerpen\\\\Bureaublad\\\\passgencursor\\\\app\\\\api\\\\passwords\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_User_OneDrive_AP_Hogeschool_Antwerpen_Bureaublad_passgencursor_app_api_passwords_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/passwords/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZwYXNzd29yZHMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnBhc3N3b3JkcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnBhc3N3b3JkcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNVc2VyJTVDT25lRHJpdmUlMjAtJTIwQVAlMjBIb2dlc2Nob29sJTIwQW50d2VycGVuJTVDQnVyZWF1YmxhZCU1Q3Bhc3NnZW5jdXJzb3IlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q1VzZXIlNUNPbmVEcml2ZSUyMC0lMjBBUCUyMEhvZ2VzY2hvb2wlMjBBbnR3ZXJwZW4lNUNCdXJlYXVibGFkJTVDcGFzc2dlbmN1cnNvciZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUM2RDtBQUMxSTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVHQUF1RztBQUMvRztBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzZKOztBQUU3SiIsInNvdXJjZXMiOlsid2VicGFjazovL3Bhc3NnZW5jdXJzb3IvP2MzNjkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcVXNlclxcXFxPbmVEcml2ZSAtIEFQIEhvZ2VzY2hvb2wgQW50d2VycGVuXFxcXEJ1cmVhdWJsYWRcXFxccGFzc2dlbmN1cnNvclxcXFxhcHBcXFxcYXBpXFxcXHBhc3N3b3Jkc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvcGFzc3dvcmRzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvcGFzc3dvcmRzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9wYXNzd29yZHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXE9uZURyaXZlIC0gQVAgSG9nZXNjaG9vbCBBbnR3ZXJwZW5cXFxcQnVyZWF1YmxhZFxcXFxwYXNzZ2VuY3Vyc29yXFxcXGFwcFxcXFxhcGlcXFxccGFzc3dvcmRzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIGhlYWRlckhvb2tzLCBzdGF0aWNHZW5lcmF0aW9uQmFpbG91dCB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL3Bhc3N3b3Jkcy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fpasswords%2Froute&page=%2Fapi%2Fpasswords%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpasswords%2Froute.ts&appDir=C%3A%5CUsers%5CUser%5COneDrive%20-%20AP%20Hogeschool%20Antwerpen%5CBureaublad%5Cpassgencursor%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CUser%5COneDrive%20-%20AP%20Hogeschool%20Antwerpen%5CBureaublad%5Cpassgencursor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/passwords/route.ts":
/*!************************************!*\
  !*** ./app/api/passwords/route.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var private_next_rsc_action_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! private-next-rsc-action-proxy */ \"(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-proxy.js\");\n/* harmony import */ var private_next_rsc_action_encryption__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! private-next-rsc-action-encryption */ \"(rsc)/./node_modules/next/dist/server/app-render/action-encryption.js\");\n/* harmony import */ var private_next_rsc_action_encryption__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(private_next_rsc_action_encryption__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(rsc)/./node_modules/next/dist/server/web/exports/next-response.js\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/auth */ \"(rsc)/./app/lib/auth.ts\");\n/* harmony import */ var private_next_rsc_action_validate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! private-next-rsc-action-validate */ \"(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js\");\n/* __next_internal_action_entry_do_not_use__ {\"673766682f5a4ffae7f80ce63567eb440303861a\":\"POST\",\"7181657de84a96acd57358c05d1f04fbfa837e94\":\"GET\"} */ \n\n\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_3__.PrismaClient();\nasync function GET(request) {\n    console.log(\"GET /api/passwords - Ophalen van wachtwoorden\");\n    try {\n        // Token uit de header halen\n        const authHeader = request.headers.get(\"authorization\");\n        if (!authHeader || !authHeader.startsWith(\"Bearer \")) {\n            console.log(\"GET /api/passwords - Geen geldige authorizatie header\");\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_2__[\"default\"].json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const token = authHeader.split(\" \")[1];\n        const userData = (0,_lib_auth__WEBPACK_IMPORTED_MODULE_4__.verifyToken)(token);\n        if (!userData) {\n            console.log(\"GET /api/passwords - Ongeldige token\");\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_2__[\"default\"].json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        // Wachtwoorden ophalen voor de gebruiker\n        const passwords = await prisma.password.findMany({\n            where: {\n                userId: userData.id\n            },\n            orderBy: {\n                createdAt: \"desc\"\n            }\n        });\n        console.log(`GET /api/passwords - ${passwords.length} wachtwoorden gevonden`);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_2__[\"default\"].json(passwords);\n    } catch (error) {\n        console.error(\"GET /api/passwords - Error:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_2__[\"default\"].json({\n            error: \"Internal Server Error\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    console.log(\"POST /api/passwords - Nieuw wachtwoord opslaan\");\n    try {\n        // Token uit de header halen\n        const authHeader = request.headers.get(\"authorization\");\n        if (!authHeader || !authHeader.startsWith(\"Bearer \")) {\n            console.log(\"POST /api/passwords - Geen geldige authorizatie header\");\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_2__[\"default\"].json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        const token = authHeader.split(\" \")[1];\n        const userData = (0,_lib_auth__WEBPACK_IMPORTED_MODULE_4__.verifyToken)(token);\n        if (!userData) {\n            console.log(\"POST /api/passwords - Ongeldige token\");\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_2__[\"default\"].json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        // Wachtwoordgegevens uit het request halen\n        const { title, password } = await request.json();\n        if (!title || !password) {\n            console.log(\"POST /api/passwords - Ontbrekende gegevens:\", {\n                title,\n                password: password ? \"[REDACTED]\" : \"missing\"\n            });\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_2__[\"default\"].json({\n                error: \"Title and password are required\"\n            }, {\n                status: 400\n            });\n        }\n        // Wachtwoord opslaan in de database\n        const savedPassword = await prisma.password.create({\n            data: {\n                website: title,\n                username: \"\",\n                password,\n                userId: userData.id\n            }\n        });\n        console.log(\"POST /api/passwords - Wachtwoord succesvol opgeslagen:\", {\n            id: savedPassword.id,\n            title\n        });\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_2__[\"default\"].json(savedPassword);\n    } catch (error) {\n        console.error(\"POST /api/passwords - Error:\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_2__[\"default\"].json({\n            error: \"Internal Server Error\"\n        }, {\n            status: 500\n        });\n    }\n}\n\n(0,private_next_rsc_action_validate__WEBPACK_IMPORTED_MODULE_5__.ensureServerEntryExports)([\n    GET,\n    POST\n]);\n(0,private_next_rsc_action_proxy__WEBPACK_IMPORTED_MODULE_0__.createActionProxy)(\"7181657de84a96acd57358c05d1f04fbfa837e94\", GET);\n(0,private_next_rsc_action_proxy__WEBPACK_IMPORTED_MODULE_0__.createActionProxy)(\"673766682f5a4ffae7f80ce63567eb440303861a\", POST);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O2dCQUNWZDtnQkFDQUcsUUFBUUwsU0FBU00sRUFBRTtZQUNyQjtRQUNGO1FBRUFqQixRQUFRQyxHQUFHLENBQUMsMERBQTBEO1lBQUVnQixJQUFJTSxjQUFjTixFQUFFO1lBQUVLO1FBQU07UUFFcEcsT0FBTzVCLGtGQUFZQSxDQUFDWSxJQUFJLENBQUNpQjtJQUMzQixFQUFFLE9BQU9oQixPQUFPO1FBQ2RQLFFBQVFPLEtBQUssQ0FBQyxnQ0FBZ0NBO1FBQzlDLE9BQU9iLGtGQUFZQSxDQUFDWSxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUF3QixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUM3RTtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGFzc2dlbmN1cnNvci8uL2FwcC9hcGkvcGFzc3dvcmRzL3JvdXRlLnRzPzE4NDAiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzZXJ2ZXInO1xyXG5cclxuaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xyXG5pbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XHJcbmltcG9ydCB7IHZlcmlmeVRva2VuIH0gZnJvbSAnLi4vLi4vbGliL2F1dGgnO1xyXG5cclxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XHJcbiAgY29uc29sZS5sb2coJ0dFVCAvYXBpL3Bhc3N3b3JkcyAtIE9waGFsZW4gdmFuIHdhY2h0d29vcmRlbicpO1xyXG4gIFxyXG4gIHRyeSB7XHJcbiAgICAvLyBUb2tlbiB1aXQgZGUgaGVhZGVyIGhhbGVuXHJcbiAgICBjb25zdCBhdXRoSGVhZGVyID0gcmVxdWVzdC5oZWFkZXJzLmdldCgnYXV0aG9yaXphdGlvbicpO1xyXG4gICAgXHJcbiAgICBpZiAoIWF1dGhIZWFkZXIgfHwgIWF1dGhIZWFkZXIuc3RhcnRzV2l0aCgnQmVhcmVyICcpKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdHRVQgL2FwaS9wYXNzd29yZHMgLSBHZWVuIGdlbGRpZ2UgYXV0aG9yaXphdGllIGhlYWRlcicpO1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1VuYXV0aG9yaXplZCcgfSwgeyBzdGF0dXM6IDQwMSB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3QgdG9rZW4gPSBhdXRoSGVhZGVyLnNwbGl0KCcgJylbMV07XHJcbiAgICBjb25zdCB1c2VyRGF0YSA9IHZlcmlmeVRva2VuKHRva2VuKTtcclxuICAgIFxyXG4gICAgaWYgKCF1c2VyRGF0YSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnR0VUIC9hcGkvcGFzc3dvcmRzIC0gT25nZWxkaWdlIHRva2VuJyk7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnVW5hdXRob3JpemVkJyB9LCB7IHN0YXR1czogNDAxIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFdhY2h0d29vcmRlbiBvcGhhbGVuIHZvb3IgZGUgZ2VicnVpa2VyXHJcbiAgICBjb25zdCBwYXNzd29yZHMgPSBhd2FpdCBwcmlzbWEucGFzc3dvcmQuZmluZE1hbnkoe1xyXG4gICAgICB3aGVyZToge1xyXG4gICAgICAgIHVzZXJJZDogdXNlckRhdGEuaWRcclxuICAgICAgfSxcclxuICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgIGNyZWF0ZWRBdDogJ2Rlc2MnXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBjb25zb2xlLmxvZyhgR0VUIC9hcGkvcGFzc3dvcmRzIC0gJHtwYXNzd29yZHMubGVuZ3RofSB3YWNodHdvb3JkZW4gZ2V2b25kZW5gKTtcclxuICAgIFxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHBhc3N3b3Jkcyk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0dFVCAvYXBpL3Bhc3N3b3JkcyAtIEVycm9yOicsIGVycm9yKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnSW50ZXJuYWwgU2VydmVyIEVycm9yJyB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xyXG4gIGNvbnNvbGUubG9nKCdQT1NUIC9hcGkvcGFzc3dvcmRzIC0gTmlldXcgd2FjaHR3b29yZCBvcHNsYWFuJyk7XHJcbiAgXHJcbiAgdHJ5IHtcclxuICAgIC8vIFRva2VuIHVpdCBkZSBoZWFkZXIgaGFsZW5cclxuICAgIGNvbnN0IGF1dGhIZWFkZXIgPSByZXF1ZXN0LmhlYWRlcnMuZ2V0KCdhdXRob3JpemF0aW9uJyk7XHJcbiAgICBcclxuICAgIGlmICghYXV0aEhlYWRlciB8fCAhYXV0aEhlYWRlci5zdGFydHNXaXRoKCdCZWFyZXIgJykpIHtcclxuICAgICAgY29uc29sZS5sb2coJ1BPU1QgL2FwaS9wYXNzd29yZHMgLSBHZWVuIGdlbGRpZ2UgYXV0aG9yaXphdGllIGhlYWRlcicpO1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1VuYXV0aG9yaXplZCcgfSwgeyBzdGF0dXM6IDQwMSB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3QgdG9rZW4gPSBhdXRoSGVhZGVyLnNwbGl0KCcgJylbMV07XHJcbiAgICBjb25zdCB1c2VyRGF0YSA9IHZlcmlmeVRva2VuKHRva2VuKTtcclxuICAgIFxyXG4gICAgaWYgKCF1c2VyRGF0YSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnUE9TVCAvYXBpL3Bhc3N3b3JkcyAtIE9uZ2VsZGlnZSB0b2tlbicpO1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1VuYXV0aG9yaXplZCcgfSwgeyBzdGF0dXM6IDQwMSB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBXYWNodHdvb3JkZ2VnZXZlbnMgdWl0IGhldCByZXF1ZXN0IGhhbGVuXHJcbiAgICBjb25zdCB7IHRpdGxlLCBwYXNzd29yZCB9ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XHJcbiAgICBcclxuICAgIGlmICghdGl0bGUgfHwgIXBhc3N3b3JkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdQT1NUIC9hcGkvcGFzc3dvcmRzIC0gT250YnJla2VuZGUgZ2VnZXZlbnM6JywgeyB0aXRsZSwgcGFzc3dvcmQ6IHBhc3N3b3JkID8gJ1tSRURBQ1RFRF0nIDogJ21pc3NpbmcnIH0pO1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1RpdGxlIGFuZCBwYXNzd29yZCBhcmUgcmVxdWlyZWQnIH0sIHsgc3RhdHVzOiA0MDAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gV2FjaHR3b29yZCBvcHNsYWFuIGluIGRlIGRhdGFiYXNlXHJcbiAgICBjb25zdCBzYXZlZFBhc3N3b3JkID0gYXdhaXQgcHJpc21hLnBhc3N3b3JkLmNyZWF0ZSh7XHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICB3ZWJzaXRlOiB0aXRsZSxcclxuICAgICAgICB1c2VybmFtZTogJycsIC8vIExlZ2Ugc3RhbmRhYXJkd2FhcmRlIHZvb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxyXG4gICAgICAgIHBhc3N3b3JkLFxyXG4gICAgICAgIHVzZXJJZDogdXNlckRhdGEuaWRcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIGNvbnNvbGUubG9nKCdQT1NUIC9hcGkvcGFzc3dvcmRzIC0gV2FjaHR3b29yZCBzdWNjZXN2b2wgb3BnZXNsYWdlbjonLCB7IGlkOiBzYXZlZFBhc3N3b3JkLmlkLCB0aXRsZSB9KTtcclxuICAgIFxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHNhdmVkUGFzc3dvcmQpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdQT1NUIC9hcGkvcGFzc3dvcmRzIC0gRXJyb3I6JywgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgfVxyXG59ICJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJQcmlzbWFDbGllbnQiLCJ2ZXJpZnlUb2tlbiIsInByaXNtYSIsIkdFVCIsInJlcXVlc3QiLCJjb25zb2xlIiwibG9nIiwiYXV0aEhlYWRlciIsImhlYWRlcnMiLCJnZXQiLCJzdGFydHNXaXRoIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwidG9rZW4iLCJzcGxpdCIsInVzZXJEYXRhIiwicGFzc3dvcmRzIiwicGFzc3dvcmQiLCJmaW5kTWFueSIsIndoZXJlIiwidXNlcklkIiwiaWQiLCJvcmRlckJ5IiwiY3JlYXRlZEF0IiwibGVuZ3RoIiwiUE9TVCIsInRpdGxlIiwic2F2ZWRQYXNzd29yZCIsImNyZWF0ZSIsImRhdGEiLCJ3ZWJzaXRlIiwidXNlcm5hbWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/passwords/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/lib/auth.ts":
/*!*************************!*\
  !*** ./app/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateToken: () => (/* binding */ generateToken),\n/* harmony export */   verifyToken: () => (/* binding */ verifyToken)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n\nconst JWT_SECRET = process.env.JWT_SECRET || \"your-secret-key\";\nfunction verifyToken(token) {\n    try {\n        const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, JWT_SECRET);\n        console.log(\"Token geverifieerd:\", decoded);\n        return {\n            id: decoded.userId,\n            email: decoded.email\n        };\n    } catch (error) {\n        console.error(\"Token verificatie mislukt:\", error);\n        return null;\n    }\n}\nfunction generateToken(userId) {\n    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().sign({\n        userId\n    }, JWT_SECRET, {\n        expiresIn: \"24h\"\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvbGliL2F1dGgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUErQjtBQUUvQixNQUFNQyxhQUFhQyxRQUFRQyxHQUFHLENBQUNGLFVBQVUsSUFBSTtBQUV0QyxTQUFTRyxZQUFZQyxLQUFhO0lBQ3ZDLElBQUk7UUFDRixNQUFNQyxVQUFVTiwwREFBVSxDQUFDSyxPQUFPSjtRQUNsQ08sUUFBUUMsR0FBRyxDQUFDLHVCQUF1Qkg7UUFDbkMsT0FBTztZQUNMSSxJQUFJLFFBQWlCQyxNQUFNO1lBQzNCQyxPQUFPLFFBQWlCQSxLQUFLO1FBQy9CO0lBQ0YsRUFBRSxPQUFPQyxPQUFPO1FBQ2RMLFFBQVFLLEtBQUssQ0FBQyw4QkFBOEJBO1FBQzVDLE9BQU87SUFDVDtBQUNGO0FBRU8sU0FBU0MsY0FBY0gsTUFBYztJQUMxQyxPQUFPWCx3REFBUSxDQUFDO1FBQUVXO0lBQU8sR0FBR1YsWUFBWTtRQUFFZSxXQUFXO0lBQU07QUFDN0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYXNzZ2VuY3Vyc29yLy4vYXBwL2xpYi9hdXRoLnRzPzZiZmMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xyXG5cclxuY29uc3QgSldUX1NFQ1JFVCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgJ3lvdXItc2VjcmV0LWtleSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5VG9rZW4odG9rZW46IHN0cmluZykge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBkZWNvZGVkID0gand0LnZlcmlmeSh0b2tlbiwgSldUX1NFQ1JFVCk7XHJcbiAgICBjb25zb2xlLmxvZygnVG9rZW4gZ2V2ZXJpZmllZXJkOicsIGRlY29kZWQpO1xyXG4gICAgcmV0dXJuIHsgXHJcbiAgICAgIGlkOiAoZGVjb2RlZCBhcyBhbnkpLnVzZXJJZCwgXHJcbiAgICAgIGVtYWlsOiAoZGVjb2RlZCBhcyBhbnkpLmVtYWlsIFxyXG4gICAgfTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignVG9rZW4gdmVyaWZpY2F0aWUgbWlzbHVrdDonLCBlcnJvcik7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVRva2VuKHVzZXJJZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICByZXR1cm4gand0LnNpZ24oeyB1c2VySWQgfSwgSldUX1NFQ1JFVCwgeyBleHBpcmVzSW46ICcyNGgnIH0pO1xyXG59ICJdLCJuYW1lcyI6WyJqd3QiLCJKV1RfU0VDUkVUIiwicHJvY2VzcyIsImVudiIsInZlcmlmeVRva2VuIiwidG9rZW4iLCJkZWNvZGVkIiwidmVyaWZ5IiwiY29uc29sZSIsImxvZyIsImlkIiwidXNlcklkIiwiZW1haWwiLCJlcnJvciIsImdlbmVyYXRlVG9rZW4iLCJzaWduIiwiZXhwaXJlc0luIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/lib/auth.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/jws","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/safe-buffer","vendor-chunks/ms","vendor-chunks/lodash.once","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isplainobject","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isinteger","vendor-chunks/lodash.isboolean","vendor-chunks/lodash.includes","vendor-chunks/jwa","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fpasswords%2Froute&page=%2Fapi%2Fpasswords%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpasswords%2Froute.ts&appDir=C%3A%5CUsers%5CUser%5COneDrive%20-%20AP%20Hogeschool%20Antwerpen%5CBureaublad%5Cpassgencursor%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CUser%5COneDrive%20-%20AP%20Hogeschool%20Antwerpen%5CBureaublad%5Cpassgencursor&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();