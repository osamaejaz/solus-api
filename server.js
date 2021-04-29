const express = require('express');
const app = express();
const Boot = require('./core/boot');
const Core = require('./core');

(async () => {
    await Boot.init(app);
    await Core.setupServer(app);
})()