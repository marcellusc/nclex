function CallAPI() {
    var uri = '#www.nursys.org/PublicService/NurseLicensureGuidance';
    var tId = Math.random().toString() + Date.now().toString();
    var res = $("#residence-state").val();
    var edu = true;
    var licType = "RN";
    var token = 'tokenDefaultValue';
    if ($("input[name='education']:checked").val().trim().toUpperCase() === "FOR") { edu = false; }
    if ($("input[name='license-type']:checked").val().trim().toUpperCase() === "PN") { licType = "PN"; }
    var pracs = $("input[name='practice-states']:checked").map(function() { return this.value; }).get();
    var requestMessage = {
        transactionId: tId,
        residenceState: res,
        practiceStates: pracs,
        isEducatedUS: edu,
        licenseType: licType
    };
    ResetResults();
    if (res.length > 0) {
        if (pracs.length > 0) {
            
            CallTokenAPI().done(function(data) {
                token = data.token;
               
                token = 'Bearer ' + token;
               
                var settings = {
                    'url': uri,
                    'method': 'POST',
                    'timeout': 0,
                    'headers': {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    'data': JSON.stringify(requestMessage),
                };
                $.ajax(settings).done(function(data) {
                  
                    ShowResults(data);
                   
                });
            });
        } else {
            $("#error-panel").html("Please select the state(s) where you want to practice");
            $("#error-panel").show();
        }
    } else {
        $("#error-panel").html("Please select your state of residence");
        $("#error-panel").show();
    }
    return false;
}

function CallTokenAPI() {
    var uri = '#www.nursys.org/PublicService/CreatePublicToken';
    var appId = '6F913A5A-C397-4B64-ADC5-6857FF17021C';
    var requestMessage = {
        applicationId: appId
    };
    var token = '';

    var settings = {
        'url': uri,
        'method': 'POST',
        'timeout': 0,
        'headers': {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'data': JSON.stringify(requestMessage),
    };
    return $.ajax(settings).done(function(data) {
        console.log('JWT RESPONSE');
    });
}

function ShowResults(responseMessage) {
    var template = '<li class="inline-block full-width with-margin_sm sp_sm"><a class="tx-default-link" onclick="ShowDetails(XXX);">ZZZ</a></li>'
    var resultsBody = '';
    var resultsList = document.getElementById('results-list');

    var selectedTemplate = '<li class="inline-block full-width with-margin_sm sp_sm">ZZZ</li>'
    var selectedResultsBody = '';
    var selectedResultsList = document.getElementById('results-selected-list');

    var resultsMap = document.getElementById('results-map-frame');
    var isNLC = responseMessage.IsResidenceStateNLC;
    var licStates = responseMessage.LicenseStates;
    var residenceStates = responseMessage.ResidenceState;
    var selectedStates = responseMessage.SelectedStates;
    for (var i = 0; i < licStates.length; i++) {
        var resultLine = template.replace('XXX', licStates[i].Id).replace('ZZZ', licStates[i].Description);
        resultsBody = resultsBody + resultLine;
    }
    resultsList.innerHTML = resultsBody;

    for (var i = 0; i < selectedStates.length; i++) {
        var resultLine = selectedTemplate.replace('ZZZ', selectedStates[i].Description);
        selectedResultsBody = selectedResultsBody + resultLine;
    }
    selectedResultsList.innerHTML = selectedResultsBody;

    var selectedResidenceEl = document.getElementById('selectedResidence');
    selectedResidenceEl.innerHTML = '(' + residenceStates.Description + ')';


    if (Boolean(isNLC) === true) {
        $("#results-list-paragraph-nlc").show();
        $("#results-map-paragraph-nlc").show();
        $("#results-map-paragraph-non-nlc").hide();
    } else {
        $("#results-list-paragraph-nlc").hide();
        $("#results-map-paragraph-nlc").hide();
        $("#results-map-paragraph-non-nlc").show();
    }
    ShowMap(responseMessage.MapHTML);
    $("#results-details-panel").hide();
    $("#results").show();

    $([document.documentElement, document.body]).animate({
        scrollTop: $("#results").offset().top
    }, 1000);
}

function ShowMap(xml) {
    $.getCachedScript('js/fusioncharts_3.12.1.js').done(function() {
        $.getCachedScript('js/fusioncharts.maps.js').done(function() {
            if ($('#nlg-map').length) {
                var map = $('#nlg-map');
                map.addClass('ratio--inner').wrap('<div class="ratio_america sp" style=""></div>');
                ncsbnMapId = map.attr('id');
                ncsbnMapUrl = map.data('url');
                FusionCharts.ready(function() {
                    ncsbnMap = new FusionCharts({
                        "type": "js/usanew",
                        "renderAt": ncsbnMapId,
                        "width": "100%",
                        "height": "100%",
                        "dataFormat": "xml",
                        "dataSource": xml
                    });
                    ncsbnMap.render();
                })
            }
        });
    });
}

function ShowDetails(id, description) {
    var url = '#www.ncsbn.org/' + id + '.htm'
    $("#results-details-panel").hide();
    $("#results-details-frame").load(url);
    $("#results-details-panel").show();

    $([document.documentElement, document.body]).animate({
        scrollTop: $("#results-details-panel").offset().top
    }, 1000);
}

function ShowMapDetails(message) {
     // Replacing NLC due to js issues with parentheses
    $("#results-map-paragraph").first().text(message.replace('{NLC}', '(NLC)').replace('++', ','));
}

function ResetResults() {
    $("#results").hide();
    $("#error-panel").html("");
    $("#error-panel").hide();
    $("#results-map-paragraph").first().text("");
}

function ResetInput() {
    $("#residence-state").val("");
    $("#rdoUS").prop("checked", true);
    $("#rdoRN").prop("checked", true);
    $("input[name='practice-states']:checkbox").prop('checked', false);
    ResetResults();
    SelectEd('US');
}

function SelectEd(selection) {

    if (selection == 'US') {

        $('.educationFOR').hide();
        $('.educationUS').show();
    } else {

        $('.educationFOR').show();
        $('.educationUS').hide();
    }

    $([document.documentElement, document.body]).animate({
        scrollTop: $("#educationDetails").offset().top
    }, 750);
}