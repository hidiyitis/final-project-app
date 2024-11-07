import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Switch } from "@radix-ui/react-switch"; // Adjust based on the actual Switch component you're using

type UserStatus = "active" | "nonActive" | "paused";

interface UserRow {
  key: string;
  name: string;
  status: UserStatus;
  email: string;
  image: string;
  visited: string;
}

const initialRows: UserRow[] = [
  {
    key: "1",
    name: "Hidayatus Solikhin",
    status: "active",
    email: "hidayatus@gmail.com",
    image: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc",
    visited: "2024-11-01",
  },
  {
    key: "2",
    name: "Jeiver Junior Lahilote",
    status: "nonActive",
    email: "jeiver@example.com",
    image: "https://images.unsplash.com/photo-1560807707-8cc77767d783",
    visited: "2024-11-01",
  },
  {
    key: "3",
    name: "Irda Syahrani Tamsir",
    status: "active",
    email: "irdasyahrani@example.com",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    visited: "22-05-2024",
  },
  {
    key: "4",
    name: "Najla Mahfuzah Busran",
    status: "active",
    email: "najlamahfuzah@example.com",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    visited: "22-05-2024",
  },
  {
    key: "5",
    name: "Nadya Widdy astuti",
    status: "active",
    email: "nadyawiddy@example.com",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    visited: "22-05-2024",
  },
  {
    key: "6",
    name: "Grace Sihotang",
    status: "nonActive",
    email: "gracesihotang@example.com",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    visited: "22-05-2024",
  },
];

export default function Tabel({ onSelectAdmin }) {
  const [rows, setRows] = useState(initialRows);
  const [selectedRowKey, setSelectedRowKey] = useState<string | null>(null); // Track selected row

  const toggleStatus = (key: string) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.key === key
          ? { ...row, status: row.status === "active" ? "nonActive" : "active" }
          : row
      )
    );
  };

  const handleRowClick = (row: UserRow) => {
    setSelectedRowKey(row.key);
    onSelectAdmin(row);
  };

  return (
    <Table aria-label="User management table with switch for status">
      <TableHeader>
        <TableColumn style={{ width: "30%" }}>NAME</TableColumn>
        <TableColumn style={{ width: "20%" }}>STATUS</TableColumn>
        <TableColumn style={{ width: "30%" }}>EMAIL</TableColumn>
      </TableHeader>
      <TableBody>
        {rows.map((item) => (
          <TableRow
            key={item.key}
            onClick={() => handleRowClick(item)}
            style={{
              backgroundColor:
                item.key === selectedRowKey ? "#e0f2fe" : "white", // Light blue when selected
              cursor: "pointer",
            }}
          >
            <TableCell>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    marginRight: 10,
                  }}
                />
                {item.name}
              </div>
            </TableCell>
            <TableCell>
              <Switch
                checked={item.status === "active"}
                onCheckedChange={() => toggleStatus(item.key)}
                className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
                  item.status === "active" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <span className="sr-only">Toggle status</span>
                <span
                  className={`${
                    item.status === "active" ? "translate-x-6" : "translate-x-1"
                  } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                />
                <span className="pl-5 ml-10 text-sm font-medium">
                  {item.status === "active" ? "Active" : "NonActive"}
                </span>
              </Switch>
            </TableCell>
            <TableCell>{item.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
