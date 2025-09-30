# Quick Start Guide - Align Invoice Management System

Get up and running in 5 minutes!

## 📦 Installation

### Option 1: Direct Browser Open (Simplest)
```bash
# 1. Download/clone the project
# 2. Open index.html in your browser
# That's it!
```

### Option 2: Local Server (Recommended)

**Using Python (Recommended - usually pre-installed):**
```bash
cd /path/to/align-invoice-app
python3 -m http.server 8000
# Open browser to: http://localhost:8000
```

**Using Node.js:**
```bash
cd /path/to/align-invoice-app
npx http-server -p 8000 -o
# Browser opens automatically
```

**Using VS Code:**
- Install "Live Server" extension
- Right-click on `index.html`
- Select "Open with Live Server"

## 🎬 First Launch

1. **Welcome Animation**
   - You'll see "WELCOME TO ALIGN" with fireworks
   - Wait 4 seconds or click "Skip"
   - Dashboard loads automatically

2. **Sample Invoice**
   - One pre-loaded invoice appears (Invoice #000001)
   - Click "View" to see the full invoice
   - Click "Download PDF" to test PDF generation

## ✨ Creating Your First Invoice

### Step 1: Start New Invoice
- Click **"+ Create New Invoice"** button
- Invoice number auto-fills (000002)
- Date auto-fills to today

### Step 2: Enter Client Information
Required fields (marked with *):
- **Company** or **Client Name**: e.g., "Modern Living Interiors"
- Optional: Project, Location, Area, Designer, Contact info

### Step 3: Add Invoice Items
- First item row is already there
- Click **"+ Add Item"** to add more rows

Example item:
- **Item Code**: FAB-001
- **Item Type**: Curtain
- **Description**: Premium Velvet Curtains
- **Color**: Royal Blue
- **Quantity**: 8
- **Unit Price**: 450.00
- **Line Total**: Calculates automatically (3600.00)

### Step 4: Configure Discounts & Taxes

**Discount Options:**
1. No Discount (default)
2. Percentage: e.g., 10% off subtotal
3. Fixed Amount: e.g., 500 EGP off

**Taxes:**
- ☑️ Apply VAT 14% (adds 14% to after-discount amount)
- ☑️ Apply Discount Tax 1% (subtracts 1% from after-discount amount)

**Transport:**
- Enter shipping cost if applicable: e.g., 250

### Step 5: Add Payment Terms & Notes
- Payment Terms: Pre-filled "75% down payment, 25% upon delivery" (editable)
- Notes: Add any terms & conditions

### Step 6: Upload Signature (Optional)
- Click **"Upload Signature/Stamp"**
- Select an image file (PNG/JPG)
- Preview appears below

### Step 7: Save
- Click **"Save Invoice"** button
- Success notification appears
- Invoice preview displays automatically

## 📄 Downloading PDF

1. View any invoice (from dashboard or after save)
2. Click **"Download PDF"** button
3. PDF generates with filename: `InvoiceNumber_ClientName.pdf`
4. Check your browser's download folder

**Example**: Invoice #000002 for "Modern Living" → `000002_Modern_Living.pdf`

## 🔍 Managing Invoices

### Search
- Type in search box: invoice number, client name, or company
- Results filter in real-time

### Sort
- Date (Newest/Oldest First)
- Invoice Number (Ascending/Descending)
- Client Name (Alphabetical)

### Actions on Each Invoice Card

| Button | Action |
|--------|--------|
| **View** | Opens invoice preview with PDF download option |
| **Edit** | Opens form with all data loaded for editing |
| **Clone** | Duplicates invoice with new invoice number |
| **Delete** | Removes invoice (asks for confirmation) |

## 💡 Pro Tips

### Automatic Features
- ✅ Invoice numbers auto-increment (but you can edit)
- ✅ Date defaults to today (but you can change)
- ✅ Calculations update in real-time
- ✅ Data saves automatically when you click "Save Invoice"
- ✅ All data persists in browser (survives reloads)

### Keyboard Shortcuts
- **Tab**: Move between fields quickly
- **Enter** in date field: Opens calendar picker
- **Ctrl/Cmd + R**: Refresh browser to see persisted data

### Calculations Logic
```
Subtotal = Sum of (Quantity × Unit Price) for all items
Discount = Percentage or Fixed amount
After Discount = Subtotal - Discount
VAT = 14% of After Discount (if enabled)
Discount Tax = 1% of After Discount (if enabled, subtracted)
Transport = Additional shipping cost
Net Order = After Discount + VAT - Discount Tax + Transport
```

### Example Calculation
- Subtotal: **5000.00**
- Discount (10%): **-500.00**
- After Discount: **4500.00**
- VAT (14%): **+630.00**
- Discount Tax (1%): **-45.00**
- Transport: **+200.00**
- **Net Order: 5285.00 EGP**

## 🎨 Customization

### Change Company Info
Edit `app.js` lines 7-15:
```javascript
const COMPANY_INFO = {
    name: "Your Company Name",
    taxNumber: "Your Tax Number",
    address: "Your Address",
    phones: {
        mohamed_kamel: "Phone 1",
        mohamed_sobhy: "Phone 2"
    }
};
```

### Replace Logo
- Replace `logo.svg` with your own logo
- Recommended size: 180×80 pixels
- Formats: SVG, PNG, JPG

### Change Colors
Edit `styles.css`:
- Line 431: `background: #f0c674;` (yellow accent for headers)
- Line 803: `background: #f0c674;` (grand total highlight)

## 📱 Mobile Usage

The app is fully responsive:
- Dashboard: Invoices stack vertically
- Form: Fields stack for easy input
- Invoice Preview: Scrolls horizontally if needed
- PDF: Always generates as A4 regardless of screen size

## 🐛 Troubleshooting

### PDF Not Downloading
- **Solution**: Ensure you have internet connection (needs CDN for html2pdf.js)
- **Check**: Look for console errors (F12 → Console tab)
- **Try**: Use a local server instead of direct file:// protocol

### Data Disappeared
- **Cause**: Browser cache cleared or private browsing mode
- **Solution**: Use normal browsing mode, don't clear localStorage
- **Backup**: Export important invoices as PDFs regularly

### Logo Not Showing
- **Check**: Logo file is named `logo.svg` and in same folder as index.html
- **Try**: Use a PNG file instead (update filename in code)
- **Verify**: File path is correct (relative paths)

### Calculation Seems Wrong
- **Verify**: You understand the calculation order (see Pro Tips)
- **Check**: Discount Tax is SUBTRACTED (reduces total)
- **Remember**: Percentages apply to "After Discount" not original subtotal

### Invoice Number Already Exists
- **Cause**: Trying to use a duplicate invoice number
- **Solution**: Use the auto-generated number or choose a unique one
- **Note**: Invoice numbers must be unique across all invoices

## 📞 Need Help?

1. **Check README.md** - Comprehensive documentation
2. **Check TESTING.md** - Detailed test cases for all features
3. **View Browser Console** - F12 → Console tab for errors
4. **Check localStorage** - F12 → Application → Local Storage

## 🚀 Next Steps

Now that you're set up:

1. ✅ Test the sample invoice
2. ✅ Create your first real invoice
3. ✅ Download a PDF and review it
4. ✅ Replace the logo with your company logo
5. ✅ Update company information in the code
6. ✅ Customize colors if desired
7. ✅ Train your team on using the system

## 🎉 You're Ready!

The invoice system is now fully operational. Enjoy creating professional invoices for Align Fabrics & Curtains!

---

**Need the full documentation?** See `README.md`  
**Need to test features?** See `TESTING.md`  
**Version**: 1.0.0