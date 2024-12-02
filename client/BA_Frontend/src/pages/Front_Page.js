import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook
import sharedStyles from '../styles/SharedStyles';
import frontpageStyles from '../styles/FrontpageStyles';
import { getAllGymData } from '../utils/services';

// Various components from ../components here
import CalendarIcon from '../components/CalendarIcon';
import ProfileIcon from '../components/ProfileIcon';
import DashboardIcon from '../components/DashboardIcon';
import HomeIcon from '../components/HomeIcon';
import { AuthContext } from '../utils/IsSignedIn';

const GymOccupancy = () => {
    const navigate = useNavigate(); // Hook to programmatically navigate
    const { isLoggedIn } = useContext(AuthContext);

    const [bfitTotal, setBfitTotal] = useState(0);
    const [woodenTotal, setWoodenTotal] = useState(0);
    const [bfitZones, setBfitZones] = useState([]);
    const [woodenZones, setWoodenZones] = useState([]);

    useEffect(() => {
        console.log('enter');
        const fetchData = async () => {
        try {
            const data = await getAllGymData();
            if (data && data.bfit && data.wooden) {
                setBfitTotal(data.bfit.total || 0);
                setWoodenTotal(data.wooden.total || 0);
                setBfitZones(data.bfit.data[0].zones || []);
                setWoodenZones(data.wooden.data[0].zones || []);
            }
        } catch (error) {
            console.error("Error fetching gym data:", error);
        }
        };
        fetchData();
    }, []);

    return (
    <div style={styles.container}>
        <div style={styles.header}>
            <h2 style={styles.headerText}>Bruin Active</h2>
            <button style={styles.profileButton} onClick={() => {
            if (isLoggedIn === true) {
                navigate('/profile_page');
            }
            else {
                navigate('/sign_in')
            }
            }}>
            <ProfileIcon />
            </button>
        </div>
        <div style={styles.mainContent}>
            {/* Left Column (Buttons + Gym Occupancy Title) */}
            <div style={styles.leftColumn}>
                <div style={styles.buttonBox}>
                    <button style={styles.button} onClick={() => navigate('/')}>
                        <HomeIcon />
                    </button>
                    <button style={styles.button} onClick={() => navigate('/calendar_page')}>
                        <CalendarIcon />
                    </button>
                    <button style={styles.button} onClick={() => navigate('/postboard_page')}>
                        <DashboardIcon />
                    </button>
                </div>
            </div>

            {/* Right Column with Gym Occupancy Boxes */}
            <div style={styles.rightColumn}>
                {/* John Wooden Center */}
                <div style={{...styles.hall, height: '200px'}}> {/* Increased height for total population */}
                    <div style={styles.hallInfo}>
                        <strong>John Wooden Center</strong>
                        <div style={styles.timestamp}>Last updated: {woodenZones[0]?.updated_time || 'N/A'}</div>
                    </div>
                    <div style={styles.hallDetails}>
                    <p style={styles.occupancy}>
                        {woodenTotal !== null ? `${woodenTotal}` : 'Loading...'}
                    </p>
                    </div>
                </div>

                {/* Wooden Zones */}
                <div style={styles.zoneDetails}>
                    <div style={styles.zoneList}>
                    {woodenZones.map((zone, index) => (
                        <div key={index} style={styles.zoneBox}>
                        <h4>{zone.place_name}</h4>
                        <p style={styles.zoneBoxParagraph}>{zone.percentage}</p>
                        </div>
                    ))}
                    </div>
                </div>

                {/* B-Fit */}
                <div style={{...styles.hall, height: '200px'}}> {/* Increased height for total population */}
                    <div style={styles.hallInfo}>
                        <strong>B-Fit</strong>
                        <div style={styles.timestamp}>Last updated: {bfitZones[0]?.updated_time || 'N/A'}</div>
                    </div>
                    <div style={styles.hallDetails}>
                    <p style={styles.occupancy}>
                        {bfitTotal !== null ? `${bfitTotal}` : 'Loading...'}
                    </p>
                    </div>
                </div>

                {/* BFit Zones */}
                <div style={styles.zoneDetails}>
                    <div style={styles.zoneList}>
                    {bfitZones.map((zone, index) => (
                        <div key={index} style={styles.zoneBox}>
                        <h4>    {zone.place_name}</h4>
                        <p style={styles.zoneBoxParagraph}>{zone.percentage}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

const styles = {
  ...sharedStyles,
  ...frontpageStyles,
  container: {
    ...sharedStyles.container,
    height: '100vh',
    overflow: 'hidden'
  },
};

export default GymOccupancy;