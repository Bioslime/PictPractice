import { Button } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import { GlobalStyles } from '@mui/styled-engine';
import { ButtonAppBar } from './ButtonAppBar';


const CustomButton = styled(Button)({
    background: 'glay', 
})

const StyledButton = (props) => {
    return <CustomButton variant='contained'>{props.childeren}</CustomButton>
}

const StyledHeader = (props) => {
    return(<>
        <GlobalStyles styles={{body:{margin: 0, padding: 0}}} />
        <ButtonAppBar cookie={props.cookie}/>
    </>)
}


export {StyledButton, StyledHeader}; 