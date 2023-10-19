class Message {
   constructor(name, commands){
   this.name = name;
   if (!name){
      throw SyntaxError("Must have name as first parameter please");
   }
   this.commands = commands;

   }
}

module.exports = Message;