# Design Guidelines for Kaveri GS Automech Website

## Design Approach
**Industry Reference-Based**: Drawing inspiration from established industrial/manufacturing websites like Elesa-Ganter, focusing on professional, formal aesthetics that communicate reliability and technical expertise while maintaining modern web standards.

## Core Design Principles
- **Professional Formality**: Business-oriented design language suitable for B2B manufacturing sector
- **Clean & Structured**: White background as foundation, organized layout hierarchy
- **Interactive Excellence**: Smooth animations, parallax effects, and engaging transitions without compromising professionalism
- **Visual Clarity**: High-quality product imagery with clear typography and intuitive navigation

## Color Palette

**Primary Colors (Light Mode)**:
- Background: Pure White (#FFFFFF)
- Primary Brand: 210 70% 45% (Professional blue - headers, CTAs)
- Secondary: 215 60% 35% (Darker blue for accents)
- Text Primary: 220 15% 20% (Near black for body text)
- Text Secondary: 220 10% 45% (Medium gray for secondary text)

**Accent Colors**:
- Success/Action: 145 65% 42% (Professional green for CTAs)
- Border/Divider: 220 15% 88% (Light gray)
- Hover States: 210 75% 50% (Brighter blue)
- Card Background: 220 15% 98% (Very light gray for product cards)

## Typography

**Font Families** (via Google Fonts):
- Headings: 'Montserrat' (weights: 600, 700)
- Body: 'Inter' (weights: 400, 500, 600)
- Technical/Product Details: 'Roboto' (weight: 400)

**Type Scale**:
- Hero Headline: text-5xl md:text-6xl font-bold
- Section Headers: text-3xl md:text-4xl font-semibold
- Subsections: text-2xl font-semibold
- Product Names: text-lg font-medium
- Body Text: text-base leading-relaxed
- Captions: text-sm text-gray-600

## Layout System

**Spacing Convention**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-16 md:py-24
- Container margins: px-6 md:px-12 lg:px-20
- Card spacing: gap-6 md:gap-8
- Element spacing: space-y-4 to space-y-8

**Container Widths**:
- Full-width sections: w-full with inner max-w-7xl mx-auto
- Content sections: max-w-6xl mx-auto
- Product grids: max-w-7xl mx-auto

## Component Library

### Navigation Header
- Fixed top position with subtle shadow on scroll
- Logo left-aligned, navigation menu center-aligned, contact button right-aligned
- Navigation links with smooth underline animation on hover
- Responsive hamburger menu for mobile
- Height: h-20, background: white with border-bottom

### Hero Carousel (Home Page)
- Full-width image slider with smooth transitions
- Overlay text on images with semi-transparent dark backdrop
- Navigation indicators (dots) at bottom
- Prev/Next arrow controls on sides
- "Show More" button on each slide with hover lift effect
- Height: min-h-[500px] md:min-h-[600px]

### Product Cards & Tiles
- Uniform dimensions: aspect-[3/4] for consistency
- Product image fills top portion
- White card background with subtle shadow: shadow-md hover:shadow-xl
- Scrollable description area within card: max-h-32 overflow-y-auto
- Name: font-semibold text-lg
- Description: text-sm text-gray-600 with custom scrollbar styling
- Rounded corners: rounded-lg
- Click interaction opens modal popup (enlarged center view)

### Featured Product Carousel
- Horizontal scroll on mobile, multi-column grid on desktop
- Individual product slides with image + feature highlights
- "View All Products" button per slide
- Smooth scroll snap behavior
- Navigation arrows with circular background

### Modal/Popup Design
- Center-screen overlay with backdrop blur
- Enlarged product view maintaining same structure as tile
- Close button (X) top-right corner
- Smooth fade-in animation: transition-opacity duration-300
- Backdrop: bg-black/50 backdrop-blur-sm

### Gallery Image Tiles
- Masonry-style grid layout: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Image with description overlay on hover
- Click opens modal with full image + scrollable description
- Consistent gap spacing: gap-4 md:gap-6

### Contact Form
- Two-column layout (form left, info right) on desktop
- Form fields with focus states: focus:ring-2 focus:ring-blue-500
- Input styling: border rounded-md px-4 py-3
- Submit button with loading state animation
- Contact info cards with icons and professional formatting

### Footer
- Three-column layout: Company Info | Quick Links | Partner Logos
- Company section: Logo, brief description, social icons
- Quick Links: Product categories navigation
- Partner logos: grid display with grayscale filter, color on hover
- Copyright bar at bottom
- Background: bg-gray-50 border-t

## Interactive Elements & Animations

**Hover Effects**:
- Buttons: Transform scale-105 with smooth transition
- Product cards: Lift effect with shadow enhancement
- Navigation links: Underline slide-in from left
- Images: Subtle zoom effect (scale-105) on hover

**Parallax Scrolling**:
- About Us hero section with background image parallax
- Company story section with offset scroll
- Use sparingly for visual interest without distraction

**Page Transitions**:
- Fade in on route change: opacity-0 to opacity-100
- Stagger animation for product grid items
- Smooth scroll behavior for anchor links

**Stop Motion Effects**:
- Number counters for company statistics
- Progressive image reveal on scroll
- Section entrance animations: slide-up with fade

**Loading States**:
- Skeleton loaders for product images
- Spinner for carousel transitions
- Shimmer effect for loading cards

## Search Functionality Design
- Prominent search bar in Products page header
- Real-time filtering with smooth re-arrangement
- Search icon with clear (X) button when active
- No results state with helpful message
- Highlight matching terms in product names

## Image Strategy

**Hero Images** (slides/ folder):
- Professional manufacturing facility shots
- Product showcases in industrial settings
- Team collaboration images
- Minimum resolution: 1920x1080px
- Overlay gradient: from-black/60 to-transparent

**Product Images** (products/ folder):
- Clean white background or contextual use
- Multiple angles where applicable
- Consistent lighting and composition
- Square format for uniformity (1:1 ratio)

**Gallery Images** (gallery/ folder):
- Manufacturing process documentation
- Workshop/facility images
- Quality control processes
- Team at work, machinery operations

**Partner Logos** (partner_logos/ folder):
- Transparent PNG format
- Consistent sizing with max-h-16
- Grayscale with color on hover effect

## Responsive Breakpoints
- Mobile: < 768px (single column, stacked layout)
- Tablet: 768px - 1024px (two-column grids)
- Desktop: > 1024px (full multi-column layouts)
- Carousel touch-friendly on mobile with swipe gestures

## Accessibility Considerations
- Sufficient color contrast (WCAG AA minimum)
- Focus indicators for keyboard navigation
- Alt text for all images
- Semantic HTML structure
- ARIA labels for interactive elements

## Professional Polish
- Consistent icon set (Heroicons or similar)
- Loading states for all async operations
- Error handling with friendly messages
- Smooth scrolling with proper easing functions
- Print-friendly layout for product pages