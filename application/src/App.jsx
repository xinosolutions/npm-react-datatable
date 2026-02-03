import { useState } from "react";
import { DataTable } from "./RactDataTable";
// import { DataTable } from "@xinosolutions/react-datatable";

function App() {
  const [selected, setSelected] = useState([]);
  console.log(selected);

  const rows = [
    {
      select_all: "1",
      serial_no: "01.",
      name: "John Doe",
      email: "john.doe@example.com",
      password: "pass@123",
      phone_no: "0301-0000003",
      phone_no1: "0301-0000003",
      phone_no2: "0301-0000003",
      phone_no3: "0301-0000003",
      description:
        "<div><h3>Lorem ipsum</h3><p>dolor sit amet consectetur, adipisicing elit. Adipisci dolore asperiores quos totam quisquam laboriosam commodi aliquid, perferendis corrupti enim dolor sequi. Expedita ea magni mollitia rerum et, iste fugit illo sequi repellendus a natus ad tempora recusandae eaque aut!</p></div>",
    },
    {
      select_all: "2",
      serial_no: "02.",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "pass@456",
      phone_no: "0302-0000002",
      phone_no2: "0301-0000003",
      phone_no3: "0301-0000003",
      description:
        "<div><h3>Lorem ipsum</h3><p>dolor sit amet consectetur, adipisicing elit. Adipisci dolore asperiores quos totam quisquam laboriosam commodi aliquid, perferendis corrupti enim dolor sequi. Expedita ea magni mollitia rerum et, iste fugit illo sequi repellendus a natus ad tempora recusandae eaque aut!</p></div>",
    },
    {
      select_all: "3",
      serial_no: "03.",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      password: "pass@789",
      phone_no: "0303-0000001",
      phone_no1: "0301-0000003",
      phone_no3: "0301-0000003",
      description:
        "<div><h3>Lorem ipsum</h3><p>dolor sit amet consectetur, adipisicing elit. Adipisci dolore asperiores quos totam quisquam laboriosam commodi aliquid, perferendis corrupti enim dolor sequi. Expedita ea magni mollitia rerum et, iste fugit illo sequi repellendus a natus ad tempora recusandae eaque aut!</p></div>",
    },
    {
      select_all: "4",
      serial_no: "04.",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      password: "pass@012",
      phone_no: "0303-0000001",
      phone_no1: "0301-0000003",
      phone_no2: "0301-0000003",
      phone_no3: "0301-0000003",
      description:
        "<div><h3>Lorem ipsum</h3><p>dolor sit amet consectetur, consectetur, adipisicing elit. Adipisci dolore asperiores quos totam quisquam laboriosam commodi aliquid, perferendis corrupti enim dolor sequi. Expedita iste fugit illo sequi repellendus a natus ad tempora recusandae eaque aut!</p></div>",
    },
    {
      select_all: "4",
      serial_no: "04.",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      password: "pass@012",
      phone_no: "0303-0000001",
      phone_no1: "0301-0000003",
      phone_no2: "0301-0000003",
      phone_no3: "0301-0000003",
      description:
        "<div><h3>Lorem ipsum</h3><p>dolor sit amet consectetur, consectetur, adipisicing elit. Adipisci dolore asperiores quos totam quisquam laboriosam commodi aliquid, perferendis corrupti enim dolor sequi. Expedita iste fugit illo sequi repellendus a natus ad tempora recusandae eaque aut!</p></div>",
    },
    {
      select_all: "4",
      serial_no: "04.",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      password: "pass@012",
      phone_no: "0303-0000001",
      phone_no1: "0301-0000003",
      phone_no2: "0301-0000003",
      phone_no3: "0301-0000003",
      description:
        "<div><h3>Lorem ipsum</h3><p>dolor sit amet consectetur, consectetur, adipisicing elit. Adipisci dolore asperiores quos totam quisquam laboriosam commodi aliquid, perferendis corrupti enim dolor sequi. Expedita iste fugit illo sequi repellendus a natus ad tempora recusandae eaque aut!</p></div>",
    },
    {
      select_all: "4",
      serial_no: "04.",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      password: "pass@012",
      phone_no: "0303-0000001",
      phone_no1: "0301-0000003",
      phone_no2: "0301-0000003",
      phone_no3: "0301-0000003",
      description:
        "<div><h3>Lorem ipsum</h3><p>dolor sit amet consectetur, consectetur, adipisicing elit. Adipisci dolore asperiores quos totam quisquam laboriosam commodi aliquid, perferendis corrupti enim dolor sequi. Expedita iste fugit illo sequi repellendus a natus ad tempora recusandae eaque aut!</p></div>",
    },
  ];

  const columns = [
    { key: "select_all", type: "radio" },
    { key: "serial_no", type: "checkbox" },
    { label: "#", type: "number" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "password", label: "Password" },
    { key: "phone_no", label: "Phone No" },
    { key: "phone_no1", label: "Phone No 1" },
    { key: "phone_no2", label: "Phone No 2" },
    { key: "phone_no3", label: "Phone No 3" },
    { label: "Detail", render: () => <div>Detail</div> },
    {
      key: "description",
      label: "Description",
      type: "html",
    },
    { key: "phone_no3", label: "Phone No 3" },
  ];

  return (
    <>
      <div>
        <DataTable {...{ selected, setSelected, rows, columns }} />
      </div>
    </>
  );
}

export default App;
