import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainScreen from "./components/MainScreen";

$(() => {
    const mainScreen = new MainScreen($('#app'));
    mainScreen.render().then(() => {
        console.log('APP Inicializado!')
    });
});
