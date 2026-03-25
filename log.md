2026-03-25T09:32:34.964Z Initializing build environment...
2026-03-25T09:32:34.964Z Initializing build environment...
2026-03-25T09:32:37.101Z Success: Finished initializing build environment
2026-03-25T09:32:38.042Z Cloning repository...
2026-03-25T09:32:39.602Z Restoring from dependencies cache
2026-03-25T09:32:39.604Z Restoring from build output cache
2026-03-25T09:32:39.608Z Detected the following tools from environment: npm@10.9.2, nodejs@22.16.0
2026-03-25T09:32:39.693Z Installing project dependencies: npm clean-install --progress=false
2026-03-25T09:32:52.592Z
2026-03-25T09:32:52.592Z added 492 packages, and audited 493 packages in 12s
2026-03-25T09:32:52.592Z
2026-03-25T09:32:52.596Z 71 packages are looking for funding
2026-03-25T09:32:52.596Z run `npm fund` for details
2026-03-25T09:32:52.596Z
2026-03-25T09:32:52.597Z 1 high severity vulnerability
2026-03-25T09:32:52.597Z
2026-03-25T09:32:52.597Z To address all issues, run:
2026-03-25T09:32:52.598Z npm audit fix
2026-03-25T09:32:52.598Z
2026-03-25T09:32:52.598Z Run `npm audit` for details.
2026-03-25T09:32:52.888Z Executing user build command: npm run build
2026-03-25T09:32:53.115Z
2026-03-25T09:32:53.115Z > my-app@0.0.0 build
2026-03-25T09:32:53.115Z > tsc -b && vite build
2026-03-25T09:32:53.116Z
2026-03-25T09:33:01.158Z /opt/buildhome/repo/node_modules/rollup/dist/native.js:115
2026-03-25T09:33:01.159Z throw new Error(
2026-03-25T09:33:01.159Z ^
2026-03-25T09:33:01.159Z
2026-03-25T09:33:01.159Z Error: Cannot find module @rollup/rollup-linux-x64-gnu. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try `npm i` again after removing both package-lock.json and node_modules directory.
2026-03-25T09:33:01.159Z at requireWithFriendlyError (/opt/buildhome/repo/node_modules/rollup/dist/native.js:115:9)
2026-03-25T09:33:01.159Z at Object.<anonymous> (/opt/buildhome/repo/node_modules/rollup/dist/native.js:124:76)
2026-03-25T09:33:01.159Z at Module.\_compile (node:internal/modules/cjs/loader:1730:14)
2026-03-25T09:33:01.159Z at Object..js (node:internal/modules/cjs/loader:1895:10)
2026-03-25T09:33:01.159Z at Module.load (node:internal/modules/cjs/loader:1465:32)
2026-03-25T09:33:01.159Z at Function.\_load (node:internal/modules/cjs/loader:1282:12)
2026-03-25T09:33:01.159Z at TracingChannel.traceSync (node:diagnostics_channel:322:14)
2026-03-25T09:33:01.159Z at wrapModuleLoad (node:internal/modules/cjs/loader:235:24)
2026-03-25T09:33:01.159Z at cjsLoader (node:internal/modules/esm/translators:266:5)
2026-03-25T09:33:01.159Z at ModuleWrap.<anonymous> (node:internal/modules/esm/translators:200:7) {
2026-03-25T09:33:01.160Z [cause]: Error: Cannot find module '@rollup/rollup-linux-x64-gnu'
2026-03-25T09:33:01.160Z Require stack:
2026-03-25T09:33:01.160Z - /opt/buildhome/repo/node_modules/rollup/dist/native.js
2026-03-25T09:33:01.160Z at Function.\_resolveFilename (node:internal/modules/cjs/loader:1401:15)
2026-03-25T09:33:01.160Z at defaultResolveImpl (node:internal/modules/cjs/loader:1057:19)
2026-03-25T09:33:01.160Z at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1062:22)
2026-03-25T09:33:01.160Z at Function.\_load (node:internal/modules/cjs/loader:1211:37)
2026-03-25T09:33:01.160Z at TracingChannel.traceSync (node:diagnostics_channel:322:14)
2026-03-25T09:33:01.160Z at wrapModuleLoad (node:internal/modules/cjs/loader:235:24)
2026-03-25T09:33:01.160Z at Module.require (node:internal/modules/cjs/loader:1487:12)
2026-03-25T09:33:01.160Z at require (node:internal/modules/helpers:135:16)
2026-03-25T09:33:01.160Z at requireWithFriendlyError (/opt/buildhome/repo/node_modules/rollup/dist/native.js:97:10)
2026-03-25T09:33:01.160Z at Object.<anonymous> (/opt/buildhome/repo/node_modules/rollup/dist/native.js:124:76) {
2026-03-25T09:33:01.160Z code: 'MODULE_NOT_FOUND',
2026-03-25T09:33:01.160Z requireStack: [ '/opt/buildhome/repo/node_modules/rollup/dist/native.js' ]
2026-03-25T09:33:01.160Z }
2026-03-25T09:33:01.161Z }
2026-03-25T09:33:01.163Z
2026-03-25T09:33:01.163Z Node.js v22.16.0
2026-03-25T09:33:01.200Z Failed: error occurred while running build command
