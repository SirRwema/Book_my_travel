Router.configure({
  notFoundTemplate: 'notFound', //template with name notFound
  loadingTemplate:'loading' //template with name loading
});
Router.onBeforeAction('loading'); //before every action call this show loading template
/**
//Path is /whic is the landing page
Router.route("/",{
  //name is "home"
  name: "home",
  //on route / the layout template will be the template named "homeLayout"
  layoutTemplate:"homeLayout",
  //on route / template named "home" will be rendered
  template:"home",
  //render template travelSearch to search section of the layout template
  yieldRegions:{
    travelSearch: {to: "search"}
  }
});
**/
Router.route("/",{
  name:"home",
  layoutTemplate:"homeLayout",
  template:"home",
  yieldRegions:{
    travelSearch:{to:"search"}
  }
});

Router.route("/create-travel",{
  name:"createTravel",
  layoutTemplate:"createTravelLayout",
  template:"createTravel"
});

Router.route("/book/:_id",{
  name:"book",
  layoutTemplate:"createTravelLayout",
  template:"bookTravel",
  waitOn: function(){
    Meteor.subscribe("BlockedSeats", this.params._id);
    Meteor.subscribe("Reservations", this.params._id);
  },
  data: function(){
    templateData = {
      _id: this.params._id,
      bus: BusServices.findOne({_id: this.params._id}),
      reservations: Reservations.find({bus: this.params._id}).fetch(),
      blockedSeats: BlockedSeats.find({bus: this.params._id}).fetch()
    };
    return templateData;
  }
});