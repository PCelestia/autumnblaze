const yas = require("youtube-audio-server");
yas.setKey("AIzaSyDiT8b8tmIOPir-g5XfzEliLqEUcVV6f3Y");
const port = 8005;
yas.listen(port, () => console.log("listenin' port " + port));
