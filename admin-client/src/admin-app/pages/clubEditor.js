import React, { useState, useEffect } from 'react';
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { GetClubInfo, EditClubInfo, UploadImage } from '../../api';
import { ADMIN_INFORMATION_URL } from '../../constants';
import Swal from 'sweetalert2';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



export default (props) => {
  const [clubInfo, setClubInfo] = useState({});
  const [contentState, setContentState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const loadData = () => {
      GetClubInfo(props.match.params.subject).then(async res => {
        setClubInfo(res.data[0]);
        const loadedContentRaw = res.data[0].rawEditor.length > 10 ? convertFromRaw(JSON.parse(res.data[0].rawEditor)) : '';
        if (loadedContentRaw) setContentState(EditorState.createWithContent(loadedContentRaw));
      }).catch(async err => {
        console.log(err);
        let message = err.data ? err.data : JSON.stringify(err);
        await Swal.fire('Failed to fetch information!', message, 'error');
      });
    };
    loadData();
  }, [props]);

  const handleEditorChange = (v) => {
    setContentState(v);
  }

  const handleSave = async () => {
    let confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to change the information for ${clubInfo.server_unique_name}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!'
    });
    if (!confirmation.value) return false;

    const data = JSON.stringify(convertToRaw(contentState.getCurrentContent(), null, 4));
    let clubNewInfo = { ...clubInfo, rawEditor: data }

    //save data
    Swal.fire({ title: 'Saving', allowEscapeKey: false, allowOutsideClick: false, onOpen: () => { Swal.showLoading() } });
    EditClubInfo(clubNewInfo).then(async (res) => {
      if (res.status === 200) await Swal.fire('Saved!', res.data, 'success');
      props.history.push(ADMIN_INFORMATION_URL);
    }).catch(async (err) => {
      let message = err.data ? err.data : JSON.stringify(err);
      await Swal.fire('Not saved!', message, 'error');
    }).finally(() => {
      // props.history.push(ADMIN_INFORMATION_URL);
    });
  }

  const handleChooseImage = (file) => {
    Swal.fire({ title: 'Uploading', allowEscapeKey: false, allowOutsideClick: false, onOpen: () => { Swal.showLoading() } });
    UploadImage(file).then(async (res) => {
      if (res.status === 200) {
        setClubInfo({ ...clubInfo, bannerImgLink: res.data });
        await Swal.fire('Uploaded!', 'Image has been uploaded.', 'success');
      }
    }).catch(async (err) => {
      let message = err.data;
      await Swal.fire('Not uploaded!', message, 'error');
    });
  }

  if (clubInfo)
    return (
      <div>
        <div className="text-2xl">
          <div className="flex h-16 items-center ">
            <span className="text-blue-800">Editor ({clubInfo.title})</span>
          </div>
        </div>
        <div className="bg-divider" style={{ height: '0.1rem' }} />
        <div className="flex flex-col mt-4">
          <div>
            <div className="flex items-center border-b border-b-2 border-teal-500 p-2 my-4">
              <div className="w-32">Title</div>
              <textarea className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text" rows="1" placeholder="title" value={clubInfo.title} onChange={(v) => {
                  setClubInfo({ ...clubInfo, title: v.target.value })
                }} />
            </div>
            <div className="flex items-center border-b border-b-2 border-teal-500 p-2 my-4">
              <div className="w-32">Type</div>
              <textarea className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text" rows="1" placeholder="type" value={clubInfo.server_unique_name} readOnly />
            </div>
            <div className="flex items-center border-b border-b-2 border-teal-500 p-2 my-4">
              <div className="w-32">Image</div>
              <label htmlFor="image-file" className="ml-4 w-32 bg-blue text-gray-800 rounded border-2 border-grey-900 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-lg py-1 px-4 inline-flex items-center">Select file
              <input className="hidden"
                  id="image-file" type="file" accept="image/*" placeholder="image" value={''} onChange={(e) => {
                    if(e.target.files) {
                      const file = e.target.files[0];
                      if (file.size < 1024*512) handleChooseImage(file);
                      else Swal.fire('Not uploaded!', "File size must be less than 500 KB. You may compress your image at https://tinyjpg.com.", 'error');
                      }
                  }} /></label>
              <textarea className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-5 leading-tight focus:outline-none"
                type="text" rows="1" placeholder="image url" value={clubInfo.bannerImgLink} readOnly />
            </div>
            <div className="flex items-center border-b border-b-2 border-teal-500 p-2 my-4">
              <div className="w-32">Contact link</div>
              <textarea className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text" rows="1" placeholder="contact link" value={clubInfo.contactLink} onChange={(e) => {
                  setClubInfo({ ...clubInfo, contactLink: e.target.value })
                }} />
            </div>
            <div className="flex items-center border-b border-b-2 border-teal-500 p-2 my-4">
              <div className="w-32">Summary</div>
              <textarea className="appearance-none bg-transparent h-48 border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text" placeholder="summary" value={clubInfo.summary}
                style={{ whiteSpace: 'normal', textAlign: 'justify', display: 'block', margin: 'auto' }}
                onChange={(v) => {
                  setClubInfo({ ...clubInfo, summary: v.target.value })
                }} />
            </div>
          </div>
          <div className="border-2 border-gray-400 p-3">
            <Editor
              wrapperClassName=""
              editorClassName=""
              editorStyle={{ height: '75vh' }}
              toolbarClassName=""
              editorState={contentState}
              onEditorStateChange={(v) => { handleEditorChange(v) }}
            />
          </div>
          <div className=" flex text-xl justify-center my-5">
            <button type="button" onClick={() => { handleSave() }}
              className="mr-3 bg-blue-600 hover:bg-blue-800 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
              Save all the changes
          </button>
          </div>
        </div>

      </div>
    )

  else return null;
}