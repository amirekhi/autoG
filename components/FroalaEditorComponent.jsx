'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';

import { ToastContainer, toast, Slide } from "react-toastify";

const FroalaEditorComponent = ({OnSubmit , initialContent}) => {
  const editorInstanceRef = useRef(null);
  const [Added , setAdded] = useState(false)



  
 
        const showSuccessToast = (param) => {
          toast.success(param, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progressClassName: "custom-progress-bar-error",
            toastClassName: "custom-toast-error",
          });
        };



  useEffect(() => {
    let FroalaEditor;

    // Dynamically import Froala plugins after the browser has loaded
    import('froala-editor/js/plugins.pkgd.min.js')
      .then(() => import('froala-editor/js/froala_editor.pkgd.min.js')) // Load the core bundle
      .then(() => import('froala-editor/js/third_party/image_tui.min.js')) // Optional: third-party image editor
      .then(() => import('froala-editor/js/third_party/embedly.min.js')) // Optional: embedly integration
      .then(() => import('froala-editor'))
      .then((module) => {
        FroalaEditor = module.default;
        if (!editorInstanceRef.current) {
          editorInstanceRef.current = new FroalaEditor('#froala-editor', {
            // General Settings
            language: 'en',
            direction: 'ltr',
            placeholderText: 'Start typing...',
            charCounterCount: true,
            heightMin: 400,
            heightMax: 800,
            width: '100%',
            spellcheck: true,
            autoFocus: true,
            undo: true,
            redo: true,
            toolbarSticky: true,
            fullscreen: true,
            toolbarVisible: true,
            autoSave: true,
            autoSaveInterval: 5000, // 5 seconds
            key: 'YOUR-LICENSE-KEY', // Add your license key
      
            imageUploadURL: '/',  // Local upload URL
            imageUploadParams: { file: 'file' },  // Optional: specify parameter name
      
            // Optional: configure max size and allowed file types
            imageMaxSize: 5 * 1024 * 1024,  // Max size 5MB
            imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif', 'bmp'],
      
            // Toolbar Buttons
            toolbarButtons: [
              'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript',
              'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineStyle', 'paragraphStyle',
              'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent',
              'quote', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable',
              'emoticons', 'specialCharacters', 'insertHR', 'undo', 'redo', 'fullscreen', 'html'
            ],
          
          fontFamilySelection: true,
          fontSizeSelection: true,
          fontFamily: {
              'Arial, Helvetica, sans-serif': 'Arial',
              'Courier New, Courier, monospace': 'Courier New',
              'Georgia, serif': 'Georgia',
              'Times New Roman, Times, serif': 'Times New Roman',
              'Verdana, Geneva, sans-serif': 'Verdana'
              
          },
          fontSize: ['8', '10', '12', '14', '16', '18', '20', '24', '30', '36', '48', '60', '72'],
     
      
            // Plugins Enabled
            pluginsEnabled: [
              'align', 'charCounter', 'codeBeautifier', 'codeView', 'colors', 'draggable', 'emoticons', 'entities',
              'file', 'fontAwesome', 'fullscreen', 'image', 'imageManager', 'inlineStyle', 'lineBreaker', 'link',
              'lists', 'paragraphFormat', 'paragraphStyle', 'quickInsert', 'quote', 'save', 'specialCharacters', 'table',
              'url', 'video', 'wordPaste' ,'fontFamily', 'fontSize'                    
              
            ],
      
            // Image Options
            imageUpload: true,
            
            imageResize: true,
            imageEditButtons: ['imageReplace', 'imageAlign', 'imageRemove'],
            imageDefaultAlign: 'center',
            
      
            // Custom Buttons
            customButtons: [
              {
                title: 'Custom Button',
                icon: 'fa fa-star',
                callback: function () {
                  alert('Custom button clicked!');
                }
              }
            ],
      
            // Advanced Features
            inlineMode: false,
            minHeight: 400,
            maxHeight: 800,
            fontSizeSelection: true,
            tabSpaces: 4,
            lineBreaks: true,
      
            // Events
            events: {
              initialized: function () {
                console.log('Froala Editor Initialized');
                if (initialContent != null) {
                  this.html.set(initialContent);
                }
              },
              contentChanged: function () {
                console.log('Content changed!');
              },
              focus: function () {
                console.log('Editor focused!');
              },
              blur: function () {
                console.log('Editor blurred!');
              }
            }
          });
        }
      })
      .catch((err) => console.error('Failed to load Froala plugins:', err));

    // Clean up on unmount
    return () => {
      editorInstanceRef.current?.destroy();
    };
  }, []);

  // Button to log the HTML content
  const getHTMLContent = () => {
    const content = editorInstanceRef.current?.html.get();
    if (content) {
      OnSubmit(content); // Set the HTML content to state
      setAdded(true); 
      showSuccessToast('Successfully updated the Content !!') // Optionally log it
    }
  };

  return (
    <div>
      <textarea id="froala-editor"></textarea>
      <button className='w-[180px] h-[80px] rounded-full bg-gray-500 p-3 text-white mx-auto block mt-4'  onClick={getHTMLContent}>{Added == true ? ('Content has been added') : ('Set the Blog')}</button>
         <ToastContainer
                       transition={Slide}
                       style={{ width: "90%", maxWidth: "360px" }}
                     />
    </div>
  );
};

export default dynamic(() => Promise.resolve(FroalaEditorComponent), { ssr: false });
