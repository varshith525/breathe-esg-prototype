import { useEffect, useState } from "react";

function App() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch("https://breatheesgbackend-4qc8yhzi.b4a.run/records")
      .then((res) => res.json())
      .then((data) => setRecords(data))
      .catch((err) => console.log(err));
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
        <thead
          style={{
            backgroundColor: "#1e293b",
            color: "white",
          }}
        >
          <tr>
            <th>Source</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>CO2e</th>
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
                {record.Source || record.Werk || "N/A"}
              </td>

              <td>
                {record.Category ||
                  record.Brennstofftyp ||
                  "N/A"}
              </td>

              <td>
                {record.Quantity ||
                  record.Menge ||
                  "N/A"}
              </td>

              <td>
                {record.Unit ||
                  record.Einheit ||
                  "N/A"}
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
                    backgroundColor: "#16a34a",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
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