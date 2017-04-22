(function(){
var queryApp = angular.module('queryModule',[]);
queryApp.factory('queryFactory',['dbConService','$q',function(dbConSerObj,$q){
	var factoryObj ={
		retriveDb:selectDb,
		populateDb:insertDb,
	    modifyDb:updateDb,
		removeDb:deleteDb
	};
	return factoryObj;
	
	function selectDb(){
		var deferred = $q.defer();
		var query = "SELECT * FROM userRecord";
		var dbObject = null;
		var recordsArray = new Array();
		dbConSerObj.makeConnection().then(function(res){
			dbObject = res;
			if(dbObject != null){
			 dbObject.transaction(function(tr){
				tr.executeSql(query,[],function(tx,res){
					var rowLength = res.rows.length;
					 if(rowLength >0){
						 for(var tbrow = 0;tbrow < rowLength ; tbrow++){
							 var singleRowObj = res.rows.item(tbrow);
							    console.log("singleRowObj-->"+JSON.stringify(singleRowObj));
								   recordsArray.push(singleRowObj);
						 }
					 }else{
						 	 recordsArray = [];
					 }
					 
				});
			 },function(err){
					console.log("registration type selectDb: error: "+err);
					 /**after error**/
				       deferred.reject(err);
				},function(){
					 /**after success**/
				     deferred.resolve(recordsArray);
				});
	}else{
			console.log("connection error at registrationtype selectDb method");
		}
	},function(err){
		console.log("error in retrieving Data :"+err);
		});
		 /** always return callBack **/
        return deferred.promise;
	};
	

	function insertDb(userObject){
		var deferred = $q.defer();
		console.log("userObject : "+JSON.stringify(userObject));
		var first_Name = userObject.name;
		var last_Name = userObject.surname;
		var struct_query = "INSERT OR REPLACE INTO userRecord (name, surname)";
		//var value ="VALUES('"+first_Name+"','"+last_Name+"')";
		var value ="VALUES(?,?)";
		var query = struct_query+" "+value;
		var dbObject = null;
		dbConSerObj.makeConnection().then(function(res){
		dbObject = res;
		    if(dbObject != null){
		        dbObject.transaction(function(tr){
		            tr.executeSql(query,[first_Name,last_Name],function(tx,result){
		            });
		        },function(err){
		            deferred.reject(err);
		        },function(){
		        deferred.resolve("true");
		        });
		    }else{
		        console.log("Error in insertDb method");
		    }
		},function(err){
		    console.log("error in connection : "+err);
		});
		return deferred.promise;
	}
	function updateDb(updateObject){
	    var deferred = $q.defer();
	    var first_Name = updateObject.name;
	    var last_Name = updateObject.surname;
	    var id = updateObject.user_Id;
	    var dbObject =null;
	    var struct_query = "update userRecord set name='"+first_Name+"',surname='"+last_Name+"' where user_Id ='"+id+"'";
	    console.log("struct_Query : "+struct_query);
	    dbConSerObj.makeConnection().then(function(res){
	        dbObject = res;
	        if(dbObject!=null){
	            dbObject.transaction(function(tr){
	                tr.executeSql(struct_query,[],function(tx,res){
                        console.log("update status : "+JSON.stringify(res));
	                });
	            },function(err){
	            deferred.reject(err);
	            },function(){
	            deferred.resolve(res);
	            });
	        }else{
             		        console.log("Error in updateDb method");
             		    }
	    },function(err){
	        console.log("error in connection : "+err);
	    });
        return deferred.promise;
	}
	function deleteDb(id){
	var deferred = $q.defer();
    var userid = id;
    var struct_query = "DELETE FROM userRecord WHERE user_Id = ?";
    var dbObject=null;
    dbConSerObj.makeConnection().then(function(res){
    dbObject = res;
    if(dbObject != null){
        dbObject.transaction(function(tr){
        tr.executeSql(struct_query,[userid],function(tx,res){
        console.log("result : "+res);
        });
        },function(err){
        deferred.reject("delete error : "+err);
        },function(){
        deferred.resolve("result : "+res);
        });
    }else{
 console.log("Error in deleteDb method");
    }
    },function(err){
    console.log("error in connection : "+err)
    });
     return deferred.promise;
	}
}]);	
})();
	

