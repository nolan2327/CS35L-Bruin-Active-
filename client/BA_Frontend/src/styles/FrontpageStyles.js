// FrontpageStyles.js 

const frontpageStyles = {
      rightColumn: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        overflowY: 'auto',
        height: 'calc(100vh - 60px)',
        paddingBottom: '80px' // Increased padding at bottom
      },
      mainContent: {
        display: 'flex',
        flex: 1,
        height: 'calc(100vh - 60px)',
        overflow: 'hidden' // Ensure proper containment
      },
      hall: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '15px',
        borderRadius: '10px',
        marginBottom: '10px',
        boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '600px', // Optional: Adjust the max width of the gym boxes
        border: '1px solid #ccc',
      },
      hallInfo: {
        flexGrow: 1,
        fontSize: '22px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      },
      hallDetails: {
        textAlign: 'right',
      },
      occupancy: {
        color: '#28a745', // Green for occupancy percentage
        fontWeight: 'bold',
        fontSize: '24px', // Larger font for visibility in total population boxes
      },
      zoneList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        maxWidth: '600px', // Match the maxWidth of the hall style
        alignItems: 'center',
      },
      zoneBox: {
        padding: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      zoneDetails: {
        marginTop: '20px',
        marginBottom: '30px', // Add margin bottom for spacing
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      timestamp: {
        fontSize: '14px',
        color: '#666',
        marginTop: '5px',
        fontWeight: 'normal'
      },
}

export default frontpageStyles;