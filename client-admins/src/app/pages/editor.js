import React, { useState, useEffect } from 'react';
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { GetClubInfo } from '../api';
import Swal from 'sweetalert2';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default (props) => {
  const [clubInfo, setClubInfo] = useState({});
  const [subject, setSubject] = useState(props.match.params.subject);
  const [contentState, setContentState] = useState(EditorState.createEmpty());


  useEffect(() => {
    setSubject(props.match.params.subject);
  }, [props]);

  useEffect(() => {
    GetClubInfo(props.match.params.subject).then(async res => {
      setClubInfo(res.data[0]);
      console.log(res.data)
    }).catch(async err => {
      let message = err.data;
      await Swal.fire('Failed to fetch information!', message, 'error');
    });
    loadData();

  }, []);


  const handleEditorChange = (v) => {
    setContentState(v);
  }

  const handleSave = () => {
    const data = JSON.stringify(contentState.getCurrentContent(), null, 4);
    //save data
  }

  const loadData = () => {
    const loadedContentString = "{\"entityMap\":{},\"blocks\":[{\"key\":\"637gr\",\"text\":\"Initialized from content state.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}";
    const loadedContentRaw = convertFromRaw(JSON.parse(loadedContentString));
    setContentState(EditorState.createWithContent(loadedContentRaw));
  }

  const ClubInputComponent = (props) => {
    return (
      <div className={`flex flex-col text-xl ${props.class} ${props.className} `}>
        <div className="flex items-center border-b border-b-2 border-teal-500 p-2 my-4">
        <div className="w-32">Title</div>
        <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
        type="text" placeholder="title" value={clubInfo.title}/>
        </div>
        <div class="flex items-center border-b border-b-2 border-teal-500 p-2 my-4">
        <div className="w-32">Image url</div>
        <input className ="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
        type="text" placeholder="image url" value={clubInfo.bannerImgLink}/>
        </div>
        <div class="flex items-center border-b border-b-2 border-teal-500 p-2 my-4">
        <div className="w-32">Summary</div>
        <textarea className ="appearance-none bg-transparent h-56 border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
        type="text" placeholder="summary" value={clubInfo.summary}/>
        </div>
      </div>
    )
  }


  return (
    <div>
      {/* {console.log(JSON.stringify(temp))} */}
      <div className="text-2xl">
        <div className="flex h-16 items-center ">
          <span className="text-blue-800">Editor ({clubInfo.title})</span>
        </div>
      </div>
      <div className="bg-divider" style={{ height: '0.1rem' }} />
      <div className="flex flex-col mt-4">
        <ClubInputComponent />
        <div className="border-2 border-gray-400 p-3">
          <Editor
            wrapperClassName=""
            editorClassName=""
            toolbarClassName=""
            editorState={contentState}
            onEditorStateChange={(v) => { handleEditorChange(v) }}
          />
        </div>
      </div>

    </div>
  )
}