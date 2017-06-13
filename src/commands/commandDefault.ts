class Default extends Command {

 execute(params : string[]) : boolean {
        this.game.out.println("I don't know what you mean...");
        this.game.out.println();
        this.game.out.println("Your command words are:");
        this.game.out.println("go quit help checkhealth pickup use");
        return false;
    }
}