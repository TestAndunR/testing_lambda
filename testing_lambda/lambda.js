let AWS = require('aws-sdk');
let firebase = require("firebase");
exports.handler = function(event, context, callback) {
	//database configuration
	let config = {
    apiKey: "AIzaSyDMF17Pu7_5gLRYX_Ff_dbA8Ak5_RONIQA",
    authDomain: "testusercreate-89b32.firebaseapp.com",
    databaseURL: "https://testusercreate-89b32.firebaseio.com",
    storageBucket: "testusercreate-89b32.appspot.com"
  	};

	let app;

	if (!firebase.apps.length) {
		app=firebase.initializeApp(config);
	}


	let hotspacesUserLocation

  	lastKnownRef.once('value', (data) => {
    hotspacesUserLocation = data.val();

		let ps=Object.keys(hotspacesUserLocation).map((key, index) => {
		//Create new lat and long
			let randomnum = Math.floor(Math.random() * (1000 - 100)) / 10000;
			let newLat = hotspacesUserLocation[key].lat + randomnum;
			let newLong = hotspacesUserLocation[key].long+ randomnum;

			console.log("New Values" + newLong + "," + newLat);

			
			let locationRef = ref.child('userLocation');
			let lastKnownRef = ref.child('lastKnown');
			let latKey = Math.trunc((newLat + 90) * 100);
			let longKey = Math.trunc((newLong + 180) * 100);

			let locationKeyRef = locationRef.child(longKey + "," + latKey);
			let lastKnownKeyRef = lastKnownRef.child(key)

			console.log("locationKeyRef: " + locationKeyRef);
			console.log("lastKnownKeyRef:" + lastKnownKeyRef);
			return lastKnownRef.child(key).once('value').then(data=>{
				let prevLat = data.val().lat;
				let prevLong = data.val().long;
				console.log(data.val());
				//create box value for the previous location
				let prevlatKey = Math.trunc((prevLat + 90) * 100);
				let prevlongKey = Math.trunc((prevLong + 180) * 100);
				//remove the prevoius key value(box) from the location
				let p3=locationRef.child(prevlongKey + "," + prevlatKey).child(key).remove();
				let userKey = locationKeyRef.child(key);
				let p1=userKey.update({ lat: newLat, long: newLong });
		
				//console.log("Success");
				// console.log("Inserted data to " + userId + " with data " + JSON.stringify(data));
				let p2=lastKnownKeyRef.update({ lat: newLat, long: newLong });

				//console.log(p1,p2,p3);

				return Promise.all([p1,p2,p3]);

		});
	});


	Promise.all(ps).then((result)=>{
    app.delete().then(deleted=>{
      callback(null, 'Successfully executed');
    }).catch(err=>{
        callback(null, 'Successfully executed');
    });


  }).catch(err=>{
    app.delete().then(deleted=>{
      callback(null, 'Successfully executed');
    }).catch(err=>{
        callback(null, 'Successfully executed');
    });
  });
});
}
