import React, { ReactNode, useLayoutEffect, useState } from "react";

export type Column<T> = {
  key: keyof (T & { action: string });
  header: string | (() => ReactNode);
  span?: {
    row?: number;
    col?: number;
  };
  ellipsis?: {
    line: number;
  };
  tooltip?: {
    content: string | ReactNode;
  };
  icon?: {
    before?: ReactNode;
    after?: ReactNode;
  };
  style?: React.CSSProperties;
  minWidth?: number;
  sortable?: {
    handler: (a: T, b: T) => boolean;
  };
  render?: (item: T) => ReactNode;
  width?: number;
};

export type TableProps<T> = {
  columns: Column<T>[];
  data?: T[];
  className?: string;
  style?: React.CSSProperties;
  headerAlign?: "left" | "center" | "right";
  apiFetching?: () => Promise<T[]>;
  handlers?: {
    onDelete?: (props: { params?: any; payload?: any }) => {
      onSuccess: (message: string) => void;
      onError: (message: string) => void;
    };
    onUpdate?: (props: { params?: any; payload?: any }) => {
      onSuccess: (message: string) => void;
      onError: (message: string) => void;
    };
  };
};

export const Table = <T extends {}>({
  columns,
  className,
  style,
  headerAlign = "left",
  apiFetching,
  data: propsData,
}: TableProps<T>) => {
  const [data, setData] = useState<T[]>([]);

  useLayoutEffect(() => {
    const handleFetchData = async () => {
      if (propsData) {
        setData(propsData);
      }
      if (apiFetching) {
        const data = await apiFetching();
        setData(data);
      }
    };

    handleFetchData();
  }, []);

  const getCellStyles = (item: Column<T>): React.CSSProperties => {
    if (item.ellipsis && item.ellipsis.line)
      return {
        overflow: "hidden",
        textOverflow: "ellipsis",
        WebkitLineClamp: item.ellipsis.line,
        width: item.width,
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
      };

    return {};
  };

  const getHeaderStyles = (): React.CSSProperties => {
    return {
      textAlign: headerAlign,
    };
  };
  const renderHeader = () => {
    return (
      <tr>
        {columns.map((column, index) => {
          return (
            <th
              key={`${column.header} ${index}`}
              style={{ ...getHeaderStyles() }}
            >
              {typeof column.header === "string"
                ? column.header
                : column.header?.()}
            </th>
          );
        })}
      </tr>
    );
  };

  const renderBody = () => {
    return data.map((item) => {
      return (
        <tr>
          {columns.map((column) => {
            return (
              <td
                style={{
                  ...column.style,
                  minWidth: column.minWidth,
                }}
              >
                {!!column.render ? (
                  <div style={{ ...getCellStyles(column) }}>
                    {column.render(item)}
                  </div>
                ) : (
                  <>{column.key === "action" ? null : item?.[column.key]}</>
                )}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <table className={className} style={style}>
      {/* Render Heading */}
      <thead>{renderHeader()}</thead>
      {/* Render Body */}
      <tbody>{renderBody()}</tbody>
    </table>
  );
};
