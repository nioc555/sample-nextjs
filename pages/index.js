import React, { useEffect } from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import useStyles from './styles.js';
import PostAddIcon from '@mui/icons-material/PostAdd';
import _ from "lodash";

const UserFunctionItem = (props) => {
    const { data } = props;
    const classes = useStyles();
    const onClick = () => {
        console.log('123')
    }
    return (
        <Box >
            <Card className={classes.userFunctionItem} variant="outlined" onClick={onClick}>

                <CardContent>
                    <Box display="flex">
                        <Box >
                            {data.icon}
                        </Box>
                        <Box className="title">
                            {data.title}
                        </Box>
                    </Box>


                </CardContent>
            </Card>
        </Box>
    );

}
const Homepage = () => {
    const classes = useStyles();
    const userFunctions = [{
        title: "回報受災狀況", icon: <PostAddIcon />
    },
    {
        title: "回報受災狀況", icon: <PostAddIcon />
    }]
    return (
        <Container maxWidth="lg">
            <Box display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="row"
                flexWrap="wrap"
                m={1}

            >
                {
                    _.map(userFunctions, (ufi, idx) => {
                        return <UserFunctionItem data={ufi} key={`UserFunctionItem-${idx}`} />
                    })
                }


            </Box>
            <div>
                我過去的災損回報紀錄
            </div>
        </Container>
    );
};


const Homepage2 = () => {
    const classes = useStyles();
    const userFunctions = [{
        title: "回報受災狀況", icon: <PostAddIcon />
    },
    {
        title: "回報受災狀況", icon: <PostAddIcon />
    }];

    useEffect(()=>{

    },[])

    return (
        <Container maxWidth="lg" >
            Home
        </Container>
    );
};


export default Homepage2;