const characters = require('./characters.json');
const shortShowDescription = require('./shortShowDescription.json');
const colors = require('colors');
colors.enable();
const wall = '-';
const terminalImage = require('terminal-image');
const got = require('got');

/*
    parameters: expected an array representing a character
    function: prints a character's description in a pretty format
*/
function prettyPrint(character){
    console.log('\nCharacter name:'.red.bold.underline + ' %s\n\n' +
                'Actor/Actress name:'.red.bold.underline + ' %s\n\n'+
                'Short description:'.red.bold.underline + ' %s\n'+
                '%s'.brightMagenta + '\n\n'
                , character[0], character[1], character[2], wall.repeat(237));
};

/*
    parameters: expected a string with one of these values: "female", "male"
    function: returns an array of charackters with specified gender
*/
function createGenderArray(gender){
    var ans = []
    characters.forEach(character => {
        if (gender.toLowerCase() == character[3].toLowerCase()){
            ans.push(character);
        }
    });
    return ans;
};

/*
    parameters: expected a string value one of these: "female", "male", "all"
    function: print all descriptions about one of the type selected characters
*/
function printCharacters (value){
    if (value.toLowerCase() == "female"){
        femaleCharacters = createGenderArray(value);
        femaleCharacters.forEach(character => prettyPrint(character));
    } 

    else if (value.toLowerCase() == "male"){
        maleCharacters = createGenderArray(value); 
        maleCharacters.forEach(character => prettyPrint(character));  
    }

    else if (value.toLowerCase() == "all"){
        characters.forEach(character => prettyPrint(character));
    }

    else{
        console.log("incorrect value request, please choose one of these: all/female/male");
    } 
};

/*
    parameters: expected a string value one of these: "female", "male", "all"
    function: print a single random description about one of the type selected characters
*/
function printRandomCharacter (value){
    if (value.toLowerCase() == "female"){
        femaleCharacters = createGenderArray(value);
        prettyPrint(femaleCharacters[Math.floor(Math.random()*femaleCharacters.length)]);
    } 

    else if (value.toLowerCase() == "male"){
        maleCharacters = createGenderArray(value); 
        prettyPrint(maleCharacters[Math.floor(Math.random()*maleCharacters.length)]); 
    }

    else if (value.toLowerCase() == "all"){
        prettyPrint(characters[Math.floor(Math.random()*characters.length)]);
    }

    else{
        console.log("incorrect value request, please choose one of these: all/female/male");
    }         
};

/*
    parameters: none
    function: prints a short show description and paint a pixeled image of the show's poster
*/
function printShortShowDescription (){
    console.log('%s'.brightMagenta + '\n'
        + shortShowDescription[0] +
        '\n' +'%s'.brightMagenta, wall.repeat(237),wall.repeat(237));
    
    (async () => {
        const body = await got('https://www.sbs.com.au/guide/sites/sbs.com.au.guide/files/styles/full/public/new_girl_header.jpg?itok=zGH24lbz').buffer();
        console.log(await terminalImage.buffer(body));
        })();
};


module.exports = {
    showDescription: printShortShowDescription,
    randomCharacter: printRandomCharacter,
    showCharacters: printCharacters
}

