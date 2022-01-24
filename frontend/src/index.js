import ReactDOM from 'react-dom';
import PictCatch from './pictcatch';
import Header from './header';
import Footer from './footer';
import RoutePage from './routerpage';

ReactDOM.render(
    <RoutePage/>,
    document.getElementById('main')
)

ReactDOM.render(
    <Footer/>,
    document.getElementById('footer')
)