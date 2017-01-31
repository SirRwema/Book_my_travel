Meteor.methods({
    createBusService:function(busService){
        if(!busService.name){
            throw new Meteor.Error("Name cannot be empty");
        }
        if(!busService.agency){
            throw new Meteor.Error("Agency cannot be empty");
        }
        if(!busService.seats){
            throw new Meteor.Error("Seats cannot be empty");
        }
        busService.createdAt = new Date();
        busService.updatedAt = null;
        busService.available_seats = parseInt(busService.seats, 10);
        BusServices.insert(busService);
    }
});

Meteor.publish("BusServices", function(){
    return BusServices.find({}, {sort:{createdAt: -1}});
});