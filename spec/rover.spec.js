const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');
describe('Rover class', function() {
  //test 8
  it('constructor sets position and default values for mode and generatorWatts', function() {
    let testCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let testRover = new Rover(98382);
    expect (testRover.position).toBe(98382);
    expect((new Rover(1)).mode).toBe('NORMAL');
    expect(testRover.generatorWatts).toBe(110);
  });
  //test 9
  it('response returned by receiveMessage contains the name of the message', function() {
    let testRover = new Rover(98382);
    let testCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let testMessage = new Message('Test message', testCommands);
   expect(testRover.receiveMessage(testMessage).message).toBe('Test message');
});
  //test 10
  it('response returned by receiveMessage includes two results if two commands are sent in the message', function() {
    let testRover = new Rover(98382);
    let testCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let testMessage = new Message('Test message', testCommands);
    let response =  testRover.receiveMessage(testMessage);
    expect(response.results.length).toBe(2);
  });
  //test 11
  it('responds correctly to the status check command', function() {
    let testRover = new Rover(98382);
    let testCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let testMessage = new Message('Test message', testCommands);
    let response =  testRover.receiveMessage(testMessage);
    expect((response.results)[1].completed).toBe(true);
    expect((response.results)[1].roverStatus.mode).toBe('LOW_POWER');
    expect((response.results)[1].roverStatus.generatorWatts).toBe(110);
    expect((response.results)[1].roverStatus.position).toBe(98382);
  });
  //test 12
  it('responds correctly to the mode change command', function() {
  let testCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let normalModeCommand = [new Command('MODE_CHANGE', 'NORMAL')];
  let normalMode = new Message('Mode change test', normalModeCommand);
  let testMessage = new Message('Test message', testCommands);
  let testRover = new Rover(98382);
  let response =  testRover.receiveMessage(testMessage);
    expect((response.results)[0].completed).toBe(true);
    expect(new Rover(0).mode).toBe('NORMAL');
    expect(testRover.mode).toBe('LOW_POWER');
    testRover.receiveMessage(normalMode);
    expect(testRover.mode).toBe('NORMAL');
  });
  //test 13
  it('responds with a false completed value when attempting to move in LOW_POWER mode', function() {
  let testCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let moveCommand = [new Command('MOVE', 98322)];
  let moveMessage = new Message('Move command test', moveCommand);
  let testMessage = new Message('Test message', testCommands);
  let testRover = new Rover(98382);
  let response =  testRover.receiveMessage(testMessage);
    expect((testRover.receiveMessage(moveMessage).results)[0].completed).toBe(false);
  });
  //test 14
  it('responds with the position for the move command', function() {
  let testCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let normalModeCommand = [new Command('MODE_CHANGE', 'NORMAL')];
  let normalMode = new Message('Mode change test', normalModeCommand);
  let moveCommand = [new Command('MOVE', 98322)];
  let moveMessage = new Message('Move command test', moveCommand);
  let testMessage = new Message('Test message', testCommands);
  let testRover = new Rover(98382);
  let response =  testRover.receiveMessage(testMessage);
    testRover.receiveMessage(normalMode);
    expect((testRover.receiveMessage(moveMessage).results)[0].completed).toBe(true);
    testRover.receiveMessage(moveMessage);
    expect(testRover.position).toBe(98322);
  });

});