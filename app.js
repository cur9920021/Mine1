// ===========================
// Data Management & Storage
// ===========================

const COMPANY_INFO = {
    name: "Align Fabrics & Curtains",
    taxNumber: "652597947",
    address: "40 Mohamed Farid ST, Nozhz, Heliopolis, Cairo",
    phones: {
        mohamed_kamel: "01008617790",
        mohamed_sobhy: "01100100751"
    }
};

let invoices = [];
let currentInvoice = null;
let editingInvoiceId = null;

// ===========================
// Initialization
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    loadInvoices();
    initWelcomeAnimation();
    initEventListeners();
    seedSampleData();
});

// ===========================
// Welcome Animation
// ===========================

function initWelcomeAnimation() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainApp = document.getElementById('mainApp');
    const skipBtn = document.getElementById('skipBtn');
    
    const finishAnimation = () => {
        welcomeScreen.classList.add('fade-out');
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            mainApp.style.display = 'block';
            showView('dashboardView');
            renderInvoicesList();
        }, 500);
    };
    
    skipBtn.addEventListener('click', finishAnimation);
    
    // Auto-finish after 4 seconds
    setTimeout(finishAnimation, 4000);
}

// ===========================
// Event Listeners
// ===========================

function initEventListeners() {
    // Navigation
    document.getElementById('createNewInvoiceBtn').addEventListener('click', () => {
        editingInvoiceId = null;
        resetForm();
        setTodayDate();
        generateNextInvoiceNumber();
        showView('formView');
        document.getElementById('formTitle').textContent = 'Create New Invoice';
    });
    
    document.getElementById('backToDashboard').addEventListener('click', () => {
        showView('dashboardView');
        renderInvoicesList();
    });
    
    document.getElementById('backFromInvoice').addEventListener('click', () => {
        showView('dashboardView');
        renderInvoicesList();
    });
    
    // Form actions
    document.getElementById('saveInvoiceBtn').addEventListener('click', saveInvoice);
    document.getElementById('addItemBtn').addEventListener('click', addItemRow);
    
    // Calculations
    document.getElementById('discountType').addEventListener('change', recalculate);
    document.getElementById('discountValue').addEventListener('input', recalculate);
    document.getElementById('applyVAT').addEventListener('change', recalculate);
    document.getElementById('applyDiscountTax').addEventListener('change', recalculate);
    document.getElementById('transportCost').addEventListener('input', recalculate);
    
    // Signature upload
    document.getElementById('signatureUpload').addEventListener('change', handleSignatureUpload);
    
    // Search and sort
    document.getElementById('searchInput').addEventListener('input', renderInvoicesList);
    document.getElementById('sortSelect').addEventListener('change', renderInvoicesList);
    
    // Invoice actions
    document.getElementById('editInvoiceBtn').addEventListener('click', () => {
        loadInvoiceToForm(currentInvoice);
        showView('formView');
        document.getElementById('formTitle').textContent = 'Edit Invoice';
    });
    
    document.getElementById('downloadPDFBtn').addEventListener('click', downloadInvoicePDF);
}

// ===========================
// View Management
// ===========================

function showView(viewId) {
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
}

// ===========================
// Invoice Management
// ===========================

function saveInvoices() {
    localStorage.setItem('alignInvoices', JSON.stringify(invoices));
}

function loadInvoices() {
    const stored = localStorage.getItem('alignInvoices');
    if (stored) {
        invoices = JSON.parse(stored);
    }
}

function generateNextInvoiceNumber() {
    let maxNumber = 0;
    invoices.forEach(inv => {
        const num = parseInt(inv.invoiceNumber.replace(/\D/g, ''));
        if (!isNaN(num) && num > maxNumber) {
            maxNumber = num;
        }
    });
    document.getElementById('invoiceNumber').value = String(maxNumber + 1).padStart(6, '0');
}

function setTodayDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('invoiceDate').value = today;
}

