import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import StarIcon from '@material-ui/icons/Star';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		paddingRight: 20,
	},
	location: {
		fontSize: 14,
		fontWeight: 'fontWeightLight',
		textAlign: 'left',
	},
	remove: {
		marginLeft: 'auto',
	},
}));

export default function RouteRow(props) {
	const classes = useStyles();
	const { climb } = props;

	// const url = 'http://localhost:3001';
	const url = 'https://local-choss-api.herokuapp.com';

	const deleteClimb = () => {
		Axios.delete(`${url}/climbs/${climb.id}`).then((res) => res.data);
		props.deleteClimb();
		props.setRemoveRow();
	};

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<FilterHdrIcon />
					<Typography variant='h6' className={classes.title}>
						{climb.name}
					</Typography>
					{climb.location.map((location) => (
						<Typography className={classes.location}>{location}/</Typography>
					))}
					<Typography variant='h6' className={classes.title}>
						{climb.rating}
					</Typography>
					<Typography variant='h6' className={classes.title}>
						{climb.stars}
						<StarIcon />
					</Typography>
					<Button
						className={classes.remove}
						onClick={deleteClimb}
						color='inherit'>
						Remove
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}
