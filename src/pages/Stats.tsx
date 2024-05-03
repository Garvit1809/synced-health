import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import db from "./firebase";
import Stat from "./Stat";

type SensorData = {
  // Sensor1 properties
  Sensor1: {
    BPM: number;
    Body_Temp: number;
    spo2: number;
  };
  // Sensor2 properties
  Sensor2: {
    Temp: number;
    ac_x: number;
    ac_y: number;
    ac_z: number;
    av_x: number;
    av_y: number;
    av_z: number;
    ecg_signal: number;
  };
};

const Stats = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    Sensor1: { BPM: 0, Body_Temp: 0, spo2: 0 },
    Sensor2: {
      Temp: 0,
      ac_x: 0,
      ac_y: 0,
      ac_z: 0,
      av_x: 0,
      av_y: 0,
      av_z: 0,
      ecg_signal: 0,
    },
  });

  useEffect(() => {
    const sensor1Ref = ref(db, "Sensor1");
    const sensor2Ref = ref(db, "Sensor2");

    onValue(sensor1Ref, (snapshot) => {
      const data = snapshot.val();
      setSensorData((prevState) => ({
        ...prevState,
        Sensor1: {
          BPM: data.BPM || 0,
          Body_Temp: data.Body_Temp || 0,
          spo2: data.spo2 || 0,
        },
      }));
    });

    // Listen for changes on Sensor2
    onValue(sensor2Ref, (snapshot) => {
      const data = snapshot.val();
      setSensorData((prevState) => ({
        ...prevState,
        Sensor2: {
          Temp: data.Temp || 0,
          ac_x: data.ac_x || 0,
          ac_y: data.ac_y || 0,
          ac_z: data.ac_z || 0,
          av_x: data.av_x || 0,
          av_y: data.av_y || 0,
          av_z: data.av_z || 0,
          ecg_signal: data.ecg_signal || 0,
        },
      }));
    });
  }, []);

  useEffect(() => {
    console.log(sensorData);
  }, [sensorData]);

  return (
    <div className="flex flex-col gap-y-8 p-8">
      <h2 className="font-medium text-2xl">Your Health Stats</h2>
      <div className="flex flex-col gap-y-0">
        <Stat
          label={"BPM"}
          sensor={"MAX30102"}
          unit={"bpm"}
          value={sensorData.Sensor1.BPM}
        />
        <Stat
          label={"Body Temperature"}
          sensor={"MAX30102"}
          unit={"°F"}
          value={sensorData.Sensor1.Body_Temp}
        />
        <Stat
          label={"SPO2"}
          sensor={"MAX30102"}
          unit={"%"}
          value={sensorData.Sensor1.spo2}
        />
      </div>
      <div className="flex flex-col gap-y-0">
        <Stat
          label={"Temperature"}
          sensor={"MPU6050"}
          unit={"°C"}
          value={sensorData.Sensor2.Temp}
        />
        <Stat
          label={"Acceleration"}
          sensor={"MPU6050"}
          unit={"m/s2"}
          value={
            <div>
              <span>X: {sensorData.Sensor2.ac_x}</span>
              <br />
              <span>Y: {sensorData.Sensor2.ac_y}</span>
              <br />
              <span>Z: {sensorData.Sensor2.ac_z}</span>
            </div>
          }
        />
        <Stat
          label={"Rotation"}
          sensor={"MPU6050"}
          unit={"rad/s"}
          value={
            <div>
              <span>X: {sensorData.Sensor2.av_x}</span>
              <br />
              <span>Y: {sensorData.Sensor2.av_y}</span>
              <br />
              <span>Z: {sensorData.Sensor2.av_z}</span>
            </div>
          }
        />
        <Stat
          label={"ECG Signal"}
          sensor={"MPU6050"}
          unit={"uV"}
          value={sensorData.Sensor2.ecg_signal}
        />
      </div>
    </div>
  );
};

export default Stats;
