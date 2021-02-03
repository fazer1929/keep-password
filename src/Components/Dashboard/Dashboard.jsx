import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { db } from "../../firebase";
function Dashboard() {
	const { currentUser, signout } = useAuth();
	const history = useHistory();
	function logout() {
		try {
			signout();
			history.push("/");
		} catch {
			history.push("/");
		}
	}

	function addSomething() {
		db.collection("users")
			.doc(currentUser.email)
			.set({
				email: currentUser.email,
			})
			.catch(function (error) {
				console.error("Error adding document: ", error);
			});
		const ref = db.collection("users").doc(currentUser.email);
		ref
			.collection("passwords")
			.doc()
			.add({})
			.catch((e) => console.log(e));
	}
	function readSomething() {
		db.collection("users")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					console.log(`${doc.id} => ${doc.data()}`);
				});
			});
	}

	return (
		<div>
			DashBoard
			<p>Email: {currentUser.email}</p>
			<button onClick={logout}>LogOut</button>
			<button onClick={addSomething}>AddBitch</button>
			<button onClick={readSomething}>ReadBitch</button>
		</div>
	);
}

export default Dashboard;
