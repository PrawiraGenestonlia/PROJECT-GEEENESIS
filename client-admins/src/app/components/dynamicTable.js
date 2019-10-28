import React, { useState, } from 'react';
import Swal from 'sweetalert2';

const createArr = (num) => {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push("readonly");
  }
  return arr;
}

function DynamicTable(props) {
  const [data, setData] = useState(Object.keys(props.data).length ? props.data : { columns: [], data: [] });
  const [columns] = useState(data.columns); // setColumns omitted
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

  const handleSaveClick = async (index) => {
    //save confirmation
    let confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: `${data.data[index].Name} - ${data.data[index].Email} (${data.data[index].Role.current})`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!'
    });
    if (!confirmation.value) return handleCancel(index);
    let tempData = isReadOnly;
    tempData[index] = "readonly";
    setIsReadOnly([...tempData]);
    handleSave(data.data[index]);
    await Swal.fire('Saved!', 'User has been updated.', 'success');
  }

  const handleDeleteClick = async (index) => {
    //delete confirmation
    let confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: `${data.data[index].Name} - ${data.data[index].Email} (${data.data[index].Role.current})`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    if (!confirmation.value) return handleCancel(index);
    handleDelete(data.data[index]);
    let tempData = data;
    tempData.data.splice(index, 1);
    setData({ ...tempData });
    let tempReadOnly = isReadOnly;
    tempReadOnly.splice(index, 1);
    setIsReadOnly([...tempReadOnly]);
    await Swal.fire('Deleted!', 'User has been deleted.', 'success');
  }

  const handleCancel = (index) => {
    let tempData = isReadOnly;
    tempData[index] = "readonly";
    setIsReadOnly([...tempData]);
  }

  const handleSave = (user) => {
    if (props.handleSave) props.handleSave(user);
  }

  const handleDelete = (user) => {
    if (props.handleDelete) props.handleDelete(user);
  }

  return (
    <div className="text-gray-900">
      <div className="px-3 py-4 flex justify-center select-auto">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr className="border-b bg-blue-200" >
              {data.columns.map((column, index) => {
                return <th key={index} className="text-left py-3 px-5" >{column}</th>
              })}
            </tr>
            {data.data.map((data, index) => {
              return (
                <tr key={index} className={index % 2 ? "border-b hover:bg-orange-100 bg-gray-100" : "border-b hover:bg-orange-100 bg-white"}>
                  {columns.map((column, j) => {
                    return (
                      <td key={j} className="py-3 px-5" style={{ width: `${100 / columns.length}%` }}>
                        {typeof data[column] === 'object' ?
                          <div style={{ pointerEvents: isReadOnly[index] ? 'none' : 'auto' }}>
                            <select value={data[column].current} onChange={(e) => { handleChangeOptions(e.target.value, index, column) }} className="bg-transparent">
                              {data[column].options.map((option, index) => {
                                return <option key={index} value={option}>{option}</option>
                              })}
                            </select>
                          </div> :
                          <div>{data[column] === "action" ?
                            <div>
                              {
                                isReadOnly[index] ?
                                  <div>
                                    <button type="button" onClick={() => { handleEditClick(index) }}
                                      className="mr-3 text-sm bg-teal-500 hover:bg-teal-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                      Edit
                                    </button>
                                  </div>
                                  :
                                  <div>
                                    <button type="button" onClick={() => { handleSaveClick(index) }}
                                      className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                      Save
                                    </button>
                                    <button
                                      type="button" onClick={() => { handleDeleteClick(index) }}
                                      className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                      Delete
                                </button>
                                  </div>
                              }

                            </div>
                            :
                            <div>
                              <input readOnly={isReadOnly[index]} type="text" value={data[column]} onChange={(e) => { handleInputChange(e.target.value, index, column) }} className="bg-transparent" />
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