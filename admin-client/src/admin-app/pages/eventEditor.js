import React, { useState, useEffect } from 'react';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { GetEmail, CreateEvent, GetEvent, EditEvent, UploadImage } from '../../api';
import { ADMIN_EVENTMANAGEMENT_URL } from '../../constants';
import Swal from 'sweetalert2';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const defaultValue = {
  _id: '',
  title: '',
  uniqueName: '',
  description: '',
  location: '',
  start: new Date(),
  end: new Date(),
  startTime: '',
  endTime: '',
  borderColor: '#aaaaaa',
  backgroundColor: '#aaaaaa',
  rawEditor: '',
  signUpLink: '',
  imageUrl: '',
  venue: '',
  createdBy: '',
  tags: []
};

export default (props) => {
  const [eventInfo, setEventInfo] = useState(defaultValue);
  const [contentState, setContentState] = useState(EditorState.createEmpty());
  const [inputColor, setInputColor] = useState('#aaaaaa');


  useEffect(() => {
    const obtainCreator = () => {
      if (props.match.params.subject === "new") {
        GetEmail().then(res => { setEventInfo(e => { return { ...e, createdBy: res.data } }) }).catch(err => console.log(err));
      }
    }
    const loadData = () => {
      GetEvent({ eventUniqueName: props.match.params.subject }).then(async res => {
        let pickedDate = {
          start: new Date(res.data[0].start),
          end: new Date(res.data[0].end),
          startTime: new Date(res.data[0].start),
          endTime: new Date(res.data[0].end),
        }
        setEventInfo({ ...res.data[0], ...pickedDate });
        const loadedContentRaw = res.data[0].rawEditor.length > 10 ? convertFromRaw(JSON.parse(res.data[0].rawEditor)) : '';
        if (loadedContentRaw) setContentState(EditorState.createWithContent(loadedContentRaw));
      }).catch(async err => {
        console.log(err);
        let message = err.data ? err.data : JSON.stringify(err);
        await Swal.fire('Failed to fetch information!', message, 'error');
      });
    };
    if (props.match.params.subject !== "new") {
      loadData();
    }
    obtainCreator();
  }, [props]);

  const handleEditorChange = (v) => {
    setContentState(v);
  }

  const handleSave = async () => {
    let confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to change the information for ${eventInfo.server_unique_name}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!'
    });
    if (!confirmation.value) return false;

    const data = JSON.stringify(convertToRaw(contentState.getCurrentContent(), null, 4));
    let eventObj = { ...eventInfo, rawEditor: data }

    //save data
    Swal.fire({ title: 'Saving', allowEscapeKey: false, allowOutsideClick: false, onOpen: () => { Swal.showLoading() } });
    if (props.match.params.subject !== "new") {
      EditEvent(eventObj).then(async (res) => {
        if (res.status === 200) await Swal.fire('Saved!', res.data, 'success');
        props.history.push(ADMIN_EVENTMANAGEMENT_URL);
      }).catch(async (err) => {
        let message = err.data ? err.data : JSON.stringify(err);
        await Swal.fire('Not saved!', message, 'error');
      }).finally(() => {
        // props.history.push(ADMIN_EVENTMANAGEMENT_URL);
      });
    }
    else {
      CreateEvent(eventObj).then(async (res) => {
        if (res.status === 200) await Swal.fire('Created!', res.data, 'success');
        props.history.push(ADMIN_EVENTMANAGEMENT_URL);
      }).catch(async (err) => {
        let message = err.data ? err.data : JSON.stringify(err);
        await Swal.fire('Not created!', message, 'error');
      }).finally(() => {
        // props.history.push(ADMIN_EVENTMANAGEMENT_URL);
      });
    }

  }

  const handlePickedDate = (e) => {
    let converted = [new Date(e[0]), new Date(e[1])];
    let pickedDate = {
      start: converted[0],
      end: converted[1],
      startTime: converted[0],
      endTime: converted[1],
      uniqueName: props.match.params.subject !== "new" ? props.match.params.subject : eventInfo.title.replace(/ /g, '').toLowerCase() + "-" + formatDate(converted[0])
    }
    setEventInfo({ ...eventInfo, ...pickedDate });
  }

  const handleChooseImage = (file) => {
    Swal.fire({ title: 'Uploading', allowEscapeKey: false, allowOutsideClick: false, onOpen: () => { Swal.showLoading() } });
    UploadImage(file).then(async (res) => {
      if (res.status === 200) {
        setEventInfo({ ...eventInfo, imageUrl: res.data });
        await Swal.fire('Uploaded!', 'Image has been uploaded.', 'success');
      }
    }).catch(async (err) => {
      let message = err.data;
      await Swal.fire('Not uploaded!', message, 'error');
    });
  }

  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('');
  }

  if (eventInfo)
    return (
      <div>
        <div className="text-2xl">
          <div className="flex h-16 items-center ">
            <span className="text-blue-800">Editor ({eventInfo.title})</span>
          </div>
        </div>
        <div className="bg-divider" style={{ height: '0.1rem' }} />
        <div className="flex flex-col mt-4">
          <div>
            <div className="flex items-center border-b border-b-2 border-teal-500 p-2 my-4">
              <div className="w-40">Title</div>
              <textarea className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text" rows="1" placeholder="title" value={eventInfo.title} onChange={(v) => {
                  setEventInfo({ ...eventInfo, title: v.target.value, uniqueName: props.match.params.subject !== "new" ? props.match.params.subject : v.target.value.replace(/ /g, '').toLowerCase() + '-' + formatDate(eventInfo.start) })
                }} />
            </div>
            <div className="flex items-center border-b border-b-2 border-teal-500 p-2 my-4">
              <div className="w-40">Event date</div>
              <DateTimeRangePicker
                onChange={e => handlePickedDate(e)}
                value={[eventInfo.start, eventInfo.end]}
              />
            </div>
            <div className="flex items-center border-b border-b-2 border-teal-500 p-2 my-4">
              <div className="w-40">Venue</div>
              <textarea className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text" rows="1" placeholder="venue" value={eventInfo.venue} onChange={(e) => {
                  setEventInfo({ ...eventInfo, venue: e.target.value, location: e.target.value })
                }} />
            </div>
            <div className="flex items-center border-b border-b-2 border-teal-500 p-2 my-4">
              <div className="w-40">Image</div>
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
                type="text" rows="1" placeholder="image url" value={eventInfo.imageUrl} readOnly />
            </div>
            <div className="flex items-center border-b border-b-2 border-teal-500 p-2 my-4">
              <div className="w-40">Sign up link</div>
              <textarea className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text" rows="1" placeholder="sign up link" value={eventInfo.signUpLink} onChange={(e) => {
                  setEventInfo({ ...eventInfo, signUpLink: e.target.value })
                }} />
            </div>
            <div className="flex items-center border-b border-b-2 border-teal-500 p-2 my-4">
              <div className="w-40">Tags</div>
              {/* tags input */}
            </div>
            <div className="flex items-center border-b border-b-2 border-teal-500 p-2 my-4">
              <div className="w-40">Calendar color</div>
              <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="color" rows="1" placeholder="color" value={inputColor} onChange={(e) => {
                  setInputColor(e.target.value);
                  setEventInfo({ ...eventInfo, borderColor: e.target.value, backgroundColor: e.target.value })
                }} />
            </div>
            <div className="flex items-center border-b border-b-2 border-teal-500 p-2 my-4">
              <div className="w-40">Summary</div>
              <textarea className="appearance-none bg-transparent h-48 border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text" placeholder="summary" value={eventInfo.description}
                style={{ whiteSpace: 'normal', textAlign: 'justify', display: 'block', margin: 'auto' }}
                onChange={(v) => {
                  setEventInfo({ ...eventInfo, description: v.target.value })
                }} />
            </div>
            <div className="flex items-center border-b border-b-2 border-teal-500 p-2 my-4">
              <div className="w-40">Unique Name &nbsp;&nbsp; (Auto generated)</div>
              <textarea className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text" name="uniqueName" rows="1" placeholder="unique name" value={eventInfo.uniqueName} readOnly />
            </div>
            <div className="flex items-center border-b border-b-2 border-teal-500 p-2 my-4">
              <div className="w-40">Created by:</div>
              <textarea className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text" name="createdBy" rows="1" placeholder="creator" value={eventInfo.createdBy} readOnly />
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