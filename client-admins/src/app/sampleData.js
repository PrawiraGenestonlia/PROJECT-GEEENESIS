const sampleDataClubInfo = {
  clubs: [
    {
      title: "NTU EEE",
      bannerImg: "http://www.eee.ntu.edu.sg/aboutus/List%20Slider1/AboutEEE.jpg",
      server_unique_name: "ntueee",
      summary: "insert summary here.",
      html: "",
    },
    {
      title: "EEE LEAD",
      bannerImg: "https://scontent-sin2-2.xx.fbcdn.net/v/t1.0-9/39096424_221009255248150_9049993071927754752_o.png?_nc_cat=100&_nc_oc=AQnW4Q9WVRiTWwpGpjehnAtq2xKGz5p_fFRomCRtFMuRb4eLO__UcLRI1FUB11HWBVo&_nc_ht=scontent-sin2-2.xx&oh=0aaad6a8f0a9c13adddbfd6f2d0c77cd&oe=5E1D2E4C",
      server_unique_name: "eeelead",
      summary: "insert summary here.",
      html: "",
    },
    {
      title: "GARAGE@EEE",
      bannerImg: "http://www.eee.ntu.edu.sg/programmes/Garage/newslider/GarageEEE-Banner-Main3.jpg",
      server_unique_name: "garageeee",
      summary: "insert summary here.",
      html: "",
    }
  ]
}

const uploadCSV = {
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

const sampleDataUserManagement = {
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

export {
  sampleDataClubInfo,
  sampleDataUserManagement,
  uploadCSV
}

