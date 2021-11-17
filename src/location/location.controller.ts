import { Controller,Post,Body,Get,Param,Patch ,Delete} from "@nestjs/common";
import { LocationService } from "./location.service";

@Controller('location')
export class LocationController{
    constructor(private locationService: LocationService){}// injecting service for loction
   
    @Post()
    async  addLocation(
        @Body('pickpoint')source:string,
        @Body('droppoint')destination:string){
       const generartedId = await this.locationService.insertLocation(
           source,
           destination);
           return "The infromation has been recorded in id: "+generartedId;
    }
    @Get()
    async getAllLocationList(){
        const result= await this.locationService.getLocationCollection();
        return result.map((loc)=> ({id:loc.id, pickpoint:loc.pickpoint, droppoint:loc.droppoint}));
    
    }
    @Get(':id')
    getSingleLocationList(@Param('id')locid:string,){
        return this.locationService.getIndividualLocationCollection(locid);
    }
    @Patch(':id')
    async updateLocationList(@Param('id')locId:string,
         @Body('pickpoint')source:string,
         @Body('droppoint')destination:string)
         {
         await this.locationService.updateLocation(locId,source,destination);
         return "successfully updated for id : " +locId
         }
    
    @Delete(':id')
    async removeLocation(@Param('id')locId: string,){
       await this.locationService.deletelocation(locId);
        return 'successfully deleted'
        
      }

}