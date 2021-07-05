/**
 * @name BetterCallNotifications
 * @invite undefined
 * @authorLink undefined
 * @donate undefined
 * @patreon undefined
 * @website https://github.com/TheAngryPerson/BetterDiscordStuff/tree/main/Plugins/BetterCallNotifications
 * @source https://raw.githubusercontent.com/TheAngryPerson/BetterDiscordStuff/main/Plugins/BetterCallNotifications/BetterCallNotifications.plugin.js
 */
/*@cc_on
@if (@_jscript)
	
	// Offer to self-install for clueless users that try to run this directly.
	var shell = WScript.CreateObject("WScript.Shell");
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
	var pathSelf = WScript.ScriptFullName;
	// Put the user at ease by addressing them in the first person
	shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
	if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
		shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
	} else if (!fs.FolderExists(pathPlugins)) {
		shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
	} else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
		fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
		// Show the user where to put plugins in the future
		shell.Exec("explorer " + pathPlugins);
		shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
	}
	WScript.Quit();

@else@*/

module.exports = (() => {
    const config = {"info":{"name":"BetterCallNotifications","authors":[{"name":"Angry Person","discord_id":"302960843711315968","github_username":"TheAngryPerson"}],"version":"0.0.1","description":"DOES NOT WORK CURRENTLY Allows the user to disable call notifications even without dnd and enables call notifications to bypass dnd.","github":"https://github.com/TheAngryPerson/BetterDiscordStuff/tree/main/Plugins/BetterCallNotifications","github_raw":"https://raw.githubusercontent.com/TheAngryPerson/BetterDiscordStuff/main/Plugins/BetterCallNotifications/BetterCallNotifications.plugin.js"},"changelog":[{"title":"Plugin Basics Created","items":["Plugin","Added changelog"]},{"title":"On-going","type":"progress","items":["Plugin does something"]}],"main":"index.js"};

    return !global.ZeresPluginLibrary ? class {
        constructor() {this._config = config;}
        getName() {return config.info.name;}
        getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
        getDescription() {return config.info.description;}
        getVersion() {return config.info.version;}
        load() {
            BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: "Download Now",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                    });
                }
            });
        }
        start() {}
        stop() {}
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Library) => {
	const {Logger, Patcher, DiscordAPI} = Library;
	return class BetterCallNotifications extends Plugin {
		onStart() {
			Logger.log("Started");
			Patcher.before(Logger, "log", (t, a) => {
				a[0] = "Patched Message: " + a[0];
			});
			Logger.log("Status is " + UserSettings().status())
		}

		onStop() {
			Logger.log("Stopped");
			Patcher.unpatchAll();
		}
	};
};
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/