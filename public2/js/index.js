import '@babel/polyfill'
import {login} from './login'
import {add_note} from './addnote'
import{sign_in} from './sign'
import { delete_note } from './delete'   
import {update_note} from './update'
import {get_user} from './get_user'
import { share_note } from './share'
import { del_sent, del_rece } from './share_del'
import {update_me} from './user_upd';



const login_form = document.querySelector('#form-login');
const sign_form = document.querySelector('#form-sign');
const save_btn = document.querySelector('.create_form');
const del_btn = document.querySelectorAll('.delete');
const upd_btn = document.querySelectorAll('.update_form');
const upd_inp = document.querySelectorAll('.update_inp');
const upd_txt = document.querySelectorAll('.update_txt');
const search_form = document.querySelector('#search_form');
const share = document.querySelector('.search_res');
const sent_del = document.querySelectorAll('.sent_del');
const receiv_del = document.querySelectorAll('.receiv_del');
const user_form = document.querySelector('#form_user');
const pass_form = document.querySelector('#form_password');


const set_field = ()=>{
    
    if(upd_inp && upd_txt){
        upd_inp.forEach(el=>{
        el.value=el.dataset.title;
      });
      upd_txt.forEach(el=>{
        el.value = el.dataset.text
      
      });
      
      }
}

const add_spinner = (element,txt)=>{
  
    element.textContent = " "
    element.disabled = true;
    const html = `<span class="spinner-grow spinner-grow-sm"></span> ${txt}...`
    element.insertAdjacentHTML('afterbegin',html);
}

const remove_spinner = (element,txt)=>{
    element.disabled = false; 
    element.textContent = `${txt}`;
}



if(login_form){

            login_form.addEventListener('submit',async (e)=>{
                    e.preventDefault();
                    const email = document.querySelector('#email').value;
                    const password = document.querySelector('#password').value;
                    console.log(email,password);
                    
                    const login_btn = document.querySelector('#login_btn');

                    add_spinner(login_btn,'Loading');    
                    await login(email,password);
                    remove_spinner(login_btn,'Log in');

    });
       
}

if(save_btn){

        console.log('hello')
        save_btn.addEventListener('submit',async(e)=>{
                e.preventDefault();
                const title = document.querySelector('#input1').value;
                const text = document.querySelector('#txtarea1').value;

                const save = document.querySelector('#save');
                console.log(save);
                add_spinner(save,'Saving');
                await add_note(title,text);
                remove_spinner(save,'Save');

});
}

if(sign_form){

        sign_form.addEventListener('submit',async(e)=>{
            e.preventDefault();
            const name = document.querySelector('#name').value;
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;
            const confirmPassword = document.querySelector('#confirmPassword').value;
            if(password!=confirmPassword){
                return  document.querySelector('#msg4').innerHTML = 'Password is not same'
            }
            document.querySelector('#msg4').innerHTML= "";
           // console.log(name,email,password,confirmPassword);
            
            const sign_btn = document.querySelector("#sign_in");
            
            add_spinner(sign_btn,'Loading');
            await sign_in(name,email,password,confirmPassword); 
            remove_spinner(sign_btn,'Sign up');   

});

}

if(del_btn){
     del_btn.forEach(el=>{
           el.addEventListener('click',async()=>{
            const note = el.dataset.note;
            delete_note(note);
        });
   
     });
}

if(upd_btn){
     upd_btn.forEach(el=>{
         el.addEventListener('submit',async(e)=>{
             e.preventDefault();
             const note = el.dataset.note;
             const title = document.querySelector(`#update_inp-${note}`).value;
             const text = document.querySelector(`#update_txt-${note}`).value;
            
             console.log(title,text);
             
             const upd_btn = document.querySelector(`#upd_btn-${note}`);
             console.log(upd_btn);
             add_spinner(upd_btn,'Updating');
             await update_note(title,text,note);
             remove_spinner(upd_btn,'Update')
             
            });
     })
 }

if(search_form){
        search_form.addEventListener('submit',async(e)=>{

            e.preventDefault();
            const btn = document.querySelector('#search_btn');
            const note  = btn.dataset.note;
            const user = document.querySelector('#user').value;
            console.log(user);
            
            const  user_name =  user.replace(/^\s+|\s+$/gm,'');
            add_spinner(btn,'Searching');
            await get_user(user_name,note);
            remove_spinner(btn,'Search');
                    });
    
                    
}

if(share){

    share.addEventListener('click',async(e)=>{
        const el = e.target.closest('.user_box');
        if(el){
            console.log('lolo');
            const user =JSON.stringify(el.dataset.to);
            const note =JSON.stringify(el.dataset.note);
            const elem = document.querySelector('.search_res');
            add_spinner(elem,'Sending');    
            await share_note(user,note);
            remove_spinner(elem,' ');

        }
    })

}

if(sent_del){

    sent_del.forEach(el=>{
        el.addEventListener('click',()=>{
            const  note = el.dataset.share;
            del_sent(note);
         });
    })
  
}

if(receiv_del){
    receiv_del.forEach(el=>{
     el.addEventListener('click',()=>{
        const note = el.dataset.share;
        del_rece(note);
     })   

    })
}

console.log(user_form);
if(user_form){
   
     user_form.addEventListener('submit',async(e)=>{
         e.preventDefault();
         
         const form = new FormData();
            form.append('name',document.querySelector('#user-name').value);
            form.append('email',document.querySelector('#user-mail').value);
            form.append('photo',document.querySelector('#photo').files[0]); 
           const elem = document.querySelector('.save_setting');
            add_spinner(elem,'Saving')

           await update_me(form,'setting');
        
           remove_spinner(elem,'Save settings');
        });

}

if(pass_form){
        pass_form.addEventListener('submit',async(e)=>{
            e.preventDefault();
            const Currentpassword = document.querySelector('#curr_pass').value;
            const newpassword = document.querySelector('#new_pass').value;
            const confirmNewPassword = document.querySelector('#conf_new_pass').value;
            const form = { Currentpassword,newpassword,confirmNewPassword };

            if(newpassword!=confirmNewPassword){
                return  document.querySelector('#pass_conf').innerHTML = 'Password is not same'
            }
            document.querySelector('#pass_conf').innerHTML= "";
            const elem = document.querySelector('#chng_pass');
            add_spinner(elem,'Updating');
            await update_me(form,'password');
            remove_spinner(elem,'Update');

        })

}


 set_field();