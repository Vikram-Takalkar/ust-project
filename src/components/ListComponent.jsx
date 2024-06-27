import React from "react";

const ListComponent = ({ machineData }) => {
  return (
    <>
      <table className="table">
        <tbody>
          {machineData?.map((val) => (
            <tr key={val.id}>
              <td>{val.machineName}</td>
              <td>{val.machineType}</td>
              <td>{val.status == '' ? <span className="text-danger">Empty</span>: val.status}</td>
              <td>{val.type}</td>
              <td>{val.build}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListComponent;
