import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	large: {
		width: theme.spacing(15),
		height: theme.spacing(15),
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

const UserCard = (props) => {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardContent className={classes.content}>
				<Avatar src='/broken-image.jpg' className={classes.large} />
				<Typography variant='h5' component='h2'>
					{props.loggedInStatus.user.username}
				</Typography>
				<Typography className={classes.pos} color='textSecondary'>
					{props.loggedInStatus.user.email}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default UserCard;
