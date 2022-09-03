import React from 'react';
import Modal from 'react-modal';
import { RiDeleteBin4Fill} from "react-icons/ri";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width:'70vw',
    transform: 'translate(-35%, -50%)',
    borderRadius:10,
  },
};

Modal.setAppElement(document.getElementById('root'));

export default function DeleteModel({title,visible,closeModal,action}) {
  return (
    <div>
      <Modal
        isOpen={visible}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
          <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <div>
                <RiDeleteBin4Fill
                size={40}
                color="#e72d18"
                />
            </div>
            <p style={{color:'grey',fontSize:20,marginTop:20,textAlign:'center',textTransform:'uppercase'}}>{title}</p>
            <div style={{width:'100%',margin:'20px 0px',display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                <button 
                onClick={()=>closeModal()}
                type="button" className="btn btn-light" style={{width:'40%'}}>
                    Cancel
                </button>
                <button 
                onClick={()=>{
                    action()
                    closeModal()
                }}
                type="button" className="btn btn-danger" style={{width:'40%'}}>
                    Delete
                </button>
            </div>
          </div>
      </Modal>
    </div>
  );
}
