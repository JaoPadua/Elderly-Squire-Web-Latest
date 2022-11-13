import React, { useRef, useState } from 'react';
import 'antd/dist/antd.css';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';

const data = [
    {
        key: '1',
        name: 'Juan Dela Cruz',
        age: 70,
        birthday: "1962-01-16",
        address: 'Barangay 101',
        status: "Active",
        district: "District 1"

    },
    {
        key: '2',
        name: 'Roberto David',
        age: 73,
        birthday: "1962-01-16",
        address: 'Barangay 101',
        status: "Active",
        district: "District 1"
    },
    {
        key: '3',
        name: 'Rosalinda Ferrer',
        age: 79,
        birthday: "1962-01-16",
        address: 'Barangay 205',
        status: "Active",
        district: "District 1"
    },
    {
        key: '4',
        name: 'Nely Miraflor',
        age: 71,
        birthday: "1962-01-16",
        address: 'Barangay 222',
        status: "Active",
        district: "District 1"
    },
    {
        key: '5',
        name: 'Juan Dela Cruz',
        age: 70,
        birthday: "1962-01-16",
        address: 'Barangay 101',
        status: "Active",
        district: "District 1"

    },
    {
        key: '6',
        name: 'Roberto David',
        age: 73,
        birthday: "1962-01-16",
        address: 'Barangay 101',
        status: "Active",
        district: "District 1"
    },
    {
        key: '7',
        name: 'Rosalinda Ferrer',
        age: 79,
        birthday: "1962-01-16",
        address: 'Barangay 205',
        status: "Active",
        district: "District 1"
    },
    {
        key: '8',
        name: 'Nely Miraflor',
        age: 71,
        birthday: "1962-01-16",
        address: 'Barangay 222',
        status: "Active",
        district: "District 1"
    },
];

const List = () => {

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: '20%',
            ...getColumnSearchProps('age'),
        },
        {
            title: "Birthday",
            dataIndex: "birthday",
            key: "birthday",
            width: "20%",
            ...getColumnSearchProps("birthday")
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: "20%",
            ...getColumnSearchProps("status")
        },
        {
            title: "District",
            dataIndex: "district",
            key: "district",
            width: "20%",
            ...getColumnSearchProps("district")
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
    ];
    return <Table columns={columns} dataSource={data} />;
};

export default List;