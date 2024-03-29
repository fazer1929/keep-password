import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	function signup(email, password) {
		db.collection("users")
			.doc(currentUser.email)
			.set({
				email: currentUser.email,
			})
			.catch(function (error) {
				console.error("Error adding document: ", error);
			});
		return auth.createUserWithEmailAndPassword(email, password);
	}

	function signout() {
		return auth.signOut();
	}
	function resetpassword(email) {
		return auth.sendPasswordResetEmail(email);
	}

	function signin(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signup,
		resetpassword,
		signin,
		signout,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
