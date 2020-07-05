const express = require('express');
const user_cntrl = require('../controller/user_cntrl');

const router = new express.Router();

router.post('/signup',user_cntrl.sign_up);
router.post('/login',user_cntrl.login);

router.post('/forgotpassword',user_cntrl.forgot_password);
router.post('/resetpassword/:reset_token',user_cntrl.reset_password);

router.get('/logout',user_cntrl.logout);

router.use(user_cntrl.firewall);
router.patch('/update_me',user_cntrl.upload_pic,user_cntrl.resize,user_cntrl.update_me);

router.patch('/update_password',user_cntrl.update_password);
module.exports = router;





