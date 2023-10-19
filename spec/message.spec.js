const Message = require('../message.js');
const Command = require('../command.js');


// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.
describe("Message class", function() {
    let commands = [new Command('Low_Power', 'Mode_Change'), new Command('Status_Check')];
    let message = new Message('Test message with two commands', commands);

    //test 4
    it("Will throw an error if name is not the first thing provided inside the constructor", function() {
        expect( function() { new Message();}).toThrow(new Error('Must have name as first parameter please'));
      });

    //test 5
    it("constructor sets name as first parameter", function() {
        expect(message.name).toBe('Test message with two commands');
    });  

    //test 6
    it("makes sure second parameter is an array of commands", function() {
        expect(message.commands).toBeInstanceOf(Array);
    });  

});
