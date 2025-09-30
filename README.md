# Align Fabrics & Curtains - Invoice Management System

A comprehensive single-page web application for creating, managing, and exporting professional sales invoices with Arabic text support.

## Features

### 🎬 Welcome Animation
- Animated entrance with fireworks effect
- "WELCOME TO ALIGN" greeting
- Skip button for instant access
- Auto-advances to dashboard after 4 seconds

### 📊 Invoice Management Dashboard
- Grid view of all invoices
- Real-time search by invoice number, client name, or company
- Multiple sorting options (date, invoice number, client name)
- Quick actions: View, Edit, Clone, Delete

### 📝 Comprehensive Invoice Creation
- **Header Information**: Invoice number (auto-generated, editable), date, account number
- **Client Details**: Company, client name, project, location, area, designer, contact info
- **Dynamic Items Table**: Add/remove rows with code, type, description, color, quantity, and pricing
- **Flexible Discount System**: 
  - No discount
  - Percentage-based (0-100%)
  - Fixed amount
- **Tax Options**:
  - VAT 14% (toggleable)
  - Discount Tax 1% (toggleable, subtracted from total)
- **Transport/Shipping**: Optional additional cost
- **Payment Terms**: Customizable (default: 75% down, 25% on delivery)
- **Notes & Terms**: Free-text area for conditions
- **Signature & Stamp**: Image upload support

### 🧮 Real-Time Calculations
- Automatic subtotal calculation
- Dynamic discount computation
- VAT and discount tax calculations
- Transport cost integration
- Final net order (payable amount)

### 🖨️ Professional Invoice Design
- Matches the provided sample layout
- Company header with logo and contact information
- Elegant typography and spacing
- Yellow accent colors for headers and totals
- Responsive design for all screen sizes

### 📄 PDF Export
- Single-page A4 portrait format
- Pixel-perfect reproduction of on-screen invoice
- Filename format: `{InvoiceNumber}_{ClientName}.pdf`
- High-resolution output (300 DPI equivalent)
- Embedded images (logo, signature)
- Arabic text support with proper RTL rendering

### 💾 Data Persistence
- LocalStorage-based persistence
- Survives browser reloads
- Automatic save on create/update
- Clone functionality for quick invoice duplication

### ✅ Validation
- Required field checks
- Duplicate invoice number prevention
- Positive quantity and price validation
- Discount range validation (0-100% or ≤ subtotal)
- Real-time error notifications

## Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build process required
- Internet connection for CDN resources (fonts, PDF library)

### Quick Start

1. **Clone or download** this repository to your local machine

2. **Add the company logo**:
   - Place your logo image as `logo.png` in the project root
   - Recommended size: 180x80 pixels
   - Supported formats: PNG, JPG, SVG

