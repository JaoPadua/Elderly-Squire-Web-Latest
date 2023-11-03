import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import React from "react";
import './regId.css'
import{ useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';






function IdRegistration() {
  
  const [TypeofApplication,setTypeofApplications] = useState("")
  const [SurName, setSurname] = useState("")
  const [FirstName,setFirstname] = useState("")
  const [MiddleName,setMiddleName] = useState("")
  const [Address,setAddress] = useState("")
  const [YrsofResidenceInManila,setYrsofResidenceInManila] = useState("")
  const [BirthPlace,setBirthPlace] = useState("")
  const [DateofBirth,setDateofBirth] = useState("")
  const [Gender,setGender] = useState("")
  const [Nationality,setNationality] = useState("")
  const [Age,setAge] = useState("")
  const [Barangay,setBarangay] = useState("")
  const [Zone,setZone] = useState("")
  const [District,setDistrict] = useState("")
  const [CivilStatus,setCivilStatus] = useState("")
  const [CellPhoneNumber,setCellPhoneNumber] = useState("")
  const [Pension,setPension] = useState("")
  const [ValidIdPresented,setValidIdPresented] = useState("")
  const [SurNameError, setSurNameError] = useState()

  //Error handle
  const [ApplicationError, setApplicationError] = useState()
  const [FirstNameError, setFirstNameError] = useState()
  const [MiddleNameError, setMiddleNameError] = useState()
  const [AddressError, setAddressError] = useState()
  const [YrsofResidenceInManilaError, setYrsofResidenceInManilaError] = useState()
  const [BirthPlaceError, setBirthPlaceError] = useState()
  const [GenderError, setGenderError] = useState()
  const [NationalityError, setNationalityError] = useState()
  const [AgeError, setAgeError] = useState()
  const [BarangayError, setBarangayError] = useState()
  const [ZoneError, setZoneError] = useState()
  const [DistrictError, setDistrictError] = useState()
  const [CivilStatusError, setCivilStatusError] = useState()
  const [CellPhoneNumberError, setCellPhoneNumberError] = useState()
  const [PensionError, setPensionError] = useState()
  const [ValidIdPresentedError, setValidIdPresentedError] = useState()
  const [Error,setError] = useState(null);
  

  




//submit data button
const  handleButton = async (e)=> {
  e.preventDefault()



  const data ={
  TypeofApplication: TypeofApplication,
  SurName: SurName,
  FirstName: FirstName,
  MiddleName: MiddleName,
  Address: Address,
  YrsofResidenceInManila: YrsofResidenceInManila,
  BirthPlace: BirthPlace,
  DateofBirth: DateofBirth,
  Gender: Gender,
  Nationality: Nationality,
  Age: Age,
  Barangay: Barangay,
  Zone: Zone,
  District: District,
  CivilStatus: CivilStatus,
  CellPhoneNumber: CellPhoneNumber,
  Pension: Pension,
  ValidIdPresented: ValidIdPresented,
  }

  /*const checkfield =(fieldValue,FieldName) =>{
    if(fieldValue ==="")
    alert(`Please fil in ${fieldName} Field`);
  }*/


  // Check for any validation errors before submitting
  if (SurNameError !== "") {
    alert("Please fill in Surname field.");
    return;
  }
  if (FirstNameError !== "") {
    alert("Please fill in Firstname field.");
    return;
  }
  if (MiddleNameError !== "") {
    alert("Please fill in MiddleName field.");
    return;
  }
  if (AddressError !== "") {
    alert("Please fill in Address field.");
    return;
  }
  if (YrsofResidenceInManilaError !== "") {
    alert("Please fill in Years of Residence in Manila field.");
    return;
  }
  if (BirthPlaceError !== "") {
    alert("Please fill in Birth Place field.");
    return;
  }
  if (GenderError !== "") {
    alert("Please fill in Gender field.");
    return;
  }
  if (NationalityError !== "") {
    alert("Please fill in Nationality field.");
    return;
  }
  if (AgeError !== "") {
    alert("Please fill in Age field.");
    return;
  }
  if (BarangayError !== "") {
    alert("Please fill in Barangay field.");
    return;
  }
  if (ZoneError !== "") {
    alert("Please fill in Zone field.");
    return;
  }
  

  if (CellPhoneNumberError !== "") {
    alert("Please fill in Contact Number field.");
    return;
  }
  if (PensionError !== "") {
    alert("Please fill in Pension field.");
    return;
  }


  try{
  const response = await fetch('https://teal-cape-buffalo-sock.cyclic.app/api/usersRoute/', {
            method:'POST',
            body:JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            
        })
        const json = await response.json()

      if (!response.ok) {
        setError(json.error);
        // Optionally, show an error message to the user
        alert("An error occurred. Please try again later.");

      } else{
        //console.log('New Users Addedd', json)
        setSurname("")
        setFirstname('')
        setMiddleName('')
        setYrsofResidenceInManila('')
        setAddress('')
        setBirthPlace('')
        setGender('')
        setNationality('')
        setAge('')
        setBarangay('')
        setZone('')
        setDistrict('')
        setCivilStatus('')
        setCellPhoneNumber('')
        setPension('')
        setValidIdPresented('')
        setTypeofApplications('')
        setDateofBirth('')
        alert("Register successfully!");
      }
      

    } 
    catch (error){
      console.error("Error adding new user:", error);
      // Optionally, show an error message to the user
      alert("An error occurred. Please try again later.");
    }
  }

//input error
const handleValidation = (field, value) => {
  switch (field) {
    case "SurName":
      setSurNameError(value.trim() === "" ? "Surname is required" : "");
      break;
    // Add similar cases for other fields
    case "FirstName":
    setFirstNameError(value.trim() === "" ? "Firstname is required": "")
    break;
    case "MiddleName":
    setMiddleNameError(value.trim() === "" ? "MiddleName is required": "")
    break;
    case "Address":
    setAddressError(value.trim() === "" ? "Address is required": "")
    break;
    case "YrsofResidenceInManila":
    setYrsofResidenceInManilaError(value.trim() === "" ? "Years of Residence In Manila is required": "")
    break;
    case "BirthPlace":
    setBirthPlaceError(value.trim() === "" ? "Birth Place is required": "")
    break;
    /*case "DateofBirth":
    setDateofBirthEr(value.trim() === "" ? "Date of Birth is required": "")
    break;*/
    case "Gender":
    setGenderError(value.trim() === "" ? "Gender is required": "")
    break;
    case "Nationality":
    setNationalityError(value.trim() === "" ? "Nationality is required": "")
    break;
    case "Age":
    setAgeError(value.trim() === "" ? "Age is required": "")
    break;
    case "Barangay":
    setBarangayError(value.trim() === "" ? "Barangay is required": "")
    break;
    case "Zone":
    setZoneError(value.trim() === "" ? "Zone is required": "")
    break;
    case "Gender":
    setGenderError(value.trim() === "" ? "Gender is required": "")
    break;
    case "CellPhoneNumber":
    setCellPhoneNumberError(value.trim() === "" ? "Contact Number is required": "")
    break;
    case "Pension":
    setPensionError(value.trim() === "" ? "Pension is required": "")
    break;
    case "ValidIdPresented":
    setValidIdPresentedError(value.trim() === "" ? "Valid ID is required": "")
    break;
    default:
      break;
  }
};


  return (
    <div className="container-fluid">
      <div className="titleHolder">
        <div className="cards__container">
          <div className="cards-wrapper">
            <h1>Application form for Senior Citizen ID</h1>
          </div>
          <form onSubmit={handleButton}>
          <FormControl fullWidth>
            <InputLabel id="input-gender">Type of Application</InputLabel>
            <Select
              autoFocus
              labelId="gender-label"
              id="gender"
              required
              label="Gender"
              value={TypeofApplication}
             onChange={(e) => setTypeofApplications(e.target.value)}
            >
              <MenuItem value="New Senior">New Senior</MenuItem>
              <MenuItem value="New Senior (NonVoter)">New Senior(NonVoter)</MenuItem>
            </Select>
          </FormControl>
          {SurNameError && <div className="error-message">{SurNameError}</div>}
          <TextField
            margin="dense"
            id="SurName"
            label="Surname"
            value={SurName}
            variant="outlined"
            //
            onChange={(e) => {
                setSurname(e.target.value);
                handleValidation("SurName", e.target.value);
              }}
           /* helperText = {!SurName ? "Surname is Required" : ""}
            error= {!SurName}*/
            fullWidth
          />
           {FirstNameError && <div className="error-message">{FirstNameError}</div>}
          <TextField
            margin="dense"
            id="FirstName"
            label="First name"
            value={FirstName}
            onChange={(e) => {
                setFirstname(e.target.value);
                handleValidation("FirstName", e.target.value);
              }}
            fullWidth
          />
          {MiddleNameError && <div className="error-message">{MiddleNameError}</div>}
          <TextField
            margin="dense"
            id="MiddleName"
            label="MiddleName"
            value={MiddleName}
            onChange={(e) => {
                setMiddleName(e.target.value);
                handleValidation("MiddleName", e.target.value);
              }}
            fullWidth
          />
          {AddressError && <div className="error-message">{AddressError}</div>}
          <TextField
            margin="dense"
            id="Address"
            label="Address"
            value={Address}
            onChange={(e) => {
                setAddress(e.target.value);
                handleValidation("Address", e.target.value);
              }}
            fullWidth
          />
           {YrsofResidenceInManilaError && <div className="error-message">{YrsofResidenceInManilaError}</div>}
          <TextField
            margin="dense"
            id="yearofresidence"
            label="Year of Residence in Manila"
            value={YrsofResidenceInManila}
            onChange={(e) => {
                setYrsofResidenceInManila(e.target.value);
                handleValidation("YrsofResidenceInManila", e.target.value);
              }}
            fullWidth
          />
          {BirthPlaceError && <div className="error-message">{BirthPlaceError}</div>}
          <TextField
            margin="dense"
            id="birthplace"
            label="Birthplace"
            value={BirthPlace}
            onChange={(e) => {
                setBirthPlace(e.target.value);
                handleValidation("BirthPlace", e.target.value);
              }}
            fullWidth
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
               label="Enter BirthDate" 
               value={DateofBirth}
               sx={{ width: '100%' }}
               onChange={(newDate) => 
                  // Get the selected date from the DatePicker component's value property
                  //const selectedDate = DateofBirth;
                  setDateofBirth(newDate)}
               />
          </LocalizationProvider>
          {GenderError && <div className="error-message">{GenderError}</div>}
          <FormControl fullWidth>
            <InputLabel id="input-gender">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"

              label="Gender"
                value={Gender}
                onChange={(e) => {
                setGender(e.target.value);
                handleValidation("Gender", e.target.value);
              }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>
          {NationalityError && <div className="error-message">{NationalityError}</div>}
          <TextField
            margin="dense"
            id="nationality"
            label="Nationality"
            value={Nationality}
            onChange={(e) => {
                setNationality(e.target.value);
                handleValidation("Nationality", e.target.value);
              }}
            fullWidth
          />
           {AgeError && <div className="error-message">{AgeError}</div>}
          <TextField 
          margin="dense"
           id="age" 
           label="Age"
           value={Age}
           onChange={(e) => {
                setAge(e.target.value);
                handleValidation("Age", e.target.value);
              }}
            fullWidth />
            {BarangayError && <div className="error-message">{BarangayError}</div>}
          <TextField
            margin="dense"
            id="barangay"
            label="Barangay"
            value={Barangay}
            onChange={(e) => {
                setBarangay(e.target.value);
                handleValidation("Barangay", e.target.value);
              }}
            fullWidth
          />
          {ZoneError && <div className="error-message">{ZoneError}</div>}
          <TextField
            margin="dense"
            id="zone"
            label="Zone"
            value={Zone}
            onChange={(e) => {
                setZone(e.target.value);
                handleValidation("Zone", e.target.value);
              }}
            fullWidth
          />
        <FormControl fullWidth>
            <InputLabel id="input-District">District</InputLabel>
            <Select
              labelId="district-label"
              id="district"
              required
              label="District"
              value={District}
              onChange={(e) => {
                setZone(e.target.value);
                handleValidation("District", e.target.value);
              }}
            >
              <MenuItem value="District 1">District 1</MenuItem>
              <MenuItem value="District 2">District 2</MenuItem>
              <MenuItem value="District 3">District 3</MenuItem>
              <MenuItem value="District 4">District 4</MenuItem>
              <MenuItem value="District 5">District 5</MenuItem>
              <MenuItem value="District 6">District 6</MenuItem>
              
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="input-CivilStatus">CivilStatus</InputLabel>
            <Select
              labelId="gender-label"
              id="civilStatus"
              required
              label="CivilStatus"
              value={CivilStatus}
            onChange={(e) => setCivilStatus(e.target.value)}
            >
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Married">Married</MenuItem>
              <MenuItem value="Widow">Widow</MenuItem>
              <MenuItem value="Legal Separated">Legal Separated</MenuItem>
              
            </Select>
          </FormControl>
          {CellPhoneNumberError && <div className="error-message">{CellPhoneNumberError}</div>}
          <TextField
            margin="dense"
            id="phnumber"
            label="Contact Number"
            value={CellPhoneNumber}
            onChange={(e) => {
                setCellPhoneNumber(e.target.value);
                handleValidation("CellPhoneNumber", e.target.value);
              }}
            fullWidth
          />
           {PensionError && <div className="error-message">{PensionError}</div>}
          <TextField
            margin="dense"
            id="pension"
            label="Monthly Pension"
            value={Pension}
            onChange={(e) => {
                setPension(e.target.value);
                handleValidation("Pension", e.target.value);
              }}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="input-id">Valid ID Presented</InputLabel>
            <Select
              labelId="id-label"
              id="id"
              required
              value={ValidIdPresented}
             onChange={(e) => setValidIdPresented(e.target.value)}
            >
              <MenuItem value="Passport">Passport ID</MenuItem>
              <MenuItem value="VotersId">Voter's ID</MenuItem>
              <MenuItem value="Sss ID">SSS ID</MenuItem>
              <MenuItem value="Umid ID">Umid ID</MenuItem>
              <MenuItem value="PoliceClearance">Police Clearance</MenuItem>
              <MenuItem value="NBIClearance">NBI Clearance</MenuItem>
              <MenuItem value="National ID">National ID</MenuItem>
            </Select>
          </FormControl>

          <Button className="reg-button" type="submit" variant="contained" disableElevation>
          Register</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default IdRegistration;