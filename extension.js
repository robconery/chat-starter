// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const Cow = require("./lib/cow");
const Editor = require("./lib/editor");

async function activate(context) {

  //this is our chat participant
  const cow = new Cow();
  
  //it's important to use an inline callback here due to scoping issues.
  //setting the handler to pg.handle would not work as "this" would not
  //be set right.
  const participant = vscode.chat.createChatParticipant("cow", async (request, context, 
    stream, token) => {
    //Whenever a user hits enter, this is where we'll send the request
    await cow.handle(request, context, stream, token)
  });

  context.subscriptions.push(
    participant,
    vscode.commands.registerCommand("cow.print", async () => {
      //we don't have access to the stream any more, so whatever you run
      //here is "out of band", so to speak. You can still use the participant
      //object, which means you can do things like print out the results, pop
      //up a notification, etc.
      await Editor.writeAndShowFile("cow.md", cow.markdown);
    })
  );
}

// This method is called when your extension is deactivated
async function deactivate() {
  
}

module.exports = {
  activate,
  deactivate,
};
