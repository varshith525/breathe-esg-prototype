import { useEffect, useState } from "react";

function App() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/records")
      .then((res) => res.json())
      .then((data) => setRecords(data));
  }, []);

  const approveRecord = (index) => {
    const updatedRecords = [...records];

    updatedRecords[index].status = "Approved";

    setRecords(updatedRecords);
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1 style={{ marginBottom: "10px" }}>
        Breathe ESG Dashboard
      </h1>

      <p style={{ marginBottom: "20px" }}>
        Upload, review, and validate enterprise ESG emissions
        data before audit approval.
      </p>

      <table
        border="1"
        cellPadding="12"
        style={{
          borderCollapse: "collapse",
          width: "100%",
          backgroundColor: "white",
          color: "black",
        }}
      >
        <thead>
          <tr>
            <th>Source</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>CO2</th>
            <th>Status</th>
            <th>Flag</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record, index) => (
            <tr
              key={index}
              style={{
                backgroundColor:
                  record.flag === "Suspicious"
                    ? "#ffcccc"
                    : "white",
              }}
            >
              <td>
                {record.Source || record.Werk}
              </td>

              <td>
                {record.Category ||
                  record.Brennstofftyp}
              </td>

              <td>
                {record.Quantity || record.Menge}
              </td>

              <td>
                {record.Unit || record.Einheit}
              </td>

              <td>{record.co2e}</td>

              <td>{record.status}</td>

              <td>{record.flag}</td>

              <td>
                <button
                  onClick={() => approveRecord(index)}
                  style={{
                    padding: "6px 12px",
                    cursor: "pointer",
                  }}
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;