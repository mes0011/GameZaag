class Go extends Command {

 execute(params : string[]) : boolean {

             if(params.length == 0) {
            // if there is no second word, we don't know where to go...
            this.game.out.println("Go where?");
            return;
        }

        let direction = params[0];

        // Try to leave current room.
        let nextRoom = null;
        switch (direction) {
            case "north" : 
                nextRoom = this.game.currentRoom.northExit;
                break;
            case "east" : 
                nextRoom = this.game.currentRoom.eastExit;
                break;
            case "south" : 
                nextRoom = this.game.currentRoom.southExit;
                break;
            case "west" : 
                nextRoom = this.game.currentRoom.westExit;
                break;
        }

        if (nextRoom == null) {
            this.game.out.println("There is no door!");
        }
        else {
            this.game.health--;
            this.game.currentRoom = nextRoom;
            if (this.game.health < 1) {
                return true
            }
            this.game.out.println(this.game.currentRoom.description + ' ' + this.game.currentRoom.detailedDescription);
            this.game.out.print("Exits: ");
            if(this.game.currentRoom.northExit != null) {
                this.game.out.print("north ");
            }
            if(this.game.currentRoom.eastExit != null) {
                this.game.out.print("east ");
            }
            if(this.game.currentRoom.southExit != null) {
                this.game.out.print("south ");
            }
            if(this.game.currentRoom.westExit != null) {
                this.game.out.print("west ");
            }
            this.game.out.println();
        }
        return false;
    }
    
}