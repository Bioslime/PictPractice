import { Box, AppBar, Toolbar, IconButton, Menu, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const ButtonAppBar = (props) => {
    const token = props.cookie['access-token']
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size='large' edge='start' color='inherit' aria-label="menu" sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component='div' sx={{flexGrow: 1}}>
                        TOP
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export {ButtonAppBar};