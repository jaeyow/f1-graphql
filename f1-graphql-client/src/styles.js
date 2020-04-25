import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      margin: '20px 0px 60px 0px',
      maxWidth: '100%'
    },
    raceCell: {
      margin: '10px 0px'
    },
    summaryCell: {
      backgroundColor: '#EBF5FB'
    },
    heading: {
      fontSize: theme.typography.pxToRem(40),
      fontWeight: theme.typography.fontWeightBold,
      flexBasis: '80',
      flexShrink: 0,
      padding: '10px'
    },
    formControl: {
      margin: theme.spacing(1),
      width: '90%',
    },
    seasonFilter: {
      height: '50px',
    }
  }));

  export default useStyles;