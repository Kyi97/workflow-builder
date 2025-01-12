import React, { useMemo } from "react";

const TableComponent = ({ columns, data, onDetailsClick }) => {
  // Render table rows
  const rows = useMemo(() => {
    return data.length > 0 ? (
      data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {columns.map((col, colIndex) => (
            <td key={colIndex} className="table-cell">
              {row[col.accessor]}
            </td>
          ))}
          <td className="table-cell">
            <button
              className="text-blue-400"
              onClick={() => onDetailsClick(row)}
              aria-label={`View details for ${row.name}`}
            >
              Details
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td
          colSpan={columns.length + 1}
          className="font-medium-gray px-6 py-4 text-center  "
        >
          No data available.
        </td>
      </tr>
    );
  }, [columns, data, onDetailsClick]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full mt-4 rounded-lg default-bg">
        <thead className=" border-b border-gray-200 font-medium">
          <tr>
            {columns.map((col, index) => (
              <th key={index} scope="col" className="table-header">
                {col.header}
              </th>
            ))}
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody className="font-medium-gray">{rows}</tbody>
      </table>
    </div>
  );
};

export default React.memo(TableComponent);
