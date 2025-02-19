import $ from 'jquery';
import MainScreen from "./components/MainScreen";

$(() => {
    const mainScreen = new MainScreen($('#app'));
    mainScreen.render().then(() => {
        console.log('APP Inicializado!')
    });
});
