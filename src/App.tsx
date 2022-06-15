import React, { useEffect, useState } from "react";
import { Column, Table } from "./components";

type DataRow = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: number;
  website: string;
  address: {
    street: string;
  };
};

const App = () => {
  // An example, how to use Table component.

  const columns: Column<DataRow>[] = [
    {
      key: "id",
      header: "🌹 ID",
      minWidth: 50,
      tooltip: {
        content: "This is an tooltip",
      },
      sortable: {
        handler: (a, b) => {
          return a.id > b.id;
        },
      },
    },
    {
      key: "name",
      header: "🙌 Name",
      tooltip: {
        content: "This is an tooltip",
      },
      ellipsis: {
        line: 3,
      },
      render: (item) => <>{item.name}</>,
      style: {
        wordBreak: "break-word",
      },
    },
    {
      key: "username",
      header: "🐱‍💻 @username",
      span: {
        row: 3,
        col: 2,
      },
      tooltip: {
        content: "This is an tooltip",
      },
      // render: (item) => <p>{JSON.stringify(item)} </p>,
    },
    {
      key: "email",
      header: "🐱‍🐉 Email",
      tooltip: {
        content: "This is an tooltip",
      },
      // render: (item) => <p>{JSON.stringify(item)} </p>,
    },
    {
      key: "phone",
      header: "🐱‍👓 Phone",
      tooltip: {
        content: "This is an tooltip",
      },
      // render: (item) => <p>{JSON.stringify(item)} </p>,
    },
    {
      key: "website",
      header: "🐱‍🚀 Website",
      tooltip: {
        content: "This is an tooltip",
      },
      // render: (item) => <p>{JSON.stringify(item)} </p>,
    },
    {
      key: "address",
      header: () => <div>Address 🌟</div>,
      tooltip: {
        content: "This is an tooltip",
      },
      render: (item) => <p>Address: {item.website} </p>,
    },
    {
      key: "action",
      header: () => <div>🐱 Action</div>,
      minWidth: 150,
      tooltip: {
        content: "This is an tooltip",
      },
      render: (item) => (
        <>
          <button
            onClick={() => {
              alert(JSON.stringify(item));
            }}
          >
            Edit
          </button>
          <button>Delete</button>
        </>
      ),
    },
  ];

  return (
    <>
      <Table<DataRow>
        columns={columns}
        style={{ width: "100%" }}
        apiFetching={() =>
          fetch("https://jsonplaceholder.typicode.com/users").then((response) =>
            response.json()
          )
        }
        handlers={{
          onDelete: ({ params: {}, payload: {} }) => ({
            onSuccess: (message) => {
              console.log({ message });
            },
            onError: (error) => {
              console.log({ error });
            },
          }),
          onUpdate: ({ params: {}, payload: {} }) => ({
            onSuccess: (message) => {
              console.log({ message });
            },
            onError: (error) => {
              console.log({ error });
            },
          }),
        }}
      />
    </>
  );
};

export default App;
