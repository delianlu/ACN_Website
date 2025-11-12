# ACN Engineering Website

A modern, responsive website for ACN Engineering created as a replacement for the Wix-hosted site.

## Files Included

- `index.html` - Home page
- `about.html` - About page (content from your original Wix site)
- `services.html` - Services page
- `contact.html` - Contact page with form
- `styles.css` - Complete stylesheet
- `script.js` - JavaScript for interactivity

## Features

### ✨ Modern Design
- Clean, professional layout
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Modern color scheme

### 📱 Mobile-Friendly
- Fully responsive navigation with hamburger menu
- Touch-friendly buttons and links
- Optimized for all screen sizes

### 🎨 Customizable
- Easy to modify colors in CSS variables
- Clean code structure
- Well-commented sections

### 🚀 Performance
- Lightweight and fast loading
- No external dependencies except Google Fonts
- Optimized images and assets

## How to Use

### 1. Basic Setup
1. Download all files to a folder on your computer
2. Open `index.html` in a web browser to view the site
3. All files must be in the same directory

### 2. Customization

#### Change Colors
Open `styles.css` and modify the CSS variables at the top:

```css
:root {
    --primary-color: #0066cc;      /* Main brand color */
    --secondary-color: #004080;    /* Secondary brand color */
    --accent-color: #ff6b35;       /* Accent/CTA color */
    --text-dark: #1a1a1a;          /* Dark text */
    --text-light: #666;            /* Light text */
}
```

#### Update Contact Information
1. Open `contact.html`
2. Find the contact details section
3. Replace with your actual information:
   - Address
   - Phone numbers
   - Email addresses
   - Business hours

Also update the footer in all HTML files with your contact info.

#### Replace the Hero Image
The hero section currently uses a gradient. To add your own image:

1. Save your image in the same folder
2. Open `styles.css`
3. Find the `.hero` section
4. Replace the background-image line with:
```css
background-image: url('your-image-name.jpg');
```

#### Update Company Logo
To add a logo:

1. Save your logo image in the same folder
2. Open all HTML files
3. Replace the logo section with:
```html
<div class="logo">
    <img src="your-logo.png" alt="ACN Engineering" style="height: 50px;">
</div>
```

### 3. Contact Form Setup

The contact form currently shows a success message but doesn't send emails. To make it functional:

**Option 1: Use a form service (Recommended)**
- Sign up for a service like Formspree, FormSubmit, or Web3Forms
- Follow their instructions to connect your form
- These services are usually free for basic use

**Option 2: Use your own server**
- You'll need backend code (PHP, Node.js, etc.)
- Configure email sending on your server
- Update the form submission handler in `script.js`

### 4. Adding More Pages

To add a new page:

1. Copy one of the existing HTML files
2. Rename it (e.g., `portfolio.html`)
3. Update the content
4. Add a link to the navigation menu in all HTML files:

```html
<li><a href="portfolio.html">Portfolio</a></li>
```

### 5. Hosting Your Website

You can host this website on various platforms:

**Free Options:**
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

**Paid Options:**
- Your own web hosting service
- AWS S3
- Google Cloud Platform

## File Structure

```
website/
│
├── index.html          # Home page
├── about.html          # About page
├── services.html       # Services page
├── contact.html        # Contact page
├── styles.css          # All styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Browser Support

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge
- Opera

## Tips for Maintenance

1. **Backup regularly** - Keep copies of your files
2. **Test on mobile** - Always check how changes look on phones
3. **Validate HTML** - Use W3C validator to check for errors
4. **Optimize images** - Compress images before uploading
5. **Update content regularly** - Keep information current

## Need Help?

Common issues and solutions:

**Navigation menu not working on mobile?**
- Make sure `script.js` is properly linked
- Check browser console for JavaScript errors

**Images not showing?**
- Verify image file names match HTML
- Ensure images are in the same folder
- Check file extensions (jpg, png, etc.)

**Contact form not submitting?**
- See section 3 above for form setup options
- Check browser console for errors

**Styling looks broken?**
- Ensure `styles.css` is in the same folder
- Check that the CSS file link is correct in HTML
- Clear browser cache and reload

## Customization Ideas

- Add a blog section
- Include a portfolio/projects page
- Add team member profiles
- Include client testimonials
- Add a careers/jobs page
- Include case studies
- Add video backgrounds
- Include a newsletter signup

## Credits

Website created as a custom replacement for Wix-hosted site.
Designed to be lightweight, fast, and easy to customize.

## License

This code is provided for your use. Feel free to modify and customize as needed for your business.