function resetForm() {
    document.getElementById('invoiceNumber').value = '';
    document.getElementById('invoiceDate').value = '';
    document.getElementById('accountNo').value = '';
    
    document.getElementById('clientCompany').value = '';
    document.getElementById('clientName').value = '';
    document.getElementById('clientProject').value = '';
    document.getElementById('clientLocation').value = '';
    document.getElementById('clientArea').value = '';
    document.getElementById('clientDesigner').value = '';
    document.getElementById('contactPerson').value = '';
    document.getElementById('contactNumber').value = '';
    
    document.getElementById('itemsTableBody').innerHTML = '';
    addItemRow();
    
    document.getElementById('discountType').value = 'none';
    document.getElementById('discountValue').value = '';
    document.getElementById('applyVAT').checked = false;
    document.getElementById('applyDiscountTax').checked = false;
    document.getElementById('transportCost').value = '0';
    
    document.getElementById('paymentTerms').value = '75% down payment, 25% upon delivery';
    document.getElementById('notesTerms').value = '';
    
    document.getElementById('signaturePreview').innerHTML = '';
    document.getElementById('signatureUpload').value = '';
    
    currentInvoice = null;
    editingInvoiceId = null;
    
    recalculate();
}

function validateInvoice() {
    const invoiceNumber = document.getElementById('invoiceNumber').value.trim();
    const invoiceDate = document.getElementById('invoiceDate').value;
    const clientCompany = document.getElementById('clientCompany').value.trim();
    const clientName = document.getElementById('clientName').value.trim();
    
    if (!invoiceNumber) {
        showNotification('Invoice number is required', 'error');
        return false;
    }
    
    // Check for duplicate invoice number
    const duplicate = invoices.find(inv => 
        inv.invoiceNumber === invoiceNumber && inv.id !== editingInvoiceId
    );
    if (duplicate) {
        showNotification('Invoice number already exists. Please use a unique number.', 'error');
        return false;
    }
    
    if (!invoiceDate) {
        showNotification('Invoice date is required', 'error');
        return false;
    }
    
    if (!clientCompany && !clientName) {
        showNotification('Client company or name is required', 'error');
        return false;
    }
    
    // Validate items
    const items = getItemsFromTable();
    if (items.length === 0) {
        showNotification('At least one item is required', 'error');
        return false;
    }
    
    for (let item of items) {
        if (item.quantity <= 0) {
            showNotification('All items must have a positive quantity', 'error');
            return false;
        }
        if (item.unitPrice < 0) {
            showNotification('Unit price cannot be negative', 'error');
            return false;
        }
    }
    
    // Validate discount
    const discountType = document.getElementById('discountType').value;
    const discountValue = parseFloat(document.getElementById('discountValue').value) || 0;
    
    if (discountType === 'percent' && (discountValue < 0 || discountValue > 100)) {
        showNotification('Discount percentage must be between 0 and 100', 'error');
        return false;
    }
    
    const subtotal = calculateSubtotal();
    if (discountType === 'fixed' && discountValue > subtotal) {
        showNotification('Fixed discount cannot exceed subtotal', 'error');
        return false;
    }
    
    return true;
}

