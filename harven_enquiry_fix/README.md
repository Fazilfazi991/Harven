## PROJECT: HARVEN LLC - B2B Enquiry Flow Enhancement

### BUSINESS CONTEXT
- Website: harvenllc.com (UAE-based B2B global food commodity trading)
- Current Issue: All "Inquire Now" buttons link to /contact with NO product pre-selection
- Users must manually select product from dropdown - creates friction
- B2B model requires streamlined bulk inquiry process

### FEATURE 1: Smart Enquiry Button (All Products)

CURRENT BEHAVIOR:
- All "Inquire Now" buttons on /products page go to /contact
- Contact form only has "Product Interest" dropdown
- User must manually find/select their product of interest

NEW BEHAVIOR:
- Rename all "Inquire Now" buttons to "Request Quote"
- Each button passes product ID/name via URL parameter: /contact?product=cardamom
- Contact page auto-populates product field
- User sees "Enquiry for: [Product Name]" header
- Hidden field captures product for backend

SPECIFICATIONS:
- Buttons on: /products (all 11 products), /signature-brands (KeraZone/Fiori products)
- URL format: /contact?product={slug}&category={category}
- Default option: If no product param, show "Select Product" dropdown
- Fallback: If product not in dropdown, default to "Other" with note

### FEATURE 2: Complete Contact Form

CURRENT BEHAVIOR:
- Only has: Product Interest dropdown + Submit button

NEW BEHAVIOR:
- Add fields (in order):
  1. Full Name (required)
  2. Company Name (required)
  3. Business Email (required)
  4. Phone Number (optional)
  5. Country/Region (dropdown, required)
  6. Product Interest (dropdown, auto-selected if from product page)
  7. Quantity Required (text field with unit selector: MT/KG/Bags/Containers)
  8. Message/Requirements (textarea, optional)
  9. Preferred Contact Method (radio: Email/Phone/WhatsApp)

FORM VALIDATION:
- Email format validation
- Required field indicators (*)
- Error messages below each field
- Success message on submission: "Thank you! Our trading desk will respond within 24 hours."
- Form should submit to email (use Formspree or similar) or show success modal

### FEATURE 3: Inline Enquiry Panel (Optional Enhancement)

- Add "Quick Enquire" button on product hover cards
- Opens side panel (not full page redirect) with:
  - Product name (pre-filled, read-only)
  - Compact form: Name, Email, Quantity, Message
  - Submit sends to HARVEN email
- Panel slides from right side with overlay backdrop
- Close button and click-outside-to-close functionality

### DESIGN SPECIFICATIONS

BUTTON STYLING:
- Text: "Request Quote" (NOT "Inquire Now" or "Add to Cart")
- Style: Green background (#2D5016 or similar), white text
- Hover: Slight scale up (1.02), darker green
- Include small icon: quotation mark or send icon

CONTACT FORM LAYOUT:
- Two-column layout on desktop (field groups side by side)
- Single column on mobile
- Green accent on required field asterisks
- Subtle border on focus states
- Submit button: Full width on mobile, right-aligned on desktop

PANEL (if implementing):
- Width: 400px
- Background: White
- Shadow: Large for depth
- Header: Product name with close X button
- Smooth slide animation (0.3s ease)

### TECHNICAL NOTES

- Pure HTML/CSS/JavaScript (no framework specified - use vanilla if possible)
- Keep existing site styles compatible
- Test URL parameter parsing
- Mobile responsiveness is critical for B2B buyers on-the-go
- WhatsApp integration should remain visible in footer

### FILES TO MODIFY
- /products page (button updates + URL params)
- /signature-brands page (button updates + URL params)
- /contact page (complete form overhaul)
- /styles.css (add button and form styles)
- /script.js (add form handling and panel logic)

### SUCCESS CRITERIA
1. Clicking any "Request Quote" button on products auto-selects that product
2. Contact form is complete with all specified fields
3. Form validation works on all required fields
4. Mobile layout is clean and usable
5. No broken links or errors in console
