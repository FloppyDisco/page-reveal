const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "page-reveal" is now active!');

	// cache configs
	let isCentered;
	let centeredTimer;

	context.subscriptions.push([
		 vscode.commands.registerCommand("pageRevealUp", () => {

			console.log('paging up!',);

			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return; // No active editor
			}

			const currentPosition = editor.selection.active
			// save the current editor Range
			const currentReveal = editor.visibleRanges[0];

			const revealType = vscode.workspace.getConfiguration("pageReveal")
			.get("revealType", "inCenter");
			// call the reveal command

			editor.revealRange(currentPosition, vscode.TextEditorRevealType[revealType])

			const editorMoved = currentReveal !== editor.visibleRanges[0];

			if (!editorMoved){
				console.log('editor did not move',);

				vscode.commands.executeCommand("pageUp");
				editor.revealRange(currentPosition, vscode.TextEditorRevealType[revealType])

			} else {
				console.log('editor moved',);
			}

			console.log('done with pageRevealUp',);

		 })
	]);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
