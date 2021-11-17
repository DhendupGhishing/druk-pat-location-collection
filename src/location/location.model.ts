import * as mongoose from 'mongoose';
//blueprint|defining schema for pick and drop location
export const LocationSchema= new mongoose.Schema({
    pickpoint:{type:String,required:true},
    droppoint:{type:String, required:true}

});

export interface Location extends mongoose.Document{
    id:string;
    pickpoint:string;
    droppoint:string

}