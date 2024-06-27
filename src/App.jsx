import React, { useEffect, useState } from "react";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import "./App.css";
import ButtonComponent from "./components/ButtonComponent";
import { _getMachineData } from "./components/services/MachineService";
import ListComponent from "./components/ListComponent";

const App = () => {
  const [count, setCount] = useState([
    {
      acceptable: null,
      monitor: null,
      danger: null,
      alarm: null,
      noStatus: null,
    },
  ]);

  const [machineData, setMachineDta] = useState({});
  const [machineDataPerm, setMachineDataPerm] = useState({});

  const [filterValue, setfilterValue] = useState("");
  const [render, setRender] = useState(false);

  useEffect(() => {
    getAllMachinesData();
  }, []);
  
  const getAllMachinesData = () => {
    _getMachineData()
    .then((res) => {
        setMachineDta(res.data);
        setMachineDataPerm(res.data)
        setRender(true);
        let data = res.data;
        let obj = {};
        data.map((val) => {
          let value = val.status.toLowerCase();
          if (obj[value]) obj[value]++;
          else obj[value] = 1;
        });

        if (Object.keys(obj).includes("")) {
          obj["noStatus"] = obj[""];
        }
        setCount(obj);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setfilterVal =(val)=>{
    const data1=machineDataPerm.filter((data)=>{
        if(data.status == val){ return data}
    })
    setMachineDta(data1)
  }

  if (!render) {
    return <div data-testid="app">Loading....</div>;
  } else {
    return (
      <div data-testid="app1">
        <div className="header">
          {console.log(filterValue)}
          <Header />
        </div>
        <div className="row">
          <div className="col-md-3 row m-2">
            <ButtonComponent count={count} setfilterVal={setfilterVal} />
          </div>
          <div className="col-md-8">
            <ListComponent machineData={machineData}/>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  }
};

export default App;
