// @ts-nocheck
"use client"

import React, { useEffect, useState } from 'react';
import { Centrifuge } from 'centrifuge';
import { useWebsocketProvider } from "@/lib/websocket-provider";
import { useBalanceProvider } from "@/lib/balance-provider";


export function Websocket() {
    const [websocketState, setWebsocketState] = useState("");
    const [websocketDataEvent, setWebsocketDataEvent] = useState([]);
    const [websocketNewDataEvent, setWebsocketNewDataEvent] = useState([]);
    const [websocketDataNew, setWebsocketDataNew] = useState([]);
    const [gameState, setGameState] = useState("");
    const [websocketData, setWebsocketData] = useWebsocketProvider();
    const [chatData, setChatData] = useWebsocketProvider();
    const [balanceData, setBalanceData] = useBalanceProvider();

    useEffect(() => {
        async function connectWebsocket() {
          await setWebsocketState("connecting");
          if(websocketState !== "connected") {
            const url = "wss://" + window.location.host + "/connection/websocket";
          const client = new Centrifuge(url);

          client.on("connected", function (ctx) {
            setWebsocketState("connected");
            console.log("Connected to websocket..");
          });
    
          client.on("disconnected", function (ctx) {
            setWebsocketState("disconnected");
            console.log("Disconnected to websocket..");
          });
    
          client.on("error", function (ctx) {
            setWebsocketState("error");
            console.log(ctx);
          });
          
          client.on('publication', function(ctx) {
            const channel = ctx.channel;
            const payload = JSON.stringify(ctx.data);
            var jsonPayload = JSON.parse(payload);
            if(channel === "chat#1") {
              setChatData(payload);
            }
            if(jsonPayload.event === "BalanceUpdate") {
              setBalanceData(jsonPayload.message);
            }
          });
            client.connect();
        }
        }
        connectWebsocket();
      }, []);


  return (
    <></>
  )
}