import { makeStyles } from "@material-ui/core"

const useStyle = (theme) => {
    return makeStyles({
        root:{
            flexGrow: 1,
        },
        flex: {
            flex: 1,
        },
        menuButton: {
            marginLeft: -12,
            marginRight: 20,
        },
        // toolbarMargin: theme.mixins.toolbar, 
    })
}

export {useStyle}