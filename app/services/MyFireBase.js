import firebaseService from './firebase'

const USER_TABLE = "Users"
const MAIN_USER_TABLE = "Users"
const DISCONNECTED = "disconnected"
const RECONNECTED = "reconnected"
const SUBCRIBERS = "subcribers"
const VIEWERS = "viewers"
const SUBCRIBED = "subcribed"
const UPDATED = "updated"
const NOTIFICATION = "notification"
const STATUS_SEEN = "statusSeen"
const SUCCESS = "success"
const ONLINE = "online"
const LAST_ACTIVE = "lastActive"
const INPUTTING ="inputting"
const PEER_ID = "peerId"
const mapSocketConnection = {} // url -> socket

var USER_ID = null;
var BRANCH = null;

var MAIN_PATH ="";
const USER_INFO = "userInfo";

export function checkOnlineConnected(){
    var connectedRef = firebaseService.database().ref(".info/connected");
    connectedRef.on('value', function(snap) {
      if (snap.val() === true) {
          setOnline()
          updateOnlineStatus();
      }
    });
}

export function updateOnlineStatus(){
    onDisconnectServer("");
}

export function setOnline(){
    firebaseService.database().ref(MAIN_PATH + "/" + USER_INFO + "/" + ONLINE).set(true,
            function(error) {
              if (error) {
//					  console.log('Synchronization failed onlineStatus');
              } else {
//					  console.log('Synchronization succeeded onlineStatus');
              }
        });
    
    
}

export function setPeerId(val){
    firebaseService.database().ref(MAIN_PATH + "/" + USER_INFO + "/" + PEER_ID).set(val,
            function(error) {
              if (error) {
              } 
        });
}

export function onDisconnectServer(url){
    firebaseService.database().ref(MAIN_PATH + "/" + USER_INFO + "/" + LAST_ACTIVE).onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
    firebaseService.database().ref(MAIN_PATH + "/" + USER_INFO + "/" + ONLINE).onDisconnect().set(false);
    firebaseService.database().ref(MAIN_PATH + "/" + USER_INFO + "/" + PEER_ID).onDisconnect().set("");
}

export function resubcribe (url, onChangeDataEvent) {
    setOnline()
    onDisconnectServer(url);
    
    //SUBCIBE IF NOT YET SUBSCRIBE
    firebaseService.database().ref(url).once("value",
            function(subcribersData) {
                var refSubcriber = subcribersData.child(SUBCRIBERS).child(USER_ID).val();
                
                firebaseService.database().ref(url + "/" + SUBCRIBERS +"/" + USER_ID).set(ONLINE,
                    function(error) {
                          if (error) {
//								  console.log('Synchronization failed subcribeItemIfNotYet');
                          } else {
                              createSocketForResubcribe(url, onChangeDataEvent);
                          }
                    });
            },
            function (err) {
                  // code to handle read error
//					console.log("ERROR INTERNET CONNECTION AT : subcribeItemIfNotYet");
            });
}

export function subcribe(url, onChangeDataEvent){
    
    //OPEN A SOCKET
     createSocket(url, onChangeDataEvent)
}

export function unsubcribe(url, onChangeDataEvent){
    closeSocket(url)
    removeSubcribedOfUser(url)
    
//		closeSocket(url)
}

export function getData(url, onChangeDataEvent){
    firebaseService.database().ref(url).once("value", function(dataJson) {
        var data = dataJson.val();
        onChangeDataEvent(data)

        },
        function (err) {
    });
}

export function listion(url, onChangeDataEvent){
//		console.log("listion...." + url);
    if(mapSocketConnection[url]){
//			console.log("ALREADY HAVE Socket listion...." + url);
        return;
    }
    var callBackTime = 0
    
    var socket = firebaseService.database().ref(url).on("value", function(dataSnapshot) {
//			console.log("listion value changed ON LISTION " + JSON.stringify(dataSnapshot.val()));
            if(callBackTime > 0){
                onChangeDataEvent(dataSnapshot.val())
            }
            callBackTime = callBackTime + 1
    });
    mapSocketConnection[url] = socket
}

export function listionAndFetchData(url, onChangeDataEvent){
//		log("listion...." + url);
    if(mapSocketConnection[url]){
//			log("ALREADY HAVE Socket listion...." + url);
        firebaseService.database().ref(url).off("value", mapSocketConnection[url]);
        mapSocketConnection[url] = null
    }
    var socket = firebaseService.database().ref(url).on("value", function(dataSnapshot) {
//				log("listionAndFetchData value changed ON LISTION " + JSON.stringify(dataSnapshot.val()));
        onChangeDataEvent(dataSnapshot.val())
    });
    mapSocketConnection[url] = socket
}

