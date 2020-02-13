import React, { useState, useEffect } from 'react';
import { GetClubInfo } from '../../api';
import { convertFromRaw, EditorState, } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Swal from 'sweetalert2';

export default (props) => {
  const [contentState, setContentState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const loadData = () => {
      GetClubInfo(props.match.params.club).then(async res => {
        document.title = res.data[0].title;
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

  return (
    <div className="m-6">
      <Editor
        wrapperClassName=""
        editorClassName=""
        editorStyle={{ height: '100%', overflow: 'hidden' }}
        toolbarClassName=""
        toolbarHidden
        readOnly
        editorState={contentState}
      />
    </div>
  )
}