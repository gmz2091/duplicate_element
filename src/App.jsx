import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [counter, setCounter] = useState(0);
  const [duplicateF, setDuplicateF] = useState(false);
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
      if (!selectedFile) {
          setPreview(undefined)
          return
      }

      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = e => {
      if (!e.target.files || e.target.files.length === 0) {
          setSelectedFile(undefined)
          return
      }

      // I've kept this example simple by using the first image instead of multiple
      setSelectedFile(e.target.files[0])
  }


  const duplicate = (n) => {
    let arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(<div key={i} className="contents_img"><img src={preview} alt="preview" /></div>);
    }
    return arr;
  }



  return (
    <div className="App">
      <header className="App-header">
        <div className='contents'>
        <input className="input_counter" type="text" value={counter}  placeholder="Enter number of times to duplicate" onChange={(e) => setCounter(e.target.value)} />
        <input className="input_file" type="file" name="file" id="" onChange={onSelectFile} />
        <button className="button" onClick={() => {
          setCounter(0);
          setDuplicateF(false);
          setPreview();
        }}>Reset</button>
        <button className="button" onClick={() => setDuplicateF(true)}>Duplicate</button>
        {duplicateF ? (
          <div className="duplicate">
            {duplicate(counter)}
          </div>
        ) : null}
        </div>
      </header>
    </div>
  );
}

export default App;
