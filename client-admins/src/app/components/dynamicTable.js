import React, { useState, useEffect } from 'react';

const createArr = (num) => {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push("readonly");
  }
  return arr;
}

function DynamicTable(props) {
  const [data, setData] = useState(props.data ? props.data : { columns: [], data: [] });
  const [columns, setColumns] = useState(data.columns);
  const [isReadOnly, setIsReadOnly] = useState(createArr(data.data.length));

  const handleInputChange = (value, index, column) => {
    let tempData = data;
    tempData.data[index][column] = value;
    setData({ ...tempData });
  }

  const handleChangeOptions = (value, index, column) => {
    let tempData = data;
    tempData.data[index][column].current = value;
    setData({ ...tempData });
  }

  const handleEditClick = (index) => {
    let tempData = isReadOnly;
    tempData[index] = false;
    setIsReadOnly([...tempData]);
  }

  const handleSaveClick = (index) => {
    let tempData = isReadOnly;
    tempData[index] = "readonly";
    setIsReadOnly([...tempData]);
    handleSave(data.data[index]);
  }

  const handleDeleteClick = (index) => {
    //todo confirmation
    handleDelete(data.data[index]);
    let tempData = data;
    tempData.data.splice(index, 1);
    setData({ ...tempData });
    let tempReadOnly = isReadOnly;
    tempReadOnly.splice(index, 1);
    setIsReadOnly([...tempReadOnly]);
  }

  const handleSave = (user) => {
    if (props.handleSave) props.handleSave(user);
  }

  const handleDelete = (user) => {
    if (props.handleDelete) props.handleDelete(user);
  }

  return (
    <div class="text-gray-900">
      <div class="px-3 py-4 flex justify-center select-auto">
        <table class="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr class="border-b bg-blue-200" >
              {data.columns.map(column => {
                return <th class="text-left py-3 px-5" >{column}</th>
              })}
            </tr>
            {data.data.map((data, index) => {
              return (
                <tr class={index % 2 ? "border-b hover:bg-orange-100 bg-gray-100" : "border-b hover:bg-orange-100 bg-white"}>
                  {columns.map(column => {
                    return (
                      <td class="py-3 px-5" style={{ width: `${100 / columns.length}%` }}>
                        {typeof data[column] === 'object' ?
                          <div style={{ pointerEvents: isReadOnly[index] ? 'none' : 'auto' }}>
                            <select value={data[column].current} onChange={(e) => { handleChangeOptions(e.target.value, index, column) }} class="bg-transparent">
                              {data[column].options.map(option => {
                                return <option value={option}>{option}</option>
                              })}
                            </select>
                          </div> :
                          <div>{data[column] == "action" ?
                            <div>
                              {
                                isReadOnly[index] ?
                                  <div>
                                    <button type="button" onClick={() => { handleEditClick(index) }}
                                      class="mr-3 text-sm bg-teal-500 hover:bg-teal-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                      Edit
                                    </button>
                                  </div>
                                  :
                                  <div>
                                    <button type="button" onClick={() => { handleSaveClick(index) }}
                                      class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                      Save
                                    </button>
                                    <button
                                      type="button" onClick={() => { handleDeleteClick(index) }}
                                      class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                      Delete
                                </button>
                                  </div>
                              }

                            </div>
                            :
                            <div>
                              <input readonly={isReadOnly[index]} type="text" value={data[column]} onChange={(e) => { handleInputChange(e.target.value, index, column) }} class="bg-transparent" />
                            </div>
                          }</div>
                        }
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DynamicTable;