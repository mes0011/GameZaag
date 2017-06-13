class Quit extends Command{
        
        excute(params : string[]) : boolean {
        if(params.length > 0) {
            this.game.out.println("Quit what?");
            return false;
        }
        else {
            return true;  // signal that we want to quit
        }
    }
}