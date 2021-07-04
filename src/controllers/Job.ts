import { Request, Response } from 'express';
import { JobDao } from '../daos';

/**
 * Instantiating job DAO object
 */
const jobDao = new JobDao();

module.exports = {
  
	/**
	 * Get all controller
   * @async
	 */
	get: async (req: Request, res: Response, next: any) => {
		try {
			const jobs = await jobDao.read();
			return res.status(200).send(jobs);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Get one by _id controller
   * @async
	 */
	getById: async (req: Request, res: Response, next: any) => {
		try {
			const { _id } = req.params;
			const job = await jobDao.getOne(_id);
			if (!job) {
				res.status(404).send(`Job with id: ${_id} not found!`);
			} else {
				return res.status(200).send(job);
			}
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Create new controller
   * @async
	 */
	create: async (req: Request, res: Response, next: any) => {
		try {
			const data = await jobDao.add(req.body);
			return res.status(201).json(data);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Update one by _id controller
   * @async
	 */
	updateById: async (req: Request, res: Response, next: any) => {
		try {
			const { _id } = req.params;
			const data = await jobDao.update(_id, req.body);
			return res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	},

	/**
	 * Delete one by _id controller
   * @async
	 */
	deleteById: async (req: Request, res: Response, next: any) => {
		try {
			const { _id } = req.params;
			await jobDao.delete(_id);
			return res.status(200).end();
		} catch (error) {
			next(error);
		}
	}
};
