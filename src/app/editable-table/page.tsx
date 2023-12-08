"use client";

import { useMemo, useState } from "react";
import {
  createColumnHelper,
  useReactTable,
  flexRender,
  getCoreRowModel,
  RowData,
  ColumnDef,
} from "@tanstack/react-table";
import DefaultCell from "@/client/EditableTable/DefaultCell";

type Person = {
  firstName: string;
  lastName: string;
};

// From editable model example
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

const defaultColumn: Partial<ColumnDef<Person>> = {
  cell: DefaultCell,
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
  },
  {
    firstName: "tandy",
    lastName: "miller",
  },
];

const columnHelper = createColumnHelper<Person>();

export default function EditableTable() {
  const [data, setData] = useState(() => [...defaultData]);

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        header: "Label",
        // Don't need a cell renderer as we have the default one
      },
      {
        header: "Area",
      },
      {
        header: "Depth",
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        console.log("updating data");
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });
  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
