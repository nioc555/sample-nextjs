import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import _ from "lodash";
import uuid from 'react-uuid';
const sampleData = [
    { id: 1, name: 'John McQueen', age: 35 },
    { id: 2, name: 'Mary Stones', age: 25 },
    { id: 3, name: 'Robert Fil', age: 27 },
    { id: 4, name: 'Roger Robson', age: 81 },
    { id: 5, name: 'Billary Konwik', age: 18 },
    { id: 6, name: 'Bob Martin', age: 18 },
    { id: 7, name: 'Matthew Richardson', age: 54 },
    { id: 8, name: 'Ritchie Peterson', age: 54 },
    { id: 9, name: 'Bryan Martin', age: 40 },
    { id: 10, name: 'Mark Martin', age: 44 },
    { id: 11, name: 'Michelle Sebastian', age: 24 },
    { id: 12, name: 'Michelle Sullivan', age: 61 },
    { id: 13, name: 'Jordan Bike', age: 16 },
    { id: 14, name: 'Nelson Ford', age: 34 },
    { id: 15, name: 'Tim Cheap', age: 3 },
    { id: 16, name: 'Robert Carlson', age: 31 },
    { id: 17, name: 'Johny Perterson', age: 40 }
];

const DataGrid = forwardRef((props, ref) => {
    const { idProperty, columns } = props;
    const [dataSource, setDataSource] = useState([]);
    const [mounted, setMounted] = useState(false);
    useImperativeHandle(ref, () => ({
        setData: (data) => {
            setDataSource(data);
        }
    }));
    useEffect(() => {
        setMounted(true)
    }, []);

    return mounted && (<ReactDataGrid
        idProperty={idProperty}
        columns={columns}
        showColumnMenuTool={false}
        dataSource={dataSource}
        style={{ minHeight: 250 }} />);
});
const EditArea = forwardRef((props, ref) => {
    const { onSave } = props;
    useImperativeHandle(ref, () => ({
        setData: (rowData) => {
            setData(rowData);
        }
    }));
    const [data, setData] = useState({});
    const onChange = (newValue) => {

        setData({ ...data, ...newValue });
    }
    return (
        <div>
            <h1>Edit Area</h1>
            <TextField label="Name" value={{ name: "", ...data }.name}

                onChange={(event) => {
                    onChange({ name: event.target.value });
                }}
            />
            <TextField label="Age" value={{ age: "", ...data }.age}
                onChange={(event) => {
                    onChange({ age: event.target.value });

                }}
            />

            <div style={{ margin: 10 }}>
                <Button variant="outlined" onClick={() => {
                    let newData = { row_key: 'new', ...data };
                    setData({ name: "", age: "" });
                    onSave(newData);

                }}>Save</Button>
                <Button variant="outlined" onClick={() => {
                    let newData = { ...data, row_key: 'new' };

                    onSave(newData);
                    setData({ name: "", age: "" });
                }}>Insert New</Button>
            </div>

        </div>
    )
})
const MainArea = () => {
    const dgRef = useRef(null);
    const editRef = useRef(null);
    const [mounted, setMounted] = useState(false);
    const editRow = (rowData) => {
        editRef.current.setData(rowData);
    }
    const deleteRow = (rowData) => {
        let newData = _.reject(tableData, {
            row_key: rowData.row_key
        });

        setTableData(newData);
        dgRef.current.setData(newData);
    }
    const [tableData, setTableData] = useState([]);
    const onSave = (newRowData) => {
        let newData = [];

        if (newRowData.row_key === 'new') {
            newData = [...tableData, {
                ...newRowData,
                row_key: `row_key_${uuid()}`
            }];
        } else {
            newData = _.map(tableData, (v, k) => {
                if (v.row_key === newRowData.row_key) {
                    return { ...v, ...newRowData }
                }
                return v;
            });
        }
        console.log(newData)
        setTableData(newData);
        dgRef.current.setData(newData);
    }
    const columns = [
        {
            header: 'Name', minWidth: 200, render: ({ data }) => {

                return (<><Button variant="outlined" onClick={() => {
                    editRow(data);
                }}>Edit</Button>
                    <Button variant="outlined" onClick={() => {
                        deleteRow(data);
                    }}>Delete</Button>
                </>
                )
            }
        },
        { name: 'name', header: 'Name', minWidth: 50, defaultFlex: 1 },
        { name: 'age', header: 'Age', maxWidth: 1000, defaultFlex: 1 }
    ]

    const doLoadData = () => {
        let newData = _.map(sampleData, (v, k) => {
            return { row_key: `row_key_${k}`, ...v }
        });
        setTableData(newData);
        dgRef.current.setData(newData);
    }

    return <>

        <EditArea ref={editRef} onSave={onSave} />
        <h1>Table Area
            <Button onClick={doLoadData} variant="outlined">Load Data</Button>

        </h1>
        <DataGrid ref={dgRef} idProperty="row_key"

            columns={columns} />
        <div>
            {tableData.length} rows
        </div>
    </>
}


export default MainArea;