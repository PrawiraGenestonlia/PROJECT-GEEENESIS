const router = require('express').Router();
const event = require('../../models/event');
const { verifyToken } = require('../../middlewares');

router.get('/', verifyToken, async (req, res) => {
  res.json('Event api is healthy')
});

router.get('/get-events', async (req, res) => {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  //params uniqueName
  if (req.query.event) {
    try {
      let eventInfo = await event.find({ uniqueName: req.query.event, start: { $gte: today } }).sort({ start: 'ascending' });
      if (eventInfo) return res.status(200).send(eventInfo);
      else return res.status(400).send("No results found");
    } catch (err) {
      res.status(400).send(err);
    }
  }
  //params year
  else if (req.query.year) {
    try {
      let eventInfo = await event.find({
        start: { $gte: new Date(req.query.year) },
        end: { $lte: new Date(String(Number(req.query.year) + 1)) }
      }).sort({ start: 'ascending' });
      if (eventInfo) return res.status(200).send(eventInfo);
      else return res.status(400).send("No results found");
    } catch (err) {
      res.status(400).send(err);
    }
  }
  //params createdBy
  else if (req.query.createdBy) {
    try {
      let eventInfo = await event.find({ createdBy: req.query.createdBy, start: { $gte: today } }).sort({ start: 'ascending' });
      if (eventInfo) return res.status(200).send(eventInfo);
      else return res.status(400).send("No results found");
    } catch (err) {
      res.status(400).send(err);
    }
  }
  else {
    try {
      today.setFullYear(today.getFullYear() - 1);
      let eventInfo = await event.find({ start: { $gte: today } }).sort({ start: 'ascending' });
      res.status(200).send(eventInfo);
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

router.get('/get-events-from-today', async (req, res) => {
  try {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let eventInfo = await event.find({ start: { $gte: today } }).sort({ start: 'ascending' });
    res.status(200).send(eventInfo);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/get-all-events', async (req, res) => {
  try {
    let eventInfo = await event.find({}).sort({ start: 'ascending' });
    res.status(200).send(eventInfo);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/get-events-between', async (req, res) => {
  try {
    let start = new Date();
    let end = new Date();
    if (req.query.start) {
      start = new Date(req.query.start);
    }
    if (req.query.end) {
      end = new Date(req.query.end);
    }
    const eventInfo = await event.find({
      $and: [
        { start: { $gte: start } },
        { start: { $lte: end } }
      ]
    }).sort({ start: 'ascending' });
    res.status(200).send(eventInfo);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/create-event', verifyToken, async (req, res) => {
  //check authorization
  if (!(req.user.role === "superadmin" || req.user.role === "clubadmin")) return res.status(401).send('Unauthorized Access!');

  //data validation
  // const { error } = clubInformationValidation(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  //check if club exist
  const isEventExist = await event.findOne({ uniqueName: req.body.uniqueName });
  if (isEventExist) return res.status(400).send('Event already exists');

  const newEvent = new event({
    title: req.body.title,
    uniqueName: req.body.uniqueName,
    description: req.body.description,
    location: req.body.location,
    start: req.body.start,
    end: req.body.end,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    borderColor: req.body.borderColor,
    backgroundColor: req.body.backgroundColor,
    rawEditor: req.body.rawEditor,
    signUpLink: req.body.signUpLink,
    imageUrl: req.body.imageUrl,
    venue: req.body.venue,
    createdBy: req.body.createdBy,
    tags: req.body.tags
  });
  try {
    await newEvent.save();
    res.status(200).send(`${req.body.title} is created`);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/edit-event', verifyToken, async (req, res) => {
  //check authorization
  if (!(req.user.role === "superadmin" || req.user.role === "clubadmin")) return res.status(401).send('Unauthorized Access!');

  //data validation
  // const { error } = clubInformationValidation(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  //check if club exist
  const isEventExist = await event.findOne({ uniqueName: req.body.uniqueName });
  if (!isEventExist) return res.status(400).send('Event does not exist');

  try {
    //update
    const updatedClub = await event.findOneAndUpdate({ uniqueName: req.body.uniqueName, }, {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      start: req.body.start,
      end: req.body.end,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      borderColor: req.body.borderColor,
      backgroundColor: req.body.backgroundColor,
      rawEditor: req.body.rawEditor,
      signUpLink: req.body.signUpLink,
      imageUrl: req.body.imageUrl,
      venue: req.body.venue,
      createdBy: req.body.createdBy,
      tags: req.body.tags
    });
    res.status(200).send(`${req.body.title} is updated successfuly`);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/delete-event', verifyToken, async (req, res) => {
  //check authorization
  if (!(req.user.role === "superadmin" || req.user.role === "clubadmin")) return res.status(401).send('Unauthorized Access!');

  //data validation
  // const { error } = clubInformationValidation(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  //check if club exist
  const isEventExist = await event.findOne({ uniqueName: req.body.uniqueName });
  if (!isEventExist) return res.status(400).send('Event does not exist');

  try {
    //update
    const deletedClub = await event.deleteOne({ uniqueName: req.body.uniqueName, });
    res.status(200).send(`${req.body.title} is deleted successfuly`);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;