Welcome to the extension starter app! Have fun and play around - you can use most of the code here to build your own extension.

## Rename the Cow

The `Cow` class is there for learning purposes, to show you how your implementation of `Participant` might work. When you're ready, rename the file and the class, making sure to update the references where needed.

## Reset the Commands

A command is a prepackaged prompt that can focus a user's attention on a given topic. You can also use commands to change settings using an `inputCommand` or a `selectionCommand`, or you can show a markdown document located in `/docs`.

A command is simply a handler function that is called when a given command is called. Just implement the callback as you need, and you're good to go.

## Get to know the helper classes

There are a few helper modules here to, well, help you out. The `Editor` module will show files and read values from a .env file. This is useful if your participant needs to output something to file and read from the environment.

The `Command` class implements the logic described in the previous paragraph.

The `Participant` class is your main base class, which calls out to Copilot and handles the responses, parsing code blocks and handling the chat requests.

## Change this help document

When you're ready to go, make this page your landing page for the chat. Your users will want to know how to interact with your participant, so tell them here.