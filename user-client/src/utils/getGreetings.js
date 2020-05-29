const getGreetings = () => {
  var today = new Date()
  var curHr = today.getHours()
  if (curHr < 6) {
    return "Time to sleep";
  } else if (curHr < 12) {
    return "Good morning";
  } else if (curHr < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

export default getGreetings;