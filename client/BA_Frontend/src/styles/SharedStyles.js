// sharedStyles.js

const sharedStyles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    },
    header: {
      backgroundColor: '#008fdc',
      color: 'white',
      padding: '40px',
      textAlign: 'center',
      position: 'relative',
    },
    headerText: {
      margin: 0,
      fontSize: '36px',
      fontFamily: '"Permanent Marker", cursive',
    },
    mainContent: {
        display: 'flex',
        flex: 1, // Makes sure this takes up the remaining space
        overflow: 'hidden', // Prevent overflow
    },
    leftColumn: {
      width: '10%',
      height: '100vh',
      backgroundColor: '#008fdc',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '20px',
      boxSizing: 'border-box',
      borderRight: '2px solid #ddd',
    },
    button: {
      backgroundColor: '#fff',
      color: '#008fdc',
      border: 'none',
      padding: '40px',
      marginBottom: '40px',
      borderRadius: '10px',
      cursor: 'pointer',
      width: '80px',
      height: '80px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '18px',
    },
    profileButton: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      position: 'absolute',
      right: '20px',
      top: '20%',
      transform: 'translateY(-50%)',
      padding: 0,
      outline: 'none',
    },
    rightColumn: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      overflowY: 'auto',
    },
  };
  
export default sharedStyles;