import { useState, useEffect  } from 'react';
import { useUserContext } from '../UserProvider';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-hot-toast';
import Head from 'next/head';
import Layout from '../components/Layout';
import Input from '../components/Input';
//import styles from '../styles/pages/CreatePost.module.css';
import styles from '../styles/pages/Profile.module.css';
import withAuth from '../withAuth';
import { UserPik } from '../DataProvider';
import { UserNum } from '../UsersRows';
//import { useRouter } from 'next/router';
import { useRouter } from 'next/router';






const CREATE_POST_MUTATION = gql`
  mutation InsertPikTest($pik_id: Int!, $memo: String!, $title: String!, $title_cate: String!, $title_link: String!, $words: String!, $id: uuid!) {
    insert_pik_test(objects: { pik_id: $pik_id, memo: $memo, title: $title, title_cate: $title_cate, title_link: $title_link, words: $words, id: $id }) {
      affected_rows
      returning {
        pik_id
        memo
        title
        title_cate
        title_link
        words
        id
      }
    }
  }
`;





const CreatePost = ({ userPik, userNum }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  //const [usernum, setUserNum] = useState(UserNum() + 1);
  
  
  
    const router = useRouter();
    const handleClick = () => { router.reload(); };

  useEffect(() => {
    if (isUpdated) {
      const timeoutId = setTimeout(() => setIsUpdated(false), 2000);

      
      //UserPik();
      //setUserNum(UserNum() + 1);
      //useRouter
      //Router.refresh();
      return () => clearTimeout(timeoutId);
    }
  }, [isUpdated]);

  //const Router = useRouter();
  //const usernum = UserNum()+1;

  
  const { user } = useUserContext();
  const [title, setTitle] = useState('');
  const [titleCate, setTitleCate] = useState('');
  const [titleLink, setTitleLink] = useState('');
  const [words, setWords] = useState('');
  const [memo, setMemo] = useState('');
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {fetchPolicy : "no-cache",});
  
  

  
  const handleSubmit =  async (event) => {
    
    event.preventDefault();
    
    try {
      await createPost({
        variables: {
          id: user.id,
          pik_id: userNum + 1,
          title,
          title_cate: titleCate,
          title_link: titleLink,
          words,  
          memo,
        },
      });

      toast.success('Post created successfully', { id: 'createPost' });
      setTitle('');
      setTitleCate('');
      setTitleLink('');
      setWords('');
      setMemo('');
      
      
      //setusernum(usernum+1);

      
    
    } catch (error) {
      console.error(error);
      toast.error('Unable to create post', { id: 'createPost' });
    }

    setIsUpdated(true)
  };


  //const isFormDirty = !!title || !!titleCate || !!titleLink || !!words || !!memo;
  const isFormDirty = !!title && !!titleLink;
  return (
    <Layout>

      <Head>
        <title>data_rec</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.info}>
          <h2>Create a new data!</h2>

          <p>Fill out the form below to create a new post.</p>
          <p>You will see all the data that you have previously stored in our database.</p>
          <UserPik></UserPik>
        </div>


        <div className={styles.card}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles['form-fields']}>
              <Input
                type="text"
                label="*Pik Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />

              <Input
                type="text"
                label="*Title of Links"
                value={titleLink}
                onChange={(event) => setTitleLink(event.target.value)}
                required
                style={{ height: "100px" }}
              />

              <Input
                type="text"
                label="Title Category"
                value={titleCate}
                onChange={(event) => setTitleCate(event.target.value)}
              />



              <Input
                type="text"
                label="Words"
                value={words}
                onChange={(event) => setWords(event.target.value)}
              />

              <Input
                type="text"
                label="Memo"
                value={memo}
                onChange={(event) => setMemo(event.target.value)}
              />
            </div>

            <div className={styles['form-footer']}>
              <button type="submit"
                disabled={!isFormDirty}
                className={styles.button}
                onClick={handleClick}
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

//export default withAuth(CreatePost);

const WrappedCreatePost = () => {
  const userPik = UserPik();
  const userNum = UserNum();

  return <CreatePost userPik={userPik} userNum={userNum} />;
};

export default withAuth(WrappedCreatePost);