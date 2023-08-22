function moveToNextField(inputElement, nextFieldId) {
  const inputValue = inputElement.value;
  const maxLength = inputElement.maxLength;

  if (inputValue.length === maxLength) {
    document.getElementById(nextFieldId).focus();
  }
}


function onlyNumbers(inputElement) {
  inputElement.value = inputElement.value.replace(/[^0-9]/, "");
}
 
  
  function working() {
  
    var mother_day = parseInt(document.getElementById('mother_day').value);
    var mother_month = parseInt(document.getElementById('mother_month').value) - 1;  
    var mother_year = parseInt(document.getElementById('mother_year').value);

    var mother_day1 = document.getElementById('mother_day').value;
    var mother_month1 = document.getElementById('mother_month').value;  
    var mother_year1 = document.getElementById('mother_year').value;

    if (mother_day1.trim() === "") {
        alert("Day is not picked!");
        document.getElementById("mother_day").focus();
        return false;
      }
      if (mother_month1.trim() === "") {
        alert("Day is not picked!");
        document.getElementById("mother_month").focus();
        return false;
      }
      if (mother_year1.trim() === "") {
        alert("Day is not picked!");
        document.getElementById("mother_year").focus();
        return false;
      } 
      if (mother_year< 1000) {
        alert("Year must be greater then 1000!");
        document.getElementById("mother_year").focus();
        return false;
      }
      

    var birthDate = new Date(mother_year, mother_month, mother_day);
    var currentDate = new Date();
  
    var age = currentDate.getFullYear() - birthDate.getFullYear();
    var monthDiff = currentDate.getMonth() - birthDate.getMonth();
  
    if ( monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate()))
      age--;
  
      if (birthDate > currentDate) {
        alert("Don't enter future date!");
        document.getElementById("mother_year").focus();
        return false;
      }
    if (mother_month < 0 || mother_month > 11) {
      alert("Month must be between 1 and 12.");
      document.getElementById("mother_month").focus();
      return false;
    }
    if ( mother_day < 1 || mother_day > new Date(mother_year, mother_month + 1, 0).getDate()) {
      alert("Enter a valid day for the selected month.");
      document.getElementById("mother_day").focus();
      return false;
    }   




    var son_day = parseInt(document.getElementById('son_day').value);
    var son_month = parseInt(document.getElementById('son_month').value) - 1; 
    var son_year = parseInt(document.getElementById('son_year').value);

    var son_day1 = document.getElementById('son_day').value;
    var son_month1 = document.getElementById('son_month').value;  
    var son_year1 = document.getElementById('son_year').value;  

    if (son_day1.trim() === "") {
        alert("Day is not picked!");
        document.getElementById("son_day").focus();
        return false;
      }
      if (son_month1.trim() === "") {
        alert("Day is not picked!");
        document.getElementById("son_month").focus();
        return false;
      }
      if (son_year1.trim() === "") {
        alert("Day is not picked!");
        document.getElementById("son_year").focus();
        return false;
      } 
      if (son_year < 1000) {
        alert("Year must be greater then 1000!");
        document.getElementById("son_year").focus();
        return false;
      }




    var birthDate2 = new Date(son_year, son_month, son_day); 
  
    var age2 = currentDate.getFullYear() - birthDate2.getFullYear();
    var monthDiff2 = currentDate.getMonth() - birthDate2.getMonth();
  
    if ( monthDiff2 < 0 || (monthDiff2 === 0 && currentDate.getDate() < birthDate2.getDate()))
      age2--;
  
      if (birthDate2 > currentDate) {
        alert("Don't enter future date!");
        document.getElementById("son_year").focus();
        return false;
      }

    if ( son_month < 0 || son_month> 11) {
      alert("Month must be between 1 and 12.");
      document.getElementById("son_month").focus();
      return false;
    }
    if ( son_day < 1 || son_day > new Date(son_year, son_month + 1, 0).getDate()) {
      alert("Enter a valid day for the selected month.");
      document.getElementById("son_day").focus();
      return false;
    } 
    



 
    var today = new Date();
    var mother_birthdate = new Date(mother_year, mother_month, mother_day);
    var son_birthdate = new Date(son_year, son_month, son_day);
    
   

    var mother_age = today.getFullYear() - mother_birthdate.getFullYear();
    if (today.getMonth() < mother_birthdate.getMonth() || (today.getMonth() === mother_birthdate.getMonth() && today.getDate() < mother_birthdate.getDate())) {
        mother_age--;
    }
    
    var son_age = today.getFullYear() - son_birthdate.getFullYear();
    if (today.getMonth() < son_birthdate.getMonth() || (today.getMonth() === son_birthdate.getMonth() && today.getDate() < son_birthdate.getDate())) {
        son_age--;
    }

    var today = new Date();
    var yearsDiff = today.getFullYear() - mother_birthdate.getFullYear();
    var monthsDiff = today.getMonth() - mother_birthdate.getMonth();
    var daysDiff = today.getDate() - mother_birthdate.getDate();
    
    if (daysDiff < 0) {
        monthsDiff--;
        daysDiff += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    
    if (monthsDiff < 0) {
        yearsDiff--;
        monthsDiff += 12;
    }

    var yearsDifff = today.getFullYear() - son_birthdate.getFullYear();
    var monthsDifff = today.getMonth() - son_birthdate.getMonth();
    var daysDifff = today.getDate() - son_birthdate.getDate();
    
    if (daysDifff < 0) {
        monthsDifff--;
        daysDifff += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    
    if (monthsDifff < 0) {
        yearsDifff--;
        monthsDifff += 12;
    }
 
    var ageDifferenceYears = yearsDiff - yearsDifff;
    var ageDifferenceMonths = monthsDiff - monthsDifff;
    var ageDifferenceDays = daysDiff - daysDifff;
 
    if (ageDifferenceMonths < 0) {
        ageDifferenceMonths += 12;
        ageDifferenceYears--;
    } 

    var daysInPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();

    if (ageDifferenceDays < 0) {
        ageDifferenceDays += daysInPreviousMonth;
        ageDifferenceMonths--;
        if (ageDifferenceMonths < 0) {
            ageDifferenceMonths += 12;
            ageDifferenceYears--;
        }
    }

    if (ageDifferenceYears < 18 || (ageDifferenceYears === 18 && ageDifferenceMonths < 0)) {
      alert("Age difference between mother and son is less than 18 years.");
      document.getElementById("mother_year").focus();
  } else { 
    var displayElement = document.getElementById('display');
    displayElement.innerHTML =
    "<table>" + 
    "<tr><td>&nbsp;&nbsp;&nbsp;Mother's Age</td><td>" + mother_age + "</td></tr>" + 
    "<tr><td>&nbsp;&nbsp;&nbsp;Son's Age</td><td>" + son_age + "</td></tr>" +  
    "<tr><td>&nbsp;&nbsp;&nbsp;Time diff Mother &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + yearsDiff + " years, " + monthsDiff + " months, " + daysDiff + " days" + "</td></tr>" +
    "<tr><td>&nbsp;&nbsp;&nbsp;Time diff Son</td><td>" + yearsDifff + " years, " + monthsDifff + " months, " + daysDifff + " days" + "</td></tr>" +
    "<tr><td>&nbsp;&nbsp;&nbsp;Both diff </td><td>" + ageDifferenceYears + " years, " + ageDifferenceMonths + " months, " + ageDifferenceDays + " days" + "</td></tr>" +
    "</table>";
  }
 
 return false;
}


  
 
