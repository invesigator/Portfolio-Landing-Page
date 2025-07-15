# 📧 EmailJS Setup Guide

To make your contact form fully functional, you need to set up EmailJS. Follow these steps:

## 🚀 Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** and create a free account
3. Verify your email address

## ⚙️ Step 2: Create Email Service

1. In your EmailJS dashboard, click **"Add New Service"**
2. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook/Hotmail**
   - **Yahoo**
   - **Custom SMTP**
3. Follow the setup instructions for your provider
4. **Save** and note your **Service ID** (e.g., `service_abc123`)

## 📝 Step 3: Create Email Template

1. Go to **"Email Templates"** in your dashboard
2. Click **"Create New Template"**
3. Use this template content:

### Template Subject:

```
New Portfolio Contact: {{subject}}
```

### Template Body:

```
  You have received a new message from your portfolio website!

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply-To: {{reply_to}}
```

4. **Save** and note your **Template ID** (e.g., `template_xyz789`)

## 🔑 Step 4: Get Public Key

1. Go to **"Account"** → **"General"**
2. Find your **Public Key** (e.g., `abcDE123fghIJ456`)
3. Copy this key

## 💻 Step 5: Update Your Code

Replace the placeholder values in `script.js` (around line 548):

```javascript
this.emailjsConfig = {
  serviceID: "service_abc123", // Replace with your Service ID
  templateID: "template_xyz789", // Replace with your Template ID
  publicKey: "abcDE123fghIJ456", // Replace with your Public Key
};
```

## 🔧 Step 6: Test Your Form

1. Open your portfolio website
2. Fill out the contact form
3. Submit the form
4. Check your email for the message!

## 🎯 Optional: Custom Domain Setup

For professional use, you can:

1. Set up a custom email (e.g., `contact@yourdomain.com`)
2. Configure SMTP settings in EmailJS
3. Update the template to match your branding

## 📊 Free Plan Limits

EmailJS free plan includes:

- **200 emails/month**
- **2 email services**
- **2 email templates**

Perfect for a portfolio website!

## 🆘 Troubleshooting

### Form shows "EmailJS setup needed" message?

- Check that you've replaced all placeholder values
- Verify your Public Key is correct
- Make sure EmailJS script is loading

### Emails not being received?

- Check your spam folder
- Verify your email service is connected
- Test with EmailJS dashboard first

### Rate limit errors?

- You've hit the 200/month limit
- Consider upgrading or use alternative contact methods

## 🔒 Security Notes

- **Public Key** is safe to expose in frontend code
- **Private Keys** should never be in frontend code
- EmailJS handles authentication securely

---

Once setup is complete, your contact form will send real emails to your inbox! 🎉
