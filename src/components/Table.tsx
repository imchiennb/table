import React from "react";

export type TTableProps = {
  name: string;
};

export const Table = ({ name }: TTableProps) => {
  return <div>Table: {name}</div>;
};
