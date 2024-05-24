import exceljs from "exceljs";

const EmptyCell = { value: "", rowspan: 1, colspan: 1 };

function download(wookbook, file) {
  wookbook.xlsx.writeBuffer({ base64: true }).then(buffer => {
    let blob = new Blob([buffer], {
      type: "application/octet-stream",
    });
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.href = url;
    link.download = (file || "export") + ".xlsx";
    link.click();
  });
}

function getCellChar(index) {
  index--;
  let prefix = "";
  let int = parseInt(index / 26);
  if (int > 0) {
    prefix = String.fromCharCode(65 + int - 1);
  }
  return prefix + String.fromCharCode(65 + (index % 26));
}

function buildSheetRow(sheet, tableRow) {
  let row = sheet.getRow(tableRow.index);
  tableRow.cells.forEach((tabelCell, cellIndex) => {
    let cell = row.getCell(cellIndex + 1);
    cell.alignment = {
      vertical: tabelCell.verticalAlign || "middle",
      horizontal: tabelCell.textAlign || "center",
      wrapText: true,
    };
    cell.font = {
      bold: tabelCell.fontWeight == 700,
      color: { argb: "ff515a6e" },
    };
    if (tabelCell.backgroundColor) {
      cell.fill = {
        type: "gradient",
        gradient: "angle",
        degree: 0,
        stops: [
          { position: 0, color: { argb: tabelCell.backgroundColor } },
          { position: 1, color: { argb: tabelCell.backgroundColor } },
        ],
      };
      cell.border = {
        top: { style: "thin", color: { argb: "ffdcdee2" } },
        left: { style: "thin", color: { argb: "ffdcdee2" } },
        bottom: { style: "thin", color: { argb: "ffdcdee2" } },
        right: { style: "thin", color: { argb: "ffdcdee2" } },
      };
    }
    cell.value = tabelCell.value;
  });
}

function buildSheetRows(sheet, rows) {
  let rowsCount = rows.length;
  rows.forEach((row, index) => {
    row.index = index + 1;
    row.cells.forEach((cell, cellIndex) => {
      if (cell.rowspan <= 1) {
        return;
      }
      for (let r = 1; r < cell.rowspan; r++) {
        let mergeRow = rows[index + r];
        if (!mergeRow) {
          mergeRow = { cells: [], index: rowsCount + r };
          rows.push(mergeRow);
        }
        for (let i = 1; i <= cell.colspan; i++) {
          mergeRow.cells.splice(cellIndex, 0, { ...EmptyCell });
        }
      }
    });
  });

  rows.forEach(row => {
    buildSheetRow(sheet, row);
  });
}

function mergeRows(sheet, rows) {
  rows.forEach(row => {
    row.cells.forEach((cell, cellIndex) => {
      if (cell.rowspan <= 1 && cell.colspan <= 1) {
        return;
      }
      let start = getCellChar(cellIndex + 1) + row.index;
      let end =
        getCellChar(cellIndex + cell.colspan) + (row.index + cell.rowspan - 1);
      try {
        sheet.mergeCells(start + ":" + end);
      } catch (e) {
        console.log(cell);
      }
    });
  });
}

function getHex(num) {
  return (num < 16 ? "0" : "") + num.toString(16);
}

function getColor(color) {
  if (color.indexOf("rgba") >= 0) {
    color = color.substr(5, color.length - 6);
    let array = color.split(",");
    let a = Number(array[3].trim());
    return (
      "ff" +
      array
        .slice(0, 3)
        .map(t => getHex(255 - Number(t.trim()) * a))
        .join("")
    );
  } else {
    color = color.substr(4, color.length - 5);
    let array = color.split(",");
    return "ff" + array.map(t => getHex(Number(t.trim()))).join("");
  }
}

function buildRow(tableRow, cellSelector) {
  let tableCells = tableRow.querySelectorAll(cellSelector);
  let row = { cells: [] };
  tableCells.forEach(tabelCell => {
    let style = getComputedStyle(tabelCell);
    let textAlign = style.textAlign;
    let verticalAlign = style.verticalAlign;
    let fontWeight = style.fontWeight;
    let width = tabelCell.offsetWidth;
    let backgroundColor = getColor(style.backgroundColor);

    let value = tabelCell.innerText;
    if (value && !isNaN(value)) {
      value = Number(value);
    }
    let rowspan = Number(tabelCell.getAttribute("rowspan") || 1);
    let colspan = Number(tabelCell.getAttribute("colspan") || 1);
    row.cells.push({
      value,
      rowspan,
      colspan,
      textAlign,
      verticalAlign,
      fontWeight,
      width,
      backgroundColor,
    });
    if (colspan == 1) {
      return;
    }
    for (let i = 2; i <= colspan; i++) {
      row.cells.push({ ...EmptyCell });
    }
  });
  return row;
}

function getColumnWidth() {
  let div = document.createElement("div");
  div.innerText = "1234567890";
  div.style.display = "inline";
  document.body.appendChild(div);
  let width = div.offsetWidth / 10;
  document.body.removeChild(div);
  return width;
}

function exportRows(rows, bodyRow, file) {
  const wookbook = new exceljs.Workbook();
  const sheet = wookbook.addWorksheet("sheet");

  let columnWidth = getColumnWidth();

  if (bodyRow) {
    bodyRow.cells.forEach((cell, index) => {
      let column = sheet.getColumn(index + 1);
      column.width = cell.width / columnWidth;
    });
  }
  buildSheetRows(sheet, rows);
  mergeRows(sheet, rows);

  download(wookbook, file);
}

function exportTable(table, file) {
  let rows = [];
  let headRows = table.querySelectorAll("thead tr");
  headRows.forEach(row => {
    rows.push(buildRow(row, "th"));
  });
  let bodyRows = table.querySelectorAll("tbody tr");
  let bodyFirstRow;
  bodyRows.forEach(row => {
    let bodyRow = buildRow(row, "td");
    if (!bodyFirstRow) {
      bodyFirstRow = bodyRow;
    }
    rows.push(bodyRow);
  });
  let footRows = table.querySelectorAll("tfoot tr");
  footRows.forEach(row => {
    rows.push(buildRow(row, "td"));
  });

  exportRows(rows, bodyFirstRow, file);
}

export { exportTable };
