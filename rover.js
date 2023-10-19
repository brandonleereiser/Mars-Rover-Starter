const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor (position, generatorWatts = 110, mode = 'NORMAL'){
      position : this.position = position;
      mode : this.mode = mode;
      generatorWatts :this.generatorWatts = generatorWatts;
         
   }
   receiveMessage(testMessage) {
      let results = [];
      //  console.log(testMessage.commands, "brandon 1")
      // for (let i = 0 ; i < testMessage.commands.length ; i++) {
      //    console.log(testMessage.commands[i], "brandon 2")
      //    if (testMessage.commands[i] && testMessage.commands[i].commandType && testMessage.commands[i].commandType == 'MODE_CHANGE') {
      //       roverStatus.results.push({Success : True});
      //       this.position = testMessage.commands[i].value;
      //    }
      //    if (testMessage.commands[i] && testMessage.commands[i].commandType && testMessage.commands[i].commandType == 'LOW_POWER') {
      //       roverStatus.results.push({Failure : false})
      //    }
      // }
   //    for (let i = 0; i < testMessage.commands.length; i++) {
   //       // console.log(testMessage.commands[i].commandType)
   //       if (testMessage.commands[i].commandType === "MOVE") {
   //         if(this.mode === "NORMAL") {
   //           results.push({completed: true});
   //           this.position = testMessage.commands[i].value         
   //         }
   //         if(this.mode === "LOW_POWER") {
   //          results.push({completed: false});
   //        }
   //       } else if(testMessage.commands[i].commandType === "STATUS_CHECK") {
   //         results.push({roverStatus});
   //       } else if(testMessage.commands[i].commandType === "MODE_CHANGE") {
   //         results.push({completed: true});
   //         this.mode = testMessage.commands[i]
   //       }
   //     }
   // // console.log(results, "Brandon 4")
   //    return {message, results}
   //  }
   for (let i = 0; i < testMessage.commands.length; i++){
         if ((testMessage.commands)[i].commandType === 'STATUS_CHECK'){
            results[i] = ({
               completed: true,
               roverStatus: { mode: this.mode, generatorWatts: this.generatorWatts, position: this.position }
            })
         }
         if ((testMessage.commands)[i].commandType === 'MODE_CHANGE'){
            if ((testMessage.commands)[i].value === 'LOW_POWER' || (testMessage.commands)[i].value === 'NORMAL'){
               this.mode = (testMessage.commands)[i].value;
            }
            results[i] = ({completed: true})
         }
         if ((testMessage.commands)[i].commandType === 'MOVE'){
            if (this.mode === 'LOW_POWER'){
               results[i] = ({completed: false})
            } else {
               this.position = (testMessage.commands)[i].value;
               results[i] = ({completed: true})
            }
         }
      }
      return {message: testMessage.name, results} 
      }
      }
       module.exports = Rover;