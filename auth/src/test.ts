import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from './app';

let mongo: any;

async function main() {
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri);

    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.insertOne({ hello: "world!!!!!" });
        console.log(await collection.find({}));
        await collection.deleteMany({});
    }

    if (mongo) {
        console.log('stopping the instance');
        await mongo.stop();
    }

    await mongoose.connection.close();
}

main();
