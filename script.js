const corrency_one=document.getElementById('currency-one');
const corrency_two=document.getElementById('currency-two');

const amount_one=document.getElementById('amount-one');
const amount_two=document.getElementById('amount-two');

//ดึง api

const rateText=document.getElementById('rate');
const swap=document.getElementById('btn'); //ปุ่มสลับสกุลเงิน

corrency_one.addEventListener('change',calculateMoney);
corrency_two.addEventListener('change',calculateMoney);

//ใส่ค่าในช่อง
amount_one.addEventListener('input',calculateMoney);
amount_two.addEventListener('input',calculateMoney);

function calculateMoney(){
    const one = corrency_one.value;
    const two = corrency_two.value;
    const url = `https://api.exchangerate-api.com/v4/latest/${one}`;

    fetch(url).then(res=>res.json()).then(data=>{
        const rate = data.rates[two];
        rateText.innerText=`1 = ${one} = ${rate}${two}`;
        amount_two.value=(amount_one.value*rate).toFixed(4);
    }) 
    //fetch ส่งค่ากลับ .then ให้ res = json แล้วดึงdata ออกมาแสดง โดยแสดง rate 
}

swap.addEventListener('click',()=>{
    // USD => THB  || THB => USD
    // Temp = USD  || THB = Temp (usd)
    const temp = corrency_one.value; //ต้นทาง
    corrency_one.value = corrency_two.value;
    corrency_two.value = temp;
    calculateMoney();
})

calculateMoney();