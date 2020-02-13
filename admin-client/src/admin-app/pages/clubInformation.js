import React, { useState, useEffect } from 'react';
import { GetClubInfo } from '../../api';
import { convertFromRaw, EditorState, } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Swal from 'sweetalert2';

export default (props) => {
  const [clubInfo, setClubInfo] = useState({});
  const [contentState, setContentState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const loadData = () => {
      GetClubInfo(props.match.params.club).then(async res => {
        setClubInfo(res.data[0]);
        const loadedContentRaw = res.data[0].rawEditor.length > 10 ? convertFromRaw(JSON.parse(res.data[0].rawEditor)) : '';
        if (loadedContentRaw) setContentState(EditorState.createWithContent(loadedContentRaw));
      }).catch(async err => {
        // console.log(err);
        let message = err.data ? err.data : JSON.stringify(err);
        await Swal.fire('Failed to fetch information!', message, 'error');
      });
    };
    loadData();
  }, [props]);

  return (
    <div>
      <div className="text-2xl">
        <div className="flex h-16 items-center ">
          <span className="text-blue-800">{clubInfo.title}</span>
        </div>
      </div>
      <div className="bg-divider" style={{ height: '0.1rem' }} />
      <div className="flex flex-col mt-4">
        <div>
          <Editor
            wrapperClassName=""
            editorClassName=""
            editorStyle={{ height: '100%' }}
            toolbarClassName=""
            toolbarHidden
            readOnly
            editorState={contentState}
          />
        </div>
      </div>
    </div>
  )
}