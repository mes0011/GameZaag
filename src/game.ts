/**
 * This class is part of the "Zorld of Wuul" application. 
 * "Zorld of Wuul" is a very simple, text based adventure game.  
 * 
 * Users can walk around some scenery. That's all. It should really be 
 * extended to make it more interesting!
 * 
 * To play this game, create an instance of this class and call the "play"
 * method.
 * 
 * This main class creates and initialises all the others: it creates all
 * rooms, creates the parser and starts the game.  It also evaluates and
 * executes the commands that the parser returns.
 * 
 * @author  Michael Kölling, David J. Barnes, Bugslayer and Niek Mes
 * @version 2017.03.30
 */

class Game {
    parser : Parser;
    out : Printer;

    currentRoom : Room;

    isOn : boolean;
    public health : number = 20; 

    private rooms : Array <Room> = [];
    private description : Array <string> = [
        "You are in a tiled room with a small puddle of blood on the ground, could it be your own? You see a lot of bloody handprints on the walls, you feel chills running down your spine." ,
        "You are in a dark small room, in the middle of the room are your glasses. You see a note lying in the corner of the room, it reads: ‘Help’ written in blood.",
        "you feel like something happend to you, was I just teleported?",
        "You are in a small hallway. You wonder how big this basement is.",
        "You hear a beeping sound. You see a faint light coming from the southern door.",
        "the door I just came through now suddenly looks different. it looks like a teleporter",
        "You see a small hallway with pictures of a little girl with dark hair. Are her eyes following me? You see a small puddle of blood near the southern door",
        "You see a dead body lying on the floor. The dead body looks a lot like one of your friends you were with. There seems to be a keycard in the palm of the dead body’s hand.",
        "this seems to be an electricity room, I can see wires running all over the walls. I can also see a power switch. Should I flip the switch?",
        "You are in a small hallway, the light keeps flickering. You can see electricity wires running down the walls and going into the room to the north.",
        "the first thing you notice when you open the door to this room is the horrific smell. What on earth could that be. You see three gutted pigs. Disgusting!",
        "this looks like a dead end there seems to be a door that can be unlocked with a keycard, it doesn’t seem to be working.",
        "You can see light coming from the door to the east. Could this mean freedom?",
        "You can see a unlocked gate with a broken lock.",
        "You can see light coming from the door to the east. Could this mean freedom?",
        "this looks like a dead end. Will I ever find the exit?! In the corner of the room you see a sign with 'F*CK YOU' written on it.",
        "Congratulations! You win! Press f5 to play again."
    ];

    private exits = [
        [null, 3, null, null],
        [null, 4, null, null],
        [null, null, 3, null],
        [2, 6, 4, 0],
        [3, 7, 5, 1],
        [2, 2, 2, 2],
        [null, 9, 7, 3],
        [6, null, null, 4],
        [null, null, 9, null],
        [null, 13, 11, 9],
        [10, null, 12, null],
        [11, 14,null, null],
        [null, null, null, 10],
        [null, 15,null, 14],
        [null, null, null, null]
            
    
    ];
    /**
     * Create the game and initialise its internal map.
     */
    constructor(output: HTMLElement, input: HTMLInputElement) {
        this.parser = new Parser(this, input);
        this.out = new Printer(output); 
        this.isOn = true;
        this.createRooms();
        this.printWelcome();
    }

    /**
     * Create all the rooms and link their exits together.
     */

   createRooms() : void {
        // create the rooms
        for (let i=0; i<51; i++){
            this.rooms.push(new Room(this.description[i])); 
        }  
        

        // initialise room exits
        for(let i=0; i<17; i++){
            this.rooms[i].setExits(
                this.rooms[this.exits[i][0]],
                this.rooms[this.exits[i][1]],
                this.rooms[this.exits[i][2]],
                this.rooms[this.exits[i][3]],
            );
        }
   
        // spawn player in the spawn
        this.currentRoom = this.rooms[0];
    }

    /**
     * Print out the opening message for the player.
     */
    printWelcome() : void {
        this.out.println();
        this.out.println("You wake up, the last thing you remember is that you were partying with your friends.");
        this.out.println("You suddenly wake up in what feels like a basement.");
        this.out.println("You feel a burning pain in your lower abdomen, you see a big cut in your lower abdomen");
        this.out.println("You’re bleeding and need to hurry.");
        this.out.println("When you stand up you notice you don’t have your glasses anymore and you can barely see anything.");
        this.out.println();
        this.out.println("Type 'checkhealth' to see how much HP you have left.");
        this.out.println("Type 'help' if you need help.");
        this.out.println();
        this.out.println(this.currentRoom.description);
        this.out.println();
        this.out.print("Exits: ");
        if(this.currentRoom.northExit != null) {
            this.out.print("north ");
        }
        if(this.currentRoom.eastExit != null) {
            this.out.print("east ");
        }
        if(this.currentRoom.southExit != null) {
            this.out.print("south ");
        }
        if(this.currentRoom.westExit != null) {
            this.out.print("west ");
        }
        this.out.println();
        this.out.print(">");
    }

    gameOver() : void {
        this.isOn = false;
        this.out.println("Game over!");
        this.out.println("Thank you for playing.  Good bye.");
        this.out.println("Hit F5 to restart the game");
    }

    /** 
     * Try to go in one direction. If there is an exit, enter
     * the new room, otherwise print an error message.
     * 
     * @param params array containing all parameters
     * @return true, if this command quits the game, false otherwise.
     */
    goRoom(params : string[]) : boolean {
        if(params.length == 0) {
            // if there is no second word, we don't know where to go...
            this.out.println("Go where?");
            return;
        }

        let direction = params[0];

        // Try to leave current room.
        let nextRoom = null;
        switch (direction) {
            case "north" : 
                nextRoom = this.currentRoom.northExit;
                break;
            case "east" : 
                nextRoom = this.currentRoom.eastExit;
                break;
            case "south" : 
                nextRoom = this.currentRoom.southExit;
                break;
            case "west" : 
                nextRoom = this.currentRoom.westExit;
                break;
        }

        if (nextRoom == null) {
            this.out.println("There is no door!");
        }
        else {
            this.currentRoom = nextRoom;
            this.out.println(this.currentRoom.description);
            this.out.print("Exits: ");
            if(this.currentRoom.northExit != null) {
                this.out.print("north ");
            }
            if(this.currentRoom.eastExit != null) {
                this.out.print("east ");
            }
            if(this.currentRoom.southExit != null) {
                this.out.print("south ");
            }
            if(this.currentRoom.westExit != null) {
                this.out.print("west ");
            }
            this.out.println();
        }
        return false;
    }
}