import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, EmailAuthProvider, GoogleAuthProvider, initializeAuth, reauthenticateWithCredential, signInWithCredential, signInWithEmailAndPassword, updatePassword, User} from "firebase/auth";
import { NavigationProp } from "@react-navigation/native";
import { Alert } from "react-native";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";


const firebaseConfig = {
  apiKey: "AIzaSyDJ0MzRiITE2mcp6_O6KenPfR1YyL1av4I",
  authDomain: "burgerownia-248.firebaseapp.com",
  projectId: "burgerownia-248",
  storageBucket: "burgerownia-248.appspot.com",
  messagingSenderId: "413523460490",
  appId: "1:413523460490:web:06743a725af7d5c24c4873",
  measurementId: "G-60PV422H8M"
};


const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP);

GoogleSignin.configure({
  webClientId: '413523460490-1ngt6htht82r7vp2jii7gifi9tj3t9r1.apps.googleusercontent.com',
});


export const signInWithEmail = async (
    email: string,
    password: string,
    navigation: NavigationProp<any>
  ) => {
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      if(email !== undefined && email !== null) {
        await AsyncStorage.setItem('email', email);
        console.log(email);
        navigation.navigate('Tab');
    }
      Alert.alert('Zalogowano pomyślnie');
  } catch (error: any) {
    let errorMessage = 'Błąd podczas logowania';

    if (error.code === 'auth/invalid-email') {
        errorMessage = 'Nieprawidłowy format adresu e-mail';
    } else if (error.code === 'auth/invalid-credential') {
      errorMessage = 'Nieprawidłowy login lub hasło';
    } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Nieprawidłowe hasło';
    } else if (error.code === 'auth/missing-password') {
        errorMessage = 'Brak hasła';
    }else {
      errorMessage = 'Wystąpił nieznany błąd podczas logowania';
    }

    console.log(error);
    Alert.alert(errorMessage);
  }
};

export  const signUp = async (
  email: string,
  password: string,
  navigation: NavigationProp<any>
) => {
try {
    await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
    if(email !== undefined && email !== null) {
      await AsyncStorage.setItem('email', email);
      console.log(email);
      navigation.navigate('Tab');
  }
    Alert.alert('Zalogowano pomyślnie');
} catch (error:any) {
  let errorMessage = 'Błąd podczas logowania';

  if (error.code === 'auth/invalid-email') {
      errorMessage = 'Nieprawidłowy format adresu e-mail';
  } else if (error.code === 'auth/weak-password') {
    errorMessage = 'Hasło musi posiadać co najmniej 6 znaków';
  } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Nieprawidłowe hasło';
  } else if (error.code === 'auth/missing-password') {
      errorMessage = 'Brak hasła';
  }else if (error.code === 'auth/email-already-in-use') {
    errorMessage = 'Podany email jest już wykorzystywany';
  } else {
    errorMessage = 'Wystąpił nieznany błąd podczas logowania';
  }

  console.log(error);
  Alert.alert(errorMessage);
} 
};

export const signOut = async (navigation: NavigationProp<any>) => {
  try {

    await FIREBASE_AUTH.signOut();

    await AsyncStorage.removeItem('email');


    await GoogleSignin.signOut();

    Alert.alert('Wylogowano pomyślnie');

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });

  } catch (error: any) {
    console.log('Błąd podczas wylogowywania:', error);
    Alert.alert('Błąd podczas wylogowywania ' + error.message);
  }
};


export const removeAccount = async (navigation: NavigationProp<any>) => {
  try {
    const user: User | null = FIREBASE_AUTH.currentUser;

    if (user) {
      
      await user.delete();

      
      await FIREBASE_AUTH.signOut();

      await AsyncStorage.removeItem('email');

      await GoogleSignin.signOut();

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });

      Alert.alert('Konto zostało pomyślnie usunięte');
    } 
  } catch (error: any) {
    console.log('Błąd podczas usuwania konta:', error);
    Alert.alert('Błąd podczas usuwania konta ' + error.message);
  }
};


export const changePassword = async (
  newPassword: string,
  currentPassword: string,
  email: string,
  navigation: NavigationProp<any>

) => {
  try {
    const user: User | null = FIREBASE_AUTH.currentUser;

    if (user) {
      const credential = EmailAuthProvider.credential(email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);

      Alert.alert('Hasło zostało pomyślnie zmienione');
      navigation.goBack(); 

    } 

  } catch (error: any) {
    let errorMessage = 'Failed to change password';

    if (error.code === 'auth/invalid-credential') {
      errorMessage = 'Dotychacznie hasło jest nieprawidłowe';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Nowe hasło musi posiadać więcej niż 6 znaków';
    } else {
      errorMessage = 'Unknown error occurred while changing password';
    }

    console.log(error);
    Alert.alert(errorMessage);
  }
};

export const signInWithGoogle = async () => {
  try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const credential = GoogleAuthProvider.credential(idToken);
      console.log(credential);
      await signInWithCredential(FIREBASE_AUTH, credential);
      
  } catch (error: any) {
    console.log('Google Sign-In Error:', error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      Alert.alert('Logowanie anulowane');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      Alert.alert('Logowanie w toku');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Alert.alert('Brak usług Google Play na urządzeniu');
    } else {
      Alert.alert('Wystąpił błąd podczas logowania');

    }
  }
};

export async function onGoogleButtonPress() {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true});

    const { idToken, user } = await GoogleSignin.signIn();
    Alert.alert('Zalogowano pomyślnie');

    const googleCredential = GoogleAuthProvider.credential(idToken);
    return signInWithCredential(FIREBASE_AUTH, googleCredential);
  } catch(error: any) {
    console.log(error);
    Alert.alert('Błąd podczas logowania ' + error.message);
  }
}


