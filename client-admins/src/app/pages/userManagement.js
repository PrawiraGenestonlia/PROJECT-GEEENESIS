import React, { useState } from 'react';
import DynamicTable from '../components/dynamicTable';
import { sampleDataUserManagement, uploadCSV } from '../sampleData';
import Popup from "reactjs-popup";
import Papa from 'papaparse';

export default () => {
  const [uploadedObject, setUploadedObject] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const handleSave = (user) => {
    console.log("save", user);
  }

  const handleDelete = (user) => {
    console.log("delete", user);
  }

  const handleUploadFile = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        if (result.data.length) {
          if (result.data[0]['Name'] && result.data[0]['Email']) {
            let uploaded = {
              columns: Object.keys(result.data[0]),
              data: result.data
            }
            setUploadedObject({ ...uploaded });
            setOpenModal(true);
          }
        }

      }
    });

  }

  const modalAdd = (uploadedObject) => {
    //todo: create user into database

  }

  const modalCancel = () => {
    setOpenModal(false);
    setUploadedObject({});
  }

  const RenderUploadButton = (props) => {
    return (
      <div class={`flex bg-grey-lighter ${props.class} ${props.className}`}>
        <label htmlFor="file" class="w-auto px-4 flex flex-row items-center justify-center px-auto py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-white">
          <svg class="w-8 h-8 text-blue-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <font class="ml-2 text-base leading-normal text-blue-500">Add user</font>
        </label>
        <input type='file' id="file" name="file" class="hidden" accept=".csv" onChange={props.onChange} />
      </div>
    )
  }

  const RenderModal = () => (
    <Popup
      contentStyle={{ width: '50%', minWidth: '40rem', maxHeight: '80%', borderRadius: 25, overflow: 'auto' }}
      open={openModal}
      modal
      closeOnDocumentClick={false}>
      <div class="w-full">
        <div class="flex flex-row justify-center px-5 pt-3">
          <button type="button" onClick={() => { modalAdd(uploadedObject) }}
            class="w-20 mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
            Add
          </button>
          <button
            type="button" onClick={() => { modalCancel() }}
            class="w-20 text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
            Cancel
           </button>
        </div>
        <DynamicTable data={uploadedObject} handleSave={handleSave} handleDelete={handleDelete} />
      </div>
    </Popup>
  );

  return (
    <div>
      <div class="text-2xl">
        <div class="flex h-16 items-center ">
          <span class="text-blue-800">User Management</span>
        </div>
      </div>
      <div class="bg-divider" style={{ height: '0.1rem' }} />
      <div class="flex flex-col mt-4">

        <div class="px-3 py-4 flex justify-center select-auto">
          {/* toolbar */}
          <div class="flex flex-row h-20 items-center bg-indigo-100 w-full text-md shadow-md rounded mb-4">
            <div class="pl-5">Tools</div>
            <RenderUploadButton class="px-10" onChange={(e) => { handleUploadFile(e.target.files[0]) }} />
            <RenderModal />
          </div>
        </div>
        <div>
          <DynamicTable data={sampleDataUserManagement} handleSave={handleSave} handleDelete={handleDelete} />
        </div>
      </div>
    </div >
  )
}