# 🕒 Reminder Chrome Extension

This Chrome extension allows you to set, view, and manage reminders directly from your browser, ensuring you never miss an important event. Additionally, the extension sends a Chrome notification and an email reminder at the scheduled time!

## 🚀 Features

1. **Add Reminders**  
   Set reminders for a specific date and time directly from the extension.
   
2. **Manage Multiple Reminders**  
   You can create and manage multiple reminders as per your needs.
   
3. **View Reminders**  
   See a list of all your active reminders.
   
4. **Delete Reminders**  
   Option to remove reminders that you no longer need.
   
5. **Desktop Notification & Email Reminder**  
   At the scheduled time, you'll receive a Chrome desktop notification. Additionally, the extension will send an email reminder to your Gmail. The email functionality is powered by [EmailJS](https://www.emailjs.com/).

## 🔧 Setup Instructions

### Prerequisites:
- Google Chrome Browser
- Access to Gmail for email reminders

### How to Install:
1. Clone or download this repository to your local machine.
   ```bash
   git clone https://github.com/nikhiljaiswal/ReminderChromeExtension.git
   ```
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** by toggling the switch at the top right.
4. Click on the **Load unpacked** button and select the `reminder_app` folder.
5. Your extension is now loaded and ready to use!

### How to Use:
1. Click on the extension icon in your Chrome browser.
2. Set the date and time for the reminder.
3. Add as many reminders as you like.
4. View your reminders, or delete the ones you no longer need.
5. At the scheduled time, you will get a Chrome notification and an email sent to your Gmail.

## 📧 Email Setup
This extension uses [EmailJS](https://www.emailjs.com/) for sending emails. You will need to set up your own EmailJS account to link your Gmail. Follow these steps:

1. Go to [EmailJS](https://www.emailjs.com/) and create an account.
2. Create an email service for Gmail.
3. Copy your service ID, template ID, and user ID from EmailJS.
4. Add these credentials to the extension's code in `background.js` or where the email sending logic is implemented.

## 💡 About the Development Process

This is my first Chrome extension, and I'm excited to share it! 

Despite having no prior experience with Chrome extensions, I built this tool with the invaluable assistance of **[ChatGPT](https://chatgpt.com/)** and the AI-powered IDE **[Cursor](https://www.cursor.com/)**. These tools served as coding companions, guiding me through the development process and helping me learn new concepts quickly.

Check out the LinkedIn post about the journey [here](https://lnkd.in/gNvPVJEb).

> AI-assisted development is transforming how we build software, making the process more intuitive and accessible. If you haven't explored AI tools in your development process yet, now is the time! 🚀

## 🎬 Demo

Watch the full demo of the extension in action [here](https://lnkd.in/gNvPVJEb).

---

### 🛠 Built With:
- **JavaScript**
- **HTML/CSS**
- **Chrome APIs**
- **EmailJS**

---

### 🚀 Future Improvements:
- Option to send SMS notifications
- Recurring reminders
- Sync reminders across devices

---

### 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
