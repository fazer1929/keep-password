import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { db } from "../../firebase";
import AddInstance from "../AddInstance/AddInstance";
import PassTable from "../PassTable/PassTable";
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
			<AddInstance />
			<PassTable />
		</div>
	);
}

export default Dashboard;
