
import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Sample from 'components/tab/sample';

function _TabPanel(props, ref) {
    const { children, index, ...other } = props;
   
    const [value, setValue] = useState(0);
    useImperativeHandle(ref, () => ({
        setData: (data) => {
            // if (data === index) {
            //     setStyle({});
            // } else {
            //     setStyle({ display: "none" });
            // }
            setValue(data);
        }
    }));
    // const [value, setValue] = useState('');



    return (
        <div role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box sx={{ p: 3 }}>
                {children}
            </Box>
        </div>
    );
}

const TabPanel = forwardRef(_TabPanel);
function TabNavigator(props) {
    const { switchTab } = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        switchTab(newValue);
    };

    return (
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Form1() {
    const [data, setData] = useState({
        name: "", pwd: ""

    });

    const onChange = (evt) => {
        setData({ ...data, [evt.target.name]: evt.target.value });
    }
    return (
        <div>
            <TextField label="Name" value={data.name} name="name" onChange={onChange} />
            <TextField label="Password" value={data.pwd} name="pwd" onChange={onChange} />
        </div>
    )
}

function BasicTabs() {
   // const [value, setValue] = React.useState(0);
    const tabRefs = useRef([]);

    const switchTab = (newVal) => {
        _.each(tabRefs.current, (v) => {
            v.setData(newVal);
        });
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabNavigator switchTab={switchTab} />
            </Box>
            <TabPanel
                ref={el => tabRefs.current[0] = el}
                index={0}>
                <Form1 />
            </TabPanel>
            <TabPanel
                ref={el => tabRefs.current[1] = el}
                index={1}>
                Item Two
            </TabPanel>
            <TabPanel
                ref={el => tabRefs.current[2] = el}
                index={2}>
                Item Three
            </TabPanel>
        </Box>
    );
}

const Main = () => {
    return <>
        {/* <BasicTabs /> */}
        <Sample />
        <Button color='secondary' variant="contained">test</Button>
    </>
}

export default Main;