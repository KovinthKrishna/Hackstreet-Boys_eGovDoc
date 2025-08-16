import React from "react";

function Field({ label, value }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
      <div style={{ fontWeight: 600 }}>{value ?? "-"}</div>
    </div>
  );
}

function formatDate(d) {
  if (!d) return "-";
  const dt = typeof d === "string" ? new Date(d) : d;
  if (isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString();
}

export default function WarrantDetails({ warrant }) {
  if (!warrant) return <div>No data</div>;
  const docs = Array.isArray(warrant.supporting_documents)
    ? warrant.supporting_documents
    : [];

  return (
    <div style={{ maxWidth: 700, margin: "20px auto", padding: 16 }}>
      <h2 style={{ marginBottom: 16 }}>Travel Warrant</h2>

      <section style={sectionStyle}>
        <h3 style={titleStyle}>Personal Information</h3>
        <Field label="Full Name" value={warrant.fullname} />
        <Field label="Pension/W.&O.P No" value={warrant.pensionNo} />
        <Field label="Place of payment pension" value={warrant.placeOfPaymentPension} />
        <Field label="Date of retirement" value={formatDate(warrant.DateOfRetirement)} />
        <Field
          label="Annual salary at date of retirement"
          value={warrant.AnnualSalaryAtRetirementDate}
        />
        <Field label="Area" value={warrant.Area} />
        <Field label="UserId" value={warrant.UserId} />
      </section>

      <section style={sectionStyle}>
        <h3 style={titleStyle}>Travel Details</h3>
        <Field label="From Station" value={warrant.FromStation} />
        <Field label="To Station" value={warrant.ToStation} />
        <Field label="Date Of Outward Journey" value={formatDate(warrant.TravelDate)} />
        <Field label="Date of Return Journey" value={formatDate(warrant.ReturnDate)} />
        <Field label="Priority Level" value={warrant.PriorityLevel} />
        <Field label="Required Completion Date" value={warrant.AppointmentDate} />
        <Field label="Appointment Time" value={warrant.AppointmentTime} />
      </section>

      <section style={sectionStyle}>
        <h3 style={titleStyle}>Preferences</h3>
        <Field label="Class of Travel (at retirement)" value={warrant.TravelClass} />
        <Field label="Current Marital Status" value={warrant.MaritalStatus} />
        <Field label="Ordinary/Single Status" value={warrant.OrdinarysingleStatus} />
        <Field label="Travel Type" value={warrant.TravelType} />
        <Field label="Sleep/Observation Car" value={warrant.SleepCar} />
        <Field label="Dependant Child Name" value={warrant.DependantChildName} />
        <Field label="Dependant Child Age" value={warrant.DependantChildAge} />
      </section>

      <section style={sectionStyle}>
        <h3 style={titleStyle}>If Spouse is also a Pensioner</h3>
        <Field label="Spouse Name" value={warrant.SpouseName} />
        <Field label="Spouse Department" value={warrant.SpouseDepartment} />
      </section>

      <section style={sectionStyle}>
        <h3 style={titleStyle}>Supporting Documents</h3>
        {docs.length === 0 ? (
          <div>-</div>
        ) : (
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            {docs.map((d, idx) => (
              <li key={idx} style={{ marginBottom: 6 }}>
                <a
                  href={`/files/${d.file_id}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  {d.filename || "Document"}
                </a>
                <span style={{ color: "#777", marginLeft: 8 }}>
                  {d.content_type} • {formatDate(d.upload_date)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div style={{ color: "#888", fontSize: 12, marginTop: 10 }}>
        Created: {formatDate(warrant.created_at)}
      </div>
    </div>
  );
}

const sectionStyle = {
  background: "#fff",
  borderRadius: 12,
  padding: 16,
  marginBottom: 16,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const titleStyle = { marginTop: 0, marginBottom: 12, fontSize: 16 };