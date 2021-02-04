import React, { useState } from "react";
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
	Container,
	Icon,
} from "semantic-ui-react";
import { aesEncrypt } from "../../AES";
export default function AddInstance() {
	const { currentUser, signout } = useAuth();
	const history = useHistory();
	const [name, setName] = useState("");
	const [link, setLink] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [passVisible, setPassVisible] = useState(false);

	function logout() {
		try {
			signout();
			history.push("/");
		} catch {
			history.push("/");
		}
	}

	function handleLinkChange(e) {
		setLink(e.target.value);
	}
	function handleNameChange(e) {
		setName(e.target.value);
	}
	function handlePassChange(e) {
		setPassword(e.target.value);
	}

	function handleSubmit(e) {}

	async function addPassword(e) {
		e.preventDefault();
		const data = await {
			name: name,
			link: link,
			pass: aesEncrypt(password),
		};
		setLoading(true);
		const ref = db.collection("users").doc(currentUser.email);
		ref
			.collection("passwords")
			.where("link", "==", link)
			.where("name", "==", name)
			.get()
			.then((doc) => {
				if (doc.size === 0) {
					ref
						.collection("passwords")
						.add(data)
						.catch((e) => console.log(e));
					setLoading(false);
				}
			})
			.catch((e) => console.log(e));
	}

	return (
		<div>
			<Container textAlign="center">
				<Header
					as="h2"
					icon="add circle"
					textAlign="center"
					content="Add Passwords"
				/>
				<Form size="large">
					<Grid stackable>
						<Grid.Column width={4}>
							<Form.Input
								fluid
								icon="user"
								value={name}
								onChange={handleNameChange}
								iconPosition="left"
								placeholder="Name of the app"
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<Form.Input
								fluid
								icon="linkify"
								value={link}
								onChange={handleLinkChange}
								iconPosition="left"
								placeholder="Link"
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<Grid>
								<Grid.Column width={14}>
									<Form.Input
										fluid
										value={password}
										onChange={handlePassChange}
										icon="lock"
										iconPosition="left"
										placeholder="Password"
										type={passVisible ? "text" : "password"}
									/>
								</Grid.Column>
								<Grid.Column
									width={1}
									textAlign="center"
									verticalAlign="middle"
								>
									<Button
										basic
										onClick={() => setPassVisible(!passVisible)}
										icon={passVisible ? "eye slash" : "eye"}
									></Button>
								</Grid.Column>
							</Grid>
						</Grid.Column>
						<Grid.Column width={1}></Grid.Column>
						<Grid.Column width={3}>
							<Button
								loading={loading}
								onClick={addPassword}
								color="green"
								inverted
								fluid
								size="large"
							>
								Add
							</Button>
						</Grid.Column>
					</Grid>
				</Form>
			</Container>
		</div>
	);
}
