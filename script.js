let sheetNames = [];
let sheetData;
let setenceData;
let settingData;
let genData;
let learnType = '';
var tempGenData;
var sheetSelect;
var sheetSelectValue;

async function fetchSheetNames() {
    try {
        const response = await fetch('http://127.0.0.1:5000/get_excel_data');
        if (!response.ok) throw new Error('Network response was not ok');
        sheetData = await response.json();
        sheetNames = Object.keys(sheetData);
        populateSheetSelection(sheetNames);
        setenceData = sheetData['sentence'];
        settingData = sheetData['setting'];
    } catch (error) {
        console.error('Fetch operation error:', error);
    }
}

function populateSheetSelection(sheetNames) {
    sheetSelect = document.getElementById('sheetSelect');
    sheetSelect.innerHTML = sheetNames.map(sheet => `<option value="${sheet}">${sheet}</option>`).join('');
}

document.addEventListener('DOMContentLoaded', fetchSheetNames);
function selectOptionLearn(element) {
    sheetSelectValue = sheetSelect.value;
    genData = sheetData[sheetSelectValue];
    var fromQuestion = parseInt(document.getElementById('fromQuestion').value);
    var toQuestion = parseInt(document.getElementById('toQuestion').value);
    fromQuestion = fromQuestion != 0 && !isNaN(fromQuestion) ? fromQuestion - 1 : 0;
    toQuestion = toQuestion != 0 && !isNaN(toQuestion) != 0 ? toQuestion : genData.length;
    toQuestion = Math.min(genData.length, toQuestion);
    genData = genData.slice(fromQuestion, toQuestion);

    learnType = element.getAttribute("value");
    const options = element.parentNode.querySelectorAll('.radio-option');
    options.forEach(option => option.classList.remove('selected'));
    element.classList.add('selected');

    nextQuestion(false);
}

