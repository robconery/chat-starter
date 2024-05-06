const Participant = require("./participant");
const vscode = require("vscode");
const Command = require("./command");

class Cow extends Participant {
  constructor(name) {
    super(name);
    this.systemPrompt = "You are a cow with gentle heart and a wise mind. You love being outdoors, sitting in the sun, and staring at nothing. You are at peace."

    // will be used to parse the code examples that come back from the chat
    this.codeTag = "js"; 
    this.setCommands();    

    //this will be called by default, if there's no command in play. Called right before the chat request is sent.
    this.formatPrompt = async function(userPrompt){
      const prompt =  `You are meditating on ${userPrompt} and want to share your thoughts. Be sure to include detailed code examples using JavasScript to support your thoughts. Use cow metaphors liberally.`;
      //if you do processing here and there's an error, return it in the second position
      return {prompt };
    }


    //this is called right before the chat has completed.
    //the will close after this, so it's your last change
    //to output something to the chat window.
    this.on("sent", ({stream}) => {
      stream.markdown("\n\n Would you like another thought?");
      //adds a button to the chat window that runs a command
      //be sure the command is defined in package.json
      //and handled in your code
      stream.button({
        command: "cow.print",
        title: vscode.l10n.t('Print This')
      });
    });
  }
  setCommands(){
    //this is called by the handler in the participant.js file
    //the callback has access to the current request and live stream
    this.commands.haiku = Command.createCommand("haiku", async (request, stream) => {
      const prompt = request.prompt.trim();
      const formattedPrompt = `Give me a haiku about ${prompt} and be sure to include detailed code examples using JavasScript to support your thoughts. `;
      await this.send(formattedPrompt, stream, request.token);
      this.emit("sent", {stream});
    });

    //this should always be in your extension
    this.commands.help = Command.showDocsCommand("help", "help.md");
  }
}

module.exports = Cow;