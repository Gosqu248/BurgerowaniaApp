import { initializeApp } from "firebase/app";
import { browserSessionPersistence, createUserWithEmailAndPassword, GoogleAuthProvider, initializeAuth, signInWithCredential, signInWithEmailAndPassword} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { NavigationProp } from "@react-navigation/native";
import { Alert } from "react-native";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";


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
const FIREBASE_DB = getFirestore(FIREBASE_APP);

GoogleSignin.configure({
  webClientId: '413523460490-1ngt6htht82r7vp2jii7gifi9tj3t9r1.apps.googleusercontent.com',
});


export async function onGoogleButtonPress() {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true});

    const { idToken, user } = await GoogleSignin.signIn();
    console.log(idToken);
    Alert.alert('Zalogowano pomyślnie');

    const googleCredential = GoogleAuthProvider.credential(idToken);
    return signInWithCredential(FIREBASE_AUTH, googleCredential);
  } catch(error: any) {
    console.log(error);
    Alert.alert('Błąd podczas logowania ' + error.message);
  }
}




export const signInWithEmail = async (
    email: string,
    password: string,
    navigation: NavigationProp<any>
  ) => {
    try {
      const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      console.log(response);
      Alert.alert('Zalogowano pomyślnie');
      navigation.navigate('Tab');
  } catch (error: any) {
      console.log(error);
      Alert.alert('Błąd podczas logowania ' + error.message);
  }
};

export  const signUp = async (
  email: string,
  password: string,
  navigation: NavigationProp<any>
) => {
try {
    const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
    console.log(response);
    Alert.alert('Zarejestrowano pomyślnie');
    navigation.navigate('Tab');
} catch (error:any) {
    console.log(error);
    Alert.alert('Błąd podczas rejestracji ' + error.message);
} 
};


export const signInWithGoogle = async ( 
    ) => {
  try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const credential = GoogleAuthProvider.credential(userInfo.idToken); 
      console.log(credential);
      await signInWithCredential(FIREBASE_AUTH, credential);
      
  } catch (error: any) {
    console.log('Google Sign-In Error:', error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // Użytkownik anulował logowanie
      Alert.alert('Logowanie anulowane');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // Logowanie w toku
      Alert.alert('Logowanie w toku');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // Brak usług Google Play na urządzeniu
      Alert.alert('Brak usług Google Play na urządzeniu');
    } else {
      Alert.alert('Wystąpił błąd podczas logowania');

    }
  }
};


