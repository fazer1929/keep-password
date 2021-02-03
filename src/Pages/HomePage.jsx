import React from "react";
import {
	Container,
	Grid,
	Header,
	Image,
	Form,
	Segment,
	Button,
	Message,
} from "semantic-ui-react";
import auth from "../Assests/Images/auth.svg";
import Styles from "./HomePage.module.css";
export default function HomePage(props) {
	return (
		<div>
			<Grid
				textAlign="center"
				stackable
				style={{ height: "100vh" }}
				verticalAlign="middle"
			>
				<Grid.Row columns={2}>
					<Grid.Column>
						<div style={{ height: "100%" }}>
							<Header as="h1" content="Keep Password" />
							<Header as="h2" content="One Stop For All Your Passwords" />
						</div>
					</Grid.Column>
					{props.comp()}
				</Grid.Row>
			</Grid>
		</div>
	);
}
