// import { useState } from 'react'
import { useRef } from 'react';
import './App.css'

function App() {
  // const [count, setCount] = useState("");
  const inputFileRef = useRef(null);
  
  const handleFileUpload = (e) => {
    e.preventDefault();
    inputFileRef.current.click();


  }

  return (
    <>
      <input type="file" id="file" ref={inputFileRef} style={{display: 'none'}}/>
      <form className="textBox">
          <button id="upload-file" type='button' onClick={handleFileUpload} className='select-file-no'> + </button>
          
          <input type="url" className="link-input" placeholder='Enter url' id="url"/>
      </form>
      <footer>
        Help
      </footer>
    </>
  )
}



export default App;
