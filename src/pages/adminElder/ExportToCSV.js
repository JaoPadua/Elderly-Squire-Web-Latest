import { Button } from '@mui/material';
import React from 'react';
import { CSVLink } from 'react-csv';
import {format} from 'date-fns'

const ExportToCSV = ({ data }) => {
    const exportDataToCSV = () => {
        const headerRow = {
            'BRGY': 'BRGY',
            'LAST NAME': 'LAST NAME',
            'FIRST NAME': 'FIRST NAME',
            'MIDDLE NAME': 'MIDDLE NAME',
            'SUFFIX': 'SUFFIX',
            'Age': 'Age',
            'DateOfBirth': 'DateOfBirth',
            'MonthOfBirth': 'BIRTH MONTH',
            'DayOfBirth': 'BIRTH DAY',
            'YearOfBirth': 'BIRTH YEAR',
            'STREET NAME': 'STREET NAME',
            'DISTRICT NO.': 'DISTRICT NO.',
            'ZONE': 'Zone',
            'MOBILE NO.': 'MOBILE NO.',
            'GENDER': 'GENDER',
            'VOTER': 'VOTER',
            'STATUS': 'STATUS'
        };

         // Convert data to CSV format
         const csvFormattedData = data.map(item => {
            const dobDate = item.DateOfBirth ? new Date(item.DateOfBirth) : null;
            const birthMonth = dobDate ? dobDate.getMonth() + 1 : '';
            const birthDay = dobDate ? dobDate.getDate() : '';
            const birthYear = dobDate ? dobDate.getFullYear() : '';
            return {
                'BRGY': item.Barangay,
                'LAST NAME': item.SurName,
                'FIRST NAME': item.FirstName,
                'MIDDLE NAME': item.MiddleName,
                'SUFFIX': item.Suffix,
                'Age': item.Age,
                'DateOfBirth': item.DateOfBirth,
                'MonthOfBirth': birthMonth, // Extract month
                'DayOfBirth': birthDay,   // Extract day
                'YearOfBirth': birthYear,  // Extract year
                'STREET NAME': item.Address,
                'DISTRICT NO.': item.District,
                'ZONE': item.Zone,
                'MOBILE NO.': item.MobilePhone,
                'GENDER': item.Gender,
                'VOTER': item.TypeofApplication,
                'STATUS': item.Status,
            };
        });
        // Create CSV data array with formatted dates
        const csvData = [Object.values(headerRow), ...csvFormattedData.map(row => Object.values(row))];

        // Create CSV content
        const csvContent = csvData.map(row => row.join(',')).join('\n');
        
        // Create CSV link
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodedUri);
        link.setAttribute('download', 'ExportedElder.csv');
        document.body.appendChild(link);
        link.click();
    };

    return (
        <Button 
            size="large"
            variant="contained"
            onClick={exportDataToCSV}
        >
            Export to CSV
        </Button>
    );
};


export default ExportToCSV ;
