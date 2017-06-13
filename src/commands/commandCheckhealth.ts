class Checkhealth extends Command {
   
   execute(params : string[]) : boolean {
        if(params.length > 0) {
            this.game.out.println("healthcheck what?");
            return false;
        }
        this.game.out.println("you currently have" + " " + this.game.health + " " + "healthpoints");
        return false;
    }
}