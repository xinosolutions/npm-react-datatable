import { useState } from "react";
import { DataTable } from "@xinosolutions/react-datatable";

function App() {
  const [selected, setSelected] = useState([]);

  const rows = [
    {
      _id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone_number: "+1 (555) 123-4567",
      address: "123 Main Street, New York, NY 10001",
      is_admin: "Yes",
      department: "Engineering",
      status: "Active",
      role: "Manager",
      joined_date: "2021-03-15",
      country: "USA",
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone_number: "+1 (555) 234-5678",
      address: "456 Oak Avenue, Los Angeles, CA 90001",
      is_admin: "No",
      department: "Marketing",
      status: "Active",
      role: "Specialist",
      joined_date: "2022-06-01",
      country: "USA",
    },
    {
      _id: "3",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      phone_number: "+1 (555) 345-6789",
      address: "789 Pine Road, Chicago, IL 60601",
      is_admin: "No",
      department: "Sales",
      status: "Inactive",
      role: "Associate",
      joined_date: "2020-11-20",
      country: "USA",
    },
    {
      _id: "4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone_number: "+1 (555) 456-7890",
      address: "321 Elm Street, Houston, TX 77001",
      is_admin: "Yes",
      department: "HR",
      status: "Active",
      role: "Director",
      joined_date: "2019-08-12",
      country: "USA",
    },
    {
      _id: "5",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      phone_number: "+1 (555) 567-8901",
      address: "654 Maple Drive, Phoenix, AZ 85001",
      is_admin: "No",
      department: "Finance",
      status: "Active",
      role: "Analyst",
      joined_date: "2023-01-09",
      country: "USA",
    },
    {
      _id: "6",
      name: "Sarah Martinez",
      email: "sarah.martinez@example.com",
      phone_number: "+1 (555) 678-9012",
      address: "987 Cedar Lane, Philadelphia, PA 19101",
      is_admin: "No",
      department: "Support",
      status: "Active",
      role: "Lead",
      joined_date: "2021-09-30",
      country: "USA",
    },
    {
      _id: "7",
      name: "David Anderson",
      email: "david.anderson@example.com",
      phone_number: "+1 (555) 789-0123",
      address: "147 Birch Boulevard, San Antonio, TX 78201",
      is_admin: "Yes",
      department: "Engineering",
      status: "Active",
      role: "Senior Dev",
      joined_date: "2018-04-22",
      country: "USA",
    },
    {
      _id: "8",
      name: "Lisa Thompson",
      email: "lisa.thompson@example.com",
      phone_number: "+1 (555) 890-1234",
      address: "258 Spruce Court, San Diego, CA 92101",
      is_admin: "No",
      department: "Design",
      status: "Inactive",
      role: "Designer",
      joined_date: "2022-12-05",
      country: "USA",
    },
    {
      _id: "9",
      name: "James Brown",
      email: "james.brown@example.com",
      phone_number: "+1 (555) 901-2345",
      address: "369 Willow Way, Dallas, TX 75201",
      is_admin: "No",
      department: "Operations",
      status: "Active",
      role: "Coordinator",
      joined_date: "2020-02-18",
      country: "USA",
    },
    {
      _id: "10",
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      phone_number: "+1 (555) 012-3456",
      address: "741 Ash Street, San Jose, CA 95101",
      is_admin: "No",
      department: "Product",
      status: "Active",
      role: "PM",
      joined_date: "2023-05-14",
      country: "USA",
    },
  ];

  const columns = [
    { label: "#", type: "number" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone_number", label: "Phone Number", hideOnMobile: true },
    { key: "address", label: "Address" },
    { key: "department", label: "Department" },
    { key: "status", label: "Status" },
    { key: "role", label: "Role" },
    { key: "joined_date", label: "Joined Date", hideOnMobile: true },
    { key: "country", label: "Country", hideOnMobile: true },
    { key: "is_admin", label: "Is Admin" },
    { label: "Actions", type: "action" },
  ];

  const handleMenu = () => [
    {
      label: "Edit",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      ),
      onClick: (row) => console.log("Edit", row),
    },
    {
      label: "View",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      onClick: (row) => console.log("View", row),
    },
    {
      label: "Delete",
      danger: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18" />
          <path d="M8 6V4h8v2" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      ),
      onClick: (row) => console.log("Delete", row),
    },
  ];

  return (
      <DataTable
        title="Users"
        rows={rows}
        columns={columns}
        maxHeight={420}
        mobileLayout="cards"
        theme={{ "--table-theme-color": "#4FAFA0" }}
        pagination={{
          showTopPagination: false,
          showBottomPagination: true,
          defaultPageSize: 10,
          pageSizeOptions: [5, 10, 25, 50],
        }}
        checkboxSelection={{ selected, setSelected, selectBy: "_id" }}
        handleMenu={handleMenu}
      />
  );
}

export default App;
