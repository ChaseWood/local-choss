import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SearchableMap from './SearchableMap';

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3),
	},
}));

export default function PermanentDrawerLeft(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position='fixed' className={classes.appBar}>
				<SearchableMap
					handleCoords={props.handleCoords}
					climbs={props.climbs}
				/>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant='permanent'
				classes={{
					paper: classes.drawerPaper,
				}}
				anchor='left'>
				<div className={classes.toolbar} />
				<Divider />
				<List>
					{props.climbs.routes
						? props.climbs.routes.map((text) => (
								<>
									<ListItem button key={text.name}>
										<ListItemText primary={text.name} />
									</ListItem>
									<Divider />
								</>
						  ))
						: ['climb', 'climb'].map((text, index) => (
								<>
									<ListItem button key={text}>
										<ListItemText primary={text} />
									</ListItem>
									<Divider />
								</>
						  ))}
				</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.toolbar} />
			</main>
		</div>
	);
}