async function fetchUptime() {
    try {
        const response = await fetch('http://127.0.0.1:5000/uptime');
        const data = await response.json();
        return data.uptime;
    } catch (error) {
        console.error('Error fetching uptime:', error);
    }
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

async function updateUptime() {
    const uptimeSeconds = await fetchUptime();
    let currentSeconds = uptimeSeconds;
    document.getElementById('uptime').textContent = formatTime(currentSeconds);

    setInterval(() => {
        currentSeconds++;
        document.getElementById('uptime').textContent = formatTime(currentSeconds);
    }, 1000);
}

function nextQuestion(next = true) {
    countData();
    document.getElementById("result1").innerHTML = '';
    document.getElementById("result2").innerHTML = '';
    document.getElementById('text2').value = null;
    if (next || !tempGenData) {
        tempGenData = getRandomItemByWeight(genData);
    }
    if (!tempGenData) {
        document.getElementById("layoutQuestion").innerHTML = `
            <div class="content-normal">
                <p class="text-normal">Đã học thuộc hết câu hỏi.</p>
            </div>
        `;
        return;
    }
    var codePart = tempGenData['part'];
    var codeType = tempGenData['type'];
    var numberData = tempGenData['number'];
    var setenceData = tempGenData['setence'];
    setenceData = setenceData.replaceAll('\n', '</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ');
    var meanData = tempGenData['mean'];
    var part = settingData.find(item => item.col === 'part' && item.code === codePart && item.sheet === sheetSelectValue)['mean'];
    var type = settingData.find(item => item.col === 'type' && item.code === codeType && item.sheet === sheetSelectValue)['mean'];

    if (learnType != "fit") {
        document.getElementById("layoutQuestion").innerHTML = `
            <div class="content-normal">
                <p class="text-normal">${numberData}) ${type}: ${part}</p>
                <p class="text-normal"  ${learnType == 'v_e' || learnType == 'lrn' ? 'id="text1"' : ''};" 
                style="display: ${learnType == 'v_e' ? 'none' : ''};">${setenceData}</p>
                <p class="text-normal" ${learnType == 'e_v' || learnType == 'lrn' ? 'id="text1"' : ''};" 
                style="display: ${learnType == 'e_v' ? 'none' : ''};">${meanData}</p>
            </div>
        `;
    } else {
        var tempChar = replaceRandomChars(setenceData, document.getElementById("levelQuestion").value);
        document.getElementById("layoutQuestion").innerHTML = `
            <div class="content-normal">
                <p class="text-normal">${numberData}) ${type}: ${part}</p>
                <p class="text-normal" id="text1" style="display: none;">${tempChar[0]}</p>
                <p class="text-normal" id="textFill">${tempChar[1]}</p>
                <p class="text-normal">${meanData}</p>
            </div>
        `;
    }
}

function compareTexts() {
    const text1 = document.getElementById('text1').innerHTML;
    var text2 = document.getElementById('text2').value;
    if (learnType == 'fit') {
        var textFill = document.getElementById("textFill").innerHTML;
        var tempTextFill = textFill.split(" ");
        var tempText2 = text2.split("\n");
        if (tempText2.length != textFill.split(/__.*?__/).length - 1) {
            alert("Số chữ nhập vào không đúng!");
            return false;
        } else {
            var count = 0;
            for (let i = 0; i < tempTextFill.length; i++) {
                if (/__.*?__/.test(tempTextFill[i])) {
                    tempTextFill[i] = "__"+tempText2[count]+"__";
                    count += 1;
                }
            }
            text2 = tempTextFill.join(' ');
        }
    }

    const result1 = document.getElementById('result1');
    const result2 = document.getElementById('result2');

    const dmp = new diff_match_patch();
    const diffs = dmp.diff_main(text1, text2);
    dmp.diff_cleanupSemantic(diffs);

    let compared1 = '';
    let compared2 = '';

    diffs.forEach(part => {
        const type = part[0];
        const value = part[1];
        if (type === 1) { // Added
            compared2 += `<span class="added">${value}</span>`;
        } else if (type === -1) { // Removed
            compared1 += `<span class="removed">${value}</span>`;
        } else { // Unchanged
            compared1 += value;
            compared2 += value;
        }
    });

    result1.innerHTML = compared1;
    result2.innerHTML = compared2;
}

function replaceRandomChars(inputString, n) {
    if (n > inputString.length) {
        throw new Error("n phải nhỏ hơn hoặc bằng độ dài của chuỗi");
    }

    // Chuyển chuỗi thành mảng để dễ thay đổi
    let charArray2 = inputString.split(' ');
    let charArray1 = inputString.split(' ');

    // Chọn ngẫu nhiên n vị trí trong chuỗi
    let randomIndices = [];
    while (randomIndices.length < n) {
        let randIndex = Math.floor(Math.random() * charArray2.length);
        if (!randomIndices.includes(randIndex)) {
            randomIndices.push(randIndex);
        }
    }
    randomIndices = randomIndices.sort((a, b) => a - b);

    // Thay thế các ký tự tại các vị trí đã chọn bằng ký tự '_'
    var tempCount = 1;
    randomIndices.forEach(index => {
        charArray1[index] = '__'+charArray1[index]+'__'+ 
            (charArray1[index].includes(".") ? "." : "" ) + 
            (charArray1[index].includes(",") ? "," : "") +
            (charArray1[index].includes("</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;") ? "</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" : "" );
        charArray2[index] = '__'+tempCount+'__'+ 
            (charArray2[index].includes(".") ? "." : "" ) + 
            (charArray2[index].includes(",") ? "," : "") +
            (charArray2[index].includes("</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;") ? "</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" : "" );
        tempCount++;
    });

    // Chuyển mảng trở lại thành chuỗi
    return [charArray1.join(' '), charArray2.join(' ')];
}
function correctQuestion() {
    if (!tempGenData) return;
    tempGenData['weight'] -= 1;
    updateWeight(document.getElementById('sheetSelect').value,
        tempGenData['number'],
        tempGenData['weight']);
    nextQuestion();
}
function wrongQuestion() {
    if (!tempGenData) return;
    tempGenData['weight'] += 1;
    updateWeight(document.getElementById('sheetSelect').value,
        tempGenData['number'],
        tempGenData['weight']);
    nextQuestion();
}

function getRandomItemByWeight(items) {
    const filteredItems = items.filter(item => item.weight > 0);
    const totalWeight = filteredItems.reduce((sum, item) => sum + item.weight, 0);
    let randomNum = Math.random() * totalWeight;
    for (let item of filteredItems) {
        randomNum -= item.weight;
        if (randomNum <= 0) {
            return item;
        }
    }
    return false;
}


async function updateWeight(sheetName, number, weight) {

    const data = {
        sheet_name: sheetName,
        number: Number(number),
        weight: weight
    };

    const response = await fetch('http://localhost:5000/update_weight', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const result = await response.json();
        console.log(result.message);
    } else {
        const error = await response.json();
        console.log(`Error: ${error.error}`);
    }
}

function countData() {
    const weightCount = {};
    genData.forEach(obj => {
        const weight = obj.weight;
        if (weightCount[weight]) {
            weightCount[weight]++;
        } else {
            weightCount[weight] = 1;
        }
    });
    overallResult = document.getElementById("overallResult");
    overallResult.innerHTML = '';
    for (let key in weightCount) {
        if (weightCount.hasOwnProperty(key)) {
            overallResult.innerHTML += `
                <p>${key} : ${weightCount[key]}</p>
            `
        }
    }
}
window.onload = updateUptime;
document.addEventListener('keydown', function (event) {
    const result1 = document.getElementById('result1');
    const result2 = document.getElementById('result2');
    const text2 = document.getElementById('text2');
    if (event.key === 'Enter') {
        document.getElementById("countLineText2").value = text2.value.split("\n").length+1;
    }
    if (event.key === 'Enter' && event.ctrlKey) {
        if (result1.innerHTML == '') {
            compareTexts();
        }
        else {
            if (result1.innerHTML == result2.innerHTML) correctQuestion();
            else wrongQuestion();
            text2.value  = '';
        }
    }
});