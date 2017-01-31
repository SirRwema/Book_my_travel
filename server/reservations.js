Meteor.methods({
    /**
     seatsBooked:[{seat: #}]
     bus
     createdAt
     updateAt 
     **/
    bookMySeats:function(reservation){
        var insertRes = reservation.map(function(res){
            return{
                seat: res.seat
            }
        });
        return Reservations.insert({
            bus:reservations[0].bus,
            seatsBooked: insertRes,
            createdAt: new Date(),
            updateAt: null
        },function(error, result){
            console.log("Inside res insert", arguments);
            if(result){
                BusServices.update({_id:reservations[0].bus},{
                    $set:{
                        updatedAt: new Date()
                    },
                    $inc:{
                        available_seats: -insertRes.length
                    }
                },function(){});
            }
        });
    }
});

Meteor.publish("Reservations", function(id){
    return Reservations.find({bus: id},{sort:{createdAt: -1}});
});