import React from 'react';

import { useTranslation } from 'react-i18next';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import './Editor.css'

const Editor = ({ content, setContent }) => {
    const { t } = useTranslation();
    const plcholder = t('createReview.placeholder');

    const editor = React.useRef()
    React.useLayoutEffect(() => {
        editor.current.getEditor().root.dataset.placeholder = plcholder
    }, [plcholder])

    React.useEffect(()=> {
        localStorage.setItem('content', JSON.stringify(content))
    }, [content])

    const toolbarOptions = [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline',],
        ['blockquote', 'code'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': ['', 'center', 'right', 'justify'] }],
        ['link']

    ]

    return (
        <ReactQuill
            ref={editor}
            theme="snow"
            onChange={setContent}
            value={content}
            modules={{ toolbar: toolbarOptions }}
        />
    );
}

export default Editor;