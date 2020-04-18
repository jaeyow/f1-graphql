import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      margin: '20px 0px 60px 0px'
    },
    raceCell: {
      margin: '10px 0px'
    },
    summaryCell: {
      backgroundColor: '#EBF5FB'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightBold,
      flexBasis: '80',
      flexShrink: 0
    },
    option: {
      color: theme.palette.text.secondary,
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