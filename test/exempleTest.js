import sinon from 'sinon'
import chai from 'chai'
import mongoose from 'mongoose'
import sinonMongoose from 'sinon-mongoose'
//Importing our todo model for our unit testing.
import Tasks from '../src/models/exampleModel'

const expect = chai.expect;

describe("Get all tasks", () => {
  // Test will pass if we get all tasks
  it("should return all tasks", done => {
    const tasksMock = sinon.mock(Tasks)
    const expectedResult = { status: true, tasks: [] }

    tasksMock.expects('find').yields(null, expectedResult)
    Tasks.find((err, result) => {
      console.log('result', result)
      tasksMock.verify();
      tasksMock.restore();
      expect(result.status).to.be.true;
      done();
    })
  })
})