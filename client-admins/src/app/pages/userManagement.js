import React, { useState, useEffect } from 'react';
import DynamicTable from '../components/dynamicTable';
// import { sampleDataUserManagement2, } from '../sampleData';
import Popup from "reactjs-popup";
import Papa from 'papaparse';
import Swal from 'sweetalert2';
import { AdminGetUser, AdminDeleteUser } from '../api';
import { GroupUserSVG, ToolsSVG } from '../components/svgPath';

export default () => {
  const [uploadedObject, setUploadedObject] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [loadedUser, setLoaderUser] = useState({});

  useEffect(() => {
    getUser();
    // return () => {
    //   cleanup
    // };
  }, []);

  const handleSave = (user) => {
    console.log("save", user);
  }

  const handleDelete = async (user) => {
    // console.log("delete", user);
    AdminDeleteUser(user._id).then(async (res) => {
      if (res.status === 200) await Swal.fire('Deleted!', 'User has been deleted.', 'success');
    }).catch(async (err) => {
      let message = err.data;
      await Swal.fire('Not deleted!', message, 'error');
    }).finally(() => {
      getUser();
    })
  }

  const handleUploadFile = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        if (result.data.length) {
          if (result.data[0]['name'] && result.data[0]['email']) {
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
      title: 'Are you sure you want to add all users?',
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

  const getUser = () => {
    AdminGetUser().then((res) => {
      setLoaderUser({ ...res.data });
    }).catch((err) => {
      alert(err);
    })
  }

  const RenderUploadButton = (props) => {
    return (
      <div className={`flex bg-grey-lighter ${props.class} ${props.className}`}>
        <label htmlFor="file" className="w-auto px-4 flex flex-row items-center justify-center px-auto py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-white">
          <svg className="w-8 h-8 text-blue-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80.13 80.13">
            <GroupUserSVG />
          </svg>
          <font className="ml-2 text-base leading-normal text-blue-500">Add user (from csv)</font>
        </label>
        <input type='file' id="file" name="file" className="hidden" accept=".csv" onChange={props.onChange} />
      </div>
    )
  }

  const RenderModal = () => (
    <Popup
      contentStyle={{ width: '50%', minWidth: '40rem', maxHeight: '80%', borderRadius: 25, overflow: 'auto' }}
      open={openModal}
      modal
      closeOnDocumentClick={false}>
      <div className="w-full">
        <div className="flex flex-row justify-center px-5 pt-3">
          <button type="button" onClick={() => { modalAdd(uploadedObject) }}
            className="w-20 mr-3 text-sm bg-blue-600 hover:bg-blue-400 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
            Add
          </button>
          <button
            type="button" onClick={() => { modalCancel() }}
            className="w-20 text-sm bg-red-600 hover:bg-red-400 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
            Cancel
           </button>
        </div>
        <DynamicTable data={uploadedObject} handleSave={handleSave} handleDelete={handleDelete} />
      </div>
    </Popup>
  );

  return (
    <div>
      <div className="text-2xl">
        <div className="flex h-16 items-center ">
          <span className="text-blue-800">User Management</span>
        </div>
      </div>
      <div className="bg-divider" style={{ height: '0.1rem' }} />
      <div className="flex flex-col mt-4">

        <div className="px-3 py-4 flex justify-center select-auto">
          {/* toolbar */}
          <div className="flex flex-row h-20 items-center bg-indigo-100 w-full text-md shadow-md rounded mb-4">
            <div className="pl-5">
              <svg className="w-10 h-10 text-black" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1708 1708.7495">
                <ToolsSVG />
              </svg>
            </div>
            <RenderUploadButton className="px-5" onChange={(e) => { handleUploadFile(e.target.files[0]) }} />
            <RenderModal />
          </div>
        </div>
        <div>
          <DynamicTable data={loadedUser} options={['superadmin', 'clubadmin', 'student', 'mentor']} handleSave={handleSave} handleDelete={handleDelete} />
          {/* <DynamicTable data={sampleDataUserManagement2} handleSave={handleSave} handleDelete={handleDelete} /> */}
        </div>
      </div>
    </div >
  )
}