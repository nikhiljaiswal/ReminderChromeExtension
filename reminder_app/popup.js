document.addEventListener('DOMContentLoaded', function() {
    // Function to load reminders from storage and display them in the popup
// Function to load reminders from storage and display them in the popup
function loadReminders() {
    chrome.storage.sync.get({ reminders: [] }, function(data) {
        const reminders = data.reminders;
        const reminderList = document.getElementById('reminder-list');
        reminderList.innerHTML = '';  // Clear the current list

        reminders.forEach(reminder => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="reminder-text"><strong>${reminder.text}</strong> at ${new Date(reminder.time).toLocaleString()}</span>
                <button class="delete-button">Del</button>
            `;
            
            // Add delete functionality
            li.querySelector('.delete-button').addEventListener('click', function() {
                deleteReminder(reminder.time);
            });

            reminderList.appendChild(li);
        });
    });
}


    // Function to add a new reminder
    function addReminder(text, time) {
        const reminderTime = new Date(time).getTime();
        
        // Check if the time is in the future
        if (reminderTime <= Date.now()) {
            alert("Please set a time in the future.");
            return;
        }
        
        chrome.storage.sync.get({ reminders: [] }, function(data) {
            const reminders = data.reminders;
            reminders.push({ text, time: reminderTime });

            chrome.storage.sync.set({ reminders }, function() {
                chrome.alarms.create('reminder_' + reminderTime, { when: reminderTime });
                loadReminders();  // Reload the reminders list in the popup
            });
        });
    }

    // Function to delete a reminder by time
    function deleteReminder(reminderTime) {
        chrome.storage.sync.get({ reminders: [] }, function(data) {
            const reminders = data.reminders;
            const updatedReminders = reminders.filter(reminder => reminder.time !== reminderTime);

            chrome.storage.sync.set({ reminders: updatedReminders }, function() {
                chrome.alarms.clear('reminder_' + reminderTime);
                loadReminders();  // Reload the reminders list
            });
        });
    }

    // Set up the reminder form submission
    const setReminderBtn = document.getElementById('set-reminder');
    if (setReminderBtn) {
        setReminderBtn.addEventListener('click', function() {
            const reminderText = document.getElementById('reminder-text').value;
            const reminderTime = document.getElementById('reminder-time').value;

            if (reminderText && reminderTime) {
                addReminder(reminderText, reminderTime);

                // Clear input fields after setting a reminder
                document.getElementById('reminder-text').value = '';
                document.getElementById('reminder-time').value = '';
            } else {
                alert('Please fill in both fields.');
            }
        });
    }

    // Load reminders when the popup opens
    loadReminders();
});
