import { IJob } from '../../models/index';
import { DB } from '../index';


/** 
 * Interface for defining methods to be implemented
 */
export interface IJobDao {
	read: () => Promise<IJob[]>;
	getOne: (_id: string) => Promise<IJob | null>;
	add: (Job: IJob) => Promise<IJob>;
	update: (_id: string, Job: IJob) => Promise<IJob>;
	delete: (_id: string) => Promise<void>;
}

/**
 * Class for Job DAO, contains every methods possible on Job collection
 * {@linkcode IJobDao}
 */
export class JobDao implements IJobDao {


	/**
   * Get one by_id
	 * @param id
   * @async
   * @returns Promise<IJob | null>
	 */
	public async getOne(_id: string): Promise<IJob | null> {
		try {
			const data = await DB.Models.Job.find({ _id }).exec();
			if (data) {
				return data[0];
			}
			throw new Error('Job not found!');
		} catch (err) {
			throw err;
		}
	}


	/**
	 * Get all
   * @async
   * @returns Promise<IJob[]>
	 */
	public async read(): Promise<IJob[]> {
		try {
			const data = await DB.Models.Job.find({}).exec();
			return data;
		} catch (err) {
			throw err;
		}
	}


	/**
	 * Create new
   * @async
	 * @param Job
   * @returns Promise<IJob>
	 */
	public async add(Job: IJob): Promise<IJob> {
		try {
			const newJob = await new DB.Models.Job(Job).save();
			return newJob;
		} catch (err) {
			throw err;
		}
	}


	/**
	 * Update one
   * @async
	 * @param _id
	 * @param Job
   * @returns Promise<IJob>
	 */
	public async update(_id: string, job: IJob): Promise<IJob> {
		try {
			await DB.Models.Job.findOneAndUpdate({ _id }, job).exec();
			return job;
		} catch (err) {
			throw err;
		}
	}


	/**
	 * Delete one
   * @async
	 * @param _id
   * @returns Promise<void>
	 */
	public async delete(_id: string): Promise<void> {
		try {
			await DB.Models.Job.findByIdAndDelete({ _id }).exec();
		} catch (err) {
			throw err;
		}
	}
}
