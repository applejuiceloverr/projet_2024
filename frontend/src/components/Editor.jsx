import React from 'react';
import codeEditorImage from '../assets/codeeditor.webp';

const Editor = () => {
    const handleClick = () => {
        window.open('http://localhost:5173/code-editor', '_blank');
    };

    return (
        <div className="flex flex-col items-center justify-center text-center p-4 md:p-8 bg-[#282A35] text-white">
            <h1 className="text-2xl md:text-4xl font-bold text-[#00df9a] mb-4">
                Code Editor
            </h1>
            <p className="text-lg md:text-xl mb-4">
                With our online code editor, you can edit code and view the result in your browser
            </p>
            <img src={codeEditorImage} alt="Code Editor" className="w-full md:w-2/3 h-auto mb-4" />
            <button onClick={handleClick} className="bg-[#00df9a] text-white font-bold py-2 px-4 rounded">
                Try it now!
            </button>
        </div>
    );
};

export default Editor;