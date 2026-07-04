MATCH = [
  {
    id: 1,
    name: "Na Uy - Brazil",
    result: "2-1",
    guest: {
      tuan: "1-0",
      anh: "1-1",
      ha: "2-0",
      phuoc: "2-3",
    },
  },
];

let PLAYERS = [
  {
    name: "Tuấn",
    account: "tuan",
    pNum: 0,
    isShowDetails: false,
  },
  {
    name: "Ánh",
    account: "anh",
    pNum: 0,
    isShowDetails: false,
  },
  {
    name: "Hà",
    account: "ha",
    pNum: 0,
    isShowDetails: false,
  },
  {
    name: "Phước",
    account: "phuoc",
    pNum: 0,
    isShowDetails: false,
  },
];

const displayDetail = {
  tuan: false,
  anh: false,
  ha: false,
  phuoc: false,
};

function calculatePNum() {
  PLAYERS = PLAYERS.map((player) => {
    MATCH.forEach((match) => {
      const playerGuess = match.guest[player.account].split("-");
      const actualResult = match.result.split("-");
      const pNum1 = Number(playerGuess[0]) - Number(actualResult[0]);
      const pNum2 = Number(playerGuess[1]) - Number(actualResult[1]);
      player.pNum += Math.abs(pNum1) + Math.abs(pNum2);
    });
    return player;
  }).sort((a, b) => a.pNum - b.pNum);
}

function displayDetails(account) {
  displayDetail[account] = !displayDetail[account];
  if (displayDetail[account]) {
    let htmlString = ` 
        <tr class="sub-row-header">
            <td>Trận</td>
            <td class="text-center"> Dự đoán | Kết quả </td>
            <td class="text-center">Sai số</td>
        </tr>`;
    MATCH.forEach((match) => {
      const playerGuess = match.guest[account].split("-");
      const actualResult = match.result.split("-");
      const pNum1 = Number(playerGuess[0]) - Number(actualResult[0]);
      const pNum2 = Number(playerGuess[1]) - Number(actualResult[1]);
      const totalPNum = Math.abs(pNum1) + Math.abs(pNum2);
      htmlString += `
        <tr class="sub-row">
            <td>${match.name}</td>
            <td class="text-center"> ${match.guest[account]} | ${match.result} </td>
            <td class="text-center">${totalPNum}</td>
        </tr>`;
    });
    document.getElementById(account).innerHTML = `<table onclick="displayDetails('${account}')">${htmlString}</table>`;
  } else {
    document.getElementById(account).innerHTML = "";
  }
}

function mainDisplay() {
  let htmlString = "";
  calculatePNum();

  // rows
  PLAYERS.forEach((player, index) => {
    let rowClass = index === 0 ? "golden" : index === 1 ? "silver" : "";
    htmlString += `
      <tr class="${rowClass}" onclick="displayDetails('${player.account}')">
      <td class="text-center">${index + 1}</td>
      <td>${player.name}</td>
      <td class="text-center">${player.pNum}</td>
      </tr>
      <tr>
        <td colspan="3" id="${player.account}" class="details"></td>
      </tr>
    `;
  });

  document.getElementById("main").innerHTML = `
        <tr>
          <th>Hạng</th>
          <th>Tên</th>
          <th>Sai số</th>
        </tr>
        ${htmlString}
    `;
}
mainDisplay();
