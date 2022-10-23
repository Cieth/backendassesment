/*
-------------------------------------------------
    This test will work once, then u will need 
    to change the user information, the list id's 
-------------------------------------------------
°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
    The test will create a user and login, then it will
    create a List, show the lists, and delete a list,
    it also will create a todo into a list with the given id
°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
If the test fails: 
  -there is commented code in order to give further orientation
  -There is also commented console.logs in case you need to find id's 
   or the token to uptdate it in the variable 
Could be: 
-Change the information of the user in the object
-change the id of the list to delete 
-Place another token

    */
const req = require('supertest');
const { connect, disconnected } = require('./database');
const app = require('./server');

describe('App', () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnected();
  });

  const commonHeaders = {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGRjOWIzYTIzNTgyYzNhYmYyNTc0OSIsImlhdCI6MTY2NjU0NDAxMCwiZXhwIjoxNjY2NjMwNDEwfQ.w13eCzlob1AFuQmju9w4wJlnIncQtefKr7UtjFx5pxU',
    'X-Testing-Value': 1,
    'X-Common-Header': 'value',
  };
  //Need to change this info every test or you'll get an 400 bc it's already created->
  let userCreate = { email: 'test199764@gmail.com', password: 'testestest' };

  it('Should create a user with success code', async () => {
    const res = await req(app)
      .post('/auth/local/signup')
      .send(userCreate)
      .set(commonHeaders);
    expect(res.statusCode).toBe(201);

    //console.log(JSON.parse(res.text));
  });

  it('Should login a user with success code', async () => {
    const res = await req(app)
      .post('/auth/local/login')
      .send(userCreate)
      .set(commonHeaders);
    expect(res.statusCode).toBe(200);
  });

  let payload = { name: 'Tests' };
  it('Should create a list with success code', async () => {
    const res = await req(app)
      .post('/api/favs/')
      .send(payload)
      .set(commonHeaders);
    expect(res.statusCode).toBe(201);
    //console.log(JSON.parse(res.text));
  });

  it('Should get all the lists with success code', async () => {
    const res = await req(app).get('/api/favs/').set(commonHeaders);
    expect(res.statusCode).toBe(200);
    //console.log(JSON.parse(res.text));
  });
  const list2Search = '6352e773c452e680c8126734'; // place the id of the list
  it('Should get a list with success code', async () => {
    const res = await req(app)
      .get(`/api/favs/${list2Search}`)
      .set(commonHeaders);
    expect(res.statusCode).toBe(200);
    //console.log(JSON.parse(res.text));
  });

  let todoBody = {
    title: 'test',
    description: 'testestes',
  };
  it('Should create a todo into a list with success code', async () => {
    const res = await req(app)
      .post(`/api/todo/${list2Search}`) //im using the same list of above
      .send(todoBody)
      .set(commonHeaders);
    expect(res.statusCode).toBe(201);
    //console.log(JSON.parse(res.text));
  });
  //place the id of the list to delete -> need to change if u do another test
  const list2delete = '6352f417ec73ca4ca1cde76d';
  it('Should delete a list with success code', async () => {
    const res = await req(app)
      .delete(`/api/favs/${list2delete}`)
      .set(commonHeaders);
    expect(res.statusCode).toBe(200);
    //console.log(JSON.parse(res.text));
  });
});
