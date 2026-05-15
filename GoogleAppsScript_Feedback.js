// ============================================================
// RETIRE WISE AND LIVE HAPPY — Feedback Form Handler
// ============================================================
// SETUP INSTRUCTIONS:
// 1. Open your Google Sheet (create one first with any name)
// 2. Click Extensions → Apps Script
// 3. Delete any existing code in the editor
// 4. Paste THIS entire script and click Save (💾)
// 5. Click Deploy → New Deployment
//    - Type: Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 6. Click Deploy → Authorize → Allow
// 7. Copy the Web App URL shown — paste it into your HTML files
//    where it says: PASTE_YOUR_APPS_SCRIPT_URL_HERE
// ============================================================

const SHEET_NAME = "Feedback";  // Tab name in your Google Sheet

function doPost(e) {
  try {
    const sheet = getOrCreateSheet();
    const data  = JSON.parse(e.postData.contents);

    // Add header row if sheet is brand new
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Page",
        "Rating",
        "Name",
        "Email",
        "Message"
      ]);
      // Style header row
      const header = sheet.getRange(1, 1, 1, 6);
      header.setBackground("#1a1a1a");
      header.setFontColor("#d4af37");
      header.setFontWeight("bold");
    }

    // Write submission
    sheet.appendRow([
      new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
      data.page    || "Unknown",
      data.rating  || "—",
      data.name    || "Anonymous",
      data.email   || "—",
      data.message || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Allow browser preflight (CORS OPTIONS request)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ result: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}
