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
          <div className={styles.rules}>
            <h3>AIRLINE RULES</h3>
            <p>Boarding closes 15 minutes before departure.</p>
            <p>Luggage must not exceed 23 kg per item.</p>
            <p>Make sure to have your passport and visa ready.</p>
          </div>
          <div className={styles.flightDetails}>
            <p>FLIGHT: I124</p>
            <p>GATE: D4</p>
            <p>SEAT: 31B</p>
            <p>CLASS: E</p>
          </div>
          <div className={styles.barcode}></div>
        </div>
      );
}