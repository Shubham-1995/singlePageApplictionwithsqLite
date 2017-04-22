(function(){
var app= angular.module("gemStore",['dbConnection','queryModule']);  
app.controller('ctrlStore',['queryFactory',function(queryFactoryObj){
	var controllObject = this;
	var currentObject = {};
		showData();
  /* delete element from array */
  controllObject.deleteMethod = function(id){
   // controllObject.userArray.splice(id, 1);
	 //delete controllObject.userArray[id];
	 console.log("delete id : "+id);
	 queryFactoryObj.removeDb(id).then(function(res){
	 console.log("result : "+res);
	 showData();
	 },function(err){
	 console.log("error in deleteMethod : "+err);
	 });
  }
  /* show field empty when click add button and change button*/
  controllObject.emptyField = function(object){
	  if(object != null){
		  controllObject.userID = object.user_Id;
		controllObject.firstname = object.name;
	  controllObject.lastname=object.surname;
	controllObject.updateButton = true;
controllObject.addButton = false;
	  }else{
	  controllObject.firstname = "";
	  controllObject.lastname=""; 
	 controllObject.updateButton = false;
controllObject.addButton = true; 
	  }
  }
 /* push element into array */
   controllObject.addMethod = function(){
     controllObject.userObject = {name:controllObject.firstname,surname:controllObject.lastname};
     queryFactoryObj.populateDb(controllObject.userObject).then(function(res){
        console.log("result populateDb : "+res);
showData();
     },function(error){
        console.log("error in populated : "+error);
     });
	//  controllObject.userArray.push({name:controllObject.firstname,surname:controllObject.lastname});
   }
   /* update element into array */ 
   controllObject.update = function(){
        currentObject.user_Id =  controllObject.userID;
        currentObject.name = controllObject.firstname;
        currentObject.surname = controllObject.lastname;
		queryFactoryObj.modifyDb(currentObject).then(function(res){
        console.log("result : "+res);
        showData();
		},function(err){
            console.log("error in updateDB : "+err);
		});

   }
   
   	function showData(){
		queryFactoryObj.retriveDb().then(
		function(res){
			controllObject.userArray = res;
		},function(err){
				console.log("error in retriveDb : "+err);
		});
	}
}]);
})();

