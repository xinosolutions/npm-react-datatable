import { useState } from "react";
import { DataTable } from './RactDataTable';
// import { DataTable } from '@xinosolutions/react-datatable';

function App() {
  const [selected, setSelected] = useState([]);
  console.log(selected);

  const rows = [
    {
      _id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone_number: "+1 (555) 123-4567",
      address: "123 Main Street, New York, NY 10001",
      is_admin: "Yes",
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone_number: "+1 (555) 234-5678",
      address: "456 Oak Avenue, Los Angeles, CA 90001",
      is_admin: "No",
    },
    {
      _id: "3",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      phone_number: "+1 (555) 345-6789",
      address: "789 Pine Road, Chicago, IL 60601",
      is_admin: "No",
    },
    {
      _id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone_number: "+1 (555) 456-7890",
      address: "321 Elm Street, Houston, TX 77001",
      is_admin: "Yes",
    },
    {
      _id: "5",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      phone_number: "+1 (555) 567-8901",
      address: "654 Maple Drive, Phoenix, AZ 85001",
      is_admin: "No",
    },
    {
      _id: "6",
      name: "Sarah Martinez",
      email: "sarah.martinez@example.com",
      phone_number: "+1 (555) 678-9012",
      address: "987 Cedar Lane, Philadelphia, PA 19101",
      is_admin: "No",
    },
    {
      _id: "7",
      name: "David Anderson",
      email: "david.anderson@example.com",
      phone_number: "+1 (555) 789-0123",
      address: "147 Birch Boulevard, San Antonio, TX 78201",
      is_admin: "Yes",
    },
    {
      _id: "8",
      name: "Lisa Thompson",
      email: "lisa.thompson@example.com",
      phone_number: "+1 (555) 890-1234",
      address: "258 Spruce Court, San Diego, CA 92101",
      is_admin: "No",
    },
    {
      _id: "9",
      name: "James Brown",
      email: "james.brown@example.com",
      phone_number: "+1 (555) 901-2345",
      address: "369 Willow Way, Dallas, TX 75201",
      is_admin: "No",
    },
    {
      _id: "10",
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      phone_number: "+1 (555) 012-3456",
      address: "741 Ash Street, San Jose, CA 95101",
      is_admin: "No",
    },
  ];

  const columns = [
    { label: "#", type: "number" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone_number", label: "Phone Number" },
    { key: "address", label: "Address" },
    { key: "is_admin", label: "Is Admin" },
  ];

  return (
    <>
      <div>
        <DataTable
          rows={rows}
          columns={columns}
          checkboxSelection={{ selected, setSelected }}
        />
      </div>
    </>
  );
}

export default App;
