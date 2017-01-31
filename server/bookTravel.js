Meteor.methods({
    blockThisSeat: function(seat){
        var insertedDocId;
        seat.createdAt = new Date();
        seat.updatedAt = null;
        BlockedSeats.insert(seat, function(error, result){
            if(error){
                throw Meteor.Error("Block seat failed");
            }else{
                insertedDocId = result;
            }
        });
        Meteor.setTimeout(function(){
            BlockedSeats.remove({_id: insetedDocId});
        }, 600000);//10mins
    },
    unblockTheseSeats:function(seats){
        seats.forEach(function (seat){
            BlockedSeats.remove({_id: seat._id});
        });
    }
});

Meteor.publish("BlockedSeats", function(id){
    return BlockedSeats.find({bus: id});
});