import * as mongoose from 'mongoose';

export enum TaskStatus {
    OPEN ='OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE ='DONE'
}
export const TaskSchema = new mongoose.Schema ({
    title:{
        type :String,
        required:true
    },
    description : {
        type: String,
        required: true
    },
    status : {
        type : String,
        enum: TaskStatus,
        default: 'OPEN'
        
    }
});

// export interface INotes extends mongoose.Document {
//     title: string;
//     description: string;
//     user_id : string
//   }
export interface ITask extends mongoose.Document {
    title: string,
    description : string,
    status: TaskStatus

}

