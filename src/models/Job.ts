import { Schema, model, Document, Model } from 'mongoose';

/** 
 * Interface for defining Product structure
 */
export interface IJob {
  name: string;
  category: string;
  unit: number;
}

/**
 * IProductDoc extends multiple interfaces: custom one (IProduct) & mongoose provided (Document)
 */
export interface IJobDoc extends IJob, Document { }

/**
 * Defining type for Product Model
 */
export type IJobModel = Model<IJobDoc>

/**
 * Product class
 */
export class Job {

  /**
   * variable to store product model
   */
  private jobModel: Model<IJobDoc>;


  constructor() {
  	/**
     * Creating new schema instance
     */
  	const schema = new Schema({
      title: { type: String, required: true },
      details: { type: String, required: true },
      company: {
            name: { type: String, required: true },
            address: {
                city: { type: String, required: false }
            }
        },
      type: { type: String, required: false },
      tags: [{ type: String, required: true }],
      featured: { type: String, required: true }
  	}, {
  		timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  	});

  	/**
     * Registering schema instance as Product model
     */
  	this.jobModel = model<IJobDoc>('Job', schema);
  }

  /**
   * Function to return the model
   * @returns product model
   */
  public get model(): Model<IJobDoc> {
  	return this.jobModel;
  }
}
