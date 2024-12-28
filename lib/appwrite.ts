import { Account, Avatars, Client, OAuthProvider } from 'react-native-appwrite';
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';



export const config = {
    platform : 'com.stranger.realestate',
    endpoint : process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId : process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}


export const client = new Client();

client.setEndpoint(config.endpoint!).setProject(config.projectId!).setPlatform(config.platform!);



export const avatar = new Avatars(client);
export const account = new Account(client);



export async function login() {
    try {
        const redeirectUri = Linking.createURL('/');
        const response = await account.createOAuth2Session(OAuthProvider.Google, redeirectUri);

        if (!response) throw new Error('Create OAuth2 token failed');
        const browserResult = await openAuthSessionAsync(response.toString(),redeirectUri);

        if (browserResult.type !== 'success') {
            throw new Error('Failed to login');
        }
        console.log(browserResult);
        const url = new URL(browserResult.url);

        console.log(url);
        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();

        console.log(secret, userId);
        if (!secret || !userId) {
            throw new Error('Failed to get userId and secretId');
        }

        const session = await account.createSession(userId, secret);

        if (!session) {
            throw new Error('Failed to create a session');
        }
        
    } catch (error) {
        console.error(error);
        return false;
    }
}



export async function logout() {
    try {
        await account.deleteSession('current');
    } catch (error) {
        console.error(error);
        return false;
    }
}


export async function getCurrentUser() {
    try {
        const response = await account.get();
        console.log(response);
        if (response.$id) {
            const userAvatr = avatar.getInitials(response.name);
            return {
                ...response,
                avatar : userAvatr.toString()
            }
        }

    } catch (error) {
        console.error(error);
        return false;
    }
}
