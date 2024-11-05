import styles from '../style/BoardingPass.module.css';

export default function BoardingPass() {
  return (
    <div className={styles.boardingPass}>
      <div className={styles.header}>
        <div className={styles.airlineName}>Air Lines</div>
        <div className={styles.boardingPassTitle}>BOARDING PASS</div>
      </div>
      <div className={styles.passengerInfo}>
        <div className={styles.passengerDetails}>
          <p>PASSENGER NAME</p>
          <p>Mr. John Doe</p>
        </div>
        <div className={styles.details}>
          <div>
            <p>DATE</p>
            <p>11.03.17</p>
          </div>
          <div>
            <p>TIME</p>
            <p>21:25</p>
          </div>
          <div>
            <p>FLIGHT</p>
            <p>I124</p>
          </div>
          <div>
            <p>GATE</p>
            <p>D4</p>
          </div>
          <div>
            <p>SEAT</p>
            <p>31B</p>
          </div>
        </div>
      </div>
      <div className={styles.routeInfo}>
        <div>
          <p>FROM</p>
          <p>New York, USA</p>
        </div>
        <div>
          <p>TO</p>
          <p>Rome, Spain</p>
        </div>
      </div>
      <div className={styles.footer}>
        <p>IMPORTANT NOTE: You should be at the boarding gate before 20:05</p>
      </div>
    </div>
  );
}