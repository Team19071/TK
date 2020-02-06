/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View,Button,Alert} from 'react-native';
console.ignoredYellowBox = ['Remote debugger'];
//import TcpSocket from 'react-native-tcp-socket';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

//const io = require('socket.io-client');
// var socket = io('ws://10.132.216.158:60000',{transports: ['websocket'],});
// socket.on('connecting', () => {
//   console.log('abcd!');
// });
//var state = -1;
//var ws = new WebSocket("ws://192.168.0.166:5500");
// var net = require('net');
// let client = net.createConnection(5500,() =>{
//   client.wrtie('hello');
// })

// var client = TcpSocket.createConnection("10.142.243.235",29999);
// client.on('error', function(error) {
//   console.log(error);
// });
// client.on('data', function(data) {
//   console.log('message was received', data);
// });
 
// client.on('close', function(){
//   console.log('Connection closed!');
// });
 
// // Write on the socket
// client.write("Hello server!");
 
// Close socket
//client.destroy();



//var databasemessage;
var ws = new WebSocket("ws://localhost:5555/chat");
var states = " ";
  /*
  function name: Storeuser
  Developed by TK Chen.
  this function is used to connect with server and store the data we want to the user table.
  */
 function Storeuser(ID, EMAIL, PASSWORD, LEVEL,SECRET){ 
  fetch('http://localhost:3000/sms/User', {
method: 'POST',
headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
},
body: JSON.stringify({

  id: ID,

  email: EMAIL,

  password: PASSWORD,

  level: LEVEL,

  secret: SECRET
})

});
} 
/*
  function name: Storeerror
  Developed by TK Chen.
  this function is used to connect with server and store the data we want to the errordata table.
*/
function Storeerror(ID, IP, DATA){ 
  fetch('http://localhost:3000/sms/Error', {
method: 'POST',
headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
},
body: JSON.stringify({

  icobotid: IP,

  ip: IP,

  data: DATA
})

});
}
/*
  function name: Storecobot
  Developed by TK Chen.
  this function is used to connect with server and store the data we want to the cobot table.
*/
function Storecobot(IP, UNIT, USERID){ 
  fetch('http://localhost:3000/sms/Cobot', {
method: 'POST',
headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
},
body: JSON.stringify({

  ip: IP,

  unit: UNIT,

  userid: USERID
})

});
}
/*
  function name: Getuser
  Developed by TK Chen.
  this function is used to connect with server and extract the data we need from the user table.
*/
function Getuser(){
  fetch('http://localhost:3000/User')
  .then((data) => {
    //console.log(data);
    //console.log(data.json())
    return data.json();
  })
  .then((response) => {
      //console.log("success: ", response);
      //console.log(response[0]["UserID"]);
      alert(response[0]["UserID"])
      //databasemessage =  response;
      //return response;
  })
  .catch((error) => {
      console.warn("error: "+error);
  })
  //return response;
}
/*
  function name: GetError
  Developed by TK Chen.
  this function is used to connect with server and extract the data we need from the error table.
*/
function GetError(){
  fetch('http://localhost:3000/Error')
  .then((data) => {

    return data.text();
  })
  .then((response) => {
      console.log("success: ", response);
      
  })
  .catch((error) => {
      console.warn("error: "+error);
  })
  
}
/*
  function name: Getcobot
  Developed by TK Chen.
  this function is used to connect with server and extract the data we need from the cobot table.
*/
function GetCobot(){
  fetch('http://localhost:3000/Cobot')
  .then((data) => {

    return data.text();
  })
  .then((response) => {
      console.log("success: ", response);
      
  })
  .catch((error) => {
      console.warn("error: "+error);
  })

}
/*
TK end
*/






ws.onopen = function(evt) {
        console.log("Connection open ...");
        //ws.send(str2ab("HelloWebSockets!"));
    };
    ws.onmessage = function(evt) {
        //var data = String.fromCharCode.apply(null, new Uint16Array(evt.data));
        console.log("Received Message: " + ab2str(evt.data));
        Alert.alert(
  'Return Message',
   ab2str(evt.data),
  [
{text: 'OK', onPress: () => console.log('OK Pressed')},
 ],
 { cancelable: false }
   ) 
        //ws.close();
    };
    function ab2str(buf) {
      return String.fromCharCode.apply(null, new Uint8Array(buf));
    }
     function str2ab(str) {
      var buf = new ArrayBuffer(str.length*2); // 每个字符占用2个字节
      var bufView = new Uint8Array(buf);
      for (var i=0, strLen=str.length; i<strLen; i++) {
      bufView[i] = str.charCodeAt(i);
      }
      return buf;
    }
export default class HelloWorldApp extends Component {
  Connect(){
   //console.log(ws.)
   // console.log("ddd");
   //ws.send("load <program.urp>\n");
   // console.log("222");
   var state = ws.readyState;
   if(state == 1){
    states = "connected";
   }
   else{
    states = "not connected";
   }
   Alert.alert(
  'Connection status',
   states,
  [
{text: 'OK', onPress: () => console.log('OK Pressed')},
 ],
 { cancelable: false }
   ) 
   //ws.send(str2ab("load <program.urp>\n"));
    /// ws.onopen = function()
    //  {
    //               // Web Socket 已连接上，使用 send() 方法发送数据
    //   ws.send("发送数据");
    //   alert("数据发送中...");
    // };
    ws.send(str2ab("get loaded program\n"));
  }
  Send(){
    ws.send(str2ab("play\n"));

    // ws.onopen = function()
    //  {
    //               // Web Socket 已连接上，使用 send() 方法发送数据
    //   ws.send("发送数据");
    //   alert("数据发送中...");
    // };
  }

  Stop(){
    databasemessage= Getuser();
    console.log(databasemessage);
    //Storecobot(3,5,7);
    //ws.send(str2ab("shutdown\n"));
    // console.log(ws.readyState);
    // ws.onopen = function()
    //  {
    //               // Web Socket 已连接上，使用 send() 方法发送数据
    //   ws.send("发送数据");
    //   alert("数据发送中...");
    //};
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text></Text> 
        <Button title="Connect" onPress={this.Connect}></Button>
        <Button title="Start" onPress={this.Send}></Button>
        <Button title="Stop" onPress={this.Stop}></Button>

      </View>
   
    );
  }
}



/*export default App;*/
