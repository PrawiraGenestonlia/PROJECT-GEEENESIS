import React from 'react';
import DynamicTable from '../components/dynamicTable';
import { sampleDataUserManagement } from '../sampleData';


export default () => {

  const handleSave = (user) => {
    console.log("save", user);
  }

  const handleDelete = (user) => {
    console.log("delete", user);
  }

  const RenderUploadButton = (props) => {
    return (
      <div class="flex bg-grey-lighter">
        <label class="w-32 flex flex-col items-center justify content px-auto py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-white">
          <svg class="w-8 h-8 text-blue-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <font class="mt-2 text-base leading-normal text-blue-500">Import</font>
          <input type='file' class="hidden" />
        </label>
      </div>
    )
  }

  return (
    <div>
      <div class="text-2xl">
        <div class="flex h-16 items-center ">
          <span class="text-blue-800">User Management</span>
        </div>
      </div>
      <div class="bg-divider" style={{ height: '0.1rem' }} />
      <div class="flex flex-col mt-4">
        <RenderUploadButton />
        <div>
          <DynamicTable data={sampleDataUserManagement} handleSave={handleSave} handleDelete={handleDelete} />
        </div>
      </div>
    </div>
  )
}