(function(){
var dbConObj;
var dbConModule = angular.module('dbConnection',[]);
dbConModule.service('dbConService',['$q',function($q){
	this.makeConnection = function(){
	var deferred = $q.defer();
		document.addEventListener("deviceready",function(){

		if(dbConObj == null || dbConObj == undefined){
			dbConObj =window.sqlitePlugin.openDatabase({name: "record.db", createFromLocation: 1,location: 2,androidDatabaseImplementation: 2});
		deferred.resolve(dbConObj);
		//alert("dbObject null : "+JSON.stringify(dbConObj));
		}else{
			dbConObj =window.sqlitePlugin.openDatabase({name: "record.db", location: 2, androidDatabaseImplementation: 2});
			deferred.resolve(dbConObj);
		//	alert("dbObject else : "+JSON.stringify(dbConObj));
		}
	},false);
		return deferred.promise;
	}
}]);

})();