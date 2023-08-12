// REVIEW OF CLASSES, PROPERTIES, METHODS, FUNCTIONS, FOR LOOPS, and MAP

/* 
TASK 1 create a Person class =============================
It should be able to this:

jai = Person("jairus", 12, "banana") 
    creates a new Person type object with the properties:
        jai.age -> reports the age of a person, in this case 12
        jai.name -> reports the name of a person, in this case "jairus"
        jai.favFruit -> reports the favorite fruit of a person, in this case "banana"
topic: constructor functions        
        
You will need to look up how to create a class in Javascript
this isn't React :0 DO NOT USE CHATGPT
*/


class Person {
    constructor (name, age, fruit ) { // order matters 
 
        this.name = name ;  //these are instance properties, not class properties
        this.age = age ;
        this.fruit = fruit ;
}
}


const jai = new Person("jai", 12, "banana");

/*
Person should also be able to do the following things:

Person.slay() prints out a comment that says "name is only age and slays af!"
    e.g: jai.slay() -> "jairus is only 12 and he slays af!"
⭐ topic: using this to access properties

*/

jai.slay = () => {
    console.log(`${jai.name} is only ${jai.age} and he slays af!`);
}



/*

Person.birthday() increases age by one and prints out a comment 
that says "Happy Birthday name, you're now age years old!"
    e.g jai.birthday() -> "Happy Birthday jairus, you're now 13 years old!"
⭐ topic: changing the value of a property

*/ 

jai.birthday = () => {

    
    
}




/*



Person.isOlderThan(otherPerson) takes in a person object and returns True of otherPerson is younger, False otherwise
    e.g oldGuy = Person("goo", 99, "dentures")
        baby = Person("wahh", 1, "wooden blocks")

        jai.isOlderThan(oldGuy) -> False
        jai.isOlderThan(baby) -> True
⭐ topic: comparing two objects, accessing properties

Person.checkAgeParity(parity) takes in a parity of either "even" or "odd"
    If the argument parity is "even", return True if the person's age is even, False otherwise
    If the argument parity is "odd", return True if the person's age is odd, False otherwise
    If no argument or an invalid argument is passed, assume that the parity is "even"

    e.g:
        jai = Person("jairus", 19, "poke")
        jai.checkAgeParity("even") -> returns False
        jai.checkAgeParity("odd") -> returns True
        jai.checkAgeParity() -> returns False, assuming input was "even"
        jai.checkAgeParity("doodoo") -> returns False, assuming input was "even"
⭐ topic: argument validation, optional arguments
        
TASK 2 use the Person class =============================
(1) write the function averageAge(peopleArray) that returns the average age of an array of People
    ⭐ topics: for loop, accessing properties

(2) write the function randomPerson() that returns a person with a randomized
    age, name, and favorite food
    ⭐ topics: randomization, returning objects

(3) Create an array of 10 random People using randomPerson. Get the average age of those 10 people.
    ⭐ topics: for loops, using previously defined functions

(4) Create an array of arrays of 10 random people. Use map to transform that array into 
    the average ages of people in each array.
    ⭐ topics: for loop, map


*/







