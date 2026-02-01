const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = './data.json';
const POSTS_FILE = './posts.json';

const readData = (file) => {
    if (!fs.existsSync(file)) return [];
    try { return JSON.parse(fs.readFileSync(file)); } catch (e) { return []; }
};

const writeData = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

// Quản lý hồ sơ cư dân
app.get('/members', (req, res) => res.json(readData(DATA_FILE)));
app.post('/add-member', (req, res) => {
    let members = readData(DATA_FILE);
    const newMember = { id: Date.now(), ...req.body, date: new Date().toLocaleDateString('vi-VN') };
    members.push(newMember);
    writeData(DATA_FILE, members);
    res.json(newMember);
});

// Quản lý bảng tin cộng đồng
app.get('/posts', (req, res) => res.json(readData(POSTS_FILE)));
app.post('/add-post', (req, res) => {
    let posts = readData(POSTS_FILE);
    const newPost = { id: Date.now(), ...req.body };
    posts.unshift(newPost);
    writeData(POSTS_FILE, posts);
    res.json(newPost);
});

app.delete('/delete-member/:id', (req, res) => {
    let members = readData(DATA_FILE).filter(m => m.id !== parseInt(req.params.id));
    writeData(DATA_FILE, members);
    res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('=== HỆ THỐNG LÀNG LẠC VIỆT ĐÃ SẴN SÀNG ==='));