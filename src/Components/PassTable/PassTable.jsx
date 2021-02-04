import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { db } from "../../firebase";
import {
	Row,
	Column,
	Grid,
	Segment,
	Form,
	Header,
	Button,
	Table,
	Container,
	Icon,
} from "semantic-ui-react";

export default function PassTable() {
	const { currentUser } = useAuth();
	const history = useHistory();
	const [name, setName] = useState("");
	const [link, setLink] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [credList, setCredList] = useState([]);
	const [passVisible, setPassVisible] = useState(false);

	useEffect(() => {
		db.collection("users")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {});
			});
	}, []);
	function handleLinkChange(e) {
		setLink(e.target.value);
	}
	function handleNameChange(e) {
		setName(e.target.value);
	}
	function handlePassChange(e) {
		setPassword(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		try {
			setLoading(true);
		} catch (e) {}
	}

	function addPassword() {
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
					console.log(`${doc.id} => `);
					console.log(doc.data());
				});
			});
	}

	return (
		<div
			style={{
				margin: "60px auto",
			}}
		>
			<Button onClick={readSomething}></Button>
			<Container textAlign="center">
				<Header
					as="h2"
					icon="list"
					textAlign="center"
					content="Your Passwords"
				/>
				<Table unstackable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.HeaderCell>Link</Table.HeaderCell>
							<Table.HeaderCell textAlign="right">Visibility</Table.HeaderCell>
							<Table.HeaderCell textAlign="right">Password</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						<Table.Row>
							<Table.Cell>John</Table.Cell>
							<Table.Cell selectable>
								<a href="/">www.google.com</a>
							</Table.Cell>
							<Table.Cell
								selectable
								icon="eye"
								textAlign="center"
								width={2}
							></Table.Cell>
							<Table.Cell textAlign="right">None</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</Container>
		</div>
	);
}
