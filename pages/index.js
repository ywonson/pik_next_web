import styles from '../styles/pages/Home.module.css';
import withAuth from '../withAuth'
import { useUserContext } from '../UserProvider';
import Head from 'next/head';
import Layout from '../components/Layout';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSpring, animated } from 'react-spring';
import Image from 'next/image';




const Home = () => {
  const { user } = useUserContext();
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const AnimateText = ({ text }) => {
    const [isAnimating, setIsAnimating] = useState(false);
  
    const props = useSpring({
      from: { transform: 'translateX(0px)' },
      to: async (next) => {
        setIsAnimating(true);
        await next({ transform: 'translateX(30px)' });
        setIsAnimating(false);
        await next({ transform: 'translateX(0px)' });
      },
      config: { tension: 140, friction: 3 }
    });
  
    return (
      <div>
        {isAnimating ? (
          <animated.h1 style={props}>{text}</animated.h1>
        ) : (
          <h1>{text}</h1>
        )}
      </div>
    );
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/classify-topic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text : inputValue }),
      });
      const data = await response.json();
      setSubmittedValue(data.topic);
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
      setInputValue('');
    }
  };



  return (
    <Layout>
      <Head>
        <title>pik_yongwon</title>
      </Head>

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30vh"
      }}>
      <Image
                  src="/pikpng.png"
                  alt="pik_logo"
                  objectFit="contain"
                  align="right"
                  width={500}
                  height={500}  
                />


  <AnimateText text="Welcome!!" />
      </div>
      <div>
      
    </div>

<div style={{ marginTop: "16px" }}>
  <p className={styles['welcome-text']}>
    Nice to meet you, {user?.metadata?.firstName || 'stranger'}{' '}
    <span role="img" alt="hello">
      👋
    </span>
  </p>
</div>
<div style={{ marginTop: "13px" }}>


  <p className= {styles.myleft} >Here, we provide a unique service that recommends the most similar links based on the user&apos;s input
     data of title and link title. Our cutting-edge technology is built using Next.js and GraphQL,
      and our database is hosted on Nhost, ensuring lightning-fast and secure access to your data. 
      Whether you&apos;re a student, a researcher, or just looking for interesting articles, 
      our recommendation engine will help you discover the content you&apos;re looking for. 
      Try it out today and see the difference for yourself!</p>

  <p className={styles['info-text']}>
  to pikurate, click this button! -

       <Link  href="/test" className={styles.mybut}>
        <button className={styles.mybut} type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : '🚀'}
        </button>
        </Link>
        </p>

      </div>
    </Layout>
  );
}

export default withAuth(Home);