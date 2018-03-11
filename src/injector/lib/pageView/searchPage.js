'use strict';

const SimplePager = require('kabanery-lumine/lib/page/simplePager');
const {
    lumineView,
    n
} = require('kabanery-lumine');
const Input = require('kabanery-lumine/lib/view/input/input');
const Full = require('kabanery-lumine/lib/view/layout/full');

const {
    DO_SEARCH
} = require('../signals');

// common views
// const Hn = require('kabanery-lumine/lib/view/layout/hn');
// const Vn = require('kabanery-lumine/lib/view/layout/vn');
// const Button = require('kabanery-lumine/lib/view/button/button');
// const Input = require('kabanery-lumine/lib/view/input/input');

/**
 *  SimplePager encapsulate notice and loading view.
 *
 *      .notice.text
 *      .notice.show
 *      .loading.show
 */

/**
 * syncBindWithKeyMap:
 *     sync child props with parent props
 *     ctx.bn({[parent props]: 'value'})(Input, {})
 */

/**
 * pass signal
 *     demo: n(Button, {onsignal: ctx.pass('click', SIGNAL_TYPE)}, 'save')
 */

module.exports = SimplePager(lumineView((_, ctx) => {
    return n(Full, {
        style: {
            textAlign: 'center',
            backgroundColor: 'rgba(100,100,100,0.5)'
        }
    }, [
        n('form', {
            onsubmit: (e) => {
                e.preventDefault();
                ctx.notify(DO_SEARCH);
            }
        }, [
            ctx.bn({
                'searchSentence': 'value'
            })(Input, {
                style: {
                    top: 100,
                    width: 560
                }
            })
        ])
    ]);
}, {
    defaultProps: {
        searchSentence: ''
    }
}));
