class Command {

    protected game: Game;

    constructor(game : Game){
        this.game = game;
    }

    public execute(params : string[]) : boolean {
        return false;
    }
}