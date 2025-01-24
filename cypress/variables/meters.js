// <------------------------- LIST ------------------------->
export const filter_search_by_name = 'input[placeholder="Search"]';
// $x("//input[@placeholder='Search']")

// <------------------------- DETAIL ------------------------->

// <------------------------- CREATE / EDIT ------------------------->
export const btn_choose_action =  "span:contains('Choose Action')"

export const btn_new_meter = "button[id='btn-action-Meter-0']"
export const btn_edit_meter = "button[id='btn-action-Meter-1']"
export const btn_delete_meter = "button[id='btn-action-Meter-2']"

export const field_meter_name = "input[name='meter_name']"
export const field_description = "input[name='meter_description']"

export const option_type = "div[id='react-select-2-placeholder']"
export const field_option_type = "input[id='react-select-2-input']"
export const field_type_description = "input[name='meter_type_description']"

export const option_reading_type = "div[id='react-select-3-placeholder']"
export const field_option_reading_type = "input[id='react-select-3-input']"
export const field_reading_type_description = "input[name='meter_reading_type_description']"

export const option_domain = "div[id='react-select-4-placeholder']"
export const field_domain_description = "input[name='domain_description']"

export const option_uom = "div[id='react-select-5-placeholder']"
export const field_option_uom = "input[id='react-select-5-input']"
export const field_uom_description = "input[name='uom_description']"

export const btn_cancel = "button:contains('Cancel')"
export const btn_submit = "button:contains('Submit')"

//Button Popup Confirmation
export const btn_yes_confirm = "button:contains('Yes! Confirm')"
// export const btn_ok_confirm = "button:contains('OK')"
export const btn_ok_confirm = "button[class*='swal2-confirm']";
// $x("//button[contains(@class, 'swal2-confirm')]")

//validation
export const name_req = "div:contains('Meter Name is required')"
export const descri_req = "div:contains('Meter Description is required')"
export const type_req = "div:contains('Meter Type is required')"
export const uom_req = "div:contains('Unit of Measure is required')"
export const rt_req = "div:contains('Meter Reading Type is required for continuous meter type')" //if continues selected

//Value
export const readingTypes = ["Gauge", "Continuous", "Characteristic"]


// <------------------------- POPUP ------------------------->
export const btn_popup_close = "class='btn btn-close'"
export const btn_popup_delete = ""
export const btn_popup_cancel = ""
// Do you want to delete AAA?
// Meter is used, can not be deleted.

// Test
// cy.get(field_reading_type_description)
//   .invoke('val') // Mengambil value dari input
//   .then((value) => {
//     expect(readingTypes).to.include(value); // Mengecek apakah value ada di dalam array
//   });
// class="swal2-confirm btn btn-primary hover:text-white"
// class="swal2-confirm btn btn-primary hover:text-white"
// <div class="swal2-html-container" id="swal2-html-container" style="display: block;">Meter added successfully.</div>
// <div class="swal2-html-container" id="swal2-html-container" style="display: block;">resource already exists</div>
