class Users {
  constructor (id, name, room) {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    //Returns user that was removed
    var user = this.users.filter((user)=> user.id === id);
    
    if(user) {
        var newArray = this.users.filter((user)=> user.id !== id);
        this.users = newArray;    
    }
    return  user;
  }
  getUser(id) {
    var user = this.users.filter((user)=> user.id === id);
    return  user;
  }
  
  getUserList (room) {
    var users = this.users.filter((user)=> user.room === room);
    var namesArray = users.map((user)=>user.name);
    return namesArray;
  }
}

module.exports = {Users};