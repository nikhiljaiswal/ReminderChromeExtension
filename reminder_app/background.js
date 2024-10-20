// Add this line at the beginning of the file
// let emailjs;

// Initialize EmailJS with your user ID
// emailjs.init("R7gME7CU7Ce1qFe_0"); // Replace with your actual user ID

// Function to send a health reminder notification
function sendHealthNotification(reminderText, reminderTime) {
  console.log("Sending health notification for:", reminderText, "at time:", reminderTime);
  chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'Reminder',
      message: reminderText,
      priority: 2
  }, function(notificationId) {
      if (chrome.runtime.lastError) {
          console.error("Notification error:", chrome.runtime.lastError.message);
      } else {
          console.log("Notification created with ID:", notificationId);
          // Send email after creating the notification
          sendEmailNotification(reminderText)
              .then(() => {
                  console.log("Email sent successfully for reminder:", reminderText);
                  removeReminder(reminderTime);
              })
              .catch((error) => {
                  console.error("Failed to send email for reminder:", reminderText, "Error:", error);
                  removeReminder(reminderTime);
              });
      }
  });
}

function sendEmailNotification(reminderText) {
  console.log("Attempting to send email for reminder:", reminderText);

  const emailData = {
    service_id: 'service_m9u7ii3',
    template_id: 'template_c0totj3',
    user_id: 'R7gME7CU7Ce1qFe_0',
    template_params: {
      to_email: "nikhiljais.23@gmail.com",
      message: reminderText,
    }
  };

  return fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailData),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(data => {
    console.log('Email sent successfully:', data);
  })
  .catch(error => {
    console.error('Error sending email:', error);
    throw error;
  });
}

// Other existing functions (removeReminder, alarm listener) remain the same

// Function to remove a reminder from storage
function removeReminder(reminderTime) {
  chrome.storage.sync.get({ reminders: [] }, function(data) {
      const reminders = data.reminders;
      const updatedReminders = reminders.filter(reminder => reminder.time !== Number(reminderTime));

      // Update storage without the removed reminder
      chrome.storage.sync.set({ reminders: updatedReminders }, function() {
          chrome.alarms.clear('reminder_' + reminderTime);
          console.log("Removed reminder for time:", reminderTime);
      });
  });
}

// Listener for the alarm that triggers reminders
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name.startsWith('reminder_')) {
      const reminderTime = alarm.name.split('_')[1];

      // Load reminders from storage to get the text for the specific reminder
      chrome.storage.sync.get({ reminders: [] }, function(data) {
          const reminders = data.reminders;
          const reminder = reminders.find(r => r.time === Number(reminderTime));
          if (reminder) {
              sendHealthNotification(reminder.text, reminderTime); // Pass reminderTime to the notification function
          } else {
              console.log("No reminder found for time:", reminderTime);
          }
      });
  }
});

// Add this at the end of the file
console.log("Background script loaded.");

chrome.runtime.onInstalled.addListener(() => {
  console.log("Background script installed.");
});
