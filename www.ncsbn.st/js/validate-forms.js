//
// Content class location: 003 CSS & JS > validate-forms.js
//

// Global string definitions
// All error strings are defined here and invoked with the getError() function 
var errorStrings = {
	any: 'Please enter a value.', // default message
	emailAddressRequired: 'Please include your email address.',
	emailAddressValidate: 'Please enter a valid email address.',
	emailAddressRequiredWithExample: 'Please include your email address as youremail@anydomain.com.',
	emailAddressValidateWithExample: 'Please enter a valid email address as youremail@anydomain.com.',
	fullName: 'Please include your name.',
	contactMessage: 'Please include a message.',
	organization: 'Please include your organization.',
	street1: 'Please include your street name.',
	cityUS: 'Please include your city.',
	stateUS: 'Please include your state.', // just "state" in rules form
	zipUS: 'Please include your zipcode.',
	cityInt: 'Please include your city.',
	stateInt: 'Please include your state, province, or region.',
	countryInt: 'Please include your country.',
	zipInt: 'Please include your postal code.',
	brochureNumber: 'Please enter a number.',
	firstName: 'Please include your first name.',
	lastName:'Please include your last name.',
	comment: 'Please include a comment.',
}

function getError( id, messageid ){
	var id = id || 'any'; // if no id is provided, use 'any'
	var message = errorStrings[ messageid ] || errorStrings[ id ]; // if no "messageid" is provided, use the "id" for the message
		message = message || errorStrings[ 'any' ];	// if none of the above produces a value, use the "any" message.
	var tag = "<span class='box_negative block sp_top sp_xl' id='{ID}_error'>{MESSAGE}</span>";
		tag = tag.replace( '{ID}', id );
		tag = tag.replace( '{MESSAGE}', message );
	return tag;
}

function srMessage( validator ){
	// add <div> if it does not exist for some reason
	if( $('#sr-message').length == 0 ){
		$('body').append('<div id="sr-message" class="visually-hidden" aria-live="assertive" ></div>');
	}
	// set text message
	var txt = 'There is one invalid entry in the form.';
	if( validator.errorList.length > 1 ){
		txt = 'There are '+ validator.errorList.length +' invalid entries in the form.';
	}
	// append message to DOM
	var id = "sr-message" + new Date().getTime();
	$('#sr-message').append('<p id="'+id+'">'+txt+'</p>');
	setTimeout( function(){
		$('#'+id).remove();
	}, 500);
}

function firstFocus(){
	setTimeout( function(){
		console.log( 'firstFocus' );
		$('.error:eq(0)').focus();
	}, 3000 );
}

