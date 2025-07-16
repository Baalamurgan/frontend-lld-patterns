"use client";

import { memo, useCallback, useMemo, useState } from "react";
import { useDebouncedValue } from "../utils/useDebouncedValue";
import { FixedSizeList as List } from "react-window";

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  role: "admin" | "user" | "guest";
};

type TableProps = {
  data: User[];
};

const Table = (props: TableProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [roleFilterValue, setRoleFilterValue] = useState("");
  const debouncedSearchValue = useDebouncedValue(
    searchValue.toLowerCase(),
    300
  );

  const handleSearchChange = useCallback(
    (value: string) => setSearchValue(value),
    []
  );

  const handleRoleFilterChange = useCallback(
    (value: string) => setRoleFilterValue(value),
    []
  );

  console.log("Main Table re-render");

  return (
    <div>
      <SearchBox value={searchValue} onChange={handleSearchChange} />
      <RoleFilter value={roleFilterValue} onChange={handleRoleFilterChange} />
      <DataTable
        debouncedSearchValue={debouncedSearchValue}
        roleFilterValue={roleFilterValue}
        data={props.data}
      />
    </div>
  );
};

const SearchBox = memo(
  ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
    console.log("Input re-render");

    return (
      <div>
        <label htmlFor="search" style={{ display: "block", marginBottom: 4 }}>
          Enter your search query:
        </label>
        <input
          id="search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search users by name or email"
          aria-label="Search users by name or email"
          autoComplete="off"
          style={{ padding: 8, width: "100%", maxWidth: 300 }}
        />
      </div>
    );
  }
);

const RoleFilter = memo(
  ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
    console.log("Role dropdown re-render");

    return (
      <div>
        <label htmlFor="role" style={{ display: "block", marginBottom: 4 }}>
          Choose role
        </label>
        <select
          name="role"
          id="role"
          aria-label="Filter by role"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="guest">Guest</option>
        </select>
      </div>
    );
  }
);

type DataTableProps = {
  debouncedSearchValue: string;
  roleFilterValue: string;
  data: User[];
};

const DataTable = memo((props: DataTableProps) => {
  console.log("DataTable re-render");

  const data = useMemo(() => {
    return props.data.filter(
      (d) =>
        (props.debouncedSearchValue
          ? d.name.toLowerCase().includes(props.debouncedSearchValue) ||
            d.email.toLowerCase().includes(props.debouncedSearchValue)
          : true) &&
        (props.roleFilterValue ? d.role === props.roleFilterValue : true)
    );
  }, [props.roleFilterValue, props.debouncedSearchValue, props.data]);

  const columns = useMemo(() => {
    return data.length > 0 ? Object.keys(data[0]) : [];
  }, [data]);

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const row = data[index];
      if (!row) return null;

      return (
        <div style={style}>
          <div
            key={row.id}
            tabIndex={-1}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
              width: "100%",
            }}
          >
            {columns.map((key, index) => (
              <div
                key={index}
                style={{
                  textAlign: "left",
                  padding: "8px",
                  borderBottom: "1px solid #eee",
                  maxWidth: 500,
                  minWidth: 150,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={String(row[key as keyof User])}
              >
                {row[key as keyof User]}
              </div>
            ))}
          </div>
        </div>
      );
    },
    [data, columns]
  );

  return (
    <div>
      {data.length > 0 ? (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
              width: "100%",
            }}
          >
            {columns.map((key) => (
              <div
                key={key}
                style={{
                  textAlign: "left",
                  borderBottom: "2px solid #ccc",
                  padding: "8px",
                  maxWidth: 500,
                  minWidth: 150,
                }}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </div>
            ))}
          </div>
          <List
            height={250}
            itemCount={data.length}
            itemSize={35}
            width={"100%"}
          >
            {Row}
          </List>
        </div>
      ) : (
        <p>No Data found</p>
      )}
    </div>
  );
});

export default Table;