export function createSocketForResubcribe(url, onChangeDataEvent){
    var subcribeURL = url + "/" + UPDATED
    
    if(mapSocketConnection[url]){
//			console.log("ALREADY HAVE Socket 1...." + url);
        return;
    }
    
    var callBackTime = 0
//		console.log("Create Socket when Open app " + url);
    
    var socket = firebaseService.database().ref(subcribeURL).on("value",
        function(dataSnapshot) {
//			console.log("createSocketForResubcribe value changed ON create SocketForResubcribe " + JSON.stringify(dataSnapshot.val()));
//			console.log("callBackTime: " + callBackTime)
            if(callBackTime > 0){
                onChangeDataEvent(dataSnapshot.val())
            }
            
            callBackTime = callBackTime + 1
    });
    
    mapSocketConnection[url] = socket
}

export function createSocket(url, onChangeDataEvent){
    var subcribeUrl = url + "/" + UPDATED
    
//		console.log("fafafafa: " + mapSocketConnection[url])
    
    if(mapSocketConnection[url]){
//			console.log("ALREADY HAVE Socket...." + url);
        return
    }
    
//		console.log("fafafafa: 1111 : " + mapSocketConnection[url])
    
//		console.log("Create new Socket...." + url);

    var callBackTime = 0
    var socket = firebaseService.database().ref(subcribeUrl).on("value",
        function(dataSnapshot) {
//			console.log("createSocket value changed ON create new Socket " + JSON.stringify(dataSnapshot.val()));
        
//			console.log(callBackTime + ": callBackTime")
            
            if(callBackTime > 0){
                onChangeDataEvent(dataSnapshot.val())
            }
            
            callBackTime = callBackTime + 1
    });
    
    mapSocketConnection[url] = socket
    
}

export function closeSocket(url){
//		console.log('Closing........ Socket: ' + url);

    var connection = mapSocketConnection[url]
    
    if(connection){
//			console.log("Closed socket: " + url)
        firebaseService.database().ref(url + "/" + UPDATED).off("value", connection);
        delete mapSocketConnection[url]
    }
}

export function addSubcribedOfUser(newSubcribedURL){
    var userURL = USER_TABLE + "/" + USER_ID;
    
//		console.log("ADD SUBCRIBE USER: " + newSubcribedURL)
    
    firebaseService.database().ref(userURL)
        .once("value", function(itemData) {
//				console.log(url + " subcribed DATA : " + JSON.stringify(itemData.child(SUBCRIBED).val()));
                var refSubcribed = itemData.child(SUBCRIBED).val() || [];
                var existInArray = $.inArray(newSubcribedURL, refSubcribed) > -1
                
//					console.log("refSubcribed: " + refSubcribed)
//					console.log("existInArray: " + existInArray)

                if(existInArray){
                    return
                }

                refSubcribed.push(newSubcribedURL);
                
                firebaseService.database().ref(userURL + "/" + SUBCRIBED).set(refSubcribed,
                    function(error) {
                      if (error) {
//							  console.log('Synchronization failed storeData');
                      } else {
//						      log('Synchronization succeeded storeData' + 
                      }
                    });
            },
            function (err) {
                // code to handle read error
//					log("ERROR INTERNET CONNECTION AT : updateSubcribedOf User");
            });
}

export function removeSubcribedOfUser(newSubcribedURL){
    var userURL = USER_TABLE + "/" + USER_ID;
    
//		console.log("REMOVE SUBCRIBE USER: " + newSubcribedURL)
    
    firebaseService.database().ref(userURL).once("value", function(itemData) {
//					log(url + " subcribed DATA : " + JSON.stringify(itemData.child(SUBCRIBED).val()));
                var refSubcribed = itemData.child(SUBCRIBED).val() || [];
                var existInArray = $.inArray(newSubcribedURL, refSubcribed) > -1
                
//					log("refSubcribed: " + refSubcribed)
//					log("existInArray: " + existInArray)

                if(!existInArray) {
                    return
                }
                
                var index = refSubcribed.indexOf(newSubcribedURL);

                if (index > -1) {
                    refSubcribed.splice(index, 1);
                }
                
//					console.log("AFTER REMOVED: " + refSubcribed)
                
                console.mainApp.database().ref(userURL + "/" + SUBCRIBED).set(refSubcribed,
                    function(error) {
                      if (error) {
//							  console.log('Synchronization failed storeData');
                      } else {
//						      log('Synchronization succeeded storeData' + 
                      }
                    });
            },
            function (err) {
                // code to handle read error
//					console.log("ERROR INTERNET CONNECTION AT : updateSubcribedOf User");
            });
}

export function getDataAtNode(url, callBackKS){
    //SUBCIBE IF NOT YET SUBSCRIBE
    firebaseService.database().ref(url)
        .once("value", function(userData) {
//					log(url + " USER Subcribed data: " + userData.val() + " - Subcribed data: " + JSON.stringify(userData.val()));
                callBackKS(userData.val())
            },
            function (err) {
                // code to handle read error
//					log("ERROR INTERNET CONNECTION AT : subcribeds");
                callBackKS(err)
            });
}

