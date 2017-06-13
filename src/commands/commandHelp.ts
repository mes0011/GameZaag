class Help extends Command {
    
   execute(params : string[]) : boolean {
        if(params.length > 0) {
            this.game.out.println("Help what?");
            return false;
        }
        this.game.out.println("You don't have much time left, hurry!");
        this.game.out.println("find the exit");
        this.game.out.println();
        this.game.out.println("Your command words are:");
        this.game.out.println("go quit help checkhealth pickup use");
        return false;
    }
}