// plugins/vue-js-modal.js
import Vue from 'vue'
import VModal from 'vue-js-modal/dist/ssr.nocss'

import 'vue-js-modal/dist/styles.css'

Vue.use(VModal, { dynamicDefault: { draggable: true, resizable: true } })