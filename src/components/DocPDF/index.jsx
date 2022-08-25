import React from 'react'

const ToPrint = ({image, duplicateF, counter}) => {

    const duplicate = (n) => {
        let arr = [];
        for (let i = 0; i < n; i++) {
          arr.push(<div key={i} className="contents_img"><img src={image} alt="preview" /></div>);
        }
        return arr;
      }
    
    
  return (
    <>
    {duplicateF ? (
        <div className="duplicate">
          {duplicate(counter)}
        </div>
      ) : null}
    </>
  )
}

export default ToPrint