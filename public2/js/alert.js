export const show_alert = (msg,form)=>{
    if(!document.querySelector('.alert-custom')){
const html=  `<div class="alert-custom">
<span > ${msg}</span>
</div>`
document.querySelector(`#form-${form}`).insertAdjacentHTML('afterbegin',html);
    }
 
}   

export const remove_alert = ()=>{
    setTimeout(()=>{
        const el = document.querySelector('.alert-custom');
        if (el) el.parentElement.removeChild(el);


    },6000);
}