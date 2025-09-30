# Testing Guide - Align Invoice Management System

## Test Checklist

### ✅ Welcome Animation Tests

- [ ] **Animation Display**
  - Open `index.html` in browser
  - Verify "WELCOME TO ALIGN" text appears with animation
  - Confirm fireworks particles animate outward
  - Check skip button is visible in top-right

- [ ] **Skip Functionality**
  - Click "Skip" button
  - Verify smooth transition to dashboard (< 1 second)
  
- [ ] **Auto-Advance**
  - Reload page without clicking skip
  - Verify animation auto-advances after ~4 seconds
  - Confirm dashboard loads properly

### ✅ Dashboard Tests

- [ ] **Initial Load**
  - Verify sample invoice displays (Invoice #000001)
  - Check invoice card shows correct client name
  - Confirm total amount displays: EGP 8,697.40
  
- [ ] **Search Functionality**
  - Type "000001" in search box → should show invoice
  - Type "Modern" → should show invoice
  - Type "xyz123" → should show "No invoices found"
  - Clear search → invoice reappears

- [ ] **Sort Functionality**
  - Create 2-3 invoices with different dates
  - Test "Date (Newest First)" → verify order
  - Test "Date (Oldest First)" → verify reverse order
  - Test "Invoice # (Desc/Asc)" → verify numerical sort
  - Test "Client Name" → verify alphabetical sort

- [ ] **Card Actions**
  - Click "View" → opens invoice preview
  - Click "Edit" → opens form with data populated
  - Click "Clone" → opens form with new invoice number
  - Click "Delete" → shows confirmation dialog
  - Confirm delete → invoice removed from list

### ✅ Invoice Creation Tests

- [ ] **Auto-Fill Behavior**
  - Click "Create New Invoice"
  - Verify invoice number auto-generates (000002 if sample exists)
  - Verify date defaults to today
  - Verify payment terms has default text

- [ ] **Required Field Validation**
  - Try to save with empty invoice number → error message
  - Try to save with empty client name/company → error message
  - Try to save with no items → error message
  - Verify error notifications appear for 3 seconds

- [ ] **Duplicate Invoice Number**
  - Create invoice with number "TEST001"
  - Try to create another with "TEST001"
  - Verify error: "Invoice number already exists"

- [ ] **Client Information**
  - Fill all client fields
  - Verify all fields accept text input
  - Test with Arabic characters (if applicable)
  - Save and verify data persists

### ✅ Items Table Tests

- [ ] **Add Items**
  - Click "+ Add Item" button
  - Verify new row appears
  - Add 5+ items
  - Verify all rows remain editable

- [ ] **Remove Items**
  - Add multiple item rows
  - Click "Remove" on any row except last
  - Verify row is deleted
  - Try to remove last remaining row → should show error

- [ ] **Line Total Calculation**
  - Enter Quantity: 5, Unit Price: 100
  - Verify Line Total shows: 100.00
  - Change Quantity to 10
  - Verify Line Total updates to: 1000.00
  - Test with decimals (2.5 × 99.99)

- [ ] **Subtotal Calculation**
  - Add 3 items:
    - Item 1: 2 × 50 = 100
    - Item 2: 3 × 100 = 300
    - Item 3: 1 × 200 = 200
  - Verify Subtotal: 600.00

### ✅ Discount Tests

- [ ] **No Discount**
  - Select "No Discount"
  - Verify Discount Amount: 0.00
  - Verify After Discount = Subtotal

- [ ] **Percentage Discount**
  - Select "Percentage"
  - Enter 10
  - With Subtotal 1000, verify Discount: 100.00
  - Verify After Discount: 900.00
  - Test edge cases:
    - 0% → 0.00 discount
    - 100% → full discount
    - 101% → should show error or cap at 100

- [ ] **Fixed Amount Discount**
  - Select "Fixed Amount"
  - Enter 250
  - Verify Discount Amount: 250.00
  - Verify After Discount = Subtotal - 250
  - Test with amount > Subtotal → should show error

### ✅ Tax Calculation Tests

- [ ] **VAT 14%**
  - Set After Discount to 1000
  - Check "Apply VAT 14%"
  - Verify VAT Amount: 140.00
  - Verify Net Order increases by 140
  - Uncheck VAT
  - Verify VAT Amount: 0.00

- [ ] **Discount Tax 1%**
  - Set After Discount to 1000
  - Check "Apply Discount Tax 1%"
  - Verify Discount Tax: -10.00
  - Verify Net Order decreases by 10
  - Uncheck
  - Verify Discount Tax: 0.00

- [ ] **Combined Taxes**
  - After Discount: 1000
  - Enable VAT (14%) → +140
  - Enable Discount Tax (1%) → -10
  - Verify Net Order: 1130

### ✅ Transport Cost Tests

- [ ] Enter 0 → Net Order unchanged
- [ ] Enter 100 → Net Order increases by 100
- [ ] Enter 250.50 → verify decimal handling
- [ ] Test with negative number (should not be allowed or show error)

### ✅ Full Calculation Test

**Scenario**: Complete invoice with all features
- Subtotal: 5000.00
- Discount: 10% (500.00)
- After Discount: 4500.00
- VAT 14%: 630.00
- Discount Tax 1%: -45.00
- Transport: 200.00
- **Expected Net Order**: 5285.00

Steps:
1. Create invoice with items totaling 5000
2. Apply 10% discount
3. Enable VAT
4. Enable Discount Tax
5. Add 200 transport
6. Verify final total matches expected

### ✅ Signature Upload Tests

- [ ] **Upload Image**
  - Click "Upload Signature/Stamp"
  - Select PNG/JPG image
  - Verify preview displays below
  - Verify image appears in invoice preview

- [ ] **No Signature**
  - Create invoice without signature
  - Verify preview shows "No signature provided"
  - Verify PDF generates without errors

### ✅ Invoice Preview Tests

- [ ] **Layout Verification**
  - Create and save invoice
  - Click "View"
  - Verify header matches sample image:
    - Dark gradient background
    - Company logo on left
    - Phones on right
    - Curved white separator
  - Verify "INVOICE" title is large and centered
  - Verify client info on left, invoice details on right
  - Verify items table has yellow header
  - Verify Grand Total has yellow background
  - Verify signature section at bottom

- [ ] **Data Display**
  - Verify all client fields display correctly
  - Verify all item rows display correctly
  - Verify calculations display correctly
  - Verify notes/terms display if provided
  - Verify payment terms display

- [ ] **Arabic Text** (if using Arabic)
  - Enter Arabic text in client name
  - Verify RTL display in preview
  - Verify font rendering is correct

### ✅ PDF Export Tests

- [ ] **Basic Export**
  - View any invoice
  - Click "Download PDF"
  - Verify notification: "Generating PDF..."
  - Verify file downloads
  - Verify filename format: `InvoiceNumber_ClientName.pdf`

- [ ] **PDF Content**
  - Open downloaded PDF
  - Verify single A4 page
  - Verify all content is visible (not cut off)
  - Verify logo appears
  - Verify signature appears (if uploaded)
  - Verify text is crisp and readable
  - Verify colors match screen version

- [ ] **Filename Tests**
  - Invoice #001, Client "John Smith" → `001_John_Smith.pdf`
  - Invoice #TEST-123, Client "ABC Corp" → `TEST-123_ABC_Corp.pdf`
  - Client with spaces → underscores or preserved

- [ ] **Special Characters**
  - Create invoice with Arabic text
  - Download PDF
  - Verify Arabic text renders correctly
  - Verify RTL direction is maintained

### ✅ Edit Functionality Tests

- [ ] **Load Existing Invoice**
  - Click "Edit" on any invoice
  - Verify all fields populate correctly
  - Verify all items load in table
  - Verify discount settings load
  - Verify tax checkboxes load
  - Verify signature loads

- [ ] **Update and Save**
  - Edit invoice number
  - Edit client name
  - Add/remove items
  - Change discount
  - Click "Save"
  - Verify "Invoice updated successfully"
  - Verify changes reflected in dashboard
  - View invoice → verify all changes saved

- [ ] **Cancel Edit**
  - Edit an invoice
  - Make changes
  - Click "Back to Dashboard"
  - Verify changes not saved

### ✅ Clone Functionality Tests

- [ ] Click "Clone" on invoice
- [ ] Verify form loads with all data except invoice number
- [ ] Verify new invoice number auto-generated
- [ ] Verify form title: "Create New Invoice (Cloned)"
- [ ] Make changes and save
- [ ] Verify original invoice unchanged
- [ ] Verify new invoice created

### ✅ Delete Functionality Tests

- [ ] Click "Delete" on invoice
- [ ] Verify confirmation dialog appears
- [ ] Click "Cancel" → invoice remains
- [ ] Click "Delete" again → click "OK"
- [ ] Verify invoice removed from dashboard
- [ ] Verify notification: "Invoice deleted successfully"
- [ ] Refresh page → verify invoice still deleted (persistence)

### ✅ Data Persistence Tests

- [ ] **Create and Reload**
  - Create new invoice
  - Save
  - Refresh browser (F5)
  - Verify invoice still appears in dashboard

- [ ] **Edit and Reload**
  - Edit invoice
  - Save changes
  - Refresh browser
  - Verify changes persisted

- [ ] **Multiple Invoices**
  - Create 5+ invoices
  - Refresh browser
  - Verify all invoices still present
  - Verify correct order

- [ ] **Clear Data**
  - Open browser console
  - Run: `localStorage.clear()`
  - Refresh page
  - Verify sample invoice reappears (seeded)

### ✅ Responsive Design Tests

- [ ] **Desktop (1920×1080)**
  - Verify layout uses full width appropriately
  - Verify invoice grid shows 3-4 columns
  - Verify form sections side-by-side

- [ ] **Tablet (768×1024)**
  - Verify dashboard adapts to 2 columns
  - Verify form remains usable
  - Verify invoice preview scrollable

- [ ] **Mobile (375×667)**
  - Verify dashboard stacks to 1 column
  - Verify form fields stack vertically
  - Verify buttons remain accessible
  - Verify items table scrolls horizontally

### ✅ Browser Compatibility Tests

Test in multiple browsers:

- [ ] **Chrome**
  - All features work
  - PDF generates correctly
  - Animations smooth

- [ ] **Firefox**
  - All features work
  - PDF generates correctly
  - Animations smooth

- [ ] **Safari**
  - All features work
  - PDF generates correctly
  - Date picker works

- [ ] **Edge**
  - All features work
  - PDF generates correctly

### ✅ Performance Tests

- [ ] **Large Invoice**
  - Create invoice with 50+ items
  - Verify calculations still fast (< 500ms)
  - Verify PDF generation completes (< 30s)

- [ ] **Many Invoices**
  - Create 100+ invoices
  - Verify dashboard loads in reasonable time
  - Verify search remains responsive

- [ ] **Large Signature**
  - Upload 5MB+ signature image
  - Verify upload works
  - Verify PDF generation completes

### ✅ Edge Cases

- [ ] **Zero Quantity**
  - Enter 0 quantity
  - Verify line total is 0
  - Verify item excluded or handled properly

- [ ] **Negative Price**
  - Try to enter negative price
  - Verify validation prevents or handles

- [ ] **Very Large Numbers**
  - Enter 999999999 as price
  - Verify display doesn't break
  - Verify calculations correct

- [ ] **Decimal Precision**
  - Enter 33.333333
  - Verify rounds to 2 decimals (33.33)
  - Verify calculations maintain accuracy

- [ ] **Special Characters in Names**
  - Client name: "O'Brien & Co."
  - Verify saves correctly
  - Verify displays in PDF
  - Verify filename handles special chars

- [ ] **Empty Optional Fields**
  - Create invoice with only required fields
  - Verify saves successfully
  - Verify preview shows only filled fields
  - Verify PDF generates

### ✅ Acceptance Criteria Verification

1. ✅ Welcome animation with skip button works
2. ✅ Can create invoice with multiple items
3. ✅ Date defaults to today and is editable
4. ✅ Discount supports percent/fixed, VAT and Discount Tax work
5. ✅ Transport adds to net order
6. ✅ PDF downloads with correct filename
7. ✅ Logo and signature appear in PDF
8. ✅ Recent invoices list with all CRUD operations
9. ✅ Validation messages work

## Bug Reporting Template

If you find any issues, report with:

**Bug Title**: [Brief description]

**Steps to Reproduce**:
1. 
2. 
3. 

**Expected Result**: 

**Actual Result**: 

**Browser**: Chrome 90 / Firefox 88 / etc.

**Screenshots**: [If applicable]

**Console Errors**: [Check browser console]

## Test Results Summary

| Category | Tests Passed | Tests Failed | Notes |
|----------|-------------|--------------|-------|
| Welcome Animation | / | / | |
| Dashboard | / | / | |
| Invoice Creation | / | / | |
| Calculations | / | / | |
| PDF Export | / | / | |
| CRUD Operations | / | / | |
| Persistence | / | / | |
| Responsive Design | / | / | |

**Testing Completed By**: _______________
**Date**: _______________
**Overall Status**: ⬜ Pass ⬜ Fail ⬜ Pass with Issues