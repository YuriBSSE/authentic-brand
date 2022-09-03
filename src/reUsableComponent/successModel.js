import React from 'react';
import Modal from 'react-modal';
import {FaCheck} from "react-icons/fa";
import {RiCloseFill} from "react-icons/ri";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width:'40%',
    transform: 'translate(-35%, -50%)',
    borderRadius:10,
  },
};

Modal.setAppElement(document.getElementById('root'));

export default function SuccessModal({title,visible,closeModal}) {
    

  return (
    <div>
      <Modal
        isOpen={visible}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
          <div 
          onClick={()=>closeModal()}
          style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
            <RiCloseFill
            size={25}
            color="grey"
            />
          </div>
          <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'green',width:70,height:70,borderRadius:35}}>
                <FaCheck
                size={30}
                color="white"
                />
            </div>
            <p style={{color:'grey',fontSize:20,marginTop:20,textAlign:'center',textTransform:'uppercase'}}>{title}</p>
          </div>
      </Modal>
    </div>
  );
}
