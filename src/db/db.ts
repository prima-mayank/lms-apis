import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

MongooseModule.forRoot(
  process.env.MONGO_URI as string,
  {
    autoIndex: true,
  },
);

export class DatabaseModule {}