function saveInvoice() {
    if (!validateInvoice()) {
        return;
    }
    
    const invoice = {
        id: editingInvoiceId || generateId(),
        invoiceNumber: document.getElementById('invoiceNumber').value.trim(),
        invoiceDate: document.getElementById('invoiceDate').value,
        accountNo: document.getElementById('accountNo').value.trim(),
        
        client: {
            company: document.getElementById('clientCompany').value.trim(),
            name: document.getElementById('clientName').value.trim(),
            project: document.getElementById('clientProject').value.trim(),
            location: document.getElementById('clientLocation').value.trim(),
            area: document.getElementById('clientArea').value.trim(),
            designer: document.getElementById('clientDesigner').value.trim(),
            contactPerson: document.getElementById('contactPerson').value.trim(),
            contactNumber: document.getElementById('contactNumber').value.trim()
        },
        
        items: getItemsFromTable(),
        
        discount: {
            type: document.getElementById('discountType').value,
            value: parseFloat(document.getElementById('discountValue').value) || 0
        },
        
        applyVAT: document.getElementById('applyVAT').checked,
        applyDiscountTax: document.getElementById('applyDiscountTax').checked,
        transportCost: parseFloat(document.getElementById('transportCost').value) || 0,
        
        paymentTerms: document.getElementById('paymentTerms').value.trim(),
        notes: document.getElementById('notesTerms').value.trim(),
        
        signature: document.getElementById('signaturePreview').querySelector('img')?.src || '',
        
        totals: calculateTotals(),
        
        createdAt: editingInvoiceId ? 
            invoices.find(inv => inv.id === editingInvoiceId)?.createdAt || new Date().toISOString() :
            new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    if (editingInvoiceId) {
        const index = invoices.findIndex(inv => inv.id === editingInvoiceId);
        invoices[index] = invoice;
        showNotification('Invoice updated successfully');
    } else {
        invoices.push(invoice);
        showNotification('Invoice created successfully');
    }
    
    saveInvoices();
    currentInvoice = invoice;
    renderInvoicePreview(invoice);
    showView('invoiceView');
}

function deleteInvoice(id) {
    if (confirm('Are you sure you want to delete this invoice?')) {
        invoices = invoices.filter(inv => inv.id !== id);
        saveInvoices();
        renderInvoicesList();
        showNotification('Invoice deleted successfully');
    }
}

function cloneInvoice(id) {
    const invoice = invoices.find(inv => inv.id === id);
    if (invoice) {
        loadInvoiceToForm(invoice);
        editingInvoiceId = null;
        generateNextInvoiceNumber();
        showView('formView');
        document.getElementById('formTitle').textContent = 'Create New Invoice (Cloned)';
        showNotification('Invoice cloned. Update details and save.');
    }
}

function loadInvoiceToForm(invoice) {
    editingInvoiceId = invoice.id;
    
    document.getElementById('invoiceNumber').value = invoice.invoiceNumber;
    document.getElementById('invoiceDate').value = invoice.invoiceDate;
    document.getElementById('accountNo').value = invoice.accountNo || '';
    
    document.getElementById('clientCompany').value = invoice.client.company || '';
    document.getElementById('clientName').value = invoice.client.name || '';
    document.getElementById('clientProject').value = invoice.client.project || '';
    document.getElementById('clientLocation').value = invoice.client.location || '';
    document.getElementById('clientArea').value = invoice.client.area || '';
    document.getElementById('clientDesigner').value = invoice.client.designer || '';
    document.getElementById('contactPerson').value = invoice.client.contactPerson || '';
    document.getElementById('contactNumber').value = invoice.client.contactNumber || '';
    
    // Load items
    document.getElementById('itemsTableBody').innerHTML = '';
    invoice.items.forEach(item => {
        addItemRow(item);
    });
    
    document.getElementById('discountType').value = invoice.discount.type;
    document.getElementById('discountValue').value = invoice.discount.value || '';
    document.getElementById('applyVAT').checked = invoice.applyVAT;
    document.getElementById('applyDiscountTax').checked = invoice.applyDiscountTax;
    document.getElementById('transportCost').value = invoice.transportCost || 0;
    
    document.getElementById('paymentTerms').value = invoice.paymentTerms || '75% down payment, 25% upon delivery';
    document.getElementById('notesTerms').value = invoice.notes || '';
    
    // Load signature
    if (invoice.signature) {
        const preview = document.getElementById('signaturePreview');
        preview.innerHTML = `<img src="${invoice.signature}" alt="Signature">`;
    }
    
    recalculate();
}

// ===========================
// Items Management
// ===========================

function addItemRow(item = null) {
    const tbody = document.getElementById('itemsTableBody');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td><input type="text" class="item-code" value="${item?.code || ''}" placeholder="Code"></td>
        <td><input type="text" class="item-type" value="${item?.type || ''}" placeholder="Type"></td>
        <td><input type="text" class="item-name" value="${item?.name || ''}" placeholder="Description"></td>
        <td><input type="text" class="item-color" value="${item?.color || ''}" placeholder="Color"></td>
        <td><input type="number" class="item-quantity" value="${item?.quantity || ''}" placeholder="Qty" min="0" step="0.01"></td>
        <td><input type="number" class="item-price" value="${item?.unitPrice || ''}" placeholder="Price" min="0" step="0.01"></td>
        <td class="line-total">0.00</td>
        <td>
            <button class="btn btn-danger btn-sm remove-item">Remove</button>
        </td>
    `;
    
    tbody.appendChild(row);
    
    // Add event listeners
    row.querySelector('.item-quantity').addEventListener('input', recalculate);
    row.querySelector('.item-price').addEventListener('input', recalculate);
    row.querySelector('.remove-item').addEventListener('click', () => {
        if (tbody.children.length > 1) {
            row.remove();
            recalculate();
        } else {
            showNotification('At least one item row is required', 'error');
        }
    });
    
    recalculate();
}

function getItemsFromTable() {
    const items = [];
    const rows = document.querySelectorAll('#itemsTableBody tr');
    
    rows.forEach(row => {
        const code = row.querySelector('.item-code').value.trim();
        const type = row.querySelector('.item-type').value.trim();
        const name = row.querySelector('.item-name').value.trim();
        const color = row.querySelector('.item-color').value.trim();
        const quantity = parseFloat(row.querySelector('.item-quantity').value) || 0;
        const unitPrice = parseFloat(row.querySelector('.item-price').value) || 0;
        
        if (quantity > 0 || name) {
            items.push({
                code,
                type,
                name,
                color,
                quantity,
                unitPrice,
                lineTotal: quantity * unitPrice
            });
        }
    });
    
    return items;
}

// ===========================
// Calculations
// ===========================

function calculateSubtotal() {
    let subtotal = 0;
    const rows = document.querySelectorAll('#itemsTableBody tr');
    
    rows.forEach(row => {
        const quantity = parseFloat(row.querySelector('.item-quantity').value) || 0;
        const price = parseFloat(row.querySelector('.item-price').value) || 0;
        const lineTotal = quantity * price;
        
        row.querySelector('.line-total').textContent = lineTotal.toFixed(2);
        subtotal += lineTotal;
    });
    
    return subtotal;
}

function calculateTotals() {
    const subtotal = calculateSubtotal();
    
    // Discount
    const discountType = document.getElementById('discountType').value;
    const discountValue = parseFloat(document.getElementById('discountValue').value) || 0;
    let discountAmount = 0;
    
    if (discountType === 'percent') {
        discountAmount = subtotal * (discountValue / 100);
    } else if (discountType === 'fixed') {
        discountAmount = discountValue;
    }
    
    const afterDiscount = subtotal - discountAmount;
    
    // VAT
    const applyVAT = document.getElementById('applyVAT').checked;
    const vatAmount = applyVAT ? afterDiscount * 0.14 : 0;
    
    // Discount Tax (subtracted)
    const applyDiscountTax = document.getElementById('applyDiscountTax').checked;
    const discountTaxAmount = applyDiscountTax ? afterDiscount * 0.01 : 0;
    
    // Transport
    const transportCost = parseFloat(document.getElementById('transportCost').value) || 0;
    
    // Net Order
    const netOrder = afterDiscount + vatAmount - discountTaxAmount + transportCost;
    
    return {
        subtotal,
        discountAmount,
        afterDiscount,
        vatAmount,
        discountTaxAmount,
        transportCost,
        netOrder
    };
}

function recalculate() {
    const totals = calculateTotals();
    
    document.getElementById('subtotalDisplay').textContent = totals.subtotal.toFixed(2);
    document.getElementById('discountAmountDisplay').textContent = `-${totals.discountAmount.toFixed(2)}`;
    document.getElementById('afterDiscountDisplay').textContent = totals.afterDiscount.toFixed(2);
    document.getElementById('vatDisplay').textContent = totals.vatAmount.toFixed(2);
    document.getElementById('discountTaxDisplay').textContent = `-${totals.discountTaxAmount.toFixed(2)}`;
    document.getElementById('netOrderDisplay').textContent = totals.netOrder.toFixed(2);
}

// ===========================
// Signature Upload
// ===========================

function handleSignatureUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById('signaturePreview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Signature">`;
        };
        reader.readAsDataURL(file);
    }
}

