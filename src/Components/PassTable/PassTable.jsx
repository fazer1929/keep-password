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
import { aesEncrypt, aesDecrypt } from "../../AES";
export default function PassTable() {
	const { currentUser } = useAuth();
	const history = useHistory();
	const [link, setLink] = useState("");
	const [loading, setLoading] = useState(false);
	const [passVisible, setPassVisible] = useState(false);

	const [list, setList] = useState([]);
	const changeVisiblity = ({ i }) => {
		const index = parseInt(i);
		const itemList = list;
		const item = itemList[parseInt(index)];

		item["visible"] = !item["visible"];
		if (item["visible"]) {
			item["pass"] = aesDecrypt(item["pass"]);
		} else {
			item["pass"] = aesEncrypt(item["pass"]);
		}
		itemList[i] = item;
		setList([...itemList]);
	};
	useEffect(() => {
		const list_temp = [];
		db.collection("users")
			.doc(currentUser.email)
			.collection("passwords")
			.onSnapshot(
				{
					// Listen for document metadata changes
					includeMetadataChanges: true,
				},
				(doc) => {
					const data = doc.docs.map((elem) => {
						const element = elem.data();
						element["visible"] = false;
						return element;
					});
					setList(data);
				},
			);
	}, []);

	return (
		<div
			style={{
				margin: "60px auto",
			}}
		>
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
						{list.map((elem, i) => (
							<Table.Row key={i}>
								<Table.Cell>{elem.name}</Table.Cell>
								<Table.Cell selectable>
									<a href={elem.link} target="#">
										{elem.link}
									</a>
								</Table.Cell>
								<Table.Cell selectable textAlign="center" width={2}>
									<a onClick={() => changeVisiblity({ i })} target="#">
										<Icon name="eye" />
									</a>
								</Table.Cell>
								<Table.Cell textAlign="right">{elem.pass}</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</Container>
		</div>
	);
}
