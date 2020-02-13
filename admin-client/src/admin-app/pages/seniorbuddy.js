import React, { useState, useEffect } from 'react';
import DynamicTable from '../components/dynamicTable';
import Popup from "reactjs-popup";
import Papa from 'papaparse';
import Swal from 'sweetalert2';
import { DeleteSB, GetSB, AddSB } from '../../api';
import { SingleUserSVG, GroupUserSVG, } from '../components/svgPath';
import Toolbar from '../components/toolbar';

export default () => {
  const [uploadedObject, setUploadedObject] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [loadedData, setLoadedData] = useState({});

  useEffect(() => {
    getSBData();
  }, []);

  const handleUploadFile = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        if (result.data.length) {
          if (result.data[0]['student'] && result.data[0]['senior buddy']) {
            // result.data.pop();
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

  const modalAdd = async (uploadedObject) => {
    let confirmation = await Swal.fire({
      title: 'Are you sure you want to add all pairs?',
      text: '',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes, add them!'
    });
    if (!confirmation.value) {
      setOpenModal(false);
      setUploadedObject({});
      return true
    };

    //todo: create user into database
    createSB(uploadedObject.data);
    setOpenModal(false);
    setUploadedObject({});
  }

  const modalCancel = async () => {
    let confirmation = await Swal.fire({
      title: 'Are you sure you want to cancel?',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes, cancel it!'
    });
    if (!confirmation.value) return true;
    setOpenModal(false);
    setUploadedObject({});
  }

  const createSB = async (sb) => {
    await DeleteSB().catch(async (err) => {
      let message = err.data;
      await Swal.fire('Not created!', message, 'error');
      return 0;
    });
    const failures = [];
    Swal.fire({ title: 'Creating', text: "", allowEscapeKey: false, allowOutsideClick: false, onOpen: () => { Swal.showLoading() } });
    for (let i = 0; i < sb.length; i++) {
      Swal.disableLoading();
      Swal.update({ text: `${i + 1}/${sb.length}` });
      Swal.enableLoading();
      await AddSB(sb[i]).catch((err) => { failures.push({ err: err.data, "data": sb[i] }) });
    }
    let constructTable = `<center>
    <br/><p><strong>The following pairs are not added!</strong></p><br/>
    <table style="width:50rem;border-collapse: collapse;border: 1px solid black;padding:5rem">
    <tr>
    <th style='text-align: left;border: 1px solid black; text-align:center;'>Type of error</th>
    <th style='text-align: left;border: 1px solid black; text-align:center;'>Student</th>
    <th style='text-align: left;border: 1px solid black; text-align:center;'>senior buddy</th>
    </tr>`;
    for (let i = 0; i < failures.length; i++) {
      constructTable += `<tr>
      <td style='border: 1px solid black; text-align:center;'>${failures[i].err}</td>
      <td style='border: 1px solid black; text-align:center;'>${failures[i].data.student}</td>
      <td style='border: 1px solid black; text-align:center;'>${failures[i].data['senior buddy']}</td>
      </tr>`
    }
    constructTable += "</table></center>";

    await Swal.fire({
      title: 'Updated!',
      width: 'auto',
      html: failures.length ? constructTable : "<p>All users are successfully added</p>",
      type: 'success'
    });
    getSBData();
  }

  const getSBData = () => {
    GetSB().then((res) => {
      setLoadedData({ ...res.data });
    }).catch(async (err) => {
      let message = err.data;
      await Swal.fire('Unable to fetch senior buddy!', message, 'error');
    });
  }

  const UploadButtonComponent = (props) => {
    return (
      <div className={`flex bg-grey-lighter ${props.class} ${props.className}`}>
        <label htmlFor="file" className="w-auto px-4 flex flex-row items-center justify-center px-auto py-2 bg-white text-blue rounded-full shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-white">
          <svg className="w-8 h-8 text-blue-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.13 80.13">
            <GroupUserSVG />
          </svg>
          <font className="ml-2 text-base leading-normal text-blue-500">Update and Replace Senior Buddy (from csv)</font>
        </label>
        <input type='file' id="file" name="file" className="hidden" accept=".csv" onChange={props.onChange} />
      </div>
    )
  }

  const ModalComponent = () => (
    <Popup
      contentStyle={{ width: '75%', minWidth: '60rem', maxHeight: '80%', borderRadius: 25, overflow: 'auto' }}
      open={openModal}
      modal
      closeOnDocumentClick={false}>
      <div className="w-full">
        <div className="flex flex-row justify-center px-5 pt-3">
          <button type="button" onClick={() => { modalAdd(uploadedObject) }}
            className="w-20 mr-3 text-lg bg-blue-600 hover:bg-blue-400 text-white py-1 px-2 rounded-full focus:outline-none focus:shadow-outline">
            Add
          </button>
          <button
            type="button" onClick={() => { modalCancel() }}
            className="w-20 text-lg bg-red-600 hover:bg-red-400 text-white py-1 px-2 rounded-full focus:outline-none focus:shadow-outline">
            Cancel
           </button>
        </div>
        <DynamicTable data={uploadedObject} />
      </div>
    </Popup>
  );

  return (
    <div>
      <div className="text-2xl">
        <div className="flex h-16 items-center overflow-x-hidden overflow-y-auto">
          <span className="text-blue-800">Senior Buddy Management</span>
        </div>
      </div>
      <div className="bg-divider" style={{ height: '0.1rem' }} />
      <div className="flex flex-col mt-4">
        <div className="px-3 py-4 flex justify-center select-auto ">
          <Toolbar>
            <UploadButtonComponent className="py-2 md:py-0 md:px-2 justify-center" onChange={(e) => { handleUploadFile(e.target.files[0]) }} />
          </Toolbar>
        </div>
        {/* TODO loading indicator before loaded */}
        <div className="overflow-x-auto h-full">
          <DynamicTable data={loadedData} />
        </div>
      </div>
      <ModalComponent />
    </div>
  )
}