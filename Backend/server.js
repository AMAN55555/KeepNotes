const express = require('express');
require("./config");
require('dotenv').config();
const User = require('./Models/users');
const Note = require('./Models/notes');
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const initializeApp=require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable }=require("firebase/storage");
const fireBaseConfig =require("./fireBaseConfig")
const app = express();

app.use(cors());
app.use(express.json());

const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/register", async (req, resp) => {
    try {
        const { name, username, password, email, phone } = req.body;
        const existingUser = await User.findOne({ username: username });

        if (existingUser) {
            return resp.status(400).send("Username already exists");
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ name, username, password: hashedPassword, email, phone });
        const savedUser = await newUser.save();

        resp.status(201).send(savedUser);
    }
    catch (error) {
        resp.status(500).send("Internal Server Error");
    }
});

app.post("/api/login", async (req, resp) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });

        if (!user) {
            return resp.status(404).send("User not found");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return resp.status(401).send("Invalid Credetials");
        }

        const token = jwt.sign({ username }, process.env.jwt_secret, { expiresIn: '1h' });

        resp.status(200).json({ token, user: { name: user.name, username: user.username, email: user.email, phone: user.phone , profileImage:user.profileImage } });
    }
    catch (error) {
        resp.status(500).send("Internal Server Error");
    }
});

app.put("/api/updateProfile", async (req, resp) => {
    try {
        const result = await User.updateOne(
            { username: req.body.username },
            { $set: req.body }
        );

        resp.send(result);
    }
    catch (error) {
        resp.status(500).send("Internal Server Error");
    }
})

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}

app.patch("/api/updateProfileImage", upload.single('profileImage'), async (req, resp) => {
    try {
        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);
        const metadata = {
            contentType: req.file.mimetype,
        };
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);

        const result = await User.updateOne(
            { username: req.body.username },
            { $set: { profileImage: downloadURL } }
        );

        resp.send(result);
    }
    catch (error) {
        resp.status(500).send("Internal Server Error");
    }
})

app.post("/api/addNote", async (req, resp) => {
    try {
        let data = new Note(req.body);
        const result = await data.save();

        resp.send(result);
    }
    catch (error) {
        resp.status(500).send("Internal Server Error");
    }
});

app.get("/api/getAllNotes/:username", async (req, resp) => {
    try {
        let notes = await Note.find({ username: req.params.username });
        resp.send(notes);
    }
    catch (error) {
        resp.status(500).send("Internal Server Error");
    }
});

app.delete("/api/note/deleteNote/:_id", async (req, resp) => {
    try {
        let data = await Note.deleteOne({ _id: req.params._id });
        resp.send(data);
    }
    catch (error) {
        resp.status(500).send("Internal Server Error");
    }
})

app.put("/api/note/update/:_id", async (req, resp) => {
    try {
        let data = await Note.updateOne(
            { _id: req.params._id },
            { $set: req.body }
        );
        resp.send(data);
    }
    catch (error) {
        resp.status(500).send("Internal Server Error");
    }
})

app.use(express.static('public'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});