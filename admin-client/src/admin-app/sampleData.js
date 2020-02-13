export const sampleDataClubInfo = {
  clubs: [
    {
      title: "NTU EEE",
      bannerImgLink: "http://www.eee.ntu.edu.sg/aboutus/List%20Slider1/AboutEEE.jpg",
      server_unique_name: "ntueee",
      summary: "insert summary here.",
      rawEditor: "{\"entityMap\":{},\"blocks\":[{\"key\":\"637gr\",\"text\":\"Initialized from content state.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}",
    },
    {
      title: "EEE LEAD",
      bannerImgLink: "https://scontent-sin2-2.xx.fbcdn.net/v/t1.0-9/39096424_221009255248150_9049993071927754752_o.png?_nc_cat=100&_nc_oc=AQnW4Q9WVRiTWwpGpjehnAtq2xKGz5p_fFRomCRtFMuRb4eLO__UcLRI1FUB11HWBVo&_nc_ht=scontent-sin2-2.xx&oh=0aaad6a8f0a9c13adddbfd6f2d0c77cd&oe=5E1D2E4C",
      server_unique_name: "eeelead",
      summary: "insert summary here.",
      rawEditor: "",
    },
    {
      title: "GARAGE@EEE",
      bannerImgLink: "http://www.eee.ntu.edu.sg/programmes/Garage/newslider/GarageEEE-Banner-Main3.jpg",
      server_unique_name: "garageeee",
      summary: "insert summary here.",
      rawEditorhtml: "",
    }
  ]
}

export const uploadCSV = {
  columns: ["Name", "Email"],
  data: [
    {
      Name: "Prawira 1",
      Email: "praw0001@e.ntu.edu.sg",
    },
    {
      Name: "Prawira 2",
      Email: "praw0001@e.ntu.edu.sg",
    },
    {
      Name: "Prawira 3",
      Email: "praw0001@e.ntu.edu.sg",
    }
  ]
}

export const sampleDataUserManagement = {
  columns: ["name", "email", "role", "action"],
  data: [
    {
      _id: "12345",
      name: "Prawira 1",
      email: "praw0001@e.ntu.edu.sg",
      role: { options: ["superadmin", "mentor", "student"], current: 'superadmin' },
      action: "action"
    },
    {
      _id: "12346",
      name: "Prawira 2",
      email: "praw0001@e.ntu.edu.sg",
      role: { options: ["superadmin", "mentor", "student"], current: 'superadmin' },
      action: "action"
    }
  ]
}

export const sampleDataEvents = [
  {
    _id: '1234',
    // id: '1234',
    title: 'Test Event 1',
    uniqueName: '',
    description: 'This is event 1',
    location: 'Singapore, SG',
    start: '2019-11-01T20:15:00-04:00',
    end: '2019-11-01T21:45:00-04:00',
    startTime: '2019-11-01T20:15:00-04:00',
    endTime: '2019-11-01T21:45:00-04:00',
    borderColor: 'red',
    backgroundColor: 'red',
    rawEditor: '',
    signUpLink: 'https://www.ntu.edu.sg/Pages/home.aspx',
    imageUrl: '',
    venue: '',
    createdBy: '',
    tags: ['ntueee', 'technical'],
  },
  {
    _id: '1235',
    // id: '1235',
    title: 'Test Event 2',
    description: 'This is event 2.',
    location: 'Singapore, SG',
    start: '2019-11-04T20:15:00-04:00',
    end: '2019-11-11T21:45:00-04:00',
    startTime: '2019-11-04T20:15:00-04:00',
    endTime: '2019-11-11T21:45:00-04:00',
    borderColor: 'blue',
    backgroundColor: 'blue',
    rawEditor: '',
    signUpLink: 'https://www.ntu.edu.sg/Pages/home.aspx',
    imageUrl: '',
    venue: '',
    tags: ['ntueee', 'technical'],
  },
  {
    _id: '1236',
    // id: '1236',
    title: 'Test Event 3',
    description: 'This is event 3.',
    location: 'Singapore, SG',
    start: '2019-11-06T20:15:00-04:00',
    end: '2019-11-08T21:45:00-04:00',
    startTime: '2019-11-06T20:15:00-04:00',
    endTime: '2019-11-08T21:45:00-04:00',
    borderColor: 'green',
    backgroundColor: 'green',
    rawEditor: '',
    signUpLink: 'https://www.ntu.edu.sg/Pages/home.aspx',
    imageUrl: '',
    venue: '',
    tags: [''],
  }
]