export function distroyAllSocketConnection(){
    
    setOffLine()
    
     for (key in mapSocketConnection) {
//			 console.log("DISCONNECT FIREBASE : " + key)
        
        var connection = mapSocketConnection[key]
            
         if(connection){
//	 			console.log("Closed socket: " + key)
            firebaseService.database().ref(key).off("value", connection);
            
            mapSocketConnection[key] = null
         }
    }
}

export function setOffLine(){
    firebaseService.database().ref(USER_TABLE + "/" + USER_ID + "/" + ONLINE).set(false,
            function(error) {
              if (error) {
//					      log('Synchronization failed onlineStatus');
              } else {
//					      log('Synchronization succeeded onlineStatus');
              }
        });
}


export function sendDataChat(url, dataString,typeChat, callback){
//		console.log("change item : " + url)
    var updatedVal = {
        date: (new Date()).toString() + " - " + randomText(),
        url: url,
        user: USER_ID,
        data: dataString,
        type: typeChat
    };
    firebaseService.database().ref(url + "/" + UPDATED).set(updatedVal,
              function(error) {
                  if (error) {
//						  console.log('Send Data Fail');
                      callback(error)
                  } else {
//						  console.log('Send Data Success : ' + SUCCESS);
                      callback(SUCCESS)
                  }
            });
}

export function sendStatusSeen (url,meSendId,status,date){
    var updatedVal = {
        url : url,
        seen : status,
        date : date,
    };
    firebaseService.database().ref(url + "/" + STATUS_SEEN +"/"+meSendId).set(updatedVal,
            function(error) {
                if (error) {
    //			      log('Send Data Fail');
                } else {
    //			      log('Send Data Success : ' + SUCCESS);
                }
            });
}

export function recentStatusSeen (url,meSendId,onChangeDataEvent){
     firebaseService.database().ref(url +"/" + STATUS_SEEN +"/"+meSendId).on("value",
            function(dataSnapshot) {
                onChangeDataEvent(dataSnapshot.val())
    });
}


export function sendDataNotification (url,id,dataString,link,date,userSend,type,itemId,callback){
    var updatedVal = {
            url: url,
            id : id,
            data: dataString,
            link:link,
            date: date,
            userSend: userSend,
            type : type,
            itemId: itemId,
        };
    firebaseService.database().ref(url).set(updatedVal,
              function(error) {
                  if (error) {
//					      log('Send Data Fail');
                      callback(error)
                  } else {
//					      log('Send Data Success : ' + SUCCESS);
                      callback(SUCCESS)
                  }
            });
}

export function recentDataNotification (url,onChangeDataEvent){
     if(mapSocketConnection[url]){
//				console.log("ALREADY HAVE Socket...." + url);
            return
        }
        var callBackTime = 0
        var socket = firebaseService.database().ref(url).on("value",
            function(dataSnapshot) {
                if(callBackTime > 0){
                    onChangeDataEvent(dataSnapshot.val())
                }
                callBackTime = callBackTime + 1
        });
        mapSocketConnection[url] = socket
}

export function inputting (url,isFocus,meId){
    
    var inputingVal = {
        type : isFocus,
        friendId: meId
    }
    
    firebaseService.database().ref(url + "/" + INPUTTING).set(inputingVal,
              function(error) {
                  if (error) {
//					      log('Send Data Fail');
                  } else {
//					      log('Send Data Success : ' + SUCCESS);
                  }
            });
}

export function recentInputing (url,onChangeDataEvent){
     firebaseService.database().ref(url +"/" + INPUTTING).on("value",
            function(dataSnapshot) {
                onChangeDataEvent(dataSnapshot.val())
    });
}

export function sendDataActivityLog (url, courseId, msg, date, itemId, from,type,userName){
    var data = {
            courseId : courseId,
            content: msg,
            date : date,
            itemId : itemId,
            userId : from,
            type : type,
            userName : userName,
        }
    firebaseService.database().ref(url).set(data,
              function(error) {
                  if (error) {
//					      log('Send Data Fail');
                  } else {
//					      log('Send Data Success : ' + SUCCESS);
                  }
            });
}

export function recentDataActivityLog (url,onChangeDataEvent){
    var callBackTime = 0
    var socket = firebaseService.database().ref(url).on("value",
        function(dataSnapshot) {
            if(callBackTime > 0){
                onChangeDataEvent(dataSnapshot.val())
            }
            callBackTime = callBackTime + 1
    });
}

export function randomText(){
    return Math.random();
}

export function setUserId(userId){
    USER_ID = userId;
}