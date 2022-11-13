import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './PageTwo.css';
import { PlusOutlined } from '@ant-design/icons';
import {
    Upload,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    DatePicker,
    Radio,
    Row,
    Select,
} from 'antd';



const { Option } = Select;
const residences = [
    {
        value: 'd1',
        label: 'District 1',
        children: [
            {
                value: 'barangay1',
                label: 'Barangay 1',
                children: [
                    {
                        value: 'wl',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'd2',
        label: 'District 2',
        children: [
            {
                value: 'barangay50',
                label: 'Barangay 50',
                children: [
                    {
                        value: 'dagupan',
                        label: 'Dagupan St',
                    },
                ],
            },
        ],
    },
    {
        value: 'd3',
        label: 'District 3',
        children: [
            {
                value: 'barangay150',
                label: 'Barangay 150',
                children: [
                    {
                        value: 'pritil',
                        label: 'Pritil',
                    },
                ],
            },
        ],
    },
];
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const SCapplication = () => {

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+09</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );
    const suffixSelector = (
        <Form.Item name="suffix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="USD">$</Option>
                <Option value="PESO">₱</Option>
            </Select>
        </Form.Item>
    );
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    const onWebsiteChange = (value) => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
        }
    };

    const websiteOptions = autoCompleteResult.map((website) => ({
        label: website,
        value: website,
    }));
    return (
        <div id="contact" className="block contactBlock">
            <div className="container-fluid">
                <div className="titleHolder">
                    <div className='cards__container'>
                        <div className='cards__wrapper'>
                            <h1>Application form for Senior Citizen ID</h1>
                        </div>
                        <Form
                            {...formItemLayout}
                            form={form}
                            name="register"
                            onFinish={onFinish}
                            initialValues={{
                                residence: ['zhejiang', 'hangzhou', 'xihu'],
                                prefix: '86',
                            }}
                            scrollToFirstError
                        >
                            <Form.Item label="Date Issued">
                                <DatePicker />
                            </Form.Item>

                            <Form.Item label="Type of Application" className='label'>
                                <Radio.Group>
                                    <Radio value="new"> <h3> New Senior(Voter) </h3> </Radio>
                                    <Radio value="newnon"> <h3>New Senior(Non-Voter)</h3> </Radio>
                                    <Radio value="old"> <h3>Old Senior</h3> </Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                name="surname"
                                label="Surname"
                                rules={[
                                    {
                                        type: 'surname',
                                        message: 'The input is not valid Surname',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your Surname',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="firstname"
                                label="Firstname"
                                rules={[
                                    {
                                        type: 'firstname',
                                        message: 'The input is not valid Firstname',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your Firstname',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="lastName"
                                label="Lastname"
                                rules={[
                                    {
                                        type: 'firstname',
                                        message: 'The input is not valid Lastname',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your Lastname',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="address"
                                label="Address"
                                rules={[
                                    {
                                        type: 'address',
                                        message: 'The input is not valid Address',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your Addess',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Years of Residence in Manila"
                                rules={[
                                    {
                                        type: 'number',
                                        min: 0,
                                        max: 99,
                                    },
                                ]}
                            >
                                <InputNumber />
                            </Form.Item>

                            <Form.Item
                                name="birthplace"
                                label="Birthplace"
                                rules={[
                                    {
                                        type: 'birthplace',
                                        message: 'The input is not valid Birthplace',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your Birthplace',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Date of Birth">
                                <DatePicker />
                            </Form.Item>

                            <Form.Item
                                name="gender"
                                label="Gender"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select gender!',
                                    },
                                ]}
                            >
                                <Select placeholder="select your gender">
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="other">Other</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Age"
                                rules={[
                                    {
                                        type: 'number',
                                        min: 0,
                                        max: 99,
                                    },
                                ]}
                            >
                                <InputNumber />
                            </Form.Item>

                            <Form.Item label="Nationality">
                                <Input />
                            </Form.Item>

                            <Form.Item label="Year of residence in manila">
                                <DatePicker />
                            </Form.Item>

                            <Form.Item
                                name="brgy"
                                label="Brgy"
                                rules={[
                                    {
                                        type: 'brgy',
                                        message: 'The input is not valid Barangay',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your Barangay',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="zone"
                                label="Zone"
                                rules={[
                                    {
                                        type: 'zone',
                                        message: 'The input is not valid Zone',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your Zone',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="district"
                                label="District"
                                rules={[
                                    {
                                        type: 'district',
                                        message: 'The input is not valid district',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your district',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Katayuan / Civil Status">
                                <Radio.Group>
                                    <Radio value="single"> <h3>Single</h3> </Radio>
                                    <Radio value="married"> <h3>Married</h3> </Radio>
                                    <Radio value="widow"> <h3>Widow</h3> </Radio>
                                    <Radio value="legalseparated"> <h3>Legal Separated</h3> </Radio>
                                    <Radio value="divorced"> <h3>Divorced</h3> </Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                name="sweldo"
                                label="Monthly Salary"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Monthly Salary',
                                    },
                                ]}
                            >
                                <InputNumber
                                    addonAfter={suffixSelector}
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>


                            <Form.Item
                                name="phone"
                                label="Phone Number"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone number!',
                                    },
                                ]}
                            >
                                <Input
                                    addonBefore={prefixSelector}
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="pension"
                                label="Monthly Pension"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Monthly Pension!',
                                    },
                                ]}
                            >
                                <InputNumber
                                    addonAfter={suffixSelector}
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>

                            <Form.Item label="Kasalukuyang Gawain/Present Work">
                                <Input />
                            </Form.Item>

                            <Form.Item label="Valid ID Presented">
                                <Radio.Group>
                                    <Radio value="passport"> <h3>Passport</h3> </Radio>
                                    <Radio value="votersid"> <h3>Voter's ID </h3></Radio>
                                    <Radio value="sssid"> <h3>SSS ID</h3> </Radio>
                                    <Radio value="umidid"> <h3>UMID ID</h3> </Radio>
                                    <Radio value="policeclearance"> <h3>Police Clearance</h3> </Radio>
                                    <Radio value="nbiclearance"> <h3>NBI Clearance</h3> </Radio>
                                    <Radio value="nationalid"> <h3>National ID</h3> </Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        type: 'surname',
                                        message: 'The input is not valid Email',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your Email',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item label="Upload required Valid ID" valuePropName="fileList">
                                <Upload action="/upload.do" listType="picture-card">
                                    <div>
                                        <PlusOutlined />
                                        <div
                                            style={{
                                                marginTop: 8,
                                            }}
                                        >
                                            Upload
                                        </div>
                                    </div>
                                </Upload>
                            </Form.Item>
                            <Form.Item label="Upload three 1x1 picture" valuePropName="fileList">
                                <Upload action="/upload.do" listType="picture-card">
                                    <div>
                                        <PlusOutlined />
                                        <div
                                            style={{
                                                marginTop: 8,
                                            }}
                                        >
                                            Upload
                                        </div>
                                    </div>
                                </Upload>
                            </Form.Item>

                            <Form.Item label="please Print and Notarized">
                                <Button>Sinumpaang Salaysay PDF</Button>
                            </Form.Item>

                            <Form.Item label="please Print and Notarized">
                                <Button>Malayang Pahayag PDF</Button>
                            </Form.Item>

                            <Form.Item
                                name="agreement"
                                valuePropName="checked"
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                    },
                                ]}
                                {...tailFormItemLayout}
                            >
                                <Checkbox>
                                    I have read the <a href="">agreement</a>
                                </Checkbox>
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" className='button'>
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SCapplication;