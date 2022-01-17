import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';


export default function SignUp() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });
    };
    const [myGeoloc, setMyGeoloc] = useState({ latitude: "", longitude: "" });
    useEffect(() => {

        try{
            getLocation();
        }catch(ex1){}

    }, []);

    const getLocation = () => {
        
        if (!navigator.geolocation) {
            //setStatus('Geolocation is not supported by your browser');
        } else {

            navigator.geolocation.getCurrentPosition((position) => {
                console.log(123,position.coords.latitude)
                setMyGeoloc({ ...myGeoloc, 
                    latitude:position.coords.latitude,
                    longitude:position.coords.longitude,
                });

            }, () => {
                
            });
        }
    }

    return (

        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                {/* <LockOutlinedIcon /> */}
            </Avatar>


            <Typography component="h1" variant="h5">
                災損回報
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>

                    <Grid item md={6} xs={12} >
                        <TextField
                            name="name"
                            fullWidth
                            id="name"
                            label="姓名"
                            autoFocus
                        />
                    </Grid>
                    <Grid item md={6} xs={12} >
                        <TextField
                            name="phonenumber"
                            fullWidth
                            id="phonenumber"
                            label="手機號碼"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="address"
                            fullWidth
                            id="address"
                            label="居住地"

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <br />
                        {myGeoloc.latitude},{myGeoloc.longitude}
                        <TextField
                            name="refuge"
                            fullWidth
                            id="refuge"
                            label="你目前所在位置"

                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            name="refuge"
                            fullWidth
                            id="refuge"
                            label="避難所"

                        />
                    </Grid>


                    <Grid item md={6} xs={12}>
                        <TextField

                            fullWidth
                            multiline={true}
                            name="damageCondition"
                            id="damageCondition"
                            label="受災狀況"
                            placeholder={'請輸入受災狀況'}
                            rows={5}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <div style={{
                            cursor: "pointer",
                            textAlign: "center", height: "100%", border: "dashed 2px #cacaca", borderRadius: 4
                        }}>
                            <AddIcon style={{ fontSize: "100", color: "#cacaca" }} />
                            <Typography component="h1" variant="h5">
                                上傳照片
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    儲存
                </Button>

            </Box>
        </Box>

    );
}