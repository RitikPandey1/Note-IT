const express = require('express');
const note_cntrl = require('../controller/note_cntrl');
const user_cntrl = require('../controller/user_cntrl');
const share_cntrl = require('../controller/share_cntrl');
const router  = new express.Router();

router.use(user_cntrl.firewall);

router.route('/')
            .get(note_cntrl.get_note)
                .post(note_cntrl.add_note);
             


router.route('/:id')
            .patch(note_cntrl.update_note)
                    .delete(note_cntrl.delete_note);


router.get('/sharenote/:note_id/user/:sent_to',
            share_cntrl.check_note,
            share_cntrl.check_duplicate,
            share_cntrl.share_note );


router.get('/sent/note',share_cntrl.delete,share_cntrl.sent_note);

router.get('/received/note',share_cntrl.delete,share_cntrl.received_note);

router.delete('/sent/delete/:shareid',share_cntrl.sent_delete);

router.delete('/receive/delete/:shareid',share_cntrl.receive_delete);

module.exports= router;