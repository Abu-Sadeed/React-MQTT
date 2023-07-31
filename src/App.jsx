import React, { useState, useEffect } from "react";
import mqtt from "precompiled-mqtt";

const App = () => {
  const [liveData, setLiveData] = useState("");
  const option = {
    username: "user",
    password: "rpass",
  };
  useEffect(() => {
    // Replace 'mqtt://your-broker-url' with your actual broker URL
    const brokerUrl = "mqtt://url:port";
    const client = mqtt.connect(brokerUrl, option);

    // Subscribe to the topic you want to receive live data from
    const topic = "your-topic";
    client.subscribe(topic);

    // Handle incoming messages
    client.on("message", (receivedTopic, message) => {
      if (receivedTopic === topic) {
        const data = message.toString();
        setLiveData(data);
      }
    });

    // Clean up the MQTT client on component unmount
    return () => {
      client.unsubscribe(topic);
      client.end();
    };
  }, []);

  return (
    <div>
      <h2>Live Data from MQTT:</h2>
      <p>{liveData}</p>
    </div>
  );
};

export default App;
