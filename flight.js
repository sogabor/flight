"use strict";

var FlightInfo = function(text){
	if (text) {
		var obj = JSON.parse(text);
		this.key =  obj.key;
		this.name =  obj.name;
		this.city =  obj.city;
		this.time =  obj.time;
		this.ontime =  obj.ontime;
		this.latetime =  obj.latetime;
		this.author = obj.author;
	}else{
		this.key = "";
		this.name =  "";
		this.city =  "";
		this.time =  "";
		this.ontime =  "";
		this.latetime =  "";
		this.author = "";
	}
};

FlightInfo.prototype = {
	toString: function(){
		return JSON.stringify(this);
	}
};

var FlightContract = function(){
	LocalContractStorage.defineMapProperty(this,"flight",{
		parse: function(text){
			return new FlightInfo(text);
		},
		stringify: function(o){
			return o.toString();
		}
	});
};

FlightContract.prototype = {
	init:function(){

	},
	saveflight: function(key,name,city,time){

		key = key.trim();
		if(key ===""){
			return "empty  key";
		}

		var from = Blockchain.transaction.from;
		var flight = this.flight.get(key);
		if (flight) {
		}else{
			flight = new FlightInfo();
			flight.latetime = 0;
			flight.ontime = 0;
		}
		flight.key = key;
		flight.name = name;
		flight.city = city;
		flight.time = time;
		flight.author = from;
		this.flight.put(key,flight);
		return true;
	},
	
	
	on: function(key){
		key = key.trim();
		if(key ===""){
			return "empty  key";
		}
		var flight = this.flight.get(key);
		if (flight) {
			flight.ontime = flight.ontime + 1;
			this.flight.put(key,flight);
		}	
	},
	
	late: function(key){
		key = key.trim();
		if(key ===""){
			return "empty  key";
		}
		var flight = this.flight.get(key);
		if (flight) {
			flight.latetime = flight.latetime + 1;
			this.flight.put(key,flight);
		}	
	},
	
	
	getflight: function(key){
		key = key.trim();
		if (key ===""){
			return "empty key";
		}
		var tmp = this.flight.get(key);
		if(tmp){
			return tmp;
		}
	}
};
module.exports = FlightContract;