import Vue from 'vue';
import fontawesome from '@fortawesome/fontawesome';
// import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import {
  faSpinner,
  faAngleLeft,
  faAngleRight,
  faInfoCircle,
} from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(
  faSpinner,
  faAngleLeft,
  faAngleRight,
  faInfoCircle,
);

Vue.component('font-awesome-icon', FontAwesomeIcon); // registered globally