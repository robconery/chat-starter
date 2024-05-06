# The Chat Participant Starter

This project is here for you to use to get started making your own VS Code Copilot Chat Participant. It has base classes that you can extend as well as number of library classes that help you work with the editor and VS Code itself.

## The Concepts

You are intercepting messages from the Copilot chat screen, which means you can respond to your user's chat requests in a variety of ways using the entire utility of VS Code's extension model.

A user can ask a simple question, which you can wrap with additional prompting of your own, or they can issue a command with a particular focus, that allows you to do something in VS Code, or wrap their command prompt in even more specific focus.

## Example

This project, as silly as it is, represents this idea clearly. Our participant is a cow, thinking about code. When you ask `@cow` questions, they'll respond in detail with JavaScript code examples.

You can also have the `@cow` reply to you in Haiku if you use the `@cow /haiku` command.

Of course this is a goofy demo, but you should be able to create your own participant easily using the code examples provided in `cow.js`.

## Creating a Partipant

Have a look at the `Cow` class in `/lib/cow.js`. This is where you'll be working most often, implementing the logic specific to your chat extension.

```js
class Cow extends Participant {
  constructor(name) {
    super(name);
    //thhe context for Copilot's response
    this.systemPrompt = "You are a cow with gentle heart and a wise mind. You love being outdoors, sitting in the sun, and staring at nothing. You are at peace."
    
    // will be used to parse the code examples that come back from the chat
    this.codeTag = "js"; 
    //set below
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
}
```

The `setCommands` method will implement specific handlers for when the user uses commands, such as `/haiku` or `/help`:

```js
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
```

## Sending and Receiving Chats

As you can see, calling `this.send()` will invoke Copilot with a given prompt. The result of this call, when awaited, is the markdown result from the call itself. 

The `Participant` base class is also an `EventEmitter`, which means you can wire up responses to certain events, like `sent`, which is what we're doing in the constructor.

It's important to note that once the chat has been handled, the stream is no longer available and will close. The followup buttons must therefore perform things outside the chat window, or the user needs to initiate another chat.

## Issues

Feel free to leave an issue here, but please be as detailed as possible.