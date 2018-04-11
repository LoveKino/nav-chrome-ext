'use strict';

const SimplePager = require('kabanery-lumine/lib/page/simplePager');
const {
  lumineView,
  n
} = require('kabanery-lumine');
const Input = require('kabanery-lumine/lib/view/input/input');
const Full = require('kabanery-lumine/lib/view/layout/full');
const Fold = require('kabanery-lumine/lib/view/fold/fold');
const {
  DO_SEARCH
} = require('../signals');
const urlParser = require('url');
const _ = require('lodash');

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

module.exports = SimplePager(lumineView(({
  props
}, ctx) => {
  return n(Full, {
    style: {
      textAlign: 'center',
      backgroundColor: 'rgba(200,200,200,0.9)'
    }
  }, [
    n('form', {
      style: {
        position: 'fixed',
        top: 8,
        width: '90%',
        left: '5%'
      },
      onsubmit: (e) => {
        e.preventDefault();
        ctx.notify(DO_SEARCH);
      }
    }, [
      ctx.bn({
        'searchSentence': 'value'
      })(Input, {
        style: {
          width: '100%',
          fontSize: 16
        }
      })
    ]),

    n('div', {
      style: {
        marginTop: 40,
        padding: 16,
        width: '50%'
      }
    }, [
      n('div', {
        style: {
          textAlign: 'left',
          backgroundColor: 'white'
        }
      }, _.map(classifyHistory(props.history), renderUrlItems))
    ])
  ]);
}, {
  defaultProps: {
    searchSentence: '',
    history: []
  }
}));

const renderUrlItems = (items, prefix) => {
  return n(Fold, {
    hide: true
  }, [
    n('a', {
      href: prefix,
      style: {
        fontSize: 16,
        color: 'rgb(44, 152, 240)'
      }
    }, prefix),

    n('div', {
      style: {
        padding: 8,
        maxHeight: 200,
        overflow: 'scroll'
      }
    }, _.map(items, renderUrlItem))
  ]);
};

const renderUrlItem = ({
  url,
  title,
  visitCount
}) => {
  return n('div', {
    style: {
      wordWrap: 'break-word',
      padding: 8,
      fontSize: 14
    }
  }, [
    n('span', [`[${visitCount}-${title}] `]),

    n('a', {
      href: url,
      alt: url,
      style: {
        fontSize: 14,
        color: 'rgb(44, 152, 240)'
      }
    }, [url])
  ]);
};

const classifyHistory = (history) => {
  return history.reduce((prev, item) => {
    const {
      protocol,
      host
    } = urlParser.parse(item.url);
    const prefix = `${protocol}//${host}`;
    prev[prefix] = prev[prefix] || [];
    prev[prefix].push(item);

    return prev;
  }, {});
};
