# Usage Examples - Align Invoice Management System

This guide provides step-by-step examples for common tasks.

## 📖 Table of Contents
1. [Example 1: Simple Invoice](#example-1-simple-invoice)
2. [Example 2: Invoice with Discount](#example-2-invoice-with-discount)
3. [Example 3: Complex Invoice with All Features](#example-3-complex-invoice-with-all-features)
4. [Example 4: Editing an Existing Invoice](#example-4-editing-an-existing-invoice)
5. [Example 5: Cloning an Invoice](#example-5-cloning-an-invoice)

---

## Example 1: Simple Invoice

**Scenario**: Create a basic invoice with 2 items, no discount, no taxes.

### Input Data
```
Client:
  Company: Grand Plaza Hotel
  Name: Omar Hassan
  Project: Restaurant Curtains
  Contact Number: +20 111 222 3333

Items:
  1. Premium Blackout Curtains × 12 @ 380.00 each
  2. Decorative Tiebacks × 24 @ 45.00 each

Payment Terms: Full payment upon delivery
```

### Steps

1. **Start New Invoice**
   - Click "+ Create New Invoice"
   - Invoice number auto-fills: `000002`
   - Date auto-fills to today

2. **Enter Client Info**
   ```
   Company: Grand Plaza Hotel
   Client Name: Omar Hassan
   Project: Restaurant Curtains
   Contact Number: +20 111 222 3333
   ```

3. **Add Items**
   
   **Item 1:**
   - Item Code: `CUR-001`
   - Item Type: `Curtain`
   - Description: `Premium Blackout Curtains`
   - Color: `Charcoal Gray`
   - Quantity: `12`
   - Unit Price: `380.00`
   - Line Total: `4560.00` (auto-calculated)
   
   Click "+ Add Item"
   
   **Item 2:**
   - Item Code: `ACC-002`
   - Item Type: `Accessory`
   - Description: `Decorative Tiebacks`
   - Color: `Gold`
   - Quantity: `24`
   - Unit Price: `45.00`
   - Line Total: `1080.00` (auto-calculated)

4. **Review Calculations**
   ```
   Subtotal: 5640.00
   Discount: 0.00
   After Discount: 5640.00
   VAT: 0.00 (unchecked)
   Discount Tax: 0.00 (unchecked)
   Transport: 0.00
   Net Order: 5640.00 EGP
   ```

5. **Payment Terms**
   - Update to: "Full payment upon delivery"

6. **Save**
   - Click "Save Invoice"
   - Success notification appears
   - Invoice preview displays

7. **Download PDF**
   - Click "Download PDF"
   - File downloads: `000002_Grand_Plaza_Hotel.pdf`

### Expected Result
- Simple, clean invoice
- Two line items
- Total: **5640.00 EGP**
- Professional PDF ready for client

---

## Example 2: Invoice with Discount

**Scenario**: Create an invoice with a 15% discount for a repeat customer.

### Input Data
```
Client:
  Company: Luxury Villas Development
  Name: Fatima Ahmed
  Location: 6th of October City
  Contact Number: +20 122 333 4444

Items:
  1. Silk Drapes × 20 @ 850.00 each
  2. Velvet Cushion Covers × 30 @ 120.00 each

Discount: 15% (repeat customer discount)
VAT: Apply 14%
```

### Steps

1. **Create Invoice**
   - Invoice #: `000003`
   - Date: Today

2. **Client Information**
   ```
   Company: Luxury Villas Development
   Client Name: Fatima Ahmed
   Location: 6th of October City
   Contact Number: +20 122 333 4444
   ```

3. **Add Items**
   
   **Item 1:**
   - Code: `DRP-001`
   - Type: `Drape`
   - Description: `Premium Silk Drapes`
   - Color: `Ivory`
   - Quantity: `20`
   - Unit Price: `850.00`
   - Line Total: `17000.00`
   
   **Item 2:**
   - Code: `CSH-002`
   - Type: `Cushion`
   - Description: `Velvet Cushion Covers`
   - Color: `Burgundy`
   - Quantity: `30`
   - Unit Price: `120.00`
   - Line Total: `3600.00`

4. **Apply Discount**
   - Discount Type: Select `Percentage`
   - Value: `15`
   - Discount Amount: `-3090.00` (auto-calculated)

5. **Apply Taxes**
   - Check ✅ "Apply VAT 14%"

6. **Review Calculations**
   ```
   Subtotal: 20,600.00
   Discount (15%): -3,090.00
   After Discount: 17,510.00
   VAT (14%): +2,451.40
   Net Order: 19,961.40 EGP
   ```

7. **Add Note**
   ```
   Notes: Thank you for your continued business! 
   15% repeat customer discount applied.
   All items include 1-year warranty.
   ```

8. **Save and Download**
   - Save invoice
   - Download PDF: `000003_Luxury_Villas_Development.pdf`

### Expected Result
- Invoice with 15% discount clearly shown
- VAT applied to discounted amount
- Total: **19,961.40 EGP**
- Professional notes included

---

## Example 3: Complex Invoice with All Features

**Scenario**: Create a comprehensive invoice using all available features.

### Input Data
```
Client:
  Company: Modern Living Interiors
  Client Name: Ahmed Ibrahim
  Project: Penthouse Renovation
  Location: Zamalek, Cairo
  Area: 250 sqm
  Designer: Layla Mansour
  Contact Person: Ahmed Ibrahim
  Contact Number: +20 100 555 6666

Items:
  1. Custom Motorized Curtains × 8 @ 1,200.00
  2. Luxury Linen Fabric (meters) × 50 @ 180.00
  3. Curtain Rails (premium) × 8 @ 350.00
  4. Installation Service × 1 @ 1,500.00

Discount: 1000 EGP (special project discount)
VAT: 14%
Discount Tax: 1%
Transport: 400 EGP
Signature: Uploaded
```

### Steps

1. **Create Invoice**
   - Invoice #: `PH-2025-001` (custom number)
   - Date: Select specific date if needed

2. **Complete Client Information**
   - Fill ALL client fields:
     ```
     Company: Modern Living Interiors
     Client Name: Ahmed Ibrahim
     Project: Penthouse Renovation
     Location: Zamalek, Cairo
     Area: 250 sqm
     Designer: Layla Mansour
     Contact Person: Ahmed Ibrahim
     Contact Number: +20 100 555 6666
     ```

3. **Add All Items**
   
   **Item 1:**
   ```
   Code: MTR-CUR-001
   Type: Motorized Curtain
   Description: Custom Motorized Curtains with Remote
   Color: Pearl White
   Quantity: 8
   Unit Price: 1200.00
   Line Total: 9600.00
   ```
   
   **Item 2:**
   ```
   Code: FAB-LIN-002
   Type: Fabric
   Description: Premium Linen Fabric (per meter)
   Color: Natural Beige
   Quantity: 50
   Unit Price: 180.00
   Line Total: 9000.00
   ```
   
   **Item 3:**
   ```
   Code: RAIL-003
   Type: Hardware
   Description: Premium Curtain Rails (Brushed Nickel)
   Color: Nickel
   Quantity: 8
   Unit Price: 350.00
   Line Total: 2800.00
   ```
   
   **Item 4:**
   ```
   Code: SRV-001
   Type: Service
   Description: Professional Installation Service
   Color: N/A
   Quantity: 1
   Unit Price: 1500.00
   Line Total: 1500.00
   ```

4. **Configure Discount**
   - Discount Type: `Fixed Amount`
   - Value: `1000`
   - Reason: Special project discount

5. **Apply All Taxes**
   - ✅ Check "Apply VAT 14%"
   - ✅ Check "Apply Discount Tax 1%"

6. **Add Transport**
   - Transport Cost: `400`

7. **Payment Terms**
   ```
   50% down payment upon contract signing
   25% upon delivery of materials
   25% upon completion of installation
   ```

8. **Notes/Terms**
   ```
   TERMS & CONDITIONS:
   • All materials are covered by 2-year manufacturer warranty
   • Installation includes training on motorized system operation
   • Any modifications after contract signing may incur additional charges
   • Payment schedule must be followed as outlined above
   • Colors may vary slightly from samples due to lighting conditions
   
   Thank you for choosing Align Fabrics & Curtains!
   ```

9. **Upload Signature**
   - Click "Upload Signature/Stamp"
   - Select signature image file
   - Verify preview shows correctly

10. **Review Complete Calculations**
    ```
    Subtotal: 22,900.00
    Discount (Fixed 1000): -1,000.00
    After Discount: 21,900.00
    VAT (14%): +3,066.00
    Discount Tax (1%): -219.00
    Transport: +400.00
    ═══════════════════════
    Net Order: 25,147.00 EGP
    ```

11. **Save and Download**
    - Save invoice
    - Review preview carefully
    - Download PDF: `PH-2025-001_Modern_Living_Interiors.pdf`

### Expected Result
- Comprehensive invoice with all details
- Multiple items with different types
- Complex calculation with all tax options
- Professional signature included
- Total: **25,147.00 EGP**
- Complete terms and conditions

---

## Example 4: Editing an Existing Invoice

**Scenario**: Client calls to change quantity and add an item to Invoice #000002.

### Original Invoice
```
Invoice: 000002
Client: Grand Plaza Hotel
Item 1: Premium Blackout Curtains × 12 @ 380.00
Item 2: Decorative Tiebacks × 24 @ 45.00
Total: 5,640.00 EGP
```

### Changes Requested
- Increase Curtains from 12 to 15 units
- Add: Curtain Rods × 12 @ 95.00 each

### Steps

1. **Find Invoice**
   - Go to Dashboard
   - Search for "000002" or "Grand Plaza"
   - Click "Edit" button on the invoice card

2. **Verify Load**
   - All fields populate correctly
   - Both items show in table
   - Calculations show original total

3. **Modify Item 1**
   - Find first item row
   - Change Quantity from `12` to `15`
   - Line Total auto-updates: `5700.00`

4. **Add New Item**
   - Click "+ Add Item"
   - Fill in new item:
     ```
     Code: ROD-001
     Type: Hardware
     Description: Decorative Curtain Rods
     Color: Bronze
     Quantity: 12
     Unit Price: 95.00
     Line Total: 1140.00
     ```

5. **Review Updated Calculations**
   ```
   Original Subtotal: 5,640.00
   New Subtotal: 6,840.00
   (5700.00 + 1080.00 + 1140.00)
   ```

6. **Save Changes**
   - Click "Save Invoice"
   - Notification: "Invoice updated successfully"

7. **Verify Update**
   - View invoice
   - Confirm all 3 items appear
   - Confirm new total: **6,840.00 EGP**
   - Download updated PDF

### Expected Result
- Original invoice updated (not duplicated)
- New item added successfully
- Quantity updated correctly
- New total: **6,840.00 EGP**
- PDF reflects all changes

---

## Example 5: Cloning an Invoice

**Scenario**: Create a new invoice for a repeat customer using previous invoice as template.

### Original Invoice
```
Invoice: 000005
Client: Luxury Villas Development
Items: 4 different fabric items
Total: 18,500.00 EGP
```

### New Invoice Needed
- Same client
- Similar items but different quantities
- New invoice number

### Steps

1. **Clone Original**
   - Go to Dashboard
   - Find Invoice #000005
   - Click "Clone" button
   - Form opens with all data pre-filled

2. **Verify Pre-Fill**
   - All client information loaded ✓
   - All items loaded ✓
   - Discount settings loaded ✓
   - Tax settings loaded ✓
   - Notes loaded ✓

3. **Update Invoice Number**
   - Auto-generated new number appears: `000008`
   - Or customize: `LVD-2025-002`

4. **Update Date**
   - Change to today's date

5. **Modify Items as Needed**
   - Item 1: Change quantity from 20 to 15
   - Item 2: Change quantity from 30 to 25
   - Item 3: Remove (click Remove button)
   - Item 4: Keep as is
   - Add new item if needed

6. **Adjust Discount**
   - Original: 15%
   - New: Change to 10% (different discount tier)

7. **Review New Calculations**
   - Totals recalculate automatically based on changes

8. **Update Notes**
   - Add: "Reference: Previous Order #000005"

9. **Save as New Invoice**
   - Click "Save Invoice"
   - New invoice created (original unchanged)

10. **Verify Both Exist**
    - Go to Dashboard
    - Search for client name
    - Both invoices appear:
      - #000005 (original)
      - #000008 or LVD-2025-002 (new)

### Expected Result
- New invoice created from template
- Original invoice unchanged
- Time saved by not re-entering client info
- Easy to modify quantities/items
- Both invoices available independently

---

## 💡 Pro Tips

### Tip 1: Keyboard Navigation
- Press **Tab** to move between fields quickly
- Press **Enter** in date field to open calendar
- Use arrow keys in date picker
- Tab through item table efficiently

### Tip 2: Batch Operations
When creating multiple invoices for the same client:
1. Create first invoice fully
2. Clone it
3. Modify invoice number and items
4. Repeat as needed
5. Much faster than starting fresh each time

### Tip 3: Template Invoices
Create "template" invoices for common scenarios:
- Template for standard residential job
- Template for commercial projects
- Template for fabric-only orders
- Clone and modify as needed

### Tip 4: Consistent Numbering
Use a consistent numbering scheme:
- Sequential: 000001, 000002, 000003...
- Date-based: 2025-001, 2025-002...
- Project-based: RES-001, COM-001, HOT-001...
- Helps with organization and searching

### Tip 5: Discount Documentation
Always add a note explaining significant discounts:
- "15% repeat customer discount"
- "10% bulk order discount"
- "Special project rate"
- Helps with accounting and customer communication

### Tip 6: Regular PDF Backups
- Export important invoices as PDFs
- Store in organized folder structure
- PDFs are permanent backups
- LocalStorage can be cleared accidentally

### Tip 7: Mobile Workflow
When on mobile/tablet:
- Use landscape mode for better table view
- Dashboard is fully functional
- Can view/clone invoices easily
- Create new invoices (form adapts to screen)
- PDF download works on mobile browsers

### Tip 8: Search Effectively
Search box finds matches in:
- Invoice numbers
- Client company names
- Client personal names
- Use partial matches: "Grand" finds "Grand Plaza Hotel"

### Tip 9: Signature Management
- Keep a standard signature file ready
- Recommended size: 200×100 pixels
- Format: PNG with transparent background
- Reuse across invoices by uploading each time

### Tip 10: Calculation Verification
Before finalizing large invoices:
1. Check subtotal matches item totals
2. Verify discount calculation
3. Confirm VAT is 14% of after-discount amount
4. Check discount tax is 1% (subtracted)
5. Verify transport added correctly
6. Double-check final total

---

## 🎓 Common Workflows

### Workflow A: Quick Cash Sale
1. Create New Invoice
2. Enter client name only
3. Add 1-2 items
4. No discount/taxes
5. Save & Download PDF
6. **Time**: ~2 minutes

### Workflow B: Standard Project
1. Create New Invoice
2. Complete all client details
3. Add 3-5 items
4. Apply standard discount (5-10%)
5. Enable VAT
6. Add payment terms
7. Upload signature
8. Save & Download PDF
9. **Time**: ~5-7 minutes

### Workflow C: Large Commercial Order
1. Create New Invoice (custom number)
2. Fill comprehensive client info
3. Add 10+ items
4. Calculate complex discount
5. Apply all taxes
6. Add transport cost
7. Write detailed terms & conditions
8. Upload signature
9. Review calculations thoroughly
10. Save & Download PDF
11. Email PDF to client
12. **Time**: ~15-20 minutes

### Workflow D: Recurring Monthly Invoice
1. Find previous month's invoice
2. Clone it
3. Update invoice number (increment)
4. Update date to new month
5. Adjust quantities if needed
6. Save & Download PDF
7. **Time**: ~3 minutes

---

## 📊 Sample Calculation Scenarios

### Scenario A: Simple (No Discount/Tax)
```
Items:
  10 × 100 = 1000
  5 × 200 = 1000

Subtotal: 2000.00
Net Order: 2000.00 EGP
```

### Scenario B: With Percentage Discount
```
Subtotal: 5000.00
Discount (10%): -500.00
After Discount: 4500.00
Net Order: 4500.00 EGP
```

### Scenario C: With VAT Only
```
Subtotal: 3000.00
VAT (14%): +420.00
Net Order: 3420.00 EGP
```

### Scenario D: Complete Calculation
```
Item 1: 10 × 150 = 1500.00
Item 2: 20 × 200 = 4000.00
Item 3: 5 × 300 = 1500.00

Subtotal: 7000.00
Discount (5%): -350.00
After Discount: 6650.00
VAT (14%): +931.00
Discount Tax (1%): -66.50
Transport: +300.00
═══════════════════
Net Order: 7814.50 EGP
```

---

## 🎉 Success Checklist

Before sending invoice to client:
- [ ] Invoice number is correct and unique
- [ ] Date is correct
- [ ] Client information is complete and accurate
- [ ] All items have correct descriptions
- [ ] Quantities and prices are verified
- [ ] Calculations are correct
- [ ] Discount applied correctly (if any)
- [ ] Taxes applied as agreed
- [ ] Transport cost included (if applicable)
- [ ] Payment terms are clear
- [ ] Notes/terms are appropriate
- [ ] Signature/stamp uploaded
- [ ] PDF generated and reviewed
- [ ] Filename is professional
- [ ] Invoice saved in system

---

**Need More Help?**
- See `QUICKSTART.md` for basics
- See `README.md` for full documentation
- See `TESTING.md` for troubleshooting

**Happy Invoicing!** 🎉