import React from 'react'

export const useImport = () => {
    const data = [
        {
            "d": 1,
            "description": "Your CSV deaders as in the table examid unnecessary encoding problems."
        },
        {
            "id": 2,
            "description": "For patient 'Gender' use 'Male', 'Female' value."
        },
        {
            "id": 3,
            "description": "For Age numbers only."
        },
        {
            "id": 4,
            "description": "For patient 'Marital Status', use 'Single', 'Married', 'Widowed', 'Separated', or 'Not Specified' value."
        }
    ]

    const tableData = [
            {
              "id": 1,
              "title": "emisId",
              "value": "65863523434"
            },
            {
              "id": 2,
              "title": "admissionNumber",
              "value": "786783"
            },
            {
              "id": 3,
              "title": "name",
              "value": "raja"
            },
            {
              "id": 4,
              "title": "nameInTamil",
              "value": "ராஜா"
            },
            {
              "id": 5,
              "title": "class",
              "value": "III"
            },
            {
              "id": 6,
              "title": "section",
              "value": "F"
            },
            {
              "id": 7,
              "title": "fatherName",
              "value": "ratheesh"
            },
            {
              "id": 8,
              "title": "fatherTamilName",
              "value": "ரதீஷ்"
            },
            {
              "id": 9,
              "title": "motherName",
              "value": "saraswathi"
            },
            {
              "id": 10,
              "title": "motherTamilName",
              "value": "சரஸ்வதி"
            },
            {
              "id": 11,
              "title": "aadharNumber",
              "value": "324424254553"
            },
            {
              "id": 12,
              "title": "phoneNumber",
              "value": "345345433345435"
            },
            {
              "id": 13,
              "title": "gender",
              "value": "male"
            },
            {
              "id": 14,
              "title": "dob",
              "value": "2010-04-12T00:00:00.000Z"
            },
            {
              "id": 15,
              "title": "doj",
              "value": "2013-06-15T00:00:00.000Z"
            },
            {
              "id": 16,
              "title": "address",
              "value": "khfadhsfahsjfhkdjfs"
            },
            {
              "id": 17,
              "title": "pincode",
              "value": "63432"
            },
            {
              "id": 18,
              "title": "bloodGroup",
              "value": "B+ve"
            },
            {
              "id": 19,
              "title": "religion",
              "value": "all"
            },
            {
              "id": 20,
              "title": "moi",
              "value": "afsf"
            },
            {
              "id": 21,
              "title": "community",
              "value": "BC"
            },
            {
              "id": 22,
              "title": "groupCode",
              "value": "2323"
            },
            {
              "id": 23,
              "title": "disabilityName",
              "value": "None"
            },
            {
              "id": 24,
              "title": "motherTongue",
              "value": "தமிழ்"
            },
            {
              "id": 25,
              "title": "bankAccount",
              "value": "1238513876133123"
            },
            {
              "id": 26,
              "title": "ifscCode",
              "value": "IFSC32424"
            },
            {
              "id": 27,
              "title": "micr",
              "value": "asfsfdf"
            },
            {
              "id": 28,
              "title": "tcNumber",
              "value": "234324324"
            },
            {
              "id": 29,
              "title": "tcStatus",
              "value": "puriyala"
            },
            {
              "id": 30,
              "title": "tcIssueDate",
              "value": "2013-07-12T00:00:00.000Z"
            }
    ]
  return {
    data,
    tableData
  }
}

