const express = require('express');
const view_cntrl = require('../controller/view_cntrl');
const user_cntrl = require('../controller/user_cntrl');
const share_cntrl  = require('../controller/share_cntrl');

const router = new express.Router();

router.get('/',user_cntrl.islog,view_cntrl.main_view);

router.get('/login',user_cntrl.islog,view_cntrl.login);

router.get('/logout',user_cntrl.logout);

router.get('/sharenote/:note/:id',user_cntrl.firewall,view_cntrl.share_note);

router.post('/get_user',user_cntrl.firewall,user_cntrl.get_user);

router.get('/sent_notes',user_cntrl.firewall,share_cntrl.delete,view_cntrl.sent_note);

router.get('/receive_notes',user_cntrl.firewall,share_cntrl.delete,view_cntrl.receive_note);

router.get('/account',user_cntrl.firewall,view_cntrl.me);





module.exports = router;