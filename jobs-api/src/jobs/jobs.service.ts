import { Injectable } from '@nestjs/common';
import { Job } from './interfaces/job.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JobsService {
  constructor(@InjectModel('Job') private readonly jobModel: Model<Job>) {}

  async find(id: string): Promise<Job> {
    return await this.jobModel.findOne({ _id: id });
  }

  async create(job: Job): Promise<Job> {
    const newJob = new this.jobModel(job);
    return await newJob.save();
  }

  async update(id: string, job: Job): Promise<Job> {
    return await this.jobModel.findByIdAndUpdate(id, job, { new: true });
  }

  async delete(id: string): Promise<Job> {
    return await this.jobModel.findByIdAndDelete(id);
  }
}
