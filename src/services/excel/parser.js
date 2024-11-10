import xlsx from 'xlsx';

const { readFile, utils } = xlsx;



export async function parseExcelNew(filePath) {
    const workbook = await readFile(filePath);
    const result = {};
  
    workbook.SheetNames.forEach(sheetName => {
      const sheet = workbook.Sheets[sheetName];
      const jsonData = utils.sheet_to_json(sheet, { header: 1, raw: false });

  
      result[sheetName] = [];
    jsonData.forEach(row => {
        const rowData = row.map(cell => (cell === null || cell === undefined) ? 'nulll' : cell);
        result[sheetName].push(rowData);
    });
    
      const headerIndex = 5
      const subHeaderIndex = 6

      // Extract headers based on the given indices
      const headerRow = result[sheetName][headerIndex] || [];
      const subHeaderRow = subHeaderIndex !== null ? result[sheetName][subHeaderIndex] : [];

      // Clean up headers by replacing nulls with preceding values

    // Fill missing indices with preceding values
    const filledHeaders = [];
    for (let i = 0; i < headerRow.length; i++) {
        if (headerRow[i] === null || headerRow[i] === undefined) {
          filledHeaders[i] = filledHeaders[i - 1];
        } else {
          filledHeaders[i] = headerRow[i];
        }
    }

    result[sheetName] = { filledHeaders };
    //   result[sheetName] = {cleanHeaders}

      return 

    //   // Integrate sub-headers if available
    //   const headers = cleanHeaders.map((header, idx) => {
    //       if (subHeaderRow[idx]) {
    //           return `${header} ${subHeaderRow[idx]}`.trim();
    //       }
    //       return header;
    //   });

    //   // Structure table data based on headers
    //   const tableData = result[sheetName].slice(headerIndex + 1).map(row => {
    //       const rowData = {};
    //       headers.forEach((header, idx) => {
    //           rowData[header] = row[idx];
    //       });
    //       return rowData;
    //   });

    //   // Final format with table key
    //   result[sheetName] = {
    //       table: tableData
    //   };



    //   console.log("sheet",sheetName,jsonData)
  
    //   const firstRow = jsonData[0];
      
    //   if (firstRow && typeof firstRow[0] === 'string' && firstRow[0].trim() === 'TYPE') {
    //     console.log(`Applying logic for TYPE sheet: ${sheetName}`);
    //     result[sheetName] = processTypeSheet(jsonData);
    //   } else {
    //     console.log(`Unknown structure for sheet: ${sheetName}, applying default parsing`);
    //     result[sheetName] = processDefaultSheet(jsonData);
    //   }
    });
  
    return result;
  }
  function processTypeSheet(jsonData) {
    let result = {};
    let currentType = null;
    let subheadings = [];
    let foundTypeRow = false;
  
    jsonData.forEach((row) => {
      if (!foundTypeRow && typeof row[0] === 'string' && row[0].trim() === 'TYPE') {
        currentType = row[0];
        result[currentType] = {};
        foundTypeRow = true;
      }
      
      else if (foundTypeRow && typeof row[0] === 'string' && row[0].trim() === 'Use combobox') {
        subheadings = row;
        subheadings.forEach(subheading => {
          if (subheading) result[currentType][subheading] = [];
        });
      }
  
      else if (foundTypeRow && subheadings.length > 0) {
        subheadings.forEach((subheading, colIndex) => {
          if (result[currentType][subheading]) {
            result[currentType][subheading].push(parseValue(row[colIndex]));
          }
        });
      }
    });
  
    return result;
  }
  
  function processDefaultSheet(jsonData) {
    let result = [];
    
    jsonData.forEach(row => {
      const rowData = {};
      row.forEach((cell, colIndex) => {
        rowData[`col${colIndex}`] = parseValue(cell);
      });
      result.push(rowData);
    });
  
    return result;
  }
  