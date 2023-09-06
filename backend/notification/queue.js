import queueSchema from '../model/queueModel.js';
import mongoose from 'mongoose';
class Queue {
  constructor(databaseUrl) {
    this.databaseUrl = databaseUrl;
    this.connection = null;
    this.queue = null;
  }
  async connect() {
    try {
      this.connection = await mongoose.connect(this.databaseUrl);
      this.queue = this.connection.model('queue', queueSchema);
      console.log('connected to database');
    } catch (err) {
      console.log('Error connecting to database', err?.message);
    }
  }
  async disconnect() {
    try {
      await mongoose.connection
        .close()
        .then(() => console.log('disconnected from database'));
    } catch (err) {
      console.log('Error connecting from database', err?.message);
    }
  }
  async enqueue(element) {
    try {
      await this.connect(this.databaseUrl);
      const item = new this.queue(element);
      await item.save();
      return 'enqueue success';
    } catch (err) {
      console.log('Error enqueueing', err?.message);
      return 'enqueue fail';
    }
  }
  async dequeue() {
    try {
      await this.connect(this.databaseUrl);
      const data = await this.queue.aggregate([
        {
          $sort: {
            createdAt: 1,
          },
        },
        {
          $limit: 1,
        },
      ]);
      await this.queue.findOneAndDelete(data._id);
      return data;
    } catch (err) {
      console.log('Error in dequeueing', err?.message);
    }
  }
  async peek() {
    try {
      await this.connect(this.databaseUrl);
      const count = await this.queue.countDocuments();

      return count;
    } catch (err) {
      console.log(err?.message);
      return 'Error counting Queue';
    }
  }
  async printQueue() {
    try {
      await this.connect(this.databaseUrl);
      const queueData = await this.queue.find();
      console.log(queueData);
      return queueData;
    } catch (err) {
      return 'Error printing queue';
    }
  }
  isEmpty() {
    let ct = this.peek();
    return ct === 0;
  }
}
export default Queue;
