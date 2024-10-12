class Validation{
    constructor(config, formID){
        this.elementsConfig = config;
        this.formID = formID;
        this.errors = {};

        this.generateErrorsObject();
        this.inputListener();
    }

    generateErrorsObject(){
        for(let field in this.elementsConfig){
            this.errors[field] = [];
        }
    }

    inputListener(){
        let inputSelector = this.elementsConfig;
        for(let field in inputSelector){
            let el = document.querySelector(`${this.formID} input[name="${field}"]`);

            el.addEventListener("input", this.validate.bind(this));
        }
    }

    validate(e){
        let elFields = this.elementsConfig;

        let field = e.target;
        let fieldName = field.getAttribute("name");
        let fieldValue = field.value;

        this.errors[fieldName] = [];

        if(elFields[fieldName].required){
            if(fieldValue === ""){
                this.errors[fieldName].push("The field is empty!");
            }
        }

        if(elFields[fieldName].email){
            if(!this.validateEmail(fieldValue)){
                this.errors[fieldName].push("Invalid email address!");
            }
        }

        if(fieldValue.length < elFields[fieldName].minlength || fieldValue.length > elFields[fieldName].maxlength){
            this.errors[fieldName].push(`The field must have between ${elFields[fieldName].minlength} and ${elFields[fieldName].maxlength} characters!`);
        }

        if(elFields[fieldName].matching){
            let matchingEl = document.querySelector(`${this.formID} input[name="${elFields[fieldName].matching}"]`);

            if(fieldValue !== matchingEl.value){
                this.errors[fieldName].push("Passwords do not match!")
            }

            if(this.errors[fieldName].length === 0){
                this.errors[fieldName] = [];
                this.errors[elFields[fieldName].matching] = [];
            }
        }

        this.populateErrors();
    }

    validationPassed(){
        for(let key of Object.keys(this.errors)) {
            let fieldValue = document.querySelector(`#registrationForm input[name="${key}"]`)
			if(this.errors[key].length > 0 || fieldValue.value.length === 0) {
				return false;
			}
		}
		return true;
    }

    populateErrors(){
        for(const elem of document.querySelectorAll("ul")){
            elem.remove();
        }

        for(let key of Object.keys(this.errors)){
            let parentElement = document.querySelector(`${this.formID} input[name="${key}"]`).parentElement;
            let errorsElement = document.createElement("ul");
            parentElement.appendChild(errorsElement);

            this.errors[key].forEach(error => {
                let li = document.createElement("li");
                li.innerText = error;

                errorsElement.appendChild(li);
            });
        }


    }

    validateEmail(email){
        if(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return true;
        }

        return false;
    }
}