3. **Open the application**:
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended for full functionality):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server
   
   # Then navigate to http://localhost:8000
   ```

4. **Start using**:
   - The welcome animation will play automatically
   - Click "Skip" to go directly to the dashboard
   - Explore the pre-loaded sample invoice
   - Create your first invoice!

## Usage Guide

### Creating an Invoice

1. Click **"+ Create New Invoice"** from the dashboard
2. The invoice number auto-generates (editable)
3. Fill in client information (company or name required)
4. Add invoice items:
   - Click **"+ Add Item"** to add rows
   - Fill in item details (quantity and price required)
   - Line totals calculate automatically
5. Configure discounts and taxes:
   - Select discount type (none, percent, fixed)
   - Toggle VAT 14% checkbox if applicable
   - Toggle Discount Tax 1% if applicable
   - Add transport cost if needed
6. Add payment terms and notes
7. Upload signature/stamp (optional)
8. Click **"Save Invoice"**

### Viewing & Exporting

1. From the dashboard, click **"View"** on any invoice
2. Review the formatted invoice preview
3. Click **"Download PDF"** to generate and download
4. PDF saves with format: `InvoiceNumber_ClientName.pdf`

### Editing an Invoice

1. Click **"Edit"** from dashboard or invoice view
2. Modify any fields
3. Click **"Save Invoice"** to update
4. Updated timestamp is recorded

### Cloning an Invoice

1. Click **"Clone"** on any invoice card
2. A duplicate opens in the form view
3. New invoice number auto-generates
4. Modify details as needed
5. Save as a new invoice

### Deleting an Invoice

1. Click **"Delete"** on any invoice card
2. Confirm the deletion in the popup
3. Invoice is permanently removed

## Technical Implementation

### Architecture
- **Single-Page Application (SPA)**: No page reloads
- **Vanilla JavaScript**: No framework dependencies
- **CSS3 Animations**: Smooth transitions and effects
- **LocalStorage API**: Client-side data persistence

### Key Technologies
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with grid and flexbox
- **JavaScript ES6+**: Modern syntax and features
- **html2pdf.js**: Client-side PDF generation
- **Google Fonts**: Roboto (Latin) and Cairo (Arabic)

### File Structure
```
align-invoice-app/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── app.js              # Application logic
├── logo.png            # Company logo (add this)
└── README.md           # This file
```

### Data Schema

Each invoice object contains:
```javascript
{
  id: string,                    // Unique identifier
  invoiceNumber: string,         // Invoice number
  invoiceDate: string,           // ISO date string
  accountNo: string,             // Optional account number
  client: {                      // Client information
    company, name, project, location, area,
    designer, contactPerson, contactNumber
  },
  items: [{                      // Array of invoice items
    code, type, name, color,
    quantity, unitPrice, lineTotal
  }],
  discount: {                    // Discount configuration
    type: 'none'|'percent'|'fixed',
    value: number
  },
  applyVAT: boolean,            // VAT 14% toggle
  applyDiscountTax: boolean,    // Discount tax 1% toggle
  transportCost: number,         // Shipping cost
  paymentTerms: string,          // Payment terms text
  notes: string,                 // Additional notes
  signature: string,             // Base64 image data
  totals: {                      // Calculated totals
    subtotal, discountAmount, afterDiscount,
    vatAmount, discountTaxAmount, transportCost, netOrder
  },
  createdAt: string,            // ISO timestamp
  updatedAt: string             // ISO timestamp
}
```

## Calculation Logic

### Subtotal
```
Subtotal = Σ(Quantity × Unit Price) for all items
```

### Discount
```
If Percent: Discount Amount = Subtotal × (Discount % / 100)
If Fixed: Discount Amount = Discount Value
```

### After Discount
```
After Discount = Subtotal - Discount Amount
```

### VAT (if applied)
```
VAT Amount = After Discount × 0.14
```

### Discount Tax (if applied)
```
Discount Tax = After Discount × 0.01
(This is subtracted from the total)
```

### Net Order (Final Total)
```
Net Order = After Discount + VAT - Discount Tax + Transport
```

## PDF Generation

The PDF export uses the `html2pdf.js` library with the following configuration:
- **Format**: A4 (210mm × 297mm)
- **Orientation**: Portrait
- **Resolution**: 2x scale for crisp output
- **Quality**: 98% JPEG compression
- **CORS**: Enabled for image embedding
- **Filename**: Dynamic based on invoice number and client name

### Arabic Text Support
- Uses **Cairo** font family for Arabic characters
- Right-to-left (RTL) text direction support
- Font embedding in PDF for proper rendering

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Sample Invoice

The application includes a pre-seeded sample invoice with:
- **Invoice Number**: 000001
- **Client**: Modern Living Interiors (Sarah Ahmed)
- **Items**: 2 sample fabric/curtain items
- **Total**: EGP 8,697.40 (with 5% discount and VAT)

## Customization

### Company Information
Edit the `COMPANY_INFO` object in `app.js`:
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

### Color Scheme
Modify CSS variables in `styles.css`:
- Primary: `#3498db`
- Success: `#27ae60`
- Danger: `#e74c3c`
- Warning: `#f39c12`
- Accent: `#f0c674` (yellow highlight)

### Invoice Layout
Adjust the `.invoice-document` styles in `styles.css` to modify spacing, fonts, and layout.

## Troubleshooting

### PDF Generation Issues
- **Images not appearing**: Ensure logo and signature images are properly loaded before generating PDF
- **Arabic text garbled**: Verify Cairo font is loaded from Google Fonts CDN
- **Large file size**: Reduce signature image size before upload

### Data Persistence
- **Invoices disappear**: Check browser localStorage settings
- **Cannot save**: Verify localStorage quota (usually 5-10MB)
- **Data corruption**: Clear localStorage and restart: `localStorage.clear()`

### Performance
- **Slow rendering**: Limit number of invoice items (recommended < 50 items)
- **Large dataset**: Consider implementing pagination for > 100 invoices

## Security Notes

⚠️ **Important**: This application stores data in browser localStorage:
- Data is NOT encrypted
- Data is accessible to anyone with browser access
- Data is NOT backed up
- Data can be lost if browser cache is cleared

For production use with sensitive data, implement:
- Backend database (PostgreSQL, MySQL, MongoDB)
- User authentication and authorization
- Data encryption at rest
- Regular backups
- HTTPS for all communications

## Future Enhancements

Potential features for future versions:
- [ ] Backend integration with database
- [ ] User authentication and multi-user support
- [ ] Email invoice delivery
- [ ] Multiple currency support
- [ ] Invoice templates
- [ ] Recurring invoices
- [ ] Payment tracking
- [ ] Analytics and reporting
- [ ] Multi-language interface
- [ ] Cloud backup and sync

## Testing

A comprehensive testing guide is available in `TESTING.md`. It includes:
- Feature-by-feature test cases
- Edge case scenarios
- Browser compatibility tests
- Performance benchmarks
- Acceptance criteria verification

Run through the testing checklist to verify all functionality before deployment.

## Support

For issues, questions, or contributions:
1. Check this README thoroughly
2. Review the `TESTING.md` guide
3. Review the code comments
4. Test in a clean browser profile
5. Check browser console for errors

## License

This project is provided as-is for Align Fabrics & Curtains. Modify and use as needed for your business requirements.

## Credits

- **Design**: Based on provided sample invoice image
- **Fonts**: Google Fonts (Roboto, Cairo)
- **PDF Library**: html2pdf.js
- **Icons**: Native browser UI elements

---

**Version**: 1.0.0  
**Last Updated**: September 30, 2025  
**Author**: Custom Development for Align Fabrics & Curtains