import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
		paddingLeft: 10,
		paddingRight: 20,
	},
	location: {
		fontSize: 12,
		fontWeight: 'fontWeightLight',
		textAlign: 'left',
	},
	remove: {
		marginLeft: 'auto',
	},
	stars: {
		marginLeft: 'auto',
	},
	appBar: {
		backgroundColor: '#e9c46a',
		color: 'black',
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
			<AppBar position='static' className={classes.appBar}>
				<Toolbar>
					<FilterHdrIcon />
					<Typography variant='h6' className={classes.title}>
						{climb.name}
					</Typography>
					<Typography variant='subtitle2' className={classes.title}>
						{climb.rating}
					</Typography>
					<Typography variant='subtitle2' className={classes.title}>
						{climb.style}
					</Typography>
					{climb.location.map((location) => (
						<Typography className={classes.location}>{location}/</Typography>
					))}
					<Typography variant='subtitle2' className={classes.stars}>
						{climb.stars}
					</Typography>
					<StarIcon />
					<Button onClick={deleteClimb} color='inherit'>
						Remove
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}
