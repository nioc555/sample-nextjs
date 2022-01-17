import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles({
    userFunctionItem: {
        cursor: "pointer",
        minWidth: 275,
        minHeight: 50,
       
        "& .title": {
            paddingTop: "5%"
        },
        "& .MuiCardContent-root:last-child,& .MuiCardContent-root": {
            padding: 10,
            paddingBottom: 0,
           
        },

        "& .MuiSvgIcon-root": {
            fontSize: 96,
        },
        fontSize: 48,

    },
});

export default useStyles;