const sampleDataUserManagement = {
  columns: ["Name", "Email", "Role", "Action"],
  data: [
    {
      UID: "12345",
      Name: "Prawira 1",
      Email: "praw0001@e.ntu.edu.sg",
      Role: { options: ["superadmin", "mentor", "student"], current: 'superadmin' },
      Action: "action"
    },
    {
      UID: "12346",
      Name: "Prawira 2",
      Email: "praw0001@e.ntu.edu.sg",
      Role: { options: ["superadmin", "mentor", "student"], current: 'superadmin' },
      Action: "action"
    },
    {
      UID: "12347",
      Name: "Prawira 3",
      Email: "praw0001@e.ntu.edu.sg",
      Role: { options: ["superadmin", "mentor", "student"], current: 'superadmin' },
      Action: "action"
    }
  ]
}

export {
  sampleDataUserManagement
}