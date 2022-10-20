const parser = require('simple-excel-to-json')
const doc = parser.parseXls2Json('./Example.xlsx')[0]; 
const json2xls = require("json2xls")
const fs = require("fs");

const totalCgpa = doc.reduce((prevValue, currentValue) => {
    prevValue += currentValue.CGPA
    return prevValue
}, 0)

const averageCgpa = totalCgpa / doc.length;

// A+ = 9.5, A = 9 and above, B = 8.5 and above, C = 8.5 or below

const gradedDocument = doc.map((student) => {
    if (student.CGPA >= 9.5) {
        student.GRADE = "A+"
    } else if (student.CGPA < 9.5 && student.CGPA >= 9) {
        student.GRADE = "A"
    } else if (student.CGPA < 9) {
        student.GRADE = "B"
    }
    return student;
});

const filteredDocument = gradedDocument.filter(student => student.CGPA > 8);

gradedDocument.push({CGPA: averageCgpa, NAME: "Average Grades"})

const excelDocument = json2xls(gradedDocument);

fs.writeFileSync("Grades.xlsx", excelDocument, "binary")

console.log(filteredDocument)