# Testing Guide for Your Portfolio 🧪

## ✅ **What I Fixed:**

### 1. **Contact Form Issues:**
- ✅ Updated email to `keshavconnect4@gmail.com`
- ✅ Added better error handling and user feedback
- ✅ Added notification system for better UX
- ✅ Added direct contact info section as backup
- ✅ Added clipboard copy functionality

### 2. **Resume Download:**
- ✅ Moved your resume from `src/resume/` to `public/`
- ✅ Updated file path to `/Keshav_Rajput_Resume.pdf`
- ✅ Both download and preview buttons now work

### 3. **Hire Me Buttons:**
- ✅ All "Hire Me" buttons now work with proper email functionality
- ✅ Added visual feedback when clicked
- ✅ Pre-filled email subjects for different sections

## 🧪 **How to Test:**

### 1. **Start the Development Server:**
```bash
cd Keshav_Portfolio
npm run dev
```

### 2. **Test Contact Form:**
1. Go to the Contact section
2. Fill out the form (at least 75%)
3. Click "Send Message"
4. Should show success notification and open email client
5. If email doesn't open, use the "Copy Email" or "Open Email App" buttons below

### 3. **Test Resume Download:**
1. Go to the Resume section
2. Click "Preview" - should open PDF in new tab
3. Click "Download PDF" - should download your actual resume

### 4. **Test Hire Me Buttons:**
1. **Hero Section:** Click "Hire Me" button
2. **Skills Section:** Scroll down and click "Hire Me" 
3. **Experience Section:** Click "Hire Me"
4. All should open email client with pre-filled content

## 🔧 **Troubleshooting:**

### If Email Doesn't Open:
- **Reason:** Some browsers block mailto links in development
- **Solution:** Use the "Copy Email" button or direct contact info
- **Production:** Will work better when deployed

### If Resume Doesn't Download:
- **Check:** Make sure file exists at `public/Keshav_Rajput_Resume.pdf`
- **Browser:** Some browsers may block downloads in development
- **Solution:** Try the "Preview" button first

### If Notifications Don't Show:
- **Check:** Browser console for any errors
- **Refresh:** Try refreshing the page

## 📱 **Test on Different Devices:**
- Desktop browser
- Mobile browser
- Different email clients (Gmail, Outlook, etc.)

## 🚀 **Ready for Production:**
Once everything works in development:
1. Run `npm run build`
2. Deploy to Vercel/Netlify
3. Test again on the live site

## 📧 **Email Testing:**
Your email `keshavconnect4@gmail.com` is now used everywhere:
- Contact form
- All "Hire Me" buttons
- Direct contact section
- Resume download notifications

Everything should work much better now! 🎉