var expect = require ('expect');
const {Users} = require ('./users');


describe('Users', ()=>{
  var testUsers;

  beforeEach(()=>{
    testUsers = new Users();
    testUsers.users = [{
      id: '87980980', name: 'Mark', room: 'Mordor'
    }, {
      id: '87980985', name: 'Deb', room: 'Mordor'
    }, {
      id: '87980999', name: 'Jess', room: 'Dogging'
    } 
    ]
  });  
  
  it('Should add a new user', ()=>{
    var res = testUsers.addUser(testUsers.users[0].id, testUsers.users[0].name, testUsers.users[0].room);
    expect(res).toEqual(testUsers.users[0]);
    
  });
  
  it('Should remove a specified user', ()=>{
    var userToRemove = testUsers.users[0]
    var res = testUsers.removeUser(userToRemove.id);
    expect(res).toEqual(userToRemove);
    expect(testUsers.users.length).toBe(2);
  });
  
  it('Should not remove a spurious user id', ()=>{
    var falseIDToRemove = '78799'
    var res = testUsers.removeUser(falseIDToRemove);
    expect(res).toNotExist;
    expect(testUsers.users.length).toBe(3);
  });
  
  it('Should find a specified user', ()=>{
    var userID = '87980999';
    var res = testUsers.getUser(userID);
    expect(res).toEqual(testUsers.users[2]);
    expect(testUsers.users.length).toBe(3);
  });
  
  it('Should not find a spurious user id', ()=>{
    var userID = '879';
    var res = testUsers.getUser(userID);
    expect(res).toNotExist;
    expect(testUsers.users.length).toBe(3);
  });
  
  it('Should return a list of users in Mordor', ()=>{
    var res = testUsers.getUserList('Mordor')
    expect(res).toEqual(['Mark','Deb']);
    
  });
  
   it('Should return a list of users in Dogging', ()=>{
    var res = testUsers.getUserList('Dogging')
    expect(res).toEqual(['Jess']);
    
  });
});