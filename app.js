const tableBody = document.getElementById('table-body')

let flights = [
  {
    time: "08:11",
    destination: "TENOM",
    flight: "LCC101",
    gate: "🟩🟩🟩🟩🟩🟩🟩🟩🟩⬜",
    remarks: "AS SCHEDULED"
   },
  {
    time: "12:39",
    destination: "BEAUFORT",
    flight: "LCC101",
    gate: "🟩🟩🟩🟩🟩⬜⬜⬜⬜⬜",
    remarks: "DELAYED"
   },
  {
    time: "13:21",
    destination: "TANJUNG ARU",
    flight: "LCC101",
    gate: "🟩🟩🟩🟩🟩🟩🟩🟩⬜⬜",
    remarks: "AS SCHEDULED"
  },
  {
    time: "14:01",
    destination: "SEMBULAN",
    flight: "LCC101",
    gate: "🟩🟩🟩🟩🟩🟩🟩🟩⬜⬜",
    remarks: "AS SCHEDULED"
  },
  {
    time: "15:22",
    destination: "HALOGILAT",
    flight: "TAMU TRAIN",
    gate: "🟩🟩🟩🟩🟩🟩🟩🟩🟩⬜",
    remarks: "AS SCHEDULED"
  }
]

//const destinations = ["", "", "", "", "", ""]
//const remarks = ["ON TIME", "DELAYED", //"CANCELLED"]
let hour = 15

function populateTable() {
  for (const flight of flights) {
    const tableRow = document.createElement("tr")
    const tableIcon = document.createElement("td")
    tableIcon.textContent = "🚇"
    tableRow.append(tableIcon)

    for (const flightDetail in flight) {
      const tableCell = document.createElement("td")
      const word = Array.from(flight[flightDetail])

      for (const [index, letter] of word.entries()) {
        const letterElement = document.createElement("div")
        setTimeout(() => {
          letterElement.classList.add('flip')
          letterElement.textContent = letter
          tableCell.append(letterElement)
        }, 100 * index)


      }
      tableRow.append(tableCell)
    }
    tableBody.append(tableRow)
  }
}
populateTable() 



function generateRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  return alphabet.charAt(Math.floor(Math.random() * alphabet.length))
}

function generateRandomNumber(maxNumber) {
  const numbers = "0123456789"
  if (maxNumber) {
    const newNumbers = numbers.slice(0, maxNumber)
    return newNumbers.charAt(Math.floor(Math.random() * newNumbers.length))
  } else {
    return numbers.charAt(Math.floor(Math.random() * numbers.length))
  }
}

function generateTime() {
  let displayHour = hour
  if (hour < 24) {
    hour++
  }
  if (hour >= 24) {
    hour = 1
    displayHour = hour
  }
  if (hour < 10) {
    displayHour = "0" + hour
  }
  return displayHour +  ":" + generateRandomNumber(5) + generateRandomNumber()
}

function shuffleUp() {
  flights.shift()
  flights.push({
    time: generateTime(),
    destination: destinations[Math.floor(Math.random() * destinations.length)],
    flight: generateRandomLetter() + generateRandomLetter() + " " + generateRandomNumber() + generateRandomNumber() + generateRandomNumber(),
    gate: generateRandomLetter() + " " + generateRandomLetter() + generateRandomLetter(),
    remarks: remarks[Math.floor(Math.random() * remarks.length)]
  })
  tableBody.textContent = ""
  populateTable()
}


setInterval(shuffleUp, 5000)

function updateCurrentScheduleHeader() {
  const headerElement = document.getElementById('current-schedule');
  const currentDate = new Date();
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  
  const currentTime = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  
  const headerText = `CURRENT SCHEDULE - ${formattedDate} ${currentTime}`;
  headerElement.textContent = headerText;
}

// Call the function to update the header initially
updateCurrentScheduleHeader();

setInterval(updateCurrentScheduleHeader, 1000); // Update every second
