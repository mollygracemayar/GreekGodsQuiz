"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = exports.openFolderInVscode = exports.cloneIntoFolder = exports.getCloneCommand = exports.getRepoName = exports.getParams = void 0;
const vscode = require("vscode");
const path = require('path');
const child_process_1 = require("child_process");
const extensionName = "quickclone";
const getParams = (uri) => {
    // TODO: Works for only a specific endpoint instead of all of em
    const params = {};
    uri.query
        .split('&')
        .forEach(param => {
        const [key, value] = param.split('=');
        if (!value) {
            throw new Error(`Invalid query parameter: ${param}`);
        }
        params[key] = value;
    });
    return params;
};
exports.getParams = getParams;
const getRepoName = (remoteUrl) => {
    const split = remoteUrl.split('/');
    if (split.length !== 2) {
        return null;
    }
    return split[1];
};
exports.getRepoName = getRepoName;
const getCloneCommand = (remoteUrl, remoteType) => {
    switch (remoteType) {
        case "HTTPS":
            return "git clone https://github.com/" + remoteUrl + ".git";
        case "SSH":
            return "git clone git@github.com:" + remoteUrl + ".git";
        case "GitHub CLI":
            return "gh repo clone " + remoteUrl;
        default:
            return null;
    }
};
exports.getCloneCommand = getCloneCommand;
const cloneIntoFolder = (cloneCommand, folderPath, repoName, openFolder) => {
    child_process_1.exec(cloneCommand, {
        cwd: path.resolve(folderPath, ''),
    }, (err, stdout, stderr) => {
        if (err) {
            vscode.window.showErrorMessage(err.toString());
            return;
        }
        const repoPath = path.resolve(folderPath, repoName);
        exports.openFolderInVscode(repoPath, openFolder);
    });
};
exports.cloneIntoFolder = cloneIntoFolder;
const openFolderInVscode = (folderPath, openFolder) => {
    if (!openFolder) {
        vscode.window.showInformationMessage('Successfully cloned the repository.' + "\n" +
            'Do you want to open the repository in vscode?', "Yes", "No").then(answer => {
            if (answer === "Yes") {
                let uri = vscode.Uri.file(folderPath);
                vscode.commands.executeCommand('vscode.openFolder', uri);
            }
        });
    }
    else {
        let uri = vscode.Uri.file(folderPath);
        vscode.commands.executeCommand('vscode.openFolder', uri);
    }
};
exports.openFolderInVscode = openFolderInVscode;
function activate(context) {
    vscode.window.registerUriHandler({
        handleUri: (uri) => {
            const vscodeConfig = vscode.workspace.getConfiguration(extensionName);
            // TODO: Sanitize remoteUrl before passing it down
            const { remoteUrl, remoteType } = exports.getParams(uri);
            if (!remoteUrl) {
                vscode.window.showErrorMessage('Remote URL was not specified');
                return;
            }
            if (!remoteType) {
                vscode.window.showErrorMessage('Remote type was not specified');
                return;
            }
            const repoName = exports.getRepoName(remoteUrl);
            if (!repoName) {
                vscode.window.showErrorMessage('Invalid remote URL');
                return;
            }
            const cloneCommand = exports.getCloneCommand(remoteUrl, remoteType);
            if (!cloneCommand) {
                vscode.window.showErrorMessage('Invalid remote type');
                return;
            }
            const defaultFolder = vscodeConfig.get("defaultFolder");
            const defaultUri = defaultFolder !== undefined && defaultFolder !== ""
                ? vscode.Uri.file(defaultFolder) : undefined;
            const dialogOptions = {
                canSelectFiles: false,
                canSelectFolders: true,
                canSelectMany: false,
                openLabel: 'Select a folder',
                title: 'Select folder to clone repository into',
                defaultUri: defaultUri
            };
            vscode.window.showOpenDialog(dialogOptions)
                .then(folders => {
                var _a;
                if (folders && folders.length > 0) {
                    vscode.window.showInformationMessage(`Cloning into ${repoName}...`);
                    const folderPath = folders[0].fsPath;
                    const openFolder = (_a = vscodeConfig.get("alwaysOpen")) !== null && _a !== void 0 ? _a : false;
                    exports.cloneIntoFolder(cloneCommand, folderPath, repoName, openFolder);
                }
                else {
                    vscode.window.showInformationMessage('Operation cancelled.');
                }
            });
        }
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map