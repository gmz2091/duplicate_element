import './App.css';
import { useEffect, useRef, useState } from 'react';
import ToPrint from './components/DocPDF';
import { useReactToPrint } from 'react-to-print';


function App() {
  const [counter, setCounter] = useState(0);
  const [duplicateF, setDuplicateF] = useState(false);
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  const componentRef = useRef();

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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


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
        <button className="button" onClick={handlePrint}>Print</button>
        <div ref={componentRef}>
          <ToPrint image={preview} duplicateF={duplicateF} counter={counter} />
        </div>
        </div>
      </header>
    </div>
  );
}

export default App;
