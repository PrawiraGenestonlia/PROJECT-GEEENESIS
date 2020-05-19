const router = require('express').Router();
const { verifyToken } = require('../../middlewares');
const chat = require('../../models/chat');

router.get('/', verifyToken, async (req, res) => {
    if (!req.user.role) return res.status(401).send('Unauthorized Access!');
    try {
        res.status(200).send('Authorized!');
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

router.post('/get-chats', verifyToken, async (req, res) => {
    if (!req.user.role) return res.status(401).send('Unauthorized Access!');

    const myNetworkName = req.user.email.substring(0, req.user.email.lastIndexOf("@"));
    try {
        const foundChats = await chat.find({ "senderName": myNetworkName, "receiverName": req.body.receiverName }).sort({ time: 'ascending' });
        let chatLists = [];
        for (let i = 0; i < foundChats.length; i++) {
            let cChat = { ...foundChats[i]._doc };
            if (foundChats[i].senderName == myNetworkName) {
                cChat.id = 0;
            } else {
                cChat.id = 1;
            }
            chatLists.push(cChat);
        }
        res.status(200).send(chatLists);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

router.post('/post-chats', verifyToken, async (req, res) => {
    if (!req.user.role) return res.status(401).send('Unauthorized Access!');

    const myNetworkName = req.user.email.substring(0, req.user.email.lastIndexOf("@"));
    const newChat = new chat({
        senderName: myNetworkName,
        receiverName: req.body.receiverName,
        message: req.body.message,
        time: req.body.time ? Date(req.body.time).toLocaleString('en-US', { timeZone: 'SG' }) : new Date().toLocaleString('en-US', { timeZone: 'SG' }),
    });
    try {
        //
        await newChat.save();
        //
        const foundChats = await chat.find({ "senderName": myNetworkName, "receiverName": req.body.receiverName }).sort({ time: 'ascending' });
        let chatLists = [];
        for (let i = 0; i < foundChats.length; i++) {
            let cChat = { ...foundChats[i]._doc };
            if (foundChats[i].senderName == myNetworkName) {
                cChat.id = 0;
            } else {
                cChat.id = 1;
            }
            chatLists.push(cChat);
        }
        res.status(200).send(chatLists);
        res.status(200).send(foundChats);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

module.exports = router;