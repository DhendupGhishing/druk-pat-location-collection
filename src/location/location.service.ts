import { Injectable,NotFoundException } from "@nestjs/common";
import { Location } from "./location.model";
import { InjectModel } from "@nestjs/mongoose";
import{ Model} from 'mongoose';


@Injectable()
export class LocationService{
    locations:Location[]=[];
    constructor(@InjectModel('LocationM') private readonly locationModel:Model<Location>){}//readonly(Not allow ovwewrite)
   

   async insertLocation(pickpoint:string,droppoint:string){
       
        const newLocation=new  this.locationModel (
            {pickpoint:pickpoint,
            droppoint:droppoint});
        const data = await newLocation.save();
        console.log(data);//delete
        return data.id;
    
    }
    async getLocationCollection(){
        const data = await this.locationModel.find().exec();//for exact promise
        return  data as Location[];
    }
     
    async getIndividualLocationCollection(locationId: string){
        const locationIndividual=await this.findLocationId(locationId);
        return {id:locationIndividual.id,pickpoint:locationIndividual.pickpoint,droppoint:locationIndividual.droppoint};
    }
   private async findLocationId(id:string): Promise< Location > {
    let location;
    try{
        location=await this.locationModel.findById(id).exec();

    }catch(error){
        throw new NotFoundException('Id not found');
    }
   
    if(!location){
        throw new NotFoundException('Id not found');
    } 
    return location;

    }

   async updateLocation(locationId:string, pickpoint:string, droppoint:string){
        const updatedLocation= await this.findLocationId(locationId);
    
        if(pickpoint){
            updatedLocation.pickpoint=pickpoint;
            
        }
        if(droppoint){
            updatedLocation.droppoint=droppoint;
        }
        updatedLocation.save();
        
    }
   async deletelocation(locId:string){
        const deletedata= await this.locationModel.deleteOne({_id:locId});
        console.log(deletedata);
        if(deletedata.deletedCount === 0){
          throw new NotFoundException("location not found with this id: "+deletedata);
      

    }
   }
}