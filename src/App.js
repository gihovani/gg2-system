import {MainScreen} from './screens/MainScreen.js';

$(() => {
    const mainScreen = new MainScreen($('#app'));
    mainScreen.render();
});
