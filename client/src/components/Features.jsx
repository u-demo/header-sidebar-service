import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Features.css';

const articleOrArticles = hours => (hours === 1 ? 'article' : 'articles');

const Features = ({ videoHrs, totalArticles }) => (
  <section>
    <div>
      <strong>Includes</strong>
    </div>
    <div>
      <ul>
        <li>
          <span className={ styles.featureIcon }>
            <FontAwesomeIcon icon={ far.faFileVideo } fixedWidth/>
          </span>
          <span className={ styles.featureText }>{ `${videoHrs} hours on-demand video` }</span>
        </li>
        <li>
          <span className={ styles.featureIcon }>
            <FontAwesomeIcon icon={ far.faFile } fixedWidth/>
          </span>
          <span className={ styles.featureText }>{ `${totalArticles} ${articleOrArticles(totalArticles)}` }</span>
        </li>
        <li>
          <span className={ styles.featureIcon }>
            <FontAwesomeIcon icon={ fas.faInfinity } fixedWidth/>
          </span>
          <span className={ styles.featureText }>Full lifetime access</span>
        </li>
        <li>
          <span className={ styles.featureIcon }>
            <FontAwesomeIcon icon={ fas.faMobileAlt } fixedWidth/>
          </span>
          <span className={ styles.featureText }>Access on mobile and TV</span>
        </li>
        <li>
          <span className={ styles.featureIcon }>
            <FontAwesomeIcon icon={ fas.faAtom } fixedWidth/>
          </span>
          <span className={ styles.featureText }>Certificate of Completion</span>
        </li>
      </ul>
    </div>
  </section>
);

Features.propTypes = {
  videoHrs: PropTypes.number.isRequired,
  totalArticles: PropTypes.number.isRequired,
};

export default Features;
