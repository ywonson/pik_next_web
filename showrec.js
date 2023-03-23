import React, { useState } from 'react';
import styles from './styles/pages/Profile.module.css';
import { fetchRecommendationList } from './pages/api/Recommendation.js';

export default function Recommendation(props) {
  const { pik_title, link_title } = props;

  const [recommendationList, setRecommendationList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = await fetchRecommendationList(pik_title, link_title, setIsLoading);
    setRecommendationList(data);
  };

  return (
    <div className={styles.info}>
      <form onSubmit={handleSubmit}>
        <button className='recbutton' type="submit">Generate</button>
      </form>
      {isLoading && <div>Loading...</div>}
      {recommendationList.length > 0 && (
        <div>
          <p>
          &nbsp;&nbsp;
          </p>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {recommendationList.map((item, index) => (
                <tr key={item.title}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
