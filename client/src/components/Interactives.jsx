import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Interactives.css';

const Interactives = ({ totalDownloads }) => (
  <section>
    <div>
      <div className={ styles.interactiveHeader }>
        <strong className={ styles.interactiveHeaderText }>Interactive Features</strong>
        <FontAwesomeIcon icon={ faInfoCircle } fixedWidth/>
      </div>
      <ul className={ styles.totalResources } >
      <li>
        <span className={ styles.featureIcon }>
          <FontAwesomeIcon icon={ faFileAlt } fixedWidth/>
        </span>
        <span className={ styles.featureText }>{ `${totalDownloads} downloadable resources` }</span>
      </li>
      </ul>
    </div>
  </section>
);

Interactives.propTypes = {
  totalDownloads: PropTypes.number.isRequired,
};

export default Interactives;
