import React, { useState, useEffect } from 'react';
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



export default (props) => {
  const [subject, setSubject] = useState(props.match.params.subject);
  const [contentState, setContentState] = useState(EditorState.createEmpty());


  useEffect(() => {
    setSubject(props.match.params.subject);
  }, [props]);

  useEffect(() => {
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


  return (
    <div>
      {/* {console.log(JSON.stringify(temp))} */}
      <div className="text-2xl">
        <div className="flex h-16 items-center ">
          <span className="text-blue-800">Editor ({subject})</span>
        </div>
      </div>
      <div className="bg-divider" style={{ height: '0.1rem' }} />
      <div className="flex flex-col mt-4">
        <div>content</div>
        <div className="border-2 border-gray-400 p-3">
          <Editor
            wrapperClassName=""
            editorClassName="h-screen"
            toolbarClassName=""
            editorState={contentState}
            onEditorStateChange={(v) => { handleEditorChange(v) }}
          />
        </div>
      </div>

    </div>
  )
}