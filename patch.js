var Module = typeof Module != "undefined" ? Module : {};
var ENVIRONMENT_IS_WEB = typeof window == "object";
var ENVIRONMENT_IS_WORKER = typeof WorkerGlobalScope != "undefined";
var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string" && process.type != "renderer";
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
var ENVIRONMENT_IS_PTHREAD = ENVIRONMENT_IS_WORKER && self.name?.startsWith("em-pthread");
Module["expectedDataFileDownloads"] ??= 0;
Module["expectedDataFileDownloads"]++;
( () => {
    var isPthread = typeof ENVIRONMENT_IS_PTHREAD != "undefined" && ENVIRONMENT_IS_PTHREAD;
    var isWasmWorker = typeof ENVIRONMENT_IS_WASM_WORKER != "undefined" && ENVIRONMENT_IS_WASM_WORKER;
    if (isPthread || isWasmWorker)
        return;
    function loadPackage(metadata) {
        var PACKAGE_PATH = "";
        if (typeof window === "object") {
            PACKAGE_PATH = window["encodeURIComponent"](window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/")) + "/")
        } else if (typeof process === "undefined" && typeof location !== "undefined") {
            PACKAGE_PATH = encodeURIComponent(location.pathname.substring(0, location.pathname.lastIndexOf("/")) + "/")
        }
        var PACKAGE_NAME = "RobloxLinuxClient.data";
        var REMOTE_PACKAGE_BASE = "RobloxLinuxClient.data";
        var REMOTE_PACKAGE_NAME = Module["locateFile"] ? Module["locateFile"](REMOTE_PACKAGE_BASE, "") : REMOTE_PACKAGE_BASE;
        var REMOTE_PACKAGE_SIZE = metadata["remote_package_size"];
        function fetchRemotePackage(packageName, packageSize, callback, errback) {
            Module["dataFileDownloads"] ??= {};
            fetch(packageName).catch(cause => Promise.reject(new Error(`Network Error: ${packageName}`,{
                cause
            }))).then(response => {
                if (!response.ok) {
                    return Promise.reject(new Error(`${response.status}: ${response.url}`))
                }
                if (!response.body && response.arrayBuffer) {
                    return response.arrayBuffer().then(callback)
                }
                const reader = response.body.getReader();
                const iterate = () => reader.read().then(handleChunk).catch(cause => Promise.reject(new Error(`Unexpected error while handling : ${response.url} ${cause}`,{
                    cause
                })));
                const chunks = [];
                const headers = response.headers;
                const total = Number(headers.get("Content-Length") ?? packageSize);
                let loaded = 0;
                const handleChunk = ({done, value}) => {
                    if (!done) {
                        chunks.push(value);
                        loaded += value.length;
                        Module["dataFileDownloads"][packageName] = {
                            loaded,
                            total
                        };
                        let totalLoaded = 0;
                        let totalSize = 0;
                        for (const download of Object.values(Module["dataFileDownloads"])) {
                            totalLoaded += download.loaded;
                            totalSize += download.total
                        }
                        Module["setStatus"]?.(`Downloading data... (${totalLoaded}/${totalSize})`);
                        return iterate()
                    } else {
                        const packageData = new Uint8Array(chunks.map(c => c.length).reduce( (a, b) => a + b, 0));
                        let offset = 0;
                        for (const chunk of chunks) {
                            packageData.set(chunk, offset);
                            offset += chunk.length
                        }
                        callback(packageData.buffer)
                    }
                }
                ;
                Module["setStatus"]?.("Downloading data...");
                return iterate()
            }
            )
        }
        function handleError(error) {
            console.error("package error:", error)
        }
        var fetchedCallback = null;
        var fetched = Module["getPreloadedPackage"] ? Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;
        if (!fetched)
            fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, data => {
                if (fetchedCallback) {
                    fetchedCallback(data);
                    fetchedCallback = null
                } else {
                    fetched = data
                }
            }
            , handleError);
        function runWithFS(Module) {
            function assert(check, msg) {
                if (!check)
                    throw msg + (new Error).stack
            }
            Module["FS_createPath"]("/", "PlatformContent", true, true);
            Module["FS_createPath"]("/PlatformContent", "pc", true, true);
            Module["FS_createPath"]("/PlatformContent/pc", "terrain", true, true);
            Module["FS_createPath"]("/PlatformContent/pc", "textures", true, true);
            Module["FS_createPath"]("/PlatformContent/pc/textures", "aluminum", true, true);
            Module["FS_createPath"]("/PlatformContent/pc/textures", "brick", true, true);
            Module["FS_createPath"]("/PlatformContent/pc/textures", "cobblestone", true, true);
            Module["FS_createPath"]("/PlatformContent/pc/textures", "concrete", true, true);
            Module["FS_createPath"]("/PlatformContent/pc/textures", "diamondplate", true, true);
            Module["FS_createPath"]("/PlatformContent/pc/textures", "fabric", true, true);
            Module["FS_createPath"]("/PlatformContent/pc/textures", "granite", true, true);
            Module["FS_createPath"]("/PlatformContent/pc/textures", "grass", true, true);
            Module["FS_createPath"]("/PlatformContent/pc/textures", "ice", true, true);
            Module["FS_createPath"]("/PlatformContent/pc/textures", "marble", true, true);
            Module["FS_createPath"]("/PlatformContent/pc/textures", "metal", true, true);
            Module["FS_createPath"]("/PlatformContent/pc/textures", "pebble", true, true);
            Module["FS_createPath"]("/PlatformContent/pc/textures", "plastic", true, true);
            Module["FS_createPath"]("/PlatformContent/pc/textures", "rust", true, true);
            Module["FS_createPath"]("/PlatformContent/pc/textures", "sand", true, true);
            Module["FS_createPath"]("/PlatformContent/pc/textures", "sky", true, true);
            Module["FS_createPath"]("/PlatformContent/pc/textures", "slate", true, true);
            Module["FS_createPath"]("/PlatformContent/pc/textures", "terrain", true, true);
            Module["FS_createPath"]("/PlatformContent/pc/textures", "water", true, true);
            Module["FS_createPath"]("/PlatformContent/pc/textures", "wood", true, true);
            Module["FS_createPath"]("/PlatformContent/pc/textures", "woodplanks", true, true);
            Module["FS_createPath"]("/", "content", true, true);
            Module["FS_createPath"]("/content", "fonts", true, true);
            Module["FS_createPath"]("/content", "music", true, true);
            Module["FS_createPath"]("/content", "particles", true, true);
            Module["FS_createPath"]("/content", "scripts", true, true);
            Module["FS_createPath"]("/content/scripts", "CoreScripts", true, true);
            Module["FS_createPath"]("/content/scripts/CoreScripts", "BuildToolsScripts", true, true);
            Module["FS_createPath"]("/content/scripts", "Libraries", true, true);
            Module["FS_createPath"]("/content/scripts", "Modules", true, true);
            Module["FS_createPath"]("/content/scripts/Modules", "Settings", true, true);
            Module["FS_createPath"]("/content/scripts/Modules/Settings", "Pages", true, true);
            Module["FS_createPath"]("/content/scripts", "ServerCoreScripts", true, true);
            Module["FS_createPath"]("/content", "sky", true, true);
            Module["FS_createPath"]("/content", "sounds", true, true);
            Module["FS_createPath"]("/content", "textures", true, true);
            Module["FS_createPath"]("/content/textures", "Cursors", true, true);
            Module["FS_createPath"]("/content/textures/Cursors", "Gamepad", true, true);
            Module["FS_createPath"]("/content/textures", "loading", true, true);
            Module["FS_createPath"]("/content/textures", "particles", true, true);
            Module["FS_createPath"]("/content/textures", "ui", true, true);
            Module["FS_createPath"]("/content/textures/ui", "Backpack", true, true);
            Module["FS_createPath"]("/content/textures/ui", "Chat", true, true);
            Module["FS_createPath"]("/content/textures/ui", "Menu", true, true);
            Module["FS_createPath"]("/content/textures/ui", "PlayerList", true, true);
            Module["FS_createPath"]("/content/textures/ui", "Scroll", true, true);
            Module["FS_createPath"]("/content/textures/ui", "Settings", true, true);
            Module["FS_createPath"]("/content/textures/ui/Settings", "DropDown", true, true);
            Module["FS_createPath"]("/content/textures/ui/Settings", "Help", true, true);
            Module["FS_createPath"]("/content/textures/ui/Settings", "MenuBarAssets", true, true);
            Module["FS_createPath"]("/content/textures/ui/Settings", "MenuBarIcons", true, true);
            Module["FS_createPath"]("/content/textures/ui/Settings", "Radial", true, true);
            Module["FS_createPath"]("/content/textures/ui/Settings", "Slider", true, true);
            Module["FS_createPath"]("/content/textures/ui", "TopBar", true, true);
            Module["FS_createPath"]("/content/textures/ui", "Vehicle", true, true);
            Module["FS_createPath"]("/", "shaders", true, true);
            Module["FS_createPath"]("/shaders", "source", true, true);
            function DataRequest(start, end, audio) {
                this.start = start;
                this.end = end;
                this.audio = audio
            }
            DataRequest.prototype = {
                requests: {},
                open: function(mode, name) {
                    this.name = name;
                    this.requests[name] = this;
                    Module["addRunDependency"](`fp ${this.name}`)
                },
                send: function() {},
                onload: function() {
                    var byteArray = this.byteArray.subarray(this.start, this.end);
                    this.finish(byteArray)
                },
                finish: function(byteArray) {
                    var that = this;
                    Module["FS_createDataFile"](this.name, null, byteArray, true, true, true);
                    Module["removeRunDependency"](`fp ${that.name}`);
                    this.requests[this.name] = null
                }
            };
            var files = metadata["files"];
            for (var i = 0; i < files.length; ++i) {
                new DataRequest(files[i]["start"],files[i]["end"],files[i]["audio"] || 0).open("GET", files[i]["filename"])
            }
            function processPackageData(arrayBuffer) {
                assert(arrayBuffer, "Loading data file failed.");
                assert(arrayBuffer.constructor.name === ArrayBuffer.name, "bad input to processPackageData");
                var byteArray = new Uint8Array(arrayBuffer);
                DataRequest.prototype.byteArray = byteArray;
                var files = metadata["files"];
                for (var i = 0; i < files.length; ++i) {
                    DataRequest.prototype.requests[files[i].filename].onload()
                }
                Module["removeRunDependency"]("datafile_RobloxLinuxClient.data")
            }
            Module["addRunDependency"]("datafile_RobloxLinuxClient.data");
            Module["preloadResults"] ??= {};
            Module["preloadResults"][PACKAGE_NAME] = {
                fromCache: false
            };
            if (fetched) {
                processPackageData(fetched);
                fetched = null
            } else {
                fetchedCallback = processPackageData
            }
        }
        if (Module["calledRun"]) {
            runWithFS(Module)
        } else {
            (Module["preRun"] ??= []).push(runWithFS)
        }
    }
    loadPackage({
        files: [{
            filename: "/PlatformContent/pc/terrain/diffuse.dds",
            start: 0,
            end: 11184952
        }, {
            filename: "/PlatformContent/pc/terrain/materials.json",
            start: 11184952,
            end: 11187879
        }, {
            filename: "/PlatformContent/pc/terrain/normal.dds",
            start: 11187879,
            end: 33557655
        }, {
            filename: "/PlatformContent/pc/terrain/specular.dds",
            start: 33557655,
            end: 44742607
        }, {
            filename: "/PlatformContent/pc/textures/aluminum/diffuse.dds",
            start: 44742607,
            end: 44742759
        }, {
            filename: "/PlatformContent/pc/textures/aluminum/normal.dds",
            start: 44742759,
            end: 45092439
        }, {
            filename: "/PlatformContent/pc/textures/aluminum/normaldetail.dds",
            start: 45092439,
            end: 45092615
        }, {
            filename: "/PlatformContent/pc/textures/aluminum/specular.dds",
            start: 45092615,
            end: 45092767
        }, {
            filename: "/PlatformContent/pc/textures/brick/diffuse.dds",
            start: 45092767,
            end: 45442447
        }, {
            filename: "/PlatformContent/pc/textures/brick/normal.dds",
            start: 45442447,
            end: 46840703
        }, {
            filename: "/PlatformContent/pc/textures/brick/normaldetail.dds",
            start: 46840703,
            end: 46840879
        }, {
            filename: "/PlatformContent/pc/textures/brick/specular.dds",
            start: 46840879,
            end: 47540071
        }, {
            filename: "/PlatformContent/pc/textures/cobblestone/diffuse.dds",
            start: 47540071,
            end: 48938327
        }, {
            filename: "/PlatformContent/pc/textures/cobblestone/normal.dds",
            start: 48938327,
            end: 50336583
        }, {
            filename: "/PlatformContent/pc/textures/cobblestone/normaldetail.dds",
            start: 50336583,
            end: 50336759
        }, {
            filename: "/PlatformContent/pc/textures/cobblestone/specular.dds",
            start: 50336759,
            end: 51035951
        }, {
            filename: "/PlatformContent/pc/textures/concrete/diffuse.dds",
            start: 51035951,
            end: 51735143
        }, {
            filename: "/PlatformContent/pc/textures/concrete/normal.dds",
            start: 51735143,
            end: 53133399
        }, {
            filename: "/PlatformContent/pc/textures/concrete/normaldetail.dds",
            start: 53133399,
            end: 53483079
        }, {
            filename: "/PlatformContent/pc/textures/concrete/specular.dds",
            start: 53483079,
            end: 53657983
        }, {
            filename: "/PlatformContent/pc/textures/diamondplate/diffuse.dds",
            start: 53657983,
            end: 53832887
        }, {
            filename: "/PlatformContent/pc/textures/diamondplate/normal.dds",
            start: 53832887,
            end: 54182567
        }, {
            filename: "/PlatformContent/pc/textures/diamondplate/normaldetail.dds",
            start: 54182567,
            end: 54182743
        }, {
            filename: "/PlatformContent/pc/textures/diamondplate/specular.dds",
            start: 54182743,
            end: 54357647
        }, {
            filename: "/PlatformContent/pc/textures/fabric/diffuse.dds",
            start: 54357647,
            end: 54707327
        }, {
            filename: "/PlatformContent/pc/textures/fabric/normal.dds",
            start: 54707327,
            end: 55057007
        }, {
            filename: "/PlatformContent/pc/textures/fabric/normaldetail.dds",
            start: 55057007,
            end: 55057183
        }, {
            filename: "/PlatformContent/pc/textures/fabric/specular.dds",
            start: 55057183,
            end: 55232087
        }, {
            filename: "/PlatformContent/pc/textures/granite/diffuse.dds",
            start: 55232087,
            end: 55931279
        }, {
            filename: "/PlatformContent/pc/textures/granite/normal.dds",
            start: 55931279,
            end: 55931455
        }, {
            filename: "/PlatformContent/pc/textures/granite/normaldetail.dds",
            start: 55931455,
            end: 55931631
        }, {
            filename: "/PlatformContent/pc/textures/granite/specular.dds",
            start: 55931631,
            end: 56630823
        }, {
            filename: "/PlatformContent/pc/textures/grass/diffuse.dds",
            start: 56630823,
            end: 56980503
        }, {
            filename: "/PlatformContent/pc/textures/grass/normal.dds",
            start: 56980503,
            end: 57330183
        }, {
            filename: "/PlatformContent/pc/textures/grass/normaldetail.dds",
            start: 57330183,
            end: 57330359
        }, {
            filename: "/PlatformContent/pc/textures/grass/specular.dds",
            start: 57330359,
            end: 57505263
        }, {
            filename: "/PlatformContent/pc/textures/ice/diffuse.dds",
            start: 57505263,
            end: 57505415
        }, {
            filename: "/PlatformContent/pc/textures/ice/normal.dds",
            start: 57505415,
            end: 57855095
        }, {
            filename: "/PlatformContent/pc/textures/ice/normaldetail.dds",
            start: 57855095,
            end: 57855271
        }, {
            filename: "/PlatformContent/pc/textures/ice/specular.dds",
            start: 57855271,
            end: 58554463
        }, {
            filename: "/PlatformContent/pc/textures/marble/diffuse.dds",
            start: 58554463,
            end: 59253655
        }, {
            filename: "/PlatformContent/pc/textures/marble/normal.dds",
            start: 59253655,
            end: 59253831
        }, {
            filename: "/PlatformContent/pc/textures/marble/normaldetail.dds",
            start: 59253831,
            end: 59254007
        }, {
            filename: "/PlatformContent/pc/textures/marble/specular.dds",
            start: 59254007,
            end: 59953199
        }, {
            filename: "/PlatformContent/pc/textures/metal/diffuse.dds",
            start: 59953199,
            end: 60128103
        }, {
            filename: "/PlatformContent/pc/textures/metal/normal.dds",
            start: 60128103,
            end: 60477783
        }, {
            filename: "/PlatformContent/pc/textures/metal/normaldetail.dds",
            start: 60477783,
            end: 60477959
        }, {
            filename: "/PlatformContent/pc/textures/metal/specular.dds",
            start: 60477959,
            end: 60652863
        }, {
            filename: "/PlatformContent/pc/textures/pebble/diffuse.dds",
            start: 60652863,
            end: 60827767
        }, {
            filename: "/PlatformContent/pc/textures/pebble/normal.dds",
            start: 60827767,
            end: 60827943
        }, {
            filename: "/PlatformContent/pc/textures/pebble/normaldetail.dds",
            start: 60827943,
            end: 60828119
        }, {
            filename: "/PlatformContent/pc/textures/pebble/specular.dds",
            start: 60828119,
            end: 61003023
        }, {
            filename: "/PlatformContent/pc/textures/plastic/diffuse.dds",
            start: 61003023,
            end: 61178007
        }, {
            filename: "/PlatformContent/pc/textures/plastic/normal.dds",
            start: 61178007,
            end: 61527847
        }, {
            filename: "/PlatformContent/pc/textures/plastic/normaldetail.dds",
            start: 61527847,
            end: 61877527
        }, {
            filename: "/PlatformContent/pc/textures/rust/diffuse.dds",
            start: 61877527,
            end: 63275783
        }, {
            filename: "/PlatformContent/pc/textures/rust/normal.dds",
            start: 63275783,
            end: 64674039
        }, {
            filename: "/PlatformContent/pc/textures/rust/normaldetail.dds",
            start: 64674039,
            end: 64674215
        }, {
            filename: "/PlatformContent/pc/textures/rust/specular.dds",
            start: 64674215,
            end: 65373407
        }, {
            filename: "/PlatformContent/pc/textures/sand/diffuse.dds",
            start: 65373407,
            end: 66072599
        }, {
            filename: "/PlatformContent/pc/textures/sand/normal.dds",
            start: 66072599,
            end: 66422279
        }, {
            filename: "/PlatformContent/pc/textures/sand/normaldetail.dds",
            start: 66422279,
            end: 66422455
        }, {
            filename: "/PlatformContent/pc/textures/sand/specular.dds",
            start: 66422455,
            end: 67121647
        }, {
            filename: "/PlatformContent/pc/textures/sky/sky512_bk.tex",
            start: 67121647,
            end: 67820839
        }, {
            filename: "/PlatformContent/pc/textures/sky/sky512_dn.tex",
            start: 67820839,
            end: 68520031
        }, {
            filename: "/PlatformContent/pc/textures/sky/sky512_ft.tex",
            start: 68520031,
            end: 69219223
        }, {
            filename: "/PlatformContent/pc/textures/sky/sky512_lf.tex",
            start: 69219223,
            end: 69918415
        }, {
            filename: "/PlatformContent/pc/textures/sky/sky512_rt.tex",
            start: 69918415,
            end: 70617607
        }, {
            filename: "/PlatformContent/pc/textures/sky/sky512_up.tex",
            start: 70617607,
            end: 71316799
        }, {
            filename: "/PlatformContent/pc/textures/slate/diffuse.dds",
            start: 71316799,
            end: 72015991
        }, {
            filename: "/PlatformContent/pc/textures/slate/normal.dds",
            start: 72015991,
            end: 73414247
        }, {
            filename: "/PlatformContent/pc/textures/slate/normaldetail.dds",
            start: 73414247,
            end: 73763927
        }, {
            filename: "/PlatformContent/pc/textures/slate/specular.dds",
            start: 73763927,
            end: 73938831
        }, {
            filename: "/PlatformContent/pc/textures/studs.dds",
            start: 73938831,
            end: 74113815
        }, {
            filename: "/PlatformContent/pc/textures/terrain/diffuse.dds",
            start: 74113815,
            end: 76910159
        }, {
            filename: "/PlatformContent/pc/textures/terrain/diffusefar.dds",
            start: 76910159,
            end: 79706503
        }, {
            filename: "/PlatformContent/pc/textures/terrain/normal.dds",
            start: 79706503,
            end: 85299063
        }, {
            filename: "/PlatformContent/pc/textures/terrain/specular.dds",
            start: 85299063,
            end: 88095407
        }, {
            filename: "/PlatformContent/pc/textures/wangIndex.dds",
            start: 88095407,
            end: 88128303
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_01.dds",
            start: 88128303,
            end: 88215839
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_02.dds",
            start: 88215839,
            end: 88303375
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_03.dds",
            start: 88303375,
            end: 88390911
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_04.dds",
            start: 88390911,
            end: 88478447
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_05.dds",
            start: 88478447,
            end: 88565983
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_06.dds",
            start: 88565983,
            end: 88653519
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_07.dds",
            start: 88653519,
            end: 88741055
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_08.dds",
            start: 88741055,
            end: 88828591
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_09.dds",
            start: 88828591,
            end: 88916127
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_10.dds",
            start: 88916127,
            end: 89003663
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_11.dds",
            start: 89003663,
            end: 89091199
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_12.dds",
            start: 89091199,
            end: 89178735
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_13.dds",
            start: 89178735,
            end: 89266271
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_14.dds",
            start: 89266271,
            end: 89353807
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_15.dds",
            start: 89353807,
            end: 89441343
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_16.dds",
            start: 89441343,
            end: 89528879
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_17.dds",
            start: 89528879,
            end: 89616415
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_18.dds",
            start: 89616415,
            end: 89703951
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_19.dds",
            start: 89703951,
            end: 89791487
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_20.dds",
            start: 89791487,
            end: 89879023
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_21.dds",
            start: 89879023,
            end: 89966559
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_22.dds",
            start: 89966559,
            end: 90054095
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_23.dds",
            start: 90054095,
            end: 90141631
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_24.dds",
            start: 90141631,
            end: 90229167
        }, {
            filename: "/PlatformContent/pc/textures/water/normal_25.dds",
            start: 90229167,
            end: 90316703
        }, {
            filename: "/PlatformContent/pc/textures/wood/diffuse.dds",
            start: 90316703,
            end: 91015895
        }, {
            filename: "/PlatformContent/pc/textures/wood/normal.dds",
            start: 91015895,
            end: 91365575
        }, {
            filename: "/PlatformContent/pc/textures/wood/normaldetail.dds",
            start: 91365575,
            end: 91715255
        }, {
            filename: "/PlatformContent/pc/textures/wood/specular.dds",
            start: 91715255,
            end: 92414447
        }, {
            filename: "/PlatformContent/pc/textures/woodplanks/diffuse.dds",
            start: 92414447,
            end: 92764127
        }, {
            filename: "/PlatformContent/pc/textures/woodplanks/normal.dds",
            start: 92764127,
            end: 93113807
        }, {
            filename: "/PlatformContent/pc/textures/woodplanks/normaldetail.dds",
            start: 93113807,
            end: 93113983
        }, {
            filename: "/PlatformContent/pc/textures/woodplanks/specular.dds",
            start: 93113983,
            end: 93288887
        }, {
            filename: "/content/fonts/Arial.font",
            start: 93288887,
            end: 93349227
        }, {
            filename: "/content/fonts/ArialBold.font",
            start: 93349227,
            end: 93397071
        }, {
            filename: "/content/fonts/CompositExtraSlot0.mesh",
            start: 93397071,
            end: 93397888
        }, {
            filename: "/content/fonts/CompositExtraSlot1.mesh",
            start: 93397888,
            end: 93398705
        }, {
            filename: "/content/fonts/CompositExtraSlot2.mesh",
            start: 93398705,
            end: 93399522
        }, {
            filename: "/content/fonts/CompositExtraSlot3.mesh",
            start: 93399522,
            end: 93400339
        }, {
            filename: "/content/fonts/CompositExtraSlot4.mesh",
            start: 93400339,
            end: 93401156
        }, {
            filename: "/content/fonts/CompositFullAtlasBaseTexture.mesh",
            start: 93401156,
            end: 93401349
        }, {
            filename: "/content/fonts/CompositFullAtlasOverlayTexture.mesh",
            start: 93401349,
            end: 93401542
        }, {
            filename: "/content/fonts/CompositLeftArmBase.mesh",
            start: 93401542,
            end: 93430463
        }, {
            filename: "/content/fonts/CompositLeftLegBase.mesh",
            start: 93430463,
            end: 93459384
        }, {
            filename: "/content/fonts/CompositPantsTemplate.mesh",
            start: 93459384,
            end: 93502585
        }, {
            filename: "/content/fonts/CompositRightArmBase.mesh",
            start: 93502585,
            end: 93531170
        }, {
            filename: "/content/fonts/CompositRightLegBase.mesh",
            start: 93531170,
            end: 93559755
        }, {
            filename: "/content/fonts/CompositShirtTemplate.mesh",
            start: 93559755,
            end: 93602956
        }, {
            filename: "/content/fonts/CompositTShirt.mesh",
            start: 93602956,
            end: 93603149
        }, {
            filename: "/content/fonts/CompositTorsoBase.mesh",
            start: 93603149,
            end: 93632070
        }, {
            filename: "/content/fonts/LoadingScript.lua",
            start: 93632070,
            end: 93656899
        }, {
            filename: "/content/fonts/Rocket.rbxm",
            start: 93656899,
            end: 93661298
        }, {
            filename: "/content/fonts/SlingshotPellet.rbxm",
            start: 93661298,
            end: 93664647
        }, {
            filename: "/content/fonts/SourceSans.font",
            start: 93664647,
            end: 93739091
        }, {
            filename: "/content/fonts/SourceSansBold.font",
            start: 93739091,
            end: 93817279
        }, {
            filename: "/content/fonts/SourceSansItalic.font",
            start: 93817279,
            end: 93892587
        }, {
            filename: "/content/fonts/SourceSansLight.font",
            start: 93892587,
            end: 93967223
        }, {
            filename: "/content/fonts/SourceSansPro-Bold.ttf",
            start: 93967223,
            end: 94258807
        }, {
            filename: "/content/fonts/SourceSansPro-It.ttf",
            start: 94258807,
            end: 94362427
        }, {
            filename: "/content/fonts/SourceSansPro-Light.ttf",
            start: 94362427,
            end: 94655731
        }, {
            filename: "/content/fonts/SourceSansPro-Regular.ttf",
            start: 94655731,
            end: 94949691
        }, {
            filename: "/content/fonts/arial.ttf",
            start: 94949691,
            end: 95723543
        }, {
            filename: "/content/fonts/arialbd.ttf",
            start: 95723543,
            end: 96473759
        }, {
            filename: "/content/fonts/character.rbxm",
            start: 96473759,
            end: 96489891
        }, {
            filename: "/content/fonts/character3.rbxm",
            start: 96489891,
            end: 96508260
        }, {
            filename: "/content/fonts/characterCameraScript.rbxmx",
            start: 96508260,
            end: 96636098
        }, {
            filename: "/content/fonts/characterControlScript.rbxmx",
            start: 96636098,
            end: 96704665
        }, {
            filename: "/content/fonts/characterR15.rbxm",
            start: 96704665,
            end: 96710216
        }, {
            filename: "/content/fonts/comics.fnt",
            start: 96710216,
            end: 96725464
        }, {
            filename: "/content/fonts/diogenes.fnt",
            start: 96725464,
            end: 96725464
        }, {
            filename: "/content/fonts/fonts.dds",
            start: 96725464,
            end: 100919896
        }, {
            filename: "/content/fonts/gamecontrollerdb.txt",
            start: 100919896,
            end: 100943874
        }, {
            filename: "/content/fonts/head.mesh",
            start: 100943874,
            end: 100972663
        }, {
            filename: "/content/fonts/headA.mesh",
            start: 100972663,
            end: 100986224
        }, {
            filename: "/content/fonts/headB.mesh",
            start: 100986224,
            end: 100987257
        }, {
            filename: "/content/fonts/headC.mesh",
            start: 100987257,
            end: 101006218
        }, {
            filename: "/content/fonts/headD.mesh",
            start: 101006218,
            end: 101035727
        }, {
            filename: "/content/fonts/headE.mesh",
            start: 101035727,
            end: 101060232
        }, {
            filename: "/content/fonts/headF.mesh",
            start: 101060232,
            end: 101069833
        }, {
            filename: "/content/fonts/headG.mesh",
            start: 101069833,
            end: 101091422
        }, {
            filename: "/content/fonts/headH.mesh",
            start: 101091422,
            end: 101120211
        }, {
            filename: "/content/fonts/headI.mesh",
            start: 101120211,
            end: 101123092
        }, {
            filename: "/content/fonts/headJ.mesh",
            start: 101123092,
            end: 101125757
        }, {
            filename: "/content/fonts/headK.mesh",
            start: 101125757,
            end: 101154546
        }, {
            filename: "/content/fonts/headL.mesh",
            start: 101154546,
            end: 101168575
        }, {
            filename: "/content/fonts/headM.mesh",
            start: 101168575,
            end: 101171816
        }, {
            filename: "/content/fonts/headN.mesh",
            start: 101171816,
            end: 101201325
        }, {
            filename: "/content/fonts/headO.mesh",
            start: 101201325,
            end: 101220430
        }, {
            filename: "/content/fonts/headP.mesh",
            start: 101220430,
            end: 101249939
        }, {
            filename: "/content/fonts/humanoidAnimate.rbxm",
            start: 101249939,
            end: 101256897
        }, {
            filename: "/content/fonts/humanoidAnimateLocal.rbxm",
            start: 101256897,
            end: 101265304
        }, {
            filename: "/content/fonts/humanoidAnimateLocalKeyframe.rbxm",
            start: 101265304,
            end: 101287253
        }, {
            filename: "/content/fonts/humanoidAnimateLocalKeyframe2.rbxm",
            start: 101287253,
            end: 101306483
        }, {
            filename: "/content/fonts/humanoidAnimateR15.rbxm",
            start: 101306483,
            end: 101312332
        }, {
            filename: "/content/fonts/humanoidExtra.rbxm",
            start: 101312332,
            end: 101314968
        }, {
            filename: "/content/fonts/humanoidSound.rbxm",
            start: 101314968,
            end: 101317210
        }, {
            filename: "/content/fonts/humanoidSound2.rbxm",
            start: 101317210,
            end: 101318968
        }, {
            filename: "/content/fonts/humanoidSoundNew.rbxm",
            start: 101318968,
            end: 101323154
        }, {
            filename: "/content/fonts/humanoidSoundNewLocal.rbxmx",
            start: 101323154,
            end: 101331673
        }, {
            filename: "/content/fonts/humanoidStatic.rbxm",
            start: 101331673,
            end: 101332277
        }, {
            filename: "/content/fonts/leftarm.mesh",
            start: 101332277,
            end: 101334342
        }, {
            filename: "/content/fonts/leftleg.mesh",
            start: 101334342,
            end: 101336407
        }, {
            filename: "/content/fonts/rightarm.mesh",
            start: 101336407,
            end: 101338472
        }, {
            filename: "/content/fonts/rightleg.mesh",
            start: 101338472,
            end: 101340537
        }, {
            filename: "/content/fonts/safechat.xml",
            start: 101340537,
            end: 101365292
        }, {
            filename: "/content/fonts/torso.mesh",
            start: 101365292,
            end: 101367357
        }, {
            filename: "/content/music/bass.wav",
            start: 101367357,
            end: 101373737,
            audio: 1
        }, {
            filename: "/content/music/ufofly.wav",
            start: 101373737,
            end: 101408179,
            audio: 1
        }, {
            filename: "/content/particles/explosion.particle",
            start: 101408179,
            end: 101411765
        }, {
            filename: "/content/particles/fire.particle",
            start: 101411765,
            end: 101413152
        }, {
            filename: "/content/particles/forceFieldBeam.particle",
            start: 101413152,
            end: 101414016
        }, {
            filename: "/content/particles/forceFieldRadial.particle",
            start: 101414016,
            end: 101415149
        }, {
            filename: "/content/particles/smoke.particle",
            start: 101415149,
            end: 101415988
        }, {
            filename: "/content/particles/sparkles.particle",
            start: 101415988,
            end: 101416927
        }, {
            filename: "/content/scripts/CoreScripts/BubbleChat.lua",
            start: 101416927,
            end: 101438288
        }, {
            filename: "/content/scripts/CoreScripts/BuildToolsScripts/BuildToolManager.lua",
            start: 101438288,
            end: 101442934
        }, {
            filename: "/content/scripts/CoreScripts/BuildToolsScripts/BuildToolsScript.lua",
            start: 101442934,
            end: 101448275
        }, {
            filename: "/content/scripts/CoreScripts/BuildToolsScripts/PersonalServerScript.lua",
            start: 101448275,
            end: 101453906
        }, {
            filename: "/content/scripts/CoreScripts/ContextActionTouch.lua",
            start: 101453906,
            end: 101462317
        }, {
            filename: "/content/scripts/CoreScripts/DeveloperConsole.lua",
            start: 101462317,
            end: 101502319
        }, {
            filename: "/content/scripts/CoreScripts/GamepadMenu.lua",
            start: 101502319,
            end: 101524049
        }, {
            filename: "/content/scripts/CoreScripts/HealthScript.lua",
            start: 101524049,
            end: 101534136
        }, {
            filename: "/content/scripts/CoreScripts/MainBotChatScript2.lua",
            start: 101534136,
            end: 101557348
        }, {
            filename: "/content/scripts/CoreScripts/NotificationScript2.lua",
            start: 101557348,
            end: 101580623
        }, {
            filename: "/content/scripts/CoreScripts/PurchasePromptScript2.lua",
            start: 101580623,
            end: 101632697
        }, {
            filename: "/content/scripts/CoreScripts/Topbar.lua",
            start: 101632697,
            end: 101666533
        }, {
            filename: "/content/scripts/CoreScripts/VehicleHud.lua",
            start: 101666533,
            end: 101672382
        }, {
            filename: "/content/scripts/Libraries/RbxGui.lua",
            start: 101672382,
            end: 101809537
        }, {
            filename: "/content/scripts/Libraries/RbxStamper.lua",
            start: 101809537,
            end: 101891701
        }, {
            filename: "/content/scripts/Libraries/RbxUtility.lua",
            start: 101891701,
            end: 101927196
        }, {
            filename: "/content/scripts/LoadingScript.lua",
            start: 101927196,
            end: 101950730
        }, {
            filename: "/content/scripts/Modules/BackpackScript.lua",
            start: 101950730,
            end: 101997988
        }, {
            filename: "/content/scripts/Modules/Chat.lua",
            start: 101997988,
            end: 102087655
        }, {
            filename: "/content/scripts/Modules/DeveloperConsoleModule.lua",
            start: 102087655,
            end: 102172308
        }, {
            filename: "/content/scripts/Modules/PlayerDropDown.lua",
            start: 102172308,
            end: 102190843
        }, {
            filename: "/content/scripts/Modules/PlayerlistModule.lua",
            start: 102190843,
            end: 102243548
        }, {
            filename: "/content/scripts/Modules/Settings/Pages/GameSettings.lua",
            start: 102243548,
            end: 102264070
        }, {
            filename: "/content/scripts/Modules/Settings/Pages/Help.lua",
            start: 102264070,
            end: 102283745
        }, {
            filename: "/content/scripts/Modules/Settings/Pages/Home.lua",
            start: 102283745,
            end: 102286365
        }, {
            filename: "/content/scripts/Modules/Settings/Pages/LeaveGame.lua",
            start: 102286365,
            end: 102290402
        }, {
            filename: "/content/scripts/Modules/Settings/Pages/Players.lua",
            start: 102290402,
            end: 102301440
        }, {
            filename: "/content/scripts/Modules/Settings/Pages/Record.lua",
            start: 102301440,
            end: 102307012
        }, {
            filename: "/content/scripts/Modules/Settings/Pages/ReportAbuseMenu.lua",
            start: 102307012,
            end: 102316191
        }, {
            filename: "/content/scripts/Modules/Settings/Pages/ResetCharacter.lua",
            start: 102316191,
            end: 102320771
        }, {
            filename: "/content/scripts/Modules/Settings/SettingsHub.lua",
            start: 102320771,
            end: 102356251
        }, {
            filename: "/content/scripts/Modules/Settings/SettingsPageFactory.lua",
            start: 102356251,
            end: 102363672
        }, {
            filename: "/content/scripts/Modules/Settings/Utility.lua",
            start: 102363672,
            end: 102421953
        }, {
            filename: "/content/scripts/Modules/TenFootInterface.lua",
            start: 102421953,
            end: 102431768
        }, {
            filename: "/content/scripts/ServerCoreScripts/ServerSocialScript.lua",
            start: 102431768,
            end: 102438445
        }, {
            filename: "/content/scripts/ServerStarterScript.lua",
            start: 102438445,
            end: 102440417
        }, {
            filename: "https://raw.githubusercontent.com/FxkeMoney/RBXRevivalPatch/refs/heads/main/StarterScriptPatched.lua",
            start: 102440417,
            end: 102442950
        }, {
            filename: "/content/sky/lensflare.jpg",
            start: 102442950,
            end: 102451387
        }, {
            filename: "/content/sky/moon-alpha.jpg",
            start: 102451387,
            end: 102456307
        }, {
            filename: "/content/sky/moon.jpg",
            start: 102456307,
            end: 102463701
        }, {
            filename: "/content/sky/null_plainsky512_bk.jpg",
            start: 102463701,
            end: 102512978
        }, {
            filename: "/content/sky/null_plainsky512_dn.jpg",
            start: 102512978,
            end: 102546646
        }, {
            filename: "/content/sky/null_plainsky512_ft.jpg",
            start: 102546646,
            end: 102594337
        }, {
            filename: "/content/sky/null_plainsky512_lf.jpg",
            start: 102594337,
            end: 102637994
        }, {
            filename: "/content/sky/null_plainsky512_rt.jpg",
            start: 102637994,
            end: 102688195
        }, {
            filename: "/content/sky/null_plainsky512_up.jpg",
            start: 102688195,
            end: 102723707
        }, {
            filename: "/content/sky/skyspheremap.jpg",
            start: 102723707,
            end: 102734187
        }, {
            filename: "/content/sky/sun-rays.jpg",
            start: 102734187,
            end: 102738766
        }, {
            filename: "/content/sky/sun.jpg",
            start: 102738766,
            end: 102753539
        }, {
            filename: "/content/sounds/HalloweenGhost.wav",
            start: 102753539,
            end: 102822345,
            audio: 1
        }, {
            filename: "/content/sounds/HalloweenLightning.wav",
            start: 102822345,
            end: 102932105,
            audio: 1
        }, {
            filename: "/content/sounds/HalloweenThunder.wav",
            start: 102932105,
            end: 103013961,
            audio: 1
        }, {
            filename: "/content/sounds/Kerplunk.mp3",
            start: 103013961,
            end: 103019007,
            audio: 1
        }, {
            filename: "/content/sounds/Kerplunk.wav",
            start: 103019007,
            end: 103021026,
            audio: 1
        }, {
            filename: "/content/sounds/Kid saying Ouch.mp3",
            start: 103021026,
            end: 103028337,
            audio: 1
        }, {
            filename: "/content/sounds/Kid saying Ouch.wav",
            start: 103028337,
            end: 103031638,
            audio: 1
        }, {
            filename: "/content/sounds/Launching rocket.wav",
            start: 103031638,
            end: 103046222,
            audio: 1
        }, {
            filename: "/content/sounds/Rocket shot.wav",
            start: 103046222,
            end: 103088915,
            audio: 1
        }, {
            filename: "/content/sounds/Rocket whoosh 01.wav",
            start: 103088915,
            end: 103634433,
            audio: 1
        }, {
            filename: "/content/sounds/Rubber band sling shot.mp3",
            start: 103634433,
            end: 103643464,
            audio: 1
        }, {
            filename: "/content/sounds/Rubber band sling shot.wav",
            start: 103643464,
            end: 103652761,
            audio: 1
        }, {
            filename: "/content/sounds/Rubber band.mp3",
            start: 103652761,
            end: 103663524,
            audio: 1
        }, {
            filename: "/content/sounds/Rubber band.wav",
            start: 103663524,
            end: 103670171,
            audio: 1
        }, {
            filename: "/content/sounds/SWITCH3.mp3",
            start: 103670171,
            end: 103675216,
            audio: 1
        }, {
            filename: "/content/sounds/SWITCH3.wav",
            start: 103675216,
            end: 103679844,
            audio: 1
        }, {
            filename: "/content/sounds/Short spring sound.wav",
            start: 103679844,
            end: 103734724,
            audio: 1
        }, {
            filename: "/content/sounds/Shoulder fired rocket.wav",
            start: 103734724,
            end: 103744753,
            audio: 1
        }, {
            filename: "/content/sounds/action_falling.mp3",
            start: 103744753,
            end: 103878816,
            audio: 1
        }, {
            filename: "/content/sounds/action_footsteps_plastic.mp3",
            start: 103878816,
            end: 103919674,
            audio: 1
        }, {
            filename: "/content/sounds/action_get_up.mp3",
            start: 103919674,
            end: 103930021,
            audio: 1
        }, {
            filename: "/content/sounds/action_jump.mp3",
            start: 103930021,
            end: 103936606,
            audio: 1
        }, {
            filename: "/content/sounds/action_jump_land.mp3",
            start: 103936606,
            end: 103941937,
            audio: 1
        }, {
            filename: "/content/sounds/action_swim.mp3",
            start: 103941937,
            end: 104021247,
            audio: 1
        }, {
            filename: "/content/sounds/bass.mp3",
            start: 104021247,
            end: 104031427,
            audio: 1
        }, {
            filename: "/content/sounds/bass.wav",
            start: 104031427,
            end: 104037807,
            audio: 1
        }, {
            filename: "/content/sounds/bfsl-minifigfoots1.mp3",
            start: 104037807,
            end: 104054319,
            audio: 1
        }, {
            filename: "/content/sounds/bfsl-minifigfoots2.mp3",
            start: 104054319,
            end: 104095407,
            audio: 1
        }, {
            filename: "/content/sounds/button.mp3",
            start: 104095407,
            end: 104102133,
            audio: 1
        }, {
            filename: "/content/sounds/button.wav",
            start: 104102133,
            end: 104104579,
            audio: 1
        }, {
            filename: "/content/sounds/clickfast.mp3",
            start: 104104579,
            end: 104109004,
            audio: 1
        }, {
            filename: "/content/sounds/clickfast.wav",
            start: 104109004,
            end: 104109464,
            audio: 1
        }, {
            filename: "/content/sounds/collide.mp3",
            start: 104109464,
            end: 104121197,
            audio: 1
        }, {
            filename: "/content/sounds/collide.wav",
            start: 104121197,
            end: 104132267,
            audio: 1
        }, {
            filename: "/content/sounds/electronicpingshort.mp3",
            start: 104132267,
            end: 104140158,
            audio: 1
        }, {
            filename: "/content/sounds/electronicpingshort.wav",
            start: 104140158,
            end: 104143956,
            audio: 1
        }, {
            filename: "/content/sounds/flashbulb.mp3",
            start: 104143956,
            end: 104148957,
            audio: 1
        }, {
            filename: "/content/sounds/flashbulb.wav",
            start: 104148957,
            end: 104150097,
            audio: 1
        }, {
            filename: "/content/sounds/glassbreak.wav",
            start: 104150097,
            end: 104167599,
            audio: 1
        }, {
            filename: "/content/sounds/grass.mp3",
            start: 104167599,
            end: 104174523,
            audio: 1
        }, {
            filename: "/content/sounds/grass2.mp3",
            start: 104174523,
            end: 104181448,
            audio: 1
        }, {
            filename: "/content/sounds/grass3.mp3",
            start: 104181448,
            end: 104188373,
            audio: 1
        }, {
            filename: "/content/sounds/grassstone.mp3",
            start: 104188373,
            end: 104195302,
            audio: 1
        }, {
            filename: "/content/sounds/grassstone2.mp3",
            start: 104195302,
            end: 104202232,
            audio: 1
        }, {
            filename: "/content/sounds/grassstone3.mp3",
            start: 104202232,
            end: 104209162,
            audio: 1
        }, {
            filename: "/content/sounds/hit.mp3",
            start: 104209162,
            end: 104217965,
            audio: 1
        }, {
            filename: "/content/sounds/hit.wav",
            start: 104217965,
            end: 104225057,
            audio: 1
        }, {
            filename: "/content/sounds/ice.mp3",
            start: 104225057,
            end: 104231979,
            audio: 1
        }, {
            filename: "/content/sounds/ice2.mp3",
            start: 104231979,
            end: 104238902,
            audio: 1
        }, {
            filename: "/content/sounds/ice3.mp3",
            start: 104238902,
            end: 104245825,
            audio: 1
        }, {
            filename: "/content/sounds/icegrass.mp3",
            start: 104245825,
            end: 104252752,
            audio: 1
        }, {
            filename: "/content/sounds/icegrass2.mp3",
            start: 104252752,
            end: 104259680,
            audio: 1
        }, {
            filename: "/content/sounds/icegrass3.mp3",
            start: 104259680,
            end: 104266608,
            audio: 1
        }, {
            filename: "/content/sounds/icemetal.mp3",
            start: 104266608,
            end: 104273535,
            audio: 1
        }, {
            filename: "/content/sounds/icemetal2.mp3",
            start: 104273535,
            end: 104280463,
            audio: 1
        }, {
            filename: "/content/sounds/icemetal3.mp3",
            start: 104280463,
            end: 104287391,
            audio: 1
        }, {
            filename: "/content/sounds/icestone.mp3",
            start: 104287391,
            end: 104294318,
            audio: 1
        }, {
            filename: "/content/sounds/icestone2.mp3",
            start: 104294318,
            end: 104301246,
            audio: 1
        }, {
            filename: "/content/sounds/icestone3.mp3",
            start: 104301246,
            end: 104308174,
            audio: 1
        }, {
            filename: "/content/sounds/impact_bodyfall.mp3",
            start: 104308174,
            end: 104318521,
            audio: 1
        }, {
            filename: "/content/sounds/impact_explosion_01.mp3",
            start: 104318521,
            end: 104351437,
            audio: 1
        }, {
            filename: "/content/sounds/impact_explosion_02.mp3",
            start: 104351437,
            end: 104386443,
            audio: 1
        }, {
            filename: "/content/sounds/impact_explosion_03.mp3",
            start: 104386443,
            end: 104428972,
            audio: 1
        }, {
            filename: "/content/sounds/impact_water.mp3",
            start: 104428972,
            end: 104468158,
            audio: 1
        }, {
            filename: "/content/sounds/metal.mp3",
            start: 104468158,
            end: 104475082,
            audio: 1
        }, {
            filename: "/content/sounds/metal2.mp3",
            start: 104475082,
            end: 104482007,
            audio: 1
        }, {
            filename: "/content/sounds/metal3.mp3",
            start: 104482007,
            end: 104488932,
            audio: 1
        }, {
            filename: "/content/sounds/metalgrass.mp3",
            start: 104488932,
            end: 104495861,
            audio: 1
        }, {
            filename: "/content/sounds/metalgrass2.mp3",
            start: 104495861,
            end: 104502791,
            audio: 1
        }, {
            filename: "/content/sounds/metalgrass3.mp3",
            start: 104502791,
            end: 104509721,
            audio: 1
        }, {
            filename: "/content/sounds/metalstone.mp3",
            start: 104509721,
            end: 104516650,
            audio: 1
        }, {
            filename: "/content/sounds/metalstone2.mp3",
            start: 104516650,
            end: 104523580,
            audio: 1
        }, {
            filename: "/content/sounds/metalstone3.mp3",
            start: 104523580,
            end: 104530510,
            audio: 1
        }, {
            filename: "/content/sounds/pageturn.wav",
            start: 104530510,
            end: 104556058,
            audio: 1
        }, {
            filename: "/content/sounds/paintball.wav",
            start: 104556058,
            end: 104636084,
            audio: 1
        }, {
            filename: "/content/sounds/plasticgrass.mp3",
            start: 104636084,
            end: 104643015,
            audio: 1
        }, {
            filename: "/content/sounds/plasticgrass2.mp3",
            start: 104643015,
            end: 104649947,
            audio: 1
        }, {
            filename: "/content/sounds/plasticgrass3.mp3",
            start: 104649947,
            end: 104656879,
            audio: 1
        }, {
            filename: "/content/sounds/plasticice.mp3",
            start: 104656879,
            end: 104663808,
            audio: 1
        }, {
            filename: "/content/sounds/plasticice2.mp3",
            start: 104663808,
            end: 104670738,
            audio: 1
        }, {
            filename: "/content/sounds/plasticice3.mp3",
            start: 104670738,
            end: 104677668,
            audio: 1
        }, {
            filename: "/content/sounds/plasticmetal.mp3",
            start: 104677668,
            end: 104684599,
            audio: 1
        }, {
            filename: "/content/sounds/plasticmetal2.mp3",
            start: 104684599,
            end: 104691531,
            audio: 1
        }, {
            filename: "/content/sounds/plasticmetal3.mp3",
            start: 104691531,
            end: 104698463,
            audio: 1
        }, {
            filename: "/content/sounds/plasticplastic.mp3",
            start: 104698463,
            end: 104705396,
            audio: 1
        }, {
            filename: "/content/sounds/plasticplastic2.mp3",
            start: 104705396,
            end: 104712330,
            audio: 1
        }, {
            filename: "/content/sounds/plasticplastic3.mp3",
            start: 104712330,
            end: 104721145,
            audio: 1
        }, {
            filename: "/content/sounds/plasticstone.mp3",
            start: 104721145,
            end: 104728076,
            audio: 1
        }, {
            filename: "/content/sounds/plasticstone2.mp3",
            start: 104728076,
            end: 104735008,
            audio: 1
        }, {
            filename: "/content/sounds/plasticstone3.mp3",
            start: 104735008,
            end: 104741940,
            audio: 1
        }, {
            filename: "/content/sounds/snap.mp3",
            start: 104741940,
            end: 104747400,
            audio: 1
        }, {
            filename: "/content/sounds/snap.wav",
            start: 104747400,
            end: 104750292,
            audio: 1
        }, {
            filename: "/content/sounds/splat.mp3",
            start: 104750292,
            end: 104756441,
            audio: 1
        }, {
            filename: "/content/sounds/splat.wav",
            start: 104756441,
            end: 104758327,
            audio: 1
        }, {
            filename: "/content/sounds/stone.mp3",
            start: 104758327,
            end: 104765251,
            audio: 1
        }, {
            filename: "/content/sounds/stone2.mp3",
            start: 104765251,
            end: 104772176,
            audio: 1
        }, {
            filename: "/content/sounds/stone3.mp3",
            start: 104772176,
            end: 104779101,
            audio: 1
        }, {
            filename: "/content/sounds/switch.mp3",
            start: 104779101,
            end: 104784981,
            audio: 1
        }, {
            filename: "/content/sounds/switch.wav",
            start: 104784981,
            end: 104798479,
            audio: 1
        }, {
            filename: "/content/sounds/swoosh.mp3",
            start: 104798479,
            end: 104804053,
            audio: 1
        }, {
            filename: "/content/sounds/swoosh.wav",
            start: 104804053,
            end: 104805779,
            audio: 1
        }, {
            filename: "/content/sounds/swordlunge.mp3",
            start: 104805779,
            end: 104814171,
            audio: 1
        }, {
            filename: "/content/sounds/swordlunge.wav",
            start: 104814171,
            end: 104829703,
            audio: 1
        }, {
            filename: "/content/sounds/swordslash.mp3",
            start: 104829703,
            end: 104837050,
            audio: 1
        }, {
            filename: "/content/sounds/swordslash.wav",
            start: 104837050,
            end: 104849492,
            audio: 1
        }, {
            filename: "/content/sounds/unsheath.mp3",
            start: 104849492,
            end: 104863315,
            audio: 1
        }, {
            filename: "/content/sounds/unsheath.wav",
            start: 104863315,
            end: 104892159,
            audio: 1
        }, {
            filename: "/content/sounds/uuhhh.mp3",
            start: 104892159,
            end: 104897620,
            audio: 1
        }, {
            filename: "/content/sounds/uuhhh.wav",
            start: 104897620,
            end: 104912394,
            audio: 1
        }, {
            filename: "/content/sounds/victory.mp3",
            start: 104912394,
            end: 104924962,
            audio: 1
        }, {
            filename: "/content/sounds/victory.wav",
            start: 104924962,
            end: 104951642,
            audio: 1
        }, {
            filename: "/content/sounds/woodgrass.mp3",
            start: 104951642,
            end: 104958570,
            audio: 1
        }, {
            filename: "/content/sounds/woodgrass2.mp3",
            start: 104958570,
            end: 104965499,
            audio: 1
        }, {
            filename: "/content/sounds/woodgrass3.mp3",
            start: 104965499,
            end: 104972428,
            audio: 1
        }, {
            filename: "/content/sounds/woodice.mp3",
            start: 104972428,
            end: 104979354,
            audio: 1
        }, {
            filename: "/content/sounds/woodice2.mp3",
            start: 104979354,
            end: 104986281,
            audio: 1
        }, {
            filename: "/content/sounds/woodice3.mp3",
            start: 104986281,
            end: 104993208,
            audio: 1
        }, {
            filename: "/content/sounds/woodmetal.mp3",
            start: 104993208,
            end: 105000136,
            audio: 1
        }, {
            filename: "/content/sounds/woodmetal2.mp3",
            start: 105000136,
            end: 105007065,
            audio: 1
        }, {
            filename: "/content/sounds/woodmetal3.mp3",
            start: 105007065,
            end: 105013994,
            audio: 1
        }, {
            filename: "/content/sounds/woodplastic.mp3",
            start: 105013994,
            end: 105020924,
            audio: 1
        }, {
            filename: "/content/sounds/woodplastic2.mp3",
            start: 105020924,
            end: 105027855,
            audio: 1
        }, {
            filename: "/content/sounds/woodplastic3.mp3",
            start: 105027855,
            end: 105034786,
            audio: 1
        }, {
            filename: "/content/sounds/woodstone.mp3",
            start: 105034786,
            end: 105041714,
            audio: 1
        }, {
            filename: "/content/sounds/woodstone2.mp3",
            start: 105041714,
            end: 105048643,
            audio: 1
        }, {
            filename: "/content/sounds/woodstone3.mp3",
            start: 105048643,
            end: 105055572,
            audio: 1
        }, {
            filename: "/content/sounds/woodwood.mp3",
            start: 105055572,
            end: 105062499,
            audio: 1
        }, {
            filename: "/content/sounds/woodwood2.mp3",
            start: 105062499,
            end: 105069427,
            audio: 1
        }, {
            filename: "/content/sounds/woodwood3.mp3",
            start: 105069427,
            end: 105076355,
            audio: 1
        }, {
            filename: "/content/textures/AnchorCursor.png",
            start: 105076355,
            end: 105077614
        }, {
            filename: "/content/textures/ArrowCursor.png",
            start: 105077614,
            end: 105077897
        }, {
            filename: "/content/textures/ArrowCursorDecalDrag.png",
            start: 105077897,
            end: 105078180
        }, {
            filename: "/content/textures/ArrowFarCursor.png",
            start: 105078180,
            end: 105078467
        }, {
            filename: "/content/textures/BWGradient.png",
            start: 105078467,
            end: 105128314
        }, {
            filename: "/content/textures/BackgroundImage.png",
            start: 105128314,
            end: 105131310
        }, {
            filename: "/content/textures/Blank.png",
            start: 105131310,
            end: 105131497
        }, {
            filename: "/content/textures/Clone.png",
            start: 105131497,
            end: 105137766
        }, {
            filename: "/content/textures/CloneCursor.png",
            start: 105137766,
            end: 105140950
        }, {
            filename: "/content/textures/CloneDownCursor.png",
            start: 105140950,
            end: 105145705
        }, {
            filename: "/content/textures/CloneOverCursor.png",
            start: 105145705,
            end: 105148921
        }, {
            filename: "/content/textures/Cursors/Gamepad/Pointer.png",
            start: 105148921,
            end: 105150258
        }, {
            filename: "/content/textures/Cursors/Gamepad/Pointer@2x.png",
            start: 105150258,
            end: 105151745
        }, {
            filename: "/content/textures/Cursors/Gamepad/PointerOver.png",
            start: 105151745,
            end: 105152898
        }, {
            filename: "/content/textures/Cursors/Gamepad/PointerOver@2x.png",
            start: 105152898,
            end: 105154859
        }, {
            filename: "/content/textures/DialogHelp.png",
            start: 105154859,
            end: 105155749
        }, {
            filename: "/content/textures/DialogQuest.png",
            start: 105155749,
            end: 105156308
        }, {
            filename: "/content/textures/DialogShop.png",
            start: 105156308,
            end: 105157507
        }, {
            filename: "/content/textures/DragCursor.png",
            start: 105157507,
            end: 105159570
        }, {
            filename: "/content/textures/DropperCursor.png",
            start: 105159570,
            end: 105159923
        }, {
            filename: "/content/textures/Exit.png",
            start: 105159923,
            end: 105163042
        }, {
            filename: "/content/textures/Exit_dn.png",
            start: 105163042,
            end: 105166123
        }, {
            filename: "/content/textures/Exit_ovr.png",
            start: 105166123,
            end: 105169204
        }, {
            filename: "/content/textures/FillCursor.png",
            start: 105169204,
            end: 105169637
        }, {
            filename: "/content/textures/FlagCursor.png",
            start: 105169637,
            end: 105170265
        }, {
            filename: "/content/textures/FlatCursor.png",
            start: 105170265,
            end: 105170860
        }, {
            filename: "/content/textures/GrabCursor.png",
            start: 105170860,
            end: 105173137
        }, {
            filename: "/content/textures/GrabRotateCursor.png",
            start: 105173137,
            end: 105176030
        }, {
            filename: "/content/textures/Grass_Texture.jpg",
            start: 105176030,
            end: 105416849
        }, {
            filename: "/content/textures/GunCursor.png",
            start: 105416849,
            end: 105417796
        }, {
            filename: "/content/textures/GunWaitCursor.png",
            start: 105417796,
            end: 105419731
        }, {
            filename: "/content/textures/HammerCursor.png",
            start: 105419731,
            end: 105422174
        }, {
            filename: "/content/textures/HammerDownCursor.png",
            start: 105422174,
            end: 105426175
        }, {
            filename: "/content/textures/HammerOverCursor.png",
            start: 105426175,
            end: 105429043
        }, {
            filename: "/content/textures/HingeCursor.png",
            start: 105429043,
            end: 105429670
        }, {
            filename: "/content/textures/LockCursor.png",
            start: 105429670,
            end: 105430458
        }, {
            filename: "/content/textures/MotorCursor.png",
            start: 105430458,
            end: 105431118
        }, {
            filename: "/content/textures/MouseLockedCursor.png",
            start: 105431118,
            end: 105433448
        }, {
            filename: "/content/textures/ResizeCursor.png",
            start: 105433448,
            end: 105434e3
        }, {
            filename: "/content/textures/Roblox-loading-glow.png",
            start: 105434e3,
            end: 105439912
        }, {
            filename: "/content/textures/Roblox-loading-glow@2x.png",
            start: 105439912,
            end: 105453113
        }, {
            filename: "/content/textures/Roblox-loading.png",
            start: 105453113,
            end: 105480241
        }, {
            filename: "/content/textures/Roblox-loading@2x.png",
            start: 105480241,
            end: 105543342
        }, {
            filename: "/content/textures/Roblox.bmp",
            start: 105543342,
            end: 105555686
        }, {
            filename: "/content/textures/RustGradient.png",
            start: 105555686,
            end: 105586476
        }, {
            filename: "/content/textures/Slingshot.png",
            start: 105586476,
            end: 105592617
        }, {
            filename: "/content/textures/Smoke.png",
            start: 105592617,
            end: 105648368
        }, {
            filename: "/content/textures/SpawnCursor.png",
            start: 105648368,
            end: 105649023
        }, {
            filename: "/content/textures/SpawnLocation.png",
            start: 105649023,
            end: 105651695
        }, {
            filename: "/content/textures/Superball.png",
            start: 105651695,
            end: 105664583
        }, {
            filename: "/content/textures/SurfacesDefault.png",
            start: 105664583,
            end: 105664749
        }, {
            filename: "/content/textures/UnAnchorCursor.png",
            start: 105664749,
            end: 105666585
        }, {
            filename: "/content/textures/UnlockCursor.png",
            start: 105666585,
            end: 105667383
        }, {
            filename: "/content/textures/Wall.png",
            start: 105667383,
            end: 105668376
        }, {
            filename: "/content/textures/WeldCursor.png",
            start: 105668376,
            end: 105668898
        }, {
            filename: "/content/textures/WhiteCircle.png",
            start: 105668898,
            end: 105675411
        }, {
            filename: "/content/textures/advClosed-hand-no-weld.png",
            start: 105675411,
            end: 105676646
        }, {
            filename: "/content/textures/advClosed-hand-weld.png",
            start: 105676646,
            end: 105677947
        }, {
            filename: "/content/textures/advClosed-hand.png",
            start: 105677947,
            end: 105679128
        }, {
            filename: "/content/textures/advCursor-default.png",
            start: 105679128,
            end: 105680304
        }, {
            filename: "/content/textures/advCursor-openedHand.png",
            start: 105680304,
            end: 105681541
        }, {
            filename: "/content/textures/advCursor-white.png",
            start: 105681541,
            end: 105682703
        }, {
            filename: "/content/textures/advancedMove.png",
            start: 105682703,
            end: 105685487
        }, {
            filename: "/content/textures/advancedMoveResize.png",
            start: 105685487,
            end: 105688529
        }, {
            filename: "/content/textures/advancedMove_joint.png",
            start: 105688529,
            end: 105693063
        }, {
            filename: "/content/textures/advancedMove_keysOnly.png",
            start: 105693063,
            end: 105696887
        }, {
            filename: "/content/textures/advancedMove_noJoint.png",
            start: 105696887,
            end: 105701798
        }, {
            filename: "/content/textures/blackBkg_round.png",
            start: 105701798,
            end: 105702241
        }, {
            filename: "/content/textures/blackBkg_square.png",
            start: 105702241,
            end: 105702395
        }, {
            filename: "/content/textures/chatBubble_botBlue_bkg.png",
            start: 105702395,
            end: 105705171
        }, {
            filename: "/content/textures/chatBubble_botBlue_notify_bkg.png",
            start: 105705171,
            end: 105709275
        }, {
            filename: "/content/textures/chatBubble_botBlue_tail.png",
            start: 105709275,
            end: 105715672
        }, {
            filename: "/content/textures/chatBubble_botBlue_tailRight.png",
            start: 105715672,
            end: 105719953
        }, {
            filename: "/content/textures/chatBubble_botGreen_bkg.png",
            start: 105719953,
            end: 105722144
        }, {
            filename: "/content/textures/chatBubble_botGreen_notify_bkg.png",
            start: 105722144,
            end: 105725565
        }, {
            filename: "/content/textures/chatBubble_botGreen_tail.png",
            start: 105725565,
            end: 105730388
        }, {
            filename: "/content/textures/chatBubble_botGreen_tailRight.png",
            start: 105730388,
            end: 105733969
        }, {
            filename: "/content/textures/chatBubble_botRed_bkg.png",
            start: 105733969,
            end: 105736612
        }, {
            filename: "/content/textures/chatBubble_botRed_notify_bkg.png",
            start: 105736612,
            end: 105739832
        }, {
            filename: "/content/textures/chatBubble_botRed_tail.png",
            start: 105739832,
            end: 105743698
        }, {
            filename: "/content/textures/chatBubble_botRed_tailRight.png",
            start: 105743698,
            end: 105747326
        }, {
            filename: "/content/textures/chatBubble_bot_notifyGray_dotDotDot.png",
            start: 105747326,
            end: 105750244
        }, {
            filename: "/content/textures/chatBubble_bot_notify_bang.png",
            start: 105750244,
            end: 105751349
        }, {
            filename: "/content/textures/chatBubble_bot_notify_dotDotDot.png",
            start: 105751349,
            end: 105752382
        }, {
            filename: "/content/textures/chatBubble_bot_notify_money.png",
            start: 105752382,
            end: 105753882
        }, {
            filename: "/content/textures/chatBubble_bot_notify_question.png",
            start: 105753882,
            end: 105755152
        }, {
            filename: "/content/textures/chatBubble_white_bkg.png",
            start: 105755152,
            end: 105759456
        }, {
            filename: "/content/textures/chatBubble_white_notify_bkg.png",
            start: 105759456,
            end: 105763517
        }, {
            filename: "/content/textures/chatBubble_white_tail.png",
            start: 105763517,
            end: 105765096
        }, {
            filename: "/content/textures/dirt.jpg",
            start: 105765096,
            end: 105938582
        }, {
            filename: "/content/textures/explosion.png",
            start: 105938582,
            end: 105951351
        }, {
            filename: "/content/textures/face.png",
            start: 105951351,
            end: 105952400
        }, {
            filename: "/content/textures/fire_0.png",
            start: 105952400,
            end: 105977936
        }, {
            filename: "/content/textures/glow.png",
            start: 105977936,
            end: 106034541
        }, {
            filename: "/content/textures/gradient.png",
            start: 106034541,
            end: 106238494
        }, {
            filename: "/content/textures/loading/cancelButton.png",
            start: 106238494,
            end: 106241822
        }, {
            filename: "/content/textures/loading/darkLoadingTexture.png",
            start: 106241822,
            end: 106304927
        }, {
            filename: "/content/textures/loading/loadingCircle.png",
            start: 106304927,
            end: 106318222
        }, {
            filename: "/content/textures/loading/loadingTexture.png",
            start: 106318222,
            end: 106402096
        }, {
            filename: "/content/textures/loading/loadingvignette.png",
            start: 106402096,
            end: 106422804
        }, {
            filename: "/content/textures/loading/robloxlogo.png",
            start: 106422804,
            end: 106446179
        }, {
            filename: "/content/textures/lua.png",
            start: 106446179,
            end: 106510757
        }, {
            filename: "/content/textures/particles/common_alpha.dds",
            start: 106510757,
            end: 106514981
        }, {
            filename: "/content/textures/particles/explosion01_core_alpha.png",
            start: 106514981,
            end: 106543929
        }, {
            filename: "/content/textures/particles/explosion01_core_main.dds",
            start: 106543929,
            end: 106631465
        }, {
            filename: "/content/textures/particles/explosion01_implosion_color.png",
            start: 106631465,
            end: 106640243
        }, {
            filename: "/content/textures/particles/explosion01_implosion_main.dds",
            start: 106640243,
            end: 106727779
        }, {
            filename: "/content/textures/particles/explosion01_shockwave_main.dds",
            start: 106727779,
            end: 106815315
        }, {
            filename: "/content/textures/particles/explosion01_smoke_alpha.dds",
            start: 106815315,
            end: 106818203
        }, {
            filename: "/content/textures/particles/explosion01_smoke_color_new.dds",
            start: 106818203,
            end: 106821091
        }, {
            filename: "/content/textures/particles/explosion01_smoke_main.dds",
            start: 106821091,
            end: 106908627
        }, {
            filename: "/content/textures/particles/explosion_alpha.dds",
            start: 106908627,
            end: 106911515
        }, {
            filename: "/content/textures/particles/explosion_color.dds",
            start: 106911515,
            end: 106917163
        }, {
            filename: "/content/textures/particles/fire_alpha.dds",
            start: 106917163,
            end: 106922811
        }, {
            filename: "/content/textures/particles/fire_color.dds",
            start: 106922811,
            end: 106928459
        }, {
            filename: "/content/textures/particles/fire_main.dds",
            start: 106928459,
            end: 107015995
        }, {
            filename: "/content/textures/particles/fire_sparks_color.dds",
            start: 107015995,
            end: 107021643
        }, {
            filename: "/content/textures/particles/fire_sparks_main.dds",
            start: 107021643,
            end: 107027259
        }, {
            filename: "/content/textures/particles/forcefield_alpha.dds",
            start: 107027259,
            end: 107032907
        }, {
            filename: "/content/textures/particles/forcefield_glow_alpha.dds",
            start: 107032907,
            end: 107038555
        }, {
            filename: "/content/textures/particles/forcefield_glow_color.dds",
            start: 107038555,
            end: 107044203
        }, {
            filename: "/content/textures/particles/forcefield_glow_main.dds",
            start: 107044203,
            end: 107131739
        }, {
            filename: "/content/textures/particles/forcefield_vortex_color.dds",
            start: 107131739,
            end: 107137387
        }, {
            filename: "/content/textures/particles/forcefield_vortex_main.dds",
            start: 107137387,
            end: 107159387
        }, {
            filename: "/content/textures/particles/legacy_fire_alpha_color.dds",
            start: 107159387,
            end: 107162275
        }, {
            filename: "/content/textures/particles/smoke_color.dds",
            start: 107162275,
            end: 107167923
        }, {
            filename: "/content/textures/particles/smoke_main.dds",
            start: 107167923,
            end: 107189923
        }, {
            filename: "/content/textures/particles/sparkles_color.dds",
            start: 107189923,
            end: 107195571
        }, {
            filename: "/content/textures/particles/sparkles_main.dds",
            start: 107195571,
            end: 107217571
        }, {
            filename: "/content/textures/roblox-logo.png",
            start: 107217571,
            end: 107385053
        }, {
            filename: "/content/textures/rotationArrow.png",
            start: 107385053,
            end: 107389122
        }, {
            filename: "/content/textures/script.png",
            start: 107389122,
            end: 107389870
        }, {
            filename: "/content/textures/shadowmask.png",
            start: 107389870,
            end: 107393455
        }, {
            filename: "/content/textures/spark.png",
            start: 107393455,
            end: 107397032
        }, {
            filename: "/content/textures/sparkle.png",
            start: 107397032,
            end: 107401299
        }, {
            filename: "/content/textures/transformFiveDegrees.png",
            start: 107401299,
            end: 107406362
        }, {
            filename: "/content/textures/transformNinetyDegrees.png",
            start: 107406362,
            end: 107411878
        }, {
            filename: "/content/textures/transformOneDegree.png",
            start: 107411878,
            end: 107416631
        }, {
            filename: "/content/textures/transformTwentyTwoDegrees.png",
            start: 107416631,
            end: 107420699
        }, {
            filename: "/content/textures/ui/Backpack/Backpack.png",
            start: 107420699,
            end: 107421522
        }, {
            filename: "/content/textures/ui/Backpack/Backpack@2x.png",
            start: 107421522,
            end: 107423698
        }, {
            filename: "/content/textures/ui/Backpack/Backpack_Down.png",
            start: 107423698,
            end: 107424678
        }, {
            filename: "/content/textures/ui/Backpack/Backpack_Down@2x.png",
            start: 107424678,
            end: 107426930
        }, {
            filename: "/content/textures/ui/Backpack_Close.png",
            start: 107426930,
            end: 107427164
        }, {
            filename: "/content/textures/ui/Backpack_Close@2x.png",
            start: 107427164,
            end: 107427617
        }, {
            filename: "/content/textures/ui/Backpack_Open.png",
            start: 107427617,
            end: 107427861
        }, {
            filename: "/content/textures/ui/Backpack_Open@2x.png",
            start: 107427861,
            end: 107428306
        }, {
            filename: "/content/textures/ui/ButtonLeft.png",
            start: 107428306,
            end: 107443418
        }, {
            filename: "/content/textures/ui/ButtonLeftDown.png",
            start: 107443418,
            end: 107458529
        }, {
            filename: "/content/textures/ui/ButtonRight.png",
            start: 107458529,
            end: 107473624
        }, {
            filename: "/content/textures/ui/ButtonRightDown.png",
            start: 107473624,
            end: 107488732
        }, {
            filename: "/content/textures/ui/Chat/Chat.png",
            start: 107488732,
            end: 107489587
        }, {
            filename: "/content/textures/ui/Chat/Chat@2x.png",
            start: 107489587,
            end: 107491708
        }, {
            filename: "/content/textures/ui/Chat/ChatDown.png",
            start: 107491708,
            end: 107492512
        }, {
            filename: "/content/textures/ui/Chat/ChatDown@2x.png",
            start: 107492512,
            end: 107494348
        }, {
            filename: "/content/textures/ui/Chat/MessageCounter.png",
            start: 107494348,
            end: 107494945
        }, {
            filename: "/content/textures/ui/Chat/MessageCounter@2x.png",
            start: 107494945,
            end: 107496255
        }, {
            filename: "/content/textures/ui/Chat/ToggleChat.png",
            start: 107496255,
            end: 107497325
        }, {
            filename: "/content/textures/ui/Chat/ToggleChat@2x.png",
            start: 107497325,
            end: 107500010
        }, {
            filename: "/content/textures/ui/Chat/ToggleChatDown.png",
            start: 107500010,
            end: 107501168
        }, {
            filename: "/content/textures/ui/Chat/ToggleChatDown@2x.png",
            start: 107501168,
            end: 107503909
        }, {
            filename: "/content/textures/ui/CloneButton.png",
            start: 107503909,
            end: 107505574
        }, {
            filename: "/content/textures/ui/CloneButton_dn.png",
            start: 107505574,
            end: 107507311
        }, {
            filename: "/content/textures/ui/CloseButton.png",
            start: 107507311,
            end: 107508878
        }, {
            filename: "/content/textures/ui/CloseButton_dn.png",
            start: 107508878,
            end: 107510384
        }, {
            filename: "/content/textures/ui/Concrete.png",
            start: 107510384,
            end: 107512504
        }, {
            filename: "/content/textures/ui/CorrodedMetal.png",
            start: 107512504,
            end: 107514459
        }, {
            filename: "/content/textures/ui/DPadSheet.png",
            start: 107514459,
            end: 107532326
        }, {
            filename: "/content/textures/ui/DeleteButton.png",
            start: 107532326,
            end: 107533882
        }, {
            filename: "/content/textures/ui/DeleteButton_dn.png",
            start: 107533882,
            end: 107535457
        }, {
            filename: "/content/textures/ui/DiamondPlate.png",
            start: 107535457,
            end: 107537400
        }, {
            filename: "/content/textures/ui/ErrorIcon.png",
            start: 107537400,
            end: 107540463
        }, {
            filename: "/content/textures/ui/ErrorIconSmall.png",
            start: 107540463,
            end: 107543583
        }, {
            filename: "/content/textures/ui/Foil.png",
            start: 107543583,
            end: 107545666
        }, {
            filename: "/content/textures/ui/Gear.png",
            start: 107545666,
            end: 107546904
        }, {
            filename: "/content/textures/ui/Gear_dn.png",
            start: 107546904,
            end: 107548107
        }, {
            filename: "/content/textures/ui/Glue.png",
            start: 107548107,
            end: 107550848
        }, {
            filename: "/content/textures/ui/Grass.png",
            start: 107550848,
            end: 107552234
        }, {
            filename: "/content/textures/ui/GroupMoveButton.png",
            start: 107552234,
            end: 107554047
        }, {
            filename: "/content/textures/ui/GroupMoveButton_dn.png",
            start: 107554047,
            end: 107555896
        }, {
            filename: "/content/textures/ui/Health-BKG-Center.png",
            start: 107555896,
            end: 107556855
        }, {
            filename: "/content/textures/ui/Health-BKG-Center@2x.png",
            start: 107556855,
            end: 107557841
        }, {
            filename: "/content/textures/ui/Health-BKG-Left-Cap.png",
            start: 107557841,
            end: 107558926
        }, {
            filename: "/content/textures/ui/Health-BKG-Left-Cap@2x.png",
            start: 107558926,
            end: 107560236
        }, {
            filename: "/content/textures/ui/Health-BKG-Right-Cap.png",
            start: 107560236,
            end: 107561341
        }, {
            filename: "/content/textures/ui/Health-BKG-Right-Cap@2x.png",
            start: 107561341,
            end: 107562695
        }, {
            filename: "/content/textures/ui/Hinge.png",
            start: 107562695,
            end: 107563562
        }, {
            filename: "/content/textures/ui/Ice.png",
            start: 107563562,
            end: 107565481
        }, {
            filename: "/content/textures/ui/Inlets.png",
            start: 107565481,
            end: 107567740
        }, {
            filename: "/content/textures/ui/InsertButton.png",
            start: 107567740,
            end: 107569378
        }, {
            filename: "/content/textures/ui/InsertButton_dn.png",
            start: 107569378,
            end: 107571048
        }, {
            filename: "/content/textures/ui/LoadingBKG.png",
            start: 107571048,
            end: 107576958
        }, {
            filename: "/content/textures/ui/MaterialButton.png",
            start: 107576958,
            end: 107579e3
        }, {
            filename: "/content/textures/ui/MaterialButton_dn.png",
            start: 107579e3,
            end: 107581095
        }, {
            filename: "/content/textures/ui/MaterialMenu.png",
            start: 107581095,
            end: 107582582
        }, {
            filename: "/content/textures/ui/Menu/Hamburger.png",
            start: 107582582,
            end: 107582829
        }, {
            filename: "/content/textures/ui/Menu/Hamburger@2x.png",
            start: 107582829,
            end: 107583463
        }, {
            filename: "/content/textures/ui/Menu/HamburgerDown.png",
            start: 107583463,
            end: 107583725
        }, {
            filename: "/content/textures/ui/Menu/HamburgerDown@2x.png",
            start: 107583725,
            end: 107584370
        }, {
            filename: "/content/textures/ui/Modal.png",
            start: 107584370,
            end: 107600387
        }, {
            filename: "/content/textures/ui/Motor.png",
            start: 107600387,
            end: 107601267
        }, {
            filename: "/content/textures/ui/PaintButton.png",
            start: 107601267,
            end: 107602841
        }, {
            filename: "/content/textures/ui/PaintButton_dn.png",
            start: 107602841,
            end: 107604454
        }, {
            filename: "/content/textures/ui/PartMoveButton.png",
            start: 107604454,
            end: 107606160
        }, {
            filename: "/content/textures/ui/PartMoveButton_dn.png",
            start: 107606160,
            end: 107607853
        }, {
            filename: "/content/textures/ui/Plastic.png",
            start: 107607853,
            end: 107609026
        }, {
            filename: "/content/textures/ui/PlayerList/BlockedIcon.png",
            start: 107609026,
            end: 107609371
        }, {
            filename: "/content/textures/ui/PlayerList/CharacterImageBackground.png",
            start: 107609371,
            end: 107609951
        }, {
            filename: "/content/textures/ui/PlayerList/TileShadowMissingTop.png",
            start: 107609951,
            end: 107610447
        }, {
            filename: "/content/textures/ui/PlayerListFriendRequestReceivedIcon.png",
            start: 107610447,
            end: 107612897
        }, {
            filename: "/content/textures/ui/PlayerListFriendRequestSentIcon.png",
            start: 107612897,
            end: 107615245
        }, {
            filename: "/content/textures/ui/PlayerlistFriendIcon.png",
            start: 107615245,
            end: 107617339
        }, {
            filename: "/content/textures/ui/PropertyButton.png",
            start: 107617339,
            end: 107618988
        }, {
            filename: "/content/textures/ui/PropertyButton_dn.png",
            start: 107618988,
            end: 107620675
        }, {
            filename: "/content/textures/ui/RecordDown.png",
            start: 107620675,
            end: 107623035
        }, {
            filename: "/content/textures/ui/RecordStop.png",
            start: 107623035,
            end: 107625022
        }, {
            filename: "/content/textures/ui/ResetIcon.png",
            start: 107625022,
            end: 107627428
        }, {
            filename: "/content/textures/ui/RobuxIcon.png",
            start: 107627428,
            end: 107629592
        }, {
            filename: "/content/textures/ui/ScaleButton.png",
            start: 107629592,
            end: 107631339
        }, {
            filename: "/content/textures/ui/ScaleButton_dn.png",
            start: 107631339,
            end: 107633131
        }, {
            filename: "/content/textures/ui/Scroll/scroll-bottom.png",
            start: 107633131,
            end: 107634132
        }, {
            filename: "/content/textures/ui/Scroll/scroll-bottom@2x.png",
            start: 107634132,
            end: 107635221
        }, {
            filename: "/content/textures/ui/Scroll/scroll-middle.png",
            start: 107635221,
            end: 107636151
        }, {
            filename: "/content/textures/ui/Scroll/scroll-middle@2x.png",
            start: 107636151,
            end: 107637084
        }, {
            filename: "/content/textures/ui/Scroll/scroll-top.png",
            start: 107637084,
            end: 107638090
        }, {
            filename: "/content/textures/ui/Scroll/scroll-top@2x.png",
            start: 107638090,
            end: 107639198
        }, {
            filename: "/content/textures/ui/SearchIcon.png",
            start: 107639198,
            end: 107640497
        }, {
            filename: "/content/textures/ui/SelectionBox.png",
            start: 107640497,
            end: 107644883
        }, {
            filename: "/content/textures/ui/SelectionBox@2x.png",
            start: 107644883,
            end: 107650755
        }, {
            filename: "/content/textures/ui/Settings/DropDown/DropDown.png",
            start: 107650755,
            end: 107653659
        }, {
            filename: "/content/textures/ui/Settings/DropDown/DropDown@2x.png",
            start: 107653659,
            end: 107656735
        }, {
            filename: "/content/textures/ui/Settings/Help/AButtonDark.png",
            start: 107656735,
            end: 107662063
        }, {
            filename: "/content/textures/ui/Settings/Help/AButtonDark@2x.png",
            start: 107662063,
            end: 107675961
        }, {
            filename: "/content/textures/ui/Settings/Help/AButtonLight.png",
            start: 107675961,
            end: 107680001
        }, {
            filename: "/content/textures/ui/Settings/Help/AButtonLight@2x.png",
            start: 107680001,
            end: 107690066
        }, {
            filename: "/content/textures/ui/Settings/Help/AButtonLightSmall.png",
            start: 107690066,
            end: 107691311
        }, {
            filename: "/content/textures/ui/Settings/Help/BButtonDark.png",
            start: 107691311,
            end: 107696580
        }, {
            filename: "/content/textures/ui/Settings/Help/BButtonDark@2x.png",
            start: 107696580,
            end: 107710340
        }, {
            filename: "/content/textures/ui/Settings/Help/BButtonLight.png",
            start: 107710340,
            end: 107714537
        }, {
            filename: "/content/textures/ui/Settings/Help/BButtonLight@2x.png",
            start: 107714537,
            end: 107724864
        }, {
            filename: "/content/textures/ui/Settings/Help/EscapeIcon.png",
            start: 107724864,
            end: 107725872
        }, {
            filename: "/content/textures/ui/Settings/Help/GenericController.png",
            start: 107725872,
            end: 107757474
        }, {
            filename: "/content/textures/ui/Settings/Help/GenericController@2x.png",
            start: 107757474,
            end: 107836890
        }, {
            filename: "/content/textures/ui/Settings/Help/LeaveIcon.png",
            start: 107836890,
            end: 107837306
        }, {
            filename: "/content/textures/ui/Settings/Help/ResetIcon.png",
            start: 107837306,
            end: 107837946
        }, {
            filename: "/content/textures/ui/Settings/Help/RotateCameraGesture.png",
            start: 107837946,
            end: 107846306
        }, {
            filename: "/content/textures/ui/Settings/Help/UseToolGesture.png",
            start: 107846306,
            end: 107850104
        }, {
            filename: "/content/textures/ui/Settings/Help/XButtonDark.png",
            start: 107850104,
            end: 107855656
        }, {
            filename: "/content/textures/ui/Settings/Help/XButtonDark@2x.png",
            start: 107855656,
            end: 107870101
        }, {
            filename: "/content/textures/ui/Settings/Help/XButtonLight.png",
            start: 107870101,
            end: 107874147
        }, {
            filename: "/content/textures/ui/Settings/Help/XButtonLight@2x.png",
            start: 107874147,
            end: 107884195
        }, {
            filename: "/content/textures/ui/Settings/Help/XboxController.png",
            start: 107884195,
            end: 107977921
        }, {
            filename: "/content/textures/ui/Settings/Help/YButtonDark.png",
            start: 107977921,
            end: 107983256
        }, {
            filename: "/content/textures/ui/Settings/Help/YButtonDark@2x.png",
            start: 107983256,
            end: 107996995
        }, {
            filename: "/content/textures/ui/Settings/Help/YButtonLight.png",
            start: 107996995,
            end: 108000799
        }, {
            filename: "/content/textures/ui/Settings/Help/YButtonLight@2x.png",
            start: 108000799,
            end: 108010522
        }, {
            filename: "/content/textures/ui/Settings/Help/ZoomGesture.png",
            start: 108010522,
            end: 108017331
        }, {
            filename: "/content/textures/ui/Settings/MenuBarAssets/MenuBackground.png",
            start: 108017331,
            end: 108020263
        }, {
            filename: "/content/textures/ui/Settings/MenuBarAssets/MenuButton.png",
            start: 108020263,
            end: 108021011
        }, {
            filename: "/content/textures/ui/Settings/MenuBarAssets/MenuButton@2x.png",
            start: 108021011,
            end: 108022964
        }, {
            filename: "/content/textures/ui/Settings/MenuBarAssets/MenuButtonSelected.png",
            start: 108022964,
            end: 108023727
        }, {
            filename: "/content/textures/ui/Settings/MenuBarAssets/MenuButtonSelected@2x.png",
            start: 108023727,
            end: 108025682
        }, {
            filename: "/content/textures/ui/Settings/MenuBarAssets/MenuSelection.png",
            start: 108025682,
            end: 108028542
        }, {
            filename: "/content/textures/ui/Settings/MenuBarAssets/MenuSelection@2x.png",
            start: 108028542,
            end: 108031482
        }, {
            filename: "/content/textures/ui/Settings/MenuBarIcons/GameSettingsTab.png",
            start: 108031482,
            end: 108034298
        }, {
            filename: "/content/textures/ui/Settings/MenuBarIcons/GameSettingsTab@2x.png",
            start: 108034298,
            end: 108041698
        }, {
            filename: "/content/textures/ui/Settings/MenuBarIcons/HelpTab.png",
            start: 108041698,
            end: 108044364
        }, {
            filename: "/content/textures/ui/Settings/MenuBarIcons/HelpTab@2x.png",
            start: 108044364,
            end: 108051663
        }, {
            filename: "/content/textures/ui/Settings/MenuBarIcons/HomeTab.png",
            start: 108051663,
            end: 108052774
        }, {
            filename: "/content/textures/ui/Settings/MenuBarIcons/HomeTab@2x.png",
            start: 108052774,
            end: 108055638
        }, {
            filename: "/content/textures/ui/Settings/MenuBarIcons/PlayersTabIcon.png",
            start: 108055638,
            end: 108056132
        }, {
            filename: "/content/textures/ui/Settings/MenuBarIcons/PlayersTabIcon@2x.png",
            start: 108056132,
            end: 108057809
        }, {
            filename: "/content/textures/ui/Settings/MenuBarIcons/RecordTab.png",
            start: 108057809,
            end: 108059713
        }, {
            filename: "/content/textures/ui/Settings/MenuBarIcons/RecordTab@2x.png",
            start: 108059713,
            end: 108064287
        }, {
            filename: "/content/textures/ui/Settings/MenuBarIcons/ReportAbuseTab.png",
            start: 108064287,
            end: 108065650
        }, {
            filename: "/content/textures/ui/Settings/MenuBarIcons/ReportAbuseTab@2x.png",
            start: 108065650,
            end: 108068293
        }, {
            filename: "/content/textures/ui/Settings/Radial/Alert.png",
            start: 108068293,
            end: 108070903
        }, {
            filename: "/content/textures/ui/Settings/Radial/Alert@2x.png",
            start: 108070903,
            end: 108077594
        }, {
            filename: "/content/textures/ui/Settings/Radial/Backpack.png",
            start: 108077594,
            end: 108079788
        }, {
            filename: "/content/textures/ui/Settings/Radial/Backpack@2x.png",
            start: 108079788,
            end: 108085113
        }, {
            filename: "/content/textures/ui/Settings/Radial/Bottom.png",
            start: 108085113,
            end: 108095994
        }, {
            filename: "/content/textures/ui/Settings/Radial/BottomLeft.png",
            start: 108095994,
            end: 108107186
        }, {
            filename: "/content/textures/ui/Settings/Radial/BottomLeftSelected.png",
            start: 108107186,
            end: 108118200
        }, {
            filename: "/content/textures/ui/Settings/Radial/BottomRight.png",
            start: 108118200,
            end: 108129425
        }, {
            filename: "/content/textures/ui/Settings/Radial/BottomRightSelected.png",
            start: 108129425,
            end: 108140198
        }, {
            filename: "/content/textures/ui/Settings/Radial/BottomSelected.png",
            start: 108140198,
            end: 108150013
        }, {
            filename: "/content/textures/ui/Settings/Radial/Chat.png",
            start: 108150013,
            end: 108152155
        }, {
            filename: "/content/textures/ui/Settings/Radial/Chat@2x.png",
            start: 108152155,
            end: 108157298
        }, {
            filename: "/content/textures/ui/Settings/Radial/EmptyBottom.png",
            start: 108157298,
            end: 108171351
        }, {
            filename: "/content/textures/ui/Settings/Radial/EmptyBottomLeft.png",
            start: 108171351,
            end: 108185926
        }, {
            filename: "/content/textures/ui/Settings/Radial/EmptyBottomRight.png",
            start: 108185926,
            end: 108200607
        }, {
            filename: "/content/textures/ui/Settings/Radial/EmptyTop.png",
            start: 108200607,
            end: 108214640
        }, {
            filename: "/content/textures/ui/Settings/Radial/EmptyTopLeft.png",
            start: 108214640,
            end: 108229266
        }, {
            filename: "/content/textures/ui/Settings/Radial/EmptyTopRight.png",
            start: 108229266,
            end: 108244218
        }, {
            filename: "/content/textures/ui/Settings/Radial/Leave.png",
            start: 108244218,
            end: 108246341
        }, {
            filename: "/content/textures/ui/Settings/Radial/Leave@2x.png",
            start: 108246341,
            end: 108251815
        }, {
            filename: "/content/textures/ui/Settings/Radial/Menu.png",
            start: 108251815,
            end: 108252929
        }, {
            filename: "/content/textures/ui/Settings/Radial/Menu@2x.png",
            start: 108252929,
            end: 108255766
        }, {
            filename: "/content/textures/ui/Settings/Radial/PlayerList.png",
            start: 108255766,
            end: 108257156
        }, {
            filename: "/content/textures/ui/Settings/Radial/PlayerList@2x.png",
            start: 108257156,
            end: 108260970
        }, {
            filename: "/content/textures/ui/Settings/Radial/RadialLabel.png",
            start: 108260970,
            end: 108264383
        }, {
            filename: "/content/textures/ui/Settings/Radial/RadialLabel@2x.png",
            start: 108264383,
            end: 108268664
        }, {
            filename: "/content/textures/ui/Settings/Radial/Top.png",
            start: 108268664,
            end: 108279577
        }, {
            filename: "/content/textures/ui/Settings/Radial/TopLeft.png",
            start: 108279577,
            end: 108290801
        }, {
            filename: "/content/textures/ui/Settings/Radial/TopLeftSelected.png",
            start: 108290801,
            end: 108301131
        }, {
            filename: "/content/textures/ui/Settings/Radial/TopRight.png",
            start: 108301131,
            end: 108312572
        }, {
            filename: "/content/textures/ui/Settings/Radial/TopRightSelected.png",
            start: 108312572,
            end: 108323232
        }, {
            filename: "/content/textures/ui/Settings/Radial/TopSelected.png",
            start: 108323232,
            end: 108333398
        }, {
            filename: "/content/textures/ui/Settings/Slider/BarLeft.png",
            start: 108333398,
            end: 108333609
        }, {
            filename: "/content/textures/ui/Settings/Slider/BarLeft@2x.png",
            start: 108333609,
            end: 108333971
        }, {
            filename: "/content/textures/ui/Settings/Slider/BarRight.png",
            start: 108333971,
            end: 108334163
        }, {
            filename: "/content/textures/ui/Settings/Slider/BarRight@2x.png",
            start: 108334163,
            end: 108334506
        }, {
            filename: "/content/textures/ui/Settings/Slider/Left.png",
            start: 108334506,
            end: 108334871
        }, {
            filename: "/content/textures/ui/Settings/Slider/Left@2x.png",
            start: 108334871,
            end: 108335552
        }, {
            filename: "/content/textures/ui/Settings/Slider/Right.png",
            start: 108335552,
            end: 108335890
        }, {
            filename: "/content/textures/ui/Settings/Slider/Right@2x.png",
            start: 108335890,
            end: 108336624
        }, {
            filename: "/content/textures/ui/Settings/Slider/SelectedBarLeft.png",
            start: 108336624,
            end: 108336821
        }, {
            filename: "/content/textures/ui/Settings/Slider/SelectedBarLeft@2x.png",
            start: 108336821,
            end: 108337183
        }, {
            filename: "/content/textures/ui/Settings/Slider/SelectedBarRight.png",
            start: 108337183,
            end: 108337371
        }, {
            filename: "/content/textures/ui/Settings/Slider/SelectedBarRight@2x.png",
            start: 108337371,
            end: 108337683
        }, {
            filename: "/content/textures/ui/SettingsButton.png",
            start: 108337683,
            end: 108341169
        }, {
            filename: "/content/textures/ui/SettingsButton_dn.png",
            start: 108341169,
            end: 108344571
        }, {
            filename: "/content/textures/ui/SettingsButton_ds.png",
            start: 108344571,
            end: 108347162
        }, {
            filename: "/content/textures/ui/SettingsButton_ovr.png",
            start: 108347162,
            end: 108350564
        }, {
            filename: "/content/textures/ui/SingleButton.png",
            start: 108350564,
            end: 108351915
        }, {
            filename: "/content/textures/ui/SingleButtonDown.png",
            start: 108351915,
            end: 108353247
        }, {
            filename: "/content/textures/ui/Slate.png",
            start: 108353247,
            end: 108354991
        }, {
            filename: "/content/textures/ui/Slider-BKG-Center.png",
            start: 108354991,
            end: 108355923
        }, {
            filename: "/content/textures/ui/Slider-BKG-Center@2x.png",
            start: 108355923,
            end: 108356855
        }, {
            filename: "/content/textures/ui/Slider-BKG-Left-Cap.png",
            start: 108356855,
            end: 108357837
        }, {
            filename: "/content/textures/ui/Slider-BKG-Left-Cap@2x.png",
            start: 108357837,
            end: 108358918
        }, {
            filename: "/content/textures/ui/Slider-BKG-Right-Cap.png",
            start: 108358918,
            end: 108359909
        }, {
            filename: "/content/textures/ui/Slider-BKG-Right-Cap@2x.png",
            start: 108359909,
            end: 108360988
        }, {
            filename: "/content/textures/ui/Slider-Fill-Center.png",
            start: 108360988,
            end: 108361920
        }, {
            filename: "/content/textures/ui/Slider-Fill-Center@2x.png",
            start: 108361920,
            end: 108362852
        }, {
            filename: "/content/textures/ui/Slider-Fill-Left-Cap.png",
            start: 108362852,
            end: 108363835
        }, {
            filename: "/content/textures/ui/Slider-Fill-Left-Cap@2x.png",
            start: 108363835,
            end: 108364895
        }, {
            filename: "/content/textures/ui/Slider-Fill-Right-Cap.png",
            start: 108364895,
            end: 108365885
        }, {
            filename: "/content/textures/ui/Slider-Fill-Right-Cap@2x.png",
            start: 108365885,
            end: 108366963
        }, {
            filename: "/content/textures/ui/Slider.png",
            start: 108366963,
            end: 108368309
        }, {
            filename: "/content/textures/ui/Slider_dn.png",
            start: 108368309,
            end: 108369573
        }, {
            filename: "/content/textures/ui/Slider_sel.png",
            start: 108369573,
            end: 108370837
        }, {
            filename: "/content/textures/ui/Smooth.png",
            start: 108370837,
            end: 108371024
        }, {
            filename: "/content/textures/ui/StampToolButton.png",
            start: 108371024,
            end: 108372518
        }, {
            filename: "/content/textures/ui/StampToolButton_dn.png",
            start: 108372518,
            end: 108374317
        }, {
            filename: "/content/textures/ui/Studs.png",
            start: 108374317,
            end: 108377638
        }, {
            filename: "/content/textures/ui/SurfaceButton.png",
            start: 108377638,
            end: 108379545
        }, {
            filename: "/content/textures/ui/SurfaceButton_dn.png",
            start: 108379545,
            end: 108381534
        }, {
            filename: "/content/textures/ui/SurfaceMenu.png",
            start: 108381534,
            end: 108382977
        }, {
            filename: "/content/textures/ui/TinyBcIcon.png",
            start: 108382977,
            end: 108386329
        }, {
            filename: "/content/textures/ui/TinyObcIcon.png",
            start: 108386329,
            end: 108389572
        }, {
            filename: "/content/textures/ui/TinyTbcIcon.png",
            start: 108389572,
            end: 108392918
        }, {
            filename: "/content/textures/ui/TixIcon.png",
            start: 108392918,
            end: 108394011
        }, {
            filename: "/content/textures/ui/ToggleFullScreen_ds.png",
            start: 108394011,
            end: 108394477
        }, {
            filename: "/content/textures/ui/ToolButton.png",
            start: 108394477,
            end: 108396178
        }, {
            filename: "/content/textures/ui/ToolButton_dn.png",
            start: 108396178,
            end: 108397879
        }, {
            filename: "/content/textures/ui/ToolButton_ds.png",
            start: 108397879,
            end: 108401079
        }, {
            filename: "/content/textures/ui/TopBar/dropshadow.png",
            start: 108401079,
            end: 108401242
        }, {
            filename: "/content/textures/ui/TopBar/dropshadow@2x.png",
            start: 108401242,
            end: 108401444
        }, {
            filename: "/content/textures/ui/TouchControlsSheet.png",
            start: 108401444,
            end: 108518364
        }, {
            filename: "/content/textures/ui/Universal.png",
            start: 108518364,
            end: 108521623
        }, {
            filename: "/content/textures/ui/Vehicle/SpeedBar.png",
            start: 108521623,
            end: 108522034
        }, {
            filename: "/content/textures/ui/Vehicle/SpeedBar@2x.png",
            start: 108522034,
            end: 108522499
        }, {
            filename: "/content/textures/ui/Vehicle/SpeedBarBKG.png",
            start: 108522499,
            end: 108522778
        }, {
            filename: "/content/textures/ui/Vehicle/SpeedBarBKG@2x.png",
            start: 108522778,
            end: 108523379
        }, {
            filename: "/content/textures/ui/Vehicle/SpeedBarEmpty.png",
            start: 108523379,
            end: 108523497
        }, {
            filename: "/content/textures/ui/Vehicle/SpeedBarEmpty@2x.png",
            start: 108523497,
            end: 108523664
        }, {
            filename: "/content/textures/ui/Weld.png",
            start: 108523664,
            end: 108526990
        }, {
            filename: "/content/textures/ui/Wood.png",
            start: 108526990,
            end: 108527965
        }, {
            filename: "/content/textures/ui/btn_grey.png",
            start: 108527965,
            end: 108528385
        }, {
            filename: "/content/textures/ui/btn_greyTransp.png",
            start: 108528385,
            end: 108528813
        }, {
            filename: "/content/textures/ui/btn_newBlue.png",
            start: 108528813,
            end: 108543708
        }, {
            filename: "/content/textures/ui/btn_newBlue@2x.png",
            start: 108543708,
            end: 108559020
        }, {
            filename: "/content/textures/ui/btn_newBlueGlow.png",
            start: 108559020,
            end: 108573914
        }, {
            filename: "/content/textures/ui/btn_newBlueGlow@2x.png",
            start: 108573914,
            end: 108589230
        }, {
            filename: "/content/textures/ui/btn_newGrey.png",
            start: 108589230,
            end: 108604107
        }, {
            filename: "/content/textures/ui/btn_newGrey@2x.png",
            start: 108604107,
            end: 108619403
        }, {
            filename: "/content/textures/ui/btn_newGreyGlow.png",
            start: 108619403,
            end: 108634281
        }, {
            filename: "/content/textures/ui/btn_newGreyGlow@2x.png",
            start: 108634281,
            end: 108649583
        }, {
            filename: "/content/textures/ui/btn_newWhite.png",
            start: 108649583,
            end: 108664413
        }, {
            filename: "/content/textures/ui/btn_newWhite@2x.png",
            start: 108664413,
            end: 108679664
        }, {
            filename: "/content/textures/ui/btn_newWhiteGlow.png",
            start: 108679664,
            end: 108694528
        }, {
            filename: "/content/textures/ui/btn_newWhiteGlow@2x.png",
            start: 108694528,
            end: 108709806
        }, {
            filename: "/content/textures/ui/btn_red.png",
            start: 108709806,
            end: 108710187
        }, {
            filename: "/content/textures/ui/btn_redGlow.png",
            start: 108710187,
            end: 108710710
        }, {
            filename: "/content/textures/ui/btn_white.png",
            start: 108710710,
            end: 108711076
        }, {
            filename: "/content/textures/ui/chatBubble_blue_notify_bkg.png",
            start: 108711076,
            end: 108711999
        }, {
            filename: "/content/textures/ui/chatBubble_green_notify_bkg.png",
            start: 108711999,
            end: 108712898
        }, {
            filename: "/content/textures/ui/chatBubble_red_notify_bkg.png",
            start: 108712898,
            end: 108713717
        }, {
            filename: "/content/textures/ui/chatBubble_white_notify_bkg.png",
            start: 108713717,
            end: 108714558
        }, {
            filename: "/content/textures/ui/chat_teamButton.png",
            start: 108714558,
            end: 108714926
        }, {
            filename: "/content/textures/ui/chat_teamButton@2x.png",
            start: 108714926,
            end: 108715768
        }, {
            filename: "/content/textures/ui/dialog_blue.png",
            start: 108715768,
            end: 108716069
        }, {
            filename: "/content/textures/ui/dialog_blue@2x.png",
            start: 108716069,
            end: 108716807
        }, {
            filename: "/content/textures/ui/dialog_ellipses.png",
            start: 108716807,
            end: 108717221
        }, {
            filename: "/content/textures/ui/dialog_green.png",
            start: 108717221,
            end: 108717529
        }, {
            filename: "/content/textures/ui/dialog_green@2x.png",
            start: 108717529,
            end: 108718239
        }, {
            filename: "/content/textures/ui/dialog_purpose_help.png",
            start: 108718239,
            end: 108718809
        }, {
            filename: "/content/textures/ui/dialog_purpose_quest.png",
            start: 108718809,
            end: 108719138
        }, {
            filename: "/content/textures/ui/dialog_purpose_shop.png",
            start: 108719138,
            end: 108719860
        }, {
            filename: "/content/textures/ui/dialog_red.png",
            start: 108719860,
            end: 108720182
        }, {
            filename: "/content/textures/ui/dialog_red@2x.png",
            start: 108720182,
            end: 108720815
        }, {
            filename: "/content/textures/ui/dialog_tail.png",
            start: 108720815,
            end: 108721006
        }, {
            filename: "/content/textures/ui/dialog_tail@2x.png",
            start: 108721006,
            end: 108721292
        }, {
            filename: "/content/textures/ui/dialog_white.png",
            start: 108721292,
            end: 108721485
        }, {
            filename: "/content/textures/ui/dialog_white@2x.png",
            start: 108721485,
            end: 108721835
        }, {
            filename: "/content/textures/ui/dropdown_arrow.png",
            start: 108721835,
            end: 108722153
        }, {
            filename: "/content/textures/ui/dropdown_arrow@2x.png",
            start: 108722153,
            end: 108722784
        }, {
            filename: "/content/textures/ui/expandPlayerList.png",
            start: 108722784,
            end: 108722993
        }, {
            filename: "/content/textures/ui/expandPlayerList@2x.png",
            start: 108722993,
            end: 108723419
        }, {
            filename: "/content/textures/ui/homeButton.png",
            start: 108723419,
            end: 108738102
        }, {
            filename: "/content/textures/ui/homeButton@2x.png",
            start: 108738102,
            end: 108738908
        }, {
            filename: "/content/textures/ui/icon_BC-16.png",
            start: 108738908,
            end: 108740023
        }, {
            filename: "/content/textures/ui/icon_OBC-16.png",
            start: 108740023,
            end: 108741183
        }, {
            filename: "/content/textures/ui/icon_TBC-16.png",
            start: 108741183,
            end: 108742350
        }, {
            filename: "/content/textures/ui/icon_admin-16.png",
            start: 108742350,
            end: 108743939
        }, {
            filename: "/content/textures/ui/icon_follower-16.png",
            start: 108743939,
            end: 108745100
        }, {
            filename: "/content/textures/ui/icon_following-16.png",
            start: 108745100,
            end: 108746327
        }, {
            filename: "/content/textures/ui/icon_friendrequestrecieved-16.png",
            start: 108746327,
            end: 108747477
        }, {
            filename: "/content/textures/ui/icon_friendrequestsent_16.png",
            start: 108747477,
            end: 108748536
        }, {
            filename: "/content/textures/ui/icon_friends_16.png",
            start: 108748536,
            end: 108749747
        }, {
            filename: "/content/textures/ui/icon_mutualfollowing-16.png",
            start: 108749747,
            end: 108750849
        }, {
            filename: "/content/textures/ui/icon_placeowner.png",
            start: 108750849,
            end: 108752070
        }, {
            filename: "/content/textures/ui/icon_tester-16.png",
            start: 108752070,
            end: 108752759
        }, {
            filename: "/content/textures/ui/mouseLock_off.png",
            start: 108752759,
            end: 108754327
        }, {
            filename: "/content/textures/ui/mouseLock_off@2x.png",
            start: 108754327,
            end: 108758546
        }, {
            filename: "/content/textures/ui/mouseLock_on.png",
            start: 108758546,
            end: 108760470
        }, {
            filename: "/content/textures/ui/mouseLock_on@2x.png",
            start: 108760470,
            end: 108765364
        }, {
            filename: "/content/textures/ui/newBkg_square.png",
            start: 108765364,
            end: 108780176
        }, {
            filename: "/content/textures/ui/newBkg_square@2x.png",
            start: 108780176,
            end: 108795317
        }, {
            filename: "/content/textures/ui/scroll-bottom.png",
            start: 108795317,
            end: 108795499
        }, {
            filename: "/content/textures/ui/scroll-bottom@2x.png",
            start: 108795499,
            end: 108810167
        }, {
            filename: "/content/textures/ui/scroll-middle.png",
            start: 108810167,
            end: 108810282
        }, {
            filename: "/content/textures/ui/scroll-middle@2x.png",
            start: 108810282,
            end: 108810400
        }, {
            filename: "/content/textures/ui/scroll-top.png",
            start: 108810400,
            end: 108810598
        }, {
            filename: "/content/textures/ui/scroll-top@2x.png",
            start: 108810598,
            end: 108825277
        }, {
            filename: "/content/textures/ui/scrollbar.png",
            start: 108825277,
            end: 108826218
        }, {
            filename: "/content/textures/ui/scrollbuttonDown.png",
            start: 108826218,
            end: 108827336
        }, {
            filename: "/content/textures/ui/scrollbuttonDown_dn.png",
            start: 108827336,
            end: 108828427
        }, {
            filename: "/content/textures/ui/scrollbuttonDown_ds.png",
            start: 108828427,
            end: 108829545
        }, {
            filename: "/content/textures/ui/scrollbuttonDown_ovr.png",
            start: 108829545,
            end: 108830636
        }, {
            filename: "/content/textures/ui/scrollbuttonUp.png",
            start: 108830636,
            end: 108831748
        }, {
            filename: "/content/textures/ui/scrollbuttonUp_dn.png",
            start: 108831748,
            end: 108832838
        }, {
            filename: "/content/textures/ui/scrollbuttonUp_ds.png",
            start: 108832838,
            end: 108833948
        }, {
            filename: "/content/textures/ui/scrollbuttonUp_ovr.png",
            start: 108833948,
            end: 108835038
        }, {
            filename: "/content/textures/ui/slider_new_tab.png",
            start: 108835038,
            end: 108836006
        }, {
            filename: "/content/textures/ui/slider_new_tab@2x.png",
            start: 108836006,
            end: 108838191
        }, {
            filename: "/content/textures/water_Subsurface.dds",
            start: 108838191,
            end: 108860163
        }, {
            filename: "/content/textures/water_Wave.dds",
            start: 108860163,
            end: 108882135
        }, {
            filename: "/content/textures/wrench.png",
            start: 108882135,
            end: 108882745
        }, {
            filename: "/shaders/shaders.json",
            start: 108882745,
            end: 108900730
        }, {
            filename: "/shaders/shaders_d3d11.pack",
            start: 108900730,
            end: 109372750
        }, {
            filename: "/shaders/shaders_d3d11_durango.pack",
            start: 109372750,
            end: 110077526
        }, {
            filename: "/shaders/shaders_d3d9.pack",
            start: 110077526,
            end: 110312174
        }, {
            filename: "/shaders/shaders_glsl.pack",
            start: 110312174,
            end: 110644923
        }, {
            filename: "/shaders/shaders_glsl3.pack",
            start: 110644923,
            end: 110976132
        }, {
            filename: "/shaders/shaders_glsles.pack",
            start: 110976132,
            end: 111196814
        }, {
            filename: "/shaders/shaders_glsles3.pack",
            start: 111196814,
            end: 111573265
        }, {
            filename: "/shaders/source/adorn.hlsl",
            start: 111573265,
            end: 111579957
        }, {
            filename: "/shaders/source/aluminum.hlsl",
            start: 111579957,
            end: 111580549
        }, {
            filename: "/shaders/source/brick.hlsl",
            start: 111580549,
            end: 111581133
        }, {
            filename: "/shaders/source/cobblestone.hlsl",
            start: 111581133,
            end: 111581645
        }, {
            filename: "/shaders/source/common.h",
            start: 111581645,
            end: 111590016
        }, {
            filename: "/shaders/source/concrete.hlsl",
            start: 111590016,
            end: 111590607
        }, {
            filename: "/shaders/source/default.hlsl",
            start: 111590607,
            end: 111600295
        }, {
            filename: "/shaders/source/diamondplate.hlsl",
            start: 111600295,
            end: 111600851
        }, {
            filename: "/shaders/source/fabric.hlsl",
            start: 111600851,
            end: 111601436
        }, {
            filename: "/shaders/source/gbuffer.hlsl",
            start: 111601436,
            end: 111602227
        }, {
            filename: "/shaders/source/globals.h",
            start: 111602227,
            end: 111602964
        }, {
            filename: "/shaders/source/granite.hlsl",
            start: 111602964,
            end: 111603557
        }, {
            filename: "/shaders/source/grass.hlsl",
            start: 111603557,
            end: 111604145
        }, {
            filename: "/shaders/source/ice.hlsl",
            start: 111604145,
            end: 111604738
        }, {
            filename: "/shaders/source/marble.hlsl",
            start: 111604738,
            end: 111605325
        }, {
            filename: "/shaders/source/material.hlsl",
            start: 111605325,
            end: 111608144
        }, {
            filename: "/shaders/source/megacluster.hlsl",
            start: 111608144,
            end: 111613255
        }, {
            filename: "/shaders/source/metal.hlsl",
            start: 111613255,
            end: 111613815
        }, {
            filename: "/shaders/source/neon.hlsl",
            start: 111613815,
            end: 111613876
        }, {
            filename: "/shaders/source/particle.hlsl",
            start: 111613876,
            end: 111620442
        }, {
            filename: "/shaders/source/pebble.hlsl",
            start: 111620442,
            end: 111620998
        }, {
            filename: "/shaders/source/plastic.hlsl",
            start: 111620998,
            end: 111622176
        }, {
            filename: "/shaders/source/profiler.hlsl",
            start: 111622176,
            end: 111622935
        }, {
            filename: "/shaders/source/rust.hlsl",
            start: 111622935,
            end: 111623523
        }, {
            filename: "/shaders/source/sand.hlsl",
            start: 111623523,
            end: 111624075
        }, {
            filename: "/shaders/source/screenspace.hlsl",
            start: 111624075,
            end: 111628853
        }, {
            filename: "/shaders/source/shadow.hlsl",
            start: 111628853,
            end: 111629920
        }, {
            filename: "/shaders/source/sky.hlsl",
            start: 111629920,
            end: 111631065
        }, {
            filename: "/shaders/source/slate.hlsl",
            start: 111631065,
            end: 111631627
        }, {
            filename: "/shaders/source/smoothcluster.hlsl",
            start: 111631627,
            end: 111636691
        }, {
            filename: "/shaders/source/smoothplastic.hlsl",
            start: 111636691,
            end: 111636735
        }, {
            filename: "/shaders/source/smoothwater.hlsl",
            start: 111636735,
            end: 111645471
        }, {
            filename: "/shaders/source/ssao.hlsl",
            start: 111645471,
            end: 111654651
        }, {
            filename: "/shaders/source/texcomp.hlsl",
            start: 111654651,
            end: 111655386
        }, {
            filename: "/shaders/source/ui.hlsl",
            start: 111655386,
            end: 111656547
        }, {
            filename: "/shaders/source/water.hlsl",
            start: 111656547,
            end: 111661940
        }, {
            filename: "/shaders/source/wood.hlsl",
            start: 111661940,
            end: 111662496
        }, {
            filename: "/shaders/source/woodplanks.hlsl",
            start: 111662496,
            end: 111663079
        }],
        remote_package_size: 111663079
    })
}
)();
if (Module["$ww"] || typeof ENVIRONMENT_IS_PTHREAD != "undefined" && ENVIRONMENT_IS_PTHREAD)
    Module["preRun"] = [];
var necessaryPreJSTasks = Module["preRun"].slice();
if (!Module["preRun"])
    throw "Module.preRun should exist because file support used it; did a pre-js delete it?";
necessaryPreJSTasks.forEach(task => {
    if (Module["preRun"].indexOf(task) < 0)
        throw "All preRun tasks that exist before user pre-js code should remain after; did you replace Module or modify Module.preRun?"
}
);
var moduleOverrides = {
    ...Module
};
var arguments_ = [];
var thisProgram = "./this.program";
var quit_ = (status, toThrow) => {
    throw toThrow
}
;
var _scriptName = typeof document != "undefined" ? document.currentScript?.src : undefined;
if (ENVIRONMENT_IS_WORKER) {
    _scriptName = self.location.href
}
var scriptDirectory = "";
function locateFile(path) {
    dbg("locateFile:", path, "scriptDirectory:", scriptDirectory);
    if (Module["locateFile"]) {
        return Module["locateFile"](path, scriptDirectory)
    }
    return scriptDirectory + path
}
var readAsync, readBinary;
if (ENVIRONMENT_IS_SHELL) {
    if (typeof process == "object" && typeof require === "function" || typeof window == "object" || typeof WorkerGlobalScope != "undefined")
        throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)")
} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
    if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = self.location.href
    } else if (typeof document != "undefined" && document.currentScript) {
        scriptDirectory = document.currentScript.src
    }
    if (scriptDirectory.startsWith("blob:")) {
        scriptDirectory = ""
    } else {
        scriptDirectory = scriptDirectory.slice(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1)
    }
    if (!(typeof window == "object" || typeof WorkerGlobalScope != "undefined"))
        throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
    {
        if (ENVIRONMENT_IS_WORKER) {
            readBinary = url => {
                var xhr = new XMLHttpRequest;
                xhr.open("GET", url, false);
                xhr.responseType = "arraybuffer";
                xhr.send(null);
                return new Uint8Array(xhr.response)
            }
        }
        readAsync = async url => {
            assert(!isFileURI(url), "readAsync does not work with file:// URLs");
            var response = await fetch(url, {
                credentials: "same-origin"
            });
            if (response.ok) {
                return response.arrayBuffer()
            }
            throw new Error(response.status + " : " + response.url)
        }
    }
} else {
    throw new Error("environment detection error")
}
var out = Module["print"] || console.log.bind(console);
var err = Module["printErr"] || console.error.bind(console);
Object.assign(Module, moduleOverrides);
moduleOverrides = null;
checkIncomingModuleAPI();
if (Module["arguments"])
    arguments_ = Module["arguments"];
legacyModuleProp("arguments", "arguments_");
if (Module["thisProgram"])
    thisProgram = Module["thisProgram"];
legacyModuleProp("thisProgram", "thisProgram");
assert(typeof Module["memoryInitializerPrefixURL"] == "undefined", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
assert(typeof Module["pthreadMainPrefixURL"] == "undefined", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
assert(typeof Module["cdInitializerPrefixURL"] == "undefined", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
assert(typeof Module["filePackagePrefixURL"] == "undefined", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
assert(typeof Module["read"] == "undefined", "Module.read option was removed");
assert(typeof Module["readAsync"] == "undefined", "Module.readAsync option was removed (modify readAsync in JS)");
assert(typeof Module["readBinary"] == "undefined", "Module.readBinary option was removed (modify readBinary in JS)");
assert(typeof Module["setWindowTitle"] == "undefined", "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)");
assert(typeof Module["TOTAL_MEMORY"] == "undefined", "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
legacyModuleProp("asm", "wasmExports");
legacyModuleProp("readAsync", "readAsync");
legacyModuleProp("readBinary", "readBinary");
legacyModuleProp("setWindowTitle", "setWindowTitle");
assert(ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER || ENVIRONMENT_IS_NODE, "Pthreads do not work in this environment yet (need Web Workers, or an alternative to them)");
assert(!ENVIRONMENT_IS_NODE, "node environment detected but not enabled at build time.  Add `node` to `-sENVIRONMENT` to enable.");
assert(!ENVIRONMENT_IS_SHELL, "shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.");
var wasmBinary = Module["wasmBinary"];
legacyModuleProp("wasmBinary", "wasmBinary");
if (typeof WebAssembly != "object") {
    err("no native wasm support detected")
}
var wasmMemory;
var wasmModule;
var ABORT = false;
var EXITSTATUS;
function assert(condition, text) {
    if (!condition) {
        abort("Assertion failed" + (text ? ": " + text : ""))
    }
}
var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAP64, HEAPU64, HEAPF64;
var runtimeInitialized = false;
var isFileURI = filename => filename.startsWith("file://");
function writeStackCookie() {
    var max = _emscripten_stack_get_end();
    dbg(`writeStackCookie: ${ptrToString(max)}`);
    assert((max & 3) == 0);
    if (max == 0) {
        max += 4
    }
    GROWABLE_HEAP_U32()[max >> 2] = 34821223;
    GROWABLE_HEAP_U32()[max + 4 >> 2] = 2310721022;
    GROWABLE_HEAP_U32()[0 >> 2] = 1668509029
}
function checkStackCookie() {
    if (ABORT)
        return;
    var max = _emscripten_stack_get_end();
    if (max == 0) {
        max += 4
    }
    var cookie1 = GROWABLE_HEAP_U32()[max >> 2];
    var cookie2 = GROWABLE_HEAP_U32()[max + 4 >> 2];
    if (cookie1 != 34821223 || cookie2 != 2310721022) {
        abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`)
    }
    if (GROWABLE_HEAP_U32()[0 >> 2] != 1668509029) {
        abort("Runtime error: The application has corrupted its heap memory area (address zero)!")
    }
}
class EmscriptenEH extends Error {
}
class EmscriptenSjLj extends EmscriptenEH {
}
class CppException extends EmscriptenEH {
    constructor(excPtr) {
        super(excPtr);
        this.excPtr = excPtr;
        const excInfo = getExceptionMessage(excPtr);
        this.name = excInfo[0];
        this.message = excInfo[1]
    }
}
( () => {
    var h16 = new Int16Array(1);
    var h8 = new Int8Array(h16.buffer);
    h16[0] = 25459;
    if (h8[0] !== 115 || h8[1] !== 99)
        throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)"
}
)();
if (Module["ENVIRONMENT"]) {
    throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)")
}
function legacyModuleProp(prop, newName, incoming=true) {
    if (!Object.getOwnPropertyDescriptor(Module, prop)) {
        Object.defineProperty(Module, prop, {
            configurable: true,
            get() {
                let extra = incoming ? " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)" : "";
                abort(`\`Module.${prop}\` has been replaced by \`${newName}\`` + extra)
            }
        })
    }
}
function consumedModuleProp(prop) {
    if (!Object.getOwnPropertyDescriptor(Module, prop)) {
        Object.defineProperty(Module, prop, {
            configurable: true,
            set() {
                abort(`Attempt to set \`Module.${prop}\` after it has already been processed.  This can happen, for example, when code is injected via '--post-js' rather than '--pre-js'`)
            }
        })
    }
}
function ignoredModuleProp(prop) {
    if (Object.getOwnPropertyDescriptor(Module, prop)) {
        abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`)
    }
}
function isExportedByForceFilesystem(name) {
    return name === "FS_createPath" || name === "FS_createDataFile" || name === "FS_createPreloadedFile" || name === "FS_unlink" || name === "addRunDependency" || name === "FS_createLazyFile" || name === "FS_createDevice" || name === "removeRunDependency"
}
function hookGlobalSymbolAccess(sym, func) {
    if (typeof globalThis != "undefined" && !Object.getOwnPropertyDescriptor(globalThis, sym)) {
        Object.defineProperty(globalThis, sym, {
            configurable: true,
            get() {
                func();
                return undefined
            }
        })
    }
}
function missingGlobal(sym, msg) {
    hookGlobalSymbolAccess(sym, () => {
        warnOnce(`\`${sym}\` is not longer defined by emscripten. ${msg}`)
    }
    )
}
missingGlobal("buffer", "Please use HEAP8.buffer or wasmMemory.buffer");
missingGlobal("asm", "Please use wasmExports instead");
function missingLibrarySymbol(sym) {
    hookGlobalSymbolAccess(sym, () => {
        var msg = `\`${sym}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`;
        var librarySymbol = sym;
        if (!librarySymbol.startsWith("_")) {
            librarySymbol = "$" + sym
        }
        msg += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${librarySymbol}')`;
        if (isExportedByForceFilesystem(sym)) {
            msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you"
        }
        warnOnce(msg)
    }
    );
    unexportedRuntimeSymbol(sym)
}
function unexportedRuntimeSymbol(sym) {
    if (ENVIRONMENT_IS_PTHREAD) {
        return
    }
    if (!Object.getOwnPropertyDescriptor(Module, sym)) {
        Object.defineProperty(Module, sym, {
            configurable: true,
            get() {
                var msg = `'${sym}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
                if (isExportedByForceFilesystem(sym)) {
                    msg += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you"
                }
                abort(msg)
            }
        })
    }
}
var printObjectList = [];
var runtimeDebug = true;
function dbg(...args) {
    if (!runtimeDebug && typeof runtimeDebug != "undefined")
        return;
    console.warn(...args)
}
function GROWABLE_HEAP_I8() {
    if (wasmMemory.buffer != HEAP8.buffer) {
        updateMemoryViews()
    }
    return HEAP8
}
function GROWABLE_HEAP_U8() {
    if (wasmMemory.buffer != HEAP8.buffer) {
        updateMemoryViews()
    }
    return HEAPU8
}
function GROWABLE_HEAP_I16() {
    if (wasmMemory.buffer != HEAP8.buffer) {
        updateMemoryViews()
    }
    return HEAP16
}
function GROWABLE_HEAP_U16() {
    if (wasmMemory.buffer != HEAP8.buffer) {
        updateMemoryViews()
    }
    return HEAPU16
}
function GROWABLE_HEAP_I32() {
    if (wasmMemory.buffer != HEAP8.buffer) {
        updateMemoryViews()
    }
    return HEAP32
}
function GROWABLE_HEAP_U32() {
    if (wasmMemory.buffer != HEAP8.buffer) {
        updateMemoryViews()
    }
    return HEAPU32
}
function GROWABLE_HEAP_F32() {
    if (wasmMemory.buffer != HEAP8.buffer) {
        updateMemoryViews()
    }
    return HEAPF32
}
function GROWABLE_HEAP_F64() {
    if (wasmMemory.buffer != HEAP8.buffer) {
        updateMemoryViews()
    }
    return HEAPF64
}
var workerID = 0;
if (ENVIRONMENT_IS_PTHREAD) {
    var wasmModuleReceived;
    var initializedJS = false;
    function threadPrintErr(...args) {
        console.error(...args)
    }
    if (!Module["printErr"])
        err = threadPrintErr;
    self.onunhandledrejection = e => {
        throw e.reason || e
    }
    ;
    function handleMessage(e) {
        try {
            var msgData = e["data"];
            var cmd = msgData.cmd;
            if (cmd === "load") {
                workerID = msgData.workerID;
                let messageQueue = [];
                self.onmessage = e => messageQueue.push(e);
                self.startWorker = instance => {
                    postMessage({
                        cmd: "loaded"
                    });
                    for (let msg of messageQueue) {
                        handleMessage(msg)
                    }
                    self.onmessage = handleMessage
                }
                ;
                for (const handler of msgData.handlers) {
                    if (!Module[handler] || Module[handler].proxy) {
                        dbg(`worker: installer proxying handler: ${handler}`);
                        Module[handler] = (...args) => {
                            dbg(`worker: calling handler on main thread: ${handler}`);
                            postMessage({
                                cmd: "callHandler",
                                handler,
                                args
                            })
                        }
                        ;
                        if (handler == "print")
                            out = Module[handler];
                        if (handler == "printErr")
                            err = Module[handler]
                    } else
                        dbg(`worker: using thread-local handler: ${handler}`)
                }
                wasmMemory = msgData.wasmMemory;
                updateMemoryViews();
                wasmModuleReceived(msgData.wasmModule)
            } else if (cmd === "run") {
                assert(msgData.pthread_ptr);
                establishStackSpace(msgData.pthread_ptr);
                __emscripten_thread_init(msgData.pthread_ptr, 0, 0, 1, 0, 0);
                PThread.threadInitTLS();
                __emscripten_thread_mailbox_await(msgData.pthread_ptr);
                if (!initializedJS) {
                    __embind_initialize_bindings();
                    initializedJS = true
                }
                try {
                    invokeEntryPoint(msgData.start_routine, msgData.arg)
                } catch (ex) {
                    if (ex != "unwind") {
                        throw ex
                    }
                    dbg(`worker: Pthread 0x${_pthread_self().toString(16)} completed its main entry point with an 'unwind', keeping the worker alive for asynchronous operation.`)
                }
            } else if (msgData.target === "setimmediate") {} else if (cmd === "checkMailbox") {
                if (initializedJS) {
                    checkMailbox()
                }
            } else if (cmd) {
                err(`worker: received unknown command ${cmd}`);
                err(msgData)
            }
        } catch (ex) {
            err(`worker: onmessage() captured an uncaught exception: ${ex}`);
            if (ex?.stack)
                err(ex.stack);
            __emscripten_thread_crashed();
            throw ex
        }
    }
    self.onmessage = handleMessage
}
function updateMemoryViews() {
    var b = wasmMemory.buffer;
    Module["HEAP8"] = HEAP8 = new Int8Array(b);
    Module["HEAP16"] = HEAP16 = new Int16Array(b);
    Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
    Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
    Module["HEAP32"] = HEAP32 = new Int32Array(b);
    Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
    Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
    Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
    Module["HEAP64"] = HEAP64 = new BigInt64Array(b);
    Module["HEAPU64"] = HEAPU64 = new BigUint64Array(b)
}
assert(!Module["STACK_SIZE"], "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");
assert(typeof Int32Array != "undefined" && typeof Float64Array !== "undefined" && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined, "JS engine does not provide full typed array support");
if (!ENVIRONMENT_IS_PTHREAD) {
    if (Module["wasmMemory"]) {
        wasmMemory = Module["wasmMemory"]
    } else {
        var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 134217728;
        legacyModuleProp("INITIAL_MEMORY", "INITIAL_MEMORY");
        assert(INITIAL_MEMORY >= 65536, "INITIAL_MEMORY should be larger than STACK_SIZE, was " + INITIAL_MEMORY + "! (STACK_SIZE=" + 65536 + ")");
        wasmMemory = new WebAssembly.Memory({
            initial: INITIAL_MEMORY / 65536,
            maximum: 32768,
            shared: true
        })
    }
    updateMemoryViews()
}
function preRun() {
    assert(!ENVIRONMENT_IS_PTHREAD);
    if (Module["preRun"]) {
        if (typeof Module["preRun"] == "function")
            Module["preRun"] = [Module["preRun"]];
        while (Module["preRun"].length) {
            addOnPreRun(Module["preRun"].shift())
        }
    }
    consumedModuleProp("preRun");
    callRuntimeCallbacks(onPreRuns)
}
function initRuntime() {
    dbg("initRuntime");
    assert(!runtimeInitialized);
    runtimeInitialized = true;
    if (ENVIRONMENT_IS_PTHREAD)
        return startWorker(Module);
    checkStackCookie();
    SOCKFS.root = FS.mount(SOCKFS, {}, null);
    if (!Module["noFSInit"] && !FS.initialized)
        FS.init();
    TTY.init();
    wasmExports["__wasm_call_ctors"]();
    FS.ignorePermissions = false
}
function preMain() {
    checkStackCookie()
}
function postRun() {
    checkStackCookie();
    if (ENVIRONMENT_IS_PTHREAD)
        return;
    if (Module["postRun"]) {
        if (typeof Module["postRun"] == "function")
            Module["postRun"] = [Module["postRun"]];
        while (Module["postRun"].length) {
            addOnPostRun(Module["postRun"].shift())
        }
    }
    consumedModuleProp("postRun");
    callRuntimeCallbacks(onPostRuns)
}
var runDependencies = 0;
var dependenciesFulfilled = null;
var runDependencyTracking = {};
var runDependencyWatcher = null;
function getUniqueRunDependency(id) {
    var orig = id;
    while (1) {
        if (!runDependencyTracking[id])
            return id;
        id = orig + Math.random()
    }
}
function addRunDependency(id) {
    runDependencies++;
    Module["monitorRunDependencies"]?.(runDependencies);
    if (id) {
        assert(!runDependencyTracking[id]);
        runDependencyTracking[id] = 1;
        if (runDependencyWatcher === null && typeof setInterval != "undefined") {
            runDependencyWatcher = setInterval( () => {
                if (ABORT) {
                    clearInterval(runDependencyWatcher);
                    runDependencyWatcher = null;
                    return
                }
                var shown = false;
                for (var dep in runDependencyTracking) {
                    if (!shown) {
                        shown = true;
                        err("still waiting on run dependencies:")
                    }
                    err(`dependency: ${dep}`)
                }
                if (shown) {
                    err("(end of list)")
                }
            }
            , 1e4)
        }
    } else {
        err("warning: run dependency added without ID")
    }
}
function removeRunDependency(id) {
    runDependencies--;
    Module["monitorRunDependencies"]?.(runDependencies);
    if (id) {
        assert(runDependencyTracking[id]);
        delete runDependencyTracking[id]
    } else {
        err("warning: run dependency removed without ID")
    }
    if (runDependencies == 0) {
        if (runDependencyWatcher !== null) {
            clearInterval(runDependencyWatcher);
            runDependencyWatcher = null
        }
        if (dependenciesFulfilled) {
            var callback = dependenciesFulfilled;
            dependenciesFulfilled = null;
            callback()
        }
    }
}
function abort(what) {
    Module["onAbort"]?.(what);
    what = "Aborted(" + what + ")";
    err(what);
    ABORT = true;
    var e = new WebAssembly.RuntimeError(what);
    throw e
}
function createExportWrapper(name, nargs) {
    return (...args) => {
        assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
        var f = wasmExports[name];
        assert(f, `exported native function \`${name}\` not found`);
        assert(args.length <= nargs, `native function \`${name}\` called with ${args.length} args but expects ${nargs}`);
        return f(...args)
    }
}
var wasmBinaryFile;
function findWasmBinary() {
    return locateFile("RobloxLinuxClient.wasm")
}
function getBinarySync(file) {
    if (file == wasmBinaryFile && wasmBinary) {
        return new Uint8Array(wasmBinary)
    }
    if (readBinary) {
        return readBinary(file)
    }
    throw "both async and sync fetching of the wasm failed"
}
async function getWasmBinary(binaryFile) {
    if (!wasmBinary) {
        try {
            var response = await readAsync(binaryFile);
            return new Uint8Array(response)
        } catch {}
    }
    return getBinarySync(binaryFile)
}
async function instantiateArrayBuffer(binaryFile, imports) {
    try {
        var binary = await getWasmBinary(binaryFile);
        var instance = await WebAssembly.instantiate(binary, imports);
        return instance
    } catch (reason) {
        err(`failed to asynchronously prepare wasm: ${reason}`);
        if (isFileURI(wasmBinaryFile)) {
            err(`warning: Loading from a file URI (${wasmBinaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`)
        }
        abort(reason)
    }
}
async function instantiateAsync(binary, binaryFile, imports) {
    if (!binary && typeof WebAssembly.instantiateStreaming == "function") {
        try {
            var response = fetch(binaryFile, {
                credentials: "same-origin"
            });
            var instantiationResult = await WebAssembly.instantiateStreaming(response, imports);
            return instantiationResult
        } catch (reason) {
            err(`wasm streaming compile failed: ${reason}`);
            err("falling back to ArrayBuffer instantiation")
        }
    }
    return instantiateArrayBuffer(binaryFile, imports)
}
function getWasmImports() {
    assignWasmImports();
    return {
        env: wasmImports,
        wasi_snapshot_preview1: wasmImports
    }
}
async function createWasm() {
    function receiveInstance(instance, module) {
        wasmExports = instance.exports;
        registerTLSInit(wasmExports["_emscripten_tls_init"]);
        wasmTable = wasmExports["__indirect_function_table"];
        assert(wasmTable, "table not found in wasm exports");
        wasmModule = module;
        removeRunDependency("wasm-instantiate");
        return wasmExports
    }
    addRunDependency("wasm-instantiate");
    var trueModule = Module;
    function receiveInstantiationResult(result) {
        assert(Module === trueModule, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
        trueModule = null;
        return receiveInstance(result["instance"], result["module"])
    }
    var info = getWasmImports();
    if (Module["instantiateWasm"]) {
        return new Promise( (resolve, reject) => {
            try {
                Module["instantiateWasm"](info, (mod, inst) => {
                    receiveInstance(mod, inst);
                    resolve(mod.exports)
                }
                )
            } catch (e) {
                err(`Module.instantiateWasm callback failed with error: ${e}`);
                reject(e)
            }
        }
        )
    }
    if (ENVIRONMENT_IS_PTHREAD) {
        return new Promise(resolve => {
            wasmModuleReceived = module => {
                var instance = new WebAssembly.Instance(module,getWasmImports());
                resolve(receiveInstance(instance, module))
            }
        }
        )
    }
    wasmBinaryFile ??= findWasmBinary();
    dbg("asynchronously preparing wasm");
    var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
    var exports = receiveInstantiationResult(result);
    return exports
}
class ExitStatus {
    name = "ExitStatus";
    constructor(status) {
        this.message = `Program terminated with exit(${status})`;
        this.status = status
    }
}
var terminateWorker = worker => {
    worker.terminate();
    worker.onmessage = e => {
        var cmd = e["data"].cmd;
        err(`received "${cmd}" command from terminated worker: ${worker.workerID}`)
    }
}
;
var cleanupThread = pthread_ptr => {
    assert(!ENVIRONMENT_IS_PTHREAD, "Internal Error! cleanupThread() can only ever be called from main application thread!");
    assert(pthread_ptr, "Internal Error! Null pthread_ptr in cleanupThread!");
    var worker = PThread.pthreads[pthread_ptr];
    assert(worker);
    PThread.returnWorkerToPool(worker)
}
;
var callRuntimeCallbacks = callbacks => {
    while (callbacks.length > 0) {
        callbacks.shift()(Module)
    }
}
;
var onPreRuns = [];
var addOnPreRun = cb => onPreRuns.unshift(cb);
var spawnThread = threadParams => {
    assert(!ENVIRONMENT_IS_PTHREAD, "Internal Error! spawnThread() can only ever be called from main application thread!");
    assert(threadParams.pthread_ptr, "Internal error, no pthread ptr!");
    var worker = PThread.getNewWorker();
    if (!worker) {
        return 6
    }
    assert(!worker.pthread_ptr, "Internal error!");
    PThread.runningWorkers.push(worker);
    PThread.pthreads[threadParams.pthread_ptr] = worker;
    worker.pthread_ptr = threadParams.pthread_ptr;
    var msg = {
        cmd: "run",
        start_routine: threadParams.startRoutine,
        arg: threadParams.arg,
        pthread_ptr: threadParams.pthread_ptr
    };
    worker.postMessage(msg, threadParams.transferList);
    return 0
}
;
var runtimeKeepaliveCounter = 0;
var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
var stackSave = () => _emscripten_stack_get_current();
var stackRestore = val => __emscripten_stack_restore(val);
var stackAlloc = sz => __emscripten_stack_alloc(sz);
var proxyToMainThread = (funcIndex, emAsmAddr, sync, ...callArgs) => {
    var serializedNumCallArgs = callArgs.length * 2;
    var sp = stackSave();
    var args = stackAlloc(serializedNumCallArgs * 8);
    var b = args >> 3;
    for (var i = 0; i < callArgs.length; i++) {
        var arg = callArgs[i];
        if (typeof arg == "bigint") {
            HEAP64[b + 2 * i] = 1n;
            HEAP64[b + 2 * i + 1] = arg
        } else {
            HEAP64[b + 2 * i] = 0n;
            GROWABLE_HEAP_F64()[b + 2 * i + 1] = arg
        }
    }
    var rtn = __emscripten_run_on_main_thread_js(funcIndex, emAsmAddr, serializedNumCallArgs, args, sync);
    stackRestore(sp);
    return rtn
}
;
function _proc_exit(code) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(0, 0, 1, code);
    dbg(`proc_exit: ${code}`);
    EXITSTATUS = code;
    if (!keepRuntimeAlive()) {
        PThread.terminateAllThreads();
        Module["onExit"]?.(code);
        ABORT = true
    }
    quit_(code, new ExitStatus(code))
}
function exitOnMainThread(returnCode) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(1, 0, 0, returnCode);
    _exit(returnCode)
}
var exitJS = (status, implicit) => {
    EXITSTATUS = status;
    checkUnflushedContent();
    if (ENVIRONMENT_IS_PTHREAD) {
        assert(!implicit);
        exitOnMainThread(status);
        throw "unwind"
    }
    if (keepRuntimeAlive() && !implicit) {
        var msg = `program exited (with status: ${status}), but keepRuntimeAlive() is set (counter=${runtimeKeepaliveCounter}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`;
        err(msg)
    }
    _proc_exit(status)
}
;
var _exit = exitJS;
var ptrToString = ptr => {
    assert(typeof ptr === "number");
    ptr >>>= 0;
    return "0x" + ptr.toString(16).padStart(8, "0")
}
;
var PThread = {
    unusedWorkers: [],
    runningWorkers: [],
    tlsInitFunctions: [],
    pthreads: {},
    nextWorkerID: 1,
    debugInit() {
        function pthreadLogPrefix() {
            var t = 0;
            if (runtimeInitialized && typeof _pthread_self != "undefined") {
                t = _pthread_self()
            }
            return `w:${workerID},t:${ptrToString(t)}: `
        }
        var origDbg = dbg;
        dbg = (...args) => origDbg(pthreadLogPrefix() + args.join(" "))
    },
    init() {
        PThread.debugInit();
        if (!ENVIRONMENT_IS_PTHREAD) {
            PThread.initMainThread()
        }
    },
    initMainThread() {
        var pthreadPoolSize = 64;
        while (pthreadPoolSize--) {
            PThread.allocateUnusedWorker()
        }
        addOnPreRun( () => {
            addRunDependency("loading-workers");
            PThread.loadWasmModuleToAllWorkers( () => removeRunDependency("loading-workers"))
        }
        )
    },
    terminateAllThreads: () => {
        assert(!ENVIRONMENT_IS_PTHREAD, "Internal Error! terminateAllThreads() can only ever be called from main application thread!");
        for (var worker of PThread.runningWorkers) {
            terminateWorker(worker)
        }
        for (var worker of PThread.unusedWorkers) {
            terminateWorker(worker)
        }
        PThread.unusedWorkers = [];
        PThread.runningWorkers = [];
        PThread.pthreads = {}
    }
    ,
    returnWorkerToPool: worker => {
        var pthread_ptr = worker.pthread_ptr;
        delete PThread.pthreads[pthread_ptr];
        PThread.unusedWorkers.push(worker);
        PThread.runningWorkers.splice(PThread.runningWorkers.indexOf(worker), 1);
        worker.pthread_ptr = 0;
        __emscripten_thread_free_data(pthread_ptr)
    }
    ,
    threadInitTLS() {
        PThread.tlsInitFunctions.forEach(f => f())
    },
    loadWasmModuleToWorker: worker => new Promise(onFinishedLoading => {
        worker.onmessage = e => {
            var d = e["data"];
            var cmd = d.cmd;
            if (d.targetThread && d.targetThread != _pthread_self()) {
                var targetWorker = PThread.pthreads[d.targetThread];
                if (targetWorker) {
                    targetWorker.postMessage(d, d.transferList)
                } else {
                    err(`Internal error! Worker sent a message "${cmd}" to target pthread ${d.targetThread}, but that thread no longer exists!`)
                }
                return
            }
            if (cmd === "checkMailbox") {
                checkMailbox()
            } else if (cmd === "spawnThread") {
                spawnThread(d)
            } else if (cmd === "cleanupThread") {
                cleanupThread(d.thread)
            } else if (cmd === "loaded") {
                worker.loaded = true;
                onFinishedLoading(worker)
            } else if (d.target === "setimmediate") {
                worker.postMessage(d)
            } else if (cmd === "callHandler") {
                Module[d.handler](...d.args)
            } else if (cmd) {
                err(`worker sent an unknown command ${cmd}`)
            }
        }
        ;
        worker.onerror = e => {
            var message = "worker sent an error!";
            if (worker.pthread_ptr) {
                message = `Pthread ${ptrToString(worker.pthread_ptr)} sent an error!`
            }
            err(`${message} ${e.filename}:${e.lineno}: ${e.message}`);
            throw e
        }
        ;
        assert(wasmMemory instanceof WebAssembly.Memory, "WebAssembly memory should have been loaded by now!");
        assert(wasmModule instanceof WebAssembly.Module, "WebAssembly Module should have been loaded by now!");
        var handlers = [];
        var knownHandlers = ["onExit", "onAbort", "print", "printErr"];
        for (var handler of knownHandlers) {
            if (Module.propertyIsEnumerable(handler)) {
                handlers.push(handler)
            }
        }
        worker.postMessage({
            cmd: "load",
            handlers,
            wasmMemory,
            wasmModule,
            workerID: worker.workerID
        })
    }
    ),
    loadWasmModuleToAllWorkers(onMaybeReady) {
        if (ENVIRONMENT_IS_PTHREAD) {
            return onMaybeReady()
        }
        let pthreadPoolReady = Promise.all(PThread.unusedWorkers.map(PThread.loadWasmModuleToWorker));
        pthreadPoolReady.then(onMaybeReady)
    },
    allocateUnusedWorker() {
        var worker;
        var pthreadMainJs = _scriptName;
        if (Module["mainScriptUrlOrBlob"]) {
            pthreadMainJs = Module["mainScriptUrlOrBlob"];
            if (typeof pthreadMainJs != "string") {
                pthreadMainJs = URL.createObjectURL(pthreadMainJs)
            }
        }
        worker = new Worker(pthreadMainJs,{
            name: "em-pthread-" + PThread.nextWorkerID
        });
        worker.workerID = PThread.nextWorkerID++;
        PThread.unusedWorkers.push(worker)
    },
    getNewWorker() {
        if (PThread.unusedWorkers.length == 0) {
            PThread.allocateUnusedWorker();
            PThread.loadWasmModuleToWorker(PThread.unusedWorkers[0])
        }
        return PThread.unusedWorkers.pop()
    }
};
var onPostRuns = [];
var addOnPostRun = cb => onPostRuns.unshift(cb);
var establishStackSpace = pthread_ptr => {
    updateMemoryViews();
    var stackHigh = GROWABLE_HEAP_U32()[pthread_ptr + 52 >> 2];
    var stackSize = GROWABLE_HEAP_U32()[pthread_ptr + 56 >> 2];
    var stackLow = stackHigh - stackSize;
    assert(stackHigh != 0);
    assert(stackLow != 0);
    assert(stackHigh > stackLow, "stackHigh must be higher then stackLow");
    _emscripten_stack_set_limits(stackHigh, stackLow);
    stackRestore(stackHigh);
    writeStackCookie()
}
;
var wasmTableMirror = [];
var wasmTable;
var getWasmTableEntry = funcPtr => {
    var func = wasmTableMirror[funcPtr];
    if (!func) {
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr)
    }
    assert(wasmTable.get(funcPtr) == func, "JavaScript-side Wasm function table mirror is out of date!");
    return func
}
;
var invokeEntryPoint = (ptr, arg) => {
    runtimeKeepaliveCounter = 0;
    noExitRuntime = 0;
    var result = getWasmTableEntry(ptr)(arg);
    checkStackCookie();
    function finish(result) {
        if (keepRuntimeAlive()) {
            EXITSTATUS = result
        } else {
            __emscripten_thread_exit(result)
        }
    }
    finish(result)
}
;
var noExitRuntime = Module["noExitRuntime"] || true;
var registerTLSInit = tlsInitFunc => PThread.tlsInitFunctions.push(tlsInitFunc);
function setValue(ptr, value, type="i8") {
    if (type.endsWith("*"))
        type = "*";
    switch (type) {
    case "i1":
        GROWABLE_HEAP_I8()[ptr] = value;
        break;
    case "i8":
        GROWABLE_HEAP_I8()[ptr] = value;
        break;
    case "i16":
        GROWABLE_HEAP_I16()[ptr >> 1] = value;
        break;
    case "i32":
        GROWABLE_HEAP_I32()[ptr >> 2] = value;
        break;
    case "i64":
        HEAP64[ptr >> 3] = BigInt(value);
        break;
    case "float":
        GROWABLE_HEAP_F32()[ptr >> 2] = value;
        break;
    case "double":
        GROWABLE_HEAP_F64()[ptr >> 3] = value;
        break;
    case "*":
        GROWABLE_HEAP_U32()[ptr >> 2] = value;
        break;
    default:
        abort(`invalid type for setValue: ${type}`)
    }
}
var warnOnce = text => {
    warnOnce.shown ||= {};
    if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        err(text)
    }
}
;
var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder : undefined;
var UTF8ArrayToString = (heapOrArray, idx=0, maxBytesToRead=NaN) => {
    var endIdx = idx + maxBytesToRead;
    var endPtr = idx;
    while (heapOrArray[endPtr] && !(endPtr >= endIdx))
        ++endPtr;
    if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.buffer instanceof ArrayBuffer ? heapOrArray.subarray(idx, endPtr) : heapOrArray.slice(idx, endPtr))
    }
    var str = "";
    while (idx < endPtr) {
        var u0 = heapOrArray[idx++];
        if (!(u0 & 128)) {
            str += String.fromCharCode(u0);
            continue
        }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 224) == 192) {
            str += String.fromCharCode((u0 & 31) << 6 | u1);
            continue
        }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 240) == 224) {
            u0 = (u0 & 15) << 12 | u1 << 6 | u2
        } else {
            if ((u0 & 248) != 240)
                warnOnce("Invalid UTF-8 leading byte " + ptrToString(u0) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!");
            u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63
        }
        if (u0 < 65536) {
            str += String.fromCharCode(u0)
        } else {
            var ch = u0 - 65536;
            str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023)
        }
    }
    return str
}
;
var UTF8ToString = (ptr, maxBytesToRead) => {
    assert(typeof ptr == "number", `UTF8ToString expects a number (got ${typeof ptr})`);
    return ptr ? UTF8ArrayToString(GROWABLE_HEAP_U8(), ptr, maxBytesToRead) : ""
}
;
var ___assert_fail = (condition, filename, line, func) => abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function"]);
var ___call_sighandler = (fp, sig) => getWasmTableEntry(fp)(sig);
var exceptionCaught = [];
var uncaughtExceptionCount = 0;
var ___cxa_begin_catch = ptr => {
    var info = new ExceptionInfo(ptr);
    if (!info.get_caught()) {
        info.set_caught(true);
        uncaughtExceptionCount--
    }
    info.set_rethrown(false);
    exceptionCaught.push(info);
    ___cxa_increment_exception_refcount(ptr);
    return ___cxa_get_exception_ptr(ptr)
}
;
var exceptionLast = 0;
var ___cxa_end_catch = () => {
    _setThrew(0, 0);
    assert(exceptionCaught.length > 0);
    var info = exceptionCaught.pop();
    ___cxa_decrement_exception_refcount(info.excPtr);
    exceptionLast = 0
}
;
class ExceptionInfo {
    constructor(excPtr) {
        this.excPtr = excPtr;
        this.ptr = excPtr - 24
    }
    set_type(type) {
        GROWABLE_HEAP_U32()[this.ptr + 4 >> 2] = type
    }
    get_type() {
        return GROWABLE_HEAP_U32()[this.ptr + 4 >> 2]
    }
    set_destructor(destructor) {
        GROWABLE_HEAP_U32()[this.ptr + 8 >> 2] = destructor
    }
    get_destructor() {
        return GROWABLE_HEAP_U32()[this.ptr + 8 >> 2]
    }
    set_caught(caught) {
        caught = caught ? 1 : 0;
        GROWABLE_HEAP_I8()[this.ptr + 12] = caught
    }
    get_caught() {
        return GROWABLE_HEAP_I8()[this.ptr + 12] != 0
    }
    set_rethrown(rethrown) {
        rethrown = rethrown ? 1 : 0;
        GROWABLE_HEAP_I8()[this.ptr + 13] = rethrown
    }
    get_rethrown() {
        return GROWABLE_HEAP_I8()[this.ptr + 13] != 0
    }
    init(type, destructor) {
        this.set_adjusted_ptr(0);
        this.set_type(type);
        this.set_destructor(destructor)
    }
    set_adjusted_ptr(adjustedPtr) {
        GROWABLE_HEAP_U32()[this.ptr + 16 >> 2] = adjustedPtr
    }
    get_adjusted_ptr() {
        return GROWABLE_HEAP_U32()[this.ptr + 16 >> 2]
    }
}
var setTempRet0 = val => __emscripten_tempret_set(val);
var findMatchingCatch = args => {
    var thrown = exceptionLast?.excPtr;
    if (!thrown) {
        setTempRet0(0);
        return 0
    }
    var info = new ExceptionInfo(thrown);
    info.set_adjusted_ptr(thrown);
    var thrownType = info.get_type();
    if (!thrownType) {
        setTempRet0(0);
        return thrown
    }
    for (var caughtType of args) {
        if (caughtType === 0 || caughtType === thrownType) {
            break
        }
        var adjusted_ptr_addr = info.ptr + 16;
        if (___cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
            setTempRet0(caughtType);
            return thrown
        }
    }
    setTempRet0(thrownType);
    return thrown
}
;
var ___cxa_find_matching_catch_2 = () => findMatchingCatch([]);
var ___cxa_find_matching_catch_3 = arg0 => findMatchingCatch([arg0]);
var ___cxa_find_matching_catch_4 = (arg0, arg1) => findMatchingCatch([arg0, arg1]);
var ___cxa_find_matching_catch_5 = (arg0, arg1, arg2) => findMatchingCatch([arg0, arg1, arg2]);
var ___cxa_find_matching_catch_6 = (arg0, arg1, arg2, arg3) => findMatchingCatch([arg0, arg1, arg2, arg3]);
var ___cxa_rethrow = () => {
    var info = exceptionCaught.pop();
    if (!info) {
        abort("no exception to throw")
    }
    var ptr = info.excPtr;
    if (!info.get_rethrown()) {
        exceptionCaught.push(info);
        info.set_rethrown(true);
        info.set_caught(false);
        uncaughtExceptionCount++
    }
    exceptionLast = new CppException(ptr);
    throw exceptionLast
}
;
var ___cxa_rethrow_primary_exception = ptr => {
    if (!ptr)
        return;
    var info = new ExceptionInfo(ptr);
    exceptionCaught.push(info);
    info.set_rethrown(true);
    ___cxa_rethrow()
}
;
var ___cxa_throw = (ptr, type, destructor) => {
    var info = new ExceptionInfo(ptr);
    info.init(type, destructor);
    exceptionLast = new CppException(ptr);
    uncaughtExceptionCount++;
    throw exceptionLast
}
;
var ___cxa_uncaught_exceptions = () => uncaughtExceptionCount;
function pthreadCreateProxied(pthread_ptr, attr, startRoutine, arg) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(2, 0, 1, pthread_ptr, attr, startRoutine, arg);
    return ___pthread_create_js(pthread_ptr, attr, startRoutine, arg)
}
var _emscripten_has_threading_support = () => typeof SharedArrayBuffer != "undefined";
var ___pthread_create_js = (pthread_ptr, attr, startRoutine, arg) => {
    if (!_emscripten_has_threading_support()) {
        dbg("pthread_create: environment does not support SharedArrayBuffer, pthreads are not available");
        return 6
    }
    var transferList = [];
    var error = 0;
    if (ENVIRONMENT_IS_PTHREAD && (transferList.length === 0 || error)) {
        return pthreadCreateProxied(pthread_ptr, attr, startRoutine, arg)
    }
    if (error)
        return error;
    var threadParams = {
        startRoutine,
        pthread_ptr,
        arg,
        transferList
    };
    if (ENVIRONMENT_IS_PTHREAD) {
        threadParams.cmd = "spawnThread";
        postMessage(threadParams, transferList);
        return 0
    }
    return spawnThread(threadParams)
}
;
var ___resumeException = ptr => {
    if (!exceptionLast) {
        exceptionLast = new CppException(ptr)
    }
    throw exceptionLast
}
;
var initRandomFill = () => view => view.set(crypto.getRandomValues(new Uint8Array(view.byteLength)));
var randomFill = view => {
    (randomFill = initRandomFill())(view)
}
;
var PATH = {
    isAbs: path => path.charAt(0) === "/",
    splitPath: filename => {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1)
    }
    ,
    normalizeArray: (parts, allowAboveRoot) => {
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
            var last = parts[i];
            if (last === ".") {
                parts.splice(i, 1)
            } else if (last === "..") {
                parts.splice(i, 1);
                up++
            } else if (up) {
                parts.splice(i, 1);
                up--
            }
        }
        if (allowAboveRoot) {
            for (; up; up--) {
                parts.unshift("..")
            }
        }
        return parts
    }
    ,
    normalize: path => {
        var isAbsolute = PATH.isAbs(path)
          , trailingSlash = path.slice(-1) === "/";
        path = PATH.normalizeArray(path.split("/").filter(p => !!p), !isAbsolute).join("/");
        if (!path && !isAbsolute) {
            path = "."
        }
        if (path && trailingSlash) {
            path += "/"
        }
        return (isAbsolute ? "/" : "") + path
    }
    ,
    dirname: path => {
        var result = PATH.splitPath(path)
          , root = result[0]
          , dir = result[1];
        if (!root && !dir) {
            return "."
        }
        if (dir) {
            dir = dir.slice(0, -1)
        }
        return root + dir
    }
    ,
    basename: path => path && path.match(/([^\/]+|\/)\/*$/)[1],
    join: (...paths) => PATH.normalize(paths.join("/")),
    join2: (l, r) => PATH.normalize(l + "/" + r)
};
var PATH_FS = {
    resolve: (...args) => {
        var resolvedPath = ""
          , resolvedAbsolute = false;
        for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            var path = i >= 0 ? args[i] : FS.cwd();
            if (typeof path != "string") {
                throw new TypeError("Arguments to path.resolve must be strings")
            } else if (!path) {
                return ""
            }
            resolvedPath = path + "/" + resolvedPath;
            resolvedAbsolute = PATH.isAbs(path)
        }
        resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(p => !!p), !resolvedAbsolute).join("/");
        return (resolvedAbsolute ? "/" : "") + resolvedPath || "."
    }
    ,
    relative: (from, to) => {
        from = PATH_FS.resolve(from).slice(1);
        to = PATH_FS.resolve(to).slice(1);
        function trim(arr) {
            var start = 0;
            for (; start < arr.length; start++) {
                if (arr[start] !== "")
                    break
            }
            var end = arr.length - 1;
            for (; end >= 0; end--) {
                if (arr[end] !== "")
                    break
            }
            if (start > end)
                return [];
            return arr.slice(start, end - start + 1)
        }
        var fromParts = trim(from.split("/"));
        var toParts = trim(to.split("/"));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
            if (fromParts[i] !== toParts[i]) {
                samePartsLength = i;
                break
            }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
            outputParts.push("..")
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join("/")
    }
};
var FS_stdin_getChar_buffer = [];
var lengthBytesUTF8 = str => {
    var len = 0;
    for (var i = 0; i < str.length; ++i) {
        var c = str.charCodeAt(i);
        if (c <= 127) {
            len++
        } else if (c <= 2047) {
            len += 2
        } else if (c >= 55296 && c <= 57343) {
            len += 4;
            ++i
        } else {
            len += 3
        }
    }
    return len
}
;
var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
    assert(typeof str === "string", `stringToUTF8Array expects a string (got ${typeof str})`);
    if (!(maxBytesToWrite > 0))
        return 0;
    var startIdx = outIdx;
    var endIdx = outIdx + maxBytesToWrite - 1;
    for (var i = 0; i < str.length; ++i) {
        var u = str.charCodeAt(i);
        if (u >= 55296 && u <= 57343) {
            var u1 = str.charCodeAt(++i);
            u = 65536 + ((u & 1023) << 10) | u1 & 1023
        }
        if (u <= 127) {
            if (outIdx >= endIdx)
                break;
            heap[outIdx++] = u
        } else if (u <= 2047) {
            if (outIdx + 1 >= endIdx)
                break;
            heap[outIdx++] = 192 | u >> 6;
            heap[outIdx++] = 128 | u & 63
        } else if (u <= 65535) {
            if (outIdx + 2 >= endIdx)
                break;
            heap[outIdx++] = 224 | u >> 12;
            heap[outIdx++] = 128 | u >> 6 & 63;
            heap[outIdx++] = 128 | u & 63
        } else {
            if (outIdx + 3 >= endIdx)
                break;
            if (u > 1114111)
                warnOnce("Invalid Unicode code point " + ptrToString(u) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
            heap[outIdx++] = 240 | u >> 18;
            heap[outIdx++] = 128 | u >> 12 & 63;
            heap[outIdx++] = 128 | u >> 6 & 63;
            heap[outIdx++] = 128 | u & 63
        }
    }
    heap[outIdx] = 0;
    return outIdx - startIdx
}
;
var intArrayFromString = (stringy, dontAddNull, length) => {
    var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
    var u8array = new Array(len);
    var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
    if (dontAddNull)
        u8array.length = numBytesWritten;
    return u8array
}
;
var FS_stdin_getChar = () => {
    if (!FS_stdin_getChar_buffer.length) {
        var result = null;
        if (typeof window != "undefined" && typeof window.prompt == "function") {
            result = window.prompt("Input: ");
            if (result !== null) {
                result += "\n"
            }
        } else {}
        if (!result) {
            return null
        }
        FS_stdin_getChar_buffer = intArrayFromString(result, true)
    }
    return FS_stdin_getChar_buffer.shift()
}
;
var TTY = {
    ttys: [],
    init() {},
    shutdown() {},
    register(dev, ops) {
        TTY.ttys[dev] = {
            input: [],
            output: [],
            ops
        };
        FS.registerDevice(dev, TTY.stream_ops)
    },
    stream_ops: {
        open(stream) {
            var tty = TTY.ttys[stream.node.rdev];
            if (!tty) {
                throw new FS.ErrnoError(43)
            }
            stream.tty = tty;
            stream.seekable = false
        },
        close(stream) {
            stream.tty.ops.fsync(stream.tty)
        },
        fsync(stream) {
            stream.tty.ops.fsync(stream.tty)
        },
        read(stream, buffer, offset, length, pos) {
            if (!stream.tty || !stream.tty.ops.get_char) {
                throw new FS.ErrnoError(60)
            }
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
                var result;
                try {
                    result = stream.tty.ops.get_char(stream.tty)
                } catch (e) {
                    throw new FS.ErrnoError(29)
                }
                if (result === undefined && bytesRead === 0) {
                    throw new FS.ErrnoError(6)
                }
                if (result === null || result === undefined)
                    break;
                bytesRead++;
                buffer[offset + i] = result
            }
            if (bytesRead) {
                stream.node.atime = Date.now()
            }
            return bytesRead
        },
        write(stream, buffer, offset, length, pos) {
            if (!stream.tty || !stream.tty.ops.put_char) {
                throw new FS.ErrnoError(60)
            }
            try {
                for (var i = 0; i < length; i++) {
                    stream.tty.ops.put_char(stream.tty, buffer[offset + i])
                }
            } catch (e) {
                throw new FS.ErrnoError(29)
            }
            if (length) {
                stream.node.mtime = stream.node.ctime = Date.now()
            }
            return i
        }
    },
    default_tty_ops: {
        get_char(tty) {
            return FS_stdin_getChar()
        },
        put_char(tty, val) {
            if (val === null || val === 10) {
                out(UTF8ArrayToString(tty.output));
                tty.output = []
            } else {
                if (val != 0)
                    tty.output.push(val)
            }
        },
        fsync(tty) {
            if (tty.output?.length > 0) {
                out(UTF8ArrayToString(tty.output));
                tty.output = []
            }
        },
        ioctl_tcgets(tty) {
            return {
                c_iflag: 25856,
                c_oflag: 5,
                c_cflag: 191,
                c_lflag: 35387,
                c_cc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        },
        ioctl_tcsets(tty, optional_actions, data) {
            return 0
        },
        ioctl_tiocgwinsz(tty) {
            return [24, 80]
        }
    },
    default_tty1_ops: {
        put_char(tty, val) {
            if (val === null || val === 10) {
                err(UTF8ArrayToString(tty.output));
                tty.output = []
            } else {
                if (val != 0)
                    tty.output.push(val)
            }
        },
        fsync(tty) {
            if (tty.output?.length > 0) {
                err(UTF8ArrayToString(tty.output));
                tty.output = []
            }
        }
    }
};
var zeroMemory = (ptr, size) => GROWABLE_HEAP_U8().fill(0, ptr, ptr + size);
var alignMemory = (size, alignment) => {
    assert(alignment, "alignment argument is required");
    return Math.ceil(size / alignment) * alignment
}
;
var mmapAlloc = size => {
    size = alignMemory(size, 65536);
    var ptr = _emscripten_builtin_memalign(65536, size);
    if (ptr)
        zeroMemory(ptr, size);
    return ptr
}
;
var MEMFS = {
    ops_table: null,
    mount(mount) {
        return MEMFS.createNode(null, "/", 16895, 0)
    },
    createNode(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
            throw new FS.ErrnoError(63)
        }
        MEMFS.ops_table ||= {
            dir: {
                node: {
                    getattr: MEMFS.node_ops.getattr,
                    setattr: MEMFS.node_ops.setattr,
                    lookup: MEMFS.node_ops.lookup,
                    mknod: MEMFS.node_ops.mknod,
                    rename: MEMFS.node_ops.rename,
                    unlink: MEMFS.node_ops.unlink,
                    rmdir: MEMFS.node_ops.rmdir,
                    readdir: MEMFS.node_ops.readdir,
                    symlink: MEMFS.node_ops.symlink
                },
                stream: {
                    llseek: MEMFS.stream_ops.llseek
                }
            },
            file: {
                node: {
                    getattr: MEMFS.node_ops.getattr,
                    setattr: MEMFS.node_ops.setattr
                },
                stream: {
                    llseek: MEMFS.stream_ops.llseek,
                    read: MEMFS.stream_ops.read,
                    write: MEMFS.stream_ops.write,
                    mmap: MEMFS.stream_ops.mmap,
                    msync: MEMFS.stream_ops.msync
                }
            },
            link: {
                node: {
                    getattr: MEMFS.node_ops.getattr,
                    setattr: MEMFS.node_ops.setattr,
                    readlink: MEMFS.node_ops.readlink
                },
                stream: {}
            },
            chrdev: {
                node: {
                    getattr: MEMFS.node_ops.getattr,
                    setattr: MEMFS.node_ops.setattr
                },
                stream: FS.chrdev_stream_ops
            }
        };
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
            node.node_ops = MEMFS.ops_table.dir.node;
            node.stream_ops = MEMFS.ops_table.dir.stream;
            node.contents = {}
        } else if (FS.isFile(node.mode)) {
            node.node_ops = MEMFS.ops_table.file.node;
            node.stream_ops = MEMFS.ops_table.file.stream;
            node.usedBytes = 0;
            node.contents = null
        } else if (FS.isLink(node.mode)) {
            node.node_ops = MEMFS.ops_table.link.node;
            node.stream_ops = MEMFS.ops_table.link.stream
        } else if (FS.isChrdev(node.mode)) {
            node.node_ops = MEMFS.ops_table.chrdev.node;
            node.stream_ops = MEMFS.ops_table.chrdev.stream
        }
        node.atime = node.mtime = node.ctime = Date.now();
        if (parent) {
            parent.contents[name] = node;
            parent.atime = parent.mtime = parent.ctime = node.atime
        }
        return node
    },
    getFileDataAsTypedArray(node) {
        if (!node.contents)
            return new Uint8Array(0);
        if (node.contents.subarray)
            return node.contents.subarray(0, node.usedBytes);
        return new Uint8Array(node.contents)
    },
    expandFileStorage(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity)
            return;
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
        if (prevCapacity != 0)
            newCapacity = Math.max(newCapacity, 256);
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity);
        if (node.usedBytes > 0)
            node.contents.set(oldContents.subarray(0, node.usedBytes), 0)
    },
    resizeFileStorage(node, newSize) {
        if (node.usedBytes == newSize)
            return;
        if (newSize == 0) {
            node.contents = null;
            node.usedBytes = 0
        } else {
            var oldContents = node.contents;
            node.contents = new Uint8Array(newSize);
            if (oldContents) {
                node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)))
            }
            node.usedBytes = newSize
        }
    },
    node_ops: {
        getattr(node) {
            var attr = {};
            attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
            attr.ino = node.id;
            attr.mode = node.mode;
            attr.nlink = 1;
            attr.uid = 0;
            attr.gid = 0;
            attr.rdev = node.rdev;
            if (FS.isDir(node.mode)) {
                attr.size = 4096
            } else if (FS.isFile(node.mode)) {
                attr.size = node.usedBytes
            } else if (FS.isLink(node.mode)) {
                attr.size = node.link.length
            } else {
                attr.size = 0
            }
            attr.atime = new Date(node.atime);
            attr.mtime = new Date(node.mtime);
            attr.ctime = new Date(node.ctime);
            attr.blksize = 4096;
            attr.blocks = Math.ceil(attr.size / attr.blksize);
            return attr
        },
        setattr(node, attr) {
            for (const key of ["mode", "atime", "mtime", "ctime"]) {
                if (attr[key] != null) {
                    node[key] = attr[key]
                }
            }
            if (attr.size !== undefined) {
                MEMFS.resizeFileStorage(node, attr.size)
            }
        },
        lookup(parent, name) {
            throw new FS.ErrnoError(44)
        },
        mknod(parent, name, mode, dev) {
            return MEMFS.createNode(parent, name, mode, dev)
        },
        rename(old_node, new_dir, new_name) {
            var new_node;
            try {
                new_node = FS.lookupNode(new_dir, new_name)
            } catch (e) {}
            if (new_node) {
                if (FS.isDir(old_node.mode)) {
                    for (var i in new_node.contents) {
                        throw new FS.ErrnoError(55)
                    }
                }
                FS.hashRemoveNode(new_node)
            }
            delete old_node.parent.contents[old_node.name];
            new_dir.contents[new_name] = old_node;
            old_node.name = new_name;
            new_dir.ctime = new_dir.mtime = old_node.parent.ctime = old_node.parent.mtime = Date.now()
        },
        unlink(parent, name) {
            delete parent.contents[name];
            parent.ctime = parent.mtime = Date.now()
        },
        rmdir(parent, name) {
            var node = FS.lookupNode(parent, name);
            for (var i in node.contents) {
                throw new FS.ErrnoError(55)
            }
            delete parent.contents[name];
            parent.ctime = parent.mtime = Date.now()
        },
        readdir(node) {
            return [".", "..", ...Object.keys(node.contents)]
        },
        symlink(parent, newname, oldpath) {
            var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
            node.link = oldpath;
            return node
        },
        readlink(node) {
            if (!FS.isLink(node.mode)) {
                throw new FS.ErrnoError(28)
            }
            return node.link
        }
    },
    stream_ops: {
        read(stream, buffer, offset, length, position) {
            var contents = stream.node.contents;
            if (position >= stream.node.usedBytes)
                return 0;
            var size = Math.min(stream.node.usedBytes - position, length);
            assert(size >= 0);
            if (size > 8 && contents.subarray) {
                buffer.set(contents.subarray(position, position + size), offset)
            } else {
                for (var i = 0; i < size; i++)
                    buffer[offset + i] = contents[position + i]
            }
            return size
        },
        write(stream, buffer, offset, length, position, canOwn) {
            assert(!(buffer instanceof ArrayBuffer));
            if (buffer.buffer === GROWABLE_HEAP_I8().buffer) {
                canOwn = false
            }
            if (!length)
                return 0;
            var node = stream.node;
            node.mtime = node.ctime = Date.now();
            if (buffer.subarray && (!node.contents || node.contents.subarray)) {
                if (canOwn) {
                    assert(position === 0, "canOwn must imply no weird position inside the file");
                    node.contents = buffer.subarray(offset, offset + length);
                    node.usedBytes = length;
                    return length
                } else if (node.usedBytes === 0 && position === 0) {
                    node.contents = buffer.slice(offset, offset + length);
                    node.usedBytes = length;
                    return length
                } else if (position + length <= node.usedBytes) {
                    node.contents.set(buffer.subarray(offset, offset + length), position);
                    return length
                }
            }
            MEMFS.expandFileStorage(node, position + length);
            if (node.contents.subarray && buffer.subarray) {
                node.contents.set(buffer.subarray(offset, offset + length), position)
            } else {
                for (var i = 0; i < length; i++) {
                    node.contents[position + i] = buffer[offset + i]
                }
            }
            node.usedBytes = Math.max(node.usedBytes, position + length);
            return length
        },
        llseek(stream, offset, whence) {
            var position = offset;
            if (whence === 1) {
                position += stream.position
            } else if (whence === 2) {
                if (FS.isFile(stream.node.mode)) {
                    position += stream.node.usedBytes
                }
            }
            if (position < 0) {
                throw new FS.ErrnoError(28)
            }
            return position
        },
        mmap(stream, length, position, prot, flags) {
            if (!FS.isFile(stream.node.mode)) {
                throw new FS.ErrnoError(43)
            }
            var ptr;
            var allocated;
            var contents = stream.node.contents;
            if (!(flags & 2) && contents && contents.buffer === GROWABLE_HEAP_I8().buffer) {
                allocated = false;
                ptr = contents.byteOffset
            } else {
                allocated = true;
                ptr = mmapAlloc(length);
                if (!ptr) {
                    throw new FS.ErrnoError(48)
                }
                if (contents) {
                    if (position > 0 || position + length < contents.length) {
                        if (contents.subarray) {
                            contents = contents.subarray(position, position + length)
                        } else {
                            contents = Array.prototype.slice.call(contents, position, position + length)
                        }
                    }
                    GROWABLE_HEAP_I8().set(contents, ptr)
                }
            }
            return {
                ptr,
                allocated
            }
        },
        msync(stream, buffer, offset, length, mmapFlags) {
            MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
            return 0
        }
    }
};
var asyncLoad = async url => {
    var arrayBuffer = await readAsync(url);
    assert(arrayBuffer, `Loading data file "${url}" failed (no arrayBuffer).`);
    return new Uint8Array(arrayBuffer)
}
;
var FS_createDataFile = (parent, name, fileData, canRead, canWrite, canOwn) => {
    FS.createDataFile(parent, name, fileData, canRead, canWrite, canOwn)
}
;
var preloadPlugins = Module["preloadPlugins"] || [];
var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
    if (typeof Browser != "undefined")
        Browser.init();
    var handled = false;
    preloadPlugins.forEach(plugin => {
        if (handled)
            return;
        if (plugin["canHandle"](fullname)) {
            plugin["handle"](byteArray, fullname, finish, onerror);
            handled = true
        }
    }
    );
    return handled
}
;
var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
    var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
    var dep = getUniqueRunDependency(`cp ${fullname}`);
    function processData(byteArray) {
        function finish(byteArray) {
            preFinish?.();
            if (!dontCreateFile) {
                FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn)
            }
            onload?.();
            removeRunDependency(dep)
        }
        if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
            onerror?.();
            removeRunDependency(dep)
        }
        )) {
            return
        }
        finish(byteArray)
    }
    addRunDependency(dep);
    if (typeof url == "string") {
        asyncLoad(url).then(processData, onerror)
    } else {
        processData(url)
    }
}
;
var FS_modeStringToFlags = str => {
    var flagModes = {
        r: 0,
        "r+": 2,
        w: 512 | 64 | 1,
        "w+": 512 | 64 | 2,
        a: 1024 | 64 | 1,
        "a+": 1024 | 64 | 2
    };
    var flags = flagModes[str];
    if (typeof flags == "undefined") {
        throw new Error(`Unknown file open mode: ${str}`)
    }
    return flags
}
;
var FS_getMode = (canRead, canWrite) => {
    var mode = 0;
    if (canRead)
        mode |= 292 | 73;
    if (canWrite)
        mode |= 146;
    return mode
}
;
var strError = errno => UTF8ToString(_strerror(errno));
var ERRNO_CODES = {
    EPERM: 63,
    ENOENT: 44,
    ESRCH: 71,
    EINTR: 27,
    EIO: 29,
    ENXIO: 60,
    E2BIG: 1,
    ENOEXEC: 45,
    EBADF: 8,
    ECHILD: 12,
    EAGAIN: 6,
    EWOULDBLOCK: 6,
    ENOMEM: 48,
    EACCES: 2,
    EFAULT: 21,
    ENOTBLK: 105,
    EBUSY: 10,
    EEXIST: 20,
    EXDEV: 75,
    ENODEV: 43,
    ENOTDIR: 54,
    EISDIR: 31,
    EINVAL: 28,
    ENFILE: 41,
    EMFILE: 33,
    ENOTTY: 59,
    ETXTBSY: 74,
    EFBIG: 22,
    ENOSPC: 51,
    ESPIPE: 70,
    EROFS: 69,
    EMLINK: 34,
    EPIPE: 64,
    EDOM: 18,
    ERANGE: 68,
    ENOMSG: 49,
    EIDRM: 24,
    ECHRNG: 106,
    EL2NSYNC: 156,
    EL3HLT: 107,
    EL3RST: 108,
    ELNRNG: 109,
    EUNATCH: 110,
    ENOCSI: 111,
    EL2HLT: 112,
    EDEADLK: 16,
    ENOLCK: 46,
    EBADE: 113,
    EBADR: 114,
    EXFULL: 115,
    ENOANO: 104,
    EBADRQC: 103,
    EBADSLT: 102,
    EDEADLOCK: 16,
    EBFONT: 101,
    ENOSTR: 100,
    ENODATA: 116,
    ETIME: 117,
    ENOSR: 118,
    ENONET: 119,
    ENOPKG: 120,
    EREMOTE: 121,
    ENOLINK: 47,
    EADV: 122,
    ESRMNT: 123,
    ECOMM: 124,
    EPROTO: 65,
    EMULTIHOP: 36,
    EDOTDOT: 125,
    EBADMSG: 9,
    ENOTUNIQ: 126,
    EBADFD: 127,
    EREMCHG: 128,
    ELIBACC: 129,
    ELIBBAD: 130,
    ELIBSCN: 131,
    ELIBMAX: 132,
    ELIBEXEC: 133,
    ENOSYS: 52,
    ENOTEMPTY: 55,
    ENAMETOOLONG: 37,
    ELOOP: 32,
    EOPNOTSUPP: 138,
    EPFNOSUPPORT: 139,
    ECONNRESET: 15,
    ENOBUFS: 42,
    EAFNOSUPPORT: 5,
    EPROTOTYPE: 67,
    ENOTSOCK: 57,
    ENOPROTOOPT: 50,
    ESHUTDOWN: 140,
    ECONNREFUSED: 14,
    EADDRINUSE: 3,
    ECONNABORTED: 13,
    ENETUNREACH: 40,
    ENETDOWN: 38,
    ETIMEDOUT: 73,
    EHOSTDOWN: 142,
    EHOSTUNREACH: 23,
    EINPROGRESS: 26,
    EALREADY: 7,
    EDESTADDRREQ: 17,
    EMSGSIZE: 35,
    EPROTONOSUPPORT: 66,
    ESOCKTNOSUPPORT: 137,
    EADDRNOTAVAIL: 4,
    ENETRESET: 39,
    EISCONN: 30,
    ENOTCONN: 53,
    ETOOMANYREFS: 141,
    EUSERS: 136,
    EDQUOT: 19,
    ESTALE: 72,
    ENOTSUP: 138,
    ENOMEDIUM: 148,
    EILSEQ: 25,
    EOVERFLOW: 61,
    ECANCELED: 11,
    ENOTRECOVERABLE: 56,
    EOWNERDEAD: 62,
    ESTRPIPE: 135
};
var FS = {
    root: null,
    mounts: [],
    devices: {},
    streams: [],
    nextInode: 1,
    nameTable: null,
    currentPath: "/",
    initialized: false,
    ignorePermissions: true,
    filesystems: null,
    syncFSRequests: 0,
    readFiles: {},
    ErrnoError: class extends Error {
        name = "ErrnoError";
        constructor(errno) {
            super(runtimeInitialized ? strError(errno) : "");
            this.errno = errno;
            for (var key in ERRNO_CODES) {
                if (ERRNO_CODES[key] === errno) {
                    this.code = key;
                    break
                }
            }
        }
    }
    ,
    FSStream: class {
        shared = {};
        get object() {
            return this.node
        }
        set object(val) {
            this.node = val
        }
        get isRead() {
            return (this.flags & 2097155) !== 1
        }
        get isWrite() {
            return (this.flags & 2097155) !== 0
        }
        get isAppend() {
            return this.flags & 1024
        }
        get flags() {
            return this.shared.flags
        }
        set flags(val) {
            this.shared.flags = val
        }
        get position() {
            return this.shared.position
        }
        set position(val) {
            this.shared.position = val
        }
    }
    ,
    FSNode: class {
        node_ops = {};
        stream_ops = {};
        readMode = 292 | 73;
        writeMode = 146;
        mounted = null;
        constructor(parent, name, mode, rdev) {
            if (!parent) {
                parent = this
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.rdev = rdev;
            this.atime = this.mtime = this.ctime = Date.now()
        }
        get read() {
            return (this.mode & this.readMode) === this.readMode
        }
        set read(val) {
            val ? this.mode |= this.readMode : this.mode &= ~this.readMode
        }
        get write() {
            return (this.mode & this.writeMode) === this.writeMode
        }
        set write(val) {
            val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode
        }
        get isFolder() {
            return FS.isDir(this.mode)
        }
        get isDevice() {
            return FS.isChrdev(this.mode)
        }
    }
    ,
    lookupPath(path, opts={}) {
        if (!path) {
            throw new FS.ErrnoError(44)
        }
        opts.follow_mount ??= true;
        if (!PATH.isAbs(path)) {
            path = FS.cwd() + "/" + path
        }
        linkloop: for (var nlinks = 0; nlinks < 40; nlinks++) {
            var parts = path.split("/").filter(p => !!p);
            var current = FS.root;
            var current_path = "/";
            for (var i = 0; i < parts.length; i++) {
                var islast = i === parts.length - 1;
                if (islast && opts.parent) {
                    break
                }
                if (parts[i] === ".") {
                    continue
                }
                if (parts[i] === "..") {
                    current_path = PATH.dirname(current_path);
                    current = current.parent;
                    continue
                }
                current_path = PATH.join2(current_path, parts[i]);
                try {
                    current = FS.lookupNode(current, parts[i])
                } catch (e) {
                    if (e?.errno === 44 && islast && opts.noent_okay) {
                        return {
                            path: current_path
                        }
                    }
                    throw e
                }
                if (FS.isMountpoint(current) && (!islast || opts.follow_mount)) {
                    current = current.mounted.root
                }
                if (FS.isLink(current.mode) && (!islast || opts.follow)) {
                    if (!current.node_ops.readlink) {
                        throw new FS.ErrnoError(52)
                    }
                    var link = current.node_ops.readlink(current);
                    if (!PATH.isAbs(link)) {
                        link = PATH.dirname(current_path) + "/" + link
                    }
                    path = link + "/" + parts.slice(i + 1).join("/");
                    continue linkloop
                }
            }
            return {
                path: current_path,
                node: current
            }
        }
        throw new FS.ErrnoError(32)
    },
    getPath(node) {
        var path;
        while (true) {
            if (FS.isRoot(node)) {
                var mount = node.mount.mountpoint;
                if (!path)
                    return mount;
                return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path
            }
            path = path ? `${node.name}/${path}` : node.name;
            node = node.parent
        }
    },
    hashName(parentid, name) {
        var hash = 0;
        for (var i = 0; i < name.length; i++) {
            hash = (hash << 5) - hash + name.charCodeAt(i) | 0
        }
        return (parentid + hash >>> 0) % FS.nameTable.length
    },
    hashAddNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node
    },
    hashRemoveNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
            FS.nameTable[hash] = node.name_next
        } else {
            var current = FS.nameTable[hash];
            while (current) {
                if (current.name_next === node) {
                    current.name_next = node.name_next;
                    break
                }
                current = current.name_next
            }
        }
    },
    lookupNode(parent, name) {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
            throw new FS.ErrnoError(errCode)
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
            var nodeName = node.name;
            if (node.parent.id === parent.id && nodeName === name) {
                return node
            }
        }
        return FS.lookup(parent, name)
    },
    createNode(parent, name, mode, rdev) {
        assert(typeof parent == "object");
        var node = new FS.FSNode(parent,name,mode,rdev);
        FS.hashAddNode(node);
        return node
    },
    destroyNode(node) {
        FS.hashRemoveNode(node)
    },
    isRoot(node) {
        return node === node.parent
    },
    isMountpoint(node) {
        return !!node.mounted
    },
    isFile(mode) {
        return (mode & 61440) === 32768
    },
    isDir(mode) {
        return (mode & 61440) === 16384
    },
    isLink(mode) {
        return (mode & 61440) === 40960
    },
    isChrdev(mode) {
        return (mode & 61440) === 8192
    },
    isBlkdev(mode) {
        return (mode & 61440) === 24576
    },
    isFIFO(mode) {
        return (mode & 61440) === 4096
    },
    isSocket(mode) {
        return (mode & 49152) === 49152
    },
    flagsToPermissionString(flag) {
        var perms = ["r", "w", "rw"][flag & 3];
        if (flag & 512) {
            perms += "w"
        }
        return perms
    },
    nodePermissions(node, perms) {
        if (FS.ignorePermissions) {
            return 0
        }
        if (perms.includes("r") && !(node.mode & 292)) {
            return 2
        } else if (perms.includes("w") && !(node.mode & 146)) {
            return 2
        } else if (perms.includes("x") && !(node.mode & 73)) {
            return 2
        }
        return 0
    },
    mayLookup(dir) {
        if (!FS.isDir(dir.mode))
            return 54;
        var errCode = FS.nodePermissions(dir, "x");
        if (errCode)
            return errCode;
        if (!dir.node_ops.lookup)
            return 2;
        return 0
    },
    mayCreate(dir, name) {
        if (!FS.isDir(dir.mode)) {
            return 54
        }
        try {
            var node = FS.lookupNode(dir, name);
            return 20
        } catch (e) {}
        return FS.nodePermissions(dir, "wx")
    },
    mayDelete(dir, name, isdir) {
        var node;
        try {
            node = FS.lookupNode(dir, name)
        } catch (e) {
            return e.errno
        }
        var errCode = FS.nodePermissions(dir, "wx");
        if (errCode) {
            return errCode
        }
        if (isdir) {
            if (!FS.isDir(node.mode)) {
                return 54
            }
            if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
                return 10
            }
        } else {
            if (FS.isDir(node.mode)) {
                return 31
            }
        }
        return 0
    },
    mayOpen(node, flags) {
        if (!node) {
            return 44
        }
        if (FS.isLink(node.mode)) {
            return 32
        } else if (FS.isDir(node.mode)) {
            if (FS.flagsToPermissionString(flags) !== "r" || flags & (512 | 64)) {
                return 31
            }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags))
    },
    checkOpExists(op, err) {
        if (!op) {
            throw new FS.ErrnoError(err)
        }
        return op
    },
    MAX_OPEN_FDS: 4096,
    nextfd() {
        for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
            if (!FS.streams[fd]) {
                return fd
            }
        }
        throw new FS.ErrnoError(33)
    },
    getStreamChecked(fd) {
        var stream = FS.getStream(fd);
        if (!stream) {
            throw new FS.ErrnoError(8)
        }
        return stream
    },
    getStream: fd => FS.streams[fd],
    createStream(stream, fd=-1) {
        assert(fd >= -1);
        stream = Object.assign(new FS.FSStream, stream);
        if (fd == -1) {
            fd = FS.nextfd()
        }
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream
    },
    closeStream(fd) {
        FS.streams[fd] = null
    },
    dupStream(origStream, fd=-1) {
        var stream = FS.createStream(origStream, fd);
        stream.stream_ops?.dup?.(stream);
        return stream
    },
    doSetAttr(stream, node, attr) {
        var setattr = stream?.stream_ops.setattr;
        var arg = setattr ? stream : node;
        setattr ??= node.node_ops.setattr;
        FS.checkOpExists(setattr, 63);
        setattr(arg, attr)
    },
    chrdev_stream_ops: {
        open(stream) {
            var device = FS.getDevice(stream.node.rdev);
            stream.stream_ops = device.stream_ops;
            stream.stream_ops.open?.(stream)
        },
        llseek() {
            throw new FS.ErrnoError(70)
        }
    },
    major: dev => dev >> 8,
    minor: dev => dev & 255,
    makedev: (ma, mi) => ma << 8 | mi,
    registerDevice(dev, ops) {
        FS.devices[dev] = {
            stream_ops: ops
        }
    },
    getDevice: dev => FS.devices[dev],
    getMounts(mount) {
        var mounts = [];
        var check = [mount];
        while (check.length) {
            var m = check.pop();
            mounts.push(m);
            check.push(...m.mounts)
        }
        return mounts
    },
    syncfs(populate, callback) {
        if (typeof populate == "function") {
            callback = populate;
            populate = false
        }
        FS.syncFSRequests++;
        if (FS.syncFSRequests > 1) {
            err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`)
        }
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
        function doCallback(errCode) {
            assert(FS.syncFSRequests > 0);
            FS.syncFSRequests--;
            return callback(errCode)
        }
        function done(errCode) {
            if (errCode) {
                if (!done.errored) {
                    done.errored = true;
                    return doCallback(errCode)
                }
                return
            }
            if (++completed >= mounts.length) {
                doCallback(null)
            }
        }
        mounts.forEach(mount => {
            if (!mount.type.syncfs) {
                return done(null)
            }
            mount.type.syncfs(mount, populate, done)
        }
        )
    },
    mount(type, opts, mountpoint) {
        if (typeof type == "string") {
            throw type
        }
        var root = mountpoint === "/";
        var pseudo = !mountpoint;
        var node;
        if (root && FS.root) {
            throw new FS.ErrnoError(10)
        } else if (!root && !pseudo) {
            var lookup = FS.lookupPath(mountpoint, {
                follow_mount: false
            });
            mountpoint = lookup.path;
            node = lookup.node;
            if (FS.isMountpoint(node)) {
                throw new FS.ErrnoError(10)
            }
            if (!FS.isDir(node.mode)) {
                throw new FS.ErrnoError(54)
            }
        }
        var mount = {
            type,
            opts,
            mountpoint,
            mounts: []
        };
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
        if (root) {
            FS.root = mountRoot
        } else if (node) {
            node.mounted = mount;
            if (node.mount) {
                node.mount.mounts.push(mount)
            }
        }
        return mountRoot
    },
    unmount(mountpoint) {
        var lookup = FS.lookupPath(mountpoint, {
            follow_mount: false
        });
        if (!FS.isMountpoint(lookup.node)) {
            throw new FS.ErrnoError(28)
        }
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
        Object.keys(FS.nameTable).forEach(hash => {
            var current = FS.nameTable[hash];
            while (current) {
                var next = current.name_next;
                if (mounts.includes(current.mount)) {
                    FS.destroyNode(current)
                }
                current = next
            }
        }
        );
        node.mounted = null;
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1)
    },
    lookup(parent, name) {
        return parent.node_ops.lookup(parent, name)
    },
    mknod(path, mode, dev) {
        var lookup = FS.lookupPath(path, {
            parent: true
        });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name) {
            throw new FS.ErrnoError(28)
        }
        if (name === "." || name === "..") {
            throw new FS.ErrnoError(20)
        }
        var errCode = FS.mayCreate(parent, name);
        if (errCode) {
            throw new FS.ErrnoError(errCode)
        }
        if (!parent.node_ops.mknod) {
            throw new FS.ErrnoError(63)
        }
        return parent.node_ops.mknod(parent, name, mode, dev)
    },
    statfs(path) {
        return FS.statfsNode(FS.lookupPath(path, {
            follow: true
        }).node)
    },
    statfsStream(stream) {
        return FS.statfsNode(stream.node)
    },
    statfsNode(node) {
        var rtn = {
            bsize: 4096,
            frsize: 4096,
            blocks: 1e6,
            bfree: 5e5,
            bavail: 5e5,
            files: FS.nextInode,
            ffree: FS.nextInode - 1,
            fsid: 42,
            flags: 2,
            namelen: 255
        };
        if (node.node_ops.statfs) {
            Object.assign(rtn, node.node_ops.statfs(node.mount.opts.root))
        }
        return rtn
    },
    create(path, mode=438) {
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0)
    },
    mkdir(path, mode=511) {
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0)
    },
    mkdirTree(path, mode) {
        var dirs = path.split("/");
        var d = "";
        for (var dir of dirs) {
            if (!dir)
                continue;
            if (d || PATH.isAbs(path))
                d += "/";
            d += dir;
            try {
                FS.mkdir(d, mode)
            } catch (e) {
                if (e.errno != 20)
                    throw e
            }
        }
    },
    mkdev(path, mode, dev) {
        if (typeof dev == "undefined") {
            dev = mode;
            mode = 438
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev)
    },
    symlink(oldpath, newpath) {
        if (!PATH_FS.resolve(oldpath)) {
            throw new FS.ErrnoError(44)
        }
        var lookup = FS.lookupPath(newpath, {
            parent: true
        });
        var parent = lookup.node;
        if (!parent) {
            throw new FS.ErrnoError(44)
        }
        var newname = PATH.basename(newpath);
        var errCode = FS.mayCreate(parent, newname);
        if (errCode) {
            throw new FS.ErrnoError(errCode)
        }
        if (!parent.node_ops.symlink) {
            throw new FS.ErrnoError(63)
        }
        return parent.node_ops.symlink(parent, newname, oldpath)
    },
    rename(old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        var lookup, old_dir, new_dir;
        lookup = FS.lookupPath(old_path, {
            parent: true
        });
        old_dir = lookup.node;
        lookup = FS.lookupPath(new_path, {
            parent: true
        });
        new_dir = lookup.node;
        if (!old_dir || !new_dir)
            throw new FS.ErrnoError(44);
        if (old_dir.mount !== new_dir.mount) {
            throw new FS.ErrnoError(75)
        }
        var old_node = FS.lookupNode(old_dir, old_name);
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== ".") {
            throw new FS.ErrnoError(28)
        }
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== ".") {
            throw new FS.ErrnoError(55)
        }
        var new_node;
        try {
            new_node = FS.lookupNode(new_dir, new_name)
        } catch (e) {}
        if (old_node === new_node) {
            return
        }
        var isdir = FS.isDir(old_node.mode);
        var errCode = FS.mayDelete(old_dir, old_name, isdir);
        if (errCode) {
            throw new FS.ErrnoError(errCode)
        }
        errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
        if (errCode) {
            throw new FS.ErrnoError(errCode)
        }
        if (!old_dir.node_ops.rename) {
            throw new FS.ErrnoError(63)
        }
        if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
            throw new FS.ErrnoError(10)
        }
        if (new_dir !== old_dir) {
            errCode = FS.nodePermissions(old_dir, "w");
            if (errCode) {
                throw new FS.ErrnoError(errCode)
            }
        }
        FS.hashRemoveNode(old_node);
        try {
            old_dir.node_ops.rename(old_node, new_dir, new_name);
            old_node.parent = new_dir
        } catch (e) {
            throw e
        } finally {
            FS.hashAddNode(old_node)
        }
    },
    rmdir(path) {
        var lookup = FS.lookupPath(path, {
            parent: true
        });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, true);
        if (errCode) {
            throw new FS.ErrnoError(errCode)
        }
        if (!parent.node_ops.rmdir) {
            throw new FS.ErrnoError(63)
        }
        if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10)
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node)
    },
    readdir(path) {
        var lookup = FS.lookupPath(path, {
            follow: true
        });
        var node = lookup.node;
        var readdir = FS.checkOpExists(node.node_ops.readdir, 54);
        return readdir(node)
    },
    unlink(path) {
        var lookup = FS.lookupPath(path, {
            parent: true
        });
        var parent = lookup.node;
        if (!parent) {
            throw new FS.ErrnoError(44)
        }
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, false);
        if (errCode) {
            throw new FS.ErrnoError(errCode)
        }
        if (!parent.node_ops.unlink) {
            throw new FS.ErrnoError(63)
        }
        if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10)
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node)
    },
    readlink(path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
            throw new FS.ErrnoError(44)
        }
        if (!link.node_ops.readlink) {
            throw new FS.ErrnoError(28)
        }
        return link.node_ops.readlink(link)
    },
    stat(path, dontFollow) {
        var lookup = FS.lookupPath(path, {
            follow: !dontFollow
        });
        var node = lookup.node;
        var getattr = FS.checkOpExists(node.node_ops.getattr, 63);
        return getattr(node)
    },
    fstat(fd) {
        var stream = FS.getStreamChecked(fd);
        var node = stream.node;
        var getattr = stream.stream_ops.getattr;
        var arg = getattr ? stream : node;
        getattr ??= node.node_ops.getattr;
        FS.checkOpExists(getattr, 63);
        return getattr(arg)
    },
    lstat(path) {
        return FS.stat(path, true)
    },
    doChmod(stream, node, mode, dontFollow) {
        FS.doSetAttr(stream, node, {
            mode: mode & 4095 | node.mode & ~4095,
            ctime: Date.now(),
            dontFollow
        })
    },
    chmod(path, mode, dontFollow) {
        var node;
        if (typeof path == "string") {
            var lookup = FS.lookupPath(path, {
                follow: !dontFollow
            });
            node = lookup.node
        } else {
            node = path
        }
        FS.doChmod(null, node, mode, dontFollow)
    },
    lchmod(path, mode) {
        FS.chmod(path, mode, true)
    },
    fchmod(fd, mode) {
        var stream = FS.getStreamChecked(fd);
        FS.doChmod(stream, stream.node, mode, false)
    },
    doChown(stream, node, dontFollow) {
        FS.doSetAttr(stream, node, {
            timestamp: Date.now(),
            dontFollow
        })
    },
    chown(path, uid, gid, dontFollow) {
        var node;
        if (typeof path == "string") {
            var lookup = FS.lookupPath(path, {
                follow: !dontFollow
            });
            node = lookup.node
        } else {
            node = path
        }
        FS.doChown(null, node, dontFollow)
    },
    lchown(path, uid, gid) {
        FS.chown(path, uid, gid, true)
    },
    fchown(fd, uid, gid) {
        var stream = FS.getStreamChecked(fd);
        FS.doChown(stream, stream.node, false)
    },
    doTruncate(stream, node, len) {
        if (FS.isDir(node.mode)) {
            throw new FS.ErrnoError(31)
        }
        if (!FS.isFile(node.mode)) {
            throw new FS.ErrnoError(28)
        }
        var errCode = FS.nodePermissions(node, "w");
        if (errCode) {
            throw new FS.ErrnoError(errCode)
        }
        FS.doSetAttr(stream, node, {
            size: len,
            timestamp: Date.now()
        })
    },
    truncate(path, len) {
        if (len < 0) {
            throw new FS.ErrnoError(28)
        }
        var node;
        if (typeof path == "string") {
            var lookup = FS.lookupPath(path, {
                follow: true
            });
            node = lookup.node
        } else {
            node = path
        }
        FS.doTruncate(null, node, len)
    },
    ftruncate(fd, len) {
        var stream = FS.getStreamChecked(fd);
        if (len < 0 || (stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(28)
        }
        FS.doTruncate(stream, stream.node, len)
    },
    utime(path, atime, mtime) {
        var lookup = FS.lookupPath(path, {
            follow: true
        });
        var node = lookup.node;
        var setattr = FS.checkOpExists(node.node_ops.setattr, 63);
        setattr(node, {
            atime,
            mtime
        })
    },
    open(path, flags, mode=438) {
        if (path === "") {
            throw new FS.ErrnoError(44)
        }
        flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
        if (flags & 64) {
            mode = mode & 4095 | 32768
        } else {
            mode = 0
        }
        var node;
        var isDirPath;
        if (typeof path == "object") {
            node = path
        } else {
            isDirPath = path.endsWith("/");
            var lookup = FS.lookupPath(path, {
                follow: !(flags & 131072),
                noent_okay: true
            });
            node = lookup.node;
            path = lookup.path
        }
        var created = false;
        if (flags & 64) {
            if (node) {
                if (flags & 128) {
                    throw new FS.ErrnoError(20)
                }
            } else if (isDirPath) {
                throw new FS.ErrnoError(31)
            } else {
                node = FS.mknod(path, mode | 511, 0);
                created = true
            }
        }
        if (!node) {
            throw new FS.ErrnoError(44)
        }
        if (FS.isChrdev(node.mode)) {
            flags &= ~512
        }
        if (flags & 65536 && !FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54)
        }
        if (!created) {
            var errCode = FS.mayOpen(node, flags);
            if (errCode) {
                throw new FS.ErrnoError(errCode)
            }
        }
        if (flags & 512 && !created) {
            FS.truncate(node, 0)
        }
        flags &= ~(128 | 512 | 131072);
        var stream = FS.createStream({
            node,
            path: FS.getPath(node),
            flags,
            seekable: true,
            position: 0,
            stream_ops: node.stream_ops,
            ungotten: [],
            error: false
        });
        if (stream.stream_ops.open) {
            stream.stream_ops.open(stream)
        }
        if (created) {
            FS.chmod(node, mode & 511)
        }
        if (Module["logReadFiles"] && !(flags & 1)) {
            if (!(path in FS.readFiles)) {
                FS.readFiles[path] = 1
            }
        }
        return stream
    },
    close(stream) {
        if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8)
        }
        if (stream.getdents)
            stream.getdents = null;
        try {
            if (stream.stream_ops.close) {
                stream.stream_ops.close(stream)
            }
        } catch (e) {
            throw e
        } finally {
            FS.closeStream(stream.fd)
        }
        stream.fd = null
    },
    isClosed(stream) {
        return stream.fd === null
    },
    llseek(stream, offset, whence) {
        if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8)
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
            throw new FS.ErrnoError(70)
        }
        if (whence != 0 && whence != 1 && whence != 2) {
            throw new FS.ErrnoError(28)
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position
    },
    read(stream, buffer, offset, length, position) {
        assert(offset >= 0);
        if (length < 0 || position < 0) {
            throw new FS.ErrnoError(28)
        }
        if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8)
        }
        if ((stream.flags & 2097155) === 1) {
            throw new FS.ErrnoError(8)
        }
        if (FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(31)
        }
        if (!stream.stream_ops.read) {
            throw new FS.ErrnoError(28)
        }
        var seeking = typeof position != "undefined";
        if (!seeking) {
            position = stream.position
        } else if (!stream.seekable) {
            throw new FS.ErrnoError(70)
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking)
            stream.position += bytesRead;
        return bytesRead
    },
    write(stream, buffer, offset, length, position, canOwn) {
        assert(offset >= 0);
        if (length < 0 || position < 0) {
            throw new FS.ErrnoError(28)
        }
        if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8)
        }
        if ((stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(8)
        }
        if (FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(31)
        }
        if (!stream.stream_ops.write) {
            throw new FS.ErrnoError(28)
        }
        if (stream.seekable && stream.flags & 1024) {
            FS.llseek(stream, 0, 2)
        }
        var seeking = typeof position != "undefined";
        if (!seeking) {
            position = stream.position
        } else if (!stream.seekable) {
            throw new FS.ErrnoError(70)
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking)
            stream.position += bytesWritten;
        return bytesWritten
    },
    mmap(stream, length, position, prot, flags) {
        if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
            throw new FS.ErrnoError(2)
        }
        if ((stream.flags & 2097155) === 1) {
            throw new FS.ErrnoError(2)
        }
        if (!stream.stream_ops.mmap) {
            throw new FS.ErrnoError(43)
        }
        if (!length) {
            throw new FS.ErrnoError(28)
        }
        return stream.stream_ops.mmap(stream, length, position, prot, flags)
    },
    msync(stream, buffer, offset, length, mmapFlags) {
        assert(offset >= 0);
        if (!stream.stream_ops.msync) {
            return 0
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags)
    },
    ioctl(stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
            throw new FS.ErrnoError(59)
        }
        return stream.stream_ops.ioctl(stream, cmd, arg)
    },
    readFile(path, opts={}) {
        opts.flags = opts.flags || 0;
        opts.encoding = opts.encoding || "binary";
        if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
            throw new Error(`Invalid encoding type "${opts.encoding}"`)
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === "utf8") {
            ret = UTF8ArrayToString(buf)
        } else if (opts.encoding === "binary") {
            ret = buf
        }
        FS.close(stream);
        return ret
    },
    writeFile(path, data, opts={}) {
        opts.flags = opts.flags || 577;
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data == "string") {
            var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
            var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
            FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn)
        } else if (ArrayBuffer.isView(data)) {
            FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn)
        } else {
            throw new Error("Unsupported data type")
        }
        FS.close(stream)
    },
    cwd: () => FS.currentPath,
    chdir(path) {
        var lookup = FS.lookupPath(path, {
            follow: true
        });
        if (lookup.node === null) {
            throw new FS.ErrnoError(44)
        }
        if (!FS.isDir(lookup.node.mode)) {
            throw new FS.ErrnoError(54)
        }
        var errCode = FS.nodePermissions(lookup.node, "x");
        if (errCode) {
            throw new FS.ErrnoError(errCode)
        }
        FS.currentPath = lookup.path
    },
    createDefaultDirectories() {
        FS.mkdir("/tmp");
        FS.mkdir("/home");
        FS.mkdir("/home/web_user")
    },
    createDefaultDevices() {
        FS.mkdir("/dev");
        FS.registerDevice(FS.makedev(1, 3), {
            read: () => 0,
            write: (stream, buffer, offset, length, pos) => length,
            llseek: () => 0
        });
        FS.mkdev("/dev/null", FS.makedev(1, 3));
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev("/dev/tty", FS.makedev(5, 0));
        FS.mkdev("/dev/tty1", FS.makedev(6, 0));
        var randomBuffer = new Uint8Array(1024)
          , randomLeft = 0;
        var randomByte = () => {
            if (randomLeft === 0) {
                randomFill(randomBuffer);
                randomLeft = randomBuffer.byteLength
            }
            return randomBuffer[--randomLeft]
        }
        ;
        FS.createDevice("/dev", "random", randomByte);
        FS.createDevice("/dev", "urandom", randomByte);
        FS.mkdir("/dev/shm");
        FS.mkdir("/dev/shm/tmp")
    },
    createSpecialDirectories() {
        FS.mkdir("/proc");
        var proc_self = FS.mkdir("/proc/self");
        FS.mkdir("/proc/self/fd");
        FS.mount({
            mount() {
                var node = FS.createNode(proc_self, "fd", 16895, 73);
                node.stream_ops = {
                    llseek: MEMFS.stream_ops.llseek
                };
                node.node_ops = {
                    lookup(parent, name) {
                        var fd = +name;
                        var stream = FS.getStreamChecked(fd);
                        var ret = {
                            parent: null,
                            mount: {
                                mountpoint: "fake"
                            },
                            node_ops: {
                                readlink: () => stream.path
                            },
                            id: fd + 1
                        };
                        ret.parent = ret;
                        return ret
                    },
                    readdir() {
                        return Array.from(FS.streams.entries()).filter( ([k,v]) => v).map( ([k,v]) => k.toString())
                    }
                };
                return node
            }
        }, {}, "/proc/self/fd")
    },
    createStandardStreams(input, output, error) {
        if (input) {
            FS.createDevice("/dev", "stdin", input)
        } else {
            FS.symlink("/dev/tty", "/dev/stdin")
        }
        if (output) {
            FS.createDevice("/dev", "stdout", null, output)
        } else {
            FS.symlink("/dev/tty", "/dev/stdout")
        }
        if (error) {
            FS.createDevice("/dev", "stderr", null, error)
        } else {
            FS.symlink("/dev/tty1", "/dev/stderr")
        }
        var stdin = FS.open("/dev/stdin", 0);
        var stdout = FS.open("/dev/stdout", 1);
        var stderr = FS.open("/dev/stderr", 1);
        assert(stdin.fd === 0, `invalid handle for stdin (${stdin.fd})`);
        assert(stdout.fd === 1, `invalid handle for stdout (${stdout.fd})`);
        assert(stderr.fd === 2, `invalid handle for stderr (${stderr.fd})`)
    },
    staticInit() {
        FS.nameTable = new Array(4096);
        FS.mount(MEMFS, {}, "/");
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
        FS.filesystems = {
            MEMFS
        }
    },
    init(input, output, error) {
        assert(!FS.initialized, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
        FS.initialized = true;
        input ??= Module["stdin"];
        output ??= Module["stdout"];
        error ??= Module["stderr"];
        FS.createStandardStreams(input, output, error)
    },
    quit() {
        FS.initialized = false;
        _fflush(0);
        for (var stream of FS.streams) {
            if (stream) {
                FS.close(stream)
            }
        }
    },
    findObject(path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (!ret.exists) {
            return null
        }
        return ret.object
    },
    analyzePath(path, dontResolveLastLink) {
        try {
            var lookup = FS.lookupPath(path, {
                follow: !dontResolveLastLink
            });
            path = lookup.path
        } catch (e) {}
        var ret = {
            isRoot: false,
            exists: false,
            error: 0,
            name: null,
            path: null,
            object: null,
            parentExists: false,
            parentPath: null,
            parentObject: null
        };
        try {
            var lookup = FS.lookupPath(path, {
                parent: true
            });
            ret.parentExists = true;
            ret.parentPath = lookup.path;
            ret.parentObject = lookup.node;
            ret.name = PATH.basename(path);
            lookup = FS.lookupPath(path, {
                follow: !dontResolveLastLink
            });
            ret.exists = true;
            ret.path = lookup.path;
            ret.object = lookup.node;
            ret.name = lookup.node.name;
            ret.isRoot = lookup.path === "/"
        } catch (e) {
            ret.error = e.errno
        }
        return ret
    },
    createPath(parent, path, canRead, canWrite) {
        parent = typeof parent == "string" ? parent : FS.getPath(parent);
        var parts = path.split("/").reverse();
        while (parts.length) {
            var part = parts.pop();
            if (!part)
                continue;
            var current = PATH.join2(parent, part);
            try {
                FS.mkdir(current)
            } catch (e) {
                if (e.errno != 20)
                    throw e
            }
            parent = current
        }
        return current
    },
    createFile(parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(canRead, canWrite);
        return FS.create(path, mode)
    },
    createDataFile(parent, name, data, canRead, canWrite, canOwn) {
        var path = name;
        if (parent) {
            parent = typeof parent == "string" ? parent : FS.getPath(parent);
            path = name ? PATH.join2(parent, name) : parent
        }
        var mode = FS_getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
            if (typeof data == "string") {
                var arr = new Array(data.length);
                for (var i = 0, len = data.length; i < len; ++i)
                    arr[i] = data.charCodeAt(i);
                data = arr
            }
            FS.chmod(node, mode | 146);
            var stream = FS.open(node, 577);
            FS.write(stream, data, 0, data.length, 0, canOwn);
            FS.close(stream);
            FS.chmod(node, mode)
        }
    },
    createDevice(parent, name, input, output) {
        var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(!!input, !!output);
        FS.createDevice.major ??= 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        FS.registerDevice(dev, {
            open(stream) {
                stream.seekable = false
            },
            close(stream) {
                if (output?.buffer?.length) {
                    output(10)
                }
            },
            read(stream, buffer, offset, length, pos) {
                var bytesRead = 0;
                for (var i = 0; i < length; i++) {
                    var result;
                    try {
                        result = input()
                    } catch (e) {
                        throw new FS.ErrnoError(29)
                    }
                    if (result === undefined && bytesRead === 0) {
                        throw new FS.ErrnoError(6)
                    }
                    if (result === null || result === undefined)
                        break;
                    bytesRead++;
                    buffer[offset + i] = result
                }
                if (bytesRead) {
                    stream.node.atime = Date.now()
                }
                return bytesRead
            },
            write(stream, buffer, offset, length, pos) {
                for (var i = 0; i < length; i++) {
                    try {
                        output(buffer[offset + i])
                    } catch (e) {
                        throw new FS.ErrnoError(29)
                    }
                }
                if (length) {
                    stream.node.mtime = stream.node.ctime = Date.now()
                }
                return i
            }
        });
        return FS.mkdev(path, mode, dev)
    },
    forceLoadFile(obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents)
            return true;
        if (typeof XMLHttpRequest != "undefined") {
            throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.")
        } else {
            try {
                obj.contents = readBinary(obj.url);
                obj.usedBytes = obj.contents.length
            } catch (e) {
                throw new FS.ErrnoError(29)
            }
        }
    },
    createLazyFile(parent, name, url, canRead, canWrite) {
        class LazyUint8Array {
            lengthKnown = false;
            chunks = [];
            get(idx) {
                if (idx > this.length - 1 || idx < 0) {
                    return undefined
                }
                var chunkOffset = idx % this.chunkSize;
                var chunkNum = idx / this.chunkSize | 0;
                return this.getter(chunkNum)[chunkOffset]
            }
            setDataGetter(getter) {
                this.getter = getter
            }
            cacheLength() {
                var xhr = new XMLHttpRequest;
                xhr.open("HEAD", url, false);
                xhr.send(null);
                if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304))
                    throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
                var datalength = Number(xhr.getResponseHeader("Content-length"));
                var header;
                var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
                var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
                var chunkSize = 1024 * 1024;
                if (!hasByteServing)
                    chunkSize = datalength;
                var doXHR = (from, to) => {
                    if (from > to)
                        throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
                    if (to > datalength - 1)
                        throw new Error("only " + datalength + " bytes available! programmer error!");
                    var xhr = new XMLHttpRequest;
                    xhr.open("GET", url, false);
                    if (datalength !== chunkSize)
                        xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
                    xhr.responseType = "arraybuffer";
                    if (xhr.overrideMimeType) {
                        xhr.overrideMimeType("text/plain; charset=x-user-defined")
                    }
                    xhr.send(null);
                    if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304))
                        throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
                    if (xhr.response !== undefined) {
                        return new Uint8Array(xhr.response || [])
                    }
                    return intArrayFromString(xhr.responseText || "", true)
                }
                ;
                var lazyArray = this;
                lazyArray.setDataGetter(chunkNum => {
                    var start = chunkNum * chunkSize;
                    var end = (chunkNum + 1) * chunkSize - 1;
                    end = Math.min(end, datalength - 1);
                    if (typeof lazyArray.chunks[chunkNum] == "undefined") {
                        lazyArray.chunks[chunkNum] = doXHR(start, end)
                    }
                    if (typeof lazyArray.chunks[chunkNum] == "undefined")
                        throw new Error("doXHR failed!");
                    return lazyArray.chunks[chunkNum]
                }
                );
                if (usesGzip || !datalength) {
                    chunkSize = datalength = 1;
                    datalength = this.getter(0).length;
                    chunkSize = datalength;
                    out("LazyFiles on gzip forces download of the whole file when length is accessed")
                }
                this._length = datalength;
                this._chunkSize = chunkSize;
                this.lengthKnown = true
            }
            get length() {
                if (!this.lengthKnown) {
                    this.cacheLength()
                }
                return this._length
            }
            get chunkSize() {
                if (!this.lengthKnown) {
                    this.cacheLength()
                }
                return this._chunkSize
            }
        }
        if (typeof XMLHttpRequest != "undefined") {
            if (!ENVIRONMENT_IS_WORKER)
                throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
            var lazyArray = new LazyUint8Array;
            var properties = {
                isDevice: false,
                contents: lazyArray
            }
        } else {
            var properties = {
                isDevice: false,
                url
            }
        }
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        if (properties.contents) {
            node.contents = properties.contents
        } else if (properties.url) {
            node.contents = null;
            node.url = properties.url
        }
        Object.defineProperties(node, {
            usedBytes: {
                get: function() {
                    return this.contents.length
                }
            }
        });
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(key => {
            var fn = node.stream_ops[key];
            stream_ops[key] = (...args) => {
                FS.forceLoadFile(node);
                return fn(...args)
            }
        }
        );
        function writeChunks(stream, buffer, offset, length, position) {
            var contents = stream.node.contents;
            if (position >= contents.length)
                return 0;
            var size = Math.min(contents.length - position, length);
            assert(size >= 0);
            if (contents.slice) {
                for (var i = 0; i < size; i++) {
                    buffer[offset + i] = contents[position + i]
                }
            } else {
                for (var i = 0; i < size; i++) {
                    buffer[offset + i] = contents.get(position + i)
                }
            }
            return size
        }
        stream_ops.read = (stream, buffer, offset, length, position) => {
            FS.forceLoadFile(node);
            return writeChunks(stream, buffer, offset, length, position)
        }
        ;
        stream_ops.mmap = (stream, length, position, prot, flags) => {
            FS.forceLoadFile(node);
            var ptr = mmapAlloc(length);
            if (!ptr) {
                throw new FS.ErrnoError(48)
            }
            writeChunks(stream, GROWABLE_HEAP_I8(), ptr, length, position);
            return {
                ptr,
                allocated: true
            }
        }
        ;
        node.stream_ops = stream_ops;
        return node
    },
    absolutePath() {
        abort("FS.absolutePath has been removed; use PATH_FS.resolve instead")
    },
    createFolder() {
        abort("FS.createFolder has been removed; use FS.mkdir instead")
    },
    createLink() {
        abort("FS.createLink has been removed; use FS.symlink instead")
    },
    joinPath() {
        abort("FS.joinPath has been removed; use PATH.join instead")
    },
    mmapAlloc() {
        abort("FS.mmapAlloc has been replaced by the top level function mmapAlloc")
    },
    standardizePath() {
        abort("FS.standardizePath has been removed; use PATH.normalize instead")
    }
};
var SOCKFS = {
    websocketArgs: {},
    callbacks: {},
    on(event, callback) {
        SOCKFS.callbacks[event] = callback
    },
    emit(event, param) {
        SOCKFS.callbacks[event]?.(param)
    },
    mount(mount) {
        SOCKFS.websocketArgs = Module["websocket"] || {};
        (Module["websocket"] ??= {})["on"] = SOCKFS.on;
        return FS.createNode(null, "/", 16895, 0)
    },
    createSocket(family, type, protocol) {
        type &= ~526336;
        var streaming = type == 1;
        if (streaming && protocol && protocol != 6) {
            throw new FS.ErrnoError(66)
        }
        var sock = {
            family,
            type,
            protocol,
            server: null,
            error: null,
            peers: {},
            pending: [],
            recv_queue: [],
            sock_ops: SOCKFS.websocket_sock_ops
        };
        var name = SOCKFS.nextname();
        var node = FS.createNode(SOCKFS.root, name, 49152, 0);
        node.sock = sock;
        var stream = FS.createStream({
            path: name,
            node,
            flags: 2,
            seekable: false,
            stream_ops: SOCKFS.stream_ops
        });
        sock.stream = stream;
        return sock
    },
    getSocket(fd) {
        var stream = FS.getStream(fd);
        if (!stream || !FS.isSocket(stream.node.mode)) {
            return null
        }
        return stream.node.sock
    },
    stream_ops: {
        poll(stream) {
            var sock = stream.node.sock;
            return sock.sock_ops.poll(sock)
        },
        ioctl(stream, request, varargs) {
            var sock = stream.node.sock;
            return sock.sock_ops.ioctl(sock, request, varargs)
        },
        read(stream, buffer, offset, length, position) {
            var sock = stream.node.sock;
            var msg = sock.sock_ops.recvmsg(sock, length);
            if (!msg) {
                return 0
            }
            buffer.set(msg.buffer, offset);
            return msg.buffer.length
        },
        write(stream, buffer, offset, length, position) {
            var sock = stream.node.sock;
            return sock.sock_ops.sendmsg(sock, buffer, offset, length)
        },
        close(stream) {
            var sock = stream.node.sock;
            sock.sock_ops.close(sock)
        }
    },
    nextname() {
        if (!SOCKFS.nextname.current) {
            SOCKFS.nextname.current = 0
        }
        return `socket[${SOCKFS.nextname.current++}]`
    },
    websocket_sock_ops: {
        createPeer(sock, addr, port) {
            var ws;
            if (typeof addr == "object") {
                ws = addr;
                addr = null;
                port = null
            }
            if (ws) {
                if (ws._socket) {
                    addr = ws._socket.remoteAddress;
                    port = ws._socket.remotePort
                } else {
                    var result = /ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);
                    if (!result) {
                        throw new Error("WebSocket URL must be in the format ws(s)://address:port")
                    }
                    addr = result[1];
                    port = parseInt(result[2], 10)
                }
            } else {
                try {
                    var url = "ws://".replace("#", "//");
                    var subProtocols = "binary";
                    var opts = undefined;
                    if (SOCKFS.websocketArgs["url"]) {
                        url = SOCKFS.websocketArgs["url"]
                    }
                    if (SOCKFS.websocketArgs["subprotocol"]) {
                        subProtocols = SOCKFS.websocketArgs["subprotocol"]
                    } else if (SOCKFS.websocketArgs["subprotocol"] === null) {
                        subProtocols = "null"
                    }
                    if (url === "ws://" || url === "wss://") {
                        var parts = addr.split("/");
                        url = url + parts[0] + ":" + port + "/" + parts.slice(1).join("/")
                    }
                    if (subProtocols !== "null") {
                        subProtocols = subProtocols.replace(/^ +| +$/g, "").split(/ *, */);
                        opts = subProtocols
                    }
                    var WebSocketConstructor;
                    {
                        WebSocketConstructor = WebSocket
                    }
                    ws = new WebSocketConstructor(url,opts);
                    ws.binaryType = "arraybuffer"
                } catch (e) {
                    throw new FS.ErrnoError(23)
                }
            }
            var peer = {
                addr,
                port,
                socket: ws,
                msg_send_queue: []
            };
            SOCKFS.websocket_sock_ops.addPeer(sock, peer);
            SOCKFS.websocket_sock_ops.handlePeerEvents(sock, peer);
            if (sock.type === 2 && typeof sock.sport != "undefined") {
                peer.msg_send_queue.push(new Uint8Array([255, 255, 255, 255, "p".charCodeAt(0), "o".charCodeAt(0), "r".charCodeAt(0), "t".charCodeAt(0), (sock.sport & 65280) >> 8, sock.sport & 255]))
            }
            return peer
        },
        getPeer(sock, addr, port) {
            return sock.peers[addr + ":" + port]
        },
        addPeer(sock, peer) {
            sock.peers[peer.addr + ":" + peer.port] = peer
        },
        removePeer(sock, peer) {
            delete sock.peers[peer.addr + ":" + peer.port]
        },
        handlePeerEvents(sock, peer) {
            var first = true;
            var handleOpen = function() {
                sock.connecting = false;
                SOCKFS.emit("open", sock.stream.fd);
                try {
                    var queued = peer.msg_send_queue.shift();
                    while (queued) {
                        peer.socket.send(queued);
                        queued = peer.msg_send_queue.shift()
                    }
                } catch (e) {
                    peer.socket.close()
                }
            };
            function handleMessage(data) {
                if (typeof data == "string") {
                    var encoder = new TextEncoder;
                    data = encoder.encode(data)
                } else {
                    assert(data.byteLength !== undefined);
                    if (data.byteLength == 0) {
                        return
                    }
                    data = new Uint8Array(data)
                }
                var wasfirst = first;
                first = false;
                if (wasfirst && data.length === 10 && data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] === 255 && data[4] === "p".charCodeAt(0) && data[5] === "o".charCodeAt(0) && data[6] === "r".charCodeAt(0) && data[7] === "t".charCodeAt(0)) {
                    var newport = data[8] << 8 | data[9];
                    SOCKFS.websocket_sock_ops.removePeer(sock, peer);
                    peer.port = newport;
                    SOCKFS.websocket_sock_ops.addPeer(sock, peer);
                    return
                }
                sock.recv_queue.push({
                    addr: peer.addr,
                    port: peer.port,
                    data
                });
                SOCKFS.emit("message", sock.stream.fd)
            }
            if (ENVIRONMENT_IS_NODE) {
                peer.socket.on("open", handleOpen);
                peer.socket.on("message", function(data, isBinary) {
                    if (!isBinary) {
                        return
                    }
                    handleMessage(new Uint8Array(data).buffer)
                });
                peer.socket.on("close", function() {
                    SOCKFS.emit("close", sock.stream.fd)
                });
                peer.socket.on("error", function(error) {
                    sock.error = 14;
                    SOCKFS.emit("error", [sock.stream.fd, sock.error, "ECONNREFUSED: Connection refused"])
                })
            } else {
                peer.socket.onopen = handleOpen;
                peer.socket.onclose = function() {
                    SOCKFS.emit("close", sock.stream.fd)
                }
                ;
                peer.socket.onmessage = function peer_socket_onmessage(event) {
                    handleMessage(event.data)
                }
                ;
                peer.socket.onerror = function(error) {
                    sock.error = 14;
                    SOCKFS.emit("error", [sock.stream.fd, sock.error, "ECONNREFUSED: Connection refused"])
                }
            }
        },
        poll(sock) {
            if (sock.type === 1 && sock.server) {
                return sock.pending.length ? 64 | 1 : 0
            }
            var mask = 0;
            var dest = sock.type === 1 ? SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport) : null;
            if (sock.recv_queue.length || !dest || dest && dest.socket.readyState === dest.socket.CLOSING || dest && dest.socket.readyState === dest.socket.CLOSED) {
                mask |= 64 | 1
            }
            if (!dest || dest && dest.socket.readyState === dest.socket.OPEN) {
                mask |= 4
            }
            if (dest && dest.socket.readyState === dest.socket.CLOSING || dest && dest.socket.readyState === dest.socket.CLOSED) {
                if (sock.connecting) {
                    mask |= 4
                } else {
                    mask |= 16
                }
            }
            return mask
        },
        ioctl(sock, request, arg) {
            switch (request) {
            case 21531:
                var bytes = 0;
                if (sock.recv_queue.length) {
                    bytes = sock.recv_queue[0].data.length
                }
                GROWABLE_HEAP_I32()[arg >> 2] = bytes;
                return 0;
            default:
                return 28
            }
        },
        close(sock) {
            if (sock.server) {
                try {
                    sock.server.close()
                } catch (e) {}
                sock.server = null
            }
            for (var peer of Object.values(sock.peers)) {
                try {
                    peer.socket.close()
                } catch (e) {}
                SOCKFS.websocket_sock_ops.removePeer(sock, peer)
            }
            return 0
        },
        bind(sock, addr, port) {
            if (typeof sock.saddr != "undefined" || typeof sock.sport != "undefined") {
                throw new FS.ErrnoError(28)
            }
            sock.saddr = addr;
            sock.sport = port;
            if (sock.type === 2) {
                if (sock.server) {
                    sock.server.close();
                    sock.server = null
                }
                try {
                    sock.sock_ops.listen(sock, 0)
                } catch (e) {
                    if (!(e.name === "ErrnoError"))
                        throw e;
                    if (e.errno !== 138)
                        throw e
                }
            }
        },
        connect(sock, addr, port) {
            if (sock.server) {
                throw new FS.ErrnoError(138)
            }
            if (typeof sock.daddr != "undefined" && typeof sock.dport != "undefined") {
                var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
                if (dest) {
                    if (dest.socket.readyState === dest.socket.CONNECTING) {
                        throw new FS.ErrnoError(7)
                    } else {
                        throw new FS.ErrnoError(30)
                    }
                }
            }
            var peer = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
            sock.daddr = peer.addr;
            sock.dport = peer.port;
            sock.connecting = true
        },
        listen(sock, backlog) {
            if (!ENVIRONMENT_IS_NODE) {
                throw new FS.ErrnoError(138)
            }
        },
        accept(listensock) {
            if (!listensock.server || !listensock.pending.length) {
                throw new FS.ErrnoError(28)
            }
            var newsock = listensock.pending.shift();
            newsock.stream.flags = listensock.stream.flags;
            return newsock
        },
        getname(sock, peer) {
            var addr, port;
            if (peer) {
                if (sock.daddr === undefined || sock.dport === undefined) {
                    throw new FS.ErrnoError(53)
                }
                addr = sock.daddr;
                port = sock.dport
            } else {
                addr = sock.saddr || 0;
                port = sock.sport || 0
            }
            return {
                addr,
                port
            }
        },
        sendmsg(sock, buffer, offset, length, addr, port) {
            if (sock.type === 2) {
                if (addr === undefined || port === undefined) {
                    addr = sock.daddr;
                    port = sock.dport
                }
                if (addr === undefined || port === undefined) {
                    throw new FS.ErrnoError(17)
                }
            } else {
                addr = sock.daddr;
                port = sock.dport
            }
            var dest = SOCKFS.websocket_sock_ops.getPeer(sock, addr, port);
            if (sock.type === 1) {
                if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                    throw new FS.ErrnoError(53)
                }
            }
            if (ArrayBuffer.isView(buffer)) {
                offset += buffer.byteOffset;
                buffer = buffer.buffer
            }
            var data = buffer.slice(offset, offset + length);
            if (data instanceof SharedArrayBuffer) {
                data = new Uint8Array(new Uint8Array(data)).buffer
            }
            if (!dest || dest.socket.readyState !== dest.socket.OPEN) {
                if (sock.type === 2) {
                    if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                        dest = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port)
                    }
                }
                dest.msg_send_queue.push(data);
                return length
            }
            try {
                dest.socket.send(data);
                return length
            } catch (e) {
                throw new FS.ErrnoError(28)
            }
        },
        recvmsg(sock, length) {
            if (sock.type === 1 && sock.server) {
                throw new FS.ErrnoError(53)
            }
            var queued = sock.recv_queue.shift();
            if (!queued) {
                if (sock.type === 1) {
                    var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
                    if (!dest) {
                        throw new FS.ErrnoError(53)
                    }
                    if (dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                        return null
                    }
                    throw new FS.ErrnoError(6)
                }
                throw new FS.ErrnoError(6)
            }
            var queuedLength = queued.data.byteLength || queued.data.length;
            var queuedOffset = queued.data.byteOffset || 0;
            var queuedBuffer = queued.data.buffer || queued.data;
            var bytesRead = Math.min(length, queuedLength);
            var res = {
                buffer: new Uint8Array(queuedBuffer,queuedOffset,bytesRead),
                addr: queued.addr,
                port: queued.port
            };
            if (sock.type === 1 && bytesRead < queuedLength) {
                var bytesRemaining = queuedLength - bytesRead;
                queued.data = new Uint8Array(queuedBuffer,queuedOffset + bytesRead,bytesRemaining);
                sock.recv_queue.unshift(queued)
            }
            return res
        }
    }
};
var getSocketFromFD = fd => {
    var socket = SOCKFS.getSocket(fd);
    if (!socket)
        throw new FS.ErrnoError(8);
    return socket
}
;
var inetNtop4 = addr => (addr & 255) + "." + (addr >> 8 & 255) + "." + (addr >> 16 & 255) + "." + (addr >> 24 & 255);
var inetNtop6 = ints => {
    var str = "";
    var word = 0;
    var longest = 0;
    var lastzero = 0;
    var zstart = 0;
    var len = 0;
    var i = 0;
    var parts = [ints[0] & 65535, ints[0] >> 16, ints[1] & 65535, ints[1] >> 16, ints[2] & 65535, ints[2] >> 16, ints[3] & 65535, ints[3] >> 16];
    var hasipv4 = true;
    var v4part = "";
    for (i = 0; i < 5; i++) {
        if (parts[i] !== 0) {
            hasipv4 = false;
            break
        }
    }
    if (hasipv4) {
        v4part = inetNtop4(parts[6] | parts[7] << 16);
        if (parts[5] === -1) {
            str = "::ffff:";
            str += v4part;
            return str
        }
        if (parts[5] === 0) {
            str = "::";
            if (v4part === "0.0.0.0")
                v4part = "";
            if (v4part === "0.0.0.1")
                v4part = "1";
            str += v4part;
            return str
        }
    }
    for (word = 0; word < 8; word++) {
        if (parts[word] === 0) {
            if (word - lastzero > 1) {
                len = 0
            }
            lastzero = word;
            len++
        }
        if (len > longest) {
            longest = len;
            zstart = word - longest + 1
        }
    }
    for (word = 0; word < 8; word++) {
        if (longest > 1) {
            if (parts[word] === 0 && word >= zstart && word < zstart + longest) {
                if (word === zstart) {
                    str += ":";
                    if (zstart === 0)
                        str += ":"
                }
                continue
            }
        }
        str += Number(_ntohs(parts[word] & 65535)).toString(16);
        str += word < 7 ? ":" : ""
    }
    return str
}
;
var readSockaddr = (sa, salen) => {
    var family = GROWABLE_HEAP_I16()[sa >> 1];
    var port = _ntohs(GROWABLE_HEAP_U16()[sa + 2 >> 1]);
    var addr;
    switch (family) {
    case 2:
        if (salen !== 16) {
            return {
                errno: 28
            }
        }
        addr = GROWABLE_HEAP_I32()[sa + 4 >> 2];
        addr = inetNtop4(addr);
        break;
    case 10:
        if (salen !== 28) {
            return {
                errno: 28
            }
        }
        addr = [GROWABLE_HEAP_I32()[sa + 8 >> 2], GROWABLE_HEAP_I32()[sa + 12 >> 2], GROWABLE_HEAP_I32()[sa + 16 >> 2], GROWABLE_HEAP_I32()[sa + 20 >> 2]];
        addr = inetNtop6(addr);
        break;
    default:
        return {
            errno: 5
        }
    }
    return {
        family,
        addr,
        port
    }
}
;
var inetPton4 = str => {
    var b = str.split(".");
    for (var i = 0; i < 4; i++) {
        var tmp = Number(b[i]);
        if (isNaN(tmp))
            return null;
        b[i] = tmp
    }
    return (b[0] | b[1] << 8 | b[2] << 16 | b[3] << 24) >>> 0
}
;
var inetPton6 = str => {
    var words;
    var w, offset, z;
    var valid6regx = /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i;
    var parts = [];
    if (!valid6regx.test(str)) {
        return null
    }
    if (str === "::") {
        return [0, 0, 0, 0, 0, 0, 0, 0]
    }
    if (str.startsWith("::")) {
        str = str.replace("::", "Z:")
    } else {
        str = str.replace("::", ":Z:")
    }
    if (str.indexOf(".") > 0) {
        str = str.replace(new RegExp("[.]","g"), ":");
        words = str.split(":");
        words[words.length - 4] = Number(words[words.length - 4]) + Number(words[words.length - 3]) * 256;
        words[words.length - 3] = Number(words[words.length - 2]) + Number(words[words.length - 1]) * 256;
        words = words.slice(0, words.length - 2)
    } else {
        words = str.split(":")
    }
    offset = 0;
    z = 0;
    for (w = 0; w < words.length; w++) {
        if (typeof words[w] == "string") {
            if (words[w] === "Z") {
                for (z = 0; z < 8 - words.length + 1; z++) {
                    parts[w + z] = 0
                }
                offset = z - 1
            } else {
                parts[w + offset] = _htons(parseInt(words[w], 16))
            }
        } else {
            parts[w + offset] = words[w]
        }
    }
    return [parts[1] << 16 | parts[0], parts[3] << 16 | parts[2], parts[5] << 16 | parts[4], parts[7] << 16 | parts[6]]
}
;
var DNS = {
    address_map: {
        id: 1,
        addrs: {},
        names: {}
    },
    lookup_name(name) {
        var res = inetPton4(name);
        if (res !== null) {
            return name
        }
        res = inetPton6(name);
        if (res !== null) {
            return name
        }
        var addr;
        if (DNS.address_map.addrs[name]) {
            addr = DNS.address_map.addrs[name]
        } else {
            var id = DNS.address_map.id++;
            assert(id < 65535, "exceeded max address mappings of 65535");
            addr = "172.29." + (id & 255) + "." + (id & 65280);
            DNS.address_map.names[addr] = name;
            DNS.address_map.addrs[name] = addr
        }
        return addr
    },
    lookup_addr(addr) {
        if (DNS.address_map.names[addr]) {
            return DNS.address_map.names[addr]
        }
        return null
    }
};
var getSocketAddress = (addrp, addrlen) => {
    var info = readSockaddr(addrp, addrlen);
    if (info.errno)
        throw new FS.ErrnoError(info.errno);
    info.addr = DNS.lookup_addr(info.addr) || info.addr;
    return info
}
;
function ___syscall_bind(fd, addr, addrlen, d1, d2, d3) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(3, 0, 1, fd, addr, addrlen, d1, d2, d3);
    try {
        var sock = getSocketFromFD(fd);
        var info = getSocketAddress(addr, addrlen);
        sock.sock_ops.bind(sock, info.addr, info.port);
        return 0
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return -e.errno
    }
}
var SYSCALLS = {
    DEFAULT_POLLMASK: 5,
    calculateAt(dirfd, path, allowEmpty) {
        if (PATH.isAbs(path)) {
            return path
        }
        var dir;
        if (dirfd === -100) {
            dir = FS.cwd()
        } else {
            var dirstream = SYSCALLS.getStreamFromFD(dirfd);
            dir = dirstream.path
        }
        if (path.length == 0) {
            if (!allowEmpty) {
                throw new FS.ErrnoError(44)
            }
            return dir
        }
        return dir + "/" + path
    },
    writeStat(buf, stat) {
        GROWABLE_HEAP_I32()[buf >> 2] = stat.dev;
        GROWABLE_HEAP_I32()[buf + 4 >> 2] = stat.mode;
        GROWABLE_HEAP_U32()[buf + 8 >> 2] = stat.nlink;
        GROWABLE_HEAP_I32()[buf + 12 >> 2] = stat.uid;
        GROWABLE_HEAP_I32()[buf + 16 >> 2] = stat.gid;
        GROWABLE_HEAP_I32()[buf + 20 >> 2] = stat.rdev;
        HEAP64[buf + 24 >> 3] = BigInt(stat.size);
        GROWABLE_HEAP_I32()[buf + 32 >> 2] = 4096;
        GROWABLE_HEAP_I32()[buf + 36 >> 2] = stat.blocks;
        var atime = stat.atime.getTime();
        var mtime = stat.mtime.getTime();
        var ctime = stat.ctime.getTime();
        HEAP64[buf + 40 >> 3] = BigInt(Math.floor(atime / 1e3));
        GROWABLE_HEAP_U32()[buf + 48 >> 2] = atime % 1e3 * 1e3 * 1e3;
        HEAP64[buf + 56 >> 3] = BigInt(Math.floor(mtime / 1e3));
        GROWABLE_HEAP_U32()[buf + 64 >> 2] = mtime % 1e3 * 1e3 * 1e3;
        HEAP64[buf + 72 >> 3] = BigInt(Math.floor(ctime / 1e3));
        GROWABLE_HEAP_U32()[buf + 80 >> 2] = ctime % 1e3 * 1e3 * 1e3;
        HEAP64[buf + 88 >> 3] = BigInt(stat.ino);
        return 0
    },
    writeStatFs(buf, stats) {
        GROWABLE_HEAP_I32()[buf + 4 >> 2] = stats.bsize;
        GROWABLE_HEAP_I32()[buf + 40 >> 2] = stats.bsize;
        GROWABLE_HEAP_I32()[buf + 8 >> 2] = stats.blocks;
        GROWABLE_HEAP_I32()[buf + 12 >> 2] = stats.bfree;
        GROWABLE_HEAP_I32()[buf + 16 >> 2] = stats.bavail;
        GROWABLE_HEAP_I32()[buf + 20 >> 2] = stats.files;
        GROWABLE_HEAP_I32()[buf + 24 >> 2] = stats.ffree;
        GROWABLE_HEAP_I32()[buf + 28 >> 2] = stats.fsid;
        GROWABLE_HEAP_I32()[buf + 44 >> 2] = stats.flags;
        GROWABLE_HEAP_I32()[buf + 36 >> 2] = stats.namelen
    },
    doMsync(addr, stream, len, flags, offset) {
        if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43)
        }
        if (flags & 2) {
            return 0
        }
        var buffer = GROWABLE_HEAP_U8().slice(addr, addr + len);
        FS.msync(stream, buffer, offset, len, flags)
    },
    getStreamFromFD(fd) {
        var stream = FS.getStreamChecked(fd);
        return stream
    },
    varargs: undefined,
    getStr(ptr) {
        var ret = UTF8ToString(ptr);
        return ret
    }
};
function ___syscall_dup3(fd, newfd, flags) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(4, 0, 1, fd, newfd, flags);
    try {
        var old = SYSCALLS.getStreamFromFD(fd);
        assert(!flags);
        if (old.fd === newfd)
            return -28;
        if (newfd < 0 || newfd >= FS.MAX_OPEN_FDS)
            return -8;
        var existing = FS.getStream(newfd);
        if (existing)
            FS.close(existing);
        return FS.dupStream(old, newfd).fd
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return -e.errno
    }
}
var syscallGetVarargI = () => {
    assert(SYSCALLS.varargs != undefined);
    var ret = GROWABLE_HEAP_I32()[+SYSCALLS.varargs >> 2];
    SYSCALLS.varargs += 4;
    return ret
}
;
var syscallGetVarargP = syscallGetVarargI;
function ___syscall_fcntl64(fd, cmd, varargs) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(5, 0, 1, fd, cmd, varargs);
    SYSCALLS.varargs = varargs;
    try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        switch (cmd) {
        case 0:
            {
                var arg = syscallGetVarargI();
                if (arg < 0) {
                    return -28
                }
                while (FS.streams[arg]) {
                    arg++
                }
                var newStream;
                newStream = FS.dupStream(stream, arg);
                return newStream.fd
            }
        case 1:
        case 2:
            return 0;
        case 3:
            return stream.flags;
        case 4:
            {
                var arg = syscallGetVarargI();
                stream.flags |= arg;
                return 0
            }
        case 12:
            {
                var arg = syscallGetVarargP();
                var offset = 0;
                GROWABLE_HEAP_I16()[arg + offset >> 1] = 2;
                return 0
            }
        case 13:
        case 14:
            return 0
        }
        return -28
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return -e.errno
    }
}
function ___syscall_fstat64(fd, buf) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(6, 0, 1, fd, buf);
    try {
        return SYSCALLS.writeStat(buf, FS.fstat(fd))
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return -e.errno
    }
}
var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
    assert(typeof maxBytesToWrite == "number", "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
    return stringToUTF8Array(str, GROWABLE_HEAP_U8(), outPtr, maxBytesToWrite)
}
;
function ___syscall_getcwd(buf, size) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(7, 0, 1, buf, size);
    try {
        if (size === 0)
            return -28;
        var cwd = FS.cwd();
        var cwdLengthInBytes = lengthBytesUTF8(cwd) + 1;
        if (size < cwdLengthInBytes)
            return -68;
        stringToUTF8(cwd, buf, size);
        return cwdLengthInBytes
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return -e.errno
    }
}
function ___syscall_getdents64(fd, dirp, count) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(8, 0, 1, fd, dirp, count);
    try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        stream.getdents ||= FS.readdir(stream.path);
        var struct_size = 280;
        var pos = 0;
        var off = FS.llseek(stream, 0, 1);
        var startIdx = Math.floor(off / struct_size);
        var endIdx = Math.min(stream.getdents.length, startIdx + Math.floor(count / struct_size));
        for (var idx = startIdx; idx < endIdx; idx++) {
            var id;
            var type;
            var name = stream.getdents[idx];
            if (name === ".") {
                id = stream.node.id;
                type = 4
            } else if (name === "..") {
                var lookup = FS.lookupPath(stream.path, {
                    parent: true
                });
                id = lookup.node.id;
                type = 4
            } else {
                var child;
                try {
                    child = FS.lookupNode(stream.node, name)
                } catch (e) {
                    if (e?.errno === 28) {
                        continue
                    }
                    throw e
                }
                id = child.id;
                type = FS.isChrdev(child.mode) ? 2 : FS.isDir(child.mode) ? 4 : FS.isLink(child.mode) ? 10 : 8
            }
            assert(id);
            HEAP64[dirp + pos >> 3] = BigInt(id);
            HEAP64[dirp + pos + 8 >> 3] = BigInt((idx + 1) * struct_size);
            GROWABLE_HEAP_I16()[dirp + pos + 16 >> 1] = 280;
            GROWABLE_HEAP_I8()[dirp + pos + 18] = type;
            stringToUTF8(name, dirp + pos + 19, 256);
            pos += struct_size
        }
        FS.llseek(stream, idx * struct_size, 0);
        return pos
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return -e.errno
    }
}
var writeSockaddr = (sa, family, addr, port, addrlen) => {
    switch (family) {
    case 2:
        addr = inetPton4(addr);
        zeroMemory(sa, 16);
        if (addrlen) {
            GROWABLE_HEAP_I32()[addrlen >> 2] = 16
        }
        GROWABLE_HEAP_I16()[sa >> 1] = family;
        GROWABLE_HEAP_I32()[sa + 4 >> 2] = addr;
        GROWABLE_HEAP_I16()[sa + 2 >> 1] = _htons(port);
        break;
    case 10:
        addr = inetPton6(addr);
        zeroMemory(sa, 28);
        if (addrlen) {
            GROWABLE_HEAP_I32()[addrlen >> 2] = 28
        }
        GROWABLE_HEAP_I32()[sa >> 2] = family;
        GROWABLE_HEAP_I32()[sa + 8 >> 2] = addr[0];
        GROWABLE_HEAP_I32()[sa + 12 >> 2] = addr[1];
        GROWABLE_HEAP_I32()[sa + 16 >> 2] = addr[2];
        GROWABLE_HEAP_I32()[sa + 20 >> 2] = addr[3];
        GROWABLE_HEAP_I16()[sa + 2 >> 1] = _htons(port);
        break;
    default:
        return 5
    }
    return 0
}
;
function ___syscall_getsockname(fd, addr, addrlen, d1, d2, d3) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(9, 0, 1, fd, addr, addrlen, d1, d2, d3);
    try {
        var sock = getSocketFromFD(fd);
        var errno = writeSockaddr(addr, sock.family, DNS.lookup_name(sock.saddr || "0.0.0.0"), sock.sport, addrlen);
        assert(!errno);
        return 0
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return -e.errno
    }
}
function ___syscall_getsockopt(fd, level, optname, optval, optlen, d1) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(10, 0, 1, fd, level, optname, optval, optlen, d1);
    try {
        var sock = getSocketFromFD(fd);
        if (level === 1) {
            if (optname === 4) {
                GROWABLE_HEAP_I32()[optval >> 2] = sock.error;
                GROWABLE_HEAP_I32()[optlen >> 2] = 4;
                sock.error = null;
                return 0
            }
        }
        return -50
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return -e.errno
    }
}
function ___syscall_ioctl(fd, op, varargs) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(11, 0, 1, fd, op, varargs);
    SYSCALLS.varargs = varargs;
    try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        switch (op) {
        case 21509:
            {
                if (!stream.tty)
                    return -59;
                return 0
            }
        case 21505:
            {
                if (!stream.tty)
                    return -59;
                if (stream.tty.ops.ioctl_tcgets) {
                    var termios = stream.tty.ops.ioctl_tcgets(stream);
                    var argp = syscallGetVarargP();
                    GROWABLE_HEAP_I32()[argp >> 2] = termios.c_iflag || 0;
                    GROWABLE_HEAP_I32()[argp + 4 >> 2] = termios.c_oflag || 0;
                    GROWABLE_HEAP_I32()[argp + 8 >> 2] = termios.c_cflag || 0;
                    GROWABLE_HEAP_I32()[argp + 12 >> 2] = termios.c_lflag || 0;
                    for (var i = 0; i < 32; i++) {
                        GROWABLE_HEAP_I8()[argp + i + 17] = termios.c_cc[i] || 0
                    }
                    return 0
                }
                return 0
            }
        case 21510:
        case 21511:
        case 21512:
            {
                if (!stream.tty)
                    return -59;
                return 0
            }
        case 21506:
        case 21507:
        case 21508:
            {
                if (!stream.tty)
                    return -59;
                if (stream.tty.ops.ioctl_tcsets) {
                    var argp = syscallGetVarargP();
                    var c_iflag = GROWABLE_HEAP_I32()[argp >> 2];
                    var c_oflag = GROWABLE_HEAP_I32()[argp + 4 >> 2];
                    var c_cflag = GROWABLE_HEAP_I32()[argp + 8 >> 2];
                    var c_lflag = GROWABLE_HEAP_I32()[argp + 12 >> 2];
                    var c_cc = [];
                    for (var i = 0; i < 32; i++) {
                        c_cc.push(GROWABLE_HEAP_I8()[argp + i + 17])
                    }
                    return stream.tty.ops.ioctl_tcsets(stream.tty, op, {
                        c_iflag,
                        c_oflag,
                        c_cflag,
                        c_lflag,
                        c_cc
                    })
                }
                return 0
            }
        case 21519:
            {
                if (!stream.tty)
                    return -59;
                var argp = syscallGetVarargP();
                GROWABLE_HEAP_I32()[argp >> 2] = 0;
                return 0
            }
        case 21520:
            {
                if (!stream.tty)
                    return -59;
                return -28
            }
        case 21531:
            {
                var argp = syscallGetVarargP();
                return FS.ioctl(stream, op, argp)
            }
        case 21523:
            {
                if (!stream.tty)
                    return -59;
                if (stream.tty.ops.ioctl_tiocgwinsz) {
                    var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
                    var argp = syscallGetVarargP();
                    GROWABLE_HEAP_I16()[argp >> 1] = winsize[0];
                    GROWABLE_HEAP_I16()[argp + 2 >> 1] = winsize[1]
                }
                return 0
            }
        case 21524:
            {
                if (!stream.tty)
                    return -59;
                return 0
            }
        case 21515:
            {
                if (!stream.tty)
                    return -59;
                return 0
            }
        default:
            return -28
        }
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return -e.errno
    }
}
function ___syscall_lstat64(path, buf) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(12, 0, 1, path, buf);
    try {
        path = SYSCALLS.getStr(path);
        return SYSCALLS.writeStat(buf, FS.lstat(path))
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return -e.errno
    }
}
function ___syscall_mkdirat(dirfd, path, mode) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(13, 0, 1, dirfd, path, mode);
    try {
        path = SYSCALLS.getStr(path);
        path = SYSCALLS.calculateAt(dirfd, path);
        FS.mkdir(path, mode, 0);
        return 0
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return -e.errno
    }
}
function ___syscall_newfstatat(dirfd, path, buf, flags) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(14, 0, 1, dirfd, path, buf, flags);
    try {
        path = SYSCALLS.getStr(path);
        var nofollow = flags & 256;
        var allowEmpty = flags & 4096;
        flags = flags & ~6400;
        assert(!flags, `unknown flags in __syscall_newfstatat: ${flags}`);
        path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
        return SYSCALLS.writeStat(buf, nofollow ? FS.lstat(path) : FS.stat(path))
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return -e.errno
    }
}
function ___syscall_openat(dirfd, path, flags, varargs) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(15, 0, 1, dirfd, path, flags, varargs);
    SYSCALLS.varargs = varargs;
    try {
        path = SYSCALLS.getStr(path);
        path = SYSCALLS.calculateAt(dirfd, path);
        var mode = varargs ? syscallGetVarargI() : 0;
        return FS.open(path, flags, mode).fd
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return -e.errno
    }
}
function ___syscall_readlinkat(dirfd, path, buf, bufsize) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(16, 0, 1, dirfd, path, buf, bufsize);
    try {
        path = SYSCALLS.getStr(path);
        path = SYSCALLS.calculateAt(dirfd, path);
        if (bufsize <= 0)
            return -28;
        var ret = FS.readlink(path);
        var len = Math.min(bufsize, lengthBytesUTF8(ret));
        var endChar = GROWABLE_HEAP_I8()[buf + len];
        stringToUTF8(ret, buf, bufsize + 1);
        GROWABLE_HEAP_I8()[buf + len] = endChar;
        return len
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return -e.errno
    }
}
function ___syscall_recvfrom(fd, buf, len, flags, addr, addrlen) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(17, 0, 1, fd, buf, len, flags, addr, addrlen);
    try {
        var sock = getSocketFromFD(fd);
        var msg = sock.sock_ops.recvmsg(sock, len);
        if (!msg)
            return 0;
        if (addr) {
            var errno = writeSockaddr(addr, sock.family, DNS.lookup_name(msg.addr), msg.port, addrlen);
            assert(!errno)
        }
        GROWABLE_HEAP_U8().set(msg.buffer, buf);
        return msg.buffer.byteLength
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return -e.errno
    }
}
function ___syscall_rmdir(path) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(18, 0, 1, path);
    try {
        path = SYSCALLS.getStr(path);
        FS.rmdir(path);
        return 0
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return -e.errno
    }
}
function ___syscall_sendto(fd, message, length, flags, addr, addr_len) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(19, 0, 1, fd, message, length, flags, addr, addr_len);
    try {
        var sock = getSocketFromFD(fd);
        if (!addr) {
            return FS.write(sock.stream, GROWABLE_HEAP_I8(), message, length)
        }
        var dest = getSocketAddress(addr, addr_len);
        return sock.sock_ops.sendmsg(sock, GROWABLE_HEAP_I8(), message, length, dest.addr, dest.port)
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return -e.errno
    }
}
function ___syscall_socket(domain, type, protocol) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(20, 0, 1, domain, type, protocol);
    try {
        var sock = SOCKFS.createSocket(domain, type, protocol);
        assert(sock.stream.fd < 64);
        return sock.stream.fd
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return -e.errno
    }
}
function ___syscall_stat64(path, buf) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(21, 0, 1, path, buf);
    try {
        path = SYSCALLS.getStr(path);
        return SYSCALLS.writeStat(buf, FS.stat(path))
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return -e.errno
    }
}
function ___syscall_statfs64(path, size, buf) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(22, 0, 1, path, size, buf);
    try {
        assert(size === 64);
        SYSCALLS.writeStatFs(buf, FS.statfs(SYSCALLS.getStr(path)));
        return 0
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return -e.errno
    }
}
function ___syscall_unlinkat(dirfd, path, flags) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(23, 0, 1, dirfd, path, flags);
    try {
        path = SYSCALLS.getStr(path);
        path = SYSCALLS.calculateAt(dirfd, path);
        if (flags === 0) {
            FS.unlink(path)
        } else if (flags === 512) {
            FS.rmdir(path)
        } else {
            abort("Invalid flags passed to unlinkat")
        }
        return 0
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return -e.errno
    }
}
var __abort_js = () => abort("native code called abort()");
var embindRepr = v => {
    if (v === null) {
        return "null"
    }
    var t = typeof v;
    if (t === "object" || t === "array" || t === "function") {
        return v.toString()
    } else {
        return "" + v
    }
}
;
var embind_init_charCodes = () => {
    var codes = new Array(256);
    for (var i = 0; i < 256; ++i) {
        codes[i] = String.fromCharCode(i)
    }
    embind_charCodes = codes
}
;
var embind_charCodes;
var readLatin1String = ptr => {
    var ret = "";
    var c = ptr;
    while (GROWABLE_HEAP_U8()[c]) {
        ret += embind_charCodes[GROWABLE_HEAP_U8()[c++]]
    }
    return ret
}
;
var awaitingDependencies = {};
var registeredTypes = {};
var typeDependencies = {};
var BindingError = Module["BindingError"] = class BindingError extends Error {
    constructor(message) {
        super(message);
        this.name = "BindingError"
    }
}
;
var throwBindingError = message => {
    throw new BindingError(message)
}
;
function sharedRegisterType(rawType, registeredInstance, options={}) {
    var name = registeredInstance.name;
    if (!rawType) {
        throwBindingError(`type "${name}" must have a positive integer typeid pointer`)
    }
    if (registeredTypes.hasOwnProperty(rawType)) {
        if (options.ignoreDuplicateRegistrations) {
            return
        } else {
            throwBindingError(`Cannot register type '${name}' twice`)
        }
    }
    registeredTypes[rawType] = registeredInstance;
    delete typeDependencies[rawType];
    if (awaitingDependencies.hasOwnProperty(rawType)) {
        var callbacks = awaitingDependencies[rawType];
        delete awaitingDependencies[rawType];
        callbacks.forEach(cb => cb())
    }
}
function registerType(rawType, registeredInstance, options={}) {
    if (registeredInstance.argPackAdvance === undefined) {
        throw new TypeError("registerType registeredInstance requires argPackAdvance")
    }
    return sharedRegisterType(rawType, registeredInstance, options)
}
var integerReadValueFromPointer = (name, width, signed) => {
    switch (width) {
    case 1:
        return signed ? pointer => GROWABLE_HEAP_I8()[pointer] : pointer => GROWABLE_HEAP_U8()[pointer];
    case 2:
        return signed ? pointer => GROWABLE_HEAP_I16()[pointer >> 1] : pointer => GROWABLE_HEAP_U16()[pointer >> 1];
    case 4:
        return signed ? pointer => GROWABLE_HEAP_I32()[pointer >> 2] : pointer => GROWABLE_HEAP_U32()[pointer >> 2];
    case 8:
        return signed ? pointer => HEAP64[pointer >> 3] : pointer => HEAPU64[pointer >> 3];
    default:
        throw new TypeError(`invalid integer width (${width}): ${name}`)
    }
}
;
var __embind_register_bigint = (primitiveType, name, size, minRange, maxRange) => {
    name = readLatin1String(name);
    var isUnsignedType = name.indexOf("u") != -1;
    if (isUnsignedType) {
        maxRange = (1n << 64n) - 1n
    }
    registerType(primitiveType, {
        name,
        fromWireType: value => value,
        toWireType: function(destructors, value) {
            if (typeof value != "bigint" && typeof value != "number") {
                throw new TypeError(`Cannot convert "${embindRepr(value)}" to ${this.name}`)
            }
            if (typeof value == "number") {
                value = BigInt(value)
            }
            if (value < minRange || value > maxRange) {
                throw new TypeError(`Passing a number "${embindRepr(value)}" from JS side to C/C++ side to an argument of type "${name}", which is outside the valid range [${minRange}, ${maxRange}]!`)
            }
            return value
        },
        argPackAdvance: GenericWireTypeSize,
        readValueFromPointer: integerReadValueFromPointer(name, size, !isUnsignedType),
        destructorFunction: null
    })
}
;
var GenericWireTypeSize = 8;
var __embind_register_bool = (rawType, name, trueValue, falseValue) => {
    name = readLatin1String(name);
    registerType(rawType, {
        name,
        fromWireType: function(wt) {
            return !!wt
        },
        toWireType: function(destructors, o) {
            return o ? trueValue : falseValue
        },
        argPackAdvance: GenericWireTypeSize,
        readValueFromPointer: function(pointer) {
            return this["fromWireType"](GROWABLE_HEAP_U8()[pointer])
        },
        destructorFunction: null
    })
}
;
var emval_freelist = [];
var emval_handles = [];
var __emval_decref = handle => {
    if (handle > 9 && 0 === --emval_handles[handle + 1]) {
        assert(emval_handles[handle] !== undefined, `Decref for unallocated handle.`);
        emval_handles[handle] = undefined;
        emval_freelist.push(handle)
    }
}
;
var count_emval_handles = () => emval_handles.length / 2 - 5 - emval_freelist.length;
var init_emval = () => {
    emval_handles.push(0, 1, undefined, 1, null, 1, true, 1, false, 1);
    assert(emval_handles.length === 5 * 2);
    Module["count_emval_handles"] = count_emval_handles
}
;
var Emval = {
    toValue: handle => {
        if (!handle) {
            throwBindingError(`Cannot use deleted val. handle = ${handle}`)
        }
        assert(handle === 2 || emval_handles[handle] !== undefined && handle % 2 === 0, `invalid handle: ${handle}`);
        return emval_handles[handle]
    }
    ,
    toHandle: value => {
        switch (value) {
        case undefined:
            return 2;
        case null:
            return 4;
        case true:
            return 6;
        case false:
            return 8;
        default:
            {
                const handle = emval_freelist.pop() || emval_handles.length;
                emval_handles[handle] = value;
                emval_handles[handle + 1] = 1;
                return handle
            }
        }
    }
};
function readPointer(pointer) {
    return this["fromWireType"](GROWABLE_HEAP_U32()[pointer >> 2])
}
var EmValType = {
    name: "emscripten::val",
    fromWireType: handle => {
        var rv = Emval.toValue(handle);
        __emval_decref(handle);
        return rv
    }
    ,
    toWireType: (destructors, value) => Emval.toHandle(value),
    argPackAdvance: GenericWireTypeSize,
    readValueFromPointer: readPointer,
    destructorFunction: null
};
var __embind_register_emval = rawType => registerType(rawType, EmValType);
var floatReadValueFromPointer = (name, width) => {
    switch (width) {
    case 4:
        return function(pointer) {
            return this["fromWireType"](GROWABLE_HEAP_F32()[pointer >> 2])
        }
        ;
    case 8:
        return function(pointer) {
            return this["fromWireType"](GROWABLE_HEAP_F64()[pointer >> 3])
        }
        ;
    default:
        throw new TypeError(`invalid float width (${width}): ${name}`)
    }
}
;
var __embind_register_float = (rawType, name, size) => {
    name = readLatin1String(name);
    registerType(rawType, {
        name,
        fromWireType: value => value,
        toWireType: (destructors, value) => {
            if (typeof value != "number" && typeof value != "boolean") {
                throw new TypeError(`Cannot convert ${embindRepr(value)} to ${this.name}`)
            }
            return value
        }
        ,
        argPackAdvance: GenericWireTypeSize,
        readValueFromPointer: floatReadValueFromPointer(name, size),
        destructorFunction: null
    })
}
;
var __embind_register_integer = (primitiveType, name, size, minRange, maxRange) => {
    name = readLatin1String(name);
    if (maxRange === -1) {
        maxRange = 4294967295
    }
    var fromWireType = value => value;
    if (minRange === 0) {
        var bitshift = 32 - 8 * size;
        fromWireType = value => value << bitshift >>> bitshift
    }
    var isUnsignedType = name.includes("unsigned");
    var checkAssertions = (value, toTypeName) => {
        if (typeof value != "number" && typeof value != "boolean") {
            throw new TypeError(`Cannot convert "${embindRepr(value)}" to ${toTypeName}`)
        }
        if (value < minRange || value > maxRange) {
            throw new TypeError(`Passing a number "${embindRepr(value)}" from JS side to C/C++ side to an argument of type "${name}", which is outside the valid range [${minRange}, ${maxRange}]!`)
        }
    }
    ;
    var toWireType;
    if (isUnsignedType) {
        toWireType = function(destructors, value) {
            checkAssertions(value, this.name);
            return value >>> 0
        }
    } else {
        toWireType = function(destructors, value) {
            checkAssertions(value, this.name);
            return value
        }
    }
    registerType(primitiveType, {
        name,
        fromWireType,
        toWireType,
        argPackAdvance: GenericWireTypeSize,
        readValueFromPointer: integerReadValueFromPointer(name, size, minRange !== 0),
        destructorFunction: null
    })
}
;
var __embind_register_memory_view = (rawType, dataTypeIndex, name) => {
    var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array];
    var TA = typeMapping[dataTypeIndex];
    function decodeMemoryView(handle) {
        var size = GROWABLE_HEAP_U32()[handle >> 2];
        var data = GROWABLE_HEAP_U32()[handle + 4 >> 2];
        return new TA(GROWABLE_HEAP_I8().buffer,data,size)
    }
    name = readLatin1String(name);
    registerType(rawType, {
        name,
        fromWireType: decodeMemoryView,
        argPackAdvance: GenericWireTypeSize,
        readValueFromPointer: decodeMemoryView
    }, {
        ignoreDuplicateRegistrations: true
    })
}
;
var __embind_register_std_string = (rawType, name) => {
    name = readLatin1String(name);
    var stdStringIsUTF8 = true;
    registerType(rawType, {
        name,
        fromWireType(value) {
            var length = GROWABLE_HEAP_U32()[value >> 2];
            var payload = value + 4;
            var str;
            if (stdStringIsUTF8) {
                var decodeStartPtr = payload;
                for (var i = 0; i <= length; ++i) {
                    var currentBytePtr = payload + i;
                    if (i == length || GROWABLE_HEAP_U8()[currentBytePtr] == 0) {
                        var maxRead = currentBytePtr - decodeStartPtr;
                        var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
                        if (str === undefined) {
                            str = stringSegment
                        } else {
                            str += String.fromCharCode(0);
                            str += stringSegment
                        }
                        decodeStartPtr = currentBytePtr + 1
                    }
                }
            } else {
                var a = new Array(length);
                for (var i = 0; i < length; ++i) {
                    a[i] = String.fromCharCode(GROWABLE_HEAP_U8()[payload + i])
                }
                str = a.join("")
            }
            _free(value);
            return str
        },
        toWireType(destructors, value) {
            if (value instanceof ArrayBuffer) {
                value = new Uint8Array(value)
            }
            var length;
            var valueIsOfTypeString = typeof value == "string";
            if (!(valueIsOfTypeString || ArrayBuffer.isView(value) && value.BYTES_PER_ELEMENT == 1)) {
                throwBindingError("Cannot pass non-string to std::string")
            }
            if (stdStringIsUTF8 && valueIsOfTypeString) {
                length = lengthBytesUTF8(value)
            } else {
                length = value.length
            }
            var base = _malloc(4 + length + 1);
            var ptr = base + 4;
            GROWABLE_HEAP_U32()[base >> 2] = length;
            if (valueIsOfTypeString) {
                if (stdStringIsUTF8) {
                    stringToUTF8(value, ptr, length + 1)
                } else {
                    for (var i = 0; i < length; ++i) {
                        var charCode = value.charCodeAt(i);
                        if (charCode > 255) {
                            _free(base);
                            throwBindingError("String has UTF-16 code units that do not fit in 8 bits")
                        }
                        GROWABLE_HEAP_U8()[ptr + i] = charCode
                    }
                }
            } else {
                GROWABLE_HEAP_U8().set(value, ptr)
            }
            if (destructors !== null) {
                destructors.push(_free, base)
            }
            return base
        },
        argPackAdvance: GenericWireTypeSize,
        readValueFromPointer: readPointer,
        destructorFunction(ptr) {
            _free(ptr)
        }
    })
}
;
var UTF16Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf-16le") : undefined;
var UTF16ToString = (ptr, maxBytesToRead) => {
    assert(ptr % 2 == 0, "Pointer passed to UTF16ToString must be aligned to two bytes!");
    var endPtr = ptr;
    var idx = endPtr >> 1;
    var maxIdx = idx + maxBytesToRead / 2;
    while (!(idx >= maxIdx) && GROWABLE_HEAP_U16()[idx])
        ++idx;
    endPtr = idx << 1;
    if (endPtr - ptr > 32 && UTF16Decoder)
        return UTF16Decoder.decode(GROWABLE_HEAP_U8().slice(ptr, endPtr));
    var str = "";
    for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
        var codeUnit = GROWABLE_HEAP_I16()[ptr + i * 2 >> 1];
        if (codeUnit == 0)
            break;
        str += String.fromCharCode(codeUnit)
    }
    return str
}
;
var stringToUTF16 = (str, outPtr, maxBytesToWrite) => {
    assert(outPtr % 2 == 0, "Pointer passed to stringToUTF16 must be aligned to two bytes!");
    assert(typeof maxBytesToWrite == "number", "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
    maxBytesToWrite ??= 2147483647;
    if (maxBytesToWrite < 2)
        return 0;
    maxBytesToWrite -= 2;
    var startPtr = outPtr;
    var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
    for (var i = 0; i < numCharsToWrite; ++i) {
        var codeUnit = str.charCodeAt(i);
        GROWABLE_HEAP_I16()[outPtr >> 1] = codeUnit;
        outPtr += 2
    }
    GROWABLE_HEAP_I16()[outPtr >> 1] = 0;
    return outPtr - startPtr
}
;
var lengthBytesUTF16 = str => str.length * 2;
var UTF32ToString = (ptr, maxBytesToRead) => {
    assert(ptr % 4 == 0, "Pointer passed to UTF32ToString must be aligned to four bytes!");
    var i = 0;
    var str = "";
    while (!(i >= maxBytesToRead / 4)) {
        var utf32 = GROWABLE_HEAP_I32()[ptr + i * 4 >> 2];
        if (utf32 == 0)
            break;
        ++i;
        if (utf32 >= 65536) {
            var ch = utf32 - 65536;
            str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023)
        } else {
            str += String.fromCharCode(utf32)
        }
    }
    return str
}
;
var stringToUTF32 = (str, outPtr, maxBytesToWrite) => {
    assert(outPtr % 4 == 0, "Pointer passed to stringToUTF32 must be aligned to four bytes!");
    assert(typeof maxBytesToWrite == "number", "stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
    maxBytesToWrite ??= 2147483647;
    if (maxBytesToWrite < 4)
        return 0;
    var startPtr = outPtr;
    var endPtr = startPtr + maxBytesToWrite - 4;
    for (var i = 0; i < str.length; ++i) {
        var codeUnit = str.charCodeAt(i);
        if (codeUnit >= 55296 && codeUnit <= 57343) {
            var trailSurrogate = str.charCodeAt(++i);
            codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023
        }
        GROWABLE_HEAP_I32()[outPtr >> 2] = codeUnit;
        outPtr += 4;
        if (outPtr + 4 > endPtr)
            break
    }
    GROWABLE_HEAP_I32()[outPtr >> 2] = 0;
    return outPtr - startPtr
}
;
var lengthBytesUTF32 = str => {
    var len = 0;
    for (var i = 0; i < str.length; ++i) {
        var codeUnit = str.charCodeAt(i);
        if (codeUnit >= 55296 && codeUnit <= 57343)
            ++i;
        len += 4
    }
    return len
}
;
var __embind_register_std_wstring = (rawType, charSize, name) => {
    name = readLatin1String(name);
    var decodeString, encodeString, readCharAt, lengthBytesUTF;
    if (charSize === 2) {
        decodeString = UTF16ToString;
        encodeString = stringToUTF16;
        lengthBytesUTF = lengthBytesUTF16;
        readCharAt = pointer => GROWABLE_HEAP_U16()[pointer >> 1]
    } else if (charSize === 4) {
        decodeString = UTF32ToString;
        encodeString = stringToUTF32;
        lengthBytesUTF = lengthBytesUTF32;
        readCharAt = pointer => GROWABLE_HEAP_U32()[pointer >> 2]
    }
    registerType(rawType, {
        name,
        fromWireType: value => {
            var length = GROWABLE_HEAP_U32()[value >> 2];
            var str;
            var decodeStartPtr = value + 4;
            for (var i = 0; i <= length; ++i) {
                var currentBytePtr = value + 4 + i * charSize;
                if (i == length || readCharAt(currentBytePtr) == 0) {
                    var maxReadBytes = currentBytePtr - decodeStartPtr;
                    var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
                    if (str === undefined) {
                        str = stringSegment
                    } else {
                        str += String.fromCharCode(0);
                        str += stringSegment
                    }
                    decodeStartPtr = currentBytePtr + charSize
                }
            }
            _free(value);
            return str
        }
        ,
        toWireType: (destructors, value) => {
            if (!(typeof value == "string")) {
                throwBindingError(`Cannot pass non-string to C++ string type ${name}`)
            }
            var length = lengthBytesUTF(value);
            var ptr = _malloc(4 + length + charSize);
            GROWABLE_HEAP_U32()[ptr >> 2] = length / charSize;
            encodeString(value, ptr + 4, length + charSize);
            if (destructors !== null) {
                destructors.push(_free, ptr)
            }
            return ptr
        }
        ,
        argPackAdvance: GenericWireTypeSize,
        readValueFromPointer: readPointer,
        destructorFunction(ptr) {
            _free(ptr)
        }
    })
}
;
var __embind_register_void = (rawType, name) => {
    name = readLatin1String(name);
    registerType(rawType, {
        isVoid: true,
        name,
        argPackAdvance: 0,
        fromWireType: () => undefined,
        toWireType: (destructors, o) => undefined
    })
}
;
var __emscripten_init_main_thread_js = tb => {
    __emscripten_thread_init(tb, !ENVIRONMENT_IS_WORKER, 1, !ENVIRONMENT_IS_WEB, 2097152, false);
    PThread.threadInitTLS()
}
;
var __emscripten_lookup_name = name => {
    var nameString = UTF8ToString(name);
    return inetPton4(DNS.lookup_name(nameString))
}
;
var handleException = e => {
    if (e instanceof ExitStatus || e == "unwind") {
        dbg(`handleException: unwinding: EXITSTATUS=${EXITSTATUS}`);
        return EXITSTATUS
    }
    checkStackCookie();
    if (e instanceof WebAssembly.RuntimeError) {
        if (_emscripten_stack_get_current() <= 0) {
            err("Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 65536)")
        }
    }
    quit_(1, e)
}
;
var maybeExit = () => {
    if (!keepRuntimeAlive()) {
        dbg(`maybeExit: calling exit() implicitly after user callback completed: ${EXITSTATUS}`);
        try {
            if (ENVIRONMENT_IS_PTHREAD)
                __emscripten_thread_exit(EXITSTATUS);
            else
                _exit(EXITSTATUS)
        } catch (e) {
            handleException(e)
        }
    }
}
;
var callUserCallback = func => {
    if (ABORT) {
        err("user callback triggered after runtime exited or application aborted.  Ignoring.");
        return
    }
    try {
        func();
        maybeExit()
    } catch (e) {
        handleException(e)
    }
}
;
var __emscripten_thread_mailbox_await = pthread_ptr => {
    if (typeof Atomics.waitAsync === "function") {
        var wait = Atomics.waitAsync(GROWABLE_HEAP_I32(), pthread_ptr >> 2, pthread_ptr);
        assert(wait.async);
        wait.value.then(checkMailbox);
        var waitingAsync = pthread_ptr + 128;
        Atomics.store(GROWABLE_HEAP_I32(), waitingAsync >> 2, 1)
    }
}
;
var checkMailbox = () => {
    var pthread_ptr = _pthread_self();
    if (pthread_ptr) {
        __emscripten_thread_mailbox_await(pthread_ptr);
        callUserCallback(__emscripten_check_mailbox)
    }
}
;
var __emscripten_notify_mailbox_postmessage = (targetThread, currThreadId) => {
    if (targetThread == currThreadId) {
        setTimeout(checkMailbox)
    } else if (ENVIRONMENT_IS_PTHREAD) {
        postMessage({
            targetThread,
            cmd: "checkMailbox"
        })
    } else {
        var worker = PThread.pthreads[targetThread];
        if (!worker) {
            err(`Cannot send message to thread with ID ${targetThread}, unknown thread ID!`);
            return
        }
        worker.postMessage({
            cmd: "checkMailbox"
        })
    }
}
;
var proxiedJSCallArgs = [];
var __emscripten_receive_on_main_thread_js = (funcIndex, emAsmAddr, callingThread, numCallArgs, args) => {
    numCallArgs /= 2;
    proxiedJSCallArgs.length = numCallArgs;
    var b = args >> 3;
    for (var i = 0; i < numCallArgs; i++) {
        if (HEAP64[b + 2 * i]) {
            proxiedJSCallArgs[i] = HEAP64[b + 2 * i + 1]
        } else {
            proxiedJSCallArgs[i] = GROWABLE_HEAP_F64()[b + 2 * i + 1]
        }
    }
    var func = emAsmAddr ? ASM_CONSTS[emAsmAddr] : proxiedFunctionTable[funcIndex];
    assert(!(funcIndex && emAsmAddr));
    assert(func.length == numCallArgs, "Call args mismatch in _emscripten_receive_on_main_thread_js");
    PThread.currentProxiedOperationCallerThread = callingThread;
    var rtn = func(...proxiedJSCallArgs);
    PThread.currentProxiedOperationCallerThread = 0;
    assert(typeof rtn != "bigint");
    return rtn
}
;
var __emscripten_runtime_keepalive_clear = () => {
    noExitRuntime = false;
    runtimeKeepaliveCounter = 0
}
;
var __emscripten_thread_cleanup = thread => {
    if (!ENVIRONMENT_IS_PTHREAD)
        cleanupThread(thread);
    else
        postMessage({
            cmd: "cleanupThread",
            thread
        })
}
;
var __emscripten_thread_set_strongref = thread => {}
;
var __emscripten_throw_longjmp = () => {
    throw new EmscriptenSjLj
}
;
var getTypeName = type => {
    var ptr = ___getTypeName(type);
    var rv = readLatin1String(ptr);
    _free(ptr);
    return rv
}
;
var requireRegisteredType = (rawType, humanName) => {
    var impl = registeredTypes[rawType];
    if (undefined === impl) {
        throwBindingError(`${humanName} has unknown type ${getTypeName(rawType)}`)
    }
    return impl
}
;
var emval_returnValue = (returnType, destructorsRef, handle) => {
    var destructors = [];
    var result = returnType["toWireType"](destructors, handle);
    if (destructors.length) {
        GROWABLE_HEAP_U32()[destructorsRef >> 2] = Emval.toHandle(destructors)
    }
    return result
}
;
var __emval_as = (handle, returnType, destructorsRef) => {
    handle = Emval.toValue(handle);
    returnType = requireRegisteredType(returnType, "emval::as");
    return emval_returnValue(returnType, destructorsRef, handle)
}
;
var emval_symbols = {};
var getStringOrSymbol = address => {
    var symbol = emval_symbols[address];
    if (symbol === undefined) {
        return readLatin1String(address)
    }
    return symbol
}
;
var emval_get_global = () => {
    if (typeof globalThis == "object") {
        return globalThis
    }
    return function() {
        return Function
    }()("return this")()
}
;
var __emval_get_global = name => {
    if (name === 0) {
        return Emval.toHandle(emval_get_global())
    } else {
        name = getStringOrSymbol(name);
        return Emval.toHandle(emval_get_global()[name])
    }
}
;
var __emval_get_property = (handle, key) => {
    handle = Emval.toValue(handle);
    key = Emval.toValue(key);
    return Emval.toHandle(handle[key])
}
;
var __emval_new_cstring = v => Emval.toHandle(getStringOrSymbol(v));
var runDestructors = destructors => {
    while (destructors.length) {
        var ptr = destructors.pop();
        var del = destructors.pop();
        del(ptr)
    }
}
;
var __emval_run_destructors = handle => {
    var destructors = Emval.toValue(handle);
    runDestructors(destructors);
    __emval_decref(handle)
}
;
var INT53_MAX = 9007199254740992;
var INT53_MIN = -9007199254740992;
var bigintToI53Checked = num => num < INT53_MIN || num > INT53_MAX ? NaN : Number(num);
function __gmtime_js(time, tmPtr) {
    time = bigintToI53Checked(time);
    var date = new Date(time * 1e3);
    GROWABLE_HEAP_I32()[tmPtr >> 2] = date.getUTCSeconds();
    GROWABLE_HEAP_I32()[tmPtr + 4 >> 2] = date.getUTCMinutes();
    GROWABLE_HEAP_I32()[tmPtr + 8 >> 2] = date.getUTCHours();
    GROWABLE_HEAP_I32()[tmPtr + 12 >> 2] = date.getUTCDate();
    GROWABLE_HEAP_I32()[tmPtr + 16 >> 2] = date.getUTCMonth();
    GROWABLE_HEAP_I32()[tmPtr + 20 >> 2] = date.getUTCFullYear() - 1900;
    GROWABLE_HEAP_I32()[tmPtr + 24 >> 2] = date.getUTCDay();
    var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
    var yday = (date.getTime() - start) / (1e3 * 60 * 60 * 24) | 0;
    GROWABLE_HEAP_I32()[tmPtr + 28 >> 2] = yday
}
var isLeapYear = year => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
var MONTH_DAYS_LEAP_CUMULATIVE = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
var MONTH_DAYS_REGULAR_CUMULATIVE = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
var ydayFromDate = date => {
    var leap = isLeapYear(date.getFullYear());
    var monthDaysCumulative = leap ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE;
    var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1;
    return yday
}
;
function __localtime_js(time, tmPtr) {
    time = bigintToI53Checked(time);
    var date = new Date(time * 1e3);
    GROWABLE_HEAP_I32()[tmPtr >> 2] = date.getSeconds();
    GROWABLE_HEAP_I32()[tmPtr + 4 >> 2] = date.getMinutes();
    GROWABLE_HEAP_I32()[tmPtr + 8 >> 2] = date.getHours();
    GROWABLE_HEAP_I32()[tmPtr + 12 >> 2] = date.getDate();
    GROWABLE_HEAP_I32()[tmPtr + 16 >> 2] = date.getMonth();
    GROWABLE_HEAP_I32()[tmPtr + 20 >> 2] = date.getFullYear() - 1900;
    GROWABLE_HEAP_I32()[tmPtr + 24 >> 2] = date.getDay();
    var yday = ydayFromDate(date) | 0;
    GROWABLE_HEAP_I32()[tmPtr + 28 >> 2] = yday;
    GROWABLE_HEAP_I32()[tmPtr + 36 >> 2] = -(date.getTimezoneOffset() * 60);
    var start = new Date(date.getFullYear(),0,1);
    var summerOffset = new Date(date.getFullYear(),6,1).getTimezoneOffset();
    var winterOffset = start.getTimezoneOffset();
    var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
    GROWABLE_HEAP_I32()[tmPtr + 32 >> 2] = dst
}
var __mktime_js = function(tmPtr) {
    var ret = ( () => {
        var date = new Date(GROWABLE_HEAP_I32()[tmPtr + 20 >> 2] + 1900,GROWABLE_HEAP_I32()[tmPtr + 16 >> 2],GROWABLE_HEAP_I32()[tmPtr + 12 >> 2],GROWABLE_HEAP_I32()[tmPtr + 8 >> 2],GROWABLE_HEAP_I32()[tmPtr + 4 >> 2],GROWABLE_HEAP_I32()[tmPtr >> 2],0);
        var dst = GROWABLE_HEAP_I32()[tmPtr + 32 >> 2];
        var guessedOffset = date.getTimezoneOffset();
        var start = new Date(date.getFullYear(),0,1);
        var summerOffset = new Date(date.getFullYear(),6,1).getTimezoneOffset();
        var winterOffset = start.getTimezoneOffset();
        var dstOffset = Math.min(winterOffset, summerOffset);
        if (dst < 0) {
            GROWABLE_HEAP_I32()[tmPtr + 32 >> 2] = Number(summerOffset != winterOffset && dstOffset == guessedOffset)
        } else if (dst > 0 != (dstOffset == guessedOffset)) {
            var nonDstOffset = Math.max(winterOffset, summerOffset);
            var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
            date.setTime(date.getTime() + (trueOffset - guessedOffset) * 6e4)
        }
        GROWABLE_HEAP_I32()[tmPtr + 24 >> 2] = date.getDay();
        var yday = ydayFromDate(date) | 0;
        GROWABLE_HEAP_I32()[tmPtr + 28 >> 2] = yday;
        GROWABLE_HEAP_I32()[tmPtr >> 2] = date.getSeconds();
        GROWABLE_HEAP_I32()[tmPtr + 4 >> 2] = date.getMinutes();
        GROWABLE_HEAP_I32()[tmPtr + 8 >> 2] = date.getHours();
        GROWABLE_HEAP_I32()[tmPtr + 12 >> 2] = date.getDate();
        GROWABLE_HEAP_I32()[tmPtr + 16 >> 2] = date.getMonth();
        GROWABLE_HEAP_I32()[tmPtr + 20 >> 2] = date.getYear();
        var timeMs = date.getTime();
        if (isNaN(timeMs)) {
            return -1
        }
        return timeMs / 1e3
    }
    )();
    return BigInt(ret)
};
var __tzset_js = (timezone, daylight, std_name, dst_name) => {
    var currentYear = (new Date).getFullYear();
    var winter = new Date(currentYear,0,1);
    var summer = new Date(currentYear,6,1);
    var winterOffset = winter.getTimezoneOffset();
    var summerOffset = summer.getTimezoneOffset();
    var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
    GROWABLE_HEAP_U32()[timezone >> 2] = stdTimezoneOffset * 60;
    GROWABLE_HEAP_I32()[daylight >> 2] = Number(winterOffset != summerOffset);
    var extractZone = timezoneOffset => {
        var sign = timezoneOffset >= 0 ? "-" : "+";
        var absOffset = Math.abs(timezoneOffset);
        var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
        var minutes = String(absOffset % 60).padStart(2, "0");
        return `UTC${sign}${hours}${minutes}`
    }
    ;
    var winterName = extractZone(winterOffset);
    var summerName = extractZone(summerOffset);
    assert(winterName);
    assert(summerName);
    assert(lengthBytesUTF8(winterName) <= 16, `timezone name truncated to fit in TZNAME_MAX (${winterName})`);
    assert(lengthBytesUTF8(summerName) <= 16, `timezone name truncated to fit in TZNAME_MAX (${summerName})`);
    if (summerOffset < winterOffset) {
        stringToUTF8(winterName, std_name, 17);
        stringToUTF8(summerName, dst_name, 17)
    } else {
        stringToUTF8(winterName, dst_name, 17);
        stringToUTF8(summerName, std_name, 17)
    }
}
;
var _emscripten_get_now = () => performance.timeOrigin + performance.now();
var _emscripten_date_now = () => Date.now();
var nowIsMonotonic = 1;
var checkWasiClock = clock_id => clock_id >= 0 && clock_id <= 3;
function _clock_time_get(clk_id, ignored_precision, ptime) {
    ignored_precision = bigintToI53Checked(ignored_precision);
    if (!checkWasiClock(clk_id)) {
        return 28
    }
    var now;
    if (clk_id === 0) {
        now = _emscripten_date_now()
    } else if (nowIsMonotonic) {
        now = _emscripten_get_now()
    } else {
        return 52
    }
    var nsec = Math.round(now * 1e3 * 1e3);
    HEAP64[ptime >> 3] = BigInt(nsec);
    return 0
}
var runtimeKeepalivePush = () => {
    runtimeKeepaliveCounter += 1;
    dbg(`runtimeKeepalivePush -> counter=${runtimeKeepaliveCounter}`)
}
;
var runtimeKeepalivePop = () => {
    assert(runtimeKeepaliveCounter > 0);
    runtimeKeepaliveCounter -= 1;
    dbg(`runtimeKeepalivePop -> counter=${runtimeKeepaliveCounter}`)
}
;
var safeSetTimeout = (func, timeout) => {
    runtimeKeepalivePush();
    return setTimeout( () => {
        runtimeKeepalivePop();
        callUserCallback(func)
    }
    , timeout)
}
;
var Browser = {
    useWebGL: false,
    isFullscreen: false,
    pointerLock: false,
    moduleContextCreatedCallbacks: [],
    workers: [],
    preloadedImages: {},
    preloadedAudios: {},
    getCanvas: () => Module["canvas"],
    init() {
        if (Browser.initted)
            return;
        Browser.initted = true;
        var imagePlugin = {};
        imagePlugin["canHandle"] = function imagePlugin_canHandle(name) {
            return !Module["noImageDecoding"] && /\.(jpg|jpeg|png|bmp|webp)$/i.test(name)
        }
        ;
        imagePlugin["handle"] = function imagePlugin_handle(byteArray, name, onload, onerror) {
            var b = new Blob([byteArray],{
                type: Browser.getMimetype(name)
            });
            if (b.size !== byteArray.length) {
                b = new Blob([new Uint8Array(byteArray).buffer],{
                    type: Browser.getMimetype(name)
                })
            }
            var url = URL.createObjectURL(b);
            assert(typeof url == "string", "createObjectURL must return a url as a string");
            var img = new Image;
            img.onload = () => {
                assert(img.complete, `Image ${name} could not be decoded`);
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                Browser.preloadedImages[name] = canvas;
                URL.revokeObjectURL(url);
                onload?.(byteArray)
            }
            ;
            img.onerror = event => {
                err(`Image ${url} could not be decoded`);
                onerror?.()
            }
            ;
            img.src = url
        }
        ;
        preloadPlugins.push(imagePlugin);
        var audioPlugin = {};
        audioPlugin["canHandle"] = function audioPlugin_canHandle(name) {
            return !Module["noAudioDecoding"] && name.slice(-4)in {
                ".ogg": 1,
                ".wav": 1,
                ".mp3": 1
            }
        }
        ;
        audioPlugin["handle"] = function audioPlugin_handle(byteArray, name, onload, onerror) {
            var done = false;
            function finish(audio) {
                if (done)
                    return;
                done = true;
                Browser.preloadedAudios[name] = audio;
                onload?.(byteArray)
            }
            var b = new Blob([byteArray],{
                type: Browser.getMimetype(name)
            });
            var url = URL.createObjectURL(b);
            assert(typeof url == "string", "createObjectURL must return a url as a string");
            var audio = new Audio;
            audio.addEventListener("canplaythrough", () => finish(audio), false);
            audio.onerror = function audio_onerror(event) {
                if (done)
                    return;
                err(`warning: browser could not fully decode audio ${name}, trying slower base64 approach`);
                function encode64(data) {
                    var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                    var PAD = "=";
                    var ret = "";
                    var leftchar = 0;
                    var leftbits = 0;
                    for (var i = 0; i < data.length; i++) {
                        leftchar = leftchar << 8 | data[i];
                        leftbits += 8;
                        while (leftbits >= 6) {
                            var curr = leftchar >> leftbits - 6 & 63;
                            leftbits -= 6;
                            ret += BASE[curr]
                        }
                    }
                    if (leftbits == 2) {
                        ret += BASE[(leftchar & 3) << 4];
                        ret += PAD + PAD
                    } else if (leftbits == 4) {
                        ret += BASE[(leftchar & 15) << 2];
                        ret += PAD
                    }
                    return ret
                }
                audio.src = "data:audio/x-" + name.slice(-3) + ";base64," + encode64(byteArray);
                finish(audio)
            }
            ;
            audio.src = url;
            safeSetTimeout( () => {
                finish(audio)
            }
            , 1e4)
        }
        ;
        preloadPlugins.push(audioPlugin);
        function pointerLockChange() {
            var canvas = Browser.getCanvas();
            Browser.pointerLock = document["pointerLockElement"] === canvas || document["mozPointerLockElement"] === canvas || document["webkitPointerLockElement"] === canvas || document["msPointerLockElement"] === canvas
        }
        var canvas = Browser.getCanvas();
        if (canvas) {
            canvas.requestPointerLock = canvas["requestPointerLock"] || canvas["mozRequestPointerLock"] || canvas["webkitRequestPointerLock"] || canvas["msRequestPointerLock"] || ( () => {}
            );
            canvas.exitPointerLock = document["exitPointerLock"] || document["mozExitPointerLock"] || document["webkitExitPointerLock"] || document["msExitPointerLock"] || ( () => {}
            );
            canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
            document.addEventListener("pointerlockchange", pointerLockChange, false);
            document.addEventListener("mozpointerlockchange", pointerLockChange, false);
            document.addEventListener("webkitpointerlockchange", pointerLockChange, false);
            document.addEventListener("mspointerlockchange", pointerLockChange, false);
            if (Module["elementPointerLock"]) {
                canvas.addEventListener("click", ev => {
                    if (!Browser.pointerLock && Browser.getCanvas().requestPointerLock) {
                        Browser.getCanvas().requestPointerLock();
                        ev.preventDefault()
                    }
                }
                , false)
            }
        }
    },
    createContext(canvas, useWebGL, setInModule, webGLContextAttributes) {
        if (useWebGL && Module["ctx"] && canvas == Browser.getCanvas())
            return Module["ctx"];
        var ctx;
        var contextHandle;
        if (useWebGL) {
            var contextAttributes = {
                antialias: false,
                alpha: false,
                majorVersion: 2
            };
            if (webGLContextAttributes) {
                for (var attribute in webGLContextAttributes) {
                    contextAttributes[attribute] = webGLContextAttributes[attribute]
                }
            }
            if (typeof GL != "undefined") {
                contextHandle = GL.createContext(canvas, contextAttributes);
                if (contextHandle) {
                    ctx = GL.getContext(contextHandle).GLctx
                }
            }
        } else {
            ctx = canvas.getContext("2d")
        }
        if (!ctx)
            return null;
        if (setInModule) {
            if (!useWebGL)
                assert(typeof GLctx == "undefined", "cannot set in module if GLctx is used, but we are a non-GL context that would replace it");
            Module["ctx"] = ctx;
            if (useWebGL)
                GL.makeContextCurrent(contextHandle);
            Browser.useWebGL = useWebGL;
            Browser.moduleContextCreatedCallbacks.forEach(callback => callback());
            Browser.init()
        }
        return ctx
    },
    fullscreenHandlersInstalled: false,
    lockPointer: undefined,
    resizeCanvas: undefined,
    requestFullscreen(lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer == "undefined")
            Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas == "undefined")
            Browser.resizeCanvas = false;
        var canvas = Browser.getCanvas();
        function fullscreenChange() {
            Browser.isFullscreen = false;
            var canvasContainer = canvas.parentNode;
            if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvasContainer) {
                canvas.exitFullscreen = Browser.exitFullscreen;
                if (Browser.lockPointer)
                    canvas.requestPointerLock();
                Browser.isFullscreen = true;
                if (Browser.resizeCanvas) {
                    Browser.setFullscreenCanvasSize()
                } else {
                    Browser.updateCanvasDimensions(canvas)
                }
            } else {
                canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
                canvasContainer.parentNode.removeChild(canvasContainer);
                if (Browser.resizeCanvas) {
                    Browser.setWindowedCanvasSize()
                } else {
                    Browser.updateCanvasDimensions(canvas)
                }
            }
            Module["onFullScreen"]?.(Browser.isFullscreen);
            Module["onFullscreen"]?.(Browser.isFullscreen)
        }
        if (!Browser.fullscreenHandlersInstalled) {
            Browser.fullscreenHandlersInstalled = true;
            document.addEventListener("fullscreenchange", fullscreenChange, false);
            document.addEventListener("mozfullscreenchange", fullscreenChange, false);
            document.addEventListener("webkitfullscreenchange", fullscreenChange, false);
            document.addEventListener("MSFullscreenChange", fullscreenChange, false)
        }
        var canvasContainer = document.createElement("div");
        canvas.parentNode.insertBefore(canvasContainer, canvas);
        canvasContainer.appendChild(canvas);
        canvasContainer.requestFullscreen = canvasContainer["requestFullscreen"] || canvasContainer["mozRequestFullScreen"] || canvasContainer["msRequestFullscreen"] || (canvasContainer["webkitRequestFullscreen"] ? () => canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null) || (canvasContainer["webkitRequestFullScreen"] ? () => canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"]) : null);
        canvasContainer.requestFullscreen()
    },
    requestFullScreen() {
        abort("Module.requestFullScreen has been replaced by Module.requestFullscreen (without a capital S)")
    },
    exitFullscreen() {
        if (!Browser.isFullscreen) {
            return false
        }
        var CFS = document["exitFullscreen"] || document["cancelFullScreen"] || document["mozCancelFullScreen"] || document["msExitFullscreen"] || document["webkitCancelFullScreen"] || ( () => {}
        );
        CFS.apply(document, []);
        return true
    },
    safeSetTimeout(func, timeout) {
        return safeSetTimeout(func, timeout)
    },
    getMimetype(name) {
        return {
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            png: "image/png",
            bmp: "image/bmp",
            ogg: "audio/ogg",
            wav: "audio/wav",
            mp3: "audio/mpeg"
        }[name.slice(name.lastIndexOf(".") + 1)]
    },
    getUserMedia(func) {
        window.getUserMedia ||= navigator["getUserMedia"] || navigator["mozGetUserMedia"];
        window.getUserMedia(func)
    },
    getMovementX(event) {
        return event["movementX"] || event["mozMovementX"] || event["webkitMovementX"] || 0
    },
    getMovementY(event) {
        return event["movementY"] || event["mozMovementY"] || event["webkitMovementY"] || 0
    },
    getMouseWheelDelta(event) {
        var delta = 0;
        switch (event.type) {
        case "DOMMouseScroll":
            delta = event.detail / 3;
            break;
        case "mousewheel":
            delta = event.wheelDelta / 120;
            break;
        case "wheel":
            delta = event.deltaY;
            switch (event.deltaMode) {
            case 0:
                delta /= 100;
                break;
            case 1:
                delta /= 3;
                break;
            case 2:
                delta *= 80;
                break;
            default:
                throw "unrecognized mouse wheel delta mode: " + event.deltaMode
            }
            break;
        default:
            throw "unrecognized mouse wheel event: " + event.type
        }
        return delta
    },
    mouseX: 0,
    mouseY: 0,
    mouseMovementX: 0,
    mouseMovementY: 0,
    touches: {},
    lastTouches: {},
    calculateMouseCoords(pageX, pageY) {
        var canvas = Browser.getCanvas();
        var rect = canvas.getBoundingClientRect();
        var scrollX = typeof window.scrollX != "undefined" ? window.scrollX : window.pageXOffset;
        var scrollY = typeof window.scrollY != "undefined" ? window.scrollY : window.pageYOffset;
        assert(typeof scrollX != "undefined" && typeof scrollY != "undefined", "Unable to retrieve scroll position, mouse positions likely broken.");
        var adjustedX = pageX - (scrollX + rect.left);
        var adjustedY = pageY - (scrollY + rect.top);
        adjustedX = adjustedX * (canvas.width / rect.width);
        adjustedY = adjustedY * (canvas.height / rect.height);
        return {
            x: adjustedX,
            y: adjustedY
        }
    },
    setMouseCoords(pageX, pageY) {
        const {x, y} = Browser.calculateMouseCoords(pageX, pageY);
        Browser.mouseMovementX = x - Browser.mouseX;
        Browser.mouseMovementY = y - Browser.mouseY;
        Browser.mouseX = x;
        Browser.mouseY = y
    },
    calculateMouseEvent(event) {
        if (Browser.pointerLock) {
            if (event.type != "mousemove" && "mozMovementX"in event) {
                Browser.mouseMovementX = Browser.mouseMovementY = 0
            } else {
                Browser.mouseMovementX = Browser.getMovementX(event);
                Browser.mouseMovementY = Browser.getMovementY(event)
            }
            Browser.mouseX += Browser.mouseMovementX;
            Browser.mouseY += Browser.mouseMovementY
        } else {
            if (event.type === "touchstart" || event.type === "touchend" || event.type === "touchmove") {
                var touch = event.touch;
                if (touch === undefined) {
                    return
                }
                var coords = Browser.calculateMouseCoords(touch.pageX, touch.pageY);
                if (event.type === "touchstart") {
                    Browser.lastTouches[touch.identifier] = coords;
                    Browser.touches[touch.identifier] = coords
                } else if (event.type === "touchend" || event.type === "touchmove") {
                    var last = Browser.touches[touch.identifier];
                    last ||= coords;
                    Browser.lastTouches[touch.identifier] = last;
                    Browser.touches[touch.identifier] = coords
                }
                return
            }
            Browser.setMouseCoords(event.pageX, event.pageY)
        }
    },
    resizeListeners: [],
    updateResizeListeners() {
        var canvas = Browser.getCanvas();
        Browser.resizeListeners.forEach(listener => listener(canvas.width, canvas.height))
    },
    setCanvasSize(width, height, noUpdates) {
        var canvas = Browser.getCanvas();
        Browser.updateCanvasDimensions(canvas, width, height);
        if (!noUpdates)
            Browser.updateResizeListeners()
    },
    windowedWidth: 0,
    windowedHeight: 0,
    setFullscreenCanvasSize() {
        if (typeof SDL != "undefined") {
            var flags = GROWABLE_HEAP_U32()[SDL.screen >> 2];
            flags = flags | 8388608;
            GROWABLE_HEAP_I32()[SDL.screen >> 2] = flags
        }
        Browser.updateCanvasDimensions(Browser.getCanvas());
        Browser.updateResizeListeners()
    },
    setWindowedCanvasSize() {
        if (typeof SDL != "undefined") {
            var flags = GROWABLE_HEAP_U32()[SDL.screen >> 2];
            flags = flags & ~8388608;
            GROWABLE_HEAP_I32()[SDL.screen >> 2] = flags
        }
        Browser.updateCanvasDimensions(Browser.getCanvas());
        Browser.updateResizeListeners()
    },
    updateCanvasDimensions(canvas, wNative, hNative) {
        if (wNative && hNative) {
            canvas.widthNative = wNative;
            canvas.heightNative = hNative
        } else {
            wNative = canvas.widthNative;
            hNative = canvas.heightNative
        }
        var w = wNative;
        var h = hNative;
        if (Module["forcedAspectRatio"] > 0) {
            if (w / h < Module["forcedAspectRatio"]) {
                w = Math.round(h * Module["forcedAspectRatio"])
            } else {
                h = Math.round(w / Module["forcedAspectRatio"])
            }
        }
        if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvas.parentNode && typeof screen != "undefined") {
            var factor = Math.min(screen.width / w, screen.height / h);
            w = Math.round(w * factor);
            h = Math.round(h * factor)
        }
        if (Browser.resizeCanvas) {
            if (canvas.width != w)
                canvas.width = w;
            if (canvas.height != h)
                canvas.height = h;
            if (typeof canvas.style != "undefined") {
                canvas.style.removeProperty("width");
                canvas.style.removeProperty("height")
            }
        } else {
            if (canvas.width != wNative)
                canvas.width = wNative;
            if (canvas.height != hNative)
                canvas.height = hNative;
            if (typeof canvas.style != "undefined") {
                if (w != wNative || h != hNative) {
                    canvas.style.setProperty("width", w + "px", "important");
                    canvas.style.setProperty("height", h + "px", "important")
                } else {
                    canvas.style.removeProperty("width");
                    canvas.style.removeProperty("height")
                }
            }
        }
    }
};
var EGL = {
    errorCode: 12288,
    defaultDisplayInitialized: false,
    currentContext: 0,
    currentReadSurface: 0,
    currentDrawSurface: 0,
    contextAttributes: {
        alpha: false,
        depth: false,
        stencil: false,
        antialias: false
    },
    stringCache: {},
    setErrorCode(code) {
        EGL.errorCode = code
    },
    chooseConfig(display, attribList, config, config_size, numConfigs) {
        if (display != 62e3) {
            EGL.setErrorCode(12296);
            return 0
        }
        if (attribList) {
            for (; ; ) {
                var param = GROWABLE_HEAP_I32()[attribList >> 2];
                if (param == 12321) {
                    var alphaSize = GROWABLE_HEAP_I32()[attribList + 4 >> 2];
                    EGL.contextAttributes.alpha = alphaSize > 0
                } else if (param == 12325) {
                    var depthSize = GROWABLE_HEAP_I32()[attribList + 4 >> 2];
                    EGL.contextAttributes.depth = depthSize > 0
                } else if (param == 12326) {
                    var stencilSize = GROWABLE_HEAP_I32()[attribList + 4 >> 2];
                    EGL.contextAttributes.stencil = stencilSize > 0
                } else if (param == 12337) {
                    var samples = GROWABLE_HEAP_I32()[attribList + 4 >> 2];
                    EGL.contextAttributes.antialias = samples > 0
                } else if (param == 12338) {
                    var samples = GROWABLE_HEAP_I32()[attribList + 4 >> 2];
                    EGL.contextAttributes.antialias = samples == 1
                } else if (param == 12544) {
                    var requestedPriority = GROWABLE_HEAP_I32()[attribList + 4 >> 2];
                    EGL.contextAttributes.lowLatency = requestedPriority != 12547
                } else if (param == 12344) {
                    break
                }
                attribList += 8
            }
        }
        if ((!config || !config_size) && !numConfigs) {
            EGL.setErrorCode(12300);
            return 0
        }
        if (numConfigs) {
            GROWABLE_HEAP_I32()[numConfigs >> 2] = 1
        }
        if (config && config_size > 0) {
            GROWABLE_HEAP_U32()[config >> 2] = 62002
        }
        EGL.setErrorCode(12288);
        return 1
    }
};
function _eglBindAPI(api) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(24, 0, 1, api);
    if (api == 12448) {
        EGL.setErrorCode(12288);
        return 1
    }
    EGL.setErrorCode(12300);
    return 0
}
function _eglChooseConfig(display, attrib_list, configs, config_size, numConfigs) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(25, 0, 1, display, attrib_list, configs, config_size, numConfigs);
    return EGL.chooseConfig(display, attrib_list, configs, config_size, numConfigs)
}
var GLctx;
var webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance = ctx => !!(ctx.dibvbi = ctx.getExtension("WEBGL_draw_instanced_base_vertex_base_instance"));
var webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance = ctx => !!(ctx.mdibvbi = ctx.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance"));
var webgl_enable_EXT_polygon_offset_clamp = ctx => !!(ctx.extPolygonOffsetClamp = ctx.getExtension("EXT_polygon_offset_clamp"));
var webgl_enable_EXT_clip_control = ctx => !!(ctx.extClipControl = ctx.getExtension("EXT_clip_control"));
var webgl_enable_WEBGL_polygon_mode = ctx => !!(ctx.webglPolygonMode = ctx.getExtension("WEBGL_polygon_mode"));
var webgl_enable_WEBGL_multi_draw = ctx => !!(ctx.multiDrawWebgl = ctx.getExtension("WEBGL_multi_draw"));
var getEmscriptenSupportedExtensions = ctx => {
    var supportedExtensions = ["EXT_color_buffer_float", "EXT_conservative_depth", "EXT_disjoint_timer_query_webgl2", "EXT_texture_norm16", "NV_shader_noperspective_interpolation", "WEBGL_clip_cull_distance", "EXT_clip_control", "EXT_color_buffer_half_float", "EXT_depth_clamp", "EXT_float_blend", "EXT_polygon_offset_clamp", "EXT_texture_compression_bptc", "EXT_texture_compression_rgtc", "EXT_texture_filter_anisotropic", "KHR_parallel_shader_compile", "OES_texture_float_linear", "WEBGL_blend_func_extended", "WEBGL_compressed_texture_astc", "WEBGL_compressed_texture_etc", "WEBGL_compressed_texture_etc1", "WEBGL_compressed_texture_s3tc", "WEBGL_compressed_texture_s3tc_srgb", "WEBGL_debug_renderer_info", "WEBGL_debug_shaders", "WEBGL_lose_context", "WEBGL_multi_draw", "WEBGL_polygon_mode"];
    return (ctx.getSupportedExtensions() || []).filter(ext => supportedExtensions.includes(ext))
}
;
var registerPreMainLoop = f => {
    typeof MainLoop != "undefined" && MainLoop.preMainLoop.push(f)
}
;
var GL = {
    debug: true,
    counter: 1,
    buffers: [],
    mappedBuffers: {},
    programs: [],
    framebuffers: [],
    renderbuffers: [],
    textures: [],
    shaders: [],
    vaos: [],
    contexts: {},
    offscreenCanvases: {},
    queries: [],
    samplers: [],
    transformFeedbacks: [],
    syncs: [],
    byteSizeByTypeRoot: 5120,
    byteSizeByType: [1, 1, 2, 2, 4, 4, 4, 2, 3, 4, 8],
    stringCache: {},
    stringiCache: {},
    unpackAlignment: 4,
    unpackRowLength: 0,
    recordError: errorCode => {
        if (!GL.lastError) {
            GL.lastError = errorCode
        }
    }
    ,
    getNewId: table => {
        var ret = GL.counter++;
        for (var i = table.length; i < ret; i++) {
            table[i] = null
        }
        while (table[ret]) {
            ret = GL.counter++
        }
        return ret
    }
    ,
    genObject: (n, buffers, createFunction, objectTable) => {
        for (var i = 0; i < n; i++) {
            var buffer = GLctx[createFunction]();
            var id = buffer && GL.getNewId(objectTable);
            if (buffer) {
                buffer.name = id;
                objectTable[id] = buffer
            } else {
                GL.recordError(1282)
            }
            GROWABLE_HEAP_I32()[buffers + i * 4 >> 2] = id
        }
    }
    ,
    MAX_TEMP_BUFFER_SIZE: 2097152,
    numTempVertexBuffersPerSize: 64,
    log2ceilLookup: i => 32 - Math.clz32(i === 0 ? 0 : i - 1),
    generateTempBuffers: (quads, context) => {
        var largestIndex = GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
        context.tempVertexBufferCounters1 = [];
        context.tempVertexBufferCounters2 = [];
        context.tempVertexBufferCounters1.length = context.tempVertexBufferCounters2.length = largestIndex + 1;
        context.tempVertexBuffers1 = [];
        context.tempVertexBuffers2 = [];
        context.tempVertexBuffers1.length = context.tempVertexBuffers2.length = largestIndex + 1;
        context.tempIndexBuffers = [];
        context.tempIndexBuffers.length = largestIndex + 1;
        for (var i = 0; i <= largestIndex; ++i) {
            context.tempIndexBuffers[i] = null;
            context.tempVertexBufferCounters1[i] = context.tempVertexBufferCounters2[i] = 0;
            var ringbufferLength = GL.numTempVertexBuffersPerSize;
            context.tempVertexBuffers1[i] = [];
            context.tempVertexBuffers2[i] = [];
            var ringbuffer1 = context.tempVertexBuffers1[i];
            var ringbuffer2 = context.tempVertexBuffers2[i];
            ringbuffer1.length = ringbuffer2.length = ringbufferLength;
            for (var j = 0; j < ringbufferLength; ++j) {
                ringbuffer1[j] = ringbuffer2[j] = null
            }
        }
        if (quads) {
            context.tempQuadIndexBuffer = GLctx.createBuffer();
            context.GLctx.bindBuffer(34963, context.tempQuadIndexBuffer);
            var numIndexes = GL.MAX_TEMP_BUFFER_SIZE >> 1;
            var quadIndexes = new Uint16Array(numIndexes);
            var i = 0
              , v = 0;
            while (1) {
                quadIndexes[i++] = v;
                if (i >= numIndexes)
                    break;
                quadIndexes[i++] = v + 1;
                if (i >= numIndexes)
                    break;
                quadIndexes[i++] = v + 2;
                if (i >= numIndexes)
                    break;
                quadIndexes[i++] = v;
                if (i >= numIndexes)
                    break;
                quadIndexes[i++] = v + 2;
                if (i >= numIndexes)
                    break;
                quadIndexes[i++] = v + 3;
                if (i >= numIndexes)
                    break;
                v += 4
            }
            context.GLctx.bufferData(34963, quadIndexes, 35044);
            context.GLctx.bindBuffer(34963, null)
        }
    }
    ,
    getTempVertexBuffer: sizeBytes => {
        var idx = GL.log2ceilLookup(sizeBytes);
        var ringbuffer = GL.currentContext.tempVertexBuffers1[idx];
        var nextFreeBufferIndex = GL.currentContext.tempVertexBufferCounters1[idx];
        GL.currentContext.tempVertexBufferCounters1[idx] = GL.currentContext.tempVertexBufferCounters1[idx] + 1 & GL.numTempVertexBuffersPerSize - 1;
        var vbo = ringbuffer[nextFreeBufferIndex];
        if (vbo) {
            return vbo
        }
        var prevVBO = GLctx.getParameter(34964);
        ringbuffer[nextFreeBufferIndex] = GLctx.createBuffer();
        GLctx.bindBuffer(34962, ringbuffer[nextFreeBufferIndex]);
        GLctx.bufferData(34962, 1 << idx, 35048);
        GLctx.bindBuffer(34962, prevVBO);
        return ringbuffer[nextFreeBufferIndex]
    }
    ,
    getTempIndexBuffer: sizeBytes => {
        var idx = GL.log2ceilLookup(sizeBytes);
        var ibo = GL.currentContext.tempIndexBuffers[idx];
        if (ibo) {
            return ibo
        }
        var prevIBO = GLctx.getParameter(34965);
        GL.currentContext.tempIndexBuffers[idx] = GLctx.createBuffer();
        GLctx.bindBuffer(34963, GL.currentContext.tempIndexBuffers[idx]);
        GLctx.bufferData(34963, 1 << idx, 35048);
        GLctx.bindBuffer(34963, prevIBO);
        return GL.currentContext.tempIndexBuffers[idx]
    }
    ,
    newRenderingFrameStarted: () => {
        if (!GL.currentContext) {
            return
        }
        var vb = GL.currentContext.tempVertexBuffers1;
        GL.currentContext.tempVertexBuffers1 = GL.currentContext.tempVertexBuffers2;
        GL.currentContext.tempVertexBuffers2 = vb;
        vb = GL.currentContext.tempVertexBufferCounters1;
        GL.currentContext.tempVertexBufferCounters1 = GL.currentContext.tempVertexBufferCounters2;
        GL.currentContext.tempVertexBufferCounters2 = vb;
        var largestIndex = GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
        for (var i = 0; i <= largestIndex; ++i) {
            GL.currentContext.tempVertexBufferCounters1[i] = 0
        }
    }
    ,
    getSource: (shader, count, string, length) => {
        var source = "";
        for (var i = 0; i < count; ++i) {
            var len = length ? GROWABLE_HEAP_U32()[length + i * 4 >> 2] : undefined;
            source += UTF8ToString(GROWABLE_HEAP_U32()[string + i * 4 >> 2], len)
        }
        return source
    }
    ,
    calcBufLength: (size, type, stride, count) => {
        if (stride > 0) {
            return count * stride
        }
        var typeSize = GL.byteSizeByType[type - GL.byteSizeByTypeRoot];
        return size * typeSize * count
    }
    ,
    usedTempBuffers: [],
    preDrawHandleClientVertexAttribBindings: count => {
        GL.resetBufferBinding = false;
        for (var i = 0; i < GL.currentContext.maxVertexAttribs; ++i) {
            var cb = GL.currentContext.clientBuffers[i];
            if (!cb.clientside || !cb.enabled)
                continue;
            GL.resetBufferBinding = true;
            var size = GL.calcBufLength(cb.size, cb.type, cb.stride, count);
            var buf = GL.getTempVertexBuffer(size);
            GLctx.bindBuffer(34962, buf);
            GLctx.bufferSubData(34962, 0, GROWABLE_HEAP_U8().subarray(cb.ptr, cb.ptr + size));
            cb.vertexAttribPointerAdaptor.call(GLctx, i, cb.size, cb.type, cb.normalized, cb.stride, 0)
        }
    }
    ,
    postDrawHandleClientVertexAttribBindings: () => {
        if (GL.resetBufferBinding) {
            GLctx.bindBuffer(34962, GL.buffers[GLctx.currentArrayBufferBinding])
        }
    }
    ,
    createContext: (canvas, webGLContextAttributes) => {
        if (webGLContextAttributes.renderViaOffscreenBackBuffer)
            webGLContextAttributes["preserveDrawingBuffer"] = true;
        var errorInfo = "?";
        function onContextCreationError(event) {
            errorInfo = event.statusMessage || errorInfo
        }
        canvas.addEventListener("webglcontextcreationerror", onContextCreationError, false);
        if (!canvas.getContextSafariWebGL2Fixed) {
            canvas.getContextSafariWebGL2Fixed = canvas.getContext;
            function fixedGetContext(ver, attrs) {
                var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
                return ver == "webgl" == gl instanceof WebGLRenderingContext ? gl : null
            }
            canvas.getContext = fixedGetContext
        }
        var ctx = canvas.getContext("webgl2", webGLContextAttributes);
        canvas.removeEventListener("webglcontextcreationerror", onContextCreationError, false);
        if (!ctx) {
            dbg("Could not create canvas: " + [errorInfo, JSON.stringify(webGLContextAttributes)]);
            return 0
        }
        var handle = GL.registerContext(ctx, webGLContextAttributes);
        return handle
    }
    ,
    enableOffscreenFramebufferAttributes: webGLContextAttributes => {
        webGLContextAttributes.renderViaOffscreenBackBuffer = true;
        webGLContextAttributes.preserveDrawingBuffer = true
    }
    ,
    createOffscreenFramebuffer: context => {
        var gl = context.GLctx;
        var fbo = gl.createFramebuffer();
        gl.bindFramebuffer(36160, fbo);
        context.defaultFbo = fbo;
        context.defaultFboForbidBlitFramebuffer = false;
        if (gl.getContextAttributes().antialias) {
            context.defaultFboForbidBlitFramebuffer = true
        }
        context.defaultColorTarget = gl.createTexture();
        context.defaultDepthTarget = gl.createRenderbuffer();
        GL.resizeOffscreenFramebuffer(context);
        gl.bindTexture(3553, context.defaultColorTarget);
        gl.texParameteri(3553, 10241, 9728);
        gl.texParameteri(3553, 10240, 9728);
        gl.texParameteri(3553, 10242, 33071);
        gl.texParameteri(3553, 10243, 33071);
        gl.texImage2D(3553, 0, 6408, gl.canvas.width, gl.canvas.height, 0, 6408, 5121, null);
        gl.framebufferTexture2D(36160, 36064, 3553, context.defaultColorTarget, 0);
        gl.bindTexture(3553, null);
        var depthTarget = gl.createRenderbuffer();
        gl.bindRenderbuffer(36161, context.defaultDepthTarget);
        gl.renderbufferStorage(36161, 33189, gl.canvas.width, gl.canvas.height);
        gl.framebufferRenderbuffer(36160, 36096, 36161, context.defaultDepthTarget);
        gl.bindRenderbuffer(36161, null);
        var vertices = [-1, -1, -1, 1, 1, -1, 1, 1];
        var vb = gl.createBuffer();
        gl.bindBuffer(34962, vb);
        gl.bufferData(34962, new Float32Array(vertices), 35044);
        gl.bindBuffer(34962, null);
        context.blitVB = vb;
        var vsCode = "attribute vec2 pos;" + "varying lowp vec2 tex;" + "void main() { tex = pos * 0.5 + vec2(0.5,0.5); gl_Position = vec4(pos, 0.0, 1.0); }";
        var vs = gl.createShader(35633);
        gl.shaderSource(vs, vsCode);
        gl.compileShader(vs);
        var fsCode = "varying lowp vec2 tex;" + "uniform sampler2D sampler;" + "void main() { gl_FragColor = texture2D(sampler, tex); }";
        var fs = gl.createShader(35632);
        gl.shaderSource(fs, fsCode);
        gl.compileShader(fs);
        var blitProgram = gl.createProgram();
        gl.attachShader(blitProgram, vs);
        gl.attachShader(blitProgram, fs);
        gl.linkProgram(blitProgram);
        context.blitProgram = blitProgram;
        context.blitPosLoc = gl.getAttribLocation(blitProgram, "pos");
        gl.useProgram(blitProgram);
        gl.uniform1i(gl.getUniformLocation(blitProgram, "sampler"), 0);
        gl.useProgram(null);
        if (gl.createVertexArray) {
            context.defaultVao = gl.createVertexArray();
            gl.bindVertexArray(context.defaultVao);
            gl.enableVertexAttribArray(context.blitPosLoc);
            gl.bindVertexArray(null)
        }
    }
    ,
    resizeOffscreenFramebuffer: context => {
        var gl = context.GLctx;
        if (context.defaultColorTarget) {
            var prevTextureBinding = gl.getParameter(32873);
            gl.bindTexture(3553, context.defaultColorTarget);
            gl.texImage2D(3553, 0, 6408, gl.drawingBufferWidth, gl.drawingBufferHeight, 0, 6408, 5121, null);
            gl.bindTexture(3553, prevTextureBinding)
        }
        if (context.defaultDepthTarget) {
            var prevRenderBufferBinding = gl.getParameter(36007);
            gl.bindRenderbuffer(36161, context.defaultDepthTarget);
            gl.renderbufferStorage(36161, 33189, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.bindRenderbuffer(36161, prevRenderBufferBinding)
        }
    }
    ,
    blitOffscreenFramebuffer: context => {
        var gl = context.GLctx;
        var prevScissorTest = gl.getParameter(3089);
        if (prevScissorTest)
            gl.disable(3089);
        var prevFbo = gl.getParameter(36006);
        if (gl.blitFramebuffer && !context.defaultFboForbidBlitFramebuffer) {
            gl.bindFramebuffer(36008, context.defaultFbo);
            gl.bindFramebuffer(36009, null);
            gl.blitFramebuffer(0, 0, gl.canvas.width, gl.canvas.height, 0, 0, gl.canvas.width, gl.canvas.height, 16384, 9728)
        } else {
            gl.bindFramebuffer(36160, null);
            var prevProgram = gl.getParameter(35725);
            gl.useProgram(context.blitProgram);
            var prevVB = gl.getParameter(34964);
            gl.bindBuffer(34962, context.blitVB);
            var prevActiveTexture = gl.getParameter(34016);
            gl.activeTexture(33984);
            var prevTextureBinding = gl.getParameter(32873);
            gl.bindTexture(3553, context.defaultColorTarget);
            var prevBlend = gl.getParameter(3042);
            if (prevBlend)
                gl.disable(3042);
            var prevCullFace = gl.getParameter(2884);
            if (prevCullFace)
                gl.disable(2884);
            var prevDepthTest = gl.getParameter(2929);
            if (prevDepthTest)
                gl.disable(2929);
            var prevStencilTest = gl.getParameter(2960);
            if (prevStencilTest)
                gl.disable(2960);
            function draw() {
                gl.vertexAttribPointer(context.blitPosLoc, 2, 5126, false, 0, 0);
                gl.drawArrays(5, 0, 4)
            }
            if (context.defaultVao) {
                var prevVAO = gl.getParameter(34229);
                gl.bindVertexArray(context.defaultVao);
                draw();
                gl.bindVertexArray(prevVAO)
            } else {
                var prevVertexAttribPointer = {
                    buffer: gl.getVertexAttrib(context.blitPosLoc, 34975),
                    size: gl.getVertexAttrib(context.blitPosLoc, 34339),
                    stride: gl.getVertexAttrib(context.blitPosLoc, 34340),
                    type: gl.getVertexAttrib(context.blitPosLoc, 34341),
                    normalized: gl.getVertexAttrib(context.blitPosLoc, 34922),
                    pointer: gl.getVertexAttribOffset(context.blitPosLoc, 34373)
                };
                var maxVertexAttribs = gl.getParameter(34921);
                var prevVertexAttribEnables = [];
                for (var i = 0; i < maxVertexAttribs; ++i) {
                    var prevEnabled = gl.getVertexAttrib(i, 34338);
                    var wantEnabled = i == context.blitPosLoc;
                    if (prevEnabled && !wantEnabled) {
                        gl.disableVertexAttribArray(i)
                    }
                    if (!prevEnabled && wantEnabled) {
                        gl.enableVertexAttribArray(i)
                    }
                    prevVertexAttribEnables[i] = prevEnabled
                }
                draw();
                for (var i = 0; i < maxVertexAttribs; ++i) {
                    var prevEnabled = prevVertexAttribEnables[i];
                    var nowEnabled = i == context.blitPosLoc;
                    if (prevEnabled && !nowEnabled) {
                        gl.enableVertexAttribArray(i)
                    }
                    if (!prevEnabled && nowEnabled) {
                        gl.disableVertexAttribArray(i)
                    }
                }
                gl.bindBuffer(34962, prevVertexAttribPointer.buffer);
                gl.vertexAttribPointer(context.blitPosLoc, prevVertexAttribPointer.size, prevVertexAttribPointer.type, prevVertexAttribPointer.normalized, prevVertexAttribPointer.stride, prevVertexAttribPointer.offset)
            }
            if (prevStencilTest)
                gl.enable(2960);
            if (prevDepthTest)
                gl.enable(2929);
            if (prevCullFace)
                gl.enable(2884);
            if (prevBlend)
                gl.enable(3042);
            gl.bindTexture(3553, prevTextureBinding);
            gl.activeTexture(prevActiveTexture);
            gl.bindBuffer(34962, prevVB);
            gl.useProgram(prevProgram)
        }
        gl.bindFramebuffer(36160, prevFbo);
        if (prevScissorTest)
            gl.enable(3089)
    }
    ,
    registerContext: (ctx, webGLContextAttributes) => {
        var handle = _malloc(8);
        GROWABLE_HEAP_U32()[handle + 4 >> 2] = _pthread_self();
        var context = {
            handle,
            attributes: webGLContextAttributes,
            version: webGLContextAttributes.majorVersion,
            GLctx: ctx
        };
        if (ctx.canvas)
            ctx.canvas.GLctxObject = context;
        GL.contexts[handle] = context;
        if (typeof webGLContextAttributes.enableExtensionsByDefault == "undefined" || webGLContextAttributes.enableExtensionsByDefault) {
            GL.initExtensions(context)
        }
        context.maxVertexAttribs = context.GLctx.getParameter(34921);
        context.clientBuffers = [];
        for (var i = 0; i < context.maxVertexAttribs; i++) {
            context.clientBuffers[i] = {
                enabled: false,
                clientside: false,
                size: 0,
                type: 0,
                normalized: 0,
                stride: 0,
                ptr: 0,
                vertexAttribPointerAdaptor: null
            }
        }
        GL.generateTempBuffers(false, context);
        if (webGLContextAttributes.renderViaOffscreenBackBuffer)
            GL.createOffscreenFramebuffer(context);
        return handle
    }
    ,
    makeContextCurrent: contextHandle => {
        if (contextHandle && !GL.contexts[contextHandle]) {
            dbg(`GL.makeContextCurrent() failed! WebGL context ${contextHandle} does not exist, or was created on another thread!`)
        }
        GL.currentContext = GL.contexts[contextHandle];
        Module["ctx"] = GLctx = GL.currentContext?.GLctx;
        return !(contextHandle && !GLctx)
    }
    ,
    getContext: contextHandle => GL.contexts[contextHandle],
    deleteContext: contextHandle => {
        if (GL.currentContext === GL.contexts[contextHandle]) {
            GL.currentContext = null
        }
        if (typeof JSEvents == "object") {
            JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas)
        }
        if (GL.contexts[contextHandle]?.GLctx.canvas) {
            GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined
        }
        _free(GL.contexts[contextHandle].handle);
        GL.contexts[contextHandle] = null
    }
    ,
    initExtensions: context => {
        context ||= GL.currentContext;
        if (context.initExtensionsDone)
            return;
        context.initExtensionsDone = true;
        var GLctx = context.GLctx;
        webgl_enable_WEBGL_multi_draw(GLctx);
        webgl_enable_EXT_polygon_offset_clamp(GLctx);
        webgl_enable_EXT_clip_control(GLctx);
        webgl_enable_WEBGL_polygon_mode(GLctx);
        webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx);
        webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx);
        if (context.version >= 2) {
            GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query_webgl2")
        }
        if (context.version < 2 || !GLctx.disjointTimerQueryExt) {
            GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query")
        }
        getEmscriptenSupportedExtensions(GLctx).forEach(ext => {
            if (!ext.includes("lose_context") && !ext.includes("debug")) {
                GLctx.getExtension(ext)
            }
        }
        )
    }
};
function _eglCreateContext(display, config, hmm, contextAttribs) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(26, 0, 1, display, config, hmm, contextAttribs);
    if (display != 62e3) {
        EGL.setErrorCode(12296);
        return 0
    }
    var glesContextVersion = 1;
    for (; ; ) {
        var param = GROWABLE_HEAP_I32()[contextAttribs >> 2];
        if (param == 12440) {
            glesContextVersion = GROWABLE_HEAP_I32()[contextAttribs + 4 >> 2]
        } else if (param == 12344) {
            break
        } else {
            EGL.setErrorCode(12292);
            return 0
        }
        contextAttribs += 8
    }
    if (glesContextVersion < 2 || glesContextVersion > 3) {
        EGL.setErrorCode(12293);
        return 0
    }
    EGL.contextAttributes.majorVersion = glesContextVersion - 1;
    EGL.contextAttributes.minorVersion = 0;
    EGL.context = GL.createContext(Browser.getCanvas(), EGL.contextAttributes);
    if (EGL.context != 0) {
        EGL.setErrorCode(12288);
        GL.makeContextCurrent(EGL.context);
        Browser.useWebGL = true;
        Browser.moduleContextCreatedCallbacks.forEach(callback => callback());
        GL.makeContextCurrent(null);
        return 62004
    } else {
        EGL.setErrorCode(12297);
        return 0
    }
}
function _eglCreateWindowSurface(display, config, win, attrib_list) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(27, 0, 1, display, config, win, attrib_list);
    if (display != 62e3) {
        EGL.setErrorCode(12296);
        return 0
    }
    if (config != 62002) {
        EGL.setErrorCode(12293);
        return 0
    }
    EGL.setErrorCode(12288);
    return 62006
}
function _eglDestroyContext(display, context) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(28, 0, 1, display, context);
    if (display != 62e3) {
        EGL.setErrorCode(12296);
        return 0
    }
    if (context != 62004) {
        EGL.setErrorCode(12294);
        return 0
    }
    GL.deleteContext(EGL.context);
    EGL.setErrorCode(12288);
    if (EGL.currentContext == context) {
        EGL.currentContext = 0
    }
    return 1
}
function _eglDestroySurface(display, surface) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(29, 0, 1, display, surface);
    if (display != 62e3) {
        EGL.setErrorCode(12296);
        return 0
    }
    if (surface != 62006) {
        EGL.setErrorCode(12301);
        return 1
    }
    if (EGL.currentReadSurface == surface) {
        EGL.currentReadSurface = 0
    }
    if (EGL.currentDrawSurface == surface) {
        EGL.currentDrawSurface = 0
    }
    EGL.setErrorCode(12288);
    return 1
}
function _eglGetConfigAttrib(display, config, attribute, value) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(30, 0, 1, display, config, attribute, value);
    if (display != 62e3) {
        EGL.setErrorCode(12296);
        return 0
    }
    if (config != 62002) {
        EGL.setErrorCode(12293);
        return 0
    }
    if (!value) {
        EGL.setErrorCode(12300);
        return 0
    }
    EGL.setErrorCode(12288);
    switch (attribute) {
    case 12320:
        GROWABLE_HEAP_I32()[value >> 2] = EGL.contextAttributes.alpha ? 32 : 24;
        return 1;
    case 12321:
        GROWABLE_HEAP_I32()[value >> 2] = EGL.contextAttributes.alpha ? 8 : 0;
        return 1;
    case 12322:
        GROWABLE_HEAP_I32()[value >> 2] = 8;
        return 1;
    case 12323:
        GROWABLE_HEAP_I32()[value >> 2] = 8;
        return 1;
    case 12324:
        GROWABLE_HEAP_I32()[value >> 2] = 8;
        return 1;
    case 12325:
        GROWABLE_HEAP_I32()[value >> 2] = EGL.contextAttributes.depth ? 24 : 0;
        return 1;
    case 12326:
        GROWABLE_HEAP_I32()[value >> 2] = EGL.contextAttributes.stencil ? 8 : 0;
        return 1;
    case 12327:
        GROWABLE_HEAP_I32()[value >> 2] = 12344;
        return 1;
    case 12328:
        GROWABLE_HEAP_I32()[value >> 2] = 62002;
        return 1;
    case 12329:
        GROWABLE_HEAP_I32()[value >> 2] = 0;
        return 1;
    case 12330:
        GROWABLE_HEAP_I32()[value >> 2] = 4096;
        return 1;
    case 12331:
        GROWABLE_HEAP_I32()[value >> 2] = 16777216;
        return 1;
    case 12332:
        GROWABLE_HEAP_I32()[value >> 2] = 4096;
        return 1;
    case 12333:
        GROWABLE_HEAP_I32()[value >> 2] = 0;
        return 1;
    case 12334:
        GROWABLE_HEAP_I32()[value >> 2] = 0;
        return 1;
    case 12335:
        GROWABLE_HEAP_I32()[value >> 2] = 12344;
        return 1;
    case 12337:
        GROWABLE_HEAP_I32()[value >> 2] = EGL.contextAttributes.antialias ? 4 : 0;
        return 1;
    case 12338:
        GROWABLE_HEAP_I32()[value >> 2] = EGL.contextAttributes.antialias ? 1 : 0;
        return 1;
    case 12339:
        GROWABLE_HEAP_I32()[value >> 2] = 4;
        return 1;
    case 12340:
        GROWABLE_HEAP_I32()[value >> 2] = 12344;
        return 1;
    case 12341:
    case 12342:
    case 12343:
        GROWABLE_HEAP_I32()[value >> 2] = -1;
        return 1;
    case 12345:
    case 12346:
        GROWABLE_HEAP_I32()[value >> 2] = 0;
        return 1;
    case 12347:
        GROWABLE_HEAP_I32()[value >> 2] = 0;
        return 1;
    case 12348:
        GROWABLE_HEAP_I32()[value >> 2] = 1;
        return 1;
    case 12349:
    case 12350:
        GROWABLE_HEAP_I32()[value >> 2] = 0;
        return 1;
    case 12351:
        GROWABLE_HEAP_I32()[value >> 2] = 12430;
        return 1;
    case 12352:
        GROWABLE_HEAP_I32()[value >> 2] = 4;
        return 1;
    case 12354:
        GROWABLE_HEAP_I32()[value >> 2] = 0;
        return 1;
    default:
        EGL.setErrorCode(12292);
        return 0
    }
}
function _eglGetDisplay(nativeDisplayType) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(31, 0, 1, nativeDisplayType);
    EGL.setErrorCode(12288);
    if (nativeDisplayType != 0 && nativeDisplayType != 1) {
        return 0
    }
    return 62e3
}
function _eglGetError() {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(32, 0, 1);
    return EGL.errorCode
}
function _eglInitialize(display, majorVersion, minorVersion) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(33, 0, 1, display, majorVersion, minorVersion);
    if (display != 62e3) {
        EGL.setErrorCode(12296);
        return 0
    }
    if (majorVersion) {
        GROWABLE_HEAP_I32()[majorVersion >> 2] = 1
    }
    if (minorVersion) {
        GROWABLE_HEAP_I32()[minorVersion >> 2] = 4
    }
    EGL.defaultDisplayInitialized = true;
    EGL.setErrorCode(12288);
    return 1
}
function _eglMakeCurrent(display, draw, read, context) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(34, 0, 1, display, draw, read, context);
    if (display != 62e3) {
        EGL.setErrorCode(12296);
        return 0
    }
    if (context != 0 && context != 62004) {
        EGL.setErrorCode(12294);
        return 0
    }
    if (read != 0 && read != 62006 || draw != 0 && draw != 62006) {
        EGL.setErrorCode(12301);
        return 0
    }
    GL.makeContextCurrent(context ? EGL.context : null);
    EGL.currentContext = context;
    EGL.currentDrawSurface = draw;
    EGL.currentReadSurface = read;
    EGL.setErrorCode(12288);
    return 1
}
var stringToNewUTF8 = str => {
    var size = lengthBytesUTF8(str) + 1;
    var ret = _malloc(size);
    if (ret)
        stringToUTF8(str, ret, size);
    return ret
}
;
function _eglQueryString(display, name) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(35, 0, 1, display, name);
    if (display != 62e3) {
        EGL.setErrorCode(12296);
        return 0
    }
    EGL.setErrorCode(12288);
    if (EGL.stringCache[name])
        return EGL.stringCache[name];
    var ret;
    switch (name) {
    case 12371:
        ret = stringToNewUTF8("Emscripten");
        break;
    case 12372:
        ret = stringToNewUTF8("1.4 Emscripten EGL");
        break;
    case 12373:
        ret = stringToNewUTF8("");
        break;
    case 12429:
        ret = stringToNewUTF8("OpenGL_ES");
        break;
    default:
        EGL.setErrorCode(12300);
        return 0
    }
    EGL.stringCache[name] = ret;
    return ret
}
function _eglQuerySurface(display, surface, attribute, value) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(36, 0, 1, display, surface, attribute, value);
    if (display != 62e3) {
        EGL.setErrorCode(12296);
        return 0
    }
    if (surface != 62006) {
        EGL.setErrorCode(12301);
        return 0
    }
    if (!value) {
        EGL.setErrorCode(12300);
        return 0
    }
    EGL.setErrorCode(12288);
    switch (attribute) {
    case 12328:
        GROWABLE_HEAP_I32()[value >> 2] = 62002;
        return 1;
    case 12376:
        return 1;
    case 12375:
        GROWABLE_HEAP_I32()[value >> 2] = Browser.getCanvas().width;
        return 1;
    case 12374:
        GROWABLE_HEAP_I32()[value >> 2] = Browser.getCanvas().height;
        return 1;
    case 12432:
        GROWABLE_HEAP_I32()[value >> 2] = -1;
        return 1;
    case 12433:
        GROWABLE_HEAP_I32()[value >> 2] = -1;
        return 1;
    case 12434:
        GROWABLE_HEAP_I32()[value >> 2] = -1;
        return 1;
    case 12422:
        GROWABLE_HEAP_I32()[value >> 2] = 12420;
        return 1;
    case 12441:
        GROWABLE_HEAP_I32()[value >> 2] = 12442;
        return 1;
    case 12435:
        GROWABLE_HEAP_I32()[value >> 2] = 12437;
        return 1;
    case 12416:
    case 12417:
    case 12418:
    case 12419:
        return 1;
    default:
        EGL.setErrorCode(12292);
        return 0
    }
}
function _eglSwapBuffers(dpy, surface) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(37, 0, 1, dpy, surface);
    if (!EGL.defaultDisplayInitialized) {
        EGL.setErrorCode(12289)
    } else if (!GLctx) {
        EGL.setErrorCode(12290)
    } else if (GLctx.isContextLost()) {
        EGL.setErrorCode(12302)
    } else {
        EGL.setErrorCode(12288);
        return 1
    }
    return 0
}
var setMainLoop = (iterFunc, fps, simulateInfiniteLoop, arg, noSetTiming) => {
    assert(!MainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
    MainLoop.func = iterFunc;
    MainLoop.arg = arg;
    var thisMainLoopId = MainLoop.currentlyRunningMainloop;
    function checkIsRunning() {
        if (thisMainLoopId < MainLoop.currentlyRunningMainloop) {
            dbg("main loop exiting");
            runtimeKeepalivePop();
            maybeExit();
            return false
        }
        return true
    }
    MainLoop.running = false;
    MainLoop.runner = function MainLoop_runner() {
        if (ABORT)
            return;
        if (MainLoop.queue.length > 0) {
            var start = Date.now();
            var blocker = MainLoop.queue.shift();
            blocker.func(blocker.arg);
            if (MainLoop.remainingBlockers) {
                var remaining = MainLoop.remainingBlockers;
                var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
                if (blocker.counted) {
                    MainLoop.remainingBlockers = next
                } else {
                    next = next + .5;
                    MainLoop.remainingBlockers = (8 * remaining + next) / 9
                }
            }
            dbg(`main loop blocker "${blocker.name}" took '${Date.now() - start} ms`);
            MainLoop.updateStatus();
            if (!checkIsRunning())
                return;
            setTimeout(MainLoop.runner, 0);
            return
        }
        if (!checkIsRunning())
            return;
        MainLoop.currentFrameNumber = MainLoop.currentFrameNumber + 1 | 0;
        if (MainLoop.timingMode == 1 && MainLoop.timingValue > 1 && MainLoop.currentFrameNumber % MainLoop.timingValue != 0) {
            MainLoop.scheduler();
            return
        } else if (MainLoop.timingMode == 0) {
            MainLoop.tickStartTime = _emscripten_get_now()
        }
        if (MainLoop.method === "timeout" && Module["ctx"]) {
            warnOnce("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!");
            MainLoop.method = ""
        }
        MainLoop.runIter(iterFunc);
        if (!checkIsRunning())
            return;
        MainLoop.scheduler()
    }
    ;
    if (!noSetTiming) {
        if (fps > 0) {
            _emscripten_set_main_loop_timing(0, 1e3 / fps)
        } else {
            _emscripten_set_main_loop_timing(1, 1)
        }
        MainLoop.scheduler()
    }
    if (simulateInfiniteLoop) {
        throw "unwind"
    }
}
;
var MainLoop = {
    running: false,
    scheduler: null,
    method: "",
    currentlyRunningMainloop: 0,
    func: null,
    arg: 0,
    timingMode: 0,
    timingValue: 0,
    currentFrameNumber: 0,
    queue: [],
    preMainLoop: [],
    postMainLoop: [],
    pause() {
        MainLoop.scheduler = null;
        MainLoop.currentlyRunningMainloop++
    },
    resume() {
        MainLoop.currentlyRunningMainloop++;
        var timingMode = MainLoop.timingMode;
        var timingValue = MainLoop.timingValue;
        var func = MainLoop.func;
        MainLoop.func = null;
        setMainLoop(func, 0, false, MainLoop.arg, true);
        _emscripten_set_main_loop_timing(timingMode, timingValue);
        MainLoop.scheduler()
    },
    updateStatus() {
        if (Module["setStatus"]) {
            var message = Module["statusMessage"] || "Please wait...";
            var remaining = MainLoop.remainingBlockers ?? 0;
            var expected = MainLoop.expectedBlockers ?? 0;
            if (remaining) {
                if (remaining < expected) {
                    Module["setStatus"](`{message} ({expected - remaining}/{expected})`)
                } else {
                    Module["setStatus"](message)
                }
            } else {
                Module["setStatus"]("")
            }
        }
    },
    init() {
        Module["preMainLoop"] && MainLoop.preMainLoop.push(Module["preMainLoop"]);
        Module["postMainLoop"] && MainLoop.postMainLoop.push(Module["postMainLoop"])
    },
    runIter(func) {
        if (ABORT)
            return;
        for (var pre of MainLoop.preMainLoop) {
            if (pre() === false) {
                return
            }
        }
        callUserCallback(func);
        for (var post of MainLoop.postMainLoop) {
            post()
        }
        checkStackCookie()
    },
    nextRAF: 0,
    fakeRequestAnimationFrame(func) {
        var now = Date.now();
        if (MainLoop.nextRAF === 0) {
            MainLoop.nextRAF = now + 1e3 / 60
        } else {
            while (now + 2 >= MainLoop.nextRAF) {
                MainLoop.nextRAF += 1e3 / 60
            }
        }
        var delay = Math.max(MainLoop.nextRAF - now, 0);
        setTimeout(func, delay)
    },
    requestAnimationFrame(func) {
        if (typeof requestAnimationFrame == "function") {
            requestAnimationFrame(func);
            return
        }
        var RAF = MainLoop.fakeRequestAnimationFrame;
        RAF(func)
    }
};
var _emscripten_set_main_loop_timing = (mode, value) => {
    MainLoop.timingMode = mode;
    MainLoop.timingValue = value;
    if (!MainLoop.func) {
        err("emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.");
        return 1
    }
    if (!MainLoop.running) {
        runtimeKeepalivePush();
        MainLoop.running = true
    }
    if (mode == 0) {
        MainLoop.scheduler = function MainLoop_scheduler_setTimeout() {
            var timeUntilNextTick = Math.max(0, MainLoop.tickStartTime + value - _emscripten_get_now()) | 0;
            setTimeout(MainLoop.runner, timeUntilNextTick)
        }
        ;
        MainLoop.method = "timeout"
    } else if (mode == 1) {
        MainLoop.scheduler = function MainLoop_scheduler_rAF() {
            MainLoop.requestAnimationFrame(MainLoop.runner)
        }
        ;
        MainLoop.method = "rAF"
    } else if (mode == 2) {
        if (typeof MainLoop.setImmediate == "undefined") {
            if (typeof setImmediate == "undefined") {
                var setImmediates = [];
                var emscriptenMainLoopMessageId = "setimmediate";
                var MainLoop_setImmediate_messageHandler = event => {
                    if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
                        event.stopPropagation();
                        setImmediates.shift()()
                    }
                }
                ;
                addEventListener("message", MainLoop_setImmediate_messageHandler, true);
                MainLoop.setImmediate = func => {
                    setImmediates.push(func);
                    if (ENVIRONMENT_IS_WORKER) {
                        Module["setImmediates"] ??= [];
                        Module["setImmediates"].push(func);
                        postMessage({
                            target: emscriptenMainLoopMessageId
                        })
                    } else
                        postMessage(emscriptenMainLoopMessageId, "*")
                }
            } else {
                MainLoop.setImmediate = setImmediate
            }
        }
        MainLoop.scheduler = function MainLoop_scheduler_setImmediate() {
            MainLoop.setImmediate(MainLoop.runner)
        }
        ;
        MainLoop.method = "immediate"
    }
    return 0
}
;
function _eglSwapInterval(display, interval) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(38, 0, 1, display, interval);
    if (display != 62e3) {
        EGL.setErrorCode(12296);
        return 0
    }
    if (interval == 0)
        _emscripten_set_main_loop_timing(0, 0);
    else
        _emscripten_set_main_loop_timing(1, interval);
    EGL.setErrorCode(12288);
    return 1
}
function _eglTerminate(display) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(39, 0, 1, display);
    if (display != 62e3) {
        EGL.setErrorCode(12296);
        return 0
    }
    EGL.currentContext = 0;
    EGL.currentReadSurface = 0;
    EGL.currentDrawSurface = 0;
    EGL.defaultDisplayInitialized = false;
    EGL.setErrorCode(12288);
    return 1
}
function _eglWaitClient() {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(40, 0, 1);
    EGL.setErrorCode(12288);
    return 1
}
var _eglWaitGL = _eglWaitClient;
function _eglWaitNative(nativeEngineId) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(41, 0, 1, nativeEngineId);
    EGL.setErrorCode(12288);
    return 1
}
var readEmAsmArgsArray = [];
var readEmAsmArgs = (sigPtr, buf) => {
    assert(Array.isArray(readEmAsmArgsArray));
    assert(buf % 16 == 0);
    readEmAsmArgsArray.length = 0;
    var ch;
    while (ch = GROWABLE_HEAP_U8()[sigPtr++]) {
        var chr = String.fromCharCode(ch);
        var validChars = ["d", "f", "i", "p"];
        validChars.push("j");
        assert(validChars.includes(chr), `Invalid character ${ch}("${chr}") in readEmAsmArgs! Use only [${validChars}], and do not specify "v" for void return argument.`);
        var wide = ch != 105;
        wide &= ch != 112;
        buf += wide && buf % 8 ? 4 : 0;
        readEmAsmArgsArray.push(ch == 112 ? GROWABLE_HEAP_U32()[buf >> 2] : ch == 106 ? HEAP64[buf >> 3] : ch == 105 ? GROWABLE_HEAP_I32()[buf >> 2] : GROWABLE_HEAP_F64()[buf >> 3]);
        buf += wide ? 8 : 4
    }
    return readEmAsmArgsArray
}
;
var runEmAsmFunction = (code, sigPtr, argbuf) => {
    var args = readEmAsmArgs(sigPtr, argbuf);
    assert(ASM_CONSTS.hasOwnProperty(code), `No EM_ASM constant found at address ${code}.  The loaded WebAssembly file is likely out of sync with the generated JavaScript.`);
    return ASM_CONSTS[code](...args)
}
;
var _emscripten_asm_const_int = (code, sigPtr, argbuf) => runEmAsmFunction(code, sigPtr, argbuf);
var runMainThreadEmAsm = (emAsmAddr, sigPtr, argbuf, sync) => {
    var args = readEmAsmArgs(sigPtr, argbuf);
    if (ENVIRONMENT_IS_PTHREAD) {
        return proxyToMainThread(0, emAsmAddr, sync, ...args)
    }
    assert(ASM_CONSTS.hasOwnProperty(emAsmAddr), `No EM_ASM constant found at address ${emAsmAddr}.  The loaded WebAssembly file is likely out of sync with the generated JavaScript.`);
    return ASM_CONSTS[emAsmAddr](...args)
}
;
var _emscripten_asm_const_int_sync_on_main_thread = (emAsmAddr, sigPtr, argbuf) => runMainThreadEmAsm(emAsmAddr, sigPtr, argbuf, 1);
var _emscripten_asm_const_ptr_sync_on_main_thread = (emAsmAddr, sigPtr, argbuf) => runMainThreadEmAsm(emAsmAddr, sigPtr, argbuf, 1);
var _emscripten_check_blocking_allowed = () => {
    if (ENVIRONMENT_IS_WORKER)
        return;
    warnOnce("Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread")
}
;
var _emscripten_err = str => err(UTF8ToString(str));
var onExits = [];
var JSEvents = {
    memcpy(target, src, size) {
        GROWABLE_HEAP_I8().set(GROWABLE_HEAP_I8().subarray(src, src + size), target)
    },
    removeAllEventListeners() {
        while (JSEvents.eventHandlers.length) {
            JSEvents._removeHandler(JSEvents.eventHandlers.length - 1)
        }
        JSEvents.deferredCalls = []
    },
    inEventHandler: 0,
    deferredCalls: [],
    deferCall(targetFunction, precedence, argsList) {
        function arraysHaveEqualContent(arrA, arrB) {
            if (arrA.length != arrB.length)
                return false;
            for (var i in arrA) {
                if (arrA[i] != arrB[i])
                    return false
            }
            return true
        }
        for (var call of JSEvents.deferredCalls) {
            if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
                return
            }
        }
        JSEvents.deferredCalls.push({
            targetFunction,
            precedence,
            argsList
        });
        JSEvents.deferredCalls.sort( (x, y) => x.precedence < y.precedence)
    },
    removeDeferredCalls(targetFunction) {
        JSEvents.deferredCalls = JSEvents.deferredCalls.filter(call => call.targetFunction != targetFunction)
    },
    canPerformEventHandlerRequests() {
        if (navigator.userActivation) {
            return navigator.userActivation.isActive
        }
        return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls
    },
    runDeferredCalls() {
        if (!JSEvents.canPerformEventHandlerRequests()) {
            return
        }
        var deferredCalls = JSEvents.deferredCalls;
        JSEvents.deferredCalls = [];
        for (var call of deferredCalls) {
            call.targetFunction(...call.argsList)
        }
    },
    eventHandlers: [],
    removeAllHandlersOnTarget: (target, eventTypeString) => {
        for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
            if (JSEvents.eventHandlers[i].target == target && (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
                JSEvents._removeHandler(i--)
            }
        }
    }
    ,
    _removeHandler(i) {
        var h = JSEvents.eventHandlers[i];
        h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
        JSEvents.eventHandlers.splice(i, 1)
    },
    registerOrRemoveHandler(eventHandler) {
        if (!eventHandler.target) {
            err("registerOrRemoveHandler: the target element for event handler registration does not exist, when processing the following event handler registration:");
            console.dir(eventHandler);
            return -4
        }
        if (eventHandler.callbackfunc) {
            eventHandler.eventListenerFunc = function(event) {
                ++JSEvents.inEventHandler;
                JSEvents.currentEventHandler = eventHandler;
                JSEvents.runDeferredCalls();
                eventHandler.handlerFunc(event);
                JSEvents.runDeferredCalls();
                --JSEvents.inEventHandler
            }
            ;
            eventHandler.target.addEventListener(eventHandler.eventTypeString, eventHandler.eventListenerFunc, eventHandler.useCapture);
            JSEvents.eventHandlers.push(eventHandler)
        } else {
            for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
                if (JSEvents.eventHandlers[i].target == eventHandler.target && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
                    JSEvents._removeHandler(i--)
                }
            }
        }
        return 0
    },
    getTargetThreadForEventCallback(targetThread) {
        switch (targetThread) {
        case 1:
            return 0;
        case 2:
            return PThread.currentProxiedOperationCallerThread;
        default:
            return targetThread
        }
    },
    getNodeNameForTarget(target) {
        if (!target)
            return "";
        if (target == window)
            return "#window";
        if (target == screen)
            return "#screen";
        return target?.nodeName || ""
    },
    fullscreenEnabled() {
        return document.fullscreenEnabled || document.webkitFullscreenEnabled
    }
};
var specialHTMLTargets = [0, typeof document != "undefined" ? document : 0, typeof window != "undefined" ? window : 0];
var maybeCStringToJsString = cString => cString > 2 ? UTF8ToString(cString) : cString;
var findEventTarget = target => {
    target = maybeCStringToJsString(target);
    var domElement = specialHTMLTargets[target] || (typeof document != "undefined" ? document.querySelector(target) : null);
    return domElement
}
;
var findCanvasEventTarget = findEventTarget;
var getCanvasSizeCallingThread = (target, width, height) => {
    var canvas = findCanvasEventTarget(target);
    if (!canvas)
        return -4;
    if (!canvas.controlTransferredOffscreen) {
        GROWABLE_HEAP_I32()[width >> 2] = canvas.width;
        GROWABLE_HEAP_I32()[height >> 2] = canvas.height
    } else {
        dbg("canvas.controlTransferredOffscreen but we do not own the canvas, and do not know who has (no canvas.canvasSharedPtr present, an internal bug?)!\n");
        return -4
    }
    return 0
}
;
function getCanvasSizeMainThread(target, width, height) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(43, 0, 1, target, width, height);
    return getCanvasSizeCallingThread(target, width, height)
}
var _emscripten_get_canvas_element_size = (target, width, height) => {
    var canvas = findCanvasEventTarget(target);
    if (canvas) {
        return getCanvasSizeCallingThread(target, width, height)
    }
    return getCanvasSizeMainThread(target, width, height)
}
;
var stringToUTF8OnStack = str => {
    var size = lengthBytesUTF8(str) + 1;
    var ret = stackAlloc(size);
    stringToUTF8(str, ret, size);
    return ret
}
;
var getCanvasElementSize = target => {
    var sp = stackSave();
    var w = stackAlloc(8);
    var h = w + 4;
    var targetInt = stringToUTF8OnStack(target.id);
    var ret = _emscripten_get_canvas_element_size(targetInt, w, h);
    var size = [GROWABLE_HEAP_I32()[w >> 2], GROWABLE_HEAP_I32()[h >> 2]];
    stackRestore(sp);
    return size
}
;
var setCanvasElementSizeCallingThread = (target, width, height) => {
    var canvas = findCanvasEventTarget(target);
    if (!canvas)
        return -4;
    if (!canvas.controlTransferredOffscreen) {
        var autoResizeViewport = false;
        if (canvas.GLctxObject?.GLctx) {
            var prevViewport = canvas.GLctxObject.GLctx.getParameter(2978);
            autoResizeViewport = prevViewport[0] === 0 && prevViewport[1] === 0 && prevViewport[2] === canvas.width && prevViewport[3] === canvas.height;
            dbg(`Resizing canvas from ${canvas.width}x${canvas.height} to ${width}x${height}. Previous GL viewport size was ${prevViewport}, so autoResizeViewport=${autoResizeViewport}`)
        }
        canvas.width = width;
        canvas.height = height;
        if (autoResizeViewport) {
            dbg(`Automatically resizing GL viewport to cover whole render target ${width}x${height}`);
            canvas.GLctxObject.GLctx.viewport(0, 0, width, height)
        }
    } else {
        dbg("canvas.controlTransferredOffscreen but we do not own the canvas, and do not know who has (no canvas.canvasSharedPtr present, an internal bug?)!\n");
        return -4
    }
    if (canvas.GLctxObject)
        GL.resizeOffscreenFramebuffer(canvas.GLctxObject);
    return 0
}
;
function setCanvasElementSizeMainThread(target, width, height) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(44, 0, 1, target, width, height);
    return setCanvasElementSizeCallingThread(target, width, height)
}
var _emscripten_set_canvas_element_size = (target, width, height) => {
    dbg(`emscripten_set_canvas_element_size(target=${target},width=${width},height=${height}`);
    var canvas = findCanvasEventTarget(target);
    if (canvas) {
        return setCanvasElementSizeCallingThread(target, width, height)
    }
    return setCanvasElementSizeMainThread(target, width, height)
}
;
var setCanvasElementSize = (target, width, height) => {
    dbg(`setCanvasElementSize(target=${target},width=${width},height=${height}`);
    if (!target.controlTransferredOffscreen) {
        target.width = width;
        target.height = height
    } else {
        var sp = stackSave();
        var targetInt = stringToUTF8OnStack(target.id);
        _emscripten_set_canvas_element_size(targetInt, width, height);
        stackRestore(sp)
    }
}
;
var currentFullscreenStrategy = {};
var registerRestoreOldStyle = canvas => {
    var canvasSize = getCanvasElementSize(canvas);
    var oldWidth = canvasSize[0];
    var oldHeight = canvasSize[1];
    var oldCssWidth = canvas.style.width;
    var oldCssHeight = canvas.style.height;
    var oldBackgroundColor = canvas.style.backgroundColor;
    var oldDocumentBackgroundColor = document.body.style.backgroundColor;
    var oldPaddingLeft = canvas.style.paddingLeft;
    var oldPaddingRight = canvas.style.paddingRight;
    var oldPaddingTop = canvas.style.paddingTop;
    var oldPaddingBottom = canvas.style.paddingBottom;
    var oldMarginLeft = canvas.style.marginLeft;
    var oldMarginRight = canvas.style.marginRight;
    var oldMarginTop = canvas.style.marginTop;
    var oldMarginBottom = canvas.style.marginBottom;
    var oldDocumentBodyMargin = document.body.style.margin;
    var oldDocumentOverflow = document.documentElement.style.overflow;
    var oldDocumentScroll = document.body.scroll;
    var oldImageRendering = canvas.style.imageRendering;
    function restoreOldStyle() {
        var fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
        if (!fullscreenElement) {
            document.removeEventListener("fullscreenchange", restoreOldStyle);
            document.removeEventListener("webkitfullscreenchange", restoreOldStyle);
            setCanvasElementSize(canvas, oldWidth, oldHeight);
            canvas.style.width = oldCssWidth;
            canvas.style.height = oldCssHeight;
            canvas.style.backgroundColor = oldBackgroundColor;
            if (!oldDocumentBackgroundColor)
                document.body.style.backgroundColor = "white";
            document.body.style.backgroundColor = oldDocumentBackgroundColor;
            canvas.style.paddingLeft = oldPaddingLeft;
            canvas.style.paddingRight = oldPaddingRight;
            canvas.style.paddingTop = oldPaddingTop;
            canvas.style.paddingBottom = oldPaddingBottom;
            canvas.style.marginLeft = oldMarginLeft;
            canvas.style.marginRight = oldMarginRight;
            canvas.style.marginTop = oldMarginTop;
            canvas.style.marginBottom = oldMarginBottom;
            document.body.style.margin = oldDocumentBodyMargin;
            document.documentElement.style.overflow = oldDocumentOverflow;
            document.body.scroll = oldDocumentScroll;
            canvas.style.imageRendering = oldImageRendering;
            if (canvas.GLctxObject)
                canvas.GLctxObject.GLctx.viewport(0, 0, oldWidth, oldHeight);
            if (currentFullscreenStrategy.canvasResizedCallback) {
                if (currentFullscreenStrategy.canvasResizedCallbackTargetThread)
                    __emscripten_run_callback_on_thread(currentFullscreenStrategy.canvasResizedCallbackTargetThread, currentFullscreenStrategy.canvasResizedCallback, 37, 0, currentFullscreenStrategy.canvasResizedCallbackUserData);
                else
                    getWasmTableEntry(currentFullscreenStrategy.canvasResizedCallback)(37, 0, currentFullscreenStrategy.canvasResizedCallbackUserData)
            }
        }
    }
    document.addEventListener("fullscreenchange", restoreOldStyle);
    document.addEventListener("webkitfullscreenchange", restoreOldStyle);
    return restoreOldStyle
}
;
var setLetterbox = (element, topBottom, leftRight) => {
    element.style.paddingLeft = element.style.paddingRight = leftRight + "px";
    element.style.paddingTop = element.style.paddingBottom = topBottom + "px"
}
;
var getBoundingClientRect = e => specialHTMLTargets.indexOf(e) < 0 ? e.getBoundingClientRect() : {
    left: 0,
    top: 0
};
var JSEvents_resizeCanvasForFullscreen = (target, strategy) => {
    var restoreOldStyle = registerRestoreOldStyle(target);
    var cssWidth = strategy.softFullscreen ? innerWidth : screen.width;
    var cssHeight = strategy.softFullscreen ? innerHeight : screen.height;
    var rect = getBoundingClientRect(target);
    var windowedCssWidth = rect.width;
    var windowedCssHeight = rect.height;
    var canvasSize = getCanvasElementSize(target);
    var windowedRttWidth = canvasSize[0];
    var windowedRttHeight = canvasSize[1];
    if (strategy.scaleMode == 3) {
        setLetterbox(target, (cssHeight - windowedCssHeight) / 2, (cssWidth - windowedCssWidth) / 2);
        cssWidth = windowedCssWidth;
        cssHeight = windowedCssHeight
    } else if (strategy.scaleMode == 2) {
        if (cssWidth * windowedRttHeight < windowedRttWidth * cssHeight) {
            var desiredCssHeight = windowedRttHeight * cssWidth / windowedRttWidth;
            setLetterbox(target, (cssHeight - desiredCssHeight) / 2, 0);
            cssHeight = desiredCssHeight
        } else {
            var desiredCssWidth = windowedRttWidth * cssHeight / windowedRttHeight;
            setLetterbox(target, 0, (cssWidth - desiredCssWidth) / 2);
            cssWidth = desiredCssWidth
        }
    }
    target.style.backgroundColor ||= "black";
    document.body.style.backgroundColor ||= "black";
    target.style.width = cssWidth + "px";
    target.style.height = cssHeight + "px";
    if (strategy.filteringMode == 1) {
        target.style.imageRendering = "optimizeSpeed";
        target.style.imageRendering = "-moz-crisp-edges";
        target.style.imageRendering = "-o-crisp-edges";
        target.style.imageRendering = "-webkit-optimize-contrast";
        target.style.imageRendering = "optimize-contrast";
        target.style.imageRendering = "crisp-edges";
        target.style.imageRendering = "pixelated"
    }
    var dpiScale = strategy.canvasResolutionScaleMode == 2 ? devicePixelRatio : 1;
    if (strategy.canvasResolutionScaleMode != 0) {
        var newWidth = cssWidth * dpiScale | 0;
        var newHeight = cssHeight * dpiScale | 0;
        setCanvasElementSize(target, newWidth, newHeight);
        if (target.GLctxObject)
            target.GLctxObject.GLctx.viewport(0, 0, newWidth, newHeight)
    }
    return restoreOldStyle
}
;
var JSEvents_requestFullscreen = (target, strategy) => {
    if (strategy.scaleMode != 0 || strategy.canvasResolutionScaleMode != 0) {
        JSEvents_resizeCanvasForFullscreen(target, strategy)
    }
    if (target.requestFullscreen) {
        target.requestFullscreen()
    } else if (target.webkitRequestFullscreen) {
        target.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    } else {
        return JSEvents.fullscreenEnabled() ? -3 : -1
    }
    currentFullscreenStrategy = strategy;
    if (strategy.canvasResizedCallback) {
        if (strategy.canvasResizedCallbackTargetThread)
            __emscripten_run_callback_on_thread(strategy.canvasResizedCallbackTargetThread, strategy.canvasResizedCallback, 37, 0, strategy.canvasResizedCallbackUserData);
        else
            getWasmTableEntry(strategy.canvasResizedCallback)(37, 0, strategy.canvasResizedCallbackUserData)
    }
    return 0
}
;
function _emscripten_exit_fullscreen() {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(42, 0, 1);
    if (!JSEvents.fullscreenEnabled())
        return -1;
    JSEvents.removeDeferredCalls(JSEvents_requestFullscreen);
    var d = specialHTMLTargets[1];
    if (d.exitFullscreen) {
        d.fullscreenElement && d.exitFullscreen()
    } else if (d.webkitExitFullscreen) {
        d.webkitFullscreenElement && d.webkitExitFullscreen()
    } else {
        return -1
    }
    return 0
}
var requestPointerLock = target => {
    if (target.requestPointerLock) {
        target.requestPointerLock()
    } else {
        if (document.body.requestPointerLock) {
            return -3
        }
        return -1
    }
    return 0
}
;
function _emscripten_exit_pointerlock() {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(45, 0, 1);
    JSEvents.removeDeferredCalls(requestPointerLock);
    if (document.exitPointerLock) {
        document.exitPointerLock()
    } else {
        return -1
    }
    return 0
}
var _emscripten_exit_with_live_runtime = () => {
    runtimeKeepalivePush();
    throw "unwind"
}
;
function _emscripten_fetch_free(id) {
    if (Fetch.xhrs.has(id)) {
        var xhr = Fetch.xhrs.get(id);
        Fetch.xhrs.free(id);
        if (xhr.readyState > 0 && xhr.readyState < 4) {
            xhr.abort()
        }
    }
}
function _emscripten_get_device_pixel_ratio() {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(46, 0, 1);
    return devicePixelRatio
}
function _emscripten_get_element_css_size(target, width, height) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(47, 0, 1, target, width, height);
    target = findEventTarget(target);
    if (!target)
        return -4;
    var rect = getBoundingClientRect(target);
    GROWABLE_HEAP_F64()[width >> 3] = rect.width;
    GROWABLE_HEAP_F64()[height >> 3] = rect.height;
    return 0
}
var fillGamepadEventData = (eventStruct, e) => {
    GROWABLE_HEAP_F64()[eventStruct >> 3] = e.timestamp;
    for (var i = 0; i < e.axes.length; ++i) {
        GROWABLE_HEAP_F64()[eventStruct + i * 8 + 16 >> 3] = e.axes[i]
    }
    for (var i = 0; i < e.buttons.length; ++i) {
        if (typeof e.buttons[i] == "object") {
            GROWABLE_HEAP_F64()[eventStruct + i * 8 + 528 >> 3] = e.buttons[i].value
        } else {
            GROWABLE_HEAP_F64()[eventStruct + i * 8 + 528 >> 3] = e.buttons[i]
        }
    }
    for (var i = 0; i < e.buttons.length; ++i) {
        if (typeof e.buttons[i] == "object") {
            GROWABLE_HEAP_I8()[eventStruct + i + 1040] = e.buttons[i].pressed
        } else {
            GROWABLE_HEAP_I8()[eventStruct + i + 1040] = e.buttons[i] == 1
        }
    }
    GROWABLE_HEAP_I8()[eventStruct + 1104] = e.connected;
    GROWABLE_HEAP_I32()[eventStruct + 1108 >> 2] = e.index;
    GROWABLE_HEAP_I32()[eventStruct + 8 >> 2] = e.axes.length;
    GROWABLE_HEAP_I32()[eventStruct + 12 >> 2] = e.buttons.length;
    stringToUTF8(e.id, eventStruct + 1112, 64);
    stringToUTF8(e.mapping, eventStruct + 1176, 64)
}
;
function _emscripten_get_gamepad_status(index, gamepadState) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(48, 0, 1, index, gamepadState);
    if (!JSEvents.lastGamepadState)
        throw "emscripten_get_gamepad_status() can only be called after having first called emscripten_sample_gamepad_data() and that function has returned EMSCRIPTEN_RESULT_SUCCESS!";
    if (index < 0 || index >= JSEvents.lastGamepadState.length)
        return -5;
    if (!JSEvents.lastGamepadState[index])
        return -7;
    fillGamepadEventData(gamepadState, JSEvents.lastGamepadState[index]);
    return 0
}
var getHeapMax = () => 2147483648;
var _emscripten_get_heap_max = () => getHeapMax();
function _emscripten_get_num_gamepads() {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(49, 0, 1);
    if (!JSEvents.lastGamepadState)
        throw "emscripten_get_num_gamepads() can only be called after having first called emscripten_sample_gamepad_data() and that function has returned EMSCRIPTEN_RESULT_SUCCESS!";
    return JSEvents.lastGamepadState.length
}
function _emscripten_get_screen_size(width, height) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(50, 0, 1, width, height);
    GROWABLE_HEAP_I32()[width >> 2] = screen.width;
    GROWABLE_HEAP_I32()[height >> 2] = screen.height
}
var _glActiveTexture = x0 => GLctx.activeTexture(x0);
var _emscripten_glActiveTexture = _glActiveTexture;
var _glAttachShader = (program, shader) => {
    GLctx.attachShader(GL.programs[program], GL.shaders[shader])
}
;
var _emscripten_glAttachShader = _glAttachShader;
var _glBeginQuery = (target, id) => {
    GLctx.beginQuery(target, GL.queries[id])
}
;
var _emscripten_glBeginQuery = _glBeginQuery;
var _glBeginQueryEXT = (target, id) => {
    GLctx.disjointTimerQueryExt["beginQueryEXT"](target, GL.queries[id])
}
;
var _emscripten_glBeginQueryEXT = _glBeginQueryEXT;
var _glBeginTransformFeedback = x0 => GLctx.beginTransformFeedback(x0);
var _emscripten_glBeginTransformFeedback = _glBeginTransformFeedback;
var _glBindAttribLocation = (program, index, name) => {
    GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name))
}
;
var _emscripten_glBindAttribLocation = _glBindAttribLocation;
var _glBindBuffer = (target, buffer) => {
    if (buffer && !GL.buffers[buffer]) {
        var b = GLctx.createBuffer();
        b.name = buffer;
        GL.buffers[buffer] = b
    }
    if (target == 34962) {
        GLctx.currentArrayBufferBinding = buffer
    } else if (target == 34963) {
        GLctx.currentElementArrayBufferBinding = buffer
    }
    if (target == 35051) {
        GLctx.currentPixelPackBufferBinding = buffer
    } else if (target == 35052) {
        GLctx.currentPixelUnpackBufferBinding = buffer
    }
    GLctx.bindBuffer(target, GL.buffers[buffer])
}
;
var _emscripten_glBindBuffer = _glBindBuffer;
var _glBindBufferBase = (target, index, buffer) => {
    GLctx.bindBufferBase(target, index, GL.buffers[buffer])
}
;
var _emscripten_glBindBufferBase = _glBindBufferBase;
var _glBindBufferRange = (target, index, buffer, offset, ptrsize) => {
    GLctx.bindBufferRange(target, index, GL.buffers[buffer], offset, ptrsize)
}
;
var _emscripten_glBindBufferRange = _glBindBufferRange;
var _glBindFramebuffer = (target, framebuffer) => {
    GLctx.bindFramebuffer(target, framebuffer ? GL.framebuffers[framebuffer] : GL.currentContext.defaultFbo)
}
;
var _emscripten_glBindFramebuffer = _glBindFramebuffer;
var _glBindRenderbuffer = (target, renderbuffer) => {
    GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer])
}
;
var _emscripten_glBindRenderbuffer = _glBindRenderbuffer;
var _glBindSampler = (unit, sampler) => {
    GLctx.bindSampler(unit, GL.samplers[sampler])
}
;
var _emscripten_glBindSampler = _glBindSampler;
var _glBindTexture = (target, texture) => {
    GLctx.bindTexture(target, GL.textures[texture])
}
;
var _emscripten_glBindTexture = _glBindTexture;
var _glBindTransformFeedback = (target, id) => {
    GLctx.bindTransformFeedback(target, GL.transformFeedbacks[id])
}
;
var _emscripten_glBindTransformFeedback = _glBindTransformFeedback;
var _glBindVertexArray = vao => {
    GLctx.bindVertexArray(GL.vaos[vao]);
    var ibo = GLctx.getParameter(34965);
    GLctx.currentElementArrayBufferBinding = ibo ? ibo.name | 0 : 0
}
;
var _emscripten_glBindVertexArray = _glBindVertexArray;
var _glBlendColor = (x0, x1, x2, x3) => GLctx.blendColor(x0, x1, x2, x3);
var _emscripten_glBlendColor = _glBlendColor;
var _glBlendEquation = x0 => GLctx.blendEquation(x0);
var _emscripten_glBlendEquation = _glBlendEquation;
var _glBlendEquationSeparate = (x0, x1) => GLctx.blendEquationSeparate(x0, x1);
var _emscripten_glBlendEquationSeparate = _glBlendEquationSeparate;
var _glBlendFunc = (x0, x1) => GLctx.blendFunc(x0, x1);
var _emscripten_glBlendFunc = _glBlendFunc;
var _glBlendFuncSeparate = (x0, x1, x2, x3) => GLctx.blendFuncSeparate(x0, x1, x2, x3);
var _emscripten_glBlendFuncSeparate = _glBlendFuncSeparate;
var _glBlitFramebuffer = (x0, x1, x2, x3, x4, x5, x6, x7, x8, x9) => GLctx.blitFramebuffer(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9);
var _emscripten_glBlitFramebuffer = _glBlitFramebuffer;
var _glBufferData = (target, size, data, usage) => {
    if (true) {
        if (data && size) {
            GLctx.bufferData(target, GROWABLE_HEAP_U8(), usage, data, size)
        } else {
            GLctx.bufferData(target, size, usage)
        }
        return
    }
}
;
var _emscripten_glBufferData = _glBufferData;
var _glBufferSubData = (target, offset, size, data) => {
    if (true) {
        size && GLctx.bufferSubData(target, offset, GROWABLE_HEAP_U8(), data, size);
        return
    }
}
;
var _emscripten_glBufferSubData = _glBufferSubData;
var _glCheckFramebufferStatus = x0 => GLctx.checkFramebufferStatus(x0);
var _emscripten_glCheckFramebufferStatus = _glCheckFramebufferStatus;
var _glClear = x0 => GLctx.clear(x0);
var _emscripten_glClear = _glClear;
var _glClearBufferfi = (x0, x1, x2, x3) => GLctx.clearBufferfi(x0, x1, x2, x3);
var _emscripten_glClearBufferfi = _glClearBufferfi;
var _glClearBufferfv = (buffer, drawbuffer, value) => {
    GLctx.clearBufferfv(buffer, drawbuffer, GROWABLE_HEAP_F32(), value >> 2)
}
;
var _emscripten_glClearBufferfv = _glClearBufferfv;
var _glClearBufferiv = (buffer, drawbuffer, value) => {
    GLctx.clearBufferiv(buffer, drawbuffer, GROWABLE_HEAP_I32(), value >> 2)
}
;
var _emscripten_glClearBufferiv = _glClearBufferiv;
var _glClearBufferuiv = (buffer, drawbuffer, value) => {
    GLctx.clearBufferuiv(buffer, drawbuffer, GROWABLE_HEAP_U32(), value >> 2)
}
;
var _emscripten_glClearBufferuiv = _glClearBufferuiv;
var _glClearColor = (x0, x1, x2, x3) => GLctx.clearColor(x0, x1, x2, x3);
var _emscripten_glClearColor = _glClearColor;
var _glClearDepthf = x0 => GLctx.clearDepth(x0);
var _emscripten_glClearDepthf = _glClearDepthf;
var _glClearStencil = x0 => GLctx.clearStencil(x0);
var _emscripten_glClearStencil = _glClearStencil;
var _glClientWaitSync = (sync, flags, timeout) => {
    timeout = Number(timeout);
    return GLctx.clientWaitSync(GL.syncs[sync], flags, timeout)
}
;
var _emscripten_glClientWaitSync = _glClientWaitSync;
var _glColorMask = (red, green, blue, alpha) => {
    GLctx.colorMask(!!red, !!green, !!blue, !!alpha)
}
;
var _emscripten_glColorMask = _glColorMask;
var _glCompileShader = shader => {
    GLctx.compileShader(GL.shaders[shader]);
    var log = (GLctx.getShaderInfoLog(GL.shaders[shader]) || "").trim();
    if (log)
        dbg(`glCompileShader: ${log}`)
}
;
var _emscripten_glCompileShader = _glCompileShader;
var _glCompressedTexImage2D = (target, level, internalFormat, width, height, border, imageSize, data) => {
    if (true) {
        if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
            GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, imageSize, data);
            return
        }
        GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, GROWABLE_HEAP_U8(), data, imageSize);
        return
    }
}
;
var _emscripten_glCompressedTexImage2D = _glCompressedTexImage2D;
var _glCompressedTexImage3D = (target, level, internalFormat, width, height, depth, border, imageSize, data) => {
    if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx.compressedTexImage3D(target, level, internalFormat, width, height, depth, border, imageSize, data)
    } else {
        GLctx.compressedTexImage3D(target, level, internalFormat, width, height, depth, border, GROWABLE_HEAP_U8(), data, imageSize)
    }
}
;
var _emscripten_glCompressedTexImage3D = _glCompressedTexImage3D;
var _glCompressedTexSubImage2D = (target, level, xoffset, yoffset, width, height, format, imageSize, data) => {
    if (true) {
        if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
            GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, imageSize, data);
            return
        }
        GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, GROWABLE_HEAP_U8(), data, imageSize);
        return
    }
}
;
var _emscripten_glCompressedTexSubImage2D = _glCompressedTexSubImage2D;
var _glCompressedTexSubImage3D = (target, level, xoffset, yoffset, zoffset, width, height, depth, format, imageSize, data) => {
    if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx.compressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, imageSize, data)
    } else {
        GLctx.compressedTexSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, GROWABLE_HEAP_U8(), data, imageSize)
    }
}
;
var _emscripten_glCompressedTexSubImage3D = _glCompressedTexSubImage3D;
var _glCopyBufferSubData = (x0, x1, x2, x3, x4) => GLctx.copyBufferSubData(x0, x1, x2, x3, x4);
var _emscripten_glCopyBufferSubData = _glCopyBufferSubData;
var _glCopyTexImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) => GLctx.copyTexImage2D(x0, x1, x2, x3, x4, x5, x6, x7);
var _emscripten_glCopyTexImage2D = _glCopyTexImage2D;
var _glCopyTexSubImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) => GLctx.copyTexSubImage2D(x0, x1, x2, x3, x4, x5, x6, x7);
var _emscripten_glCopyTexSubImage2D = _glCopyTexSubImage2D;
var _glCopyTexSubImage3D = (x0, x1, x2, x3, x4, x5, x6, x7, x8) => GLctx.copyTexSubImage3D(x0, x1, x2, x3, x4, x5, x6, x7, x8);
var _emscripten_glCopyTexSubImage3D = _glCopyTexSubImage3D;
var _glCreateProgram = () => {
    var id = GL.getNewId(GL.programs);
    var program = GLctx.createProgram();
    program.name = id;
    program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
    program.uniformIdCounter = 1;
    GL.programs[id] = program;
    return id
}
;
var _emscripten_glCreateProgram = _glCreateProgram;
var _glCreateShader = shaderType => {
    var id = GL.getNewId(GL.shaders);
    GL.shaders[id] = GLctx.createShader(shaderType);
    return id
}
;
var _emscripten_glCreateShader = _glCreateShader;
var _glCullFace = x0 => GLctx.cullFace(x0);
var _emscripten_glCullFace = _glCullFace;
var _glDeleteBuffers = (n, buffers) => {
    for (var i = 0; i < n; i++) {
        var id = GROWABLE_HEAP_I32()[buffers + i * 4 >> 2];
        var buffer = GL.buffers[id];
        if (!buffer)
            continue;
        GLctx.deleteBuffer(buffer);
        buffer.name = 0;
        GL.buffers[id] = null;
        if (id == GLctx.currentArrayBufferBinding)
            GLctx.currentArrayBufferBinding = 0;
        if (id == GLctx.currentElementArrayBufferBinding)
            GLctx.currentElementArrayBufferBinding = 0;
        if (id == GLctx.currentPixelPackBufferBinding)
            GLctx.currentPixelPackBufferBinding = 0;
        if (id == GLctx.currentPixelUnpackBufferBinding)
            GLctx.currentPixelUnpackBufferBinding = 0
    }
}
;
var _emscripten_glDeleteBuffers = _glDeleteBuffers;
var _glDeleteFramebuffers = (n, framebuffers) => {
    for (var i = 0; i < n; ++i) {
        var id = GROWABLE_HEAP_I32()[framebuffers + i * 4 >> 2];
        var framebuffer = GL.framebuffers[id];
        if (!framebuffer)
            continue;
        GLctx.deleteFramebuffer(framebuffer);
        framebuffer.name = 0;
        GL.framebuffers[id] = null
    }
}
;
var _emscripten_glDeleteFramebuffers = _glDeleteFramebuffers;
var _glDeleteProgram = id => {
    if (!id)
        return;
    var program = GL.programs[id];
    if (!program) {
        GL.recordError(1281);
        return
    }
    GLctx.deleteProgram(program);
    program.name = 0;
    GL.programs[id] = null
}
;
var _emscripten_glDeleteProgram = _glDeleteProgram;
var _glDeleteQueries = (n, ids) => {
    for (var i = 0; i < n; i++) {
        var id = GROWABLE_HEAP_I32()[ids + i * 4 >> 2];
        var query = GL.queries[id];
        if (!query)
            continue;
        GLctx.deleteQuery(query);
        GL.queries[id] = null
    }
}
;
var _emscripten_glDeleteQueries = _glDeleteQueries;
var _glDeleteQueriesEXT = (n, ids) => {
    for (var i = 0; i < n; i++) {
        var id = GROWABLE_HEAP_I32()[ids + i * 4 >> 2];
        var query = GL.queries[id];
        if (!query)
            continue;
        GLctx.disjointTimerQueryExt["deleteQueryEXT"](query);
        GL.queries[id] = null
    }
}
;
var _emscripten_glDeleteQueriesEXT = _glDeleteQueriesEXT;
var _glDeleteRenderbuffers = (n, renderbuffers) => {
    for (var i = 0; i < n; i++) {
        var id = GROWABLE_HEAP_I32()[renderbuffers + i * 4 >> 2];
        var renderbuffer = GL.renderbuffers[id];
        if (!renderbuffer)
            continue;
        GLctx.deleteRenderbuffer(renderbuffer);
        renderbuffer.name = 0;
        GL.renderbuffers[id] = null
    }
}
;
var _emscripten_glDeleteRenderbuffers = _glDeleteRenderbuffers;
var _glDeleteSamplers = (n, samplers) => {
    for (var i = 0; i < n; i++) {
        var id = GROWABLE_HEAP_I32()[samplers + i * 4 >> 2];
        var sampler = GL.samplers[id];
        if (!sampler)
            continue;
        GLctx.deleteSampler(sampler);
        sampler.name = 0;
        GL.samplers[id] = null
    }
}
;
var _emscripten_glDeleteSamplers = _glDeleteSamplers;
var _glDeleteShader = id => {
    if (!id)
        return;
    var shader = GL.shaders[id];
    if (!shader) {
        GL.recordError(1281);
        return
    }
    GLctx.deleteShader(shader);
    GL.shaders[id] = null
}
;
var _emscripten_glDeleteShader = _glDeleteShader;
var _glDeleteSync = id => {
    if (!id)
        return;
    var sync = GL.syncs[id];
    if (!sync) {
        GL.recordError(1281);
        return
    }
    GLctx.deleteSync(sync);
    sync.name = 0;
    GL.syncs[id] = null
}
;
var _emscripten_glDeleteSync = _glDeleteSync;
var _glDeleteTextures = (n, textures) => {
    for (var i = 0; i < n; i++) {
        var id = GROWABLE_HEAP_I32()[textures + i * 4 >> 2];
        var texture = GL.textures[id];
        if (!texture)
            continue;
        GLctx.deleteTexture(texture);
        texture.name = 0;
        GL.textures[id] = null
    }
}
;
var _emscripten_glDeleteTextures = _glDeleteTextures;
var _glDeleteTransformFeedbacks = (n, ids) => {
    for (var i = 0; i < n; i++) {
        var id = GROWABLE_HEAP_I32()[ids + i * 4 >> 2];
        var transformFeedback = GL.transformFeedbacks[id];
        if (!transformFeedback)
            continue;
        GLctx.deleteTransformFeedback(transformFeedback);
        transformFeedback.name = 0;
        GL.transformFeedbacks[id] = null
    }
}
;
var _emscripten_glDeleteTransformFeedbacks = _glDeleteTransformFeedbacks;
var _glDeleteVertexArrays = (n, vaos) => {
    for (var i = 0; i < n; i++) {
        var id = GROWABLE_HEAP_I32()[vaos + i * 4 >> 2];
        GLctx.deleteVertexArray(GL.vaos[id]);
        GL.vaos[id] = null
    }
}
;
var _emscripten_glDeleteVertexArrays = _glDeleteVertexArrays;
var _glDepthFunc = x0 => GLctx.depthFunc(x0);
var _emscripten_glDepthFunc = _glDepthFunc;
var _glDepthMask = flag => {
    GLctx.depthMask(!!flag)
}
;
var _emscripten_glDepthMask = _glDepthMask;
var _glDepthRangef = (x0, x1) => GLctx.depthRange(x0, x1);
var _emscripten_glDepthRangef = _glDepthRangef;
var _glDetachShader = (program, shader) => {
    GLctx.detachShader(GL.programs[program], GL.shaders[shader])
}
;
var _emscripten_glDetachShader = _glDetachShader;
var _glDisable = x0 => GLctx.disable(x0);
var _emscripten_glDisable = _glDisable;
var _glDisableVertexAttribArray = index => {
    var cb = GL.currentContext.clientBuffers[index];
    cb.enabled = false;
    GLctx.disableVertexAttribArray(index)
}
;
var _emscripten_glDisableVertexAttribArray = _glDisableVertexAttribArray;
var _glDrawArrays = (mode, first, count) => {
    GL.preDrawHandleClientVertexAttribBindings(first + count);
    GLctx.drawArrays(mode, first, count);
    GL.postDrawHandleClientVertexAttribBindings()
}
;
var _emscripten_glDrawArrays = _glDrawArrays;
var _glDrawArraysInstanced = (mode, first, count, primcount) => {
    GLctx.drawArraysInstanced(mode, first, count, primcount)
}
;
var _emscripten_glDrawArraysInstanced = _glDrawArraysInstanced;
var tempFixedLengthArray = [];
var _glDrawBuffers = (n, bufs) => {
    var bufArray = tempFixedLengthArray[n];
    for (var i = 0; i < n; i++) {
        bufArray[i] = GROWABLE_HEAP_I32()[bufs + i * 4 >> 2]
    }
    GLctx.drawBuffers(bufArray)
}
;
var _emscripten_glDrawBuffers = _glDrawBuffers;
var _glDrawElements = (mode, count, type, indices) => {
    var buf;
    var vertexes = 0;
    if (!GLctx.currentElementArrayBufferBinding) {
        var size = GL.calcBufLength(1, type, 0, count);
        buf = GL.getTempIndexBuffer(size);
        GLctx.bindBuffer(34963, buf);
        GLctx.bufferSubData(34963, 0, GROWABLE_HEAP_U8().subarray(indices, indices + size));
        if (count > 0) {
            for (var i = 0; i < GL.currentContext.maxVertexAttribs; ++i) {
                var cb = GL.currentContext.clientBuffers[i];
                if (cb.clientside && cb.enabled) {
                    let arrayClass;
                    switch (type) {
                    case 5121:
                        arrayClass = Uint8Array;
                        break;
                    case 5123:
                        arrayClass = Uint16Array;
                        break;
                    case 5125:
                        arrayClass = Uint32Array;
                        break;
                    default:
                        GL.recordError(1282);
                        return
                    }
                    vertexes = new arrayClass(GROWABLE_HEAP_U8().buffer,indices,count).reduce( (max, current) => Math.max(max, current)) + 1;
                    break
                }
            }
        }
        indices = 0
    }
    GL.preDrawHandleClientVertexAttribBindings(vertexes);
    GLctx.drawElements(mode, count, type, indices);
    GL.postDrawHandleClientVertexAttribBindings(count);
    if (!GLctx.currentElementArrayBufferBinding) {
        GLctx.bindBuffer(34963, null)
    }
}
;
var _emscripten_glDrawElements = _glDrawElements;
var _glDrawElementsInstanced = (mode, count, type, indices, primcount) => {
    GLctx.drawElementsInstanced(mode, count, type, indices, primcount)
}
;
var _emscripten_glDrawElementsInstanced = _glDrawElementsInstanced;
var _glDrawRangeElements = (mode, start, end, count, type, indices) => {
    _glDrawElements(mode, count, type, indices)
}
;
var _emscripten_glDrawRangeElements = _glDrawRangeElements;
var _glEnable = x0 => GLctx.enable(x0);
var _emscripten_glEnable = _glEnable;
var _glEnableVertexAttribArray = index => {
    var cb = GL.currentContext.clientBuffers[index];
    cb.enabled = true;
    GLctx.enableVertexAttribArray(index)
}
;
var _emscripten_glEnableVertexAttribArray = _glEnableVertexAttribArray;
var _glEndQuery = x0 => GLctx.endQuery(x0);
var _emscripten_glEndQuery = _glEndQuery;
var _glEndQueryEXT = target => {
    GLctx.disjointTimerQueryExt["endQueryEXT"](target)
}
;
var _emscripten_glEndQueryEXT = _glEndQueryEXT;
var _glEndTransformFeedback = () => GLctx.endTransformFeedback();
var _emscripten_glEndTransformFeedback = _glEndTransformFeedback;
var _glFenceSync = (condition, flags) => {
    var sync = GLctx.fenceSync(condition, flags);
    if (sync) {
        var id = GL.getNewId(GL.syncs);
        sync.name = id;
        GL.syncs[id] = sync;
        return id
    }
    return 0
}
;
var _emscripten_glFenceSync = _glFenceSync;
var _glFinish = () => GLctx.finish();
var _emscripten_glFinish = _glFinish;
var _glFlush = () => GLctx.flush();
var _emscripten_glFlush = _glFlush;
var emscriptenWebGLGetBufferBinding = target => {
    switch (target) {
    case 34962:
        target = 34964;
        break;
    case 34963:
        target = 34965;
        break;
    case 35051:
        target = 35053;
        break;
    case 35052:
        target = 35055;
        break;
    case 35982:
        target = 35983;
        break;
    case 36662:
        target = 36662;
        break;
    case 36663:
        target = 36663;
        break;
    case 35345:
        target = 35368;
        break
    }
    var buffer = GLctx.getParameter(target);
    if (buffer)
        return buffer.name | 0;
    else
        return 0
}
;
var emscriptenWebGLValidateMapBufferTarget = target => {
    switch (target) {
    case 34962:
    case 34963:
    case 36662:
    case 36663:
    case 35051:
    case 35052:
    case 35882:
    case 35982:
    case 35345:
        return true;
    default:
        return false
    }
}
;
var _glFlushMappedBufferRange = (target, offset, length) => {
    if (!emscriptenWebGLValidateMapBufferTarget(target)) {
        GL.recordError(1280);
        err("GL_INVALID_ENUM in glFlushMappedBufferRange");
        return
    }
    var mapping = GL.mappedBuffers[emscriptenWebGLGetBufferBinding(target)];
    if (!mapping) {
        GL.recordError(1282);
        err("buffer was never mapped in glFlushMappedBufferRange");
        return
    }
    if (!(mapping.access & 16)) {
        GL.recordError(1282);
        err("buffer was not mapped with GL_MAP_FLUSH_EXPLICIT_BIT in glFlushMappedBufferRange");
        return
    }
    if (offset < 0 || length < 0 || offset + length > mapping.length) {
        GL.recordError(1281);
        err("invalid range in glFlushMappedBufferRange");
        return
    }
    GLctx.bufferSubData(target, mapping.offset, GROWABLE_HEAP_U8().subarray(mapping.mem + offset, mapping.mem + offset + length))
}
;
var _emscripten_glFlushMappedBufferRange = _glFlushMappedBufferRange;
var _glFramebufferRenderbuffer = (target, attachment, renderbuffertarget, renderbuffer) => {
    GLctx.framebufferRenderbuffer(target, attachment, renderbuffertarget, GL.renderbuffers[renderbuffer])
}
;
var _emscripten_glFramebufferRenderbuffer = _glFramebufferRenderbuffer;
var _glFramebufferTexture2D = (target, attachment, textarget, texture, level) => {
    GLctx.framebufferTexture2D(target, attachment, textarget, GL.textures[texture], level)
}
;
var _emscripten_glFramebufferTexture2D = _glFramebufferTexture2D;
var _glFramebufferTextureLayer = (target, attachment, texture, level, layer) => {
    GLctx.framebufferTextureLayer(target, attachment, GL.textures[texture], level, layer)
}
;
var _emscripten_glFramebufferTextureLayer = _glFramebufferTextureLayer;
var _glFrontFace = x0 => GLctx.frontFace(x0);
var _emscripten_glFrontFace = _glFrontFace;
var _glGenBuffers = (n, buffers) => {
    GL.genObject(n, buffers, "createBuffer", GL.buffers)
}
;
var _emscripten_glGenBuffers = _glGenBuffers;
var _glGenFramebuffers = (n, ids) => {
    GL.genObject(n, ids, "createFramebuffer", GL.framebuffers)
}
;
var _emscripten_glGenFramebuffers = _glGenFramebuffers;
var _glGenQueries = (n, ids) => {
    GL.genObject(n, ids, "createQuery", GL.queries)
}
;
var _emscripten_glGenQueries = _glGenQueries;
var _glGenQueriesEXT = (n, ids) => {
    for (var i = 0; i < n; i++) {
        var query = GLctx.disjointTimerQueryExt["createQueryEXT"]();
        if (!query) {
            GL.recordError(1282);
            while (i < n)
                GROWABLE_HEAP_I32()[ids + i++ * 4 >> 2] = 0;
            return
        }
        var id = GL.getNewId(GL.queries);
        query.name = id;
        GL.queries[id] = query;
        GROWABLE_HEAP_I32()[ids + i * 4 >> 2] = id
    }
}
;
var _emscripten_glGenQueriesEXT = _glGenQueriesEXT;
var _glGenRenderbuffers = (n, renderbuffers) => {
    GL.genObject(n, renderbuffers, "createRenderbuffer", GL.renderbuffers)
}
;
var _emscripten_glGenRenderbuffers = _glGenRenderbuffers;
var _glGenSamplers = (n, samplers) => {
    GL.genObject(n, samplers, "createSampler", GL.samplers)
}
;
var _emscripten_glGenSamplers = _glGenSamplers;
var _glGenTextures = (n, textures) => {
    GL.genObject(n, textures, "createTexture", GL.textures)
}
;
var _emscripten_glGenTextures = _glGenTextures;
var _glGenTransformFeedbacks = (n, ids) => {
    GL.genObject(n, ids, "createTransformFeedback", GL.transformFeedbacks)
}
;
var _emscripten_glGenTransformFeedbacks = _glGenTransformFeedbacks;
var _glGenVertexArrays = (n, arrays) => {
    GL.genObject(n, arrays, "createVertexArray", GL.vaos)
}
;
var _emscripten_glGenVertexArrays = _glGenVertexArrays;
var _glGenerateMipmap = x0 => GLctx.generateMipmap(x0);
var _emscripten_glGenerateMipmap = _glGenerateMipmap;
var __glGetActiveAttribOrUniform = (funcName, program, index, bufSize, length, size, type, name) => {
    program = GL.programs[program];
    var info = GLctx[funcName](program, index);
    if (info) {
        var numBytesWrittenExclNull = name && stringToUTF8(info.name, name, bufSize);
        if (length)
            GROWABLE_HEAP_I32()[length >> 2] = numBytesWrittenExclNull;
        if (size)
            GROWABLE_HEAP_I32()[size >> 2] = info.size;
        if (type)
            GROWABLE_HEAP_I32()[type >> 2] = info.type
    }
}
;
var _glGetActiveAttrib = (program, index, bufSize, length, size, type, name) => __glGetActiveAttribOrUniform("getActiveAttrib", program, index, bufSize, length, size, type, name);
var _emscripten_glGetActiveAttrib = _glGetActiveAttrib;
var _glGetActiveUniform = (program, index, bufSize, length, size, type, name) => __glGetActiveAttribOrUniform("getActiveUniform", program, index, bufSize, length, size, type, name);
var _emscripten_glGetActiveUniform = _glGetActiveUniform;
var _glGetActiveUniformBlockName = (program, uniformBlockIndex, bufSize, length, uniformBlockName) => {
    program = GL.programs[program];
    var result = GLctx.getActiveUniformBlockName(program, uniformBlockIndex);
    if (!result)
        return;
    if (uniformBlockName && bufSize > 0) {
        var numBytesWrittenExclNull = stringToUTF8(result, uniformBlockName, bufSize);
        if (length)
            GROWABLE_HEAP_I32()[length >> 2] = numBytesWrittenExclNull
    } else {
        if (length)
            GROWABLE_HEAP_I32()[length >> 2] = 0
    }
}
;
var _emscripten_glGetActiveUniformBlockName = _glGetActiveUniformBlockName;
var _glGetActiveUniformBlockiv = (program, uniformBlockIndex, pname, params) => {
    if (!params) {
        GL.recordError(1281);
        return
    }
    program = GL.programs[program];
    if (pname == 35393) {
        var name = GLctx.getActiveUniformBlockName(program, uniformBlockIndex);
        GROWABLE_HEAP_I32()[params >> 2] = name.length + 1;
        return
    }
    var result = GLctx.getActiveUniformBlockParameter(program, uniformBlockIndex, pname);
    if (result === null)
        return;
    if (pname == 35395) {
        for (var i = 0; i < result.length; i++) {
            GROWABLE_HEAP_I32()[params + i * 4 >> 2] = result[i]
        }
    } else {
        GROWABLE_HEAP_I32()[params >> 2] = result
    }
}
;
var _emscripten_glGetActiveUniformBlockiv = _glGetActiveUniformBlockiv;
var _glGetActiveUniformsiv = (program, uniformCount, uniformIndices, pname, params) => {
    if (!params) {
        GL.recordError(1281);
        return
    }
    if (uniformCount > 0 && uniformIndices == 0) {
        GL.recordError(1281);
        return
    }
    program = GL.programs[program];
    var ids = [];
    for (var i = 0; i < uniformCount; i++) {
        ids.push(GROWABLE_HEAP_I32()[uniformIndices + i * 4 >> 2])
    }
    var result = GLctx.getActiveUniforms(program, ids, pname);
    if (!result)
        return;
    var len = result.length;
    for (var i = 0; i < len; i++) {
        GROWABLE_HEAP_I32()[params + i * 4 >> 2] = result[i]
    }
}
;
var _emscripten_glGetActiveUniformsiv = _glGetActiveUniformsiv;
var _glGetAttachedShaders = (program, maxCount, count, shaders) => {
    var result = GLctx.getAttachedShaders(GL.programs[program]);
    var len = result.length;
    if (len > maxCount) {
        len = maxCount
    }
    GROWABLE_HEAP_I32()[count >> 2] = len;
    for (var i = 0; i < len; ++i) {
        var id = GL.shaders.indexOf(result[i]);
        GROWABLE_HEAP_I32()[shaders + i * 4 >> 2] = id
    }
}
;
var _emscripten_glGetAttachedShaders = _glGetAttachedShaders;
var _glGetAttribLocation = (program, name) => GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
var _emscripten_glGetAttribLocation = _glGetAttribLocation;
var readI53FromI64 = ptr => GROWABLE_HEAP_U32()[ptr >> 2] + GROWABLE_HEAP_I32()[ptr + 4 >> 2] * 4294967296;
var readI53FromU64 = ptr => GROWABLE_HEAP_U32()[ptr >> 2] + GROWABLE_HEAP_U32()[ptr + 4 >> 2] * 4294967296;
var writeI53ToI64 = (ptr, num) => {
    GROWABLE_HEAP_U32()[ptr >> 2] = num;
    var lower = GROWABLE_HEAP_U32()[ptr >> 2];
    GROWABLE_HEAP_U32()[ptr + 4 >> 2] = (num - lower) / 4294967296;
    var deserialized = num >= 0 ? readI53FromU64(ptr) : readI53FromI64(ptr);
    var offset = ptr >> 2;
    if (deserialized != num)
        warnOnce(`writeI53ToI64() out of range: serialized JS Number ${num} to Wasm heap as bytes lo=${ptrToString(GROWABLE_HEAP_U32()[offset])}, hi=${ptrToString(GROWABLE_HEAP_U32()[offset + 1])}, which deserializes back to ${deserialized} instead!`)
}
;
var webglGetExtensions = () => {
    var exts = getEmscriptenSupportedExtensions(GLctx);
    exts = exts.concat(exts.map(e => "GL_" + e));
    return exts
}
;
var emscriptenWebGLGet = (name_, p, type) => {
    if (!p) {
        GL.recordError(1281);
        return
    }
    var ret = undefined;
    switch (name_) {
    case 36346:
        ret = 1;
        break;
    case 36344:
        if (type != 0 && type != 1) {
            GL.recordError(1280)
        }
        return;
    case 34814:
    case 36345:
        ret = 0;
        break;
    case 34466:
        var formats = GLctx.getParameter(34467);
        ret = formats ? formats.length : 0;
        break;
    case 33309:
        if (GL.currentContext.version < 2) {
            GL.recordError(1282);
            return
        }
        ret = webglGetExtensions().length;
        break;
    case 33307:
    case 33308:
        if (GL.currentContext.version < 2) {
            GL.recordError(1280);
            return
        }
        ret = name_ == 33307 ? 3 : 0;
        break
    }
    if (ret === undefined) {
        var result = GLctx.getParameter(name_);
        switch (typeof result) {
        case "number":
            ret = result;
            break;
        case "boolean":
            ret = result ? 1 : 0;
            break;
        case "string":
            GL.recordError(1280);
            return;
        case "object":
            if (result === null) {
                switch (name_) {
                case 34964:
                case 35725:
                case 34965:
                case 36006:
                case 36007:
                case 32873:
                case 34229:
                case 36662:
                case 36663:
                case 35053:
                case 35055:
                case 36010:
                case 35097:
                case 35869:
                case 32874:
                case 36389:
                case 35983:
                case 35368:
                case 34068:
                    {
                        ret = 0;
                        break
                    }
                default:
                    {
                        GL.recordError(1280);
                        return
                    }
                }
            } else if (result instanceof Float32Array || result instanceof Uint32Array || result instanceof Int32Array || result instanceof Array) {
                for (var i = 0; i < result.length; ++i) {
                    switch (type) {
                    case 0:
                        GROWABLE_HEAP_I32()[p + i * 4 >> 2] = result[i];
                        break;
                    case 2:
                        GROWABLE_HEAP_F32()[p + i * 4 >> 2] = result[i];
                        break;
                    case 4:
                        GROWABLE_HEAP_I8()[p + i] = result[i] ? 1 : 0;
                        break
                    }
                }
                return
            } else {
                try {
                    ret = result.name | 0
                } catch (e) {
                    GL.recordError(1280);
                    err(`GL_INVALID_ENUM in glGet${type}v: Unknown object returned from WebGL getParameter(${name_})! (error: ${e})`);
                    return
                }
            }
            break;
        default:
            GL.recordError(1280);
            err(`GL_INVALID_ENUM in glGet${type}v: Native code calling glGet${type}v(${name_}) and it returns ${result} of type ${typeof result}!`);
            return
        }
    }
    switch (type) {
    case 1:
        writeI53ToI64(p, ret);
        break;
    case 0:
        GROWABLE_HEAP_I32()[p >> 2] = ret;
        break;
    case 2:
        GROWABLE_HEAP_F32()[p >> 2] = ret;
        break;
    case 4:
        GROWABLE_HEAP_I8()[p] = ret ? 1 : 0;
        break
    }
}
;
var _glGetBooleanv = (name_, p) => emscriptenWebGLGet(name_, p, 4);
var _emscripten_glGetBooleanv = _glGetBooleanv;
var _glGetBufferParameteri64v = (target, value, data) => {
    if (!data) {
        GL.recordError(1281);
        return
    }
    writeI53ToI64(data, GLctx.getBufferParameter(target, value))
}
;
var _emscripten_glGetBufferParameteri64v = _glGetBufferParameteri64v;
var _glGetBufferParameteriv = (target, value, data) => {
    if (!data) {
        GL.recordError(1281);
        return
    }
    GROWABLE_HEAP_I32()[data >> 2] = GLctx.getBufferParameter(target, value)
}
;
var _emscripten_glGetBufferParameteriv = _glGetBufferParameteriv;
var _glGetBufferPointerv = (target, pname, params) => {
    if (pname == 35005) {
        var ptr = 0;
        var mappedBuffer = GL.mappedBuffers[emscriptenWebGLGetBufferBinding(target)];
        if (mappedBuffer) {
            ptr = mappedBuffer.mem
        }
        GROWABLE_HEAP_I32()[params >> 2] = ptr
    } else {
        GL.recordError(1280);
        err("GL_INVALID_ENUM in glGetBufferPointerv")
    }
}
;
var _emscripten_glGetBufferPointerv = _glGetBufferPointerv;
var _glGetError = () => {
    var error = GLctx.getError() || GL.lastError;
    GL.lastError = 0;
    return error
}
;
var _emscripten_glGetError = _glGetError;
var _glGetFloatv = (name_, p) => emscriptenWebGLGet(name_, p, 2);
var _emscripten_glGetFloatv = _glGetFloatv;
var _glGetFragDataLocation = (program, name) => GLctx.getFragDataLocation(GL.programs[program], UTF8ToString(name));
var _emscripten_glGetFragDataLocation = _glGetFragDataLocation;
var _glGetFramebufferAttachmentParameteriv = (target, attachment, pname, params) => {
    var result = GLctx.getFramebufferAttachmentParameter(target, attachment, pname);
    if (result instanceof WebGLRenderbuffer || result instanceof WebGLTexture) {
        result = result.name | 0
    }
    GROWABLE_HEAP_I32()[params >> 2] = result
}
;
var _emscripten_glGetFramebufferAttachmentParameteriv = _glGetFramebufferAttachmentParameteriv;
var emscriptenWebGLGetIndexed = (target, index, data, type) => {
    if (!data) {
        GL.recordError(1281);
        return
    }
    var result = GLctx.getIndexedParameter(target, index);
    var ret;
    switch (typeof result) {
    case "boolean":
        ret = result ? 1 : 0;
        break;
    case "number":
        ret = result;
        break;
    case "object":
        if (result === null) {
            switch (target) {
            case 35983:
            case 35368:
                ret = 0;
                break;
            default:
                {
                    GL.recordError(1280);
                    return
                }
            }
        } else if (result instanceof WebGLBuffer) {
            ret = result.name | 0
        } else {
            GL.recordError(1280);
            return
        }
        break;
    default:
        GL.recordError(1280);
        return
    }
    switch (type) {
    case 1:
        writeI53ToI64(data, ret);
        break;
    case 0:
        GROWABLE_HEAP_I32()[data >> 2] = ret;
        break;
    case 2:
        GROWABLE_HEAP_F32()[data >> 2] = ret;
        break;
    case 4:
        GROWABLE_HEAP_I8()[data] = ret ? 1 : 0;
        break;
    default:
        throw "internal emscriptenWebGLGetIndexed() error, bad type: " + type
    }
}
;
var _glGetInteger64i_v = (target, index, data) => emscriptenWebGLGetIndexed(target, index, data, 1);
var _emscripten_glGetInteger64i_v = _glGetInteger64i_v;
var _glGetInteger64v = (name_, p) => {
    emscriptenWebGLGet(name_, p, 1)
}
;
var _emscripten_glGetInteger64v = _glGetInteger64v;
var _glGetIntegeri_v = (target, index, data) => emscriptenWebGLGetIndexed(target, index, data, 0);
var _emscripten_glGetIntegeri_v = _glGetIntegeri_v;
var _glGetIntegerv = (name_, p) => emscriptenWebGLGet(name_, p, 0);
var _emscripten_glGetIntegerv = _glGetIntegerv;
var _glGetInternalformativ = (target, internalformat, pname, bufSize, params) => {
    if (bufSize < 0) {
        GL.recordError(1281);
        return
    }
    if (!params) {
        GL.recordError(1281);
        return
    }
    var ret = GLctx.getInternalformatParameter(target, internalformat, pname);
    if (ret === null)
        return;
    for (var i = 0; i < ret.length && i < bufSize; ++i) {
        GROWABLE_HEAP_I32()[params + i * 4 >> 2] = ret[i]
    }
}
;
var _emscripten_glGetInternalformativ = _glGetInternalformativ;
var _glGetProgramBinary = (program, bufSize, length, binaryFormat, binary) => {
    GL.recordError(1282)
}
;
var _emscripten_glGetProgramBinary = _glGetProgramBinary;
var _glGetProgramInfoLog = (program, maxLength, length, infoLog) => {
    var log = GLctx.getProgramInfoLog(GL.programs[program]);
    if (log === null)
        log = "(unknown error)";
    var numBytesWrittenExclNull = maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0;
    if (length)
        GROWABLE_HEAP_I32()[length >> 2] = numBytesWrittenExclNull
}
;
var _emscripten_glGetProgramInfoLog = _glGetProgramInfoLog;
var _glGetProgramiv = (program, pname, p) => {
    if (!p) {
        GL.recordError(1281);
        return
    }
    if (program >= GL.counter) {
        GL.recordError(1281);
        return
    }
    program = GL.programs[program];
    if (pname == 35716) {
        var log = GLctx.getProgramInfoLog(program);
        if (log === null)
            log = "(unknown error)";
        GROWABLE_HEAP_I32()[p >> 2] = log.length + 1
    } else if (pname == 35719) {
        if (!program.maxUniformLength) {
            var numActiveUniforms = GLctx.getProgramParameter(program, 35718);
            for (var i = 0; i < numActiveUniforms; ++i) {
                program.maxUniformLength = Math.max(program.maxUniformLength, GLctx.getActiveUniform(program, i).name.length + 1)
            }
        }
        GROWABLE_HEAP_I32()[p >> 2] = program.maxUniformLength
    } else if (pname == 35722) {
        if (!program.maxAttributeLength) {
            var numActiveAttributes = GLctx.getProgramParameter(program, 35721);
            for (var i = 0; i < numActiveAttributes; ++i) {
                program.maxAttributeLength = Math.max(program.maxAttributeLength, GLctx.getActiveAttrib(program, i).name.length + 1)
            }
        }
        GROWABLE_HEAP_I32()[p >> 2] = program.maxAttributeLength
    } else if (pname == 35381) {
        if (!program.maxUniformBlockNameLength) {
            var numActiveUniformBlocks = GLctx.getProgramParameter(program, 35382);
            for (var i = 0; i < numActiveUniformBlocks; ++i) {
                program.maxUniformBlockNameLength = Math.max(program.maxUniformBlockNameLength, GLctx.getActiveUniformBlockName(program, i).length + 1)
            }
        }
        GROWABLE_HEAP_I32()[p >> 2] = program.maxUniformBlockNameLength
    } else {
        GROWABLE_HEAP_I32()[p >> 2] = GLctx.getProgramParameter(program, pname)
    }
}
;
var _emscripten_glGetProgramiv = _glGetProgramiv;
var _glGetQueryObjecti64vEXT = (id, pname, params) => {
    if (!params) {
        GL.recordError(1281);
        return
    }
    var query = GL.queries[id];
    var param;
    if (GL.currentContext.version < 2) {
        param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname)
    } else {
        param = GLctx.getQueryParameter(query, pname)
    }
    var ret;
    if (typeof param == "boolean") {
        ret = param ? 1 : 0
    } else {
        ret = param
    }
    writeI53ToI64(params, ret)
}
;
var _emscripten_glGetQueryObjecti64vEXT = _glGetQueryObjecti64vEXT;
var _glGetQueryObjectivEXT = (id, pname, params) => {
    if (!params) {
        GL.recordError(1281);
        return
    }
    var query = GL.queries[id];
    var param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname);
    var ret;
    if (typeof param == "boolean") {
        ret = param ? 1 : 0
    } else {
        ret = param
    }
    GROWABLE_HEAP_I32()[params >> 2] = ret
}
;
var _emscripten_glGetQueryObjectivEXT = _glGetQueryObjectivEXT;
var _glGetQueryObjectui64vEXT = _glGetQueryObjecti64vEXT;
var _emscripten_glGetQueryObjectui64vEXT = _glGetQueryObjectui64vEXT;
var _glGetQueryObjectuiv = (id, pname, params) => {
    if (!params) {
        GL.recordError(1281);
        return
    }
    var query = GL.queries[id];
    var param = GLctx.getQueryParameter(query, pname);
    var ret;
    if (typeof param == "boolean") {
        ret = param ? 1 : 0
    } else {
        ret = param
    }
    GROWABLE_HEAP_I32()[params >> 2] = ret
}
;
var _emscripten_glGetQueryObjectuiv = _glGetQueryObjectuiv;
var _glGetQueryObjectuivEXT = _glGetQueryObjectivEXT;
var _emscripten_glGetQueryObjectuivEXT = _glGetQueryObjectuivEXT;
var _glGetQueryiv = (target, pname, params) => {
    if (!params) {
        GL.recordError(1281);
        return
    }
    GROWABLE_HEAP_I32()[params >> 2] = GLctx.getQuery(target, pname)
}
;
var _emscripten_glGetQueryiv = _glGetQueryiv;
var _glGetQueryivEXT = (target, pname, params) => {
    if (!params) {
        GL.recordError(1281);
        return
    }
    GROWABLE_HEAP_I32()[params >> 2] = GLctx.disjointTimerQueryExt["getQueryEXT"](target, pname)
}
;
var _emscripten_glGetQueryivEXT = _glGetQueryivEXT;
var _glGetRenderbufferParameteriv = (target, pname, params) => {
    if (!params) {
        GL.recordError(1281);
        return
    }
    GROWABLE_HEAP_I32()[params >> 2] = GLctx.getRenderbufferParameter(target, pname)
}
;
var _emscripten_glGetRenderbufferParameteriv = _glGetRenderbufferParameteriv;
var _glGetSamplerParameterfv = (sampler, pname, params) => {
    if (!params) {
        GL.recordError(1281);
        return
    }
    GROWABLE_HEAP_F32()[params >> 2] = GLctx.getSamplerParameter(GL.samplers[sampler], pname)
}
;
var _emscripten_glGetSamplerParameterfv = _glGetSamplerParameterfv;
var _glGetSamplerParameteriv = (sampler, pname, params) => {
    if (!params) {
        GL.recordError(1281);
        return
    }
    GROWABLE_HEAP_I32()[params >> 2] = GLctx.getSamplerParameter(GL.samplers[sampler], pname)
}
;
var _emscripten_glGetSamplerParameteriv = _glGetSamplerParameteriv;
var _glGetShaderInfoLog = (shader, maxLength, length, infoLog) => {
    var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
    if (log === null)
        log = "(unknown error)";
    var numBytesWrittenExclNull = maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0;
    if (length)
        GROWABLE_HEAP_I32()[length >> 2] = numBytesWrittenExclNull
}
;
var _emscripten_glGetShaderInfoLog = _glGetShaderInfoLog;
var _glGetShaderPrecisionFormat = (shaderType, precisionType, range, precision) => {
    var result = GLctx.getShaderPrecisionFormat(shaderType, precisionType);
    GROWABLE_HEAP_I32()[range >> 2] = result.rangeMin;
    GROWABLE_HEAP_I32()[range + 4 >> 2] = result.rangeMax;
    GROWABLE_HEAP_I32()[precision >> 2] = result.precision
}
;
var _emscripten_glGetShaderPrecisionFormat = _glGetShaderPrecisionFormat;
var _glGetShaderSource = (shader, bufSize, length, source) => {
    var result = GLctx.getShaderSource(GL.shaders[shader]);
    if (!result)
        return;
    var numBytesWrittenExclNull = bufSize > 0 && source ? stringToUTF8(result, source, bufSize) : 0;
    if (length)
        GROWABLE_HEAP_I32()[length >> 2] = numBytesWrittenExclNull
}
;
var _emscripten_glGetShaderSource = _glGetShaderSource;
var _glGetShaderiv = (shader, pname, p) => {
    if (!p) {
        GL.recordError(1281);
        return
    }
    if (pname == 35716) {
        var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
        if (log === null)
            log = "(unknown error)";
        var logLength = log ? log.length + 1 : 0;
        GROWABLE_HEAP_I32()[p >> 2] = logLength
    } else if (pname == 35720) {
        var source = GLctx.getShaderSource(GL.shaders[shader]);
        var sourceLength = source ? source.length + 1 : 0;
        GROWABLE_HEAP_I32()[p >> 2] = sourceLength
    } else {
        GROWABLE_HEAP_I32()[p >> 2] = GLctx.getShaderParameter(GL.shaders[shader], pname)
    }
}
;
var _emscripten_glGetShaderiv = _glGetShaderiv;
var _glGetString = name_ => {
    dbg(name_);
    var ret = GL.stringCache[name_];
    if (!ret) {
        switch (name_) {
        case 7939:
            ret = stringToNewUTF8(webglGetExtensions().join(" "));
            break;
        case 7936:
        case 7937:
        case 37445:
        case 37446:
            var s = GLctx.getParameter(name_);
            if (!s) {
                GL.recordError(1280)
            }
            ret = s ? stringToNewUTF8(s) : 0;
            break;
        case 7938:
            var webGLVersion = GLctx.getParameter(7938);
            var glVersion = `OpenGL ES 2.0 (${webGLVersion})`;
            if (true)
                glVersion = `OpenGL ES 3.0 (${webGLVersion})`;
            ret = stringToNewUTF8(glVersion);
            break;
        case 35724:
            var glslVersion = GLctx.getParameter(35724);
            var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;
            var ver_num = glslVersion.match(ver_re);
            if (ver_num !== null) {
                if (ver_num[1].length == 3)
                    ver_num[1] = ver_num[1] + "0";
                glslVersion = `OpenGL ES GLSL ES ${ver_num[1]} (${glslVersion})`
            }
            ret = stringToNewUTF8(glslVersion);
            break;
        default:
            GL.recordError(1280)
        }
        GL.stringCache[name_] = ret
    }
    return ret
}
;
var _emscripten_glGetString = _glGetString;
var _glGetStringi = (name, index) => {
    if (GL.currentContext.version < 2) {
        GL.recordError(1282);
        return 0
    }
    var stringiCache = GL.stringiCache[name];
    if (stringiCache) {
        if (index < 0 || index >= stringiCache.length) {
            GL.recordError(1281);
            return 0
        }
        return stringiCache[index]
    }
    switch (name) {
    case 7939:
        var exts = webglGetExtensions().map(stringToNewUTF8);
        stringiCache = GL.stringiCache[name] = exts;
        if (index < 0 || index >= stringiCache.length) {
            GL.recordError(1281);
            return 0
        }
        return stringiCache[index];
    default:
        GL.recordError(1280);
        return 0
    }
}
;
var _emscripten_glGetStringi = _glGetStringi;
var _glGetSynciv = (sync, pname, bufSize, length, values) => {
    if (bufSize < 0) {
        GL.recordError(1281);
        return
    }
    if (!values) {
        GL.recordError(1281);
        return
    }
    var ret = GLctx.getSyncParameter(GL.syncs[sync], pname);
    if (ret !== null) {
        GROWABLE_HEAP_I32()[values >> 2] = ret;
        if (length)
            GROWABLE_HEAP_I32()[length >> 2] = 1
    }
}
;
var _emscripten_glGetSynciv = _glGetSynciv;
var _glGetTexParameterfv = (target, pname, params) => {
    if (!params) {
        GL.recordError(1281);
        return
    }
    GROWABLE_HEAP_F32()[params >> 2] = GLctx.getTexParameter(target, pname)
}
;
var _emscripten_glGetTexParameterfv = _glGetTexParameterfv;
var _glGetTexParameteriv = (target, pname, params) => {
    if (!params) {
        GL.recordError(1281);
        return
    }
    GROWABLE_HEAP_I32()[params >> 2] = GLctx.getTexParameter(target, pname)
}
;
var _emscripten_glGetTexParameteriv = _glGetTexParameteriv;
var _glGetTransformFeedbackVarying = (program, index, bufSize, length, size, type, name) => {
    program = GL.programs[program];
    var info = GLctx.getTransformFeedbackVarying(program, index);
    if (!info)
        return;
    if (name && bufSize > 0) {
        var numBytesWrittenExclNull = stringToUTF8(info.name, name, bufSize);
        if (length)
            GROWABLE_HEAP_I32()[length >> 2] = numBytesWrittenExclNull
    } else {
        if (length)
            GROWABLE_HEAP_I32()[length >> 2] = 0
    }
    if (size)
        GROWABLE_HEAP_I32()[size >> 2] = info.size;
    if (type)
        GROWABLE_HEAP_I32()[type >> 2] = info.type
}
;
var _emscripten_glGetTransformFeedbackVarying = _glGetTransformFeedbackVarying;
var _glGetUniformBlockIndex = (program, uniformBlockName) => GLctx.getUniformBlockIndex(GL.programs[program], UTF8ToString(uniformBlockName));
var _emscripten_glGetUniformBlockIndex = _glGetUniformBlockIndex;
var _glGetUniformIndices = (program, uniformCount, uniformNames, uniformIndices) => {
    if (!uniformIndices) {
        GL.recordError(1281);
        return
    }
    if (uniformCount > 0 && (uniformNames == 0 || uniformIndices == 0)) {
        GL.recordError(1281);
        return
    }
    program = GL.programs[program];
    var names = [];
    for (var i = 0; i < uniformCount; i++)
        names.push(UTF8ToString(GROWABLE_HEAP_I32()[uniformNames + i * 4 >> 2]));
    var result = GLctx.getUniformIndices(program, names);
    if (!result)
        return;
    var len = result.length;
    for (var i = 0; i < len; i++) {
        GROWABLE_HEAP_I32()[uniformIndices + i * 4 >> 2] = result[i]
    }
}
;
var _emscripten_glGetUniformIndices = _glGetUniformIndices;
var jstoi_q = str => parseInt(str);
var webglGetLeftBracePos = name => name.slice(-1) == "]" && name.lastIndexOf("[");
var webglPrepareUniformLocationsBeforeFirstUse = program => {
    var uniformLocsById = program.uniformLocsById, uniformSizeAndIdsByName = program.uniformSizeAndIdsByName, i, j;
    if (!uniformLocsById) {
        program.uniformLocsById = uniformLocsById = {};
        program.uniformArrayNamesById = {};
        var numActiveUniforms = GLctx.getProgramParameter(program, 35718);
        for (i = 0; i < numActiveUniforms; ++i) {
            var u = GLctx.getActiveUniform(program, i);
            var nm = u.name;
            var sz = u.size;
            var lb = webglGetLeftBracePos(nm);
            var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
            var id = program.uniformIdCounter;
            program.uniformIdCounter += sz;
            uniformSizeAndIdsByName[arrayName] = [sz, id];
            for (j = 0; j < sz; ++j) {
                uniformLocsById[id] = j;
                program.uniformArrayNamesById[id++] = arrayName
            }
        }
    }
}
;
var _glGetUniformLocation = (program, name) => {
    name = UTF8ToString(name);
    if (program = GL.programs[program]) {
        webglPrepareUniformLocationsBeforeFirstUse(program);
        var uniformLocsById = program.uniformLocsById;
        var arrayIndex = 0;
        var uniformBaseName = name;
        var leftBrace = webglGetLeftBracePos(name);
        if (leftBrace > 0) {
            arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0;
            uniformBaseName = name.slice(0, leftBrace)
        }
        var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
        if (sizeAndId && arrayIndex < sizeAndId[0]) {
            arrayIndex += sizeAndId[1];
            if (uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name)) {
                return arrayIndex
            }
        }
    } else {
        GL.recordError(1281)
    }
    return -1
}
;
var _emscripten_glGetUniformLocation = _glGetUniformLocation;
var webglGetUniformLocation = location => {
    var p = GLctx.currentProgram;
    if (p) {
        var webglLoc = p.uniformLocsById[location];
        if (typeof webglLoc == "number") {
            p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(p, p.uniformArrayNamesById[location] + (webglLoc > 0 ? `[${webglLoc}]` : ""))
        }
        return webglLoc
    } else {
        GL.recordError(1282)
    }
}
;
var emscriptenWebGLGetUniform = (program, location, params, type) => {
    if (!params) {
        GL.recordError(1281);
        return
    }
    program = GL.programs[program];
    webglPrepareUniformLocationsBeforeFirstUse(program);
    var data = GLctx.getUniform(program, webglGetUniformLocation(location));
    if (typeof data == "number" || typeof data == "boolean") {
        switch (type) {
        case 0:
            GROWABLE_HEAP_I32()[params >> 2] = data;
            break;
        case 2:
            GROWABLE_HEAP_F32()[params >> 2] = data;
            break
        }
    } else {
        for (var i = 0; i < data.length; i++) {
            switch (type) {
            case 0:
                GROWABLE_HEAP_I32()[params + i * 4 >> 2] = data[i];
                break;
            case 2:
                GROWABLE_HEAP_F32()[params + i * 4 >> 2] = data[i];
                break
            }
        }
    }
}
;
var _glGetUniformfv = (program, location, params) => {
    emscriptenWebGLGetUniform(program, location, params, 2)
}
;
var _emscripten_glGetUniformfv = _glGetUniformfv;
var _glGetUniformiv = (program, location, params) => {
    emscriptenWebGLGetUniform(program, location, params, 0)
}
;
var _emscripten_glGetUniformiv = _glGetUniformiv;
var _glGetUniformuiv = (program, location, params) => emscriptenWebGLGetUniform(program, location, params, 0);
var _emscripten_glGetUniformuiv = _glGetUniformuiv;
var emscriptenWebGLGetVertexAttrib = (index, pname, params, type) => {
    if (!params) {
        GL.recordError(1281);
        return
    }
    if (GL.currentContext.clientBuffers[index].enabled) {
        err("glGetVertexAttrib*v on client-side array: not supported, bad data returned")
    }
    var data = GLctx.getVertexAttrib(index, pname);
    if (pname == 34975) {
        GROWABLE_HEAP_I32()[params >> 2] = data && data["name"]
    } else if (typeof data == "number" || typeof data == "boolean") {
        switch (type) {
        case 0:
            GROWABLE_HEAP_I32()[params >> 2] = data;
            break;
        case 2:
            GROWABLE_HEAP_F32()[params >> 2] = data;
            break;
        case 5:
            GROWABLE_HEAP_I32()[params >> 2] = Math.fround(data);
            break
        }
    } else {
        for (var i = 0; i < data.length; i++) {
            switch (type) {
            case 0:
                GROWABLE_HEAP_I32()[params + i * 4 >> 2] = data[i];
                break;
            case 2:
                GROWABLE_HEAP_F32()[params + i * 4 >> 2] = data[i];
                break;
            case 5:
                GROWABLE_HEAP_I32()[params + i * 4 >> 2] = Math.fround(data[i]);
                break
            }
        }
    }
}
;
var _glGetVertexAttribIiv = (index, pname, params) => {
    emscriptenWebGLGetVertexAttrib(index, pname, params, 0)
}
;
var _emscripten_glGetVertexAttribIiv = _glGetVertexAttribIiv;
var _glGetVertexAttribIuiv = _glGetVertexAttribIiv;
var _emscripten_glGetVertexAttribIuiv = _glGetVertexAttribIuiv;
var _glGetVertexAttribPointerv = (index, pname, pointer) => {
    if (!pointer) {
        GL.recordError(1281);
        return
    }
    if (GL.currentContext.clientBuffers[index].enabled) {
        err("glGetVertexAttribPointer on client-side array: not supported, bad data returned")
    }
    GROWABLE_HEAP_I32()[pointer >> 2] = GLctx.getVertexAttribOffset(index, pname)
}
;
var _emscripten_glGetVertexAttribPointerv = _glGetVertexAttribPointerv;
var _glGetVertexAttribfv = (index, pname, params) => {
    emscriptenWebGLGetVertexAttrib(index, pname, params, 2)
}
;
var _emscripten_glGetVertexAttribfv = _glGetVertexAttribfv;
var _glGetVertexAttribiv = (index, pname, params) => {
    emscriptenWebGLGetVertexAttrib(index, pname, params, 5)
}
;
var _emscripten_glGetVertexAttribiv = _glGetVertexAttribiv;
var _glHint = (x0, x1) => GLctx.hint(x0, x1);
var _emscripten_glHint = _glHint;
var _glInvalidateFramebuffer = (target, numAttachments, attachments) => {
    var list = tempFixedLengthArray[numAttachments];
    for (var i = 0; i < numAttachments; i++) {
        list[i] = GROWABLE_HEAP_I32()[attachments + i * 4 >> 2]
    }
    GLctx.invalidateFramebuffer(target, list)
}
;
var _emscripten_glInvalidateFramebuffer = _glInvalidateFramebuffer;
var _glInvalidateSubFramebuffer = (target, numAttachments, attachments, x, y, width, height) => {
    var list = tempFixedLengthArray[numAttachments];
    for (var i = 0; i < numAttachments; i++) {
        list[i] = GROWABLE_HEAP_I32()[attachments + i * 4 >> 2]
    }
    GLctx.invalidateSubFramebuffer(target, list, x, y, width, height)
}
;
var _emscripten_glInvalidateSubFramebuffer = _glInvalidateSubFramebuffer;
var _glIsBuffer = buffer => {
    var b = GL.buffers[buffer];
    if (!b)
        return 0;
    return GLctx.isBuffer(b)
}
;
var _emscripten_glIsBuffer = _glIsBuffer;
var _glIsEnabled = x0 => GLctx.isEnabled(x0);
var _emscripten_glIsEnabled = _glIsEnabled;
var _glIsFramebuffer = framebuffer => {
    var fb = GL.framebuffers[framebuffer];
    if (!fb)
        return 0;
    return GLctx.isFramebuffer(fb)
}
;
var _emscripten_glIsFramebuffer = _glIsFramebuffer;
var _glIsProgram = program => {
    program = GL.programs[program];
    if (!program)
        return 0;
    return GLctx.isProgram(program)
}
;
var _emscripten_glIsProgram = _glIsProgram;
var _glIsQuery = id => {
    var query = GL.queries[id];
    if (!query)
        return 0;
    return GLctx.isQuery(query)
}
;
var _emscripten_glIsQuery = _glIsQuery;
var _glIsQueryEXT = id => {
    var query = GL.queries[id];
    if (!query)
        return 0;
    return GLctx.disjointTimerQueryExt["isQueryEXT"](query)
}
;
var _emscripten_glIsQueryEXT = _glIsQueryEXT;
var _glIsRenderbuffer = renderbuffer => {
    var rb = GL.renderbuffers[renderbuffer];
    if (!rb)
        return 0;
    return GLctx.isRenderbuffer(rb)
}
;
var _emscripten_glIsRenderbuffer = _glIsRenderbuffer;
var _glIsSampler = id => {
    var sampler = GL.samplers[id];
    if (!sampler)
        return 0;
    return GLctx.isSampler(sampler)
}
;
var _emscripten_glIsSampler = _glIsSampler;
var _glIsShader = shader => {
    var s = GL.shaders[shader];
    if (!s)
        return 0;
    return GLctx.isShader(s)
}
;
var _emscripten_glIsShader = _glIsShader;
var _glIsSync = sync => GLctx.isSync(GL.syncs[sync]);
var _emscripten_glIsSync = _glIsSync;
var _glIsTexture = id => {
    var texture = GL.textures[id];
    if (!texture)
        return 0;
    return GLctx.isTexture(texture)
}
;
var _emscripten_glIsTexture = _glIsTexture;
var _glIsTransformFeedback = id => GLctx.isTransformFeedback(GL.transformFeedbacks[id]);
var _emscripten_glIsTransformFeedback = _glIsTransformFeedback;
var _glIsVertexArray = array => {
    var vao = GL.vaos[array];
    if (!vao)
        return 0;
    return GLctx.isVertexArray(vao)
}
;
var _emscripten_glIsVertexArray = _glIsVertexArray;
var _glLineWidth = x0 => GLctx.lineWidth(x0);
var _emscripten_glLineWidth = _glLineWidth;
var _glLinkProgram = program => {
    program = GL.programs[program];
    GLctx.linkProgram(program);
    var log = (GLctx.getProgramInfoLog(program) || "").trim();
    if (log)
        dbg(`glLinkProgram: ${log}`);
    if (program.uniformLocsById)
        dbg(`glLinkProgram invalidated ${Object.keys(program.uniformLocsById).length} uniform location mappings`);
    program.uniformLocsById = 0;
    program.uniformSizeAndIdsByName = {}
}
;
var _emscripten_glLinkProgram = _glLinkProgram;
var _glMapBufferRange = (target, offset, length, access) => {
    if ((access & (1 | 32)) != 0) {
        err("glMapBufferRange access does not support MAP_READ or MAP_UNSYNCHRONIZED");
        return 0
    }
    if (!emscriptenWebGLValidateMapBufferTarget(target)) {
        GL.recordError(1280);
        err("GL_INVALID_ENUM in glMapBufferRange");
        return 0
    }
    var mem = _malloc(length)
      , binding = emscriptenWebGLGetBufferBinding(target);
    if (!mem)
        return 0;
    binding = GL.mappedBuffers[binding] ??= {};
    binding.offset = offset;
    binding.length = length;
    binding.mem = mem;
    binding.access = access;
    return mem
}
;
var _emscripten_glMapBufferRange = _glMapBufferRange;
var _glPauseTransformFeedback = () => GLctx.pauseTransformFeedback();
var _emscripten_glPauseTransformFeedback = _glPauseTransformFeedback;
var _glPixelStorei = (pname, param) => {
    if (pname == 3317) {
        GL.unpackAlignment = param
    } else if (pname == 3314) {
        GL.unpackRowLength = param
    }
    GLctx.pixelStorei(pname, param)
}
;
var _emscripten_glPixelStorei = _glPixelStorei;
var _glPolygonOffset = (x0, x1) => GLctx.polygonOffset(x0, x1);
var _emscripten_glPolygonOffset = _glPolygonOffset;
var _glProgramBinary = (program, binaryFormat, binary, length) => {
    GL.recordError(1280)
}
;
var _emscripten_glProgramBinary = _glProgramBinary;
var _glProgramParameteri = (program, pname, value) => {
    GL.recordError(1280)
}
;
var _emscripten_glProgramParameteri = _glProgramParameteri;
var _glQueryCounterEXT = (id, target) => {
    GLctx.disjointTimerQueryExt["queryCounterEXT"](GL.queries[id], target)
}
;
var _emscripten_glQueryCounterEXT = _glQueryCounterEXT;
var _glReadBuffer = x0 => GLctx.readBuffer(x0);
var _emscripten_glReadBuffer = _glReadBuffer;
var heapObjectForWebGLType = type => {
    type -= 5120;
    if (type == 0)
        return GROWABLE_HEAP_I8();
    if (type == 1)
        return GROWABLE_HEAP_U8();
    if (type == 2)
        return GROWABLE_HEAP_I16();
    if (type == 4)
        return GROWABLE_HEAP_I32();
    if (type == 6)
        return GROWABLE_HEAP_F32();
    if (type == 5 || type == 28922 || type == 28520 || type == 30779 || type == 30782)
        return GROWABLE_HEAP_U32();
    return GROWABLE_HEAP_U16()
}
;
var toTypedArrayIndex = (pointer, heap) => pointer >>> 31 - Math.clz32(heap.BYTES_PER_ELEMENT);
var _glReadPixels = (x, y, width, height, format, type, pixels) => {
    if (true) {
        if (GLctx.currentPixelPackBufferBinding) {
            GLctx.readPixels(x, y, width, height, format, type, pixels);
            return
        }
        var heap = heapObjectForWebGLType(type);
        var target = toTypedArrayIndex(pixels, heap);
        GLctx.readPixels(x, y, width, height, format, type, heap, target);
        return
    }
}
;
var _emscripten_glReadPixels = _glReadPixels;
var _glReleaseShaderCompiler = () => {}
;
var _emscripten_glReleaseShaderCompiler = _glReleaseShaderCompiler;
var _glRenderbufferStorage = (x0, x1, x2, x3) => GLctx.renderbufferStorage(x0, x1, x2, x3);
var _emscripten_glRenderbufferStorage = _glRenderbufferStorage;
var _glRenderbufferStorageMultisample = (x0, x1, x2, x3, x4) => GLctx.renderbufferStorageMultisample(x0, x1, x2, x3, x4);
var _emscripten_glRenderbufferStorageMultisample = _glRenderbufferStorageMultisample;
var _glResumeTransformFeedback = () => GLctx.resumeTransformFeedback();
var _emscripten_glResumeTransformFeedback = _glResumeTransformFeedback;
var _glSampleCoverage = (value, invert) => {
    GLctx.sampleCoverage(value, !!invert)
}
;
var _emscripten_glSampleCoverage = _glSampleCoverage;
var _glSamplerParameterf = (sampler, pname, param) => {
    GLctx.samplerParameterf(GL.samplers[sampler], pname, param)
}
;
var _emscripten_glSamplerParameterf = _glSamplerParameterf;
var _glSamplerParameterfv = (sampler, pname, params) => {
    var param = GROWABLE_HEAP_F32()[params >> 2];
    GLctx.samplerParameterf(GL.samplers[sampler], pname, param)
}
;
var _emscripten_glSamplerParameterfv = _glSamplerParameterfv;
var _glSamplerParameteri = (sampler, pname, param) => {
    GLctx.samplerParameteri(GL.samplers[sampler], pname, param)
}
;
var _emscripten_glSamplerParameteri = _glSamplerParameteri;
var _glSamplerParameteriv = (sampler, pname, params) => {
    var param = GROWABLE_HEAP_I32()[params >> 2];
    GLctx.samplerParameteri(GL.samplers[sampler], pname, param)
}
;
var _emscripten_glSamplerParameteriv = _glSamplerParameteriv;
var _glScissor = (x0, x1, x2, x3) => GLctx.scissor(x0, x1, x2, x3);
var _emscripten_glScissor = _glScissor;
var _glShaderBinary = (count, shaders, binaryformat, binary, length) => {
    GL.recordError(1280)
}
;
var _emscripten_glShaderBinary = _glShaderBinary;
var _glShaderSource = (shader, count, string, length) => {
    var source = GL.getSource(shader, count, string, length);
    GLctx.shaderSource(GL.shaders[shader], source)
}
;
var _emscripten_glShaderSource = _glShaderSource;
var _glStencilFunc = (x0, x1, x2) => GLctx.stencilFunc(x0, x1, x2);
var _emscripten_glStencilFunc = _glStencilFunc;
var _glStencilFuncSeparate = (x0, x1, x2, x3) => GLctx.stencilFuncSeparate(x0, x1, x2, x3);
var _emscripten_glStencilFuncSeparate = _glStencilFuncSeparate;
var _glStencilMask = x0 => GLctx.stencilMask(x0);
var _emscripten_glStencilMask = _glStencilMask;
var _glStencilMaskSeparate = (x0, x1) => GLctx.stencilMaskSeparate(x0, x1);
var _emscripten_glStencilMaskSeparate = _glStencilMaskSeparate;
var _glStencilOp = (x0, x1, x2) => GLctx.stencilOp(x0, x1, x2);
var _emscripten_glStencilOp = _glStencilOp;
var _glStencilOpSeparate = (x0, x1, x2, x3) => GLctx.stencilOpSeparate(x0, x1, x2, x3);
var _emscripten_glStencilOpSeparate = _glStencilOpSeparate;
var computeUnpackAlignedImageSize = (width, height, sizePerPixel) => {
    function roundedToNextMultipleOf(x, y) {
        return x + y - 1 & -y
    }
    var plainRowSize = (GL.unpackRowLength || width) * sizePerPixel;
    var alignedRowSize = roundedToNextMultipleOf(plainRowSize, GL.unpackAlignment);
    return height * alignedRowSize
}
;
var colorChannelsInGlTextureFormat = format => {
    var colorChannels = {
        5: 3,
        6: 4,
        8: 2,
        29502: 3,
        29504: 4,
        26917: 2,
        26918: 2,
        29846: 3,
        29847: 4
    };
    return colorChannels[format - 6402] || 1
}
;
var emscriptenWebGLGetTexPixelData = (type, format, width, height, pixels, internalFormat) => {
    var heap = heapObjectForWebGLType(type);
    var sizePerPixel = colorChannelsInGlTextureFormat(format) * heap.BYTES_PER_ELEMENT;
    var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel);
    return heap.subarray(toTypedArrayIndex(pixels, heap), toTypedArrayIndex(pixels + bytes, heap))
}
;
var _glTexImage2D = (target, level, internalFormat, width, height, border, format, type, pixels) => {
    if (true) {
        if (GLctx.currentPixelUnpackBufferBinding) {
            GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
            return
        }
        if (pixels) {
            var heap = heapObjectForWebGLType(type);
            var index = toTypedArrayIndex(pixels, heap);
            GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, heap, index);
            return
        }
    }
    var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null;
    GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixelData)
}
;
var _emscripten_glTexImage2D = _glTexImage2D;
var _glTexImage3D = (target, level, internalFormat, width, height, depth, border, format, type, pixels) => {
    if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, pixels)
    } else if (pixels) {
        var heap = heapObjectForWebGLType(type);
        GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, heap, toTypedArrayIndex(pixels, heap))
    } else {
        GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, null)
    }
}
;
var _emscripten_glTexImage3D = _glTexImage3D;
var _glTexParameterf = (x0, x1, x2) => GLctx.texParameterf(x0, x1, x2);
var _emscripten_glTexParameterf = _glTexParameterf;
var _glTexParameterfv = (target, pname, params) => {
    var param = GROWABLE_HEAP_F32()[params >> 2];
    GLctx.texParameterf(target, pname, param)
}
;
var _emscripten_glTexParameterfv = _glTexParameterfv;
var _glTexParameteri = (x0, x1, x2) => GLctx.texParameteri(x0, x1, x2);
var _emscripten_glTexParameteri = _glTexParameteri;
var _glTexParameteriv = (target, pname, params) => {
    var param = GROWABLE_HEAP_I32()[params >> 2];
    GLctx.texParameteri(target, pname, param)
}
;
var _emscripten_glTexParameteriv = _glTexParameteriv;
var _glTexStorage2D = (x0, x1, x2, x3, x4) => GLctx.texStorage2D(x0, x1, x2, x3, x4);
var _emscripten_glTexStorage2D = _glTexStorage2D;
var _glTexStorage3D = (x0, x1, x2, x3, x4, x5) => GLctx.texStorage3D(x0, x1, x2, x3, x4, x5);
var _emscripten_glTexStorage3D = _glTexStorage3D;
var _glTexSubImage2D = (target, level, xoffset, yoffset, width, height, format, type, pixels) => {
    if (true) {
        if (GLctx.currentPixelUnpackBufferBinding) {
            GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels);
            return
        }
        if (pixels) {
            var heap = heapObjectForWebGLType(type);
            GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, heap, toTypedArrayIndex(pixels, heap));
            return
        }
    }
    var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, 0) : null;
    GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData)
}
;
var _emscripten_glTexSubImage2D = _glTexSubImage2D;
var _glTexSubImage3D = (target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels) => {
    if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels)
    } else if (pixels) {
        var heap = heapObjectForWebGLType(type);
        GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, heap, toTypedArrayIndex(pixels, heap))
    } else {
        GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, null)
    }
}
;
var _emscripten_glTexSubImage3D = _glTexSubImage3D;
var _glTransformFeedbackVaryings = (program, count, varyings, bufferMode) => {
    program = GL.programs[program];
    var vars = [];
    for (var i = 0; i < count; i++)
        vars.push(UTF8ToString(GROWABLE_HEAP_I32()[varyings + i * 4 >> 2]));
    GLctx.transformFeedbackVaryings(program, vars, bufferMode)
}
;
var _emscripten_glTransformFeedbackVaryings = _glTransformFeedbackVaryings;
var _glUniform1f = (location, v0) => {
    GLctx.uniform1f(webglGetUniformLocation(location), v0)
}
;
var _emscripten_glUniform1f = _glUniform1f;
var _glUniform1fv = (location, count, value) => {
    count && GLctx.uniform1fv(webglGetUniformLocation(location), GROWABLE_HEAP_F32(), value >> 2, count)
}
;
var _emscripten_glUniform1fv = _glUniform1fv;
var _glUniform1i = (location, v0) => {
    GLctx.uniform1i(webglGetUniformLocation(location), v0)
}
;
var _emscripten_glUniform1i = _glUniform1i;
var _glUniform1iv = (location, count, value) => {
    count && GLctx.uniform1iv(webglGetUniformLocation(location), GROWABLE_HEAP_I32(), value >> 2, count)
}
;
var _emscripten_glUniform1iv = _glUniform1iv;
var _glUniform1ui = (location, v0) => {
    GLctx.uniform1ui(webglGetUniformLocation(location), v0)
}
;
var _emscripten_glUniform1ui = _glUniform1ui;
var _glUniform1uiv = (location, count, value) => {
    count && GLctx.uniform1uiv(webglGetUniformLocation(location), GROWABLE_HEAP_U32(), value >> 2, count)
}
;
var _emscripten_glUniform1uiv = _glUniform1uiv;
var _glUniform2f = (location, v0, v1) => {
    GLctx.uniform2f(webglGetUniformLocation(location), v0, v1)
}
;
var _emscripten_glUniform2f = _glUniform2f;
var _glUniform2fv = (location, count, value) => {
    count && GLctx.uniform2fv(webglGetUniformLocation(location), GROWABLE_HEAP_F32(), value >> 2, count * 2)
}
;
var _emscripten_glUniform2fv = _glUniform2fv;
var _glUniform2i = (location, v0, v1) => {
    GLctx.uniform2i(webglGetUniformLocation(location), v0, v1)
}
;
var _emscripten_glUniform2i = _glUniform2i;
var _glUniform2iv = (location, count, value) => {
    count && GLctx.uniform2iv(webglGetUniformLocation(location), GROWABLE_HEAP_I32(), value >> 2, count * 2)
}
;
var _emscripten_glUniform2iv = _glUniform2iv;
var _glUniform2ui = (location, v0, v1) => {
    GLctx.uniform2ui(webglGetUniformLocation(location), v0, v1)
}
;
var _emscripten_glUniform2ui = _glUniform2ui;
var _glUniform2uiv = (location, count, value) => {
    count && GLctx.uniform2uiv(webglGetUniformLocation(location), GROWABLE_HEAP_U32(), value >> 2, count * 2)
}
;
var _emscripten_glUniform2uiv = _glUniform2uiv;
var _glUniform3f = (location, v0, v1, v2) => {
    GLctx.uniform3f(webglGetUniformLocation(location), v0, v1, v2)
}
;
var _emscripten_glUniform3f = _glUniform3f;
var _glUniform3fv = (location, count, value) => {
    count && GLctx.uniform3fv(webglGetUniformLocation(location), GROWABLE_HEAP_F32(), value >> 2, count * 3)
}
;
var _emscripten_glUniform3fv = _glUniform3fv;
var _glUniform3i = (location, v0, v1, v2) => {
    GLctx.uniform3i(webglGetUniformLocation(location), v0, v1, v2)
}
;
var _emscripten_glUniform3i = _glUniform3i;
var _glUniform3iv = (location, count, value) => {
    count && GLctx.uniform3iv(webglGetUniformLocation(location), GROWABLE_HEAP_I32(), value >> 2, count * 3)
}
;
var _emscripten_glUniform3iv = _glUniform3iv;
var _glUniform3ui = (location, v0, v1, v2) => {
    GLctx.uniform3ui(webglGetUniformLocation(location), v0, v1, v2)
}
;
var _emscripten_glUniform3ui = _glUniform3ui;
var _glUniform3uiv = (location, count, value) => {
    count && GLctx.uniform3uiv(webglGetUniformLocation(location), GROWABLE_HEAP_U32(), value >> 2, count * 3)
}
;
var _emscripten_glUniform3uiv = _glUniform3uiv;
var _glUniform4f = (location, v0, v1, v2, v3) => {
    GLctx.uniform4f(webglGetUniformLocation(location), v0, v1, v2, v3)
}
;
var _emscripten_glUniform4f = _glUniform4f;
var _glUniform4fv = (location, count, value) => {
    count && GLctx.uniform4fv(webglGetUniformLocation(location), GROWABLE_HEAP_F32(), value >> 2, count * 4)
}
;
var _emscripten_glUniform4fv = _glUniform4fv;
var _glUniform4i = (location, v0, v1, v2, v3) => {
    GLctx.uniform4i(webglGetUniformLocation(location), v0, v1, v2, v3)
}
;
var _emscripten_glUniform4i = _glUniform4i;
var _glUniform4iv = (location, count, value) => {
    count && GLctx.uniform4iv(webglGetUniformLocation(location), GROWABLE_HEAP_I32(), value >> 2, count * 4)
}
;
var _emscripten_glUniform4iv = _glUniform4iv;
var _glUniform4ui = (location, v0, v1, v2, v3) => {
    GLctx.uniform4ui(webglGetUniformLocation(location), v0, v1, v2, v3)
}
;
var _emscripten_glUniform4ui = _glUniform4ui;
var _glUniform4uiv = (location, count, value) => {
    count && GLctx.uniform4uiv(webglGetUniformLocation(location), GROWABLE_HEAP_U32(), value >> 2, count * 4)
}
;
var _emscripten_glUniform4uiv = _glUniform4uiv;
var _glUniformBlockBinding = (program, uniformBlockIndex, uniformBlockBinding) => {
    program = GL.programs[program];
    GLctx.uniformBlockBinding(program, uniformBlockIndex, uniformBlockBinding)
}
;
var _emscripten_glUniformBlockBinding = _glUniformBlockBinding;
var _glUniformMatrix2fv = (location, count, transpose, value) => {
    count && GLctx.uniformMatrix2fv(webglGetUniformLocation(location), !!transpose, GROWABLE_HEAP_F32(), value >> 2, count * 4)
}
;
var _emscripten_glUniformMatrix2fv = _glUniformMatrix2fv;
var _glUniformMatrix2x3fv = (location, count, transpose, value) => {
    count && GLctx.uniformMatrix2x3fv(webglGetUniformLocation(location), !!transpose, GROWABLE_HEAP_F32(), value >> 2, count * 6)
}
;
var _emscripten_glUniformMatrix2x3fv = _glUniformMatrix2x3fv;
var _glUniformMatrix2x4fv = (location, count, transpose, value) => {
    count && GLctx.uniformMatrix2x4fv(webglGetUniformLocation(location), !!transpose, GROWABLE_HEAP_F32(), value >> 2, count * 8)
}
;
var _emscripten_glUniformMatrix2x4fv = _glUniformMatrix2x4fv;
var _glUniformMatrix3fv = (location, count, transpose, value) => {
    count && GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, GROWABLE_HEAP_F32(), value >> 2, count * 9)
}
;
var _emscripten_glUniformMatrix3fv = _glUniformMatrix3fv;
var _glUniformMatrix3x2fv = (location, count, transpose, value) => {
    count && GLctx.uniformMatrix3x2fv(webglGetUniformLocation(location), !!transpose, GROWABLE_HEAP_F32(), value >> 2, count * 6)
}
;
var _emscripten_glUniformMatrix3x2fv = _glUniformMatrix3x2fv;
var _glUniformMatrix3x4fv = (location, count, transpose, value) => {
    count && GLctx.uniformMatrix3x4fv(webglGetUniformLocation(location), !!transpose, GROWABLE_HEAP_F32(), value >> 2, count * 12)
}
;
var _emscripten_glUniformMatrix3x4fv = _glUniformMatrix3x4fv;
var _glUniformMatrix4fv = (location, count, transpose, value) => {
    count && GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, GROWABLE_HEAP_F32(), value >> 2, count * 16)
}
;
var _emscripten_glUniformMatrix4fv = _glUniformMatrix4fv;
var _glUniformMatrix4x2fv = (location, count, transpose, value) => {
    count && GLctx.uniformMatrix4x2fv(webglGetUniformLocation(location), !!transpose, GROWABLE_HEAP_F32(), value >> 2, count * 8)
}
;
var _emscripten_glUniformMatrix4x2fv = _glUniformMatrix4x2fv;
var _glUniformMatrix4x3fv = (location, count, transpose, value) => {
    count && GLctx.uniformMatrix4x3fv(webglGetUniformLocation(location), !!transpose, GROWABLE_HEAP_F32(), value >> 2, count * 12)
}
;
var _emscripten_glUniformMatrix4x3fv = _glUniformMatrix4x3fv;
var _glUnmapBuffer = target => {
    if (!emscriptenWebGLValidateMapBufferTarget(target)) {
        GL.recordError(1280);
        err("GL_INVALID_ENUM in glUnmapBuffer");
        return 0
    }
    var buffer = emscriptenWebGLGetBufferBinding(target);
    var mapping = GL.mappedBuffers[buffer];
    if (!mapping || !mapping.mem) {
        GL.recordError(1282);
        err("buffer was never mapped in glUnmapBuffer");
        return 0
    }
    if (!(mapping.access & 16)) {
        if (true) {
            GLctx.bufferSubData(target, mapping.offset, GROWABLE_HEAP_U8(), mapping.mem, mapping.length)
        } else
            GLctx.bufferSubData(target, mapping.offset, GROWABLE_HEAP_U8().subarray(mapping.mem, mapping.mem + mapping.length))
    }
    _free(mapping.mem);
    mapping.mem = 0;
    return 1
}
;
var _emscripten_glUnmapBuffer = _glUnmapBuffer;
var _glUseProgram = program => {
    program = GL.programs[program];
    GLctx.useProgram(program);
    GLctx.currentProgram = program
}
;
var _emscripten_glUseProgram = _glUseProgram;
var _glValidateProgram = program => {
    GLctx.validateProgram(GL.programs[program])
}
;
var _emscripten_glValidateProgram = _glValidateProgram;
var _glVertexAttrib1f = (x0, x1) => GLctx.vertexAttrib1f(x0, x1);
var _emscripten_glVertexAttrib1f = _glVertexAttrib1f;
var _glVertexAttrib1fv = (index, v) => {
    GLctx.vertexAttrib1f(index, GROWABLE_HEAP_F32()[v >> 2])
}
;
var _emscripten_glVertexAttrib1fv = _glVertexAttrib1fv;
var _glVertexAttrib2f = (x0, x1, x2) => GLctx.vertexAttrib2f(x0, x1, x2);
var _emscripten_glVertexAttrib2f = _glVertexAttrib2f;
var _glVertexAttrib2fv = (index, v) => {
    GLctx.vertexAttrib2f(index, GROWABLE_HEAP_F32()[v >> 2], GROWABLE_HEAP_F32()[v + 4 >> 2])
}
;
var _emscripten_glVertexAttrib2fv = _glVertexAttrib2fv;
var _glVertexAttrib3f = (x0, x1, x2, x3) => GLctx.vertexAttrib3f(x0, x1, x2, x3);
var _emscripten_glVertexAttrib3f = _glVertexAttrib3f;
var _glVertexAttrib3fv = (index, v) => {
    GLctx.vertexAttrib3f(index, GROWABLE_HEAP_F32()[v >> 2], GROWABLE_HEAP_F32()[v + 4 >> 2], GROWABLE_HEAP_F32()[v + 8 >> 2])
}
;
var _emscripten_glVertexAttrib3fv = _glVertexAttrib3fv;
var _glVertexAttrib4f = (x0, x1, x2, x3, x4) => GLctx.vertexAttrib4f(x0, x1, x2, x3, x4);
var _emscripten_glVertexAttrib4f = _glVertexAttrib4f;
var _glVertexAttrib4fv = (index, v) => {
    GLctx.vertexAttrib4f(index, GROWABLE_HEAP_F32()[v >> 2], GROWABLE_HEAP_F32()[v + 4 >> 2], GROWABLE_HEAP_F32()[v + 8 >> 2], GROWABLE_HEAP_F32()[v + 12 >> 2])
}
;
var _emscripten_glVertexAttrib4fv = _glVertexAttrib4fv;
var _glVertexAttribDivisor = (index, divisor) => {
    GLctx.vertexAttribDivisor(index, divisor)
}
;
var _emscripten_glVertexAttribDivisor = _glVertexAttribDivisor;
var _glVertexAttribI4i = (x0, x1, x2, x3, x4) => GLctx.vertexAttribI4i(x0, x1, x2, x3, x4);
var _emscripten_glVertexAttribI4i = _glVertexAttribI4i;
var _glVertexAttribI4iv = (index, v) => {
    GLctx.vertexAttribI4i(index, GROWABLE_HEAP_I32()[v >> 2], GROWABLE_HEAP_I32()[v + 4 >> 2], GROWABLE_HEAP_I32()[v + 8 >> 2], GROWABLE_HEAP_I32()[v + 12 >> 2])
}
;
var _emscripten_glVertexAttribI4iv = _glVertexAttribI4iv;
var _glVertexAttribI4ui = (x0, x1, x2, x3, x4) => GLctx.vertexAttribI4ui(x0, x1, x2, x3, x4);
var _emscripten_glVertexAttribI4ui = _glVertexAttribI4ui;
var _glVertexAttribI4uiv = (index, v) => {
    GLctx.vertexAttribI4ui(index, GROWABLE_HEAP_U32()[v >> 2], GROWABLE_HEAP_U32()[v + 4 >> 2], GROWABLE_HEAP_U32()[v + 8 >> 2], GROWABLE_HEAP_U32()[v + 12 >> 2])
}
;
var _emscripten_glVertexAttribI4uiv = _glVertexAttribI4uiv;
var _glVertexAttribIPointer = (index, size, type, stride, ptr) => {
    var cb = GL.currentContext.clientBuffers[index];
    if (!GLctx.currentArrayBufferBinding) {
        cb.size = size;
        cb.type = type;
        cb.normalized = false;
        cb.stride = stride;
        cb.ptr = ptr;
        cb.clientside = true;
        cb.vertexAttribPointerAdaptor = function(index, size, type, normalized, stride, ptr) {
            this.vertexAttribIPointer(index, size, type, stride, ptr)
        }
        ;
        return
    }
    cb.clientside = false;
    GLctx.vertexAttribIPointer(index, size, type, stride, ptr)
}
;
var _emscripten_glVertexAttribIPointer = _glVertexAttribIPointer;
var _glVertexAttribPointer = (index, size, type, normalized, stride, ptr) => {
    var cb = GL.currentContext.clientBuffers[index];
    if (!GLctx.currentArrayBufferBinding) {
        cb.size = size;
        cb.type = type;
        cb.normalized = normalized;
        cb.stride = stride;
        cb.ptr = ptr;
        cb.clientside = true;
        cb.vertexAttribPointerAdaptor = function(index, size, type, normalized, stride, ptr) {
            this.vertexAttribPointer(index, size, type, normalized, stride, ptr)
        }
        ;
        return
    }
    cb.clientside = false;
    GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr)
}
;
var _emscripten_glVertexAttribPointer = _glVertexAttribPointer;
var _glViewport = (x0, x1, x2, x3) => GLctx.viewport(x0, x1, x2, x3);
var _emscripten_glViewport = _glViewport;
var _glWaitSync = (sync, flags, timeout) => {
    timeout = Number(timeout);
    GLctx.waitSync(GL.syncs[sync], flags, timeout)
}
;
var _emscripten_glWaitSync = _glWaitSync;
var _emscripten_has_asyncify = () => 0;
function _emscripten_hide_mouse() {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(51, 0, 1);
    var styleSheet = document.styleSheets[0];
    var rules = styleSheet.cssRules;
    for (var i = 0; i < rules.length; i++) {
        if (rules[i].cssText.startsWith("canvas")) {
            styleSheet.deleteRule(i);
            i--
        }
    }
    styleSheet.insertRule("canvas.emscripten { border: 1px solid black; cursor: none; }", 0)
}
var _emscripten_num_logical_cores = () => navigator["hardwareConcurrency"];
var doRequestFullscreen = (target, strategy) => {
    if (!JSEvents.fullscreenEnabled())
        return -1;
    target = findEventTarget(target);
    if (!target)
        return -4;
    if (!target.requestFullscreen && !target.webkitRequestFullscreen) {
        return -3
    }
    if (!JSEvents.canPerformEventHandlerRequests()) {
        if (strategy.deferUntilInEventHandler) {
            JSEvents.deferCall(JSEvents_requestFullscreen, 1, [target, strategy]);
            return 1
        }
        return -2
    }
    return JSEvents_requestFullscreen(target, strategy)
}
;
function _emscripten_request_fullscreen_strategy(target, deferUntilInEventHandler, fullscreenStrategy) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(52, 0, 1, target, deferUntilInEventHandler, fullscreenStrategy);
    var strategy = {
        scaleMode: GROWABLE_HEAP_I32()[fullscreenStrategy >> 2],
        canvasResolutionScaleMode: GROWABLE_HEAP_I32()[fullscreenStrategy + 4 >> 2],
        filteringMode: GROWABLE_HEAP_I32()[fullscreenStrategy + 8 >> 2],
        deferUntilInEventHandler,
        canvasResizedCallbackTargetThread: GROWABLE_HEAP_I32()[fullscreenStrategy + 20 >> 2],
        canvasResizedCallback: GROWABLE_HEAP_I32()[fullscreenStrategy + 12 >> 2],
        canvasResizedCallbackUserData: GROWABLE_HEAP_I32()[fullscreenStrategy + 16 >> 2]
    };
    return doRequestFullscreen(target, strategy)
}
function _emscripten_request_pointerlock(target, deferUntilInEventHandler) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(53, 0, 1, target, deferUntilInEventHandler);
    target = findEventTarget(target);
    if (!target)
        return -4;
    if (!target.requestPointerLock) {
        return -1
    }
    if (!JSEvents.canPerformEventHandlerRequests()) {
        if (deferUntilInEventHandler) {
            JSEvents.deferCall(requestPointerLock, 2, [target]);
            return 1
        }
        return -2
    }
    return requestPointerLock(target)
}
var growMemory = size => {
    var b = wasmMemory.buffer;
    var pages = (size - b.byteLength + 65535) / 65536 | 0;
    dbg(`growMemory: ${size} (+${size - b.byteLength} bytes / ${pages} pages)`);
    try {
        wasmMemory.grow(pages);
        updateMemoryViews();
        return 1
    } catch (e) {
        err(`growMemory: Attempted to grow heap from ${b.byteLength} bytes to ${size} bytes, but got error: ${e}`)
    }
}
;
var _emscripten_resize_heap = requestedSize => {
    var oldSize = GROWABLE_HEAP_U8().length;
    requestedSize >>>= 0;
    if (requestedSize <= oldSize) {
        return false
    }
    var maxHeapSize = getHeapMax();
    if (requestedSize > maxHeapSize) {
        err(`Cannot enlarge memory, requested ${requestedSize} bytes, but the limit is ${maxHeapSize} bytes!`);
        return false
    }
    for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + .2 / cutDown);
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
        var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
        var replacement = growMemory(newSize);
        if (replacement) {
            return true
        }
    }
    err(`Failed to grow the heap from ${oldSize} bytes to ${newSize} bytes, not enough memory!`);
    return false
}
;
function _emscripten_sample_gamepad_data() {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(54, 0, 1);
    try {
        if (navigator.getGamepads)
            return (JSEvents.lastGamepadState = navigator.getGamepads()) ? 0 : -1
    } catch (e) {
        err(`navigator.getGamepads() exists, but failed to execute with exception ${e}. Disabling Gamepad access.`);
        navigator.getGamepads = null
    }
    return -1
}
var registerBeforeUnloadEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString) => {
    var beforeUnloadEventHandlerFunc = (e=event) => {
        var confirmationMessage = getWasmTableEntry(callbackfunc)(eventTypeId, 0, userData);
        if (confirmationMessage) {
            confirmationMessage = UTF8ToString(confirmationMessage)
        }
        if (confirmationMessage) {
            e.preventDefault();
            e.returnValue = confirmationMessage;
            return confirmationMessage
        }
    }
    ;
    var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: beforeUnloadEventHandlerFunc,
        useCapture
    };
    return JSEvents.registerOrRemoveHandler(eventHandler)
}
;
function _emscripten_set_beforeunload_callback_on_thread(userData, callbackfunc, targetThread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(55, 0, 1, userData, callbackfunc, targetThread);
    if (typeof onbeforeunload == "undefined")
        return -1;
    if (targetThread !== 1)
        return -5;
    return registerBeforeUnloadEventCallback(2, userData, true, callbackfunc, 28, "beforeunload")
}
var registerFocusEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
    targetThread = JSEvents.getTargetThreadForEventCallback(targetThread);
    JSEvents.focusEvent ||= _malloc(256);
    var focusEventHandlerFunc = (e=event) => {
        var nodeName = JSEvents.getNodeNameForTarget(e.target);
        var id = e.target.id ? e.target.id : "";
        var focusEvent = targetThread ? _malloc(256) : JSEvents.focusEvent;
        stringToUTF8(nodeName, focusEvent + 0, 128);
        stringToUTF8(id, focusEvent + 128, 128);
        if (targetThread)
            __emscripten_run_callback_on_thread(targetThread, callbackfunc, eventTypeId, focusEvent, userData);
        else if (getWasmTableEntry(callbackfunc)(eventTypeId, focusEvent, userData))
            e.preventDefault()
    }
    ;
    var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: focusEventHandlerFunc,
        useCapture
    };
    return JSEvents.registerOrRemoveHandler(eventHandler)
}
;
function _emscripten_set_blur_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(56, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
    return registerFocusEventCallback(target, userData, useCapture, callbackfunc, 12, "blur", targetThread)
}
function _emscripten_set_element_css_size(target, width, height) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(57, 0, 1, target, width, height);
    target = findEventTarget(target);
    if (!target)
        return -4;
    target.style.width = width + "px";
    target.style.height = height + "px";
    return 0
}
function _emscripten_set_focus_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(58, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
    return registerFocusEventCallback(target, userData, useCapture, callbackfunc, 13, "focus", targetThread)
}
var fillFullscreenChangeEventData = eventStruct => {
    var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    var isFullscreen = !!fullscreenElement;
    GROWABLE_HEAP_I8()[eventStruct] = isFullscreen;
    GROWABLE_HEAP_I8()[eventStruct + 1] = JSEvents.fullscreenEnabled();
    var reportedElement = isFullscreen ? fullscreenElement : JSEvents.previousFullscreenElement;
    var nodeName = JSEvents.getNodeNameForTarget(reportedElement);
    var id = reportedElement?.id || "";
    stringToUTF8(nodeName, eventStruct + 2, 128);
    stringToUTF8(id, eventStruct + 130, 128);
    GROWABLE_HEAP_I32()[eventStruct + 260 >> 2] = reportedElement ? reportedElement.clientWidth : 0;
    GROWABLE_HEAP_I32()[eventStruct + 264 >> 2] = reportedElement ? reportedElement.clientHeight : 0;
    GROWABLE_HEAP_I32()[eventStruct + 268 >> 2] = screen.width;
    GROWABLE_HEAP_I32()[eventStruct + 272 >> 2] = screen.height;
    if (isFullscreen) {
        JSEvents.previousFullscreenElement = fullscreenElement
    }
}
;
var registerFullscreenChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
    targetThread = JSEvents.getTargetThreadForEventCallback(targetThread);
    JSEvents.fullscreenChangeEvent ||= _malloc(276);
    var fullscreenChangeEventhandlerFunc = (e=event) => {
        var fullscreenChangeEvent = targetThread ? _malloc(276) : JSEvents.fullscreenChangeEvent;
        fillFullscreenChangeEventData(fullscreenChangeEvent);
        if (targetThread)
            __emscripten_run_callback_on_thread(targetThread, callbackfunc, eventTypeId, fullscreenChangeEvent, userData);
        else if (getWasmTableEntry(callbackfunc)(eventTypeId, fullscreenChangeEvent, userData))
            e.preventDefault()
    }
    ;
    var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: fullscreenChangeEventhandlerFunc,
        useCapture
    };
    return JSEvents.registerOrRemoveHandler(eventHandler)
}
;
function _emscripten_set_fullscreenchange_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(59, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
    if (!JSEvents.fullscreenEnabled())
        return -1;
    target = findEventTarget(target);
    if (!target)
        return -4;
    registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "webkitfullscreenchange", targetThread);
    return registerFullscreenChangeEventCallback(target, userData, useCapture, callbackfunc, 19, "fullscreenchange", targetThread)
}
var registerGamepadEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
    targetThread = JSEvents.getTargetThreadForEventCallback(targetThread);
    JSEvents.gamepadEvent ||= _malloc(1240);
    var gamepadEventHandlerFunc = (e=event) => {
        var gamepadEvent = targetThread ? _malloc(1240) : JSEvents.gamepadEvent;
        fillGamepadEventData(gamepadEvent, e["gamepad"]);
        if (targetThread)
            __emscripten_run_callback_on_thread(targetThread, callbackfunc, eventTypeId, gamepadEvent, userData);
        else if (getWasmTableEntry(callbackfunc)(eventTypeId, gamepadEvent, userData))
            e.preventDefault()
    }
    ;
    var eventHandler = {
        target: findEventTarget(target),
        allowsDeferredCalls: true,
        eventTypeString,
        callbackfunc,
        handlerFunc: gamepadEventHandlerFunc,
        useCapture
    };
    return JSEvents.registerOrRemoveHandler(eventHandler)
}
;
function _emscripten_set_gamepadconnected_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(60, 0, 1, userData, useCapture, callbackfunc, targetThread);
    if (_emscripten_sample_gamepad_data())
        return -1;
    return registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 26, "gamepadconnected", targetThread)
}
function _emscripten_set_gamepaddisconnected_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(61, 0, 1, userData, useCapture, callbackfunc, targetThread);
    if (_emscripten_sample_gamepad_data())
        return -1;
    return registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 27, "gamepaddisconnected", targetThread)
}
var registerKeyEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
    targetThread = JSEvents.getTargetThreadForEventCallback(targetThread);
    JSEvents.keyEvent ||= _malloc(160);
    var keyEventHandlerFunc = e => {
        assert(e);
        var keyEventData = targetThread ? _malloc(160) : JSEvents.keyEvent;
        GROWABLE_HEAP_F64()[keyEventData >> 3] = e.timeStamp;
        var idx = keyEventData >> 2;
        GROWABLE_HEAP_I32()[idx + 2] = e.location;
        GROWABLE_HEAP_I8()[keyEventData + 12] = e.ctrlKey;
        GROWABLE_HEAP_I8()[keyEventData + 13] = e.shiftKey;
        GROWABLE_HEAP_I8()[keyEventData + 14] = e.altKey;
        GROWABLE_HEAP_I8()[keyEventData + 15] = e.metaKey;
        GROWABLE_HEAP_I8()[keyEventData + 16] = e.repeat;
        GROWABLE_HEAP_I32()[idx + 5] = e.charCode;
        GROWABLE_HEAP_I32()[idx + 6] = e.keyCode;
        GROWABLE_HEAP_I32()[idx + 7] = e.which;
        stringToUTF8(e.key || "", keyEventData + 32, 32);
        stringToUTF8(e.code || "", keyEventData + 64, 32);
        stringToUTF8(e.char || "", keyEventData + 96, 32);
        stringToUTF8(e.locale || "", keyEventData + 128, 32);
        if (targetThread)
            __emscripten_run_callback_on_thread(targetThread, callbackfunc, eventTypeId, keyEventData, userData);
        else if (getWasmTableEntry(callbackfunc)(eventTypeId, keyEventData, userData))
            e.preventDefault()
    }
    ;
    var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: keyEventHandlerFunc,
        useCapture
    };
    return JSEvents.registerOrRemoveHandler(eventHandler)
}
;
function _emscripten_set_keydown_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(62, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
    return registerKeyEventCallback(target, userData, useCapture, callbackfunc, 2, "keydown", targetThread)
}
function _emscripten_set_keypress_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(63, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
    return registerKeyEventCallback(target, userData, useCapture, callbackfunc, 1, "keypress", targetThread)
}
function _emscripten_set_keyup_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(64, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
    return registerKeyEventCallback(target, userData, useCapture, callbackfunc, 3, "keyup", targetThread)
}
var _emscripten_set_main_loop = (func, fps, simulateInfiniteLoop) => {
    var iterFunc = getWasmTableEntry(func);
    setMainLoop(iterFunc, fps, simulateInfiniteLoop)
}
;
var fillMouseEventData = (eventStruct, e, target) => {
    assert(eventStruct % 4 == 0);
    GROWABLE_HEAP_F64()[eventStruct >> 3] = e.timeStamp;
    var idx = eventStruct >> 2;
    GROWABLE_HEAP_I32()[idx + 2] = e.screenX;
    GROWABLE_HEAP_I32()[idx + 3] = e.screenY;
    GROWABLE_HEAP_I32()[idx + 4] = e.clientX;
    GROWABLE_HEAP_I32()[idx + 5] = e.clientY;
    GROWABLE_HEAP_I8()[eventStruct + 24] = e.ctrlKey;
    GROWABLE_HEAP_I8()[eventStruct + 25] = e.shiftKey;
    GROWABLE_HEAP_I8()[eventStruct + 26] = e.altKey;
    GROWABLE_HEAP_I8()[eventStruct + 27] = e.metaKey;
    GROWABLE_HEAP_I16()[idx * 2 + 14] = e.button;
    GROWABLE_HEAP_I16()[idx * 2 + 15] = e.buttons;
    GROWABLE_HEAP_I32()[idx + 8] = e["movementX"];
    GROWABLE_HEAP_I32()[idx + 9] = e["movementY"];
    var rect = getBoundingClientRect(target);
    GROWABLE_HEAP_I32()[idx + 10] = e.clientX - (rect.left | 0);
    GROWABLE_HEAP_I32()[idx + 11] = e.clientY - (rect.top | 0)
}
;
var registerMouseEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
    targetThread = JSEvents.getTargetThreadForEventCallback(targetThread);
    JSEvents.mouseEvent ||= _malloc(64);
    target = findEventTarget(target);
    var mouseEventHandlerFunc = (e=event) => {
        fillMouseEventData(JSEvents.mouseEvent, e, target);
        if (targetThread) {
            var mouseEventData = _malloc(64);
            fillMouseEventData(mouseEventData, e, target);
            __emscripten_run_callback_on_thread(targetThread, callbackfunc, eventTypeId, mouseEventData, userData)
        } else if (getWasmTableEntry(callbackfunc)(eventTypeId, JSEvents.mouseEvent, userData))
            e.preventDefault()
    }
    ;
    var eventHandler = {
        target,
        allowsDeferredCalls: eventTypeString != "mousemove" && eventTypeString != "mouseenter" && eventTypeString != "mouseleave",
        eventTypeString,
        callbackfunc,
        handlerFunc: mouseEventHandlerFunc,
        useCapture
    };
    return JSEvents.registerOrRemoveHandler(eventHandler)
}
;
function _emscripten_set_mousedown_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(65, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
    return registerMouseEventCallback(target, userData, useCapture, callbackfunc, 5, "mousedown", targetThread)
}
function _emscripten_set_mouseenter_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(66, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
    return registerMouseEventCallback(target, userData, useCapture, callbackfunc, 33, "mouseenter", targetThread)
}
function _emscripten_set_mouseleave_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(67, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
    return registerMouseEventCallback(target, userData, useCapture, callbackfunc, 34, "mouseleave", targetThread)
}
function _emscripten_set_mousemove_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(68, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
    return registerMouseEventCallback(target, userData, useCapture, callbackfunc, 8, "mousemove", targetThread)
}
function _emscripten_set_mouseup_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(69, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
    return registerMouseEventCallback(target, userData, useCapture, callbackfunc, 6, "mouseup", targetThread)
}
var fillPointerlockChangeEventData = eventStruct => {
    var pointerLockElement = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement;
    var isPointerlocked = !!pointerLockElement;
    GROWABLE_HEAP_I8()[eventStruct] = isPointerlocked;
    var nodeName = JSEvents.getNodeNameForTarget(pointerLockElement);
    var id = pointerLockElement?.id || "";
    stringToUTF8(nodeName, eventStruct + 1, 128);
    stringToUTF8(id, eventStruct + 129, 128)
}
;
var registerPointerlockChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
    targetThread = JSEvents.getTargetThreadForEventCallback(targetThread);
    JSEvents.pointerlockChangeEvent ||= _malloc(257);
    var pointerlockChangeEventHandlerFunc = (e=event) => {
        var pointerlockChangeEvent = targetThread ? _malloc(257) : JSEvents.pointerlockChangeEvent;
        fillPointerlockChangeEventData(pointerlockChangeEvent);
        if (targetThread)
            __emscripten_run_callback_on_thread(targetThread, callbackfunc, eventTypeId, pointerlockChangeEvent, userData);
        else if (getWasmTableEntry(callbackfunc)(eventTypeId, pointerlockChangeEvent, userData))
            e.preventDefault()
    }
    ;
    var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: pointerlockChangeEventHandlerFunc,
        useCapture
    };
    return JSEvents.registerOrRemoveHandler(eventHandler)
}
;
function _emscripten_set_pointerlockchange_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(70, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
    if (!document || !document.body || !document.body.requestPointerLock && !document.body.mozRequestPointerLock && !document.body.webkitRequestPointerLock && !document.body.msRequestPointerLock) {
        return -1
    }
    target = findEventTarget(target);
    if (!target)
        return -4;
    registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "mozpointerlockchange", targetThread);
    registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "webkitpointerlockchange", targetThread);
    registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "mspointerlockchange", targetThread);
    return registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "pointerlockchange", targetThread)
}
var registerUiEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
    targetThread = JSEvents.getTargetThreadForEventCallback(targetThread);
    JSEvents.uiEvent ||= _malloc(36);
    target = findEventTarget(target);
    var uiEventHandlerFunc = (e=event) => {
        if (e.target != target) {
            return
        }
        var b = document.body;
        if (!b) {
            return
        }
        var uiEvent = targetThread ? _malloc(36) : JSEvents.uiEvent;
        GROWABLE_HEAP_I32()[uiEvent >> 2] = 0;
        GROWABLE_HEAP_I32()[uiEvent + 4 >> 2] = b.clientWidth;
        GROWABLE_HEAP_I32()[uiEvent + 8 >> 2] = b.clientHeight;
        GROWABLE_HEAP_I32()[uiEvent + 12 >> 2] = innerWidth;
        GROWABLE_HEAP_I32()[uiEvent + 16 >> 2] = innerHeight;
        GROWABLE_HEAP_I32()[uiEvent + 20 >> 2] = outerWidth;
        GROWABLE_HEAP_I32()[uiEvent + 24 >> 2] = outerHeight;
        GROWABLE_HEAP_I32()[uiEvent + 28 >> 2] = pageXOffset | 0;
        GROWABLE_HEAP_I32()[uiEvent + 32 >> 2] = pageYOffset | 0;
        if (targetThread)
            __emscripten_run_callback_on_thread(targetThread, callbackfunc, eventTypeId, uiEvent, userData);
        else if (getWasmTableEntry(callbackfunc)(eventTypeId, uiEvent, userData))
            e.preventDefault()
    }
    ;
    var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: uiEventHandlerFunc,
        useCapture
    };
    return JSEvents.registerOrRemoveHandler(eventHandler)
}
;
function _emscripten_set_resize_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(71, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
    return registerUiEventCallback(target, userData, useCapture, callbackfunc, 10, "resize", targetThread)
}
var registerTouchEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
    targetThread = JSEvents.getTargetThreadForEventCallback(targetThread);
    JSEvents.touchEvent ||= _malloc(1552);
    target = findEventTarget(target);
    var touchEventHandlerFunc = e => {
        assert(e);
        var t, touches = {}, et = e.touches;
        for (let t of et) {
            t.isChanged = t.onTarget = 0;
            touches[t.identifier] = t
        }
        for (let t of e.changedTouches) {
            t.isChanged = 1;
            touches[t.identifier] = t
        }
        for (let t of e.targetTouches) {
            touches[t.identifier].onTarget = 1
        }
        var touchEvent = targetThread ? _malloc(1552) : JSEvents.touchEvent;
        GROWABLE_HEAP_F64()[touchEvent >> 3] = e.timeStamp;
        GROWABLE_HEAP_I8()[touchEvent + 12] = e.ctrlKey;
        GROWABLE_HEAP_I8()[touchEvent + 13] = e.shiftKey;
        GROWABLE_HEAP_I8()[touchEvent + 14] = e.altKey;
        GROWABLE_HEAP_I8()[touchEvent + 15] = e.metaKey;
        var idx = touchEvent + 16;
        var targetRect = getBoundingClientRect(target);
        var numTouches = 0;
        for (let t of Object.values(touches)) {
            var idx32 = idx >> 2;
            GROWABLE_HEAP_I32()[idx32 + 0] = t.identifier;
            GROWABLE_HEAP_I32()[idx32 + 1] = t.screenX;
            GROWABLE_HEAP_I32()[idx32 + 2] = t.screenY;
            GROWABLE_HEAP_I32()[idx32 + 3] = t.clientX;
            GROWABLE_HEAP_I32()[idx32 + 4] = t.clientY;
            GROWABLE_HEAP_I32()[idx32 + 5] = t.pageX;
            GROWABLE_HEAP_I32()[idx32 + 6] = t.pageY;
            GROWABLE_HEAP_I8()[idx + 28] = t.isChanged;
            GROWABLE_HEAP_I8()[idx + 29] = t.onTarget;
            GROWABLE_HEAP_I32()[idx32 + 8] = t.clientX - (targetRect.left | 0);
            GROWABLE_HEAP_I32()[idx32 + 9] = t.clientY - (targetRect.top | 0);
            idx += 48;
            if (++numTouches > 31) {
                break
            }
        }
        GROWABLE_HEAP_I32()[touchEvent + 8 >> 2] = numTouches;
        if (targetThread)
            __emscripten_run_callback_on_thread(targetThread, callbackfunc, eventTypeId, touchEvent, userData);
        else if (getWasmTableEntry(callbackfunc)(eventTypeId, touchEvent, userData))
            e.preventDefault()
    }
    ;
    var eventHandler = {
        target,
        allowsDeferredCalls: eventTypeString == "touchstart" || eventTypeString == "touchend",
        eventTypeString,
        callbackfunc,
        handlerFunc: touchEventHandlerFunc,
        useCapture
    };
    return JSEvents.registerOrRemoveHandler(eventHandler)
}
;
function _emscripten_set_touchcancel_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(72, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
    return registerTouchEventCallback(target, userData, useCapture, callbackfunc, 25, "touchcancel", targetThread)
}
function _emscripten_set_touchend_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(73, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
    return registerTouchEventCallback(target, userData, useCapture, callbackfunc, 23, "touchend", targetThread)
}
function _emscripten_set_touchmove_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(74, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
    return registerTouchEventCallback(target, userData, useCapture, callbackfunc, 24, "touchmove", targetThread)
}
function _emscripten_set_touchstart_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(75, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
    return registerTouchEventCallback(target, userData, useCapture, callbackfunc, 22, "touchstart", targetThread)
}
var fillVisibilityChangeEventData = eventStruct => {
    var visibilityStates = ["hidden", "visible", "prerender", "unloaded"];
    var visibilityState = visibilityStates.indexOf(document.visibilityState);
    GROWABLE_HEAP_I8()[eventStruct] = document.hidden;
    GROWABLE_HEAP_I32()[eventStruct + 4 >> 2] = visibilityState
}
;
var registerVisibilityChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
    targetThread = JSEvents.getTargetThreadForEventCallback(targetThread);
    JSEvents.visibilityChangeEvent ||= _malloc(8);
    var visibilityChangeEventHandlerFunc = (e=event) => {
        var visibilityChangeEvent = targetThread ? _malloc(8) : JSEvents.visibilityChangeEvent;
        fillVisibilityChangeEventData(visibilityChangeEvent);
        if (targetThread)
            __emscripten_run_callback_on_thread(targetThread, callbackfunc, eventTypeId, visibilityChangeEvent, userData);
        else if (getWasmTableEntry(callbackfunc)(eventTypeId, visibilityChangeEvent, userData))
            e.preventDefault()
    }
    ;
    var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: visibilityChangeEventHandlerFunc,
        useCapture
    };
    return JSEvents.registerOrRemoveHandler(eventHandler)
}
;
function _emscripten_set_visibilitychange_callback_on_thread(userData, useCapture, callbackfunc, targetThread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(76, 0, 1, userData, useCapture, callbackfunc, targetThread);
    if (!specialHTMLTargets[1]) {
        return -4
    }
    return registerVisibilityChangeEventCallback(specialHTMLTargets[1], userData, useCapture, callbackfunc, 21, "visibilitychange", targetThread)
}
var registerWheelEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
    targetThread = JSEvents.getTargetThreadForEventCallback(targetThread);
    JSEvents.wheelEvent ||= _malloc(96);
    var wheelHandlerFunc = (e=event) => {
        var wheelEvent = targetThread ? _malloc(96) : JSEvents.wheelEvent;
        fillMouseEventData(wheelEvent, e, target);
        GROWABLE_HEAP_F64()[wheelEvent + 64 >> 3] = e["deltaX"];
        GROWABLE_HEAP_F64()[wheelEvent + 72 >> 3] = e["deltaY"];
        GROWABLE_HEAP_F64()[wheelEvent + 80 >> 3] = e["deltaZ"];
        GROWABLE_HEAP_I32()[wheelEvent + 88 >> 2] = e["deltaMode"];
        if (targetThread)
            __emscripten_run_callback_on_thread(targetThread, callbackfunc, eventTypeId, wheelEvent, userData);
        else if (getWasmTableEntry(callbackfunc)(eventTypeId, wheelEvent, userData))
            e.preventDefault()
    }
    ;
    var eventHandler = {
        target,
        allowsDeferredCalls: true,
        eventTypeString,
        callbackfunc,
        handlerFunc: wheelHandlerFunc,
        useCapture
    };
    return JSEvents.registerOrRemoveHandler(eventHandler)
}
;
function _emscripten_set_wheel_callback_on_thread(target, userData, useCapture, callbackfunc, targetThread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(77, 0, 1, target, userData, useCapture, callbackfunc, targetThread);
    target = findEventTarget(target);
    if (!target)
        return -4;
    if (typeof target.onwheel != "undefined") {
        return registerWheelEventCallback(target, userData, useCapture, callbackfunc, 9, "wheel", targetThread)
    } else {
        return -1
    }
}
function _emscripten_set_window_title(title) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(78, 0, 1, title);
    return document.title = UTF8ToString(title)
}
var _emscripten_sleep = () => {
    throw "Please compile your program with async support in order to use asynchronous operations like emscripten_sleep"
}
;
class HandleAllocator {
    allocated = [undefined];
    freelist = [];
    get(id) {
        assert(this.allocated[id] !== undefined, `invalid handle: ${id}`);
        return this.allocated[id]
    }
    has(id) {
        return this.allocated[id] !== undefined
    }
    allocate(handle) {
        var id = this.freelist.pop() || this.allocated.length;
        this.allocated[id] = handle;
        return id
    }
    free(id) {
        assert(this.allocated[id] !== undefined);
        this.allocated[id] = undefined;
        this.freelist.push(id)
    }
}
var Fetch = {
    openDatabase(dbname, dbversion, onsuccess, onerror) {
        try {
            var openRequest = indexedDB.open(dbname, dbversion)
        } catch (e) {
            return onerror(e)
        }
        openRequest.onupgradeneeded = event => {
            var db = event.target.result;
            if (db.objectStoreNames.contains("FILES")) {
                db.deleteObjectStore("FILES")
            }
            db.createObjectStore("FILES")
        }
        ;
        openRequest.onsuccess = event => onsuccess(event.target.result);
        openRequest.onerror = onerror
    },
    init() {
        Fetch.xhrs = new HandleAllocator;
        if (ENVIRONMENT_IS_PTHREAD)
            return;
        var onsuccess = db => {
            Fetch.dbInstance = db;
            removeRunDependency("library_fetch_init")
        }
        ;
        var onerror = () => {
            Fetch.dbInstance = false;
            removeRunDependency("library_fetch_init")
        }
        ;
        addRunDependency("library_fetch_init");
        Fetch.openDatabase("emscripten_filesystem", 1, onsuccess, onerror)
    }
};
function fetchXHR(fetch, onsuccess, onerror, onprogress, onreadystatechange) {
    var url = GROWABLE_HEAP_U32()[fetch + 8 >> 2];
    if (!url) {
        onerror(fetch, 0, "no url specified!");
        return
    }
    var url_ = UTF8ToString(url);
    var fetch_attr = fetch + 108;
    var requestMethod = UTF8ToString(fetch_attr + 0);
    requestMethod ||= "GET";
    var timeoutMsecs = GROWABLE_HEAP_U32()[fetch_attr + 56 >> 2];
    var userName = GROWABLE_HEAP_U32()[fetch_attr + 68 >> 2];
    var password = GROWABLE_HEAP_U32()[fetch_attr + 72 >> 2];
    var requestHeaders = GROWABLE_HEAP_U32()[fetch_attr + 76 >> 2];
    var overriddenMimeType = GROWABLE_HEAP_U32()[fetch_attr + 80 >> 2];
    var dataPtr = GROWABLE_HEAP_U32()[fetch_attr + 84 >> 2];
    var dataLength = GROWABLE_HEAP_U32()[fetch_attr + 88 >> 2];
    var fetchAttributes = GROWABLE_HEAP_U32()[fetch_attr + 52 >> 2];
    var fetchAttrLoadToMemory = !!(fetchAttributes & 1);
    var fetchAttrStreamData = !!(fetchAttributes & 2);
    var fetchAttrSynchronous = !!(fetchAttributes & 64);
    var userNameStr = userName ? UTF8ToString(userName) : undefined;
    var passwordStr = password ? UTF8ToString(password) : undefined;
    var xhr = new XMLHttpRequest;
    xhr.withCredentials = !!GROWABLE_HEAP_U8()[fetch_attr + 60];
    xhr.open(requestMethod, url_, !fetchAttrSynchronous, userNameStr, passwordStr);
    if (!fetchAttrSynchronous)
        xhr.timeout = timeoutMsecs;
    xhr.url_ = url_;
    assert(!fetchAttrStreamData, "streaming uses moz-chunked-arraybuffer which is no longer supported; TODO: rewrite using fetch()");
    xhr.responseType = "arraybuffer";
    if (overriddenMimeType) {
        var overriddenMimeTypeStr = UTF8ToString(overriddenMimeType);
        xhr.overrideMimeType(overriddenMimeTypeStr)
    }
    if (requestHeaders) {
        for (; ; ) {
            var key = GROWABLE_HEAP_U32()[requestHeaders >> 2];
            if (!key)
                break;
            var value = GROWABLE_HEAP_U32()[requestHeaders + 4 >> 2];
            if (!value)
                break;
            requestHeaders += 8;
            var keyStr = UTF8ToString(key);
            var valueStr = UTF8ToString(value);
            xhr.setRequestHeader(keyStr, valueStr)
        }
    }
    var id = Fetch.xhrs.allocate(xhr);
    GROWABLE_HEAP_U32()[fetch >> 2] = id;
    var data = dataPtr && dataLength ? GROWABLE_HEAP_U8().slice(dataPtr, dataPtr + dataLength) : null;
    function saveResponseAndStatus() {
        var ptr = 0;
        var ptrLen = 0;
        if (xhr.response && fetchAttrLoadToMemory && GROWABLE_HEAP_U32()[fetch + 12 >> 2] === 0) {
            ptrLen = xhr.response.byteLength
        }
        if (ptrLen > 0) {
            ptr = _malloc(ptrLen);
            GROWABLE_HEAP_U8().set(new Uint8Array(xhr.response), ptr)
        }
        GROWABLE_HEAP_U32()[fetch + 12 >> 2] = ptr;
        writeI53ToI64(fetch + 16, ptrLen);
        writeI53ToI64(fetch + 24, 0);
        var len = xhr.response ? xhr.response.byteLength : 0;
        if (len) {
            writeI53ToI64(fetch + 32, len)
        }
        GROWABLE_HEAP_I16()[fetch + 40 >> 1] = xhr.readyState;
        GROWABLE_HEAP_I16()[fetch + 42 >> 1] = xhr.status;
        if (xhr.statusText)
            stringToUTF8(xhr.statusText, fetch + 44, 64)
    }
    xhr.onload = e => {
        if (!Fetch.xhrs.has(id)) {
            return
        }
        saveResponseAndStatus();
        if (xhr.status >= 200 && xhr.status < 300) {
            onsuccess?.(fetch, xhr, e)
        } else {
            onerror?.(fetch, xhr, e)
        }
    }
    ;
    xhr.onerror = e => {
        if (!Fetch.xhrs.has(id)) {
            return
        }
        saveResponseAndStatus();
        onerror?.(fetch, xhr, e)
    }
    ;
    xhr.ontimeout = e => {
        if (!Fetch.xhrs.has(id)) {
            return
        }
        onerror?.(fetch, xhr, e)
    }
    ;
    xhr.onprogress = e => {
        if (!Fetch.xhrs.has(id)) {
            return
        }
        var ptrLen = fetchAttrLoadToMemory && fetchAttrStreamData && xhr.response ? xhr.response.byteLength : 0;
        var ptr = 0;
        if (ptrLen > 0 && fetchAttrLoadToMemory && fetchAttrStreamData) {
            assert(onprogress, "When doing a streaming fetch, you should have an onprogress handler registered to receive the chunks!");
            ptr = _malloc(ptrLen);
            GROWABLE_HEAP_U8().set(new Uint8Array(xhr.response), ptr)
        }
        GROWABLE_HEAP_U32()[fetch + 12 >> 2] = ptr;
        writeI53ToI64(fetch + 16, ptrLen);
        writeI53ToI64(fetch + 24, e.loaded - ptrLen);
        writeI53ToI64(fetch + 32, e.total);
        GROWABLE_HEAP_I16()[fetch + 40 >> 1] = xhr.readyState;
        if (xhr.readyState >= 3 && xhr.status === 0 && e.loaded > 0)
            xhr.status = 200;
        GROWABLE_HEAP_I16()[fetch + 42 >> 1] = xhr.status;
        if (xhr.statusText)
            stringToUTF8(xhr.statusText, fetch + 44, 64);
        onprogress?.(fetch, xhr, e);
        if (ptr) {
            _free(ptr)
        }
    }
    ;
    xhr.onreadystatechange = e => {
        if (!Fetch.xhrs.has(id)) {
            runtimeKeepalivePop();
            return
        }
        GROWABLE_HEAP_I16()[fetch + 40 >> 1] = xhr.readyState;
        if (xhr.readyState >= 2) {
            GROWABLE_HEAP_I16()[fetch + 42 >> 1] = xhr.status
        }
        onreadystatechange?.(fetch, xhr, e)
    }
    ;
    try {
        xhr.send(data)
    } catch (e) {
        onerror?.(fetch, xhr, e)
    }
}
function fetchCacheData(db, fetch, data, onsuccess, onerror) {
    if (!db) {
        onerror(fetch, 0, "IndexedDB not available!");
        return
    }
    var fetch_attr = fetch + 108;
    var destinationPath = GROWABLE_HEAP_U32()[fetch_attr + 64 >> 2];
    destinationPath ||= GROWABLE_HEAP_U32()[fetch + 8 >> 2];
    var destinationPathStr = UTF8ToString(destinationPath);
    try {
        var transaction = db.transaction(["FILES"], "readwrite");
        var packages = transaction.objectStore("FILES");
        var putRequest = packages.put(data, destinationPathStr);
        putRequest.onsuccess = event => {
            GROWABLE_HEAP_I16()[fetch + 40 >> 1] = 4;
            GROWABLE_HEAP_I16()[fetch + 42 >> 1] = 200;
            stringToUTF8("OK", fetch + 44, 64);
            onsuccess(fetch, 0, destinationPathStr)
        }
        ;
        putRequest.onerror = error => {
            GROWABLE_HEAP_I16()[fetch + 40 >> 1] = 4;
            GROWABLE_HEAP_I16()[fetch + 42 >> 1] = 413;
            stringToUTF8("Payload Too Large", fetch + 44, 64);
            onerror(fetch, 0, error)
        }
    } catch (e) {
        onerror(fetch, 0, e)
    }
}
function fetchLoadCachedData(db, fetch, onsuccess, onerror) {
    if (!db) {
        onerror(fetch, 0, "IndexedDB not available!");
        return
    }
    var fetch_attr = fetch + 108;
    var path = GROWABLE_HEAP_U32()[fetch_attr + 64 >> 2];
    path ||= GROWABLE_HEAP_U32()[fetch + 8 >> 2];
    var pathStr = UTF8ToString(path);
    try {
        var transaction = db.transaction(["FILES"], "readonly");
        var packages = transaction.objectStore("FILES");
        var getRequest = packages.get(pathStr);
        getRequest.onsuccess = event => {
            if (event.target.result) {
                var value = event.target.result;
                var len = value.byteLength || value.length;
                var ptr = _malloc(len);
                GROWABLE_HEAP_U8().set(new Uint8Array(value), ptr);
                GROWABLE_HEAP_U32()[fetch + 12 >> 2] = ptr;
                writeI53ToI64(fetch + 16, len);
                writeI53ToI64(fetch + 24, 0);
                writeI53ToI64(fetch + 32, len);
                GROWABLE_HEAP_I16()[fetch + 40 >> 1] = 4;
                GROWABLE_HEAP_I16()[fetch + 42 >> 1] = 200;
                stringToUTF8("OK", fetch + 44, 64);
                onsuccess(fetch, 0, value)
            } else {
                GROWABLE_HEAP_I16()[fetch + 40 >> 1] = 4;
                GROWABLE_HEAP_I16()[fetch + 42 >> 1] = 404;
                stringToUTF8("Not Found", fetch + 44, 64);
                onerror(fetch, 0, "no data")
            }
        }
        ;
        getRequest.onerror = error => {
            GROWABLE_HEAP_I16()[fetch + 40 >> 1] = 4;
            GROWABLE_HEAP_I16()[fetch + 42 >> 1] = 404;
            stringToUTF8("Not Found", fetch + 44, 64);
            onerror(fetch, 0, error)
        }
    } catch (e) {
        onerror(fetch, 0, e)
    }
}
function fetchDeleteCachedData(db, fetch, onsuccess, onerror) {
    if (!db) {
        onerror(fetch, 0, "IndexedDB not available!");
        return
    }
    var fetch_attr = fetch + 108;
    var path = GROWABLE_HEAP_U32()[fetch_attr + 64 >> 2];
    path ||= GROWABLE_HEAP_U32()[fetch + 8 >> 2];
    var pathStr = UTF8ToString(path);
    try {
        var transaction = db.transaction(["FILES"], "readwrite");
        var packages = transaction.objectStore("FILES");
        var request = packages.delete(pathStr);
        request.onsuccess = event => {
            var value = event.target.result;
            GROWABLE_HEAP_U32()[fetch + 12 >> 2] = 0;
            writeI53ToI64(fetch + 16, 0);
            writeI53ToI64(fetch + 24, 0);
            writeI53ToI64(fetch + 32, 0);
            GROWABLE_HEAP_I16()[fetch + 40 >> 1] = 4;
            GROWABLE_HEAP_I16()[fetch + 42 >> 1] = 200;
            stringToUTF8("OK", fetch + 44, 64);
            onsuccess(fetch, 0, value)
        }
        ;
        request.onerror = error => {
            GROWABLE_HEAP_I16()[fetch + 40 >> 1] = 4;
            GROWABLE_HEAP_I16()[fetch + 42 >> 1] = 404;
            stringToUTF8("Not Found", fetch + 44, 64);
            onerror(fetch, 0, error)
        }
    } catch (e) {
        onerror(fetch, 0, e)
    }
}
function _emscripten_start_fetch(fetch, successcb, errorcb, progresscb, readystatechangecb) {
    runtimeKeepalivePush();
    var fetch_attr = fetch + 108;
    var onsuccess = GROWABLE_HEAP_U32()[fetch_attr + 36 >> 2];
    var onerror = GROWABLE_HEAP_U32()[fetch_attr + 40 >> 2];
    var onprogress = GROWABLE_HEAP_U32()[fetch_attr + 44 >> 2];
    var onreadystatechange = GROWABLE_HEAP_U32()[fetch_attr + 48 >> 2];
    var fetchAttributes = GROWABLE_HEAP_U32()[fetch_attr + 52 >> 2];
    var fetchAttrSynchronous = !!(fetchAttributes & 64);
    function doCallback(f) {
        if (fetchAttrSynchronous) {
            f()
        } else {
            callUserCallback(f)
        }
    }
    var reportSuccess = (fetch, xhr, e) => {
        runtimeKeepalivePop();
        doCallback( () => {
            if (onsuccess)
                getWasmTableEntry(onsuccess)(fetch);
            else
                successcb?.(fetch)
        }
        )
    }
    ;
    var reportProgress = (fetch, xhr, e) => {
        doCallback( () => {
            if (onprogress)
                getWasmTableEntry(onprogress)(fetch);
            else
                progresscb?.(fetch)
        }
        )
    }
    ;
    var reportError = (fetch, xhr, e) => {
        runtimeKeepalivePop();
        doCallback( () => {
            if (onerror)
                getWasmTableEntry(onerror)(fetch);
            else
                errorcb?.(fetch)
        }
        )
    }
    ;
    var reportReadyStateChange = (fetch, xhr, e) => {
        doCallback( () => {
            if (onreadystatechange)
                getWasmTableEntry(onreadystatechange)(fetch);
            else
                readystatechangecb?.(fetch)
        }
        )
    }
    ;
    var performUncachedXhr = (fetch, xhr, e) => {
        fetchXHR(fetch, reportSuccess, reportError, reportProgress, reportReadyStateChange)
    }
    ;
    var cacheResultAndReportSuccess = (fetch, xhr, e) => {
        var storeSuccess = (fetch, xhr, e) => {
            runtimeKeepalivePop();
            doCallback( () => {
                if (onsuccess)
                    getWasmTableEntry(onsuccess)(fetch);
                else
                    successcb?.(fetch)
            }
            )
        }
        ;
        var storeError = (fetch, xhr, e) => {
            runtimeKeepalivePop();
            doCallback( () => {
                if (onsuccess)
                    getWasmTableEntry(onsuccess)(fetch);
                else
                    successcb?.(fetch)
            }
            )
        }
        ;
        fetchCacheData(Fetch.dbInstance, fetch, xhr.response, storeSuccess, storeError)
    }
    ;
    var performCachedXhr = (fetch, xhr, e) => {
        fetchXHR(fetch, cacheResultAndReportSuccess, reportError, reportProgress, reportReadyStateChange)
    }
    ;
    var requestMethod = UTF8ToString(fetch_attr + 0);
    var fetchAttrReplace = !!(fetchAttributes & 16);
    var fetchAttrPersistFile = !!(fetchAttributes & 4);
    var fetchAttrNoDownload = !!(fetchAttributes & 32);
    if (requestMethod === "EM_IDB_STORE") {
        var ptr = GROWABLE_HEAP_U32()[fetch_attr + 84 >> 2];
        var size = GROWABLE_HEAP_U32()[fetch_attr + 88 >> 2];
        fetchCacheData(Fetch.dbInstance, fetch, GROWABLE_HEAP_U8().slice(ptr, ptr + size), reportSuccess, reportError)
    } else if (requestMethod === "EM_IDB_DELETE") {
        fetchDeleteCachedData(Fetch.dbInstance, fetch, reportSuccess, reportError)
    } else if (!fetchAttrReplace) {
        fetchLoadCachedData(Fetch.dbInstance, fetch, reportSuccess, fetchAttrNoDownload ? reportError : fetchAttrPersistFile ? performCachedXhr : performUncachedXhr)
    } else if (!fetchAttrNoDownload) {
        fetchXHR(fetch, fetchAttrPersistFile ? cacheResultAndReportSuccess : reportSuccess, reportError, reportProgress, reportReadyStateChange)
    } else {
        return 0
    }
    return fetch
}
var webSockets = new HandleAllocator;
var WS = {
    socketEvent: null,
    getSocket(socketId) {
        if (!webSockets.has(socketId)) {
            return 0
        }
        return webSockets.get(socketId)
    },
    getSocketEvent(socketId) {
        this.socketEvent ||= _malloc(520);
        GROWABLE_HEAP_U32()[this.socketEvent >> 2] = socketId;
        return this.socketEvent
    }
};
function _emscripten_websocket_close(socketId, code, reason) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(79, 0, 1, socketId, code, reason);
    var socket = WS.getSocket(socketId);
    if (!socket) {
        return -3
    }
    var reasonStr = reason ? UTF8ToString(reason) : undefined;
    if (reason)
        socket.close(code || undefined, UTF8ToString(reason));
    else if (code)
        socket.close(code);
    else
        socket.close();
    return 0
}
function _emscripten_websocket_is_supported() {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(80, 0, 1);
    return typeof WebSocket != "undefined"
}
function _emscripten_websocket_new(createAttributes) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(81, 0, 1, createAttributes);
    if (typeof WebSocket == "undefined") {
        return -1
    }
    if (!createAttributes) {
        return -5
    }
    var url = UTF8ToString(GROWABLE_HEAP_U32()[createAttributes >> 2]);
    var protocols = GROWABLE_HEAP_U32()[createAttributes + 4 >> 2];
    var socket = protocols ? new WebSocket(url,UTF8ToString(protocols).split(",")) : new WebSocket(url);
    socket.binaryType = "arraybuffer";
    var socketId = webSockets.allocate(socket);
    return socketId
}
function _emscripten_websocket_send_binary(socketId, binaryData, dataLength) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(82, 0, 1, socketId, binaryData, dataLength);
    var socket = WS.getSocket(socketId);
    if (!socket) {
        return -3
    }
    socket.send(new Uint8Array(GROWABLE_HEAP_U8().subarray(binaryData, binaryData + dataLength)));
    return 0
}
function _emscripten_websocket_send_utf8_text(socketId, textData) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(83, 0, 1, socketId, textData);
    var socket = WS.getSocket(socketId);
    if (!socket) {
        return -3
    }
    var str = UTF8ToString(textData);
    socket.send(str);
    return 0
}
function _emscripten_websocket_set_onclose_callback_on_thread(socketId, userData, callbackFunc, thread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(84, 0, 1, socketId, userData, callbackFunc, thread);
    var socket = WS.getSocket(socketId);
    if (!socket) {
        return -3
    }
    socket.onclose = function(e) {
        var eventPtr = WS.getSocketEvent(socketId);
        GROWABLE_HEAP_I8()[eventPtr + 4] = e.wasClean,
        GROWABLE_HEAP_I16()[eventPtr + 6 >> 1] = e.code,
        stringToUTF8(e.reason, eventPtr + 8, 512);
        getWasmTableEntry(callbackFunc)(0, eventPtr, userData)
    }
    ;
    return 0
}
function _emscripten_websocket_set_onerror_callback_on_thread(socketId, userData, callbackFunc, thread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(85, 0, 1, socketId, userData, callbackFunc, thread);
    var socket = WS.getSocket(socketId);
    if (!socket) {
        return -3
    }
    socket.onerror = function(e) {
        var eventPtr = WS.getSocketEvent(socketId);
        getWasmTableEntry(callbackFunc)(0, eventPtr, userData)
    }
    ;
    return 0
}
function _emscripten_websocket_set_onmessage_callback_on_thread(socketId, userData, callbackFunc, thread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(86, 0, 1, socketId, userData, callbackFunc, thread);
    var socket = WS.getSocket(socketId);
    if (!socket) {
        return -3
    }
    socket.onmessage = function(e) {
        var isText = typeof e.data == "string";
        if (isText) {
            var buf = stringToNewUTF8(e.data);
            var len = lengthBytesUTF8(e.data) + 1
        } else {
            var len = e.data.byteLength;
            var buf = _malloc(len);
            GROWABLE_HEAP_I8().set(new Uint8Array(e.data), buf)
        }
        var eventPtr = WS.getSocketEvent(socketId);
        GROWABLE_HEAP_U32()[eventPtr + 4 >> 2] = buf,
        GROWABLE_HEAP_I32()[eventPtr + 8 >> 2] = len,
        GROWABLE_HEAP_I8()[eventPtr + 12] = isText,
        getWasmTableEntry(callbackFunc)(0, eventPtr, userData);
        _free(buf)
    }
    ;
    return 0
}
function _emscripten_websocket_set_onopen_callback_on_thread(socketId, userData, callbackFunc, thread) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(87, 0, 1, socketId, userData, callbackFunc, thread);
    var socket = WS.getSocket(socketId);
    if (!socket) {
        return -3
    }
    socket.onopen = function(e) {
        var eventPtr = WS.getSocketEvent(socketId);
        getWasmTableEntry(callbackFunc)(0, eventPtr, userData)
    }
    ;
    return 0
}
var ENV = {};
var getExecutableName = () => thisProgram || "./this.program";
var getEnvStrings = () => {
    if (!getEnvStrings.strings) {
        var lang = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
        var env = {
            USER: "web_user",
            LOGNAME: "web_user",
            PATH: "/",
            PWD: "/",
            HOME: "/home/web_user",
            LANG: lang,
            _: getExecutableName()
        };
        for (var x in ENV) {
            if (ENV[x] === undefined)
                delete env[x];
            else
                env[x] = ENV[x]
        }
        var strings = [];
        for (var x in env) {
            strings.push(`${x}=${env[x]}`)
        }
        getEnvStrings.strings = strings
    }
    return getEnvStrings.strings
}
;
var stringToAscii = (str, buffer) => {
    for (var i = 0; i < str.length; ++i) {
        assert(str.charCodeAt(i) === (str.charCodeAt(i) & 255));
        GROWABLE_HEAP_I8()[buffer++] = str.charCodeAt(i)
    }
    GROWABLE_HEAP_I8()[buffer] = 0
}
;
var _environ_get = function(__environ, environ_buf) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(88, 0, 1, __environ, environ_buf);
    var bufSize = 0;
    getEnvStrings().forEach( (string, i) => {
        var ptr = environ_buf + bufSize;
        GROWABLE_HEAP_U32()[__environ + i * 4 >> 2] = ptr;
        stringToAscii(string, ptr);
        bufSize += string.length + 1
    }
    );
    return 0
};
var _environ_sizes_get = function(penviron_count, penviron_buf_size) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(89, 0, 1, penviron_count, penviron_buf_size);
    var strings = getEnvStrings();
    GROWABLE_HEAP_U32()[penviron_count >> 2] = strings.length;
    var bufSize = 0;
    strings.forEach(string => bufSize += string.length + 1);
    GROWABLE_HEAP_U32()[penviron_buf_size >> 2] = bufSize;
    return 0
};
function _fd_close(fd) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(90, 0, 1, fd);
    try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        FS.close(stream);
        return 0
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return e.errno
    }
}
var doReadv = (stream, iov, iovcnt, offset) => {
    var ret = 0;
    for (var i = 0; i < iovcnt; i++) {
        var ptr = GROWABLE_HEAP_U32()[iov >> 2];
        var len = GROWABLE_HEAP_U32()[iov + 4 >> 2];
        iov += 8;
        var curr = FS.read(stream, GROWABLE_HEAP_I8(), ptr, len, offset);
        if (curr < 0)
            return -1;
        ret += curr;
        if (curr < len)
            break;
        if (typeof offset != "undefined") {
            offset += curr
        }
    }
    return ret
}
;
function _fd_read(fd, iov, iovcnt, pnum) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(91, 0, 1, fd, iov, iovcnt, pnum);
    try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        var num = doReadv(stream, iov, iovcnt);
        GROWABLE_HEAP_U32()[pnum >> 2] = num;
        return 0
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return e.errno
    }
}
function _fd_seek(fd, offset, whence, newOffset) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(92, 0, 1, fd, offset, whence, newOffset);
    offset = bigintToI53Checked(offset);
    try {
        if (isNaN(offset))
            return 61;
        var stream = SYSCALLS.getStreamFromFD(fd);
        FS.llseek(stream, offset, whence);
        HEAP64[newOffset >> 3] = BigInt(stream.position);
        if (stream.getdents && offset === 0 && whence === 0)
            stream.getdents = null;
        return 0
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return e.errno
    }
}
var doWritev = (stream, iov, iovcnt, offset) => {
    var ret = 0;
    for (var i = 0; i < iovcnt; i++) {
        var ptr = GROWABLE_HEAP_U32()[iov >> 2];
        var len = GROWABLE_HEAP_U32()[iov + 4 >> 2];
        iov += 8;
        var curr = FS.write(stream, GROWABLE_HEAP_I8(), ptr, len, offset);
        if (curr < 0)
            return -1;
        ret += curr;
        if (curr < len) {
            break
        }
        if (typeof offset != "undefined") {
            offset += curr
        }
    }
    return ret
}
;
function _fd_write(fd, iov, iovcnt, pnum) {
    if (ENVIRONMENT_IS_PTHREAD)
        return proxyToMainThread(93, 0, 1, fd, iov, iovcnt, pnum);
    try {
        var stream = SYSCALLS.getStreamFromFD(fd);
        var num = doWritev(stream, iov, iovcnt);
        GROWABLE_HEAP_U32()[pnum >> 2] = num;
        return 0
    } catch (e) {
        if (typeof FS == "undefined" || !(e.name === "ErrnoError"))
            throw e;
        return e.errno
    }
}
var _glClipControlEXT = (origin, depth) => {
    GLctx.extClipControl["clipControlEXT"](origin, depth)
}
;
var _glPolygonModeWEBGL = (face, mode) => {
    GLctx.webglPolygonMode["polygonModeWEBGL"](face, mode)
}
;
var _glPolygonOffsetClampEXT = (factor, units, clamp) => {
    GLctx.extPolygonOffsetClamp["polygonOffsetClampEXT"](factor, units, clamp)
}
;
var _llvm_eh_typeid_for = type => type;
var listenOnce = (object, event, func) => object.addEventListener(event, func, {
    once: true
});
var autoResumeAudioContext = (ctx, elements) => {
    if (!elements) {
        elements = [document, document.getElementById("canvas")]
    }
    ["keydown", "mousedown", "touchstart"].forEach(event => {
        elements.forEach(element => {
            if (element) {
                listenOnce(element, event, () => {
                    if (ctx.state === "suspended")
                        ctx.resume()
                }
                )
            }
        }
        )
    }
    )
}
;
var dynCall = (sig, ptr, args=[], promising=false) => {
    assert(!promising, "async dynCall is not supported in this mode");
    assert(getWasmTableEntry(ptr), `missing table entry in dynCall: ${ptr}`);
    var func = getWasmTableEntry(ptr);
    var rtn = func(...args);
    return rtn
}
;
var FS_createPath = FS.createPath;
var FS_unlink = path => FS.unlink(path);
var FS_createLazyFile = FS.createLazyFile;
var FS_createDevice = FS.createDevice;
var incrementExceptionRefcount = ptr => ___cxa_increment_exception_refcount(ptr);
Module["incrementExceptionRefcount"] = incrementExceptionRefcount;
var decrementExceptionRefcount = ptr => ___cxa_decrement_exception_refcount(ptr);
Module["decrementExceptionRefcount"] = decrementExceptionRefcount;
var getExceptionMessageCommon = ptr => {
    var sp = stackSave();
    var type_addr_addr = stackAlloc(4);
    var message_addr_addr = stackAlloc(4);
    ___get_exception_message(ptr, type_addr_addr, message_addr_addr);
    var type_addr = GROWABLE_HEAP_U32()[type_addr_addr >> 2];
    var message_addr = GROWABLE_HEAP_U32()[message_addr_addr >> 2];
    var type = UTF8ToString(type_addr);
    _free(type_addr);
    var message;
    if (message_addr) {
        message = UTF8ToString(message_addr);
        _free(message_addr)
    }
    stackRestore(sp);
    return [type, message]
}
;
var getExceptionMessage = ptr => getExceptionMessageCommon(ptr);
Module["getExceptionMessage"] = getExceptionMessage;
PThread.init();
FS.createPreloadedFile = FS_createPreloadedFile;
FS.staticInit();
Module["FS_createPath"] = FS.createPath;
Module["FS_createDataFile"] = FS.createDataFile;
Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
Module["FS_unlink"] = FS.unlink;
Module["FS_createLazyFile"] = FS.createLazyFile;
Module["FS_createDevice"] = FS.createDevice;
embind_init_charCodes();
init_emval();
Module["requestFullscreen"] = Browser.requestFullscreen;
Module["requestFullScreen"] = Browser.requestFullScreen;
Module["setCanvasSize"] = Browser.setCanvasSize;
Module["getUserMedia"] = Browser.getUserMedia;
Module["createContext"] = Browser.createContext;
registerPreMainLoop( () => GL.newRenderingFrameStarted());
Module["requestAnimationFrame"] = MainLoop.requestAnimationFrame;
Module["pauseMainLoop"] = MainLoop.pause;
Module["resumeMainLoop"] = MainLoop.resume;
MainLoop.init();
for (let i = 0; i < 32; ++i)
    tempFixedLengthArray.push(new Array(i));
Fetch.init();
var proxiedFunctionTable = [_proc_exit, exitOnMainThread, pthreadCreateProxied, ___syscall_bind, ___syscall_dup3, ___syscall_fcntl64, ___syscall_fstat64, ___syscall_getcwd, ___syscall_getdents64, ___syscall_getsockname, ___syscall_getsockopt, ___syscall_ioctl, ___syscall_lstat64, ___syscall_mkdirat, ___syscall_newfstatat, ___syscall_openat, ___syscall_readlinkat, ___syscall_recvfrom, ___syscall_rmdir, ___syscall_sendto, ___syscall_socket, ___syscall_stat64, ___syscall_statfs64, ___syscall_unlinkat, _eglBindAPI, _eglChooseConfig, _eglCreateContext, _eglCreateWindowSurface, _eglDestroyContext, _eglDestroySurface, _eglGetConfigAttrib, _eglGetDisplay, _eglGetError, _eglInitialize, _eglMakeCurrent, _eglQueryString, _eglQuerySurface, _eglSwapBuffers, _eglSwapInterval, _eglTerminate, _eglWaitClient, _eglWaitNative, _emscripten_exit_fullscreen, getCanvasSizeMainThread, setCanvasElementSizeMainThread, _emscripten_exit_pointerlock, _emscripten_get_device_pixel_ratio, _emscripten_get_element_css_size, _emscripten_get_gamepad_status, _emscripten_get_num_gamepads, _emscripten_get_screen_size, _emscripten_hide_mouse, _emscripten_request_fullscreen_strategy, _emscripten_request_pointerlock, _emscripten_sample_gamepad_data, _emscripten_set_beforeunload_callback_on_thread, _emscripten_set_blur_callback_on_thread, _emscripten_set_element_css_size, _emscripten_set_focus_callback_on_thread, _emscripten_set_fullscreenchange_callback_on_thread, _emscripten_set_gamepadconnected_callback_on_thread, _emscripten_set_gamepaddisconnected_callback_on_thread, _emscripten_set_keydown_callback_on_thread, _emscripten_set_keypress_callback_on_thread, _emscripten_set_keyup_callback_on_thread, _emscripten_set_mousedown_callback_on_thread, _emscripten_set_mouseenter_callback_on_thread, _emscripten_set_mouseleave_callback_on_thread, _emscripten_set_mousemove_callback_on_thread, _emscripten_set_mouseup_callback_on_thread, _emscripten_set_pointerlockchange_callback_on_thread, _emscripten_set_resize_callback_on_thread, _emscripten_set_touchcancel_callback_on_thread, _emscripten_set_touchend_callback_on_thread, _emscripten_set_touchmove_callback_on_thread, _emscripten_set_touchstart_callback_on_thread, _emscripten_set_visibilitychange_callback_on_thread, _emscripten_set_wheel_callback_on_thread, _emscripten_set_window_title, _emscripten_websocket_close, _emscripten_websocket_is_supported, _emscripten_websocket_new, _emscripten_websocket_send_binary, _emscripten_websocket_send_utf8_text, _emscripten_websocket_set_onclose_callback_on_thread, _emscripten_websocket_set_onerror_callback_on_thread, _emscripten_websocket_set_onmessage_callback_on_thread, _emscripten_websocket_set_onopen_callback_on_thread, _environ_get, _environ_sizes_get, _fd_close, _fd_read, _fd_seek, _fd_write];
function checkIncomingModuleAPI() {
    ignoredModuleProp("fetchSettings")
}
var ASM_CONSTS = {
    2976168: () => window.location.host === "ecsr.io" || window.location.host === "172.25.53.243:5000",
    2976264: () => {
        window.history.go(-1)
    }
    ,
    2976291: $0 => {
        let v = window.localStorage.getItem(UTF8ToString($0));
        if (v == null)
            return 0;
        let len = lengthBytesUTF8(v) + 1;
        let buf = _malloc(len);
        stringToUTF8(v, buf, len);
        return buf
    }
    ,
    2976468: $0 => {
        window.localStorage.setItem("EmscriptenGameSettings.xml", UTF8ToString($0))
    }
    ,
    2976549: () => {
        if (typeof AudioContext !== "undefined") {
            return true
        } else if (typeof webkitAudioContext !== "undefined") {
            return true
        }
        return false
    }
    ,
    2976696: () => {
        if (typeof navigator.mediaDevices !== "undefined" && typeof navigator.mediaDevices.getUserMedia !== "undefined") {
            return true
        } else if (typeof navigator.webkitGetUserMedia !== "undefined") {
            return true
        }
        return false
    }
    ,
    2976930: $0 => {
        if (typeof Module["SDL2"] === "undefined") {
            Module["SDL2"] = {}
        }
        var SDL2 = Module["SDL2"];
        if (!$0) {
            SDL2.audio = {}
        } else {
            SDL2.capture = {}
        }
        if (!SDL2.audioContext) {
            if (typeof AudioContext !== "undefined") {
                SDL2.audioContext = new AudioContext
            } else if (typeof webkitAudioContext !== "undefined") {
                SDL2.audioContext = new webkitAudioContext
            }
            if (SDL2.audioContext) {
                if (typeof navigator.userActivation === "undefined") {
                    autoResumeAudioContext(SDL2.audioContext)
                }
            }
        }
        return SDL2.audioContext === undefined ? -1 : 0
    }
    ,
    2977482: () => {
        var SDL2 = Module["SDL2"];
        return SDL2.audioContext.sampleRate
    }
    ,
    2977550: ($0, $1, $2, $3) => {
        var SDL2 = Module["SDL2"];
        var have_microphone = function(stream) {
            if (SDL2.capture.silenceTimer !== undefined) {
                clearInterval(SDL2.capture.silenceTimer);
                SDL2.capture.silenceTimer = undefined;
                SDL2.capture.silenceBuffer = undefined
            }
            SDL2.capture.mediaStreamNode = SDL2.audioContext.createMediaStreamSource(stream);
            SDL2.capture.scriptProcessorNode = SDL2.audioContext.createScriptProcessor($1, $0, 1);
            SDL2.capture.scriptProcessorNode.onaudioprocess = function(audioProcessingEvent) {
                if (SDL2 === undefined || SDL2.capture === undefined) {
                    return
                }
                audioProcessingEvent.outputBuffer.getChannelData(0).fill(0);
                SDL2.capture.currentCaptureBuffer = audioProcessingEvent.inputBuffer;
                dynCall("vi", $2, [$3])
            }
            ;
            SDL2.capture.mediaStreamNode.connect(SDL2.capture.scriptProcessorNode);
            SDL2.capture.scriptProcessorNode.connect(SDL2.audioContext.destination);
            SDL2.capture.stream = stream
        };
        var no_microphone = function(error) {};
        SDL2.capture.silenceBuffer = SDL2.audioContext.createBuffer($0, $1, SDL2.audioContext.sampleRate);
        SDL2.capture.silenceBuffer.getChannelData(0).fill(0);
        var silence_callback = function() {
            SDL2.capture.currentCaptureBuffer = SDL2.capture.silenceBuffer;
            dynCall("vi", $2, [$3])
        };
        SDL2.capture.silenceTimer = setInterval(silence_callback, $1 / SDL2.audioContext.sampleRate * 1e3);
        if (navigator.mediaDevices !== undefined && navigator.mediaDevices.getUserMedia !== undefined) {
            navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            }).then(have_microphone).catch(no_microphone)
        } else if (navigator.webkitGetUserMedia !== undefined) {
            navigator.webkitGetUserMedia({
                audio: true,
                video: false
            }, have_microphone, no_microphone)
        }
    }
    ,
    2979243: ($0, $1, $2, $3) => {
        var SDL2 = Module["SDL2"];
        SDL2.audio.scriptProcessorNode = SDL2.audioContext["createScriptProcessor"]($1, 0, $0);
        SDL2.audio.scriptProcessorNode["onaudioprocess"] = function(e) {
            if (SDL2 === undefined || SDL2.audio === undefined) {
                return
            }
            if (SDL2.audio.silenceTimer !== undefined) {
                clearInterval(SDL2.audio.silenceTimer);
                SDL2.audio.silenceTimer = undefined;
                SDL2.audio.silenceBuffer = undefined
            }
            SDL2.audio.currentOutputBuffer = e["outputBuffer"];
            dynCall("vi", $2, [$3])
        }
        ;
        SDL2.audio.scriptProcessorNode["connect"](SDL2.audioContext["destination"]);
        if (SDL2.audioContext.state === "suspended") {
            SDL2.audio.silenceBuffer = SDL2.audioContext.createBuffer($0, $1, SDL2.audioContext.sampleRate);
            SDL2.audio.silenceBuffer.getChannelData(0).fill(0);
            var silence_callback = function() {
                if (typeof navigator.userActivation !== "undefined") {
                    if (navigator.userActivation.hasBeenActive) {
                        SDL2.audioContext.resume()
                    }
                }
                SDL2.audio.currentOutputBuffer = SDL2.audio.silenceBuffer;
                dynCall("vi", $2, [$3]);
                SDL2.audio.currentOutputBuffer = undefined
            };
            SDL2.audio.silenceTimer = setInterval(silence_callback, $1 / SDL2.audioContext.sampleRate * 1e3)
        }
    }
    ,
    2980418: ($0, $1) => {
        var SDL2 = Module["SDL2"];
        var numChannels = SDL2.capture.currentCaptureBuffer.numberOfChannels;
        for (var c = 0; c < numChannels; ++c) {
            var channelData = SDL2.capture.currentCaptureBuffer.getChannelData(c);
            if (channelData.length != $1) {
                throw "Web Audio capture buffer length mismatch! Destination size: " + channelData.length + " samples vs expected " + $1 + " samples!"
            }
            if (numChannels == 1) {
                for (var j = 0; j < $1; ++j) {
                    setValue($0 + j * 4, channelData[j], "float")
                }
            } else {
                for (var j = 0; j < $1; ++j) {
                    setValue($0 + (j * numChannels + c) * 4, channelData[j], "float")
                }
            }
        }
    }
    ,
    2981023: ($0, $1) => {
        var SDL2 = Module["SDL2"];
        var buf = $0 >>> 2;
        var numChannels = SDL2.audio.currentOutputBuffer["numberOfChannels"];
        for (var c = 0; c < numChannels; ++c) {
            var channelData = SDL2.audio.currentOutputBuffer["getChannelData"](c);
            if (channelData.length != $1) {
                throw "Web Audio output buffer length mismatch! Destination size: " + channelData.length + " samples vs expected " + $1 + " samples!"
            }
            for (var j = 0; j < $1; ++j) {
                channelData[j] = GROWABLE_HEAP_F32()[buf + (j * numChannels + c)]
            }
        }
    }
    ,
    2981512: $0 => {
        var SDL2 = Module["SDL2"];
        if ($0) {
            if (SDL2.capture.silenceTimer !== undefined) {
                clearInterval(SDL2.capture.silenceTimer)
            }
            if (SDL2.capture.stream !== undefined) {
                var tracks = SDL2.capture.stream.getAudioTracks();
                for (var i = 0; i < tracks.length; i++) {
                    SDL2.capture.stream.removeTrack(tracks[i])
                }
            }
            if (SDL2.capture.scriptProcessorNode !== undefined) {
                SDL2.capture.scriptProcessorNode.onaudioprocess = function(audioProcessingEvent) {}
                ;
                SDL2.capture.scriptProcessorNode.disconnect()
            }
            if (SDL2.capture.mediaStreamNode !== undefined) {
                SDL2.capture.mediaStreamNode.disconnect()
            }
            SDL2.capture = undefined
        } else {
            if (SDL2.audio.scriptProcessorNode != undefined) {
                SDL2.audio.scriptProcessorNode.disconnect()
            }
            if (SDL2.audio.silenceTimer !== undefined) {
                clearInterval(SDL2.audio.silenceTimer)
            }
            SDL2.audio = undefined
        }
        if (SDL2.audioContext !== undefined && SDL2.audio === undefined && SDL2.capture === undefined) {
            SDL2.audioContext.close();
            SDL2.audioContext = undefined
        }
    }
    ,
    2982518: ($0, $1, $2) => {
        var w = $0;
        var h = $1;
        var pixels = $2;
        if (!Module["SDL2"])
            Module["SDL2"] = {};
        var SDL2 = Module["SDL2"];
        if (SDL2.ctxCanvas !== Module["canvas"]) {
            SDL2.ctx = Module["createContext"](Module["canvas"], false, true);
            SDL2.ctxCanvas = Module["canvas"]
        }
        if (SDL2.w !== w || SDL2.h !== h || SDL2.imageCtx !== SDL2.ctx) {
            SDL2.image = SDL2.ctx.createImageData(w, h);
            SDL2.w = w;
            SDL2.h = h;
            SDL2.imageCtx = SDL2.ctx
        }
        var data = SDL2.image.data;
        var src = pixels / 4;
        var dst = 0;
        var num;
        if (typeof CanvasPixelArray !== "undefined" && data instanceof CanvasPixelArray) {
            num = data.length;
            while (dst < num) {
                var val = GROWABLE_HEAP_I32()[src];
                data[dst] = val & 255;
                data[dst + 1] = val >> 8 & 255;
                data[dst + 2] = val >> 16 & 255;
                data[dst + 3] = 255;
                src++;
                dst += 4
            }
        } else {
            if (SDL2.data32Data !== data) {
                SDL2.data32 = new Int32Array(data.buffer);
                SDL2.data8 = new Uint8Array(data.buffer);
                SDL2.data32Data = data
            }
            var data32 = SDL2.data32;
            num = data32.length;
            data32.set(GROWABLE_HEAP_I32().subarray(src, src + num));
            var data8 = SDL2.data8;
            var i = 3;
            var j = i + 4 * num;
            if (num % 8 == 0) {
                while (i < j) {
                    data8[i] = 255;
                    i = i + 4 | 0;
                    data8[i] = 255;
                    i = i + 4 | 0;
                    data8[i] = 255;
                    i = i + 4 | 0;
                    data8[i] = 255;
                    i = i + 4 | 0;
                    data8[i] = 255;
                    i = i + 4 | 0;
                    data8[i] = 255;
                    i = i + 4 | 0;
                    data8[i] = 255;
                    i = i + 4 | 0;
                    data8[i] = 255;
                    i = i + 4 | 0
                }
            } else {
                while (i < j) {
                    data8[i] = 255;
                    i = i + 4 | 0
                }
            }
        }
        SDL2.ctx.putImageData(SDL2.image, 0, 0)
    }
    ,
    2983986: ($0, $1, $2, $3, $4) => {
        var w = $0;
        var h = $1;
        var hot_x = $2;
        var hot_y = $3;
        var pixels = $4;
        var canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        var ctx = canvas.getContext("2d");
        var image = ctx.createImageData(w, h);
        var data = image.data;
        var src = pixels / 4;
        var dst = 0;
        var num;
        if (typeof CanvasPixelArray !== "undefined" && data instanceof CanvasPixelArray) {
            num = data.length;
            while (dst < num) {
                var val = GROWABLE_HEAP_I32()[src];
                data[dst] = val & 255;
                data[dst + 1] = val >> 8 & 255;
                data[dst + 2] = val >> 16 & 255;
                data[dst + 3] = val >> 24 & 255;
                src++;
                dst += 4
            }
        } else {
            var data32 = new Int32Array(data.buffer);
            num = data32.length;
            data32.set(GROWABLE_HEAP_I32().subarray(src, src + num))
        }
        ctx.putImageData(image, 0, 0);
        var url = hot_x === 0 && hot_y === 0 ? "url(" + canvas.toDataURL() + "), auto" : "url(" + canvas.toDataURL() + ") " + hot_x + " " + hot_y + ", auto";
        var urlBuf = _malloc(url.length + 1);
        stringToUTF8(url, urlBuf, url.length + 1);
        return urlBuf
    }
    ,
    2984974: $0 => {
        if (Module["canvas"]) {
            Module["canvas"].style["cursor"] = UTF8ToString($0)
        }
    }
    ,
    2985057: () => {
        if (Module["canvas"]) {
            Module["canvas"].style["cursor"] = "none"
        }
    }
    ,
    2985126: () => window.innerWidth,
    2985156: () => window.innerHeight
};
var wasmImports;
function assignWasmImports() {
    wasmImports = {
        __assert_fail: ___assert_fail,
        __call_sighandler: ___call_sighandler,
        __cxa_begin_catch: ___cxa_begin_catch,
        __cxa_end_catch: ___cxa_end_catch,
        __cxa_find_matching_catch_2: ___cxa_find_matching_catch_2,
        __cxa_find_matching_catch_3: ___cxa_find_matching_catch_3,
        __cxa_find_matching_catch_4: ___cxa_find_matching_catch_4,
        __cxa_find_matching_catch_5: ___cxa_find_matching_catch_5,
        __cxa_find_matching_catch_6: ___cxa_find_matching_catch_6,
        __cxa_rethrow: ___cxa_rethrow,
        __cxa_rethrow_primary_exception: ___cxa_rethrow_primary_exception,
        __cxa_throw: ___cxa_throw,
        __cxa_uncaught_exceptions: ___cxa_uncaught_exceptions,
        __pthread_create_js: ___pthread_create_js,
        __resumeException: ___resumeException,
        __syscall_bind: ___syscall_bind,
        __syscall_dup3: ___syscall_dup3,
        __syscall_fcntl64: ___syscall_fcntl64,
        __syscall_fstat64: ___syscall_fstat64,
        __syscall_getcwd: ___syscall_getcwd,
        __syscall_getdents64: ___syscall_getdents64,
        __syscall_getsockname: ___syscall_getsockname,
        __syscall_getsockopt: ___syscall_getsockopt,
        __syscall_ioctl: ___syscall_ioctl,
        __syscall_lstat64: ___syscall_lstat64,
        __syscall_mkdirat: ___syscall_mkdirat,
        __syscall_newfstatat: ___syscall_newfstatat,
        __syscall_openat: ___syscall_openat,
        __syscall_readlinkat: ___syscall_readlinkat,
        __syscall_recvfrom: ___syscall_recvfrom,
        __syscall_rmdir: ___syscall_rmdir,
        __syscall_sendto: ___syscall_sendto,
        __syscall_socket: ___syscall_socket,
        __syscall_stat64: ___syscall_stat64,
        __syscall_statfs64: ___syscall_statfs64,
        __syscall_unlinkat: ___syscall_unlinkat,
        _abort_js: __abort_js,
        _embind_register_bigint: __embind_register_bigint,
        _embind_register_bool: __embind_register_bool,
        _embind_register_emval: __embind_register_emval,
        _embind_register_float: __embind_register_float,
        _embind_register_integer: __embind_register_integer,
        _embind_register_memory_view: __embind_register_memory_view,
        _embind_register_std_string: __embind_register_std_string,
        _embind_register_std_wstring: __embind_register_std_wstring,
        _embind_register_void: __embind_register_void,
        _emscripten_init_main_thread_js: __emscripten_init_main_thread_js,
        _emscripten_lookup_name: __emscripten_lookup_name,
        _emscripten_notify_mailbox_postmessage: __emscripten_notify_mailbox_postmessage,
        _emscripten_receive_on_main_thread_js: __emscripten_receive_on_main_thread_js,
        _emscripten_runtime_keepalive_clear: __emscripten_runtime_keepalive_clear,
        _emscripten_thread_cleanup: __emscripten_thread_cleanup,
        _emscripten_thread_mailbox_await: __emscripten_thread_mailbox_await,
        _emscripten_thread_set_strongref: __emscripten_thread_set_strongref,
        _emscripten_throw_longjmp: __emscripten_throw_longjmp,
        _emval_as: __emval_as,
        _emval_decref: __emval_decref,
        _emval_get_global: __emval_get_global,
        _emval_get_property: __emval_get_property,
        _emval_new_cstring: __emval_new_cstring,
        _emval_run_destructors: __emval_run_destructors,
        _gmtime_js: __gmtime_js,
        _localtime_js: __localtime_js,
        _mktime_js: __mktime_js,
        _tzset_js: __tzset_js,
        clock_time_get: _clock_time_get,
        eglBindAPI: _eglBindAPI,
        eglChooseConfig: _eglChooseConfig,
        eglCreateContext: _eglCreateContext,
        eglCreateWindowSurface: _eglCreateWindowSurface,
        eglDestroyContext: _eglDestroyContext,
        eglDestroySurface: _eglDestroySurface,
        eglGetConfigAttrib: _eglGetConfigAttrib,
        eglGetDisplay: _eglGetDisplay,
        eglGetError: _eglGetError,
        eglInitialize: _eglInitialize,
        eglMakeCurrent: _eglMakeCurrent,
        eglQueryString: _eglQueryString,
        eglQuerySurface: _eglQuerySurface,
        eglSwapBuffers: _eglSwapBuffers,
        eglSwapInterval: _eglSwapInterval,
        eglTerminate: _eglTerminate,
        eglWaitGL: _eglWaitGL,
        eglWaitNative: _eglWaitNative,
        emscripten_asm_const_int: _emscripten_asm_const_int,
        emscripten_asm_const_int_sync_on_main_thread: _emscripten_asm_const_int_sync_on_main_thread,
        emscripten_asm_const_ptr_sync_on_main_thread: _emscripten_asm_const_ptr_sync_on_main_thread,
        emscripten_check_blocking_allowed: _emscripten_check_blocking_allowed,
        emscripten_date_now: _emscripten_date_now,
        emscripten_err: _emscripten_err,
        emscripten_exit_fullscreen: _emscripten_exit_fullscreen,
        emscripten_exit_pointerlock: _emscripten_exit_pointerlock,
        emscripten_exit_with_live_runtime: _emscripten_exit_with_live_runtime,
        emscripten_fetch_free: _emscripten_fetch_free,
        emscripten_get_device_pixel_ratio: _emscripten_get_device_pixel_ratio,
        emscripten_get_element_css_size: _emscripten_get_element_css_size,
        emscripten_get_gamepad_status: _emscripten_get_gamepad_status,
        emscripten_get_heap_max: _emscripten_get_heap_max,
        emscripten_get_now: _emscripten_get_now,
        emscripten_get_num_gamepads: _emscripten_get_num_gamepads,
        emscripten_get_screen_size: _emscripten_get_screen_size,
        emscripten_glActiveTexture: _emscripten_glActiveTexture,
        emscripten_glAttachShader: _emscripten_glAttachShader,
        emscripten_glBeginQuery: _emscripten_glBeginQuery,
        emscripten_glBeginQueryEXT: _emscripten_glBeginQueryEXT,
        emscripten_glBeginTransformFeedback: _emscripten_glBeginTransformFeedback,
        emscripten_glBindAttribLocation: _emscripten_glBindAttribLocation,
        emscripten_glBindBuffer: _emscripten_glBindBuffer,
        emscripten_glBindBufferBase: _emscripten_glBindBufferBase,
        emscripten_glBindBufferRange: _emscripten_glBindBufferRange,
        emscripten_glBindFramebuffer: _emscripten_glBindFramebuffer,
        emscripten_glBindRenderbuffer: _emscripten_glBindRenderbuffer,
        emscripten_glBindSampler: _emscripten_glBindSampler,
        emscripten_glBindTexture: _emscripten_glBindTexture,
        emscripten_glBindTransformFeedback: _emscripten_glBindTransformFeedback,
        emscripten_glBindVertexArray: _emscripten_glBindVertexArray,
        emscripten_glBlendColor: _emscripten_glBlendColor,
        emscripten_glBlendEquation: _emscripten_glBlendEquation,
        emscripten_glBlendEquationSeparate: _emscripten_glBlendEquationSeparate,
        emscripten_glBlendFunc: _emscripten_glBlendFunc,
        emscripten_glBlendFuncSeparate: _emscripten_glBlendFuncSeparate,
        emscripten_glBlitFramebuffer: _emscripten_glBlitFramebuffer,
        emscripten_glBufferData: _emscripten_glBufferData,
        emscripten_glBufferSubData: _emscripten_glBufferSubData,
        emscripten_glCheckFramebufferStatus: _emscripten_glCheckFramebufferStatus,
        emscripten_glClear: _emscripten_glClear,
        emscripten_glClearBufferfi: _emscripten_glClearBufferfi,
        emscripten_glClearBufferfv: _emscripten_glClearBufferfv,
        emscripten_glClearBufferiv: _emscripten_glClearBufferiv,
        emscripten_glClearBufferuiv: _emscripten_glClearBufferuiv,
        emscripten_glClearColor: _emscripten_glClearColor,
        emscripten_glClearDepthf: _emscripten_glClearDepthf,
        emscripten_glClearStencil: _emscripten_glClearStencil,
        emscripten_glClientWaitSync: _emscripten_glClientWaitSync,
        emscripten_glColorMask: _emscripten_glColorMask,
        emscripten_glCompileShader: _emscripten_glCompileShader,
        emscripten_glCompressedTexImage2D: _emscripten_glCompressedTexImage2D,
        emscripten_glCompressedTexImage3D: _emscripten_glCompressedTexImage3D,
        emscripten_glCompressedTexSubImage2D: _emscripten_glCompressedTexSubImage2D,
        emscripten_glCompressedTexSubImage3D: _emscripten_glCompressedTexSubImage3D,
        emscripten_glCopyBufferSubData: _emscripten_glCopyBufferSubData,
        emscripten_glCopyTexImage2D: _emscripten_glCopyTexImage2D,
        emscripten_glCopyTexSubImage2D: _emscripten_glCopyTexSubImage2D,
        emscripten_glCopyTexSubImage3D: _emscripten_glCopyTexSubImage3D,
        emscripten_glCreateProgram: _emscripten_glCreateProgram,
        emscripten_glCreateShader: _emscripten_glCreateShader,
        emscripten_glCullFace: _emscripten_glCullFace,
        emscripten_glDeleteBuffers: _emscripten_glDeleteBuffers,
        emscripten_glDeleteFramebuffers: _emscripten_glDeleteFramebuffers,
        emscripten_glDeleteProgram: _emscripten_glDeleteProgram,
        emscripten_glDeleteQueries: _emscripten_glDeleteQueries,
        emscripten_glDeleteQueriesEXT: _emscripten_glDeleteQueriesEXT,
        emscripten_glDeleteRenderbuffers: _emscripten_glDeleteRenderbuffers,
        emscripten_glDeleteSamplers: _emscripten_glDeleteSamplers,
        emscripten_glDeleteShader: _emscripten_glDeleteShader,
        emscripten_glDeleteSync: _emscripten_glDeleteSync,
        emscripten_glDeleteTextures: _emscripten_glDeleteTextures,
        emscripten_glDeleteTransformFeedbacks: _emscripten_glDeleteTransformFeedbacks,
        emscripten_glDeleteVertexArrays: _emscripten_glDeleteVertexArrays,
        emscripten_glDepthFunc: _emscripten_glDepthFunc,
        emscripten_glDepthMask: _emscripten_glDepthMask,
        emscripten_glDepthRangef: _emscripten_glDepthRangef,
        emscripten_glDetachShader: _emscripten_glDetachShader,
        emscripten_glDisable: _emscripten_glDisable,
        emscripten_glDisableVertexAttribArray: _emscripten_glDisableVertexAttribArray,
        emscripten_glDrawArrays: _emscripten_glDrawArrays,
        emscripten_glDrawArraysInstanced: _emscripten_glDrawArraysInstanced,
        emscripten_glDrawBuffers: _emscripten_glDrawBuffers,
        emscripten_glDrawElements: _emscripten_glDrawElements,
        emscripten_glDrawElementsInstanced: _emscripten_glDrawElementsInstanced,
        emscripten_glDrawRangeElements: _emscripten_glDrawRangeElements,
        emscripten_glEnable: _emscripten_glEnable,
        emscripten_glEnableVertexAttribArray: _emscripten_glEnableVertexAttribArray,
        emscripten_glEndQuery: _emscripten_glEndQuery,
        emscripten_glEndQueryEXT: _emscripten_glEndQueryEXT,
        emscripten_glEndTransformFeedback: _emscripten_glEndTransformFeedback,
        emscripten_glFenceSync: _emscripten_glFenceSync,
        emscripten_glFinish: _emscripten_glFinish,
        emscripten_glFlush: _emscripten_glFlush,
        emscripten_glFlushMappedBufferRange: _emscripten_glFlushMappedBufferRange,
        emscripten_glFramebufferRenderbuffer: _emscripten_glFramebufferRenderbuffer,
        emscripten_glFramebufferTexture2D: _emscripten_glFramebufferTexture2D,
        emscripten_glFramebufferTextureLayer: _emscripten_glFramebufferTextureLayer,
        emscripten_glFrontFace: _emscripten_glFrontFace,
        emscripten_glGenBuffers: _emscripten_glGenBuffers,
        emscripten_glGenFramebuffers: _emscripten_glGenFramebuffers,
        emscripten_glGenQueries: _emscripten_glGenQueries,
        emscripten_glGenQueriesEXT: _emscripten_glGenQueriesEXT,
        emscripten_glGenRenderbuffers: _emscripten_glGenRenderbuffers,
        emscripten_glGenSamplers: _emscripten_glGenSamplers,
        emscripten_glGenTextures: _emscripten_glGenTextures,
        emscripten_glGenTransformFeedbacks: _emscripten_glGenTransformFeedbacks,
        emscripten_glGenVertexArrays: _emscripten_glGenVertexArrays,
        emscripten_glGenerateMipmap: _emscripten_glGenerateMipmap,
        emscripten_glGetActiveAttrib: _emscripten_glGetActiveAttrib,
        emscripten_glGetActiveUniform: _emscripten_glGetActiveUniform,
        emscripten_glGetActiveUniformBlockName: _emscripten_glGetActiveUniformBlockName,
        emscripten_glGetActiveUniformBlockiv: _emscripten_glGetActiveUniformBlockiv,
        emscripten_glGetActiveUniformsiv: _emscripten_glGetActiveUniformsiv,
        emscripten_glGetAttachedShaders: _emscripten_glGetAttachedShaders,
        emscripten_glGetAttribLocation: _emscripten_glGetAttribLocation,
        emscripten_glGetBooleanv: _emscripten_glGetBooleanv,
        emscripten_glGetBufferParameteri64v: _emscripten_glGetBufferParameteri64v,
        emscripten_glGetBufferParameteriv: _emscripten_glGetBufferParameteriv,
        emscripten_glGetBufferPointerv: _emscripten_glGetBufferPointerv,
        emscripten_glGetError: _emscripten_glGetError,
        emscripten_glGetFloatv: _emscripten_glGetFloatv,
        emscripten_glGetFragDataLocation: _emscripten_glGetFragDataLocation,
        emscripten_glGetFramebufferAttachmentParameteriv: _emscripten_glGetFramebufferAttachmentParameteriv,
        emscripten_glGetInteger64i_v: _emscripten_glGetInteger64i_v,
        emscripten_glGetInteger64v: _emscripten_glGetInteger64v,
        emscripten_glGetIntegeri_v: _emscripten_glGetIntegeri_v,
        emscripten_glGetIntegerv: _emscripten_glGetIntegerv,
        emscripten_glGetInternalformativ: _emscripten_glGetInternalformativ,
        emscripten_glGetProgramBinary: _emscripten_glGetProgramBinary,
        emscripten_glGetProgramInfoLog: _emscripten_glGetProgramInfoLog,
        emscripten_glGetProgramiv: _emscripten_glGetProgramiv,
        emscripten_glGetQueryObjecti64vEXT: _emscripten_glGetQueryObjecti64vEXT,
        emscripten_glGetQueryObjectivEXT: _emscripten_glGetQueryObjectivEXT,
        emscripten_glGetQueryObjectui64vEXT: _emscripten_glGetQueryObjectui64vEXT,
        emscripten_glGetQueryObjectuiv: _emscripten_glGetQueryObjectuiv,
        emscripten_glGetQueryObjectuivEXT: _emscripten_glGetQueryObjectuivEXT,
        emscripten_glGetQueryiv: _emscripten_glGetQueryiv,
        emscripten_glGetQueryivEXT: _emscripten_glGetQueryivEXT,
        emscripten_glGetRenderbufferParameteriv: _emscripten_glGetRenderbufferParameteriv,
        emscripten_glGetSamplerParameterfv: _emscripten_glGetSamplerParameterfv,
        emscripten_glGetSamplerParameteriv: _emscripten_glGetSamplerParameteriv,
        emscripten_glGetShaderInfoLog: _emscripten_glGetShaderInfoLog,
        emscripten_glGetShaderPrecisionFormat: _emscripten_glGetShaderPrecisionFormat,
        emscripten_glGetShaderSource: _emscripten_glGetShaderSource,
        emscripten_glGetShaderiv: _emscripten_glGetShaderiv,
        emscripten_glGetString: _emscripten_glGetString,
        emscripten_glGetStringi: _emscripten_glGetStringi,
        emscripten_glGetSynciv: _emscripten_glGetSynciv,
        emscripten_glGetTexParameterfv: _emscripten_glGetTexParameterfv,
        emscripten_glGetTexParameteriv: _emscripten_glGetTexParameteriv,
        emscripten_glGetTransformFeedbackVarying: _emscripten_glGetTransformFeedbackVarying,
        emscripten_glGetUniformBlockIndex: _emscripten_glGetUniformBlockIndex,
        emscripten_glGetUniformIndices: _emscripten_glGetUniformIndices,
        emscripten_glGetUniformLocation: _emscripten_glGetUniformLocation,
        emscripten_glGetUniformfv: _emscripten_glGetUniformfv,
        emscripten_glGetUniformiv: _emscripten_glGetUniformiv,
        emscripten_glGetUniformuiv: _emscripten_glGetUniformuiv,
        emscripten_glGetVertexAttribIiv: _emscripten_glGetVertexAttribIiv,
        emscripten_glGetVertexAttribIuiv: _emscripten_glGetVertexAttribIuiv,
        emscripten_glGetVertexAttribPointerv: _emscripten_glGetVertexAttribPointerv,
        emscripten_glGetVertexAttribfv: _emscripten_glGetVertexAttribfv,
        emscripten_glGetVertexAttribiv: _emscripten_glGetVertexAttribiv,
        emscripten_glHint: _emscripten_glHint,
        emscripten_glInvalidateFramebuffer: _emscripten_glInvalidateFramebuffer,
        emscripten_glInvalidateSubFramebuffer: _emscripten_glInvalidateSubFramebuffer,
        emscripten_glIsBuffer: _emscripten_glIsBuffer,
        emscripten_glIsEnabled: _emscripten_glIsEnabled,
        emscripten_glIsFramebuffer: _emscripten_glIsFramebuffer,
        emscripten_glIsProgram: _emscripten_glIsProgram,
        emscripten_glIsQuery: _emscripten_glIsQuery,
        emscripten_glIsQueryEXT: _emscripten_glIsQueryEXT,
        emscripten_glIsRenderbuffer: _emscripten_glIsRenderbuffer,
        emscripten_glIsSampler: _emscripten_glIsSampler,
        emscripten_glIsShader: _emscripten_glIsShader,
        emscripten_glIsSync: _emscripten_glIsSync,
        emscripten_glIsTexture: _emscripten_glIsTexture,
        emscripten_glIsTransformFeedback: _emscripten_glIsTransformFeedback,
        emscripten_glIsVertexArray: _emscripten_glIsVertexArray,
        emscripten_glLineWidth: _emscripten_glLineWidth,
        emscripten_glLinkProgram: _emscripten_glLinkProgram,
        emscripten_glMapBufferRange: _emscripten_glMapBufferRange,
        emscripten_glPauseTransformFeedback: _emscripten_glPauseTransformFeedback,
        emscripten_glPixelStorei: _emscripten_glPixelStorei,
        emscripten_glPolygonOffset: _emscripten_glPolygonOffset,
        emscripten_glProgramBinary: _emscripten_glProgramBinary,
        emscripten_glProgramParameteri: _emscripten_glProgramParameteri,
        emscripten_glQueryCounterEXT: _emscripten_glQueryCounterEXT,
        emscripten_glReadBuffer: _emscripten_glReadBuffer,
        emscripten_glReadPixels: _emscripten_glReadPixels,
        emscripten_glReleaseShaderCompiler: _emscripten_glReleaseShaderCompiler,
        emscripten_glRenderbufferStorage: _emscripten_glRenderbufferStorage,
        emscripten_glRenderbufferStorageMultisample: _emscripten_glRenderbufferStorageMultisample,
        emscripten_glResumeTransformFeedback: _emscripten_glResumeTransformFeedback,
        emscripten_glSampleCoverage: _emscripten_glSampleCoverage,
        emscripten_glSamplerParameterf: _emscripten_glSamplerParameterf,
        emscripten_glSamplerParameterfv: _emscripten_glSamplerParameterfv,
        emscripten_glSamplerParameteri: _emscripten_glSamplerParameteri,
        emscripten_glSamplerParameteriv: _emscripten_glSamplerParameteriv,
        emscripten_glScissor: _emscripten_glScissor,
        emscripten_glShaderBinary: _emscripten_glShaderBinary,
        emscripten_glShaderSource: _emscripten_glShaderSource,
        emscripten_glStencilFunc: _emscripten_glStencilFunc,
        emscripten_glStencilFuncSeparate: _emscripten_glStencilFuncSeparate,
        emscripten_glStencilMask: _emscripten_glStencilMask,
        emscripten_glStencilMaskSeparate: _emscripten_glStencilMaskSeparate,
        emscripten_glStencilOp: _emscripten_glStencilOp,
        emscripten_glStencilOpSeparate: _emscripten_glStencilOpSeparate,
        emscripten_glTexImage2D: _emscripten_glTexImage2D,
        emscripten_glTexImage3D: _emscripten_glTexImage3D,
        emscripten_glTexParameterf: _emscripten_glTexParameterf,
        emscripten_glTexParameterfv: _emscripten_glTexParameterfv,
        emscripten_glTexParameteri: _emscripten_glTexParameteri,
        emscripten_glTexParameteriv: _emscripten_glTexParameteriv,
        emscripten_glTexStorage2D: _emscripten_glTexStorage2D,
        emscripten_glTexStorage3D: _emscripten_glTexStorage3D,
        emscripten_glTexSubImage2D: _emscripten_glTexSubImage2D,
        emscripten_glTexSubImage3D: _emscripten_glTexSubImage3D,
        emscripten_glTransformFeedbackVaryings: _emscripten_glTransformFeedbackVaryings,
        emscripten_glUniform1f: _emscripten_glUniform1f,
        emscripten_glUniform1fv: _emscripten_glUniform1fv,
        emscripten_glUniform1i: _emscripten_glUniform1i,
        emscripten_glUniform1iv: _emscripten_glUniform1iv,
        emscripten_glUniform1ui: _emscripten_glUniform1ui,
        emscripten_glUniform1uiv: _emscripten_glUniform1uiv,
        emscripten_glUniform2f: _emscripten_glUniform2f,
        emscripten_glUniform2fv: _emscripten_glUniform2fv,
        emscripten_glUniform2i: _emscripten_glUniform2i,
        emscripten_glUniform2iv: _emscripten_glUniform2iv,
        emscripten_glUniform2ui: _emscripten_glUniform2ui,
        emscripten_glUniform2uiv: _emscripten_glUniform2uiv,
        emscripten_glUniform3f: _emscripten_glUniform3f,
        emscripten_glUniform3fv: _emscripten_glUniform3fv,
        emscripten_glUniform3i: _emscripten_glUniform3i,
        emscripten_glUniform3iv: _emscripten_glUniform3iv,
        emscripten_glUniform3ui: _emscripten_glUniform3ui,
        emscripten_glUniform3uiv: _emscripten_glUniform3uiv,
        emscripten_glUniform4f: _emscripten_glUniform4f,
        emscripten_glUniform4fv: _emscripten_glUniform4fv,
        emscripten_glUniform4i: _emscripten_glUniform4i,
        emscripten_glUniform4iv: _emscripten_glUniform4iv,
        emscripten_glUniform4ui: _emscripten_glUniform4ui,
        emscripten_glUniform4uiv: _emscripten_glUniform4uiv,
        emscripten_glUniformBlockBinding: _emscripten_glUniformBlockBinding,
        emscripten_glUniformMatrix2fv: _emscripten_glUniformMatrix2fv,
        emscripten_glUniformMatrix2x3fv: _emscripten_glUniformMatrix2x3fv,
        emscripten_glUniformMatrix2x4fv: _emscripten_glUniformMatrix2x4fv,
        emscripten_glUniformMatrix3fv: _emscripten_glUniformMatrix3fv,
        emscripten_glUniformMatrix3x2fv: _emscripten_glUniformMatrix3x2fv,
        emscripten_glUniformMatrix3x4fv: _emscripten_glUniformMatrix3x4fv,
        emscripten_glUniformMatrix4fv: _emscripten_glUniformMatrix4fv,
        emscripten_glUniformMatrix4x2fv: _emscripten_glUniformMatrix4x2fv,
        emscripten_glUniformMatrix4x3fv: _emscripten_glUniformMatrix4x3fv,
        emscripten_glUnmapBuffer: _emscripten_glUnmapBuffer,
        emscripten_glUseProgram: _emscripten_glUseProgram,
        emscripten_glValidateProgram: _emscripten_glValidateProgram,
        emscripten_glVertexAttrib1f: _emscripten_glVertexAttrib1f,
        emscripten_glVertexAttrib1fv: _emscripten_glVertexAttrib1fv,
        emscripten_glVertexAttrib2f: _emscripten_glVertexAttrib2f,
        emscripten_glVertexAttrib2fv: _emscripten_glVertexAttrib2fv,
        emscripten_glVertexAttrib3f: _emscripten_glVertexAttrib3f,
        emscripten_glVertexAttrib3fv: _emscripten_glVertexAttrib3fv,
        emscripten_glVertexAttrib4f: _emscripten_glVertexAttrib4f,
        emscripten_glVertexAttrib4fv: _emscripten_glVertexAttrib4fv,
        emscripten_glVertexAttribDivisor: _emscripten_glVertexAttribDivisor,
        emscripten_glVertexAttribI4i: _emscripten_glVertexAttribI4i,
        emscripten_glVertexAttribI4iv: _emscripten_glVertexAttribI4iv,
        emscripten_glVertexAttribI4ui: _emscripten_glVertexAttribI4ui,
        emscripten_glVertexAttribI4uiv: _emscripten_glVertexAttribI4uiv,
        emscripten_glVertexAttribIPointer: _emscripten_glVertexAttribIPointer,
        emscripten_glVertexAttribPointer: _emscripten_glVertexAttribPointer,
        emscripten_glViewport: _emscripten_glViewport,
        emscripten_glWaitSync: _emscripten_glWaitSync,
        emscripten_has_asyncify: _emscripten_has_asyncify,
        emscripten_hide_mouse: _emscripten_hide_mouse,
        emscripten_num_logical_cores: _emscripten_num_logical_cores,
        emscripten_request_fullscreen_strategy: _emscripten_request_fullscreen_strategy,
        emscripten_request_pointerlock: _emscripten_request_pointerlock,
        emscripten_resize_heap: _emscripten_resize_heap,
        emscripten_sample_gamepad_data: _emscripten_sample_gamepad_data,
        emscripten_set_beforeunload_callback_on_thread: _emscripten_set_beforeunload_callback_on_thread,
        emscripten_set_blur_callback_on_thread: _emscripten_set_blur_callback_on_thread,
        emscripten_set_canvas_element_size: _emscripten_set_canvas_element_size,
        emscripten_set_element_css_size: _emscripten_set_element_css_size,
        emscripten_set_focus_callback_on_thread: _emscripten_set_focus_callback_on_thread,
        emscripten_set_fullscreenchange_callback_on_thread: _emscripten_set_fullscreenchange_callback_on_thread,
        emscripten_set_gamepadconnected_callback_on_thread: _emscripten_set_gamepadconnected_callback_on_thread,
        emscripten_set_gamepaddisconnected_callback_on_thread: _emscripten_set_gamepaddisconnected_callback_on_thread,
        emscripten_set_keydown_callback_on_thread: _emscripten_set_keydown_callback_on_thread,
        emscripten_set_keypress_callback_on_thread: _emscripten_set_keypress_callback_on_thread,
        emscripten_set_keyup_callback_on_thread: _emscripten_set_keyup_callback_on_thread,
        emscripten_set_main_loop: _emscripten_set_main_loop,
        emscripten_set_mousedown_callback_on_thread: _emscripten_set_mousedown_callback_on_thread,
        emscripten_set_mouseenter_callback_on_thread: _emscripten_set_mouseenter_callback_on_thread,
        emscripten_set_mouseleave_callback_on_thread: _emscripten_set_mouseleave_callback_on_thread,
        emscripten_set_mousemove_callback_on_thread: _emscripten_set_mousemove_callback_on_thread,
        emscripten_set_mouseup_callback_on_thread: _emscripten_set_mouseup_callback_on_thread,
        emscripten_set_pointerlockchange_callback_on_thread: _emscripten_set_pointerlockchange_callback_on_thread,
        emscripten_set_resize_callback_on_thread: _emscripten_set_resize_callback_on_thread,
        emscripten_set_touchcancel_callback_on_thread: _emscripten_set_touchcancel_callback_on_thread,
        emscripten_set_touchend_callback_on_thread: _emscripten_set_touchend_callback_on_thread,
        emscripten_set_touchmove_callback_on_thread: _emscripten_set_touchmove_callback_on_thread,
        emscripten_set_touchstart_callback_on_thread: _emscripten_set_touchstart_callback_on_thread,
        emscripten_set_visibilitychange_callback_on_thread: _emscripten_set_visibilitychange_callback_on_thread,
        emscripten_set_wheel_callback_on_thread: _emscripten_set_wheel_callback_on_thread,
        emscripten_set_window_title: _emscripten_set_window_title,
        emscripten_sleep: _emscripten_sleep,
        emscripten_start_fetch: _emscripten_start_fetch,
        emscripten_websocket_close: _emscripten_websocket_close,
        emscripten_websocket_is_supported: _emscripten_websocket_is_supported,
        emscripten_websocket_new: _emscripten_websocket_new,
        emscripten_websocket_send_binary: _emscripten_websocket_send_binary,
        emscripten_websocket_send_utf8_text: _emscripten_websocket_send_utf8_text,
        emscripten_websocket_set_onclose_callback_on_thread: _emscripten_websocket_set_onclose_callback_on_thread,
        emscripten_websocket_set_onerror_callback_on_thread: _emscripten_websocket_set_onerror_callback_on_thread,
        emscripten_websocket_set_onmessage_callback_on_thread: _emscripten_websocket_set_onmessage_callback_on_thread,
        emscripten_websocket_set_onopen_callback_on_thread: _emscripten_websocket_set_onopen_callback_on_thread,
        environ_get: _environ_get,
        environ_sizes_get: _environ_sizes_get,
        exit: _exit,
        fd_close: _fd_close,
        fd_read: _fd_read,
        fd_seek: _fd_seek,
        fd_write: _fd_write,
        glClipControlEXT: _glClipControlEXT,
        glPolygonModeWEBGL: _glPolygonModeWEBGL,
        glPolygonOffsetClampEXT: _glPolygonOffsetClampEXT,
        invoke_d,
        invoke_di,
        invoke_diffff,
        invoke_dii,
        invoke_diid,
        invoke_diii,
        invoke_f,
        invoke_ff,
        invoke_fff,
        invoke_fi,
        invoke_fif,
        invoke_fifddi,
        invoke_fiff,
        invoke_fii,
        invoke_fiifi,
        invoke_fiii,
        invoke_fiiiii,
        invoke_fiiiiiff,
        invoke_i,
        invoke_id,
        invoke_if,
        invoke_ii,
        invoke_iid,
        invoke_iiddi,
        invoke_iidi,
        invoke_iif,
        invoke_iiff,
        invoke_iifffffffff,
        invoke_iiffffffffffffffff,
        invoke_iifii,
        invoke_iii,
        invoke_iiif,
        invoke_iiiff,
        invoke_iiiffiii,
        invoke_iiifi,
        invoke_iiii,
        invoke_iiiid,
        invoke_iiiidi,
        invoke_iiiif,
        invoke_iiiifi,
        invoke_iiiifii,
        invoke_iiiifiifii,
        invoke_iiiifiifiii,
        invoke_iiiifiiii,
        invoke_iiiii,
        invoke_iiiiid,
        invoke_iiiiif,
        invoke_iiiiifi,
        invoke_iiiiifii,
        invoke_iiiiii,
        invoke_iiiiiid,
        invoke_iiiiiidd,
        invoke_iiiiiif,
        invoke_iiiiiifff,
        invoke_iiiiiifi,
        invoke_iiiiiifii,
        invoke_iiiiiii,
        invoke_iiiiiiifi,
        invoke_iiiiiiii,
        invoke_iiiiiiiii,
        invoke_iiiiiiiiifi,
        invoke_iiiiiiiiii,
        invoke_iiiiiiiiiif,
        invoke_iiiiiiiiiifiiiiii,
        invoke_iiiiiiiiiii,
        invoke_iiiiiiiiiiifiiiiii,
        invoke_iiiiiiiiiiii,
        invoke_iiiiiiiiiiiii,
        invoke_iiiiiiiiiiiiii,
        invoke_iiiiiiiiiiiiiii,
        invoke_iiiiiiiiiiiiiiii,
        invoke_iiiiiiiiiiji,
        invoke_iiiiiiij,
        invoke_iiiiij,
        invoke_iiiijii,
        invoke_iiij,
        invoke_iiiji,
        invoke_iiijii,
        invoke_iiijiii,
        invoke_iiijiiiiii,
        invoke_iij,
        invoke_iiji,
        invoke_iijji,
        invoke_ij,
        invoke_j,
        invoke_ji,
        invoke_jii,
        invoke_jiiii,
        invoke_v,
        invoke_vdiiii,
        invoke_vi,
        invoke_vid,
        invoke_vidd,
        invoke_vidi,
        invoke_vidii,
        invoke_vif,
        invoke_viff,
        invoke_vifff,
        invoke_viffff,
        invoke_vifffffffff,
        invoke_viffffi,
        invoke_viffii,
        invoke_vifi,
        invoke_vii,
        invoke_viid,
        invoke_viidii,
        invoke_viif,
        invoke_viiff,
        invoke_viifff,
        invoke_viiffff,
        invoke_viifffi,
        invoke_viiffi,
        invoke_viiffii,
        invoke_viiffiii,
        invoke_viifii,
        invoke_viifiii,
        invoke_viifiiii,
        invoke_viifji,
        invoke_viii,
        invoke_viiid,
        invoke_viiidd,
        invoke_viiiddd,
        invoke_viiidi,
        invoke_viiif,
        invoke_viiiff,
        invoke_viiifff,
        invoke_viiiffii,
        invoke_viiifi,
        invoke_viiififf,
        invoke_viiifii,
        invoke_viiifiii,
        invoke_viiii,
        invoke_viiiid,
        invoke_viiiidfi,
        invoke_viiiidi,
        invoke_viiiif,
        invoke_viiiiffi,
        invoke_viiiifi,
        invoke_viiiifii,
        invoke_viiiifiifiiifffii,
        invoke_viiiifiiiiiiiii,
        invoke_viiiii,
        invoke_viiiiid,
        invoke_viiiiifi,
        invoke_viiiiifii,
        invoke_viiiiifiiiiiii,
        invoke_viiiiifiiiiiiii,
        invoke_viiiiii,
        invoke_viiiiiif,
        invoke_viiiiiifi,
        invoke_viiiiiifiiiiii,
        invoke_viiiiiii,
        invoke_viiiiiiif,
        invoke_viiiiiiifffii,
        invoke_viiiiiiii,
        invoke_viiiiiiiif,
        invoke_viiiiiiiii,
        invoke_viiiiiiiiii,
        invoke_viiiiiiiiiii,
        invoke_viiiiiiiiiiii,
        invoke_viiiiiiiiiiiii,
        invoke_viiiiiiiiiiiiiii,
        invoke_viiiiiji,
        invoke_viiiij,
        invoke_viiij,
        invoke_viij,
        invoke_viiji,
        invoke_viijii,
        invoke_vij,
        invoke_viji,
        invoke_vijj,
        invoke_vijjidddii,
        llvm_eh_typeid_for: _llvm_eh_typeid_for,
        memory: wasmMemory,
        proc_exit: _proc_exit
    }
}
var wasmExports;
createWasm();
var ___wasm_call_ctors = createExportWrapper("__wasm_call_ctors", 0);
var _pthread_self = () => (_pthread_self = wasmExports["pthread_self"])();
var _main = Module["_main"] = createExportWrapper("__main_argc_argv", 2);
var _free = createExportWrapper("free", 1);
var _malloc = createExportWrapper("malloc", 1);
var ___cxa_free_exception = createExportWrapper("__cxa_free_exception", 1);
var _strerror = createExportWrapper("strerror", 1);
var _fflush = createExportWrapper("fflush", 1);
var _htons = createExportWrapper("htons", 1);
var ___cxa_get_exception_ptr = createExportWrapper("__cxa_get_exception_ptr", 1);
var _ntohs = createExportWrapper("ntohs", 1);
var ___getTypeName = createExportWrapper("__getTypeName", 1);
var __embind_initialize_bindings = createExportWrapper("_embind_initialize_bindings", 0);
var __emscripten_tls_init = createExportWrapper("_emscripten_tls_init", 0);
var _emscripten_builtin_memalign = createExportWrapper("emscripten_builtin_memalign", 2);
var __emscripten_run_callback_on_thread = createExportWrapper("_emscripten_run_callback_on_thread", 5);
var __emscripten_thread_init = createExportWrapper("_emscripten_thread_init", 6);
var __emscripten_thread_crashed = createExportWrapper("_emscripten_thread_crashed", 0);
var _emscripten_stack_get_base = () => (_emscripten_stack_get_base = wasmExports["emscripten_stack_get_base"])();
var _emscripten_stack_get_end = () => (_emscripten_stack_get_end = wasmExports["emscripten_stack_get_end"])();
var __emscripten_run_on_main_thread_js = createExportWrapper("_emscripten_run_on_main_thread_js", 5);
var __emscripten_thread_free_data = createExportWrapper("_emscripten_thread_free_data", 1);
var __emscripten_thread_exit = createExportWrapper("_emscripten_thread_exit", 1);
var __emscripten_check_mailbox = createExportWrapper("_emscripten_check_mailbox", 0);
var _setThrew = createExportWrapper("setThrew", 2);
var __emscripten_tempret_set = createExportWrapper("_emscripten_tempret_set", 1);
var _emscripten_stack_init = () => (_emscripten_stack_init = wasmExports["emscripten_stack_init"])();
var _emscripten_stack_set_limits = (a0, a1) => (_emscripten_stack_set_limits = wasmExports["emscripten_stack_set_limits"])(a0, a1);
var _emscripten_stack_get_free = () => (_emscripten_stack_get_free = wasmExports["emscripten_stack_get_free"])();
var __emscripten_stack_restore = a0 => (__emscripten_stack_restore = wasmExports["_emscripten_stack_restore"])(a0);
var __emscripten_stack_alloc = a0 => (__emscripten_stack_alloc = wasmExports["_emscripten_stack_alloc"])(a0);
var _emscripten_stack_get_current = () => (_emscripten_stack_get_current = wasmExports["emscripten_stack_get_current"])();
var ___cxa_decrement_exception_refcount = createExportWrapper("__cxa_decrement_exception_refcount", 1);
var ___cxa_increment_exception_refcount = createExportWrapper("__cxa_increment_exception_refcount", 1);
var ___get_exception_message = createExportWrapper("__get_exception_message", 3);
var ___cxa_can_catch = createExportWrapper("__cxa_can_catch", 3);
function invoke_i(index) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)()
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiii(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_vi(index, a1) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_ii(index, a1) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iii(index, a1, a2) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_vii(index, a1, a2) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiii(index, a1, a2, a3) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiii(index, a1, a2, a3, a4, a5, a6) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viii(index, a1, a2, a3) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_v(index) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)()
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiii(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiddi(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_d(index) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)()
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_di(index, a1) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiid(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_vif(index, a1, a2) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_vid(index, a1, a2) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viid(index, a1, a2, a3) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiii(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiidd(index, a1, a2, a3, a4, a5, a6, a7) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiif(index, a1, a2, a3) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_j(index) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)()
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0);
        return 0n
    }
}
function invoke_iij(index, a1, a2) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiji(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_jii(index, a1, a2) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0);
        return 0n
    }
}
function invoke_viiiiii(index, a1, a2, a3, a4, a5, a6) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_dii(index, a1, a2) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiid(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_id(index, a1) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iid(index, a1, a2) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiid(index, a1, a2, a3, a4, a5, a6) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiif(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiifi(index, a1, a2, a3, a4, a5, a6) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiifii(index, a1, a2, a3, a4, a5, a6) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiifii(index, a1, a2, a3, a4, a5, a6) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiifiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iifffffffff(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iif(index, a1, a2) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiififf(index, a1, a2, a3, a4, a5, a6, a7) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiiifii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_fif(index, a1, a2) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viif(index, a1, a2, a3) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiff(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viifii(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_if(index, a1) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiifi(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiiifi(index, a1, a2, a3, a4, a5, a6, a7) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiiiiiif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiffii(index, a1, a2, a3, a4, a5, a6, a7) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiiiiif(index, a1, a2, a3, a4, a5, a6, a7, a8) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiiiif(index, a1, a2, a3, a4, a5, a6, a7) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiffff(index, a1, a2, a3, a4, a5, a6) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiif(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viifff(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiiiifi(index, a1, a2, a3, a4, a5, a6, a7, a8) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viifiii(index, a1, a2, a3, a4, a5, a6) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_f(index) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)()
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_fi(index, a1) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiif(index, a1, a2, a3, a4, a5, a6) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiif(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiifi(index, a1, a2, a3, a4, a5, a6) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiifi(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_fii(index, a1, a2) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iifii(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiifiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiji(index, a1, a2, a3) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viifiiii(index, a1, a2, a3, a4, a5, a6, a7) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_diffff(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_fiii(index, a1, a2, a3) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiif(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_fiiiii(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_vifff(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_vidd(index, a1, a2, a3) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_fifddi(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_ji(index, a1) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0);
        return 0n
    }
}
function invoke_vifi(index, a1, a2, a3) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_vdiiii(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viji(index, a1, a2, a3) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viifffi(index, a1, a2, a3, a4, a5, a6) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viff(index, a1, a2, a3) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viffff(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiifff(index, a1, a2, a3, a4, a5, a6) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viidii(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiff(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_vifffffffff(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiffiii(index, a1, a2, a3, a4, a5, a6, a7) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiff(index, a1, a2, a3) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiidi(index, a1, a2, a3, a4, a5, a6) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_vidi(index, a1, a2, a3) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiddd(index, a1, a2, a3, a4, a5, a6) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiidd(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_fiifi(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_ij(index, a1) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiidi(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiidi(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_diii(index, a1, a2, a3) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_diid(index, a1, a2, a3) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiid(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viffii(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiiiiifffii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viffffi(index, a1, a2, a3, a4, a5, a6) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiifii(index, a1, a2, a3, a4, a5, a6, a7) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiifiifii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiifiifiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiffi(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiifii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiiiiiiifiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiiiiiifiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiffiii(index, a1, a2, a3, a4, a5, a6, a7) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiifii(index, a1, a2, a3, a4, a5, a6, a7) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiff(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiifiii(index, a1, a2, a3, a4, a5, a6, a7) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiffffffffffffffff(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiiiifiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiffii(index, a1, a2, a3, a4, a5, a6) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viifji(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_ff(index, a1) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiifi(index, a1, a2, a3, a4, a5, a6, a7) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiiiiifi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_fff(index, a1, a2) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiifff(index, a1, a2, a3, a4, a5, a6, a7, a8) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiij(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viijii(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iijji(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiiiiiiji(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viij(index, a1, a2, a3) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiiiji(index, a1, a2, a3, a4, a5, a6, a7) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiiij(index, a1, a2, a3, a4, a5, a6, a7) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_vijjidddii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiijii(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiijii(index, a1, a2, a3, a4, a5, a6) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiij(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiij(index, a1, a2, a3) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_vijj(index, a1, a2, a3) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiijiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_vidii(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiji(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_vij(index, a1, a2) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiidfi(index, a1, a2, a3, a4, a5, a6, a7) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiiid(index, a1, a2, a3, a4, a5, a6) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiid(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iidi(index, a1, a2, a3) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiijiii(index, a1, a2, a3, a4, a5, a6) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiiifiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiifiifiiifffii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiiifiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_viiiiffi(index, a1, a2, a3, a4, a5, a6, a7) {
    var sp = stackSave();
    try {
        getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_fiiiiiff(index, a1, a2, a3, a4, a5, a6, a7) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_fiff(index, a1, a2, a3) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiiiiiif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiiiifi(index, a1, a2, a3, a4, a5, a6, a7, a8) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiifi(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_iiiiij(index, a1, a2, a3, a4, a5) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4, a5)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0)
    }
}
function invoke_jiiii(index, a1, a2, a3, a4) {
    var sp = stackSave();
    try {
        return getWasmTableEntry(index)(a1, a2, a3, a4)
    } catch (e) {
        stackRestore(sp);
        if (!(e instanceof EmscriptenEH))
            throw e;
        _setThrew(1, 0);
        return 0n
    }
}
Module["addRunDependency"] = addRunDependency;
Module["removeRunDependency"] = removeRunDependency;
Module["FS_createPreloadedFile"] = FS_createPreloadedFile;
Module["FS_unlink"] = FS_unlink;
Module["FS_createPath"] = FS_createPath;
Module["FS_createDevice"] = FS_createDevice;
Module["FS_createDataFile"] = FS_createDataFile;
Module["FS_createLazyFile"] = FS_createLazyFile;

var missingLibrarySymbols = ["writeI53ToI64Clamped", "writeI53ToI64Signaling", "writeI53ToU64Clamped", "writeI53ToU64Signaling", "convertI32PairToI53", "convertI32PairToI53Checked", "convertU32PairToI53", "getTempRet0", "emscriptenLog", "getDynCaller", "asmjsMangle", "getNativeTypeSize", "addOnInit", "addOnPostCtor", "addOnPreMain", "STACK_SIZE", "STACK_ALIGN", "POINTER_SIZE", "ASSERTIONS", "getCFunc", "ccall", "cwrap", "uleb128Encode", "sigToWasmTypes", "generateFuncType", "convertJsFunctionToWasm", "getEmptyTableSlot", "updateTableMap", "getFunctionAddress", "addFunction", "removeFunction", "reallyNegative", "unSign", "strLen", "reSign", "formatString", "intArrayToString", "AsciiToString", "writeArrayToMemory", "fillDeviceOrientationEventData", "registerDeviceOrientationEventCallback", "fillDeviceMotionEventData", "registerDeviceMotionEventCallback", "screenOrientation", "fillOrientationChangeEventData", "registerOrientationChangeEventCallback", "hideEverythingExceptGivenElement", "restoreHiddenElements", "softFullscreenResizeWebGLRenderTarget", "registerPointerlockErrorEventCallback", "fillBatteryEventData", "battery", "registerBatteryEventCallback", "jsStackTrace", "getCallstack", "convertPCtoSourceLocation", "wasiRightsToMuslOFlags", "wasiOFlagsToMuslOFlags", "setImmediateWrapped", "safeRequestAnimationFrame", "clearImmediateWrapped", "registerPostMainLoop", "getPromise", "makePromise", "idsToPromises", "makePromiseCallback", "Browser_asyncPrepareDataCounter", "arraySum", "addDays", "FS_mkdirTree", "_setNetworkCallback", "writeGLArray", "emscripten_webgl_destroy_context_before_on_calling_thread", "registerWebGlEventCallback", "runAndAbortIfError", "ALLOC_NORMAL", "ALLOC_STACK", "allocate", "writeStringToMemory", "writeAsciiToMemory", "demangle", "stackTrace", "throwInternalError", "whenDependentTypesAreResolved", "getFunctionName", "getFunctionArgsName", "heap32VectorToArray", "usesDestructorStack", "createJsInvokerSignature", "checkArgCount", "getRequiredArgCount", "createJsInvoker", "UnboundTypeError", "PureVirtualError", "throwUnboundTypeError", "ensureOverloadTable", "exposePublicSymbol", "replacePublicSymbol", "createNamedFunction", "getBasestPointer", "registerInheritedInstance", "unregisterInheritedInstance", "getInheritedInstance", "getInheritedInstanceCount", "getLiveInheritedInstances", "enumReadValueFromPointer", "craftInvokerFunction", "embind__requireFunction", "genericPointerToWireType", "constNoSmartPtrRawPointerToWireType", "nonConstNoSmartPtrRawPointerToWireType", "init_RegisteredPointer", "RegisteredPointer", "RegisteredPointer_fromWireType", "runDestructor", "releaseClassHandle", "detachFinalizer", "attachFinalizer", "makeClassHandle", "init_ClassHandle", "ClassHandle", "throwInstanceAlreadyDeleted", "flushPendingDeletes", "setDelayFunction", "RegisteredClass", "shallowCopyInternalPointer", "downcastPointer", "upcastPointer", "validateThis", "char_0", "char_9", "makeLegalFunctionName", "emval_lookupTypes", "emval_addMethodCaller"];
missingLibrarySymbols.forEach(missingLibrarySymbol);
var unexportedSymbols = ["run", "out", "err", "callMain", "abort", "wasmMemory", "wasmExports", "GROWABLE_HEAP_I8", "GROWABLE_HEAP_U8", "GROWABLE_HEAP_I16", "GROWABLE_HEAP_U16", "GROWABLE_HEAP_I32", "GROWABLE_HEAP_U32", "GROWABLE_HEAP_F32", "GROWABLE_HEAP_F64", "writeStackCookie", "checkStackCookie", "prettyPrint", "writeI53ToI64", "readI53FromI64", "readI53FromU64", "INT53_MAX", "INT53_MIN", "bigintToI53Checked", "stackSave", "stackRestore", "stackAlloc", "setTempRet0", "ptrToString", "zeroMemory", "exitJS", "getHeapMax", "growMemory", "ENV", "ERRNO_CODES", "strError", "inetPton4", "inetNtop4", "inetPton6", "inetNtop6", "readSockaddr", "writeSockaddr", "DNS", "Protocols", "Sockets", "timers", "warnOnce", "readEmAsmArgsArray", "readEmAsmArgs", "runEmAsmFunction", "runMainThreadEmAsm", "jstoi_q", "jstoi_s", "getExecutableName", "listenOnce", "autoResumeAudioContext", "dynCall", "handleException", "keepRuntimeAlive", "runtimeKeepalivePush", "runtimeKeepalivePop", "callUserCallback", "maybeExit", "asyncLoad", "alignMemory", "mmapAlloc", "HandleAllocator", "wasmTable", "noExitRuntime", "addOnPreRun", "addOnExit", "addOnPostRun", "freeTableIndexes", "functionsInTableMap", "setValue", "getValue", "PATH", "PATH_FS", "UTF8Decoder", "UTF8ArrayToString", "UTF8ToString", "stringToUTF8Array", "stringToUTF8", "lengthBytesUTF8", "intArrayFromString", "stringToAscii", "UTF16Decoder", "UTF16ToString", "stringToUTF16", "lengthBytesUTF16", "UTF32ToString", "stringToUTF32", "lengthBytesUTF32", "stringToNewUTF8", "stringToUTF8OnStack", "JSEvents", "registerKeyEventCallback", "specialHTMLTargets", "maybeCStringToJsString", "findEventTarget", "findCanvasEventTarget", "getBoundingClientRect", "fillMouseEventData", "registerMouseEventCallback", "registerWheelEventCallback", "registerUiEventCallback", "registerFocusEventCallback", "fillFullscreenChangeEventData", "registerFullscreenChangeEventCallback", "JSEvents_requestFullscreen", "JSEvents_resizeCanvasForFullscreen", "registerRestoreOldStyle", "setLetterbox", "currentFullscreenStrategy", "restoreOldWindowedStyle", "doRequestFullscreen", "fillPointerlockChangeEventData", "registerPointerlockChangeEventCallback", "requestPointerLock", "fillVisibilityChangeEventData", "registerVisibilityChangeEventCallback", "registerTouchEventCallback", "fillGamepadEventData", "registerGamepadEventCallback", "registerBeforeUnloadEventCallback", "setCanvasElementSizeCallingThread", "setCanvasElementSizeMainThread", "setCanvasElementSize", "getCanvasSizeCallingThread", "getCanvasSizeMainThread", "getCanvasElementSize", "UNWIND_CACHE", "ExitStatus", "getEnvStrings", "checkWasiClock", "doReadv", "doWritev", "initRandomFill", "randomFill", "safeSetTimeout", "emSetImmediate", "emClearImmediate_deps", "emClearImmediate", "registerPreMainLoop", "promiseMap", "uncaughtExceptionCount", "exceptionLast", "exceptionCaught", "ExceptionInfo", "findMatchingCatch", "getExceptionMessageCommon", "incrementExceptionRefcount", "decrementExceptionRefcount", "getExceptionMessage", "Browser", "getPreloadedImageData__data", "wget", "MONTH_DAYS_REGULAR", "MONTH_DAYS_LEAP", "MONTH_DAYS_REGULAR_CUMULATIVE", "MONTH_DAYS_LEAP_CUMULATIVE", "isLeapYear", "ydayFromDate", "SYSCALLS", "getSocketFromFD", "getSocketAddress", "preloadPlugins", "FS_modeStringToFlags", "FS_getMode", "FS_stdin_getChar_buffer", "FS_stdin_getChar", "FS_readFile", "FS", "MEMFS", "TTY", "PIPEFS", "SOCKFS", "tempFixedLengthArray", "miniTempWebGLFloatBuffers", "miniTempWebGLIntBuffers", "heapObjectForWebGLType", "toTypedArrayIndex", "webgl_enable_WEBGL_multi_draw", "webgl_enable_EXT_polygon_offset_clamp", "webgl_enable_EXT_clip_control", "webgl_enable_WEBGL_polygon_mode", "GL", "emscriptenWebGLGet", "computeUnpackAlignedImageSize", "colorChannelsInGlTextureFormat", "emscriptenWebGLGetTexPixelData", "emscriptenWebGLGetUniform", "webglGetUniformLocation", "webglPrepareUniformLocationsBeforeFirstUse", "webglGetLeftBracePos", "emscriptenWebGLGetVertexAttrib", "__glGetActiveAttribOrUniform", "emscriptenWebGLGetBufferBinding", "emscriptenWebGLValidateMapBufferTarget", "AL", "GLUT", "EGL", "GLEW", "IDBStore", "emscriptenWebGLGetIndexed", "webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance", "webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance", "allocateUTF8", "allocateUTF8OnStack", "print", "printErr", "PThread", "terminateWorker", "cleanupThread", "registerTLSInit", "spawnThread", "exitOnMainThread", "proxyToMainThread", "proxiedJSCallArgs", "invokeEntryPoint", "checkMailbox", "InternalError", "BindingError", "throwBindingError", "registeredTypes", "awaitingDependencies", "typeDependencies", "tupleRegistrations", "structRegistrations", "sharedRegisterType", "embind_charCodes", "embind_init_charCodes", "readLatin1String", "getTypeName", "requireRegisteredType", "GenericWireTypeSize", "EmValType", "EmValOptionalType", "embindRepr", "registeredInstances", "registeredPointers", "registerType", "integerReadValueFromPointer", "floatReadValueFromPointer", "readPointer", "runDestructors", "finalizationRegistry", "detachFinalizer_deps", "deletionQueue", "delayFunction", "emval_freelist", "emval_handles", "emval_symbols", "init_emval", "count_emval_handles", "getStringOrSymbol", "Emval", "emval_get_global", "emval_returnValue", "emval_methodCallers", "reflectConstruct", "webSockets", "WS", "Fetch", "fetchDeleteCachedData", "fetchLoadCachedData", "fetchCacheData", "fetchXHR"];
unexportedSymbols.forEach(unexportedRuntimeSymbol);
var calledRun;
function callMain(args=[]) {
    assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
    assert(typeof onPreRuns === "undefined" || onPreRuns.length == 0, "cannot call main when preRun functions remain to be called");
    var entryFunction = _main;
    args.unshift(thisProgram);
    var argc = args.length;
    var argv = stackAlloc((argc + 1) * 4);
    var argv_ptr = argv;
    args.forEach(arg => {
        GROWABLE_HEAP_U32()[argv_ptr >> 2] = stringToUTF8OnStack(arg);
        argv_ptr += 4
    }
    );
    GROWABLE_HEAP_U32()[argv_ptr >> 2] = 0;
    try {
        var ret = entryFunction(argc, argv);
        exitJS(ret, true);
        return ret
    } catch (e) {
        return handleException(e)
    }
}
function stackCheckInit() {
    assert(!ENVIRONMENT_IS_PTHREAD);
    _emscripten_stack_init();
    writeStackCookie()
}
function run(args=arguments_) {
    if (runDependencies > 0) {
        dbg("run() called, but dependencies remain, so not running");
        dependenciesFulfilled = run;
        return
    }
    if (ENVIRONMENT_IS_PTHREAD) {
        initRuntime();
        return
    }
    stackCheckInit();
    preRun();
    if (runDependencies > 0) {
        dbg("run() called, but dependencies remain, so not running");
        dependenciesFulfilled = run;
        return
    }
    function doRun() {
        assert(!calledRun);
        calledRun = true;
        Module["calledRun"] = true;
        if (ABORT)
            return;
        initRuntime();
        preMain();
        Module["onRuntimeInitialized"]?.();
        consumedModuleProp("onRuntimeInitialized");
        var noInitialRun = Module["noInitialRun"];
        legacyModuleProp("noInitialRun", "noInitialRun");
        if (!noInitialRun)
            callMain(args);
        postRun()
    }
    if (Module["setStatus"]) {
        Module["setStatus"]("Running...");
        setTimeout( () => {
            setTimeout( () => Module["setStatus"](""), 1);
            doRun()
        }
        , 1)
    } else {
        doRun()
    }
    checkStackCookie()
}
function checkUnflushedContent() {
    var oldOut = out;
    var oldErr = err;
    var has = false;
    out = err = x => {
        has = true
    }
    ;
    try {
        _fflush(0);
        ["stdout", "stderr"].forEach(name => {
            var info = FS.analyzePath("/dev/" + name);
            if (!info)
                return;
            var stream = info.object;
            var rdev = stream.rdev;
            var tty = TTY.ttys[rdev];
            if (tty?.output?.length) {
                has = true
            }
        }
        )
    } catch (e) {}
    out = oldOut;
    err = oldErr;
    if (has) {
        warnOnce("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.")
    }
}
if (Module["preInit"]) {
    if (typeof Module["preInit"] == "function")
        Module["preInit"] = [Module["preInit"]];
    while (Module["preInit"].length > 0) {
        Module["preInit"].pop()()
    }
}
consumedModuleProp("preInit");
run();
