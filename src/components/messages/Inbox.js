import styles from './Inbox.module.css';
import { Outlet, useNavigate} from 'react-router-dom';

export const Inbox = () => {

  const navigate = useNavigate()
  function navigateToChat(){
    navigate('/chatBox')
  }


  // Make sure to include user_id in the dependency array

  return (
    <div className={`Main ${styles.main}`}>
        <div className={styles.window}>
          <div className={styles.backArr}>
          </div>
          <div className={styles.navli}>
            <div className={styles.chatHead}>Chats</div>
            <ul className={styles.chatList}>
                <li onClick={()=>navigateToChat()}>
                  {/* <Link to={`/user/inbox/${company.user_id}` }> */}
                    <div className={styles.chat}>
                      <div className={styles.chatAvatar}>
                        <h4>
                          MK
                        </h4>
                      </div>
                      <div className={styles.chatDetails}>
                        <div className={styles.unreadDiv}>
                          <h4>admin</h4>
                          <h4 id={styles.number}>
                            .
                          </h4>
                        </div>
                        <p>
                          Hi, thanks for contacting us, we will reach out
                          shortly
                        </p>
                      </div>
                    </div>
                  {/* </Link> */}
                </li>

            </ul>
          </div>
          <Outlet />
        </div>
    </div>
  );
};