function initValidate(){
    
    //
    // Primary contact form validation
    //
    $("#contactForm, #contactExamsForm").validate({
        rules: {
            emailAddress: {
                required: true,
                email: true
            },
            fullName: "required",
            contactMessage: "required"
        },
        messages: {
            emailAddress: {
                required: getError( 'emailAddress', 'emailAddressRequired' ),
                email: getError( 'emailAddress', 'emailAddressValidate' ),
            },
            fullName: getError( 'fullName' ),
            contactMessage: getError( 'contactMessage' ),
        },
        errorClass: "error",
        //errorElement: "span",
        onfocusout: false, 
        onkeyup: false,
        onclick: false,
        
        submitHandler: function(form) {
            form.submit();
        },
		invalidHandler: function( event, validator ){
		    srMessage( validator );
			$('[aria-invalid]').attr('aria-invalid', null).attr('aria-describedby', null);
			$.each(validator.errorList, function() {
				$(this.element).attr( 'aria-describedby', $(this.element).attr('id') + '_error' ).attr( 'aria-invalid', 'true' );
			});
			firstFocus();
		}
    });

    //
    // Brochures request form validation
    //
    $("#brochureForm").validate({
        rules: {
            fullName: "required",
            organization: "required",
            emailAddress: {
                required: true,
                email: true
            },
            street1: "required",
            cityUS: {
                required: "#usAddr:selected"
            },
            stateUS: {
                required: "#usAddr:selected"
            },
            zipUS: {
                required: "#usAddr:selected"
            },
            cityInt: {
                required: "#intAddr:selected"
            },
            stateInt: {
                required: "#intAddr:selected"
            },
            countryInt: {
                required: "#intAddr:selected"
            },
            zipInt: {
                required: "#intAddr:selected"
            },
            brochure1: { number: true },
            brochure2: { number: true },
            brochure3: { number: true },
            brochure4: { number: true },
            brochure5: { number: true },
            brochure6: { number: true },
            brochure7: { number: true },
            brochure8: { number: true },
            brochure9: { number: true },
            brochure10: { number: true },
            brochure11: { number: true },
            brochure12: { number: true },
        },
        
        messages: {
            fullName: getError( 'fullName' ),
            organization: getError( 'organization' ),
            emailAddress: {
                required: getError( 'emailAddress', 'emailAddressRequired' ),
                email: getError( 'emailAddress', 'emailAddressValidate' ),
            },
            street1: getError( 'street1' ),
            cityUS: getError( 'cityUS' ),
            stateUS: getError( 'stateUS' ),
            zipUS: getError( 'zipUS' ),
            cityInt: getError( 'cityInt' ),
            stateInt: getError( 'stateInt' ),
            countryInt: getError( 'countryInt' ),
            zipInt: getError( 'zipInt' ),
            brochure1: getError( 'brochure1', 'brochureNumber' ),
            brochure2: getError( 'brochure2', 'brochureNumber' ),
            brochure3: getError( 'brochure3', 'brochureNumber' ),
            brochure4: getError( 'brochure4', 'brochureNumber' ),
            brochure5: getError( 'brochure5', 'brochureNumber' ),
            brochure6: getError( 'brochure6', 'brochureNumber' ),
            brochure7: getError( 'brochure7', 'brochureNumber' ),
            brochure8: getError( 'brochure8', 'brochureNumber' ),
            brochure9: getError( 'brochure9', 'brochureNumber' ),
            brochure10: getError( 'brochure10', 'brochureNumber' ),
            brochure11: getError( 'brochure11', 'brochureNumber' ),
            brochure12: getError( 'brochure12', 'brochureNumber' ),
        },
        errorClass: "error",
        //errorElement: "span",
        onfocusout: false, 
        onkeyup: false, 
        onclick: false,
        
        submitHandler: function(form) {
            form.submit();
        },
		invalidHandler: function( event, validator ){
		    srMessage( validator );
			$('[aria-invalid]').attr('aria-invalid', null).attr('aria-describedby', null);
			$.each(validator.errorList, function() {
				$(this.element).attr( 'aria-describedby', $(this.element).attr('id') + '_error' ).attr( 'aria-invalid', 'true' );
			});
		}
    });

    //
    // Rules comment form validation
    //
    $("#rulesForm").validate({
    	rules: {
    	      firstName: "required",
    	      lastName: "required",
    	      emailAddress: {
    		  required: true,
    		  email: true
    	      },
    	      state: 'required',
    	      comment: 'required',
    	},
    	
    	messages: {
    	      firstName: getError( 'firstName' ),
    	      lastName: getError( 'lastName' ),
    	      emailAddress: {
                    required: getError( 'emailAddress', 'emailAddressRequiredWithExample' ),
                    email: getError( 'emailAddress', 'emailAddressValidateWithExample' ),
    	      },
    	      state: getError( 'state', 'stateUS' ),
    	      comment: getError( 'comment' ),
    	},
    	errorClass: "error",
    	//errorElement: "span",
    	onfocusout: false, 
    	onkeyup: false, 
    	onclick: false,
    	
    	submitHandler: function(form) {
    		form.submit();
    	},
		invalidHandler: function( event, validator ){
		    srMessage( validator );
			$('[aria-invalid]').attr('aria-invalid', null).attr('aria-describedby', null);
			$.each(validator.errorList, function() {
				$(this.element).attr( 'aria-describedby', $(this.element).attr('id') + '_error' ).attr( 'aria-invalid', 'true' );
			});
		}
    });
} // end initValidate();
initValidate();  