# Image Placement Guide for Kaveri GS Automech Website

This guide shows exactly where to place each image file in your project's `public` folder.

## 📁 Folder Structure

```
public/
├── logo/
│   └── logo.webp
├── slides/
│   ├── slide-1.webp
│   ├── slide-2.webp
│   └── slide-3.webp
├── featured-products/
│   ├── featured-1.webp
│   ├── featured-2.webp
│   └── featured-3.webp
├── products/
│   ├── product-1.webp
│   ├── product-2.webp
│   ├── product-3.webp
│   ├── product-4.webp
│   ├── product-5.webp
│   ├── product-6.webp
│   ├── product-7.webp
│   └── product-8.webp
├── gallery/
│   ├── gallery-1.webp
│   ├── gallery-2.webp
│   ├── gallery-3.webp
│   ├── gallery-4.webp
│   ├── gallery-5.webp
│   ├── gallery-6.webp
│   ├── gallery-7.webp
│   ├── gallery-8.webp
│   ├── gallery-9.webp
│   ├── gallery-10.webp
│   ├── gallery-11.webp
│   └── gallery-12.webp
├── partner_logos/
│   ├── partner-1.webp
│   ├── partner-2.webp
│   ├── partner-3.webp
│   └── partner-4.webp
└── brochure/
    └── company-brochure.pdf
```

## 📝 Detailed Image Requirements

### 1. Logo (`public/logo/`)
- **File**: `logo.webp`
- **Recommended size**: 200x200px (will auto-scale to fit)
- **Usage**: Company logo in header

### 2. Hero Carousel Slides (`public/slides/`)
- **Files**: `slide-1.webp`, `slide-2.webp`, `slide-3.webp`
- **Recommended size**: 1920x1080px (Full HD)
- **Usage**: Main homepage hero carousel
- **Tips**: Use high-quality industrial/manufacturing images

### 3. Featured Products (`public/featured-products/`)
- **Files**: `featured-1.webp`, `featured-2.webp`, `featured-3.webp`
- **Recommended size**: 800x800px (square)
- **Current mapping**:
  - `featured-1.webp` → Cable Tray Systems
  - `featured-2.webp` → Industrial Hinges
  - `featured-3.webp` → Fastener Solutions

### 4. Products (`public/products/`)
- **Files**: `product-1.webp` through `product-8.webp`
- **Recommended size**: 600x600px (square)
- **Current mapping**:
  - `product-1.webp` → Cable Tray Fitting
  - `product-2.webp` → Heavy Duty Hinge
  - `product-3.webp` → Refer Truck Lockset
  - `product-4.webp` → Industrial Fasteners
  - `product-5.webp` → Pivot Bracket
  - `product-6.webp` → Junction Box
  - `product-7.webp` → Corner Fitting
  - `product-8.webp` → T-Junction Connector

### 5. Gallery (`public/gallery/`)
- **Files**: `gallery-1.webp` through `gallery-12.webp`
- **Recommended size**: 1200x900px (4:3 aspect ratio)
- **Current descriptions**:
  - `gallery-1.webp` → Manufacturing facility with CNC machines
  - `gallery-2.webp` → Quality control department
  - `gallery-3.webp` → Modern warehouse
  - `gallery-4.webp` → Technicians operating machinery
  - `gallery-5.webp` → Assembly line
  - `gallery-6.webp` → Finished products inspection
  - `gallery-7.webp` → R&D laboratory
  - `gallery-8.webp` → Packaging department
  - `gallery-9.webp` → Team collaboration
  - `gallery-10.webp` → Loading dock
  - `gallery-11.webp` → Welding station
  - `gallery-12.webp` → Material testing lab

### 6. Partner Logos (`public/partner_logos/`)
- **Files**: `partner-1.webp` through `partner-4.webp`
- **Recommended size**: 300x120px (or similar rectangular)
- **Usage**: Partner logos in footer

### 7. Company Brochure (`public/brochure/`)
- **File**: `company-brochure.pdf`
- **Usage**: Downloadable company brochure from About page

## 🔧 Troubleshooting

### If images still don't show:

1. **Check file names exactly match** (case-sensitive):
   - ✅ Correct: `product-1.webp`
   - ❌ Wrong: `Product-1.webp`, `product_1.webp`, `product1.webp`

2. **Verify file location**:
   - Files must be in `public/` folder, not `src/` or elsewhere
   - Path in code: `/products/product-1.webp` 
   - Actual location: `public/products/product-1.webp`

3. **Check file extensions**:
   - All images should be `.webp` format
   - If you have `.jpg` or `.png`, convert them to `.webp`

4. **Clear browser cache**:
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
   - Or open in incognito/private browsing mode

5. **Restart development server**:
   - Stop the server (Ctrl+C)
   - Run `npm run dev` again

## 📌 Quick Test

After placing your images, open the browser console (F12) and check for any 404 errors. If you see errors like:

```
GET http://localhost:5000/products/product-1.webp 404 (Not Found)
```

This means the file doesn't exist at that exact path. Double-check:
- File name matches exactly (including hyphens)
- File is in correct folder
- File extension is `.webp`

## ✅ All Paths Used in Code

Here are ALL the image paths currently referenced in the code:

**Logo:**
- `/logo/logo.webp`

**Slides:**
- `/slides/slide-1.webp`
- `/slides/slide-2.webp`
- `/slides/slide-3.webp`

**Featured Products:**
- `/featured-products/featured-1.webp`
- `/featured-products/featured-2.webp`
- `/featured-products/featured-3.webp`

**Products:**
- `/products/product-1.webp`
- `/products/product-2.webp`
- `/products/product-3.webp`
- `/products/product-4.webp`
- `/products/product-5.webp`
- `/products/product-6.webp`
- `/products/product-7.webp`
- `/products/product-8.webp`

**Gallery:**
- `/gallery/gallery-1.webp`
- `/gallery/gallery-2.webp`
- `/gallery/gallery-3.webp`
- `/gallery/gallery-4.webp`
- `/gallery/gallery-5.webp`
- `/gallery/gallery-6.webp`
- `/gallery/gallery-7.webp`
- `/gallery/gallery-8.webp`
- `/gallery/gallery-9.webp`
- `/gallery/gallery-10.webp`
- `/gallery/gallery-11.webp`
- `/gallery/gallery-12.webp`

**Partner Logos:**
- `/partner_logos/partner-1.webp`
- `/partner_logos/partner-2.webp`
- `/partner_logos/partner-3.webp`
- `/partner_logos/partner-4.webp`

**Brochure:**
- `/brochure/company-brochure.pdf`
