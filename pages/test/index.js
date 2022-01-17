import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import _ from "lodash";
import { SettingsInputAntennaTwoTone } from '@mui/icons-material';

const MyForm = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        getCondition: () => {
            const rrr = _.reduce(inputRef.current, function (result, v, k) {
                if (v) {
                    result[v.name] = v.value
                }

                return result;
            }, {});

            return [rrr, userName];
        }
    }));
    const [userName, setUserName] = useState('');
    const [userPwd, setUserPwd] = useState('');
    const inputRef = useRef([]);
    useEffect(() => {
        //init
        // console.log('init')
    }, []);

    useEffect(() => {
        //init
        //  console.log('userName');
        setUserPwd('123');
    }, [userName]);



    //  console.log('111');
    return (
        <div>
            {
                _.map(['userName', 'userPwd'], (v, k) => {
                    return <TextField
                        inputRef={el => inputRef.current[k] = el}
                        key={`${v}_${k}`} name={v} />
                })
            }
            <TextField value={userName}
                onChange={(evt) => {
                    setUserName(evt.target.value);
                }}
            />
            <MultipleSelectChip a={'abc'} b={'yyy'} c={'ddd'} />
            <TextField name={`wanyi`} inputRef={el => inputRef.current[3] = el} />
            <TextField name={`wanyi2`} inputRef={el => inputRef.current[4] = el} />
            <TextField name={`wanyi3`} inputRef={el => inputRef.current[5] = el} />
            <TextField name={`wanyi4`} inputRef={el => inputRef.current[6] = el} />
        </div>
    )
});
const MainForm = () => {
    const qryForm = useRef(null);
    const onClick = () => {
        console.log(qryForm.current.getCondition());
    }
    return (
        <>
            <Button onClick={onClick}>Test</Button>
            <MyForm ref={qryForm} />
            <div>
                123123
            </div>
        </>
    )
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
function MultipleSelectChip(props) {
    const { a, b, c } = props;

    console.log(a, b, c);
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {

        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
class Welcome extends React.Component {
    constructor(props) { // 加入建構子以及props參數
        super(props);
        this.state = { mood: ['decent'] };
        //this.toggleMood = this.toggleMood.bind(this);
    }

    toggleMood = () => {
        const newMood = [...this.state.mood, 'cccc'];
        this.setState({ mood: newMood });
    }
    render() {
        return (<><h1>Hello, {
            _.map(this.state.mood, (v, k) => {
                return <div key={`${k}-test-el`}>{v}</div>
            })
        }</h1>
            <button onClick={this.toggleMood}>Click Me</button></>);
    }
}

export default Welcome;