import React, { useState } from 'react';
import 'antd/dist/antd.min.css';
// import './regId.css';
import { PlusOutlined } from '@ant-design/icons';
import {
    Upload,
    Button,
    Checkbox,
    Form,
    Input,
    InputNumber,
    DatePicker,
    Radio,
    Select,
} from 'antd';



const { Option } = Select;

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


const [TypeofApplication,setTypeofApplicaions] = useState('')
const [Surname, setSurname] = useState('')
const [FirstName,setFirstname] = useState('')
const [Address,setAddress] = useState('')
const [YrsofResidenceInManila,setYrsofResidenceInManila] = useState('')
const [BirthPlace,setBirthPlace] = useState('')
const [DateofBirth,setDateofBirth] = useState('')
const [Gender,setGender] = useState('')
const [Age,setAge] = useState('')
const [Barangay,setBarangay] = useState('')
const [Zone,setZone] = useState('')
const [District,setDistrict] = useState('')
const [CivilStatus,setCivilStatus] = useState('')
const [Salary,setSalary] = useState('')
const [CellPhoneNumber,setCellPhoneNumber] = useState('')
const [Pension,setPension] = useState('')
const [PresentWork,setPresentWork] = useState('')
const [ValidIdPresented,setValidIdPresented] = useState('')
const [Email,setEmail] = useState('')
const [Error,setError] = useState(null)

const onFinish = async (values) => {

    console.log('Received values of form: ', values);
        try{
        const response = await fetch('http://localhost:8080/api/usersRoute', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              });
        

      
        if(!response.ok){
            setError(values.Error)
         }
         if(response.ok){
             setSurname('')
 
             setError(null)
             console.log('New User Added', values)
         }
     const json = await response.json()    
    }catch (error) {
      console.error('Error:', error);
    }
    
    
};

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
        <div id="contact" className="block-contactBlock">
            <div className="container-fluid">
                <br/><br/>

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
                           
                        >
                            <Form.Item label="Date Issued" className=''>
                            
                             <DatePicker />
                                
                            </Form.Item>
                          
                            <Form.Item label="Type of Application" className='label'>
                                <Radio.Group>
                                    <Radio value="new" > <h3> New Senior(Voter) </h3> </Radio>
                                    <Radio value="newnon"> <h3>New Senior(Non-Voter)</h3> </Radio>
                                    <Radio value="old"> <h3>Old Senior</h3> </Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                name="Surname"
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
                                <Input placeholder='Surname' />
                            </Form.Item>
                            <Form.Item
                                name="Firstname"
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
                                <Input placeholder='FirstName' />
                            </Form.Item>
                            <Form.Item
                                name="MiddleName"
                                label="MiddleName"
                                rules={[
                                    {
                                        type: 'firstname',
                                        message: 'The input is not valid MiddleName',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your MiddleName',
                                    },
                                ]}
                            >
                                <Input placeholder='MiddleName' />
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
                                        message: 'Please input your Address',
                                    },
                                ]}
                            >
                                <Input placeholder='Address'/>
                            </Form.Item>
                            <Form.Item
                                label="Years of Residence in Manila"
                                rules={[
                                    {
                                        type: 'number',
                                        min: 6,
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
                                <Input placeholder='BirthPlace' />
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
                                        min: 60,
                                        max: 99,
                                    },
                                ]}
                            >
                                <InputNumber />
                            </Form.Item>

                            <Form.Item label="Nationality">
                                <Input />
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
                                <Input placeholder='' />
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
                                        type: 'email',
                                        message: 'The input is not valid Email',
                                    },
                                    {
                                        message: 'Please input your Email',
                                    },
                                ]}
                                
                            >
                                <Input />
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