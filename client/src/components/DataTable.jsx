"use client"

import { useState } from "react"

function DataTable({ records, onDelete, onSelect, selectedId }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" })

  // Function to handle sorting
  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Get sorted records
  const getSortedRecords = () => {
    const sortableRecords = [...records]
    if (sortConfig.key) {
      sortableRecords.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }
    return sortableRecords
  }

  // Helper function to get human-readable values
  const getReadableValue = (key, value) => {
    switch (key) {
      case "Sex":
        return value === 1 ? "Male" : "Female"
      case "ChestPainType":
        const chestPainTypes = ["TA", "ATA", "NAP", "ASY"]
        return chestPainTypes[value]
      case "RestingECG":
        const ecgTypes = ["Normal", "ST", "LVH"]
        return ecgTypes[value]
      case "ExerciseAngina":
        return value === 1 ? "Yes" : "No"
      case "FastingBS":
        return value === 1 ? "> 120 mg/dl" : "< 120 mg/dl"
      default:
        return value
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Health Records</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Age",
                "Sex",
                "ChestPainType",
                "RestingBP",
                "Cholesterol",
                "RestingECG",
                "MaxHR",
                "ExerciseAngina",
                "ST_Slope",
              ].map((column) => (
                <th
                  key={column}
                  onClick={() => requestSort(column)}
                  className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  {column}
                  {sortConfig.key === column && (
                    <span className="ml-1">{sortConfig.direction === "ascending" ? "↑" : "↓"}</span>
                  )}
                </th>
              ))}
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getSortedRecords().map((record) => (
              <tr
                key={record.id}
                className={`hover:bg-gray-50 ${selectedId === record.id ? "bg-green-50" : ""}`}
                onClick={() => onSelect(record)}
              >
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{record.Age}</td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                  {getReadableValue("Sex", record.Sex)}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                  {getReadableValue("ChestPainType", record.ChestPainType)}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{record.RestingBP}</td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{record.Cholesterol}</td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                  {getReadableValue("RestingECG", record.RestingECG)}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{record.MaxHR}</td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                  {getReadableValue("ExerciseAngina", record.ExerciseAngina)}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{record.ST_Slope}</td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(record.id)
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {records.length === 0 && (
        <div className="text-center py-4 text-gray-500">No records found. Add a new record to get started.</div>
      )}
    </div>
  )
}

export default DataTable
