import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

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

    scheduleExpiryNotification: async (name: string, expiryDateString: string, type: EntryType) => {
        const expiryDate = new Date(`${expiryDateString}T09:00:00`);
        const now = new Date();

        const notifyDaysBefore = [5, 1];

        for (const days of notifyDaysBefore) {
            const triggerDate = new Date(expiryDate.getTime() - (days * 24 * 60 * 60 * 1000));

            const icon = type === 'License' ? '🛡️' : '📄';
            console.log(`Checking ${days}-day alert for ${name}. Calculated trigger: ${triggerDate.toLocaleString()}`);
            if (triggerDate > now) {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: `⚠️ ${type} Expiring Soon`,
                        body: `${name}'s ${type.toLowerCase()} expires in ${days} day${days > 1 ? 's' : ''}!`,
                        data: { type, name },
                    },
                    trigger: {
                        date: triggerDate,
                        channelId:'license-alerts',
                    } as Notifications.DateTriggerInput, // Pass the Date object directly as the trigger
                });
                console.log(`Scheduled ${days}-day alert for ${triggerDate.toLocaleString()}`);
            }else{
                console.log(`Skipped ${days}-day alert for ${name} (date is in the past)`);
            }

        }
    }
};