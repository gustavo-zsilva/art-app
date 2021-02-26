import styles from '../styles/components/Recent.module.css';

export function Recent() {
    return (
        <div className={styles.recentContainer}>
            <figure>
                <img src="https://images.unsplash.com/photo-1614236079845-adba78477419?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="sddl"/>
            </figure>
            
            <figure>
                <img src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="d"/>
            </figure>
            
            <figure>
                <img src="https://images.unsplash.com/photo-1614189350757-660e4bbfcf38?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt=""/>
            </figure>

            <figure>
                <img src="https://images.unsplash.com/photo-1614186462449-59c66ace62c8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1266&q=80" alt=""/>
            </figure>

            <figure>
                <img src="https://images.unsplash.com/photo-1614180124480-86ae72b305bc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80" alt=""/>
            </figure>

            <figure>
                <img src="https://images.unsplash.com/photo-1611095560192-ccc932f617e1?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80" alt=""/>
            </figure>
        </div>
    );
}