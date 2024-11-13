import React from "react";
import { Button } from "react-bootstrap";
import { FiDownload } from "react-icons/fi";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useCommon } from '../hooks/useCommon';

/**fetchData: A function that returns a promise resolving to an array of data objects.
columns: An array of objects, each with a dataKey and potentially other properties (like title).
eg:columns = [
    { header: "Date", dataKey: "date" },          
    { header: "Receipt / Payment", dataKey: "rp" },    
    { header: "Transaction Mode", dataKey: "transactionMode" }, 
    { header: "Account Head", dataKey: "accountHead" },  
];
filename: A string representing the base name of the PDF file.
heading: A string that will serve as the title of the PDF document. */

const DownloadButton = ({ fetchData, columns, filename,heading,disabled }) => {
    const { getAmountWithCommas, getDate } = useCommon();// Destructuring utility functions from custom hook

    /**
     * handleDownload
     * This function is triggered when the download button is clicked. It generates the PDF using jsPDF.
     */
    const handleDownload = async () => {
        // Fetch the data for the table
        const fullData = await fetchData();

        if (!fullData || fullData.length === 0) {
            return; 
        }

        // Create a new PDF document
        const doc = new jsPDF();

        // Calculate the center position for the dynamic heading
        const pageWidth = doc.internal.pageSize.getWidth();
        const titleX = pageWidth / 2 - (doc.getTextWidth(heading) / 2); // Calculate centered position
        
        // Set the header color for consistency
        const headerColor = [0, 102, 204]; // RGB color for the heading (matching the table header)

        // Add the dynamic heading to the document
        doc.setFontSize(18); // Set font size for heading
        doc.setTextColor(...headerColor); // Set color for heading (using spread operator)
        doc.setFont("helvetica", "bold"); // Set font to bold
        doc.text(heading, titleX, 15); // Position heading with reduced margin

        const tableColumn = columns;
        const tableRows = [];

        fullData.forEach((dataRow) => {
            const dataSet = columns.map(column => {
                let value = dataRow[column.dataKey];
                
                // Format date fields if applicable
                if (column.dataKey.toLowerCase().includes('date') && value) {
                    value = getDate(value);
                }
                // Format numeric fields with commas
                if (typeof value === 'number') {
                    value = getAmountWithCommas(value);
                }

                return value !== null && value !== undefined ? value : '';
            });
            tableRows.push(dataSet);
        });

        // Add the table to the document with the formatted data
        doc.autoTable(tableColumn, tableRows, {
            startY: 24, // Set startY to avoid overlapping with the heading
            theme: 'striped', // Optional: Set a table theme
            headStyles: { fillColor: headerColor, textColor: [255, 255, 255] }, // Set header color
            styles: { cellPadding: 3, fontSize: 10 }, // Adjust cell padding and font size
        });
        // Save the generated PDF with the given filename
        doc.save(`${filename}.pdf`);
    };

    return (
        <Button
            variant="link"
            className="text-center me-3"
            style={{ textDecoration: "none" }}
            onClick={handleDownload}
            disabled={disabled}
        >
            <FiDownload style={{ fontSize: "1.5rem", color: "#3474EB" }} />
            {/* <br /> */}
            {/* <label style={{ textAlign: "center", color: "#000000" }}>Download</label> */}
        </Button>
    );
};

export default DownloadButton;
