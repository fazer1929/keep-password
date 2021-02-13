import React from "react";
import { Container, Grid, Segment } from "semantic-ui-react";
import Styles from "./Footer.module.css";
export default function Footer() {
	return (
		<div text>
			<Grid columns={1} centered verticalAlign="middle">
				<Grid.Column textAlign="center">
					<span>21</span> users are keeping theirs passwords safe.
				</Grid.Column>
				<Grid.Column>
					<Grid columns={4}>
						<Grid.Column>Home</Grid.Column>
						<Grid.Column>Logout</Grid.Column>
						<Grid.Column>Home</Grid.Column>
						<Grid.Column>Home</Grid.Column>
					</Grid>
				</Grid.Column>
			</Grid>
		</div>
	);
}