// ===========================
// Dashboard & List
// ===========================

function renderInvoicesList() {
    const container = document.getElementById('invoicesList');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const sortBy = document.getElementById('sortSelect').value;
    
    let filtered = invoices.filter(inv => {
        const searchText = `${inv.invoiceNumber} ${inv.client.name} ${inv.client.company}`.toLowerCase();
        return searchText.includes(searchTerm);
    });
    
    // Sort
    filtered.sort((a, b) => {
        switch (sortBy) {
            case 'date-desc':
                return new Date(b.invoiceDate) - new Date(a.invoiceDate);
            case 'date-asc':
                return new Date(a.invoiceDate) - new Date(b.invoiceDate);
            case 'number-desc':
                return b.invoiceNumber.localeCompare(a.invoiceNumber);
            case 'number-asc':
                return a.invoiceNumber.localeCompare(b.invoiceNumber);
            case 'client':
                return (a.client.name || a.client.company).localeCompare(b.client.name || b.client.company);
            default:
                return 0;
        }
    });
    
    if (filtered.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: #7f8c8d;">No invoices found. Create your first invoice!</div>';
        return;
    }
    
    container.innerHTML = filtered.map(invoice => `
        <div class="invoice-card">
            <div class="invoice-card-header">
                <div class="invoice-number">#${invoice.invoiceNumber}</div>
                <div class="invoice-date">${formatDate(invoice.invoiceDate)}</div>
            </div>
            <div class="invoice-card-body">
                <div class="client-name">${invoice.client.company || invoice.client.name}</div>
                <div class="invoice-total">EGP ${invoice.totals.netOrder.toFixed(2)}</div>
            </div>
            <div class="invoice-card-actions">
                <button class="btn btn-primary btn-sm" onclick="viewInvoice('${invoice.id}')">View</button>
                <button class="btn btn-secondary btn-sm" onclick="editInvoice('${invoice.id}')">Edit</button>
                <button class="btn btn-warning btn-sm" onclick="cloneInvoice('${invoice.id}')">Clone</button>
                <button class="btn btn-danger btn-sm" onclick="deleteInvoice('${invoice.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function viewInvoice(id) {
    const invoice = invoices.find(inv => inv.id === id);
    if (invoice) {
        currentInvoice = invoice;
        renderInvoicePreview(invoice);
        showView('invoiceView');
    }
}

function editInvoice(id) {
    const invoice = invoices.find(inv => inv.id === id);
    if (invoice) {
        loadInvoiceToForm(invoice);
        showView('formView');
        document.getElementById('formTitle').textContent = 'Edit Invoice';
    }
}

// ===========================
// Invoice Preview
// ===========================

function renderInvoicePreview(invoice) {
    const container = document.getElementById('invoicePreview');
    
    const itemsHTML = invoice.items.map(item => `
        <tr>
            <td>${item.code}</td>
            <td>${item.type}</td>
            <td>${item.name}</td>
            <td>${item.color}</td>
            <td class="text-center">${item.quantity}</td>
            <td class="text-right">${item.unitPrice.toFixed(2)}</td>
            <td class="text-right">${item.lineTotal.toFixed(2)}</td>
        </tr>
    `).join('');
    
    const discountText = invoice.discount.type === 'percent' 
        ? `${invoice.discount.value}%` 
        : invoice.discount.type === 'fixed' 
        ? `EGP ${invoice.discount.value.toFixed(2)}`
        : 'None';
    
    container.innerHTML = `
        <div class="invoice-document" id="invoiceDocument">
            <div class="invoice-header">
                <div class="company-info">
                    <img src="logo.svg" alt="Align Logo" class="company-logo" onerror="this.style.display='none'">
                    <div class="company-details">
                        <div class="company-name">${COMPANY_INFO.name}</div>
                        <div>Tax Reg: ${COMPANY_INFO.taxNumber}</div>
                        <div>${COMPANY_INFO.address}</div>
                    </div>
                </div>
                <div class="header-right">
                    <div class="header-phones">
                        <div><strong>Eng.Mohamed Kamel:</strong> ${COMPANY_INFO.phones.mohamed_kamel}</div>
                        <div><strong>Eng.Mohamed Sobhy:</strong> ${COMPANY_INFO.phones.mohamed_sobhy}</div>
                    </div>
                </div>
            </div>
            
            <h1 class="invoice-title">INVOICE</h1>
            
            <div class="invoice-meta">
                <div class="client-section">
                    <h3>To:</h3>
                    <div class="client-details">
                        ${invoice.client.company ? `<p><span class="detail-label">Company:</span> ${invoice.client.company}</p>` : ''}
                        ${invoice.client.name ? `<p><span class="detail-label">Client:</span> ${invoice.client.name}</p>` : ''}
                        ${invoice.client.project ? `<p><span class="detail-label">Project:</span> ${invoice.client.project}</p>` : ''}
                        ${invoice.client.location ? `<p><span class="detail-label">Location:</span> ${invoice.client.location}</p>` : ''}
                        ${invoice.client.area ? `<p><span class="detail-label">Area:</span> ${invoice.client.area}</p>` : ''}
                        ${invoice.client.designer ? `<p><span class="detail-label">Designer:</span> ${invoice.client.designer}</p>` : ''}
                        ${invoice.client.contactPerson ? `<p><span class="detail-label">Contact:</span> ${invoice.client.contactPerson}</p>` : ''}
                        ${invoice.client.contactNumber ? `<p><span class="detail-label">Phone:</span> ${invoice.client.contactNumber}</p>` : ''}
                    </div>
                </div>
                <div class="invoice-info-section">
                    <h3>Invoice Details:</h3>
                    <div class="invoice-details">
                        <p><span class="detail-label">Invoice No:</span> ${invoice.invoiceNumber}</p>
                        <p><span class="detail-label">Date:</span> ${formatDate(invoice.invoiceDate)}</p>
                        ${invoice.accountNo ? `<p><span class="detail-label">Account No:</span> ${invoice.accountNo}</p>` : ''}
                    </div>
                </div>
            </div>
            
            <div class="invoice-items">
                <table class="invoice-items-table">
                    <thead>
                        <tr>
                            <th>Item Code</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Color</th>
                            <th class="text-center">Qty</th>
                            <th class="text-right">Unit Price</th>
                            <th class="text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHTML}
                    </tbody>
                </table>
            </div>
            
            <div class="invoice-totals">
                <div class="totals-box">
                    <div class="total-row subtotal">
                        <span class="total-label">Subtotal:</span>
                        <span class="total-value">EGP ${invoice.totals.subtotal.toFixed(2)}</span>
                    </div>
                    ${invoice.totals.discountAmount > 0 ? `
                    <div class="total-row">
                        <span class="total-label">Discount (${discountText}):</span>
                        <span class="total-value">- EGP ${invoice.totals.discountAmount.toFixed(2)}</span>
                    </div>
                    ` : ''}
                    <div class="total-row after-discount">
                        <span class="total-label">After Discount:</span>
                        <span class="total-value">EGP ${invoice.totals.afterDiscount.toFixed(2)}</span>
                    </div>
                    ${invoice.applyVAT ? `
                    <div class="total-row">
                        <span class="total-label">VAT 14%:</span>
                        <span class="total-value">EGP ${invoice.totals.vatAmount.toFixed(2)}</span>
                    </div>
                    ` : ''}
                    ${invoice.applyDiscountTax ? `
                    <div class="total-row">
                        <span class="total-label">Discount Tax 1%:</span>
                        <span class="total-value">- EGP ${invoice.totals.discountTaxAmount.toFixed(2)}</span>
                    </div>
                    ` : ''}
                    ${invoice.transportCost > 0 ? `
                    <div class="total-row">
                        <span class="total-label">Transport:</span>
                        <span class="total-value">EGP ${invoice.transportCost.toFixed(2)}</span>
                    </div>
                    ` : ''}
                    <div class="total-row grand-total">
                        <span class="total-label">GRAND TOTAL:</span>
                        <span class="total-value">EGP ${invoice.totals.netOrder.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            
            ${invoice.notes ? `
            <div class="notes-section">
                <h4>Notes / Terms & Conditions:</h4>
                <p>${invoice.notes}</p>
            </div>
            ` : ''}
            
            <div class="invoice-footer">
                <div class="payment-info">
                    <h4>Payment Terms:</h4>
                    <p>${invoice.paymentTerms || '75% down payment, 25% upon delivery'}</p>
                </div>
                <div class="signature-section">
                    <h4>Authorized Signature:</h4>
                    ${invoice.signature ? `<img src="${invoice.signature}" alt="Signature" class="signature-image">` : '<p style="color: #7f8c8d;">No signature provided</p>'}
                </div>
            </div>
        </div>
    `;
}

// ===========================
// PDF Export
// ===========================

function downloadInvoicePDF() {
    if (!currentInvoice) return;
    
    const element = document.getElementById('invoiceDocument');
    const clientName = (currentInvoice.client.name || currentInvoice.client.company || 'Client').replace(/\s+/g, '_');
    const filename = `${currentInvoice.invoiceNumber}_${clientName}.pdf`;
    
    const opt = {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            logging: false
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        }
    };
    
    showNotification('Generating PDF...');
    
    html2pdf().set(opt).from(element).save().then(() => {
        showNotification('PDF downloaded successfully');
    }).catch(err => {
        console.error('PDF generation error:', err);
        showNotification('Error generating PDF', 'error');
    });
}

// ===========================
// Utilities
// ===========================

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
    });
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ===========================
// Sample Data Seeding
// ===========================

function seedSampleData() {
    if (invoices.length === 0) {
        const sampleInvoice = {
            id: generateId(),
            invoiceNumber: '000001',
            invoiceDate: new Date().toISOString().split('T')[0],
            accountNo: '4556784591',
            
            client: {
                company: 'Modern Living Interiors',
                name: 'Sarah Ahmed',
                project: 'Villa Renovation',
                location: 'New Cairo',
                area: 'Fifth Settlement',
                designer: 'Ahmed Hassan',
                contactPerson: 'Sarah Ahmed',
                contactNumber: '+20 123 456 7890'
            },
            
            items: [
                {
                    code: 'FAB-001',
                    type: 'Curtain',
                    name: 'Premium Velvet Curtains',
                    color: 'Royal Blue',
                    quantity: 8,
                    unitPrice: 450.00,
                    lineTotal: 3600.00
                },
                {
                    code: 'FAB-002',
                    type: 'Fabric',
                    name: 'Luxury Linen Upholstery Fabric',
                    color: 'Beige',
                    quantity: 15,
                    unitPrice: 280.00,
                    lineTotal: 4200.00
                }
            ],
            
            discount: {
                type: 'percent',
                value: 5
            },
            
            applyVAT: true,
            applyDiscountTax: false,
            transportCost: 250,
            
            paymentTerms: '75% down payment, 25% upon delivery',
            notes: 'Thank you for your business! All items come with a 1-year warranty. Installation service is available upon request.',
            
            signature: '',
            
            totals: {
                subtotal: 7800.00,
                discountAmount: 390.00,
                afterDiscount: 7410.00,
                vatAmount: 1037.40,
                discountTaxAmount: 0,
                transportCost: 250,
                netOrder: 8697.40
            },
            
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        invoices.push(sampleInvoice);
        saveInvoices();
    }
}