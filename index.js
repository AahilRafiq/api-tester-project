// On submitting the form 
const form = document.getElementById('apiForm');
form.addEventListener('submit', (event)=> {

    event.preventDefault() //Prevents default action of form submission

    /* Collecting form data here */

    // 1.Endpoint
    const api_endpoint = document.getElementById('apireq_endpoint').value
    const apiReq_type = document.getElementById('apireq_type').value

    // 2.Query params
    const paramKeys = document.getElementsByClassName('styl-input paramKey') //Array
    const paramValues = document.getElementsByClassName('styl-input paramValue') //Array

    // 3.Headers
    const headerKeys = document.getElementsByClassName('styl-input headerKey') //Array
    const headerValues = document.getElementsByClassName('styl-input headerValue') //Array

    // 4.Authorization
    const authType = document.getElementById('authTypeSelector').value
    const apikeyAuthType = document.getElementById('apikeyAuthType').value
    const authInput1 = document.getElementById('authInput1').value
    const authInput2 = document.getElementById('authInput2').value

    // Axios reqbody
    const axiosReqbody = document.getElementById('axiosReqBody')

    // Initial config file
    const axiosConfig = {
        url : api_endpoint,
        method : apiReq_type
    }

    // Adding query parameters
    let parameters = {}
    for(i=0;i<paramKeys.length;i++){
        parameters[paramKeys[i].value] = paramValues[i].value
    }
    if(authType=="apikey" && apikeyAuthType=="addToQueryParams"){
        parameters[authInput1] = authInput2
    }
    axiosConfig.params = parameters
    
    /* Adding headers */
    let apiHeaders = {}
    for(i=0;i<headerKeys.length;i++){
        apiHeaders[headerKeys[i].value] = headerValues[i].value
    }
    if(authType=="apikey" && apikeyAuthType=="addToHeader"){
        apiHeaders[authInput1] = authInput2
    }
    // Now adding authorizations to headers
    else if(authType=="basic"){
        const encodedCredentials = btoa(`${authInput1}:${authInput2}`);
        apiHeaders.Authorization = `Basic ${encodedCredentials}`
    }else if(authType=="bearer"){
        apiHeaders.Authorization = `Bearer ${authInput1}`
    }
    if("" in apiHeaders){
        console.log("No headers");
    }
    else{
        axiosConfig.headers = apiHeaders
    }

    /*******Axios config is ready now********/
    if(axiosReqbody.value==""){
        apireqFunction(axiosConfig)
    }
    else{
        apireqFunction(JSON.parse(axiosReqbody.value))
    }
})

// function for axios to make api Request
async function apireqFunction(axiosConfig) {
	try{
        const resDisplayer = document.getElementById('displayingBody')
        resDisplayer.textContent = "please wait"
		const response = await axios(axiosConfig)
        resDisplayer.textContent = JSON.stringify(response.data,null,4)
        console.log(JSON.stringify(response.data,null,4));
        // console.log(response.data);
	}
	catch(err){
		console.log(err) 
	}
}

/***************FRONTEND CODE******************/ 

// 1. Add new Parameter key pair value
const addParamBtn = document.getElementById('addParamBtn')
addParamBtn.addEventListener('click',()=>{
    const divCopy = document.getElementById('firstParam').cloneNode(true);
    document.getElementById('newParamsContainer').appendChild(divCopy);
})

// 2. Add new Header key pair value
const addHeaderBtn = document.getElementById('addHeaderBtn')
addHeaderBtn.addEventListener('click',()=>{
    const divCopy = document.getElementById('firstHeader').cloneNode(true);
    document.getElementById('newHeadersContainer').appendChild(divCopy);
})


// 3.Auth section controller

// This function will be called when the user selects an option from the auth select list.
function authSelected() {
    // Get the value of the selected option.
    var selectedValue = document.getElementById('authTypeSelector').value;
  
    // Do something with the selected value.
    if (selectedValue === 'none') {

        var element1 = document.getElementById("authInput1");
        element1.style.visibility = "hidden";
        var element2 = document.getElementById("authInput2");
        element2.style.visibility = "hidden";
        var element3 = document.getElementById('apikeyAuthType');
        element3.style.visibility = "hidden";

    } else if (selectedValue === 'basic') {

        var element1 = document.getElementById("authInput1");
        element1.style.visibility = "visible";
        element1.setAttribute("placeholder","username")
        var element2 = document.getElementById("authInput2");
        element2.style.visibility = "visible";
        element2.setAttribute("placeholder","password")
        var element3 = document.getElementById('apikeyAuthType');
        element3.style.visibility = "hidden";
        
    } else if (selectedValue === 'apikey') {
        
        var element1 = document.getElementById("authInput1");
        element1.style.visibility = "visible";
        element1.setAttribute("placeholder","Key")
        var element2 = document.getElementById("authInput2");
        element2.style.visibility = "visible";
        element2.setAttribute("placeholder","Value")
        var element3 = document.getElementById('apikeyAuthType');
        element3.style.visibility = "visible";

    } else if (selectedValue === 'bearer') {
        var element1 = document.getElementById("authInput1");
        element1.style.visibility = "visible";
        element1.setAttribute("placeholder","Bearer Token")
        var element2 = document.getElementById("authInput2");
        element2.style.visibility = "hidden";
        var element3 = document.getElementById('apikeyAuthType');
        element3.style.visibility = "hidden";
    }
  }
  
  // Add an event listener to the auth select list.
  document.getElementById('authTypeSelector').addEventListener("change", authSelected);