import { useUserId } from '@nhost/nextjs'
import { gql, useQuery } from '@apollo/client'
import { useState } from 'react';
import Recommendation from './showrec.js';

const GET_PIK = gql`
query GetPikTest ($userId: uuid!) {
  pik_test (where: { id : { _eq: $userId } }) {
    pik_id
    memo
    title
    title_cate
    title_link
    words
    id
  }
}
`

const CustomModal = ({ isOpen, onClose, title, content }) => {

 
  if (!isOpen) {
    return "";
  }
  return (
    <div className='modal'>
      <div className='overlay'></div>
      <div className='modal-content'>
      &nbsp;
      <h2>- Title: {title}</h2>
      <p>- Link: {content}</p>
      
      <p> </p>
      <Recommendation pik_title={title} link_title={content} />
      <button className='xbutton' onClick={onClose} >Close</button>
      


      </div>
    </div>
  );
};




export function UserPik() {
    

    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ title: '', content: '' });
  
    const handleRowClick = (rowData) => {
      setModalData({ title: rowData.title, content: rowData.title_link });
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };

  const userId = useUserId()
  const { loading, error, data } = useQuery(GET_PIK, {
    variables: { userId : userId }, // { userId: userId }
    skip: !userId,
    fetchPolicy: "no-cache",
  })
  
  const pikTests = data?.pik_test
  if (error) {
    return <p>Something went wrong. Try to refresh the page.</p>
  }
  if (loading) {
    return <p>Loading...</p>
  }
  return (
<div>

  {pikTests && (
    <table>
      <thead>
        <tr>
          <th>reco</th>
          <th>Title</th>
          <th>Link</th>
          <th>Category</th>
          <th>Words</th>
          <th>Memo</th>
          
        </tr>
      </thead>
      <tbody>
        {pikTests.map((pikTest) => (
          <tr key={pikTest.pik_id}>
             <td><button className='mybutton' onClick={() => handleRowClick(pikTest)}>✔️</button></td>
            <td>{pikTest.title}</td>
            <td>{pikTest.title_link}</td>
            <td>{pikTest.title_cate}</td>
            <td>{pikTest.words}</td>
            <td>{pikTest.memo}</td>
           
          </tr>
        ))}
      </tbody>
    </table>
    
  )}
  <CustomModal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={modalData.title}
        content={modalData.content}
      />
  
</div>
);
}





            