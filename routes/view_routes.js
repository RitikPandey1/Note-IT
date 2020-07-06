const express = require('express');
const view_cntrl = require('../controller/view_cntrl');
const user_cntrl = require('../controller/user_cntrl');
const share_cntrl  = require('../controller/share_cntrl');

const router = new express.Router();


router.get('/logout',user_cntrl.logout);

router.use(user_cntrl.islog);

router.get('/',view_cntrl.main_view);

router.get('/login',view_cntrl.login);

router.get('/sharenote/:note/:id',view_cntrl.share_note);

router.post('/get_user',user_cntrl.get_user);

router.get('/sent_notes',share_cntrl.delete,view_cntrl.sent_note);

router.get('/receive_notes',share_cntrl.delete,view_cntrl.receive_note);

router.get('/account',view_cntrl.me);





module.exports = router;