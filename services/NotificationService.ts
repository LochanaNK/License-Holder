import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true, // Change to false if you don't want alerts while app is open
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

type EntryType = 'License' | 'Insurance' | 'Emission';

export const NotificationService = {
    setup: async () => {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            console.log("Failed to get push token for push notification!");
            return false;
        }

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('license-alerts', {
                name: 'License Alerts',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
        return true;
    },

    scheduleExpiryNotification: async (id: number, name: string, expiryDateString: string, type: EntryType) => {

        const now = new Date();
        const notifyDaysBefore = [5, 1];



        for (const days of notifyDaysBefore) {
            //creating notification id
            const notificationId = `${type}-${String(id)}-${days}day`;

            //cancels the old notification if it still exists
            await Notifications.cancelScheduledNotificationAsync(notificationId);

            const [year, month, day] = expiryDateString.split('-').map(Number);
            let triggerDate = new Date(year, month - 1, day, 9, 0, 0);
            triggerDate.setDate(triggerDate.getDate() - days);


            console.log(`Checking ${days}-day alert for ${name}. Calculated trigger: ${triggerDate.toLocaleString()}`);
            if (triggerDate <= now) {
                const actualExpiry = new Date(year, month - 1, day, 23, 59, 59);
                if (actualExpiry > now) {
                    triggerDate = new Date(Date.now() + 5000);
                    console.log(`LOG: 9AM passed for ${days}-day alert. Triggering INSTANTLY`);
                } else {
                    console.log(`LOG: ${days}-day alert skipped (Expiry is in the past).`);
                    continue;
                }
            }

            await Notifications.scheduleNotificationAsync({
                identifier: notificationId,
                content: {
                    title: `⚠️ ${type} Expiring Soon`,
                    body: `${name}'s ${type.toLowerCase()} expires in ${days} day${days > 1 ? 's' : ''}!`,
                },
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.DATE,
                    date: triggerDate,
                },
            });
            console.log(`LOG: Scheduled ${days}-day alert for: ${triggerDate.toLocaleString()}`);
        }

    },

    cancelNotificationsForId: async (id: number, type: EntryType) => {
        const notifyDaysBefore = [5, 1];

        for (const days of notifyDaysBefore) {
            const notificationId = `${type}-${String(id)}-${days}day`;
            try {
                await Notifications.cancelScheduledNotificationAsync(notificationId);
                console.log(`Cancelled notification: ${notificationId}`);
            } catch (error) {
                console.error(`Failed to cancel notification ${notificationId}:`, error);
            }
        }
    }

};