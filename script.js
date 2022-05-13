let year = document.querySelector(".year");
let month = document.querySelector(".month");
let day = document.querySelector(".day");
let hour = document.querySelector(".hour");
let minute = document.querySelector(".minute")
let second = document.querySelector(".second")
let millisecond = document.querySelector(".millisecond");
let birthDayInput = moment(["1996", 8, 5]); //default birthday  //month is 0 indexed
let today = moment();                   // today date
let birthdayInputElem = document.querySelector("#birthday-input");
// moment are mutable so clone it 
birthdayInputElem.addEventListener("change",(e)=>{
    let inputDate = e.currentTarget.value;
    inputDate = inputDate.split("-");
    inputDate[1] =(inputDate[1]-1)+""; //months are 0 indexed in moment
    birthDayInput = moment(inputDate); 
})
// console.log(birthDayInput.format(),"18");

setInterval(() => {
    let YY = getYears(); 
    let MM = getMonths(YY);  
    let DD = getDays();
    year.innerText = YY;
    month.innerText = MM;
    day.innerText = DD;
    hour.innerText = moment().hour();
    minute.innerText = moment().minute();
    second.innerText = moment().seconds();
    millisecond.innerText = moment().millisecond(); 
    },1);

    function getDays(){
        if(today.date()>=birthDayInput.date()){
            let lastBirthdayMonth =  moment().date()- birthDayInput.date();
            return lastBirthdayMonth;
        }
        else{
            // from last birth date to today birthdate
            // i have birthdate in input
            // go back 1 month form today
            let lastBirthdayMonth = moment().subtract("1","months");             //getting last month
            lastBirthdayMonth.set("years",today.year());               // set year to current year , so i can get difference in days between two consecutive month
            lastBirthdayMonth.set("date",birthDayInput.date())
            let diff = moment().diff(lastBirthdayMonth,"days");
            if(diff == 30){
                if(birthDayInput.year() == moment().year()){
                    return 30;
                }
                else{
                    return 0;
                }
            }
            else{
                return diff;
            }
        }
    }

    function getMonths(YY){
        // 0 years when his birth month has yet to come => month difference will come from origial birthdate
        // 1 years his first birth month has gone   =>  month difference will come from last this year's birhtady month
        if(YY == 0){
            return today.diff(birthDayInput,"months")
        }
        let birthdayClone = moment(birthDayInput); 
        birthdayClone.set("year",today.year());
        
        if(YY == 1){
            return today.diff(birthdayClone,"months");    
        }



        birthdayClone.subtract(1,"years");
            
        let lastYearBirthday = birthdayClone;
        let diffInMonths = today.diff(lastYearBirthday,"months");
        if(diffInMonths == 12){
            return 0;
        }
        else{
            return (diffInMonths);
        }
        // diffInMonths === 12 ? return (0) : return diffInMonths; 
    }
    function getYears(){
        return moment().diff(birthDayInput,"years");
    }


    // function getHours(){     
    // }
