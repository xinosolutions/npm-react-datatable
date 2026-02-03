import { useState } from "react";
import { DataTable } from './RactDataTable';
// import { DataTable } from '@xinosolutions/react-datatable';

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
      phone_no: "0301-0000001",
      phone_no1: "0301-0000002",
      phone_no2: "0301-0000003",
      phone_no3: "0301-0000004",
      description:
        "<div><h3>Lorem ipsum</h3><p>dolor sit amet consectetur, adipisicing elit. Adipisci dolore asperiores quos totam quisquam laboriosam commodi aliquid, perferendis corrupti enim dolor sequi. Expedita ea magni mollitia rerum et, iste fugit illo sequi repellendus a natus ad tempora recusandae eaque aut!</p></div>",
    },
    {
      select_all: "2",
      serial_no: "02.",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "pass@456",
      phone_no: "0302-0000001",
      phone_no1: "0302-0000002",
      phone_no2: "0302-0000003",
      phone_no3: "0302-0000004",
      description:
        "<div><h3>Consectetur adipiscing</h3><p>elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.</p></div>",
    },
    {
      select_all: "3",
      serial_no: "03.",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      password: "pass@789",
      phone_no: "0303-0000001",
      phone_no1: "0303-0000002",
      phone_no2: "0303-0000003",
      phone_no3: "0303-0000004",
      description:
        "<div><h3>Sed do eiusmod</h3><p>tempor incididunt ut labore et dolore magna aliqua. Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.</p></div>",
    },
    {
      select_all: "4",
      serial_no: "04.",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      password: "pass@012",
      phone_no: "0304-0000001",
      phone_no1: "0304-0000002",
      phone_no2: "0304-0000003",
      phone_no3: "0304-0000004",
      description:
        "<div><h3>Ut enim ad minim</h3><p>veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p></div>",
    },
    {
      select_all: "5",
      serial_no: "05.",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      password: "pass@345",
      phone_no: "0305-0000001",
      phone_no1: "0305-0000002",
      phone_no2: "0305-0000003",
      phone_no3: "0305-0000004",
      description:
        "<div><h3>Duis aute irure</h3><p>dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>",
    },
    {
      select_all: "6",
      serial_no: "06.",
      name: "Sarah Martinez",
      email: "sarah.martinez@example.com",
      password: "pass@678",
      phone_no: "0306-0000001",
      phone_no1: "0306-0000002",
      phone_no2: "0306-0000003",
      phone_no3: "0306-0000004",
      description:
        "<div><h3>Excepteur sint</h3><p>occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p></div>",
    },
    {
      select_all: "7",
      serial_no: "07.",
      name: "David Anderson",
      email: "david.anderson@example.com",
      password: "pass@901",
      phone_no: "0307-0000001",
      phone_no1: "0307-0000002",
      phone_no2: "0307-0000003",
      phone_no3: "0307-0000004",
      description:
        "<div><h3>Sed ut perspiciatis</h3><p>unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p></div>",
    },
    {
      select_all: "8",
      serial_no: "08.",
      name: "Lisa Thompson",
      email: "lisa.thompson@example.com",
      password: "pass@234",
      phone_no: "0308-0000001",
      phone_no1: "0308-0000002",
      phone_no2: "0308-0000003",
      phone_no3: "0308-0000004",
      description:
        "<div><h3>Nemo enim ipsam</h3><p>voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p></div>",
    },
    {
      select_all: "9",
      serial_no: "09.",
      name: "James Brown",
      email: "james.brown@example.com",
      password: "pass@567",
      phone_no: "0309-0000001",
      phone_no1: "0309-0000002",
      phone_no2: "0309-0000003",
      phone_no3: "0309-0000004",
      description:
        "<div><h3>Neque porro</h3><p>quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p></div>",
    },
    {
      select_all: "10",
      serial_no: "10.",
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      password: "pass@890",
      phone_no: "0310-0000001",
      phone_no1: "0310-0000002",
      phone_no2: "0310-0000003",
      phone_no3: "0310-0000004",
      description:
        "<div><h3>Ut enim ad minima</h3><p>veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</p></div>",
    },
    {
      select_all: "11",
      serial_no: "11.",
      name: "Christopher Lee",
      email: "christopher.lee@example.com",
      password: "pass@321",
      phone_no: "0311-0000001",
      phone_no1: "0311-0000002",
      phone_no2: "0311-0000003",
      phone_no3: "0311-0000004",
      description:
        "<div><h3>At vero eos</h3><p>et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p></div>",
    },
    {
      select_all: "12",
      serial_no: "12.",
      name: "Jennifer White",
      email: "jennifer.white@example.com",
      password: "pass@654",
      phone_no: "0312-0000001",
      phone_no1: "0312-0000002",
      phone_no2: "0312-0000003",
      phone_no3: "0312-0000004",
      description:
        "<div><h3>Similique sunt</h3><p>in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit.</p></div>",
    },
  ];

  const columns = [
    { label: "#", type: "number" },
    { key: "serial_no", label: "Serial No" },
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
        <DataTable 
          rows={rows}
          columns={columns}
          checkboxSelection={{
            selected,
            setSelected,
            selectBy: "select_all"
          }}
          theme={{
            '--table-theme-color': '#3b82f6'
          }}
        />
      </div>
    </>
  );
}

export default App;
