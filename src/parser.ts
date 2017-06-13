class Parser {
    input: HTMLInputElement;
    game: Game;

    commands : { [key : string]: Command } = {};
    default : Default;

    constructor(game: Game, input: HTMLInputElement) {
        this.game = game;
        this.input = input;
        this.default = new Default(game);

        this.commands["help"] = new Help(game);
        this.commands["go"] = new Go(game);
        this.commands["checkhealth"] = new Checkhealth(game);
        this.commands["quit"] = new Quit(game);
        

        input.onkeyup = (e) => { // event handler function
            if (e.keyCode == 13 && this.game.isOn) {
                // Invoke parse method wehen user pressed enter
                let command = this.input.value;
                this.game.out.println(command);
        
                this.parse(command.split(" "));
                this.input.value = ""; // clears the input element 
                this.game.out.print(">");
            }
        }
    }

 
    parse(words: string[]): void {
        let wantToQuit = false;
        let params = words.slice(1);
       if (words[0] == "")
       {
           return;
       }
       let command : Command;
       command = this.commands[words[0]];
       if ( command == null) 
       {
           command = this.default;
       }
       wantToQuit = command.execute(params);

        if (wantToQuit) {
            this.input.disabled = true;
            this.game.gameOver();
        }
    }